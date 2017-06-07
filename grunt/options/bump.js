/**
 * Increment the package version
 */
'use strict';

var bumpFiles = [
  'package.json',
  'bower.json',
  'readme.md'
];

module.exports = {

  options: {
    files: bumpFiles,
    updateConfigs: ['config'],
    commit: false,
    commitMessage: 'Release v%VERSION%',
    commitFiles: bumpFiles,
    createTag: false,
    tagName: 'v%VERSION%',
    tagMessage: 'Version %VERSION%',
    push: false,
    pushTo: 'upstream',
    gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
  }

};
