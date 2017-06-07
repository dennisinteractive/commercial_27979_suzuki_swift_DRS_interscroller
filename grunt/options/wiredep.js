/**
 * Automatically inject Bower components into the HTML file
 */
'use strict';

module.exports = {

  advert: {
    src: ['<%= config.dir.src %>/<%= config.files.html.src %>'],
    ignorePath: /^(\.\.\/)*\.\./
  },
  slider: {
    src: ['<%= config.dir.src %>/<%= config.files.slider.src %>'],
    ignorePath: /^(\.\.\/)*\.\./
  },
  sass: {
    src: ['<%= config.css.src %>/<%= config.css.globSass %>'],
    ignorePath: /^(\.\.\/)+/
  }

};
