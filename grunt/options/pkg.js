/**
 * Grab everything from the package.json file
 */
'use strict';

module.exports = function(grunt) {

  return grunt.file.readJSON('package.json');

};
