/**
 * Reduces size of images and puts them in the dist folder
 */
'use strict';

module.exports = {

  dist: {
    files: [{
      expand: true,
      cwd: '<%= config.img.src %>',
      src: ['**/*.{png,jpg,jpeg,gif}'],
      dest: '<%= config.img.dist %>'
    }]
  },
  standardImages: {
    files: (function() {
      var out = [];
      var arr = [ '{"",<%= pkg.adverts %>}' ];
      arr.forEach(function( value ) {
        var src = '<%= config.dir.src %>/' + value + '/images/<%= config.img.globAll %>';
        var dest = '';
        out.push({
          expand: true,
          src: src,
          dest: dest,
            rename: function( dest, src ) {
              return dest + src.replace( 'src', 'advert' );
            }
        });
      });
      return out;
    })()
  }

};
