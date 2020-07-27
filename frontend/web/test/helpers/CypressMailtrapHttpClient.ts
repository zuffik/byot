import {HttpProvider} from 'mailtrap-client';

export const CypressMailtrapHttpClient: HttpProvider = (method, url, headers, responseType, body) =>
  new Cypress.Promise(res =>
    cy
      .request({
        method,
        url,
        body,
        headers,
      })
      .then(response => res(response.body))
  );
