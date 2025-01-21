// This is a Node.js script. To run this file:
/*  1. Save it as `lesson-1-exercise.js`.
    2. Open your terminal.
    3. Navigate to the folder where this file is saved.
    4. Run the file by typing: `node lesson-1-exercise.js`.
*/

// Lesson 1: Interactive Number Guessing Game

// Node.js allows you to use modules, which are like libraries of code.
// The `readline` module provides an easy way to get user input from the terminal.
const readline = require('readline');

// We create an interface to handle communication between our program and the terminal.
// `process.stdin` represents the standard input (where the user types),
// and `process.stdout` is the standard output (where the results are displayed).
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Generate a random secret number between 1 and 10 (inclusive).
// `Math.random()` gives us a number between 0 (inclusive) and 1 (exclusive),
// so we multiply by 10, add 1, and use `Math.floor()` to get a whole number in our desired range.
const randomNumber = Math.floor(Math.random() * 10) + 1;

// Keep track of how many guesses the user makes.
let attempts = 0;

// Greet the player and explain the game.
console.log('Welcome to the Number Guessing Game!');
console.log('I have chosen a number between 1 and 10. Can you guess it?');

// This function asks the user for their guess and checks if it's correct.
function askForGuess() {
  // `rl` is an object that gives us ways to interact with the terminal.
  // `.question()` is a method (a function that belongs to an object) that lets us ask the user a question.
  // It waits for the user to type something and press Enter.
  // The second argument to `.question()` is a function that will be called with the user's input.
  rl.question('Enter your guess: ', (input) => {
    attempts++; // Increase the number of attempts by 1.

    // Convert the user's input (which is initially a string like "5") into an actual number.
    const userGuess = parseInt(input, 10);

    // Check if the user entered something that's not a number (like "hello").
    if (isNaN(userGuess)) {
      console.log('Please enter a valid number.');
    }
    // If the guess is correct, the player wins!
    else if (userGuess === randomNumber) {
      console.log(`🎉 Congratulations! You guessed the number in ${attempts} tries!`);
      rl.close(); // We're done with the game, so we close the input interface.
      return; // Stop the function here.
    }
    // If the guess is too low...
    else if (userGuess < randomNumber) {
      console.log('Too low! Try again.');
    }
    // If the guess is too high...
    else {
      console.log('Too high! Try again.');
    }

    // Ask for another guess. This is called recursion (the function calls itself).
    askForGuess();
  });
}

// Start the game!
askForGuess();
