# Connect Four Clone
Created By: Jerome Ortega - HTML, CSS, JavaScript (No Frameworks)

[Play It Here](http://connect-four-jerry.surge.sh/)

### Initial Thoughts

Thinking of game logic, I know there are certain objectives that must be achieved:
1. Make sure the game alternates turns as players place pieces.
2. Players cannot play a piece if the column is full.
3. Make the computer pick a random column that still has space and send a piece.
4. Check if there is a winner every round.  Check all possible win conditions including horizontal, vertical, and diagonal.
5. If there is a winner, declare who won and make the game reset using player input.  Must reset the visual board as well as the game board.
6. Check if the board is full after the computer player moves.  Since the player is going first, the computer will have the final piece drop.
6. If the board is full without a winner, stop the game and let the player reset by declaring a tie.

##### Additional Notes
- Instead of hard-coding a potential position for every single piece, I felt the best way would be to construct the DOM over time using JavaScript as pieces are played.
- I thought that a 2-d array or matrix would be the best structure, since it would make position tracking easier, and disallow going outside of the bounds.
- Checking win condition should try to limit the amount of iterations or else it could quickly get out of control.  We can use the location of the last piece placed.

### Thoughts on Checking For a win
1. I felt that since there were so few checks that needed to be done each time, I could use for loops to check for win conditions.
2. I decided that I would write the algorithm so that if a winner was found, the other possible directions wouldn't have to be checked.
3. I used a variable to track the number of tokens there were in a row, and I knew I wouldn't have to check the token just placed, because I already knew who laid that token.
4. After writing the horizontal and vertical checking algorithms, diagonals were a touch more difficult, but the idea was the same.  Check both directions of the diagonal, and count up the number of tokens in a row.
5. I knew that there was a solution that could use recursion to find the answer, but I find recursion more effective if there are vastly more possibilities that need to be crawled through.  This was so limited, that I thought for loops would offer a little more direct control.
6. After completing this algorithm, I ran some tests on it by both playing the game itself, and by running test arrays over the math to make sure edge cases were accounted for.

### Thoughts on Finishing the Project
1. Went after the possibility of a tie, and made a function to check that.
2. If the final possible piece was played and resulted in both the board being filled and a player winning, there had to be an edge case written in to prevent both conditions being true and showing up to the player.
3. Ending the game, and allowing the player to restart took a little bit of work, as I needed to find a way to make the grid not clickable after a win or tie condition was met.
4. Having the computer drop a random piece was simple enough, but I love the fact that in JavaScript, there is no built-in function to get a random integer, so a quick Google search was all I needed to get a random integer.
5. The biggest challenge in styling the game was getting the pieces to fill from the bottom first, and keep the correct pattern.  I finally found the solution myself after searching for a ton of answers that did not work for me.  All I did was invert the columns.  Since the columns are one-dimensional, they still kept the correct number associated to them.
6. I wanted to do a bit more with the colors than red and blue, because those primary colors really hurt your eyes when they are right next to each other.
7. I decided to write a short animation to fade in the restart button and who won for a tiny bit of theatrics.
