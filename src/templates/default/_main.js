// Begining of your advert
(function() {
  'use strict';

  var advert = {
    // Set your variables here
    selectors: {
      container: '.advert-container'
    },
    class: {
      visible: 'on-screen'
    }

  };

  advert.init = function() {
    console.log('Advert initialised');

    var container = document.querySelector(advert.selectors.container);
    setTimeout(function() {
      container.classList.add(advert.class.visible);
    }, 500);

  };

  return advert.init();

})();
