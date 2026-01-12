/*
  The following examples demonstrate the evolution from CommonJS (require)
  to ES Modules (import), and the differences in how data is accessed.
*/

// --- COMMONJS (CJS) EXAMPLES ---
/*
  Imports the entire exported object from the module using the require
  syntax. CommonJS does not require the .js extension.
*/

// const data = require('./lesson-2-people');
// console.log(data);

// Accessing specific properties from the imported CommonJS object.

// const data = require('./lesson-2-people');
// console.log(data.people, data.ages);

/*
  Destructuring during the require call. This extracts the people and ages
  properties into local variables immediately.
*/

// const { people, ages } = require('./lesson-2-people');
// console.log(people, ages);

// --- ES MODULES (ESM) EXAMPLES ---

/*
  Modern ESM import. Note that the .js extension is mandatory in modern
  environments. This imports the "default" export as 'data'.
*/

// import data from './lesson-2-people.js';
// console.log(data.people, data.ages);

/*
  Since 'data' is a default export, you must import it first, then
  destructure it on a separate line to create individual variables.
*/

import data from './lesson-2-people.js';
const { people, ages } = data;
console.log(people, ages);

// --- BUILT-IN NODE.JS MODULES ---
/*
  The 'os' module is a built-in Node.js utility. Here it is imported via 
  CommonJS to check the operating system platform and home directory.
*/

const os = require('os');
console.log(os.platform(), os.homedir());
