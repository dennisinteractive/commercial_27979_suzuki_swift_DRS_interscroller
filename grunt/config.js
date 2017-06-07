/**
 * The beating heart of the Grunt setup
 */
'use strict';

module.exports = {

  // Directories
  dir: {
    src:       'src',
    tmp:       '.tmp',
    dist:      'advert',
    releases:  'releases',
    grunt:     'grunt',
    vendor:    '<%= config.dir.src %>/vendor',
    templates: '<%= config.dir.src %>/templates'
  },

  // Advert ID from One Creative (The number at the end of URL)
  onecreativeid: '123456',

  awscfg: function() {
    return grunt.task.loadTasks('check-creds');
  },
  ftpcfg: function() {
    return grunt.task.loadTasks('check-creds');
  },

  // Files
  files: {
    html:   {
      src: 'index.html',
      dist: 'index.html',
      prefix: 'index-'
    },
    slider: {
      src: 'skin.html',
      dist: 'skin.html',
      files: [ 'skin.html', 'leaderboard.html', 'mpu.html', 'customAd.js' ]
    },
    standard: {
      src: 'index.html',
      dist: 'index.html',
      folders: [ 'billboard', 'leaderboard', 'mpu', 'doublebillboard', 'dmpu' ]
    }
  },

  // Grunt file paths
  grunt: {
    file:       'Gruntfile.js',
    srcTasks:   '<%= config.dir.grunt %>/tasks/*.js',
    srcOptions: '<%= config.dir.grunt %>/options/*.js',
    globAll:    '{,*/}*.js'
  },

  // HTML paths
  html: {
    src:  '<%= config.dir.src %>',
    dist: '<%= config.dir.dist %>',
    glob: '{,*/}*.html'
  },

  // JavaScript paths
  js: {
    src:  '<%= config.dir.src %>/scripts',
    tmp:  '<%= config.dir.tmp %>/scripts',
    dist: '<%= config.dir.dist %>/js',
    glob: '{,*/}*.js'
  },

  // CSS/SASS paths
  css: {
    tmp:      '<%= config.dir.tmp %>/css',
    src:      '<%= config.dir.src %>/styles',
    dist:     '<%= config.dir.dist %>/css',
    globCss:  '{,*/}*.css',
    globSass: '{,*/}*.{scss,sass}'
  },

  // Image paths
  img: {
    src:     '<%= config.dir.src %>/images',
    dist:    '<%= config.dir.dist %>/images',
    globAll: '{,*/}*.*',
    globImg: '{,*/}*.{gif,jpeg,jpg,png}',
    globSvg: '{,*/}*.svg'
  },

  // Font paths
  fonts: {
    src:  '<%= config.dir.src %>/fonts',
    dist: '<%= config.dir.dist %>/fonts',
    glob: '{,*/}*.*'
  },

  // Zip file name formatting
  zipFilename: {
    default:     '<%= config.dir.releases %>/<%= pkg.name %>_v<%= pkg.version %>.zip',
    leaderboard: '<%= config.dir.releases %>/<%= pkg.name %>_leaderboard_v<%= pkg.version %>.zip',
    skin:        '<%= config.dir.releases %>/<%= pkg.name %>_skin_v<%= pkg.version %>.zip',
    mpu:         '<%= config.dir.releases %>/<%= pkg.name %>_mpu_v<%= pkg.version %>.zip'
  }

};
