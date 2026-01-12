const people = ['Mario', 'Pedro', 'Anna', 'Teo'];
const ages = [19, 23, 39, 27];

/*
  SUMMARY: MODULE SYSTEMS OVERVIEW
  The code below explores the two primary ways to share code in JavaScript.
*/

// 1. module.exports = {} (CommonJS / CJS)
/*
  The legacy Node.js standard. It uses a synchronous 'require' system.
  Assigning to module.exports replaces the entire export object. If called
  multiple times, only the final assignment is exported.
  Example: const data = require('./myModule');
*/

// 2. export default (ES Modules / ESM)
/*
  The official modern standard for browsers and Node.js. It is static,
  allowing tools to optimize code via tree-shaking. Relative imports
  require explicit file extensions (e.g., .js).
  Example: import data from './myModule.js';
*/

/*
  COMMONJS EXAMPLES (Commented out)
  --------------------------------
  Below were various ways to export using CJS:
  - Exporting a single array (people or ages)
  - Exporting a shorthand object containing both arrays
*/

// module.exports = people;
// module.exports = ages;
// module.exports = { people, ages };

/*
  ACTIVE EXPORT: ES MODULES DEFAULT
  ---------------------------------
  This exports an object containing both 'people' and 'ages' as the single
  default export of this file.
*/
export default {
  people,
  ages,
};
