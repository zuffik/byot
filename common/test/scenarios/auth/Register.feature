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
    Then the result should be <result>

    Examples:
    | firstName | lastName | email                | password                 | passwordRepeat           | does     | result       |
    | John      | Doe      | john.doe@example.com | {env.APP_DEMO_USER_PASS} | {env.APP_DEMO_USER_PASS} | does     | successful   |
    |           |          | john@example.com     | {env.APP_DEMO_USER_PASS} | {env.APP_DEMO_USER_PASS} | does     | successful   |
    | John      |          | john.doe@example.com | {env.APP_DEMO_USER_PASS} | {env.APP_DEMO_USER_PASS} | does     | successful   |
    | John      |          |                      | {env.APP_DEMO_USER_PASS} | {env.APP_DEMO_USER_PASS} | does     | unsuccessful |
    | John      |          | john.doe@example.com | {env.APP_DEMO_USER_PASS} | not matching pass        | does     | unsuccessful |
    | John      | Doe      | john.doe@example.com | abc                      | abc                      | does     | unsuccessful |
    | John      | Doe      | john.doe@example.com | {env.APP_DEMO_USER_PASS} | {env.APP_DEMO_USER_PASS} | does not | unsuccessful   |
