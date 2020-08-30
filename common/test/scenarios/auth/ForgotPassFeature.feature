Feature: Forgot password
  Scenario Outline: user will always receive email within this scenario
    Given user has been registered with email <email>
    And user tries to reset his password
    When user enters email <email>
    And user requests new password
    Then user should receive email with link
    When user visits link from email
    And user enters password to reset <password>
    And user confirms password <passwordRepeat>
    Then the result should be <state>
    When user with email <email> tries to login with new password <password>
    Then login after password change should be <loginState>
    Examples:
      | email                     | password                     | passwordRepeat               | state        | loginState   |
      | {env.APP_DEMO_USER_EMAIL} | {env.APP_DEMO_USER_PASSWORD} | {env.APP_DEMO_USER_PASSWORD} | successful   | successful   |
      | {env.APP_DEMO_USER_EMAIL} | 123-Abc$                     | not matching pass            | unsuccessful | unsuccessful |
      | {env.APP_DEMO_USER_EMAIL} | abc                          | abc                          | unsuccessful | unsuccessful |

  Scenario Outline: user will never receive email within this scenario
    Given user has been registered with email <email>
    And user tries to reset his password
    When user enters wrong email <forgotPasswordEmail>
    And form <isOrIsNot> submitted
    Then user should not receive email with link
    Examples:
      | email                     | forgotPasswordEmail   | isOrIsNot    |
      | {env.APP_DEMO_USER_EMAIL} | john.doe@eample.com   | is           |
      | {env.APP_DEMO_USER_EMAIL} | john.doe@e1xample.com | is           |
      | {env.APP_DEMO_USER_EMAIL} | john.com              | is not       |
