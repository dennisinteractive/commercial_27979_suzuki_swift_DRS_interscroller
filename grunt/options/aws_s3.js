/**
* Grunt AWS S3 JS files
*/
'use strict';

module.exports = function( grunt ) {
  var awscfg = grunt.file.readJSON( '/Users/Shared/Archive/awsInfo.json' );

  return {
    dennis: {
      options: {
        bucket: awscfg.bucket + '/' + awscfg.upPath + '/<%= pkg.advert.job %>',
        access: 'bucket-owner-full-control',
        overwrite: true,
        displayChangesOnly: true,
        accessKeyId: awscfg.key,
        secretAccessKey: awscfg.secret,
        region: 'eu-west-1',
        debug: false,
      },
      files: [
        {
          expand: true,
          cwd: '<%= config.dir.dist %>',
          src: '**',
        },
      ]
    }
  };
};
