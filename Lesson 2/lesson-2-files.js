// --- BUILT-IN NODE.JS MODULES ---
/*
  The 'fs' (file system) module is a built-in Node.js utility. Here it is 
  imported via CommonJS to check the operating system platform and home
  directory.
*/
const fs = require('fs');

/*
  READING FILES:
  The readFile method is asynchronous. It takes a file path and a callback
  function that runs once the file is read. 'data' is returned as a Buffer,
  so .toString() is required to view the actual text content.
*/
fs.readFile('./Lesson 2/docs/blog1.txt', (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data.toString());
});

/*
  WRITING FILES:
  The writeFile method replaces the content of an existing file or creates a
  new one if it doesn't exist. It is also asynchronous and takes a callback
  to execute after the operation is complete.
*/
fs.writeFile('./Lesson 2/docs/blog2.txt', 'Hello, World!', () => {
  console.log('blog2.txt file was written successfully.');
});

fs.writeFile('./Lesson 2/docs/blog3.txt', 'Hello World, again!', () => {
  console.log('blog3.txt file was written successfully.');
});

/*
  DIRECTORIES:
  - existsSync: Synchronously checks if a folder exists.
  - mkdir: Creates a new directory.
  - rmdir: Removes an existing directory.
  This logic toggles the existence of the './Lesson 2/assets' folder.
*/
if (!fs.existsSync('./Lesson 2/assets')) {
  fs.mkdir('./Lesson 2/assets', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('Assets folder created successfully.');
  });
} else {
  fs.rmdir('./Lesson 2/assets', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('Assets folder deleted successfully.');
  });
}

/*
  DELETING FILES:
  - unlink: The standard method for deleting a file.
  Before unlinking, we check if the file exists to avoid throwing an error.
  */

const fs = require('fs');

if (!fs.existsSync('./Lesson 2/docs/deleteme.txt')) {
  fs.writeFile('./Lesson 2/docs/deleteme.txt', 'This is a temporary file.', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('deleteme.txt file created successfully.');
  });
} else {
  fs.unlink('./Lesson 2/docs/deleteme.txt', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('deleteme.txt file deleted successfully.');
  });
}
