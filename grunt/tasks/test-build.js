/**
 * Once advert has been built test to see if it works
 */
'use strict';

module.exports = function( grunt ) {

  return grunt.registerTask( 'test-build', 'Test build folder before deploying', function() {
    grunt.task.run([
      'browserSync:dist'
    ]);
  });
}
