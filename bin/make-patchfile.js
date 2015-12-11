#!/usr/bin/env node

var diff = require('diff');
var fs   = require('fs');

var exitCode = 100;
var buffers = [];
var running = 1;

function callDiff() {
  process.stdout.write(diff.createTwoFilesPatch(process.argv[2], process.argv[3], buffers[0], buffers[1], process.argv[4], process.argv[5]));
}

for (i = 2 ; i < 4 ; i ++) {
  (function(index) {
    fs.readFile(process.argv[index], 'utf-8', function(err, data) {
      if (err != null) {
        process.stderr.write('Some error occurred while reading file ' + process.argv[index] + ', exiting.\n');
        process.exit(exitCode);
      }
      buffers[index - 2] = data;
      if (running == 0) {
        callDiff();
      } else {
        running--;
      }
    })
  })(i);
}
