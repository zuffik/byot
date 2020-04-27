import { Auth, MediaFilter, MediaList, User, UserList, UserRegister, UserUpdateInput } from './types';

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
                    createdAt {
                        iso
                        humanReadable
                    }
                    updatedAt {
                        iso
                        humanReadable
                    }
                    lastLogin {
                        iso
                        humanReadable
                    }
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
                user {
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
  userUpdate: (
    id: string,
    user: UserUpdateInput,
  ): Interaction<{ userUpdate: User }> => ({
    query: gql`
        mutation userUpdate($id: ID!, $user: UserUpdateInput!) {
            userUpdate(id: $id, user: $user) {
                id
                role
                firstName
                lastName
                fullName
                userName
                email
            }
        }
    `,
    variables: { user, id },
  }),
  userUpdateMyself: (
    user: UserUpdateInput,
  ): Interaction<{ userUpdateMyself: User }> => ({
    query: gql`
        mutation userUpdateMyself($user: UserUpdateInput!) {
            userUpdateMyself(user: $user) {
                id
                role
                firstName
                lastName
                fullName
                userName
                email
            }
        }
    `,
    variables: { user },
  }),
  userLogin: (
    userNameOrEmail: string,
    password: string,
  ): Interaction<{ userLogin: Auth }> => ({
    query: gql`
        mutation userLogin($userNameOrEmail: String!, $password: String!) {
            userLogin(
                user: { userNameOrEmail: $userNameOrEmail, password: $password }
            ) {
                token
                user {
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
  user: (id: string): Interaction<{ user: User }> => ({
    query: gql`
        query user($id: ID!) {
            user(id: $id) {
                id
                role
                firstName
                lastName
                fullName
                userName
                email
            }
        }
    `,
    variables: { id },
  }),
  me: (): Interaction<{ me: User }> => ({
    query: gql`
        query me {
            me {
                id
                role
                firstName
                lastName
                fullName
                userName
                email
            }
        }
    `,
    variables: {},
  }),
  findMedia: (filter: MediaFilter): Interaction<{ findMedia: MediaList }> => ({
    query: gql`
        query findMedia($filter: MediaFilter) {
            findMedia(filter: $filter) {
                meta{
                    totalCount
                }
                entries{
                    createdAt {
                        humanReadable
                        iso
                    }
                    updatedAt {
                        humanReadable
                        iso
                    }
                    id
                    source{
                        thumbnail
                        mediaType
                        sourceType
                        url
                        id
                    }
                }
            }
        }
    `,
    variables: { filter },
  }),
};
