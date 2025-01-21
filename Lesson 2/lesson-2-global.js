// This is a single-line comment in JavaScript.

/* 
This is a multi-line comment.
We can use it to provide more detailed explanations.
*/

// This is a Node.js script. To run this file:
/*  1. Save it as `lesson-2-global.js`.
    2. Open your terminal.
    3. Navigate to the folder where this file is saved.
    4. Run the file by typing: `node lesson-2-global.js`.
*/

// Lesson 2: The global object
/* 
     - In Node.js, the global object is similar to the `window` object in a browser.
     - It provides variables and functions that are available everywhere in your application.
     - Some important global objects include:
       - `console`: Used for logging information to the console (e.g., `console.log()`)
       - `process`: Gives you information about the current Node.js process.
       - `global`:  The actual global object itself.
*/

// Explore the `global` object
console.log(global); // Output all the properties and methods of the global object

// Using `setTimeout` (a method of the global object)
// Schedule a message to be displayed after 500 milliseconds
global.setTimeout(() => {
  console.log('This message appears after 500ms');
}, 500);

// The `global` object is implied, so you can often omit it
setTimeout(() => {
  console.log('This message appears after 3 seconds');
}, 3000);

// Create a simple timer using `setInterval`
/*  
    setInterval then takes care of calling your function automatically at the specified intervals.
    It's like setting an alarm that goes off repeatedly, triggering your code each time.
    In this example, the timer ticks every 1000ms
*/
let seconds = 0;
const timer = setInterval(() => {
  seconds++;
  console.log(`Timer: ${seconds} seconds`);
  if (seconds === 5) {
    clearInterval(timer); // Stop the timer after 5 seconds
    console.log("Time's up!");
  }
}, 1000);

// Accessing special variables
/*
  __dirname:
    - This variable gives you the absolute path to the directory of the currently executing file.
    - It's a built-in variable in Node.js, so you don't need to define it yourself.
    - The double underscores (__) at the beginning are a convention in Node.js to indicate that it's a special variable or property.
    - This helps to avoid naming conflicts with your own variables.

    Why is this useful?
    - Imagine your script needs to read a configuration file.  
    - You can use __dirname to create the full path to that file, 
      no matter where your script is located within your project.

  __filename:
    - This variable gives you the full absolute path to the current file (including the directory and filename).

    Why is this useful?
    - You can use it to find the location of other files relative to the current file.
    - It can also be helpful for debugging, as it tells you exactly which file is being executed.
*/

console.log(`Current directory: ${__dirname}`); // Display the directory of the current file
console.log(`Current file: ${__filename}`); // Display the full path to the current file
