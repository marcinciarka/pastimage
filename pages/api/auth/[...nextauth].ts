import ldap from "ldapjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

if (!process.env.LDAP_URI) {
  throw new Error("No LDAP_URI set!");
}
const client = ldap.createClient({
  url: process.env.LDAP_URI!,
});

const searchUser = (userUid: string) => {
  const opts = {
    attributes: ["cn"],
  };
  return new Promise<{ fullName?: string; error?: string }>(
    (resolve, reject) => {
      client.search(
        `uid=${userUid},ou=Accounts,dc=softax,dc=local`,
        opts,
        (err, res) => {
          res.on("searchEntry", (entry) => {
            resolve({
              fullName: entry.object.cn as string,
            });
          });
          res.on("error", (err) => {
            resolve({
              error: err.message,
            });
          });
        }
      );
    }
  );
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "LDAP",
      credentials: {
        login: {
          label: "DN",
          type: "text",
          placeholder: "",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.login || !credentials.password) {
          throw new Error("Please fill login and password.");
        }

        return new Promise(async (resolve, reject) => {
          client.bind(
            // you might need to change the DN string here
            `uid=${credentials.login},ou=Accounts,dc=softax,dc=local`,
            credentials.password,
            async (error) => {
              const { fullName, error: searchError } = await searchUser(
                credentials.login
              );
              if (error || searchError) {
                console.error("Failed", searchError, error);
                reject({
                  error,
                  searchError,
                });
              } else {
                resolve({
                  fullName,
                  login: credentials.login,
                  password: credentials.password,
                });
              }
            }
          );
        });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.login = user?.login;
        token.password = user?.password;
        token.fullName = user?.fullName;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          login: token.login,
          fullName: token.fullName,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
