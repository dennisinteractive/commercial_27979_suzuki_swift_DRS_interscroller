/**
 * Renames files for browser caching purposes
 */
'use strict';

module.exports = {

  options: {
    encoding: 'utf8',
    algorithm: 'md5',
    length: 8
  },
  assets: {
    files: [{
      src: [
        '<%= config.js.dist %>/<%= config.js.glob %>',
        '<%= config.css.dist %>/<%= config.css.globCss %>',
        '<%= config.img.dist %>/<%= config.img.globAll %>',
        '<%= config.fonts.dist %>/<%= config.fonts.glob %>',
      ]
    }]
  }

};
