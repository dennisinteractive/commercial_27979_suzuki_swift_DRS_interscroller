/**
 * Sets up a server to run the advert while you're building it
 */
'use strict';

module.exports = function( grunt ) {

  return grunt.registerTask( 'serve', 'Start the server and preview your advert', function( target ) {

    if ( target === 'dist' ) {
      return grunt.task.run([
        'build',
        'browserSync:dist'
      ]);
    }

    if ( grunt.config( 'pkg.advert' ) === undefined ) {
      grunt.task.run( 'prompt:setup-new-ad' );
      grunt.task.run( 'new-ad-setup' );
    }

    if ( grunt.config( 'pkg.advert.template' ) === 'standard' ) {
      grunt.task.run([
        'clean:server',
        'wiredep:advert',
        'wiredep:sass',
        'concurrent:serveStd',
        'postcss',
        'browserSync:dev',
        'watch'
      ]);
    } else {
      grunt.task.run([
        'clean:server',
        'wiredep:advert',
        'wiredep:sass',
        'concurrent:server',
        'postcss',
        'browserSync:dev',
        'watch'
      ]);
    }

  });

};
