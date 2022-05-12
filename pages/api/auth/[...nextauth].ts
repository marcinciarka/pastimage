import ldap from "ldapjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

if (!process.env.LDAP_URI) {
  throw new Error("No LDAP_URI set!");
}
const client = ldap.createClient({
  url: process.env.LDAP_URI!,
});

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "LDAP",
      credentials: {
        username: {
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
        if (!credentials || !credentials.username || !credentials.password) {
          throw new Error("Please fill login and password.");
        }

        return new Promise((resolve, reject) => {
          client.bind(credentials.username, credentials.password, (error) => {
            if (error) {
              console.error("Failed");
              reject();
            } else {
              console.log("Logged in");
              resolve({
                username: credentials.username,
                password: credentials.password,
              });
            }
          });
        });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.username = user.username;
        token.password = user.password;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          username: token.username,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
