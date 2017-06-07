/**
 * Perform string replacement
 */
'use strict';

module.exports = function(grunt) {
  var awscfg = grunt.file.readJSON( '/Users/Shared/Archive/awsInfo.json' );

  return {

    advertPrepareReadme: {
      files: [
        {
          expand:  true,
          flatten: true,
          filter: 'isFile',
          cwd:     '.',
          dest:    '.',
          src: [ 'readme.md' ]
        }
      ],
      options: {
        replacements: [
          {
            pattern: /# (Dennis|Other notes)([\S\s])*?(?=### Grunt|\*\*Good)/ig,
            replacement: '{replace}'
          },
          {
            // top
            pattern: '{replace}',
            replacement: '# {advert_client} - {advert_campaign} - {advert_name} (Version: 0.0.1)\n\n'
          },
          {
            // bottom
            pattern: '{replace}',
            replacement: '---\n\n##### This advert uses HTML Ad Templates v{template_version}\nFor full documentation, have a look at the readme specific to that version: \n<https://github.com/dennisinteractive/html-ad-templates/releases>\n\n'
          },
          {
            pattern: /{advert_name}/g,
            replacement: function(){
              return grunt.config('config.advert.name');
            }
          },
          {
            pattern: /{advert_campaign}/g,
            replacement: function(){
              return grunt.config('config.advert.campaign');
            }
          },
          {
            pattern: /{advert_client}/g,
            replacement: function(){
              return grunt.config('config.advert.client');
            }
          },
          {
            pattern: /{template_version}/g,
            replacement: function(){
              return grunt.config('pkg.version');
            }
          }
        ]
      }
    },
    addPictela: {
      files: [
        {
          expand:  true,
          flatten: true,
          filter: 'isFile',
          cwd:    '<%= config.html.src %>',
          dest:   '<%= config.html.src %>',
          src: [
            '<%= config.files.html.src %>',
            '<%= config.files.slider.files %>'
          ]
        }
      ],
      options: {
        replacements: [
          {
            pattern: '<!-- [pictela_adtech] -->',
            replacement: [
              '<script src="http://ads.pictela.com/ads/jsapi/ADTECH.js"></script>'
            ].join("\n")
          }
        ]
      }
    },
    removeAssets: {
      files: [
        {
          expand:  true,
          flatten: true,
          filter: 'isFile',
          cwd:    '<%= config.html.src %>',
          dest:   '<%= config.html.src %>',
          src: [
            '<%= config.files.html.src %>'
          ]
        }
      ],
      options: {
        replacements: [
          {
            pattern: / (<!-- build:css|<!-- build:js)([\S\s])*?(!-- endbuild -->\n\n    )/ig,
            replacement: ' '
          }
        ]
      }
    },
    addStyle: {
      files: [
        {
          expand:  true,
          flatten: true,
          filter: 'isFile',
          cwd:    '<%= config.html.src %>',
          dest:   '<%= config.html.src %>',
          src: [
            '<%= config.files.html.src %>'
          ]
        }
      ],
      options: {
        replacements: [
          {
            pattern: '<meta name="apple-mobile-web-app-capable" content="yes" />',
            replacement: [
              '<meta name="apple-mobile-web-app-capable" content="yes" />\n\n    <link rel="stylesheet" href="css/main.css">'
            ]
          }
        ]
      }
    },
    // Updates 'local' to 'oneCreativeID' in adConfig.json
    // Specific to site slider template
    oneCreativeID: {
      files: [
        {
          expand:  true,
          flatten: true,
          filter:  'isFile',
          cwd:     '<%= config.dir.dist %>',
          dest:    '<%= config.dir.dist %>',
          src:     'adConfig.json'
        }
      ],
      options: {
        replacements: [
          {
            pattern: /local/g,
            replacement: function() {
              return grunt.config('config.onecreativeid');
            }
          }
        ]
      }
    },
    updateCreativeID: {
      files: [
        {
          expand:  true,
          flatten: true,
          filter:  'isFile',
          cwd:     '<%= config.dir.grunt %>',
          dest:    '<%= config.dir.grunt %>',
          src: [
            'config.js'
          ]
        }
      ],
      options: {
        replacements: [
          {
            pattern: /(onecreativeid: ')([\S\s])*?(',)/i,
            replacement: function() {
              return "onecreativeid: '" + grunt.config("config.onecreativeid") + "',";
            }
          }
        ]
      }
    },

    standardImages: {
      files: (function() {
        var out = [];
        var arr = [ '{"",<%= pkg.adverts %>}' ];
        arr.forEach(function( value, pkg ) {
          var src = '<%= config.dir.dist %>/' + value + '/css/<%= config.css.globCss %>';
          var dest = '';
          out.push({
            expand: true,
            src: src,
            dest: dest
          });
        });
        return out;
      })(),
      options: {
        replacements: [
          {
            pattern: ': url("',
            replacement: ': url(\"http://' + awscfg.bucket + '/' + awscfg.upPath + '/<%= pkg.advert.job %>/<%= pkg.adverts %>'
          }
        ]
      }
    },
    buildUrlArray: {
      files: [
        {
          expand:  true,
          flatten: true,
          filter:  'isFile',
          cwd:     '<%= config.dir.src %>',
          dest:    '<%= config.dir.src %>',
          src: [
            'index.html'
          ]
        }
      ],
      options: {
        replacements: [
          // Replace the placeholder
          {
            pattern: '<!--URLS-->',
            replacement: (function() {
              var arr = ['<%= pkg.adverts %>'];
              return arr;
            })(),
          },
          // Append the values outputted
          {
            pattern: /\['(.*?)\']/,
            replacement: function(match) {
              var arr = match.split(",").map(function(a) { return a + "/index.html','"; }).join("");
              return arr;
            }
          },
          // Fix ugly one at the end
          {
            // pattern: /\,'(.*?)\;/,
            pattern: /('].*?\',')/,
            replacement: function(match) {
              return match = "/index.html']";
            }
          }
        ]
      }
    },
    // Searches for <%= pkg.adverts %> string and removes the irrelevant ones
    leaderboardImagePth: {
      files: [{
        expand: true,
        filter: 'isFile',
        cwd:    '<%= config.dir.dist %>',
        dest:   '<%= config.dir.dist %>',
        src:    [ 'leaderboard/index.html' ]
      }],
      options: { replacements: [ { pattern: '<%= pkg.adverts %>', replacement: 'leaderboard' } ] }
    },
    mpuImagePth: {
      files: [{
        expand: true,
        filter: 'isFile',
        cwd:    '<%= config.dir.dist %>',
        dest:   '<%= config.dir.dist %>',
        src:    [ 'mpu/index.html' ]
      }],
      options: { replacements: [ { pattern: '<%= pkg.adverts %>', replacement: 'mpu' } ] }
    },
    dmpuImagePth: {
      files: [{
        expand: true,
        filter: 'isFile',
        cwd:    '<%= config.dir.dist %>',
        dest:   '<%= config.dir.dist %>',
        src:    [ 'dmpu/index.html' ]
      }],
      options: { replacements: [ { pattern: '<%= pkg.adverts %>', replacement: 'dmpu' } ] }
    },
    billboardImagePth: {
      files: [{
        expand: true,
        filter: 'isFile',
        cwd:    '<%= config.dir.dist %>',
        dest:   '<%= config.dir.dist %>',
        src:    [ 'billboard/index.html' ]
      }],
      options: { replacements: [ { pattern: '<%= pkg.adverts %>', replacement: 'billboard' } ] }
    },
    doublebillboardImagePth: {
      files: [{
        expand: true,
        filter: 'isFile',
        cwd:    '<%= config.dir.dist %>',
        dest:   '<%= config.dir.dist %>',
        src:    [ 'doublebillboard/index.html' ]
      }],
      options: { replacements: [ { pattern: '<%= pkg.adverts %>', replacement: 'doublebillboard' } ] }
    },

    standardPublish: {
      files: (function() {
        var out = [];
        var arr = [ '{"",<%= pkg.adverts %>}' ];
        arr.forEach(function( value ) {
          var src = '<%= config.dir.dist %>/' + value + '/index.html';
          var dest = '';
          out.push({
            expand: true,
            src: src,
            dest: dest
          });
        });
        return out;
      })(),
      options: {
        replacements: [
          {
            pattern: /\[\[\s*adcfg\.(.*?)\s*\]\]/ig,
            replacement: function(match, p1) {
              return adcfg[p1] || '';
            }
          },
          {
            pattern: /<body>+/g,
            replacement: '<body data-cachebuster="%%CACHEBUSTER%%"'
          },
          {
            pattern: /<clicktag>+/g,
            replacement: '%%CLICK_URL_UNESC%%[%clickThroughURL%]'
          },
          {
            pattern: /<pixeltracker>+/g,
            replacement: '[%pixelTracker%]?%%CACHEBUSTER%%'
          },
          {
            pattern: /<additonaltracking>+/g,
            replacement: '[%additonalTracking%]'
          }
        ]
      }
    }

  };

};
