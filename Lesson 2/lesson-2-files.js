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

// --- Asynchronous Read (Callback-based) ---
// Non-blocking: Node continues execution while the file is being read.
// Returns a Buffer by default; requires .toString() to view as text.
fs.readFile('./Lesson 2/docs/blog1.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
});

// --- Synchronous Read (Blocking) ---
// Execution stops until the file is fully read. Best for simple scripts
// or startup configurations; avoid in high-traffic web servers.
try {
  const data = fs.readFileSync('./Lesson 2/docs/blog1.txt');
  console.log(data.toString());
} catch (err) {
  console.error('Error reading file:', err);
}

// --- Promise-based Read (Async/Await) ---
// Modern non-blocking approach. Combines the performance of callbacks
// with the cleaner, readable syntax of synchronous code.
const fs = require('fs').promises;

async function readFileAsync() {
  try {
    const data = await fs.readFile('./Lesson 2/docs/blog1.txt', 'utf-8');
    console.log(data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

readFileAsync();

/*
  'utf8' vs .toString()
  Both result in a readable string, but occur at different stages.

  1. Including 'utf8' (The Decoding Argument)
  Tells Node.js to decode binary data into a string during the read.
  - Performance: Efficient; conversion happens during the internal process.
  - Result: 'data' is a String immediately upon entering your code.

  2. Using .toString() (Manual Conversion)
  If omitted, Node returns a Buffer (raw binary). .toString() converts it.
  - Flexibility: Useful for manipulating raw bytes before string conversion.
  - Result: 'data' is a Buffer object until you manually convert it.

  Key Rule: Use 'utf8' for text files as a best practice. Use Buffers for
  binary files like images or network packets.
 */

/*
  WRITING FILES:
  The writeFile method replaces the content of an existing file or creates a
  new one if it doesn't exist. It is also asynchronous and takes a callback
  to execute after the operation is complete.
*/

const fs = require('fs');

// Check if File Exists
if (fs.existsSync('./Lesson 2/docs/blog1.txt')) {
  console.log('File exists');
}

// Get File Stats
fs.stat('./Lesson 2/docs/blog1.txt', (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File size:', stats.size);
  console.log('Is file:', stats.isFile());
  console.log('Is directory:', stats.isDirectory());
  console.log('Created:', stats.birthtime);
  console.log('Modified:', stats.mtime);
});

// Write File
fs.writeFile('./Lesson 2/docs/blog2.txt', 'Hello, World!', () => {
  console.log('blog2.txt file was written successfully.');
});

fs.writeFile('./Lesson 2/docs/blog3.txt', 'Hello World, again!', () => {
  console.log('blog3.txt file was written successfully.');
});

// Append to File
fs.appendFile('./Lesson 2/docs/blog3.txt', 'New log entry\n', (err) => {
  if (err) console.error('Error appending file:', err);
});

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

// Copy File
fs.copyFile('./Lesson 2/docs/blog3.txt', './Lesson 2/docs/blog3-copy.txt', (err) => {
  if (err) console.error('Copy error:', err);
});

// Rename/Move File
fs.rename('./Lesson 2/docs/blog3-copy.txt', './Lesson 2/docs/blog3-copy-renamed.txt', (err) => {
  if (err) console.error('Rename error:', err);
});

/*
  DIRECTORIES:
  - existsSync: Synchronously checks if a folder exists.
  - mkdir: Creates a new directory.
  - rmdir: Removes an existing directory.
  This logic toggles the existence of the './Lesson 2/assets' folder.
*/

const fs = require('fs');

// Read Directory
fs.readdir('./Lesson 2/docs', { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  files.forEach((file) => {
    console.log(file.name, file.isDirectory() ? '[DIR]' : '[FILE]');
  });
});

// Create and Remove Directory
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

// Create Folders Recursive
const fs = require('fs').promises;

// Creates folder; {recursive: true} prevents errors if parent folders are
// missing or if the target directory already exists (idempotent).
async function createFoldersRecursive() {
  await fs.mkdir('./Lesson 2/assets', { recursive: true });

  // Check if a path exists before acting (Modern Promise-based approach)
  // Note: fs.access throws an error if the file/folder does NOT exist.
  try {
    await fs.access('./Lesson 2/assets');
    console.log('Directory exists');
  } catch {
    console.log('Directory does not exist');
  }
}
createFoldersRecursive();

// Read Folders Contents
const fs = require('fs').promises;

// Returns an array of strings representing the names of files/folders.
async function readMyDirectory() {
  const files = await fs.readdir('./Lesson 2/docs');
  console.log(files);
}
readMyDirectory();

// Returns an array of Dirent objects and provides metadata without extra calls.
// Useful for filtering items (e.g., distinguishing files from directories).
async function readMyDirectoryWithTypes() {
  const results = await fs.readdir('./Lesson 2/docs', { withFileTypes: true });
  console.log(results);
}
readMyDirectoryWithTypes();

/*
  COMPLETE PATH MODULE OPERATIONS
  The path module provides utilities for working with file and directory paths.
  It ensures cross-platform compatibility (Windows vs. POSIX/Linux).
*/

const path = require('path');

// --- Extraction ---

// Get parent directory of the current file
const parent = path.dirname(__dirname);
console.log(parent);

// Get directory name
// Returns everything except the filename
const dir = path.dirname('./Lesson 2/docs/blog1.txt');
console.log(dir);

// Get full file name
// Returns the last part of the path (blog1.txt)
const filename = path.basename('./Lesson 2/docs/blog1.txt');
console.log(filename);

// Get file name without extension
// Removes the extension by passing it as a second arg
const name = path.basename('./Lesson 2/docs/blog1.txt', '.txt');
console.log(name);

// Get file extension
// Returns only the file suffix (including the dot)
const ext = path.extname('./Lesson 2/docs/blog1.txt');
console.log(ext);

// --- Transformation ---

// Resolve to absolute path
const absolute = path.resolve('blog1.txt');
console.log(absolute);

// Normalize: cleans up extra slashes, ".." (up), and "." (current)
const messy = '/Lesson 2//docs/./blog1.txt';
const clean = path.normalize(messy);
console.log(clean);

// --- Utilities ---

// Parse: creates an object containing all path properties (root, dir, ext, etc)
const pathObj = path.parse('./Lesson 2/docs/blog1.txt');
console.log(pathObj);
