/**
 * Reads HTML for usemin blocks to enable smart builds that automatically
 * concat and minify files. Creates configurations in memory so
 * additional tasks can operate on them
 */
'use strict';

module.exports = {

  configKey: 'useminPrepare',

  options: {
    root: 'src',
    dest: '<%= config.dir.dist %>'
  },

  html: ['<%= config.dir.dist %>/<%= config.files.html.dist %>'],

};
