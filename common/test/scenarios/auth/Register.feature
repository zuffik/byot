Feature: Register user
  Successful and unsuccessful registering

  Scenario Outline: registering user
    When user visits sign-up page
    And enters firstName <firstName>
    And enters lastName <lastName>
    And enters email <email>
    And enters password <password>
    And enters passwordRepeat <passwordRepeat>
    And <does> consent to data storage
    And clicks register
    Then user register should be <result>

    Examples:
    | firstName | lastName | email                     | password                     | passwordRepeat               | does     | result       |
    | John      | Doe      | {env.APP_DEMO_USER_EMAIL} | {env.APP_DEMO_USER_PASSWORD} | {env.APP_DEMO_USER_PASSWORD} | does     | successful   |
    |           |          | {env.APP_DEMO_USER_EMAIL} | {env.APP_DEMO_USER_PASSWORD} | {env.APP_DEMO_USER_PASSWORD} | does     | successful   |
    | John      |          | {env.APP_DEMO_USER_EMAIL} | {env.APP_DEMO_USER_PASSWORD} | {env.APP_DEMO_USER_PASSWORD} | does     | successful   |
    | John      |          |                           | {env.APP_DEMO_USER_PASSWORD} | {env.APP_DEMO_USER_PASSWORD} | does     | unsuccessful |
    | John      |          | {env.APP_DEMO_USER_EMAIL} | {env.APP_DEMO_USER_PASSWORD} | not matching pass            | does     | unsuccessful |
    | John      | Doe      | {env.APP_DEMO_USER_EMAIL} | abc                          | abc                          | does     | unsuccessful |
    | John      | Doe      | {env.APP_DEMO_USER_EMAIL} | {env.APP_DEMO_USER_PASSWORD} | {env.APP_DEMO_USER_PASSWORD} | does not | unsuccessful |
