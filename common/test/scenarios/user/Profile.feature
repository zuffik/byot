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
