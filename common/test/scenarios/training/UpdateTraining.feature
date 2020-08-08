Feature: update training
  Scenario Outline: update training by adding a new media
    Given existing training
    And user visits training form
    And adds media <media>
    Then the training should contain the media
    Examples:
      | media                               |
      | Z5iWr6Srsj8,IiwGbcd8S7I             |
      | Z5iWr6Srsj8,IiwGbcd8S7I,5MJcklKwYBQ |
      | 5MJcklKwYBQ                         |
  Scenario Outline: update training by removing an existing media
    Given existing training with all media created
    And user visits training form
    And removes media <media>
    Then the training should not contain removed media
    Examples:
      | media                   |
      | Z5iWr6Srsj8,IiwGbcd8S7I |
      | Z5iWr6Srsj8,5MJcklKwYBQ |
      | 5MJcklKwYBQ             |
  Scenario Outline: update training by removing an existing media and adding a new media
    Given existing training with all media created
    And user visits training form
    And user removes media keeping form open <toRemove>
    And adds media <toAdd>
    Then the training should not contain removed media
    Examples:
      | toRemove    | toAdd       |
      | IiwGbcd8S7I | IiwGbcd8S7I |
      | 5MJcklKwYBQ | Z5iWr6Srsj8 |
