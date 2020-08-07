Feature: create training within training set
  # Todo this is probably not done on backend
  Scenario: fail create empty training with activity
    Given created training set
    And user visits "create training" form
    When user enters name of training
    And user creates media in training
    And user deletes all media from training
    And user submits the form
    Then the training should not be created

  Scenario: fail create empty training without activity
    Given created training set
    And user visits "create training" form
    When user enters name of training
    And user submits the form
    Then the training should not be created

  Scenario Template: create training and test searching for media
    Given created training set
    And user visits "create training" form
    When user enters name of training
    And user creates media with following sources <sources>
    And user creates media with following fulltext search <search>
    And user submits the form
    Then the training should be created containing the <media>
    Examples:
    | sources                 | search                        | media                               |
    | Z5iWr6Srsj8,IiwGbcd8S7I |                               | Z5iWr6Srsj8,IiwGbcd8S7I             |
    | Z5iWr6Srsj8,IiwGbcd8S7I | History Of The Need For Speed | Z5iWr6Srsj8,IiwGbcd8S7I,5MJcklKwYBQ |
    |                         | History Of The Need For Speed | 5MJcklKwYBQ                         |

