/**
 * Copies remaining files to places other tasks can use
 */
'use strict';

module.exports = function(grunt) {

  return {

    dist: {
      files: [
        // Misc project files
        {
          expand: true,
          dot: true,
          cwd:  '<%= config.dir.src %>',
          dest: '<%= config.dir.dist %>',
          src: [
            '*.{jpg,png,txt,md}'
          ]
        },
        // Main HTML file
        {
          expand: true,
          dot: true,
          cwd:  '<%= config.html.src %>',
          dest: '<%= config.html.dist %>',
          src:  ['<%= config.files.html.src %>'],
          rename: function(dest, src, options) {
            return dest + '/<%= config.files.html.dist %>';
          }
        },
        // Font files
        {
          expand: true,
          dot: true,
          cwd: '<%= config.fonts.src %>',
          flatten: false,
          src: [
            '<%= config.fonts.glob %>'
          ],
          dest: '<%= config.fonts.dist %>'
        }
      ]
    },
    // TODO: Find a DRY way
    sliderDist: {
      files: [
        // Misc project files
        {
          expand: true,
          dot: true,
          cwd:  '<%= config.dir.src %>',
          dest: '<%= config.dir.dist %>',
          src: [
            '*.{jpg,png,txt,md,json}'
          ]
        },
        // Main HTML file
        {
          expand: true,
          dot: true,
          cwd:  '<%= config.html.src %>',
          dest: '<%= config.html.dist %>',
          src:  [ '<%= config.files.slider.files %>' ]
        },
        // Font files
        {
          expand: true,
          dot: true,
          cwd: '<%= config.fonts.src %>',
          flatten: false,
          src: [
            '<%= config.fonts.glob %>'
          ],
          dest: '<%= config.fonts.dist %>'
        },
        // CSS Vendor files
        {
          expand: true,
          dot: true,
          cwd: '<%= config.dir.vendor %>',
          flatten: true,
          src: [
            '**/*.css'
          ],
          dest: '<%= config.css.tmp %>'
        },
        // JS Vendor files
        {
          expand: true,
          dot: true,
          cwd: '<%= config.dir.vendor %>',
          flatten: true,
          src: [
            '**/*.js'
          ],
          dest: '<%= config.js.tmp %>'
        }
      ]
    },
    standardDist: {
      files: [
        // Misc project files
        {
          expand: true,
          dot: true,
          cwd:  '<%= config.dir.src %>',
          dest: '<%= config.dir.dist %>',
          src: [
            '*.{jpg,png,txt,md,json}'
          ]
        },
        // HTML files
        {
          expand: true,
          dot: true,
          cwd:  '<%= config.html.src %>',
          src:  ['{"",<%= pkg.adverts %>}/<%= config.html.glob %>'],
          dest: '<%= config.html.dist %>'
        },
        // Font files
        {
          expand: true,
          dot: true,
          cwd: '<%= config.fonts.src %>',
          flatten: false,
          src: [
            '<%= config.fonts.glob %>'
          ],
          dest: '<%= config.fonts.dist %>'
        },
        // CSS Vendor files
        {
          expand: true,
          dot: true,
          cwd: '<%= config.dir.vendor %>',
          flatten: true,
          src: [
            '**/*.css'
          ],
          dest: '<%= config.css.tmp %>'
        },
        // JS Vendor files
        {
          expand: true,
          dot: true,
          cwd: '<%= config.dir.vendor %>',
          flatten: true,
          src: [
            '**/*.js'
          ],
          dest: '<%= config.js.tmp %>'
        }
      ]
    },
    styles: {
      expand: true,
      dot: true,
      cwd:  '<%= config.css.src %>',
      src:  '<%= config.css.globCss %>',
      dest: '<%= config.css.tmp %>'
    },
    standardStyles: {
      expand: true,
      dot: true,
      cwd:  '<%= config.dir.src %>',
      src:  '{"",<%= pkg.adverts %>}/css/*',
      dest: '<%= config.dir.dist %>'
    },
    // Copy individual advert assets
    leaderboard: {
      expand: true,
      cwd:  '<%= config.dir.dist %>',
      src: ['js/<%= config.js.glob %>', 'images/<%= config.img.globAll %>'],
      dest: '<%= config.dir.dist %>/leaderboard'
    },
    dmpu: {
      expand: true,
      cwd:  '<%= config.dir.dist %>',
      src: ['js/<%= config.js.glob %>', 'images/<%= config.img.globAll %>'],
      dest: '<%= config.dir.dist %>/dmpu'
    },
    mpu: {
      expand: true,
      cwd:  '<%= config.dir.dist %>',
      src: ['js/<%= config.js.glob %>', 'images/<%= config.img.globAll %>'],
      dest: '<%= config.dir.dist %>/mpu'
    },
    billboard: {
      expand: true,
      cwd:  '<%= config.dir.dist %>',
      src: ['js/<%= config.js.glob %>', 'images/<%= config.img.globAll %>'],
      dest: '<%= config.dir.dist %>/billboard'
    },
    doublebillboard: {
      expand: true,
      cwd:  '<%= config.dir.dist %>',
      src: ['js/<%= config.js.glob %>', 'images/<%= config.img.globAll %>'],
      dest: '<%= config.dir.dist %>/doublebillboard'
    },

    sliderTemplateFiles: {
      files: [
        {
          expand: true,
          dot: true,
          cwd: '<%= config.dir.templates %>/slider',
          dest: '<%= config.dir.src %>',
          src: [
            '{,*/}*.html',
            '**/*',
            '!_*.*'
          ]
        }
      ]
    },
    standardTemplateFiles: {
      files: [
        {
          expand: true,
          dot: true,
          nonull: false,
          cwd: 'src/templates/standard',
          src: '{"",<%= config.standardAdvert %>}/**',
          dest: '<%= config.dir.src %>'
        }
      ]
    }
  };
};
