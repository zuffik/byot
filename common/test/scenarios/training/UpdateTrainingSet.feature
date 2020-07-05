Feature: Update of a training set

  Scenario Outline: update name of training set
    Given created training with name <originalName>
    And user visits form with this training set
    When user enters new name of training set <newName>
    And user submits the form
    Then the training set <shouldOrShouldNot> be updated
    And the training set should have name <newName>
    Examples:
      | originalName   | newName              | shouldOrShouldNot |
      | Training set   | Updated training set | should            |
      | Same name set  | Same name set        | should            |
      | Ouch sth       |                      | should not        |
