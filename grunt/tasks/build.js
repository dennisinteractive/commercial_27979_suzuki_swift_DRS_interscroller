/**
 * Build tasks
 */
'use strict';

module.exports = function( grunt ) {

  return grunt.registerTask( 'build', 'Build advert', function() {
    var taskList = [];

    taskList = taskList.concat([
      'clean:dist'
    ]);


    if ( grunt.config('pkg.advert.template') === 'default' || grunt.config('pkg.advert.template') === 'expandable' ) {

      taskList = taskList.concat([
        'copy:dist',
        'wiredep:advert',
        'wiredep:sass',
        'useminPrepare',
        'concurrent:dist',
        'postcss:dist',
        'concat',
        'cssmin',
        'uglify:generated',
        'usemin'
      ]);

    }

    if ( grunt.config('pkg.advert.template') === 'standard' || grunt.config('config.publisher') === 'standard-staging' ) {

      taskList = taskList.concat([
        'copy:standardDist',
        'useminPrepare',
        'string-replace:standardPublish',
        'concurrent:standardDist',
        'copy:standardStyles',
        'postcss',
        'string-replace:standardImages',
        'uglify:standard',
        'copy-standard-assets',
        'usemin',
        'inline:dist',
        'replace-image-paths',
        'htmlmin:dist'
      ]);

    }

    if ( grunt.config('pkg.advert.template') === 'slider' || grunt.config('config.publisher') === 'pictela' ) {

      taskList = taskList.concat([
        'copy:sliderDist',
        'useminPrepare',
        'wiredep:slider',
        'concurrent:dist',
        'postcss',
        'concat',
        'cssmin',
        'uglify:generated',
        'usemin'
      ]);

    }

    grunt.task.run(taskList);

    // Repetitve tasks
    grunt.registerTask('copy-standard-assets', function( pkg ) {
      var adverts = grunt.config('pkg.adverts');

      for ( var i in adverts ) {
        grunt.task.run([ 'copy:' + adverts[i] ]);
        grunt.log.ok( 'Assets copied into ' + adverts[i] + ' folder' );
      }
    });

    grunt.registerTask('replace-image-paths', function( pkg ) {
      var adverts = grunt.config('pkg.adverts');

      for ( var i in adverts ) {
        grunt.task.run([ 'string-replace:' + adverts[i] +'ImagePth' ]);
      }
    });

  });

};
