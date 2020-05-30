Feature: Login user
  Successful and unsuccessful login

  Scenario Outline: logging in
    When user visits login form
    And user enters username <username>
    And user enters password <password>
    And user tries to login
    Then it should be <state>
    Examples:
      | username | password                              | state        |
      | demo-1   | {env.APP_DEMO_USER_PASS}              | successful   |
      | demo-2   | {env.APP_DEMO_USER_PASS}              | successful   |
      | demo-1   | something-that'll probably won't work | unsuccessful |
      | demo-2   | An0therDummyPAss                      | unsuccessful |
