# PP-Calculator

This project is about coding and styling a calculator
Goal here is to practice logical thinking and JS

To-do:

-sort out how to handle decimals
-handle the fact that user can click on an operator more than once 
        --> creates a bug: even if extra operator is removed thanks to the delete button, console throws an error --> may have to do with blank spaces added in the HTML tags of each operator
-make delete button functional - done
-handle really big numbers
-display characters on the screen as the user clicks on them - done


Difficulties encountered:
    -turn the operator selected by the user from a string to an actual operator, in order to make the calculation
        -sorted out: used an array to store the operands and the operator, then a switch case 
                     to determine the operation that needs to be done