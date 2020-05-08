import {
  Auth,
  AuthNameCheck,
  AuthNameCheckResult,
  FulltextFilter,
  FulltextFilterForUser,
  Media,
  MediaFilter,
  MediaList,
  ResetPassword,
  Token,
  Training,
  TrainingDraftInput,
  TrainingList,
  TrainingSet,
  TrainingSetInput,
  TrainingSetList,
  TrainingUpdateInput,
  User,
  UserList,
  UserRegister,
  UserUpdateInput,
} from '../../src/graphql/ts/types';

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
            emailValidated
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
          meta {
            totalCount
          }
          entries {
            createdAt {
              humanReadable
              iso
            }
            updatedAt {
              humanReadable
              iso
            }
            id
            source {
              thumbnail
              mediaType
              sourceType
              resourceId
              url
              id
            }
          }
        }
      }
    `,
    variables: { filter },
  }),
  allTrainingSets: (
    filter?: FulltextFilterForUser,
  ): Interaction<{ allTrainingSets: TrainingSetList }> => ({
    variables: { filter },
    query: gql`
      query allTrainingSets($filter: FulltextFilterForUser) {
        allTrainingSets(filter: $filter) {
          entries {
            id
            label
            owner {
              fullName
              userName
              firstName
              lastName
              email
              role
              id
            }
            createdAt {
              humanReadable
              iso
            }
            updatedAt {
              humanReadable
              iso
            }
            trainings {
              meta {
                totalCount
              }
              entries {
                id
                label
                media {
                  meta {
                    totalCount
                  }
                  entries {
                    id
                    label
                    createdAt {
                      humanReadable
                      iso
                    }
                    updatedAt {
                      humanReadable
                      iso
                    }
                    source {
                      id
                      mediaType
                      resourceId
                      sourceType
                      thumbnail
                    }
                  }
                }
              }
            }
          }
          meta {
            totalCount
          }
        }
      }
    `,
  }),
  trainingSet: (id: string): Interaction<{ trainingSet: TrainingSet }> => ({
    variables: { id },
    query: gql`
      query trainigSet($id: ID!) {
        trainingSet(id: $id) {
          id
          label
          owner {
            fullName
            userName
            firstName
            lastName
            email
            role
            id
          }
          createdAt {
            humanReadable
            iso
          }
          updatedAt {
            humanReadable
            iso
          }
          trainings {
            meta {
              totalCount
            }
            entries {
              id
              label
              media {
                meta {
                  totalCount
                }
                entries {
                  id
                  label
                  source {
                    id
                    mediaType
                    sourceType
                    resourceId
                    thumbnail
                  }
                }
              }
            }
          }
        }
      }
    `,
  }),
  createTrainingSet: (
    input: TrainingSetInput,
  ): Interaction<{ createTrainingSet: TrainingSet }> => ({
    variables: { input },
    query: gql`
      mutation createTrainigSet($input: TrainingSetInput) {
        createTrainingSet(trainingSet: $input) {
          id
          label
          owner {
            fullName
            userName
            firstName
            lastName
            email
            role
            id
          }
          createdAt {
            humanReadable
            iso
          }
          updatedAt {
            humanReadable
            iso
          }
          trainings {
            meta {
              totalCount
            }
            entries {
              id
              label
              media {
                meta {
                  totalCount
                }
                entries {
                  id
                  label
                  source {
                    id
                    mediaType
                    sourceType
                    resourceId
                    thumbnail
                  }
                }
              }
            }
          }
        }
      }
    `,
  }),
  updateTrainingSet: (
    id: string,
    input: TrainingSetInput,
  ): Interaction<{ updateTrainingSet: TrainingSet }> => ({
    variables: { id, input },
    query: gql`
      mutation updateTrainingSet($id: ID!, $input: TrainingSetInput!) {
        updateTrainingSet(trainingSet: $input, id: $id) {
          id
          label
          owner {
            fullName
            userName
            firstName
            lastName
            email
            role
            id
          }
          createdAt {
            humanReadable
            iso
          }
          updatedAt {
            humanReadable
            iso
          }
          trainings {
            meta {
              totalCount
            }
            entries {
              id
              label
              media {
                meta {
                  totalCount
                }
                entries {
                  id
                  label
                  source {
                    id
                    mediaType
                    sourceType
                    resourceId
                    thumbnail
                  }
                }
              }
            }
          }
        }
      }
    `,
  }),
  allTrainings: (
    filter?: FulltextFilter,
  ): Interaction<{ allTrainings: TrainingList }> => ({
    variables: { filter },
    query: gql`
      query allTrainings($filter: FulltextFilter) {
        allTrainings(filter: $filter) {
          meta {
            totalCount
          }
          entries {
            id
            label
            createdAt {
              humanReadable
              iso
            }
            owner {
              fullName
              userName
              firstName
              lastName
              email
              role
              id
            }
            createdAt {
              humanReadable
              iso
            }
            updatedAt {
              humanReadable
              iso
            }
            trainingSet {
              id
              label
              owner {
                fullName
                userName
                firstName
                lastName
                email
                role
                id
              }
            }
          }
        }
      }
    `,
  }),
  createTraining: (
    training: TrainingDraftInput,
  ): Interaction<{ createTraining: Training }> => ({
    variables: { training },
    query: gql`
      mutation createTraining($training: TrainingDraftInput!) {
        createTraining(draft: $training) {
          id
          label
          createdAt {
            humanReadable
            iso
          }
          owner {
            fullName
            userName
            firstName
            lastName
            email
            role
            id
          }
          createdAt {
            humanReadable
            iso
          }
          updatedAt {
            humanReadable
            iso
          }
          trainingSet {
            id
            label
            owner {
              fullName
              userName
              firstName
              lastName
              email
              role
              id
            }
          }
          media {
            meta {
              totalCount
            }
            entries {
              id
              label
              source {
                id
                mediaType
                sourceType
                thumbnail
                resourceId
              }
            }
          }
        }
      }
    `,
  }),
  updateTraining: (
    id: string,
    training: TrainingUpdateInput,
  ): Interaction<{ updateTraining: Training }> => ({
    variables: { id, training },
    query: gql`
      mutation updateTraining($id: ID!, $training: TrainingUpdateInput!) {
        updateTraining(id: $id, training: $training) {
          id
          label
          createdAt {
            humanReadable
            iso
          }
          owner {
            fullName
            userName
            firstName
            lastName
            email
            role
            id
          }
          createdAt {
            humanReadable
            iso
          }
          updatedAt {
            humanReadable
            iso
          }
          trainingSet {
            id
            label
            owner {
              fullName
              userName
              firstName
              lastName
              email
              role
              id
            }
          }
          media {
            meta {
              totalCount
            }
            entries {
              id
              label
              source {
                id
                mediaType
                resourceId
                sourceType
                thumbnail
              }
            }
          }
        }
      }
    `,
  }),
  training: (id: string): Interaction<{ training: Training }> => ({
    variables: { id },
    query: gql`
      query training($id: ID!) {
        training(id: $id) {
          id
          label
          createdAt {
            humanReadable
            iso
          }
          owner {
            fullName
            userName
            firstName
            lastName
            email
            role
            id
          }
          createdAt {
            humanReadable
            iso
          }
          updatedAt {
            humanReadable
            iso
          }
          trainingSet {
            id
            label
            owner {
              fullName
              userName
              firstName
              lastName
              email
              role
              id
            }
          }
          media {
            meta {
              totalCount
            }
            entries {
              id
              label
              source {
                id
                mediaType
                resourceId
                sourceType
                thumbnail
              }
            }
          }
        }
      }
    `,
  }),
  allMedia: (
    filter?: FulltextFilter,
  ): Interaction<{ allMedia: MediaList }> => ({
    variables: { filter },
    query: gql`
      query allMedia($filter: FulltextFilter) {
        allMedia(filter: $filter) {
          meta {
            totalCount
          }
          entries {
            id
            label
            source {
              id
              mediaType
              resourceId
              sourceType
              thumbnail
            }
          }
        }
      }
    `,
  }),
  media: (id: string): Interaction<{ media: Media }> => ({
    variables: { id },
    query: gql`
      query media($id: ID!) {
        media(id: $id) {
          id
          label
          source {
            id
            mediaType
            resourceId
            sourceType
            thumbnail
          }
        }
      }
    `,
  }),
  removeMediaFromTraining: (
    idTraining: string,
    idMedia: string,
  ): Interaction<{ removeMediaFromTraining: Training }> => ({
    variables: { idTraining, idMedia },
    query: gql`
      mutation removeMediaFromTraining($idTraining: ID!, $idMedia: ID!) {
        removeMediaFromTraining(idMedia: $idMedia, idTraining: $idTraining) {
          id
          label
          createdAt {
            humanReadable
            iso
          }
          owner {
            fullName
            userName
            firstName
            lastName
            email
            role
            id
          }
          createdAt {
            humanReadable
            iso
          }
          updatedAt {
            humanReadable
            iso
          }
          trainingSet {
            id
            label
            owner {
              fullName
              userName
              firstName
              lastName
              email
              role
              id
            }
          }
          media {
            meta {
              totalCount
            }
            entries {
              id
              label
              createdAt {
                humanReadable
                iso
              }
              updatedAt {
                humanReadable
                iso
              }
              source {
                id
                mediaType
                resourceId
                sourceType
                thumbnail
              }
            }
          }
        }
      }
    `,
  }),
  removeTrainingFromTrainingSet: (
    id: string,
  ): Interaction<{ removeTrainingFromTrainingSet: Training }> => ({
    variables: { id },
    query: gql`
      mutation removeTrainingFromTrainingSet($id: ID!) {
        removeTrainingFromTrainingSet(id: $id) {
          id
          label
          createdAt {
            humanReadable
            iso
          }
          owner {
            fullName
            userName
            firstName
            lastName
            email
            role
            id
          }
          createdAt {
            humanReadable
            iso
          }
          updatedAt {
            humanReadable
            iso
          }
          trainingSet {
            id
            label
            owner {
              fullName
              userName
              firstName
              lastName
              email
              role
              id
            }
          }
          media {
            meta {
              totalCount
            }
            entries {
              id
              label
              source {
                id
                mediaType
                resourceId
                sourceType
                thumbnail
              }
            }
          }
        }
      }
    `,
  }),
  removeTrainingSet: (
    id: string,
  ): Interaction<{ removeTrainingSet: TrainingSet }> => ({
    variables: { id },
    query: gql`
      mutation removeTrainingSet($id: ID!) {
        removeTrainingSet(id: $id) {
          id
          label
          owner {
            fullName
            userName
            firstName
            lastName
            email
            role
            id
          }
          createdAt {
            humanReadable
            iso
          }
          updatedAt {
            humanReadable
            iso
          }
          trainings {
            meta {
              totalCount
            }
            entries {
              id
              label
              media {
                meta {
                  totalCount
                }
                entries {
                  id
                  label
                  source {
                    id
                    mediaType
                    sourceType
                    resourceId
                    thumbnail
                  }
                }
              }
            }
          }
        }
      }
    `,
  }),
  userConfirmEmail: (
    token: string,
  ): Interaction<{ userConfirmEmail: Token }> => ({
    variables: { token },
    query: gql`
      mutation userConfirmEmail($token: String!) {
        userConfirmEmail(token: $token) {
          id
        }
      }
    `,
  }),
  checkUserAuthName: (
    check: AuthNameCheck,
  ): Interaction<{ checkUserAuthName: AuthNameCheckResult }> => ({
    variables: { check },
    query: gql`
      query checkUserAuthName($check: AuthNameCheck!) {
        checkUserAuthName(check: $check) {
          available
        }
      }
    `,
  }),
  userRequestPasswordReset: (
    email: string,
  ): Interaction<{ userRequestPasswordReset: null }> => ({
    variables: { email },
    query: gql`
      mutation userRequestPasswordReset($email: String!) {
        userRequestPasswordReset(email: $email)
      }
    `,
  }),
  userResetPassword: (
    reset: ResetPassword,
  ): Interaction<{ userResetPassword: Token }> => ({
    variables: { reset },
    query: gql`
      mutation userResetPassword($reset: ResetPassword!) {
        userResetPassword(input: $reset) {
          id
        }
      }
    `,
  }),
};
