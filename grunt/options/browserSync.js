/**
 * Keeps all browsers and windows in sync
 */
'use strict';

module.exports = {
  dev: {
    bsFiles: {
      src : [
        '<%= config.dir.src %>/index.html',
        '<%= config.css.tmp %>/<%= config.css.globCss %>',
        '<%= config.img.src %>/<%= config.img.globAll %>',
        '<%= config.js.src %>/<%= config.js.glob %>',
      ]
    },
    options: {
      watchTask: true,
      port: 9000,
      spawn: false,
      server: {
        baseDir: ['<%= config.dir.tmp %>', '<%= config.dir.src %>'],
        routes: {
          '/bower_components': './bower_components'
        }
      }
    }
  },
  dist: {
    options: {
      background: false,
      server: '<%= config.dir.dist %>'
    }
  }

};
