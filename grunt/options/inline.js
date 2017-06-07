/**
 * Places CSS and JS inline if needed
 */
'use strict';

module.exports = {

  dist: {
    options: {
      uglify: true,
      cssmin: true
    },
    files: (function() {

      var out = [];
      var arr = [ '{"",<%= pkg.adverts %>}' ];
      arr.forEach(function( value ) {
        var src = '<%= config.dir.dist %>/' + value + '/index.html';
        var dest = '';
        out.push({
          expand: true,
          src: src,
          dest: dest
        });
      });
      return out;

    })()
  },
  default: {
    options: {
      uglify: true,
      cssmin: true
    },
    src: 'advert/index.html',
    dest: 'advert/index.html'
  }

};
