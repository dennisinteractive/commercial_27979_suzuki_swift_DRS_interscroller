/**
 * Watch files for changes and run tasks based on the changed files
 */
'use strict';

module.exports = function(grunt) {
  return {
    bower: {
      files: ['bower.json'],
      tasks: ['wiredep']
    },
    babel: {
      files: ['<%= config.js.src %>/<%= config.js.glob %>'],
      tasks: ['eslint'],
    },
    gruntfile: {
      files: [
        '<%= config.grunt.file %>',
        '<%= config.grunt.srcTasks %>',
        '<%= config.grunt.srcOptions %>'
      ]
    },
    sass: {
      files: [
        '<%= config.css.src %>/<%= config.css.globSass %>',
        'src/{"",<%= pkg.adverts %>}/styles/<%= config.css.globSass %>'
      ],
      tasks: ['sass', 'postcss']
    },
    styles: {
      files: ['<%= config.css.dist %>/<%= config.css.globCss %>'],
      tasks: ['newer:copy:styles', 'postcss']
    }
  };
};
