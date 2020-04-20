export interface Interaction {
  query: string;
  variables?: { [K: string]: any };
}

export const graphQLInteraction: { [K: string]: (...args: any[]) => Interaction } = {
  allUsers: () => ({
    query: `
        query {
            allUsers {
                meta {
                    totalCount
                }
                entries {
                    id
                    email
                }
            }
        }
    `,
  }),
};
