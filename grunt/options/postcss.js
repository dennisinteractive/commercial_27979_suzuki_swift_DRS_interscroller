/**
 * Autoprefixes CSS
 */
'use strict';

module.exports = {

  options: {
    map: true,
    processors: [
      require('autoprefixer')({
        browsers: ['last 2 versions', 'ie 8', 'ie 10', '> 1%']
      })
    ]
  },
  dist: {
    src: [
      '<%= config.css.tmp %>/<%= config.css.globCss %>',
      '<%= config.dir.src %>/{"",<%= pkg.adverts %>}/<%= config.css.globCss %>',
      '<%= config.dir.tmp %>/{"",<%= pkg.adverts %>}/<%= config.css.globCss %>'
    ]
  }

};
