/* global ADTECH: false */
var Modal = require('./vendor/simple-modal/src/modal.js');

ADTECH.ready(function() {

  var advert = {
    adState: 0,
    selectors: {
      closeBtn: '#close-ad-btn',
      advertWrapper: '.advert-container',
      trigger: '.fake-trigger',
      ctaDiscover: '.btn-discover'
    },
    className: {
      visible: 'visible',
      untouchable: 'un-touchable'
    },

    // Ad polite load JS
    getScript: function( path, callback ) {
      var script;
      script = document.createElement( 'script' );
      script.src = path;
      if ( script.readyState ) {
        script.onreadystatechange = function() {
          if ( script.readyState === 'loaded' || script.readyState === 'complete' ) {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {
        script.onload = callback;
      }
      document.head.appendChild( script );
    },

    // Add polite-load images
    loadImages: function( images ) {
      var imageTags = document.querySelector( images );
      for ( var i = 0, length = imageTags.length; i < length; i++ ) {
        var image = imageTags.eq( i );
        image.attr( 'src', image.attr( 'data-src' ) );
      }
    },

    // Call our functions
    callFuncs: function () {
      // Modal - remove if not needed
      advert.modal();

      var run = true;
      // If already called...
      if (run) {
        return;
      }
    }
  };

  advert.init = function( e ) {
    if ( advert.adState === 0 ) {
      advert.adState = 1;
      advert.open();
      advert.callFuncs();
    } else {
      advert.open();
    }
  };

  advert.open = function() {
    document.querySelector( advert.selectors.trigger ).classList.add( advert.className.untouchable );
    document.querySelector( advert.selectors.advertWrapper ).classList.add( advert.className.visible );
  };

  advert.close = function() {
    ADTECH.hide();

    document.querySelector( advert.selectors.trigger ).classList.remove( advert.className.untouchable );
    document.querySelector( advert.selectors.advertWrapper ).classList.remove( advert.className.visible );
  };

  // Modal popup uses simple-modal https://github.com/matt3188/simple-modal
  // Remove if not needed
  advert.modal = function() {
    var myContent = document.getElementById( 'content' );

    var myModal = new Modal({
      content: myContent
    });

    var modalButton = document.querySelector( '.simple-modal' );

    modalButton.addEventListener( 'click', function() {
      myModal.open();
    });
  };

  // Add your links below
  // advert.firstLink = function( e ) {
  //   e.preventDefault();
  //   ADTECH.click('Link title', 'http://www.example.com/uk');
  // };

  // Add your event listeners
  document.querySelector( advert.selectors.closeBtn ).addEventListener( 'click', advert.close );

  // Add your link event listeners
  // document.querySelector( advert.selectors.ctaDiscover ).addEventListener( 'click', advert.firstLink );

  // As soon as the site is clicked and it transitions out, trigger advert
  ADTECH.addEventListener( 'showTransitionOutEnd', advert.init );

  // Register In and Out transitions
  ADTECH.event( 'showTransitionOutEnd' );
  ADTECH.event( 'showTransitionInEnd' );

  // If we are developing locally make our fake trigger work
  var localhost = document.location.hostname == 'localhost';
  if ( localhost ) {
    document.querySelector( advert.selectors.trigger ).addEventListener( 'click', advert.init );
  }

});
