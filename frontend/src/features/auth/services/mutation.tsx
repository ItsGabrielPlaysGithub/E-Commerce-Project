import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($emailAddress: String!, $password: String!) {
    login(emailAddress: $emailAddress, password: $password) {
        message
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;