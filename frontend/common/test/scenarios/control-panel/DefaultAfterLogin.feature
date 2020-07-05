Feature: Default after login behaviour
  Scenario:
    Given successfully logged user
    Then user should see own training sets
    And sidebar with navigation
    And option to logout
