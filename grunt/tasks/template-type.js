'use strict';

module.exports = function( grunt ) {

  return grunt.registerTask( 'template-type', 'Run certain tasks based upon the users template choice', function() {

    if ( grunt.config( 'config.advert.template' ) === 'slider' ) {

      return grunt.task.run([
        'string-replace:removeAssets',
        'wiredep:slider',
        'copy:sliderTemplateFiles',
        'string-replace:addPictela'
      ]);

    }

    if ( grunt.config( 'config.advert.template' ) === 'standard' ) {

      return grunt.task.run([
        'string-replace:removeAssets',
        'prompt:standard-adverts',
        'copy:standardTemplateFiles',
        'string-replace:addStyle'
      ]);

    }

    if ( grunt.config( 'config.advert.template' ) === 'expandable' ) {

      return grunt.task.run([
        'string-replace:addPictela'
      ]);

    }

  });

};
