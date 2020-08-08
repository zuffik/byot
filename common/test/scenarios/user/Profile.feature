Feature: profile
  Scenario: view profile
    Given registered user
    When user visits profile
    Then he should see his data
  Scenario: update profile
    Given registered user
    When user visits profile form
    And user update values
    Then profile should contain new values
  Scenario Outline: update password
    Given registered user with <registerPass>
    When user visits profile form
    And user enters his old password <oldPass>
    And user enters new password <newPass>
    And user repeats password <repeatPass>
    And user submits the form
    Then the form <isOrIsNot> submitted
    And user <shouldOrShouldNot> be able to login with new password
    Examples:
    | registerPass  | oldPass  | newPass  | repeatPass | isOrIsNot | shouldOrShouldNot |
    | D3m0P-SS      | D3m0P-SS | D3m0P-S1 | D3m0P-S1   | is        | should            |
    | D3m0P-SS      | D3m0P-SS | D3m0P-S0 | D3m0P-S1   | is not    | should not        |
    | D3m0P-SS      | D3m0P-SS | light    | light      | is not    | should not        |
    | D3m0P-S1      | D3m0P-SS | D3m0P-S0 | D3m0P-S0   | is        | should not        |
