'use strict';

module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required grunt tasks
  require('jit-grunt')(grunt, {
    // Manual mapping required for grunt-usemin
    useminPrepare: 'grunt-usemin'
  });

  // Load all our options and tasks
  // found inside the grunt folder
  var configs = require('load-grunt-configs')(grunt, {
    config: {
      src: [
        'grunt/*.js',
        'grunt/options/*.js',
        'grunt/tasks/*.js'
      ]
    },

    // data passed into config. Can use with <%= test %>
    data: {
      ok: true
    }

  });

  grunt.initConfig(configs);

};
