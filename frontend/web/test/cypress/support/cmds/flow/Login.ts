export const login = (
  email: string = Cypress.env('APP_TEST_USER_EMAIL'),
  pass: string = Cypress.env('APP_TEST_USER_PASSWORD')
) => {
  cy.request('POST', Cypress.env('PUBLIC_API_URL') + '/graphql', {
    query: `
            mutation {
                userLogin(user: {userNameOrEmail: "${email}", password: "${pass}"}) {
                    token
                    user {
                        email
                        emailValidated
                        firstName
                        lastName
                        fullName
                        userName
                        id
                    }
                }
            }
        `,
  }).then(res => {
    const user = res.body.data.userLogin;
    localStorage.setItem('auth', JSON.stringify(user));
  });
};

export type LoginCommand = typeof login;
