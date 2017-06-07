/**
 * Check credentials for FTP and AWS
 */

'use strict';

module.exports = function( grunt ) {

  return grunt.registerTask( 'check-creds', 'Check\'s to see if user has the correct credentials', function() {

    var taskList = [];

    taskList = taskList.concat([
      'check-ftp',
      'check-aws'
    ]);

    grunt.task.run(taskList);

    var path = '/Users/Shared/Archive/';

    grunt.registerTask('check-ftp', function() {
      var ftpcfgFile = path + 'ftpInfo.json';

      try {
        return [
          grunt.file.readJSON( ftpcfg ),
          grunt.log.ok()
        ];
      } catch( e ) {
        grunt.task.run('report-error:ftp');
      }
    });

    grunt.registerTask('check-aws', function() {
      var awscfgFile = path + 'awsInfo.json';

      try {
        return [
          grunt.file.readJSON( awscfg ),
          grunt.log.ok()
        ];
      } catch( e ) {
        grunt.task.run('report-error:aws');
      }
    });

    grunt.registerTask('report-error', function( arg ) {
      if ( arg === 'aws' ) {
        var file = 'awsInfo.json';
      } else {
        var file = 'ftpInfo.json';
      }

      // Something went wrong.
      var template = '[{blue:%s}] ';
      var logger = require( 'eazy-logger' ).Logger({
        prefix: template.replace('%s', 'DD'),
        useLevelPrefixes: false
      });

      logger.unprefixed( 'info', '{bold:%s', '\nMissing Files' );
      logger.log( 'error', 'You will need to place the {bold:' + file + '} file in the following directory.' );
      logger.log( 'error', '{blue:~' + path );
      logger.log( 'error', 'Grab the JSON files from https://goo.gl/MWVsX0\n' );
    });

  });

}
