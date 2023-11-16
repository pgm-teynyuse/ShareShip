import type { NextAuthOptions, User } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; // Import GoogleProvider

import { LOGIN_MUTATION } from "@/libs/mutations/login";
import { client } from "@/libs/apolloClient";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "text",
          placeholder: "your-cool-email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        try {
          const { data } = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              identifier: credentials.email,
              password: credentials.password,
            },
          });
          console.log("data", data)
          // sessionStorage.set("jwt", data.login.jwt);
          const { user, jwt } = data.login;
          return { ...user, jwt };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      // console.log("session", token);
      session = {...token, ...session};
      return session;
    },
    async jwt({ token, user, account }) {

      const isSignIn = user ? true : false;
      if (isSignIn && account?.provider === "credentials") {
        token = {...user, ...token};
        console.log("User logged in");
      }
      
      return token;
    },
  },
  // ... other configurations
};

// Create an Apollo Client instance
// const httpLink = createHttpLink({
//   uri: process.env.NEXT_PUBLIC_API_URL + "/graphql", // Set your GraphQL server URI here
// });

// const authLink = setContext((_, { headers }) => {
//   // You need to implement token retrieval from the session or cookie here.
//   const token = localStorage.getItem("jwt");

//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// const apolloClient = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// export default apolloClient;
