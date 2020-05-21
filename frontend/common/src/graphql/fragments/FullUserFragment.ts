import {DocumentNode, gql} from 'apollo-boost';

export const fullUserFragment = (): DocumentNode => gql`
  fragment fullUser on User {
    email
    emailValidated
    firstName
    lastName
    fullName
    userName
    id
  }
`;
