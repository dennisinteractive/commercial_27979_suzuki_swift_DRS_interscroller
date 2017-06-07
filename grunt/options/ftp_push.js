/**
 * Pushes creatives to FTP
 */
'use strict';

module.exports = function( grunt ) {
  var ftpcfg = require('/Users/Shared/Archive/ftpInfo.json');

  return {
    build: {
      options: {
        host: ftpcfg.host,
        username: ftpcfg.username,
        password: ftpcfg.password,
        dest: ftpcfg.dest,
        port: 21,
        debug: false
      },
      files: [{
        expand: true,
        cwd: '<%= config.dir.dist %>',
        dest: '<%= pkg.advert.job %>',
        src: ['**']
      }]
    }
  };

};
