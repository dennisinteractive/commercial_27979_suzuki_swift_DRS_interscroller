/**
 * Boilerplate code required to hook into the ADTECH rich media library.
 *
 * For API documentation, please contact canvas-help@adtech.com
 */
(function(adConfig) {
  // Wipe out defaults.
  adConfig.eventHandlers = [];

  var requiresBreakout = false;
  if (!adConfig.overrides || adConfig.overrides.displayWindowTarget != self) {
    for (var id in adConfig.assetContainers) {
      if (adConfig.assetContainers.hasOwnProperty(id)) {
        var container = adConfig.assetContainers[id];
        if (container.type != 'inlineDiv' || container.isExpandable) {
          requiresBreakout = true;
          break;
        }
      }
    }
  }

  if (adConfig.overrides && adConfig.overrides.displayWindowTarget) {
    var displayWindowTarget = adConfig.overrides.displayWindowTarget;
    displayWindowTarget = (typeof adtechIframeHashArray != 'undefined' && self != top) ?
      displayWindowTarget.parent : displayWindowTarget;
  } else {
    var calculatedTarget = null;
    var currentWindow = parent;
    while (currentWindow != undefined) {
      try {
        var targetDoc = currentWindow.document;
        if (targetDoc) {
          calculatedTarget = currentWindow;
        }
      } catch (e) {}
      currentWindow = (currentWindow == top) ? null : currentWindow.parent;
    }
    var displayWindowTarget = calculatedTarget || top;
  }

  var targetIsFriendly = false;
  try {
    var targetDoc = displayWindowTarget.document;
    if (targetDoc) {
      targetIsFriendly = true;
    }
  } catch (e) {}

  var targetWindow = (requiresBreakout && (self != top && targetIsFriendly)) ?
    displayWindowTarget : self;

  targetWindow.com = targetWindow.com || {};
  targetWindow.com.adtech = targetWindow.com.adtech || {};

  targetWindow.com.adtech.AdtechCustomAd$AD_ID$ = function() {
    // Custom code class constructor.
  };

  targetWindow.com.adtech.AdtechCustomAd$AD_ID$.prototype = {

    preInit: function() {
      window.com = com || {};
      com.adtech = targetWindow.com.adtech;
    },

    init: function(advert) {
      if (!advert.richView) {
        // The backup client can not render the rich version of the advert.
        return;
      }

      // A few useful things to help you get started. Please delete as necessary!
      this.advert = advert;
      this.utils = com.adtech.Utils_$VERSION$;
      this.globalEventBus = targetWindow.adtechAdManager_$VERSION$.globalEventBus;
      this.richMediaEvent = com.adtech.RichMediaEvent_$VERSION$;

      if (this.globalEventBus.DOMLoaded) {
        this.domLoadHandler();
      } else {
        this.globalEventBus.addEventListener('DOMLoad',
          this.utils.createClosure(this, this.domLoadHandler));
      }
      if (this.globalEventBus.pageLoaded) {
        this.pageLoadHandler();
      } else {
        this.globalEventBus.addEventListener(this.richMediaEvent.PAGE_LOAD,
          this.utils.createClosure(this, this.pageLoadHandler));
      }
      this.globalEventBus.addEventListener(this.richMediaEvent.PAGE_SCROLL, this.utils.createClosure(this, this.pageScrollHandler));
      this.setPageProperties();
      this.addCustomEventHandlers();
      this.globalEventBus.addEventListener('leaderboardClicked', openAd);
    },

    openAd: function() {
      console.log("Show something!");
      ADTECH.show();
    },

    setPageProperties: function() {
      this.targetDoc = targetWindow.document;
      this.mainContainerId = 'page';
      this.pageContentWidth = 980;
      this.pageTeaserWidth = 120;
    },

    addCustomEventHandlers: function() {
      this.advert.eventBus.addEventListener('show', this.utils.createClosure(this, this.showHandler));
      this.advert.eventBus.addEventListener('hide', this.utils.createClosure(this, this.hideHandler));
    },

    clearHtmlBackground: function() {
      this.targetDoc.documentElement.style.backgroundColor = 'transparent';
    },

    getGutterWidth: function() {
      var viewportDims = this.utils.getViewportDims();
      var totalGutterAvailableWidth = (this.pageContentWidth >= viewportDims.w) ?
        0 : Math.floor((viewportDims.w - this.pageContentWidth));
      return totalGutterAvailableWidth / 2;
    },

    createAnchor: function(id, x, y, width, height) {
      var anchor = this.targetDoc.createElement('a');
      anchor.id = id;
      anchor.target = '_self';
      anchor.style.position = 'fixed';
      anchor.style.zIndex = 10;
      anchor.style.left = x + 'px';
      anchor.style.top = y + 'px';
      anchor.style.width = width + 'px';
      anchor.style.height = height + 'px';
      anchor.style.background = 'none';
      anchor.style.outline = 'none';
      anchor.style.outlineStyle = 'none';
      anchor.onclick = this.utils.createClosure(this, this.anchorClickHandler);
      anchor.style.cursor = 'pointer';
      return this.targetDoc.body.appendChild(anchor);
    },

    createAnchors: function() {
      var gutterWidth = this.getGutterWidth();
      var viewportDims = this.utils.getViewportDims();
      this.leftAnchor = this.createAnchor('pct-left-anchor-' + this.advert.id, 0, 0, gutterWidth, viewportDims.h);
      var anchorX = viewportDims.w - gutterWidth;
      this.rightAnchor = this.createAnchor('pct-right-anchor-' + this.advert.id, anchorX, 0, gutterWidth, viewportDims.h);
      this.globalEventBus.addEventListener(this.richMediaEvent.PAGE_RESIZE, this.utils.createClosure(this, this.pageResizeHandler));
    },

    hideAnchors: function() {
      this.leftAnchor.style.top = this.rightAnchor.style.top = '-3000px';
    },

    restoreAnchors: function() {
      this.leftAnchor.style.top = this.rightAnchor.style.top = '0px';
    },

    startRevealTransiton: function() {
      this.hideAnchors();
      this.slideOutPage();
    },

    startCloseTransiton: function() {
      this.slideInPage();
    },

    slideOutPage: function() {
      if (targetWindow.jQuery) {
        var _this = this;
        var gutterWidth = this.getGutterWidth();
        var targetPageLeft = this.pageTeaserWidth - gutterWidth - this.pageContentWidth - 90;

        targetWindow.jQuery('#' + this.mainContainerId)
          .animate({ left: targetPageLeft + "px" }, {
            duration: 1000,
            specialEasing: {
              left: "swing"
            },
            complete: function() {
              _this.pageSlideOutEndHandler();
            }
          });
      }
    },

    slideInPage: function() {
      if (targetWindow.jQuery) {
        var _this = this;
        var gutterWidth = this.getGutterWidth();

        targetWindow.jQuery('#' + this.mainContainerId)
          .animate({ left: "0px" }, {
            duration: 1000,
            specialEasing: {
              left: "swing"
            },
            complete: function() {
              _this.pageSlideInEndHandler();
            }
          });
      }
    },

    /**************************
     * Event handlers
     *************************/

    pageSlideOutEndHandler: function() {
      targetWindow.document.getElementById(this.mainContainerId).style.zIndex = '1001';
      this.advert.getAssetContainer('float').div.style.zIndex = '1';
      this.advert.getAssetContainer('main').content.dispatchAdvertLevelEvent(
        new this.richMediaEvent('showTransitionOutEnd'));
    },

    pageSlideInEndHandler: function() {
      this.restoreAnchors();
      this.advert.getAssetContainer('float').div.style.zIndex = '-1';
      this.advert.getAssetContainer('main').content.dispatchAdvertLevelEvent(
        new this.richMediaEvent('showTransitionInEnd'));
    },

    showHandler: function() {
      this.startRevealTransiton();
    },

    hideHandler: function() {
      this.startCloseTransiton();
    },

    anchorClickHandler: function() {
      this.startRevealTransiton();
    },

    pageResizeHandler: function() {
      var gutterWidth = this.getGutterWidth();
      var viewportDims = this.utils.getViewportDims();
      this.leftAnchor.style.width = this.rightAnchor.style.width = gutterWidth + 'px';
      this.rightAnchor.style.left = (viewportDims.w - gutterWidth) + 'px';
    },

    domLoadHandler: function() {
      this.createAnchors();
    },

    pageLoadHandler: function() {
      this.clearHtmlBackground();
    },

    pageScrollHandler: function(event) {
      var mpuContentInstance = this.advert.getAssetContainer('main').content;
      mpuContentInstance.dispatchToContent(mpuContentInstance.createContentEvent(event));
    }
  };

  targetWindow.adtechCallbackInstances = targetWindow.adtechCallbackInstances || [];
  var instanceIndex = targetWindow.adtechCallbackInstances.length;
  targetWindow.adtechCallbackInstances[instanceIndex] = new targetWindow.com.adtech.AdtechCustomAd$AD_ID$();

  targetWindow.adtechAdCallbacks = targetWindow.adtechAdCallbacks || {};
  targetWindow.adtechAdCallbacks[adConfig.adServerVars.uid] = targetWindow.adtechAdCallbacks[adConfig.adServerVars.uid] || [];
  targetWindow.adtechAdCallbacks[adConfig.adServerVars.uid].push(
    targetWindow.adtechCallbackInstances[instanceIndex]);
})(adtechAdConfig);
