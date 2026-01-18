/* 
    When using CommonJS (CJS) in Node.js, the .js extension is optional.
    CJS Standards: This legacy system uses a synchronous 'require' method.
    Node.js automatically looks for .js, .json, or a folder index, 
    allowing for cleaner, shorter import strings without mandatory 
    file extensions.
*/

const { add, subtract } = require('./exercise-2-math');

console.log(add(12, 7));
console.log(subtract(12, 7));
