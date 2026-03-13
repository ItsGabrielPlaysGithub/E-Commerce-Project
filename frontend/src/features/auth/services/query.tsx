import { gql } from "@apollo/client";

export interface ReadProfileData {
  readProfile: {
    userId: number;
    fullName: string;
    emailAddress: string;
    companyName: string;
    address: string;
    phoneNumber: string;
    role: string;
  };
}

export const GET_ME = gql`
  query readProfile($userId: Int!) {
    readProfile(userId: $userId) {
      userId
      fullName
      emailAddress
      companyName
      address
      phoneNumber
      role
    }
  }
`;
