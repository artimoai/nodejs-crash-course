// This is a single-line comment in JavaScript.

/* 
This is a multi-line comment.
We can use it to provide more detailed explanations.
*/

// This is a Node.js script. To run this file:
/*  1. Save it as `lesson-1.js`.
    2. Open your terminal.
    3. Navigate to the folder where this file is saved.
    4. Run the file by typing: `node lesson-1.js`.
*/

// Declare a variable called 'myName' and assign it the value 'Andrei'.
const myName = 'Andrei';

// Use console.log to print the value of 'myName' to the console.
// The console is a useful tool for displaying information and debugging your code.
console.log(myName);

// Define a function called 'greetings' that takes one parameter 'name'.
function greetings(name) {
  // This line has a small error. We should use backticks (`) for template literals.
  console.log(`Greetings, ${name}!`); // Template literals make it easy to embed variables in strings.
}

// Call the 'greetings' function with different arguments.
greetings(myName); // Output: Greetings, Andrei!
greetings('Teo'); // Output: Greetings, Teo!
