import { Auth, UserList, UserRegister } from './types';

export interface Interaction<T> {
  query: string;
  variables?: { [K: string]: any };
  result?: T;
}

// this is just for IDE
const gql = (s) => s[0];

export const graphQLInteraction = {
  allUsers: (): Interaction<{ allUsers: UserList }> => ({
    query: gql`
        query {
            allUsers {
                meta {
                    totalCount
                }
                entries {
                    id
                    email
                    createdAt{iso, humanReadable}
                    updatedAt{iso, humanReadable}
                    lastLogin{iso, humanReadable}
                    userName
                    firstName
                    lastName
                    fullName
                    role
                }
            }
        }
    `,
  }),
  userRegister: (user: UserRegister): Interaction<{ userRegister: Auth }> => ({
    query: gql`
        mutation userRegister($user: UserRegister!) {
            userRegister(user: $user) {
                token
                user{
                    id
                    role
                    firstName
                    lastName
                    fullName
                    userName
                    email
                }
            }
        }
    `,
    variables: { user },
  }),
  userLogin: (userNameOrEmail: string, password: string): Interaction<{ userLogin: Auth }> => ({
    query: gql`
        mutation userLogin($userNameOrEmail: String!, $password: String!) {
            userLogin(user: {userNameOrEmail: $userNameOrEmail, password: $password}) {
                token
                user{
                    id
                    role
                    firstName
                    lastName
                    fullName
                    userName
                    email
                }
            }
        }
    `,
    variables: { userNameOrEmail, password },
  }),
};
