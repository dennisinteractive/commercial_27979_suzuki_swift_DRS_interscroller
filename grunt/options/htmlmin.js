/**
 * Minify HTML
 */
'use strict';

module.exports = {

  dist: {
    options: {
      removeComments: true,
      collapseWhitespace: true
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
    })(),
  },
  default: {
    src: 'advert/index.html',
    dest: 'advert/index.html'
  }

};
