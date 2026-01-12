// --- BUILT-IN NODE.JS MODULES ---
/*
  The 'fs' (file system) module is a built-in Node.js utility. It provides 
  methods for interacting with the file system in both synchronous and 
  asynchronous ways.
*/
const fs = require('fs');

/*
  STREAMING FILES:
  Streams are used to handle large amounts of data efficiently. Instead of
  waiting for the entire file to be read into memory (RAM), data is sent in
  smaller "chunks" called buffers. This allows for faster processing of
  large files.
*/

// createReadStream: Opens a stream to read data from a source file.
// The 'encoding' option converts the Buffer chunks into readable strings.
const readStream = fs.createReadStream('./Lesson 2/docs/blog1.txt', { encoding: 'utf8', highWaterMark: 64 });

// createWriteStream: Opens a stream to write data to a destination file.
const writeStream = fs.createWriteStream('./Lesson 2/docs/blog4.txt');

/*
  EVENT LISTENER ('data'):
  The 'data' event fires every time the stream receives a new chunk of data.
  This allows you to manipulate or move data piece-by-piece as it arrives.
*/
readStream.on('data', (chunk) => {
  console.log('---- NEW CHUNK ----');
  console.log(chunk);
  writeStream.write('\n\n--- NEW CHUNK ---\n');
  writeStream.write(chunk);
});

/*
  PIPING:
  A pipe is a more efficient way to move data from a readable stream to a
  writable stream. It replaces the manual event listener ('on data') and
  automatically handles the "backpressure" (speed difference) between the
  reading and writing processes.
*/

// readStream.pipe(writeStream);
