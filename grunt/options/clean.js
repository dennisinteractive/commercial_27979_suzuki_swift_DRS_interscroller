/**
 * Empties folders to start fresh
 */
'use strict';

module.exports = {

  dist: {
    files: [{
      dot: true,
      src: [
        '<%= config.dir.tmp %>',
        '<%= config.dir.dist %>/*',
        '<%= config.dir.src %>/{"",<%= pkg.adverts %>}/css/',
        '!<%= config.dir.dist %>/.git*'
      ]
    }]
  },
  git: {
    files: [{
      dot: true,
      src: [
        '.git'
      ]
    }]
  },
  server: '<%= config.dir.tmp %>'

};
