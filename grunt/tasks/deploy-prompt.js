/**
 * Deploy question prompt
 */
'use strict';

module.exports = function( grunt ) {

  return grunt.registerTask( 'deploy-prompt', 'Ask the user who they would like to publish the advert for.', function() {

    grunt.task.run([
      'prompt:deploy-prompt',
      'deploy'
    ]);

  });

};
