Feature: Forgot password
  Scenario Outline: user will always receive email within this scenario
    Given user has been registered with email <email>
    And user tries to reset his password
    When user enters email <email>
    And form is submitted
    Then user should receive email with link
    When user visits link from email
    And user enters password <password>
    And user confirms password <passwordRepeat>
    Then the result should be <state>
    Examples:
      | email                | password                 | passwordRepeat           | state        |
      | john.doe@example.com | {env.APP_DEMO_USER_PASS} | {env.APP_DEMO_USER_PASS} | successful   |
      | john.doe@example.com | {env.APP_DEMO_USER_PASS} | not matching pass        | unsuccessful |
      | john.doe@example.com | abc                      | abc                      | unsuccessful |

  Scenario Outline: user will never receive email within this scenario
    Given user has been registered with email <registerEmail>
    And user tries to reset his password
    When user enters email <forgotPasswordEmail>
    And form <isOrIsNot> submitted
    Then user should not receive email with link
    Examples:
      | registerEmail        | forgotPasswordEmail   | isOrIsNot    |
      |                      | john.doe@eample.com   | is           |
      | john.doe@example.com | john.doe@e1xample.com | is           |
      | john.doe@example.com | john.com              | is not       |
