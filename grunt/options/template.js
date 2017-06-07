/**
 * Interpolates template files with any data you provide and saves the result to another file
 */
'use strict';

module.exports = function(grunt) {

  return {

    advertPartials: {
      options: {
        data: {
          advert: '<%= config.advert %>',
          pkg: '<%= pkg %>',
          partialPath: '<%= config.dir.templates %>/',
          partialTemplate: '<%= pkg.advert.template %>',
          config: '<%= config %>',
          partial: function(file, path, template) {
            path = path || '';
            template = template || 'default';
            var fs = require('fs'),
            content = [],
            comment = {
              'html' : ['<!-- ',' -->'],
              'js'   : ['/* ',' */'],
              'scss'   : ['/* ',' */']
            },
            ext = file.split('.').pop(),
            filePath = path + template + '/_' + file;
            // make sure file exists
            if ( !fs.existsSync( filePath ) ) {
              return 'Couldn\'t include partial: ' + filePath;
            }

            // push in the content
            content.push( 'BEGIN: ', file, comment[ext][1], '\n' );
            content.push( fs.readFileSync( filePath ) );
            content.push( comment[ext][0], 'END: ', file );
            return content.join('');
          }
        }
      },
      files: (function() {
        var out = [];
        var arr = ['{"",<%= pkg.adverts %>}'];
        var arr2 = {
          '<%= config.js.src %>/main.js': '<%= config.js.src %>/main.js',
          '<%= config.css.src %>/main.scss': '<%= config.css.src %>/main.scss',
          '<%= config.html.src %>/<%= config.files.html.src %>': '<%= config.html.src %>/<%= config.files.html.src %>',
        };

        arr.forEach(function( value ) {
          var src = '<%= config.dir.src %>/' + value + '/index.html';
          var dest = '';
          out.push({
            expand: true,
            src: src,
            dest: dest
          });
        });
        out.push( arr2 );

        return out;
      })(),

    }

  };

};
