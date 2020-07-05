Feature: delete training set
  Scenario: delete training set with all its trainings
    Given existing training set
    And user clicks delete button
    Then the training set and all its trainings should not exist
