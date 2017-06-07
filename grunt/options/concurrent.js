/**
 * Run some tasks in parallel to speed up build process
 */
'use strict';

module.exports = {

  server: [
    'newer:sass:dist',
    'copy:styles'
  ],
  dist: [
    'newer:sass:dist',
    'imagemin',
    'svgmin'
  ],
  serveStd: [
    'newer:sass:standardDist'
  ],
  standardDist: [
    'newer:sass:standardDist',
    'imagemin',
    'svgmin'
  ]

};
