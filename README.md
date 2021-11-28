# PP-Calculator

This project is about coding and styling a calculator
Goal here is to practice logical thinking and JS

To-do:

-handle decimals - done
-handle priority of operators
-handle use of parenthesis(see Difficulties encountered)
-handle the fact that user can click on an operator more than once 
        --> creates a bug: even if extra operator is removed thanks to the delete button, console throws an error --> has to do with the blank spaces added on each side of the operators(see Difficulties encountered) - done 
-make delete button functional - done
-handle really big numbers
-display characters on the screen as the user clicks on them - done
-handle multiple operators in one operation - done
-make app responsive


Difficulties encountered:
    -turn the operator selected by the user from a string to an actual operator, in order to make the calculation
        -sorted out: used an array to store the operands and the operator, then a switch case 
                     to determine the operation that needs to be done
    -bug created by blank spaces:
        -sorted out: removed the blank spaces(not needed in the end). When equal sign is clicked --> function separates the operands and the operators and pushes them to an array then, loops through that array using a switch case to determine which type of operation should be done. Fixes the bug and handles multiple operators in one operation all at once.
    -creating a recursive function to handle parenthesis: