# tic-tac-toe

Tic Tac Toe using JS and Factory Functions

Nov 12, 2025

Create basic HTML, CSS and JS files
Check link and script src for functionality
Add Basic functions in to JS to create players, draw game board, add player marker to board, switch 
player turns, check for winning conditions and play through a basic game in the console
Add function to check for tie game and add round counter to play function so the game stops at a full board
Add function to check if cell is full already before player selects it, if it sees that it is full then
it prompts the same player to pick a different cell

Nov 13, 2025
Found that check tie game and check cells functions were redundant and re worked functions around it
Created a new playRound function to clean up the playGame function
Encapsulated functions into 3 total factories, one that creates players, one that creates the board
and the final one that runs through the gameplay

Still need to connect Javascript to HTML/CSS