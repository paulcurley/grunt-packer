/*
 * grunt-packer
 * https://github.com/paulcurley/grunt-packerjs
 *
 * Copyright (c) 2013 Paul Curley
 * Licensed under the MIT license.
 */

'use strict';

var packer = require('../lib/packer');
module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('packer', 'packer the filez', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', ',
      base64: true,
      shrink: true
    });
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
        
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;
      
      src = packer.pack(src, options.base64, options.shrink)
      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
