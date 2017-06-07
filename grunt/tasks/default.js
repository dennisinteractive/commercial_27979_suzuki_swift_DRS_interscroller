/**
 * Default grunt task
 */
'use strict';

module.exports = function( grunt ) {

  return grunt.registerTask( 'default', 'Checks code with eslint and builds advert', function() {

    grunt.task.run([
      'eslint'
    ]);

  });

};
