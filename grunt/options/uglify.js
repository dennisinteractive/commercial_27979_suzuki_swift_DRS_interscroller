/**
 * Uglify JS files
 */
'use strict';

module.exports = {
  standard: {
    preserveComments: false,
    src:  '<%= config.dir.tmp %>/**/<%= config.js.glob %>',
    dest: '<%= config.js.dist %>/advert.js'
  }
};
