/**
 * Updates pacakge.json file with relevant advert details that are needed later
 */
'use strict';

module.exports = function( grunt ) {

  return grunt.registerTask( 'update-package-json-to-advert', 'Update package.json file with advert details', function() {

    // Fail safe to ensure we can't run when we are in the html-ad-templates repo
    if ( grunt.config( 'env.PWD' ).indexOf( 'ad-template' ) >= 0 ) {
      grunt.fail.warn( 'It looks like this is the advert template. Are you sure you want to do this?' );
    }

    var fs = require('fs'),
        packageJsonFilepath = './package.json',
        bowerJsonFilepath = './bower.json';

    // update package.json from user input
    grunt.config( 'pkg.name', grunt.config( 'config.name' ) );
    grunt.config( 'pkg.advert', grunt.config( 'config.advert' ) );
    grunt.config( 'pkg.advert.job', grunt.config( 'config.job' ) );
    grunt.config( 'pkg.advert.template_version', grunt.config( 'config.version' ) ) ;

    grunt.config( 'pkg.adverts', grunt.config( 'config.standardAdvert' ) );

    // Standard ad details
    if ( grunt.config( 'config.advert.template' ) === 'standard' ) {
      if ( grunt.config( 'config.standardAdvert' ).indexOf( 'mpu' ) >= 0 ) {
        grunt.config( 'pkg.advert.adverts.mpu.width', 300 );
        grunt.config( 'pkg.advert.adverts.mpu.height', 250 );
      }
      if ( grunt.config( 'config.standardAdvert' ).indexOf( 'billboard' ) >= 0 ) {
        grunt.config( 'pkg.advert.adverts.billboard.width', 970 );
        grunt.config( 'pkg.advert.adverts.billboard.height', 250 );
      }
      if ( grunt.config( 'config.standardAdvert' ).indexOf( 'leaderboard' ) >= 0 ) {
        grunt.config( 'pkg.advert.adverts.leaderboard.width', 728 );
        grunt.config( 'pkg.advert.adverts.leaderboard.height', 90) ;
      }
      if ( grunt.config( 'config.standardAdvert' ).indexOf( 'dmpu' ) >= 0 ) {
        grunt.config( 'pkg.advert.adverts.dmpu.width', 300 );
        grunt.config( 'pkg.advert.adverts.dmpu.height', 600 );
      }
      if ( grunt.config( 'config.standardAdvert' ).indexOf( 'doublebillboard' ) >= 0 ) {
        grunt.config( 'pkg.advert.adverts.doublebillboard.width', 970 );
        grunt.config( 'pkg.advert.adverts.doublebillboard.height', 500 );
      }
    }

    fs.writeFileSync( packageJsonFilepath, JSON.stringify( grunt.config( 'pkg' ), null, 2 ) );
    grunt.log.ok( 'Updated ' + packageJsonFilepath );

    // update bower.json from user input
    var bowerJson = require( '../.' + bowerJsonFilepath );
    bowerJson.name = grunt.config( 'config.name' );
    fs.writeFileSync( bowerJsonFilepath, JSON.stringify( bowerJson, null, 2 ) );

    grunt.log.ok( 'Updated ' + bowerJsonFilepath );

  });

};
