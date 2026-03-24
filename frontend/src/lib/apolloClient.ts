import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { HttpLink } from "@apollo/client/link/http";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "http://localhost:4000/graphql",
    credentials: "include", // Automatically send cookies with all requests
});

// Error link to log errors for debugging
const errorLink = onError((errorOptions: any) => {
    const { graphQLErrors, networkError, operation } = errorOptions;
    
    if (graphQLErrors) {
        for (const error of graphQLErrors) {
            const message = error.message || '';
            console.error(`[GraphQL ${operation.operationName}] ${message}`, {
                message,
                path: (error as any)?.path,
                extensions: (error as any)?.extensions,
            });
        }
    }
    
    if (networkError) {
        const nestedError = (networkError as any)?.result?.errors;
        console.error('[Network error]:', {
            message: networkError.message,
            statusCode: (networkError as any)?.statusCode,
            nested: nestedError?.map((e: any) => ({ message: e.message })),
            operationName: operation.operationName,
        });
    }
});

export const apolloClient = new ApolloClient({
    link: errorLink.concat(httpLink),
    cache: new InMemoryCache(),
});
