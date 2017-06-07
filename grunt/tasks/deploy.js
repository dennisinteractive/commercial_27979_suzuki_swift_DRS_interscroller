/**
 * All deploy tasks
 */
'use strict';

module.exports = function( grunt ) {

  return grunt.registerTask( 'deploy', 'Deploy advert into a zip', function() {
    var taskList = [];

    // Ask who the advert is for and come back...
    if ( grunt.config('config.publisher') === undefined ) {
      grunt.task.run([
        'deploy-prompt'
      ]);
    }

    // Default tasks
    if ( grunt.config('config.publisher') === 'default' ) {
      taskList = taskList.concat([
        'build',
        'compress:default'
      ]);
    }

    // One Creative tasks
    if ( grunt.config('config.publisher') === 'pictela' ) {
      taskList = taskList.concat([
        'build:slider',
        'prompt:one-creative-id',
        'string-replace:oneCreativeID',
        'string-replace:updateCreativeID',
        'compress:pictelaLeaderboard',
        'compress:pictelaSkin',
        'compress:pictelaMPU'
      ]);
    }

    // Publish to FTP
    if ( grunt.config('config.publisher') === 'standard-staging' ) {
      taskList = taskList.concat([
        'build',
        'check-creds',
        'ftp_push:build',
        'aws_s3',
        'publish-staging-successful'
      ]);
    }

    // Produce link for approval
    grunt.registerTask('publish-staging-successful', function( pkg, adcfg ) {
      grunt.log.subhead('Publish Staging:'['yellow']);
      grunt.log.writeln(('Preview has been built sucessfully and can been viewed here: http://di.dennis.co.uk/html-ad-preview?job=' + grunt.config('pkg.advert.job') + '&format=' + grunt.config('pkg.adverts'))['green'].bold);

    });

    grunt.task.run(taskList);
  });

};
