# PP-Calculator

This project is about coding and styling a calculator
Goal here is to practice logical thinking and JS

To-do:

-handle decimals - done
-handle priority of operators
-handle use of parenthesis(see Difficulties encountered) - done
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
    -handle use of parenthesis:
        -sorted out: used a function that first separates the operands from the operators and from the parenthesis, then a while loop that runs as long as there are parenthesis in the operation. Inside that while loop, a for loop finds the most nested block of parenthesis, calls a function that does the math inside that block, then the result is inserted in place of the block, and the while loop allows to repeat that process until there are no more operations within parenthesis.
            --> ! bug found ! : testcase like (3+3)*(2+2) creates an infinite loop
                    -sorted out: removed the break statement in the last else of separateOp()
                        --> creates another infinite loop for other testcases like 3*(3*(3+3))