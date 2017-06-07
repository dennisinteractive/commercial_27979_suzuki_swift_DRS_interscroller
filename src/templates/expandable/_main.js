/* global jquery: false, ADTECH: false, YT: false */
ADTECH.ready(function() {

  var advert = {
    debug: 1,
    adState: 0,
    opening: false,
    selectors: {
      advertWrapper: '.advert-container',
      innerAdvert: '.advert-inner-container',
      closeBtn: '.btn-close',
      trigger: '.trigger',
      hasFade: '.fade-in',
      frame: '.frame'
    },
    className: {
      expand: 'expand',
      fadeIn: 'fade-in'
    },

    // Ad polite load JS
    getScript: function(path, callback) {
      var script;
      script = document.createElement('script');
      script.src = path;
      if (script.readyState) {
        script.onreadystatechange = function() {
          if (script.readyState === 'loaded' || script.readyState === 'complete') {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {
        script.onload = callback;
      }
      document.head.appendChild(script);
    },

    // Ad polite load images
    // Usage: <img src="" data-src="images/image_name.png" alt="Image" class="polite-load" />
    loadImages: function(images) {
      var imageTags = document.querySelectorAll(images);
      for (var i = 0, length = imageTags.length; i < length; i++) {
        var image = imageTags[i],
            dataSrc = imageTags[i].getAttribute('data-src');
        image.setAttribute('src', dataSrc);
      }
    },

    // Call our functions
    callFuncs: function() {
      advert.addTracking();

      var run = true;
      // If already called...
      if (run) {
        return;
      }
    }
  };

  advert.init = function(event) {
    if (advert.adState === 0) {
      advert.adState = 1;
      advert.open();
      advert.callFuncs();
    } else {
      advert.open();
    }
  };

  advert.open = function(event) {
    advert.track.open();

    // Specific to local environment or test links
    // if (window.location.href.indexOf('localhost') != -1 || window.location.href.indexOf('dennis.co.uk') != -1) {}

    document.querySelectorAll(advert.selectors.frame)[0].classList.remove(advert.className.fadeIn);
    document.querySelectorAll(advert.selectors.frame)[1].classList.add(advert.className.fadeIn);
    document.querySelector(advert.selectors.advertWrapper).classList.add(advert.className.expand);
  };

  advert.close = function() {
    advert.track.close();

    document.querySelectorAll(advert.selectors.frame)[0].classList.add(advert.className.fadeIn);
    document.querySelectorAll(advert.selectors.frame)[1].classList.remove(advert.className.fadeIn);
    document.querySelector(advert.selectors.advertWrapper).classList.remove(advert.className.expand);
  };

  // Search through document and find
  // all elements with the attribute data-track
  // <a href="" data-track="label"></a>
  advert.addTracking = function() {
    if (advert.debug) {
      var tracking = [];
      var trackedLinks = document.querySelectorAll('[data-track]');
      [].slice.call(trackedLinks).forEach(function(btn) {
        var label = btn.getAttribute('data-track');
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          advert.track.buttonClicked(e); // Call buttonClick method inside advert.track
        });
      });
    }
  };


  // Listeners
  document.querySelector(advert.selectors.trigger).addEventListener('click', function() {
    advert.init();
  });

  document.querySelector(advert.selectors.closeBtn).addEventListener('click', function() {
    advert.close();
  });

  // Methods for the various tracking events
  advert.track = {
    open: function open() {
      ADTECH.expand();
    },
    close: function close() {
      ADTECH.contract();
    },
    buttonClicked: function buttonClicked(e) {
      var clicked = e.target.getAttribute('data-track'); // Returns data-track value

      switch (clicked) {
        case 'example': // data-track value to wait for
          ADTECH.event('Example event to log');
          break;
      }
    }
  };

});
