/**
 * Interactive prompt
 */
'use strict';

module.exports = function( grunt ) {

  // List all files in the templates directory.
  var templates = grunt.file.expand({
    filter: 'isDirectory',
    cwd: 'src/templates'
  }, ['*'] );

  // Make actual choices out of them that grunt-prompt can use.
  var templateChoices = templates.map(function( t ) {
    return { name: t, checked: false };
  });

  var adFormats = grunt.file.expand({
    filter: 'isDirectory',
    cwd: 'src/templates/standard'
  }, ['*','!images',] );

  // Make actual choices out of them that grunt-prompt can use.
  var standardAdChoices = adFormats.map(function( t ) {
    return { name: t, checked: false };
  });

  return {

    // Setup prompts
    'setup-new-ad': {
      options: {
        questions: [
          {
            config:  'config.setup-new-ad',
            type: 'list',
            message: 'Hmmm... doesn\'t look you have anything to show yet bro, would you like to run `grunt new-ad-setup`?',
            choices: [
              { name: 'Yes', value: 'yes' },
              { name: 'No', value: 'no' }
            ]
          }
        ]
      }
    },

    'new-ad': {
      options: {
        questions: [
          {
            config:  'config.advert.client',
            type:    'input',
            message: 'Enter the client name:',
            default: 'Dennis Publishing',
            filter:  function(value) {
              return value.replace(/[^\w\d\s-_:()]/gmi,'').replace(/\s{2,}/gmi, ' ');
            }
          },
          {
            config:  'config.advert.name',
            type:    'input',
            message: 'Enter the advert name:',
            default: 'Ad Name',
            filter:  function(value) {
              return value.replace(/[^\w\d\s-_:()]/gmi,'').replace(/\s{2,}/gmi, ' ');
            }
          },
          {
            config:  'config.advert.campaign',
            type:    'input',
            message: 'Enter the campaign name',
            default: 'Campaign',
            filter:  function(value) {
              return value.replace(/[^\w\d\s-_:()]/gmi,'').replace(/\s{2,}/gmi, ' ');
            }
          },
          {
            config:  'config.job',
            type:    'input',
            message: 'What is the job number?',
            default: '123456',
            filter:  function(value) {
              return value.replace(/[^\w\d\s-_:()]/gmi,'').replace(/\s{2,}/gmi, ' ');
            }
          }
        ]
      }
    },

    'new-ad-name': {
      options: {
        questions: [
          {
            config:  'config.name',
            type:    'input',
            message: 'campaign name ',
            default: function(){
              var name = grunt.config('config.advert.client') + '-' + grunt.config('config.advert.name');
              return name.replace(/\s+/g, '-').replace(/-{2,}/gmi,'-').toLowerCase();
            }
          }
        ]
      }
    },

    'new-ad-template': {
      options: {
        questions: [
          {
            config: 'config.advert.template',
            type: 'list',
            message: 'Please select a template to use',
            choices: templateChoices,
            default: 'default'
          }
        ]
      }
    },

    'standard-adverts': {
      options: {
        questions: [
          {
            config: 'config.standardAdvert',
            type: 'checkbox',
            message: 'Please select the adverts you would like to create',
            choices: standardAdChoices
          }
        ]
      }
    },

    // Pre deploy prompts
    'one-creative-id': {
      options: {
        questions: [
          {
            config:  'creativeID',
            type:    'input',
            message: 'Do you have a One Creative advert setup? Lets update the adConfig.json file. Does this Creative ID look correct?\n',
            default: '<%= config.onecreativeid %>'
          }
        ],
        then: function(results) {
          grunt.config.set('config.onecreativeid', results.creativeID);
        }
      }
    },

    // Deploy prompts
    'deploy-prompt': {
      options: {
        questions: [
          {
            config: 'config.publisher',
            type: 'list',
            message: 'Please select how you would like to deploy your advert',
            choices: [
              { name: 'Zip folder', value: 'default' },
              { name: 'ONE Creative', value: 'pictela' },
              { name: 'Standard display - Staging', value: 'standard-staging' }
            ],
            default: 'default'
          }
        ]
      }
    }

  };
};
