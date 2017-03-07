/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/aviator/404.html","5b094c5f6a9ec1731971831fe7370e13"],["/aviator/book-tour/index.html","477e2892dc711fa007a6e4f028b6fe57"],["/aviator/css/main.css","a4e903332a12f75130fa4b1de62603ee"],["/aviator/favicon-32x32.png","72db4ec3489a370ab07d592f607ee1ab"],["/aviator/images/Faulkner-Blotner1962.jpg","4248bfc05fbb6cf40a5d5e7e7d89f762"],["/aviator/images/Faulkner_142_Story-Schedule.jpg","6cf41a2bca6fcae9ae18f53833921394"],["/aviator/images/Faulkner_14_SketchofWFinflight.jpg","bb8aeba6db82108a988e73f8a9b0dec9"],["/aviator/images/Faulkner_158_RAFtrainingnotes.jpg","bb06c1511912b9e23f589373debcc0db"],["/aviator/images/Faulkner_70_VisioninSpringCover.jpg","e32a7281bd6222c05ed3645a9afa2307"],["/aviator/images/Faulkner_88_LettertoFourSeasPublishing.jpg","26392ca860969edf1b92ca56f8e7865d"],["/aviator/images/Faulkner_Effects_02_HRSS.jpg","08ad6891b58840f03ee3b55d91d1cf2d"],["/aviator/images/Faulkner_Effects_13_HRSS.jpg","ddf58110a5073a576b5984585b3a5b21"],["/aviator/images/Faulkner_Effects_18_HRSS.jpg","b1536e6673e22a495f6eaf7b62aff145"],["/aviator/images/Faulkner_Effects_20_HRSS.jpg","af1bdb3dbd30386c0bc5028e0ff08d9a"],["/aviator/images/Faulkner_P19_Report-Card_Front.jpg","c5020f2424ea4f05fbd77c19215d85db"],["/aviator/images/Faulkner_P25_Ebony.jpg","3346320766336cf9a109834244cedeb3"],["/aviator/images/Faulkner_P3_Brothers.jpg","1e6e8c0dae6d170cbc4bda4c51e45952"],["/aviator/images/banner.png","b8c0a93c4dd33fea15b2802a866d4a0c"],["/aviator/images/faulkner.jpg","48011b0e3776a0f7e3b3b5229e744200"],["/aviator/images/index.html","1405c9a74560e5f141331f274b6e112a"],["/aviator/images/rose-emily-man.jpg","b0eed368b35d34c298fed8890b40ec42"],["/aviator/images/touch/apple-touch-icon.png","e50be088225887939bae821a7623f3a9"],["/aviator/images/touch/chrome-touch-icon-192x192.png","6b6a6b045682185cdf295da4185eef4c"],["/aviator/images/touch/icon-128x128.png","6f3563cca383a457d86ef69490534f85"],["/aviator/images/touch/ms-touch-icon-144x144-precomposed.png","26c476e5d71cb55a5c4ffda22ebcc255"],["/aviator/index.html","7fad82ad2661384d53b907ffbba6e290"],["/aviator/jekyll/update/2016/09/08/welcome-to-faulkner/index.html","3572d15878bafbde4cb1b7b6fba41ca3"],["/aviator/manifest.json","3489bbdf3711e466dc9bc838a718b0c7"],["/aviator/overview/index.html","d8b29956e2441d148de3cd3d2d99545c"],["/aviator/scripts/main.min.js","83353a77cbb99715eb5a038204f01d64"],["/aviator/validate/checklog.js","1ea21d04231b0dee7ae2c1d63a90f4ba"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







