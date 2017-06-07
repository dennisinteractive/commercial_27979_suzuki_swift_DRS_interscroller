'use strict';

module.exports = {
  serve: {
    options: {
      sourceMap: true,
      transform: [
        ['babelify', {
          presets: 'es2015'
        }]
      ]
    },
    files: [{
      expand: true,
      cwd: '<%= config.js.src %>',
      src: '<%= config.js.glob %>',
      dest: '<%= config.js.tmp %>',
      ext: '.js'
    }]
  },
  dist: {
    options: {
      sourceMap: true,
      transform: [
        ['babelify', {
          presets: 'es2015'
        }]
      ]
    },
    files: [{
      expand: true,
      cwd: '<%= config.dir.tmp %>/concat/js',
      src: '<%= config.js.glob %>',
      dest: '<%= config.dir.tmp %>/concat/js',
      ext: '.js'
    }]
  }
}
