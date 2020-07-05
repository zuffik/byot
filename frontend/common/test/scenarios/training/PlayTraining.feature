Feature: play training
  Scenario: play simple training
    Given training with 2 short media
    When user clicks play button
    Then both media should be played
  Scenario: play and pause training
    Given training with 2 short media
    When user clicks play button
    And user waits some time
    And user clicks pause button
    Then media should not be completely played
  Scenario: play, pause and resume training
    Given training with 2 short media
    When user clicks play button
    And user waits some time
    And user clicks pause button
    And user waits some time
    And user clicks resume button
    Then media should be completely played
  Scenario: play and stop training
    Given training with 2 short media
    When user clicks play button
    And user waits some time
    And user clicks stop button
    And user clicks play button
    Then media should be idle
  Scenario: play, pause and restart training
    Given training with 2 short media
    When user clicks play button
    And user waits some time
    And user clicks pause button
    And user clicks restart button
    Then media should start playing from start
