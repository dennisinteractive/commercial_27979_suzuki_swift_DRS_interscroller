/**
 * Checks our JS for errors
 */
'use strict';

module.exports = {

  options: {
    format: require('eslint-stylish-config')
  },
  target: [
    'Gruntfile.js',
    '<%= config.js.src %>/<%= config.js.glob %>',
    '!<%= config.dir.vendor %>'
  ]

};
