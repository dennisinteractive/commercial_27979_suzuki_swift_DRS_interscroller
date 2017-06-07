/**
 * Minify SVG
 */
'use strict';

module.exports = {

  dist: {
    files: [{
      expand: true,
      cwd:  '<%= config.img.src %>',
      dest: '<%= config.img.dist %>',
      src:  '<%= config.img.globSvg %>'
    }]
  }

};
