/**
 * Compresses files and folders
 */
'use strict';

module.exports = function(grunt) {

  return {

    default: {
      options: {
        mode: 'zip',
        pretty: true,
        archive: function() {
          var filename = grunt.config('config.zipFilename.default');
          // Make sure file doesn't exist already
          if ( grunt.file.exists( filename ) ) {
            grunt.fail.fatal('File already exists. Have you run the *bump* task to increment the version number?');
          }
          return filename;
        }
      },
      files: [
        {
          expand: true,
          cwd: '<%= config.dir.dist %>',
          src: ['**'],
          dest: ''
        },
      ]
    },

    // Skin zip
    pictelaSkin: {
      options: {
        mode: 'zip',
        pretty: true,
        archive: function() {
          var filename = grunt.config('config.zipFilename.skin');
          // Make sure file doesn't exist already
          if ( grunt.file.exists( filename ) ) {
            grunt.fail.fatal('File already exists. Have you run the *bump* task to increment the version number?');
          }
          return filename;
        }
      },
      files: [
        {
          expand: true,
          cwd: '<%= config.dir.dist %>',
          src: [
            'skin.html',
            'images/**/*',
            '!images/skin-background.*',
            '!images/leaderboard.*',
            '!images/mpu.*',
            'js/**/*',
            'css/**/*',
            'adConfig.json',
            'customAd.js'
          ],
          dest: ''
        }
      ]
    },

    // Leaderboard zip
    pictelaLeaderboard: {
      options: {
        mode: 'zip',
        pretty: true,
        archive: function() {
          var filename = grunt.config('config.zipFilename.leaderboard');
          // Make sure file doesn't exist already
          if ( grunt.file.exists(filename) ) {
            grunt.fail.fatal('File already exists. Have you run the *bump* task to increment the version number?');
          }
          return filename;
        }
      },
      files: [
        {
          expand: true,
          cwd: '<%= config.dir.dist %>',
          src: [
            'leaderboard.html'
          ],
          dest: ''
        }
      ]
    },

    // MPU zip
    pictelaMPU: {
      options: {
        mode: 'zip',
        pretty: true,
        archive: function() {
          var filename = grunt.config('config.zipFilename.mpu');
          // Make sure file doesn't exist already
          if ( grunt.file.exists(filename) ) {
            grunt.fail.fatal('File already exists. Have you run the *bump* task to increment the version number?');
          }
          return filename;
        }
      },
      files: [
        {
          expand: true,
          cwd: '<%= config.dir.dist %>',
          src: [ 'mpu.html' ],
          dest: ''
        }
      ]
    },


  };

};
