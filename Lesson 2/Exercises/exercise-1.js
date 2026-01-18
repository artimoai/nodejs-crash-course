// =============================================================================
// PART 1: THE GLOBAL OBJECT & TIMERS
// =============================================================================

// 1. THE COUNTDOWN: Create a script that counts down from 5 to 1.
//    - Log a number every 1000ms using setInterval.
//    - When it reaches 0, log "Liftoff!" and stop the timer.

// 2. PATH LOCATOR: Log a string identifying the current environment.
//    - Output: "The file [__filename] is in [__dirname]".
//    - Use the dynamic global variables provided by Node.js.

// SOLUTIONS

// 1. setInterval(func, delay, param1)
let secondsCounter = 5;
const timer = setInterval(() => {
  console.log(`Timer: ${secondsCounter}`);
  --secondsCounter;

  if (secondsCounter === 0) {
    clearInterval(timer); // Stop the timer
    console.log('Liftoff!');
  }
}, 1000);

// 2. The current file location
const path = require('path');
console.log(`The current file: ${path.basename(__filename)} is in directory: ${__dirname}`);
