import { useQuery } from "@apollo/client/react";
import { useAuth } from "@/features/auth";
import { GET_ALL_ORDERS } from "../services/query";
import { AllOrdersQuery } from "@/gql/graphql";

export const useOrders = () => {
    const { isLoggedIn } = useAuth();
    
    return useQuery<AllOrdersQuery>(GET_ALL_ORDERS, {
        // Only run query if user is logged in
        // httpOnly cookie is sent automatically by browser with credentials: "include"
        skip: !isLoggedIn,
    });
};
