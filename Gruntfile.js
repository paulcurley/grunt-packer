/*
 * grunt-packer
 * https://github.com/paulcurley/grunt-packerjs
 *
 * Copyright (c) 2013 Paul Curley
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    packer: {
        default_options: {
            options: {
                base64 : false,
                shrink: false,
            },
            files: {
              'tmp/jquery_min.js': 'tmp/jquery.js',
            }
        },
        shrink: {
            options: {
                base64 : false,
                shrink: true,
            },
            files: {
              'tmp/jquery_shrink.js': 'tmp/jquery.js',
            }
        },
        base64: {
            options: {
                base64 : true,
                shrink: true,
            },
            files: {
              'tmp/jquery_base64.js': 'tmp/jquery.js',
            }
        }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'packer', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
