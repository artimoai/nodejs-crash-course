/*  
    When using ES Modules (ESM) in Node.js, the .js file extension is mandatory.
    ESM Standards: ES Modules are designed to work in both browsers and Node.js.
    Browsers need the full file path to make network requests, so Node.js 
    adopted this same strictness for consistency.
*/

import { greetings } from './exercise-2-greet.js';

greetings();
