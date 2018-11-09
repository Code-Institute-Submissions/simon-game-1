# Simon Memory Game

This project is based on the Simon Memory Game. 

## UX
This webpage contains Simon Memory Game. The main goal is to let users play and have fun in a simpliest way possible.

* The interface is intuitive

* A short game description is provided in the navigation menu

* All significant events in the game are accompanied by pop-ups such as when the game is over or the player won or the sequence is incorrect.

### User Stories
1. I really enjoyed Simon Memory Game as child. My goal is to play a similar game on-line.
   
2. I am not familiar with the original game but I would like to play a memory game. I can read the short description of the game and play.


## Features


### Existing Features
1. Users can immediately star playing
2. Game description and rules provided in the navigation menu.
3. Once started one of the four sounds is played. Sounds are randomly selected.
4. User can play in two different modes : strict and normal. 
5. If playing in strict mode the game ends as soon as the player makes a mistake
6. In strict mode when a mistake is made a pop-up will inform the player that the game is over
   In normal mode the player is asked to try again.
6. After clicking on the start button it transforms into realod, user can reload/restart the game at any moment.
8. A display on the gamefield shows the current level. 
8. The game is won once level 20 is reached. A pop-up will inform the player that he is winner.

### Other possible Features 

Allow user to continue after level 20.


## Technologies Used
HTML,CSS & JavaScript;

SASS - For a more efficient way of styling
[SASS](https://sass-lang.com/) 

Google Fonts - For additional fonts with particular styling.
[Google fonts](https://fonts.google.com/)

Font Awesome - For icons and buttons
[Font Awesome](https://fontawesome.com/free)

jQuery - for a simplified scripting
[jQuery](https://jquery.com)

## Testing

### Game dinamic:
1. Start the game, check that the firs sound is randomly selected and played. Check that it is correctly added to the array by using Chrome console and debugging tools.
2. Check that when the user clicks on a button it is correctly added to the array (as in the example above)
3. Make sure that the check between two arrays is correct.
4. There was a particular issue regarding the phase when one more sound was added to the sequence and it was played again. It wouldn't play and there was no animation, though the arrays where populated correctly.
   It was solved by using a self-invoking function.
5.Check that when level 20 is reached the "Win" pop-up is displayed.
6.When in strict mode check that the game ends at the first mistake.
7.When in normal mode check that the game continues and the sequence is played one more time.
8.Check that once started the "Start" button becomes "Reload/Restart" and allows to restart, overriding any progress.

### Adaptability to different viewport sizes:
Checked the game is displayed and possibilites of imrpovement on different devices using Chrome tools.

## Deployment

Deployed using GitHub Pages .

## Media

The audio files were obtained from:
* [Freecodecamp](https://www.freecodecamp.org/)
* [Freesound](http://www.freesound.org/)
