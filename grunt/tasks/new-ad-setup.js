/**
 * Interactively sets up new advert and updates the package and readme.md versions, and config.js
 */
'use strict';

module.exports = function( grunt ) {

  return grunt.registerTask( 'new-ad-setup', 'Allows user to setup the basic info for their advert and select a template to build from', function() {

    // Check this hasn't already been run
    if ( grunt.config('pkg.advert') !== undefined ) {
      grunt.fail.warn('It looks like the advert has already has been setup. Are you sure you want to run this task again?');
    }

    if ( grunt.config( 'config.setup-new-ad' ) === 'no' ) {
      grunt.fail.warn( 'No problem, run grunt `grunt new-ad-setup` when you are ready.' );
    }

    grunt.task.run([
      'prompt:new-ad',
      'prompt:new-ad-name',
      'prompt:new-ad-template',
      'template-type',
      'update-package-json-to-advert',
      'string-replace:advertPrepareReadme',
      'template:advertPartials',
      'string-replace:buildUrlArray',
      'clean:git',
      'shell:git'
    ]);

    // lastly bump down to version 0.0.1
    grunt.option( 'setversion', '0.0.1' );
    grunt.task.run( 'bump' );

  });

};
