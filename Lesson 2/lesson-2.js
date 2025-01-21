// Lesson 2: Node.js basics
/* 
  In this lesson, we'll explore some fundamental concepts in Node.js:

  1. The global object:
     - In Node.js, the global object is similar to the `window` object in a browser.
     - It provides variables and functions that are available everywhere in your application.
     - Some important global objects include:
       - `console`: Used for logging information to the console (e.g., `console.log()`)
       - `process`: Gives you information about the current Node.js process.
       - `global`:  The actual global object itself.

  2. Modules:
     - Modules are reusable blocks of code that encapsulate specific functionality.
     - They help organize your code and make it more maintainable.
     - You can use the `require()` function to import built-in or external modules.
     - Example: `const fs = require('fs');` // Imports the file system module

  3. The file system:
     - Node.js provides a powerful `fs` module for interacting with the file system.
     - You can use it to read, write, create, delete, and modify files and directories.
     - Example: `fs.readFile('myFile.txt', 'utf8', (err, data) => { ... });`

  4. Streams and buffers:
     - Streams are objects that allow you to handle data in chunks, rather than loading the entire data set into memory at once.
     - This is especially useful for working with large files or network requests.
     - Buffers are temporary storage areas for data that is being processed by a stream.
     - Example: Reading a large file in chunks using a stream.
*/
