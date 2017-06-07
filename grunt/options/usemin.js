/**
 * Performs rewrites based on useminPrepare configuration
 */
'use strict';

module.exports = {

  options: {
    assetsDirs: [
      '<%= config.dir.dist %>',
      '<%= config.img.dist %>'
    ]
  },
  html: ['<%= config.html.dist %>/<%= config.html.glob %>'],
  css:  ['<%= config.css.dist %>/<%= config.css.globCss %>']

};
