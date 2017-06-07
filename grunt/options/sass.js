/**
 * Compiles Sass to CSS
 */
'use strict';

module.exports = function(grunt) {

  return {
    dist: {
      options: {
        sourceMap: true,
        sourceMapEmbed: true,
        sourceMapContents: true,
        includePaths: ['.'],
        loadPath: ['<%= config.dir.vendor %>/**/*.css']
      },
      files: [{
        expand: true,
        cwd:  '<%= config.css.src %>',
        src:  '<%= config.css.globSass %>',
        dest: '<%= config.css.tmp %>',
        ext:  '.css'
      }]
    },
    standardDist: {
      options: {
        sourceMap: true,
        sourceMapEmbed: true,
        sourceMapContents: true,
        includePaths: ['.'],
      },
      files: (function() {

        var out = [];
        var arr = [ '{"",<%= pkg.adverts %>}' ];
        arr.forEach(function( value ) {
          var src = '<%= config.dir.src %>/' + value + '/styles/<%= config.css.globSass %>';
          var dest = '';
          out.push({
            expand: true,
            ext: '.css',
            src: src,
            dest: dest,
            rename: function( dest, src ) {
              return dest + src.replace( 'styles', 'css' );
            }
          });
        });
        return out;

      })()
    }
  };

};
