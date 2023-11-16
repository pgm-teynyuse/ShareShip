"use client"
import { NextAuthProvider } from '@/provider/AuthProvider';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/libs/apolloClient';




type Props = {
  children: React.ReactNode;
  session: any;
};


export default function RootLayout({
  children, session,
}: 
  Props
) {
  return (
    <ApolloProvider client={client}>
      <NextAuthProvider>
    {children}
      </NextAuthProvider>
    </ApolloProvider>
  )
}