// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
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

Cypress.Commands.add('login', login);

export default undefined;
