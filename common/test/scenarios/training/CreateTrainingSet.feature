Feature: Creation of a training set

  Scenario Outline: create named training set
    Given user visits "create training set" form
    When user enters name of training set <name>
    And user submits the form
    Then the training set <shouldOrShouldNot> be created
    Examples:
      | name         | shouldOrShouldNot |
      | Training set | should            |
      | Example set  | should            |
      |              | should not        |
