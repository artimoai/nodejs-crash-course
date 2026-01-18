// =============================================================================
// PART 3: FILE SYSTEM (fs) OPERATIONS
// =============================================================================

// 1. THE LOGGER: Manage directories and file content.
//    - Use fs.existsSync to check for a folder named 'logs'.
//    - If missing, create it with fs.mkdir.
//    - Write 'event.txt' and append a timestamped entry.

// 2. THE SELECTIVE READER: Filter directory contents.
//    - Use fs.readdir with 'withFileTypes: true' on the folder 'logs'.
//    - Loop through results and only log files ending in '.txt'.

// 3. THE CLEANUP: Delete specific files safely.
//    - Check if 'blog-old.txt' exists in logs; if so, delete it with fs.unlink.

// =============================================================================
// SOLUTIONS
// =============================================================================

// 1. THE LOGGER
// Checking if 'logs' folder exists
const fs = require('fs');
const path = require('path');

const folderPath = './Lesson 2/Exercises/';
const newFolderName = 'logs';

// Use path.join to avoid manual string concatenation errors
const fullPath = path.join(folderPath, newFolderName);

function checkFolder() {
  try {
    if (!fs.existsSync(fullPath)) {
      console.log("Folder 'logs' doesn't exist. Creating it now.");
      fs.mkdirSync(fullPath);
      console.log(`Folder 'logs' created successfully at ${path.resolve(folderPath)}`);
    } else {
      console.log("Folder 'logs' already exists.");
    }
  } catch (err) {
    console.error('Error: ', err);
  }
}

// Checking if the 'event.txt' file exists
/* WHY WE USE RESOLVE():
    In Node.js, asynchronous methods (like fs.writeFile or fs.appendFile) 
    start a task and then immediately move to the next line of code 
    without waiting for the hard drive to finish. 

    Simply marking a function as 'async' isn't enough to make it wait 
    for these internal callbacks. By wrapping the logic in a Promise 
    and calling resolve(), we create a manual 'green light' signal. 
    The 'await' keyword in our main() function will see this Promise 
    and pause execution until resolve() is triggered, ensuring our 
    functions run in a strict, predictable order.
*/
const newFileName = 'event.txt';

function checkFileExists() {
  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(path.join(fullPath, newFileName))) {
        console.log("File 'event.txt' doesn't exist. Creating it now.");
        fs.writeFile(path.join(fullPath, newFileName), '--- event.txt created ---\n', (err) => {
          if (err) {
            console.error('Failed to write file:', err);
            reject(err); // Tell main() we failed
          } else {
            console.log(`File 'event.txt' created at ${path.resolve(fullPath)}`);
            // Pass resolve to appendFile so we know when everything is done
            appendFile(resolve);
          }
        });
      } else {
        console.log('File already exists.');
        appendFile(resolve);
      }
    } catch (err) {
      console.error('Error: ', err);
      reject(err);
    }
  });
}

// Append file function
function appendFile(resolve) {
  fs.appendFile(path.join(fullPath, newFileName), `\n${new Date().toLocaleString()}: New line.\n`, (err) => {
    if (err) {
      console.log('Failed to append:', err);
    } else {
      console.log('File appended successfully.');
      if (resolve) resolve(); // <--- THIS is the green light for main()
    }
  });
}

// 2. SELECTIVE FILE READER
function readMyDirectoryWithTypes() {
  const results = fs.readdirSync(fullPath, { withFileTypes: true });
  // console.log(results);
  results.forEach((dirent) => {
    if (dirent.isFile() && path.extname(dirent.name) === '.txt') {
      console.log(`Found TXT file: ${dirent.name} in folder ${path.resolve(fullPath)}`);
    }
  });
}

// 3. THE CLEANUP
function cleanupOldFiles(resolve) {
  const oldFilePath = path.join(fullPath, 'blog-old.txt');

  if (fs.existsSync(oldFilePath)) {
    console.log('Old blog file found. Deleting now...');

    fs.unlink(oldFilePath, (err) => {
      if (err) {
        console.error('Failed to delete file:', err);
      } else {
        console.log('Old file deleted successfully.');
      }
      // Signal that cleanup is finished
      if (resolve) resolve();
    });
  } else {
    console.log('No old blog files found to clean up.');
    if (resolve) resolve();
  }
}

// THE EXECUTION CONTROL
// This is how you run separate functions in a specific order

// Wrapper to make the cleanup awaitable
function runCleanup() {
  return new Promise((resolve) => {
    cleanupOldFiles(resolve);
  });
}

async function main() {
  checkFolder(); // 1. Sync
  await checkFileExists(); // 2. Async (Wait for write/append)
  await runCleanup(); // 3. Async (Wait for delete)
  readMyDirectoryWithTypes(); // 4. Sync (Shows final state of folder)
}

main();

// =============================================================================
// MODERN LOGGER & CLEANER
/*
   Using fs.promises allows us to use 'await' directly on built-in methods.
   This ensures strict order (Folder -> File -> Append -> Cleanup -> Read)
   without the need for manual resolve() signals or callback nesting.
*/
// =============================================================================
const fs = require('fs').promises; // Promise-based methods
const fsSync = require('fs'); // Used only for existsSync
const path = require('path');

const folderPath2 = './Lesson 2/Exercises/logs';
const mainFile = path.join(folderPath2, 'event.txt');
const oldFile = path.join(folderPath2, 'blog-old.txt');

// 1. MANAGING DIRECTORIES
async function checkFolder() {
  if (!fsSync.existsSync(folderPath2)) {
    console.log("Step 1: Creating 'logs' folder...");
    await fs.mkdir(folderPath2, { recursive: true });
  } else {
    console.log('Step 1: Folder already exists.');
  }
}

// 2. MANAGING FILES & APPENDING
async function handleFileLogging() {
  try {
    if (!fsSync.existsSync(mainFile)) {
      console.log("Step 2: Creating 'event.txt'...");
      await fs.writeFile(mainFile, '--- Log Start ---\n');
    }

    console.log('Step 3: Appending timestamp...');
    const logEntry = `${new Date().toLocaleString()}: New entry.\n`;
    await fs.appendFile(mainFile, logEntry);
    console.log('File appended successfully.');
  } catch (err) {
    console.error('Logging Error:', err);
  }
}

// 3. THE CLEANUP: Delete specific files safely
async function cleanupFiles() {
  try {
    if (fsSync.existsSync(oldFile)) {
      console.log("Step 4: 'blog-old.txt' found. Deleting...");
      await fs.unlink(oldFile);
      console.log('Cleanup complete: File deleted.');
    } else {
      console.log('Step 4: No old files found to clean.');
    }
  } catch (err) {
    console.error('Cleanup Error:', err);
  }
}

// 4. SELECTIVE FILE READER
async function displayResults() {
  console.log('Step 5: Reading directory state...');
  const entries = await fs.readdir(folderPath2, { withFileTypes: true });

  entries.forEach((dirent) => {
    if (dirent.isFile() && path.extname(dirent.name) === '.txt') {
      console.log(` > Found TXT: ${dirent.name}`);
    }
  });
}

// --- EXECUTION CONTROL ---
async function main() {
  // Everything stays in this exact order because of 'await'
  await checkFolder();
  await handleFileLogging();
  await cleanupFiles();
  await displayResults();

  console.log('\nAll tasks completed in order.');
}

main();
