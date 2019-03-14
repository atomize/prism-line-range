(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

(function () {
  if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
    return;
  }

  function fetchText(url) {
    var response = fetch(url).then(function (response) {
      return response.text();
    });
    return response;
  }

  function init(sourceURL) {
    return fetchText(sourceURL).then(function (x) {
      return [sourceURL, x.split('\n')];
    });
  }

  function splitLines(pre, s) {
    var lineRange = pre.getAttribute("data-range");
    var rawLines = lineRange.split(',');
    var lines = rawLines.filter(function (x) {
      return isNaN(x) === false;
    });
    var startLine = parseInt(lines[0], 10);
    var endLine = lines[1] === undefined ? -1 : parseInt(lines[1], 10);
    var codeRange = s[1].slice(startLine - 1, endLine).join('\n');
    var codeRangeEl = '<code class="line-numbers lang-js">' + codeRange.trim() + '</code>';
    pre.setAttribute('data-start', startLine);
    pre.innerHTML = codeRangeEl;
    Prism.highlightAllUnder(pre);
  }

  function lineRange() {
    var tutorialElements = Array.prototype.slice.apply(document.querySelectorAll("pre[data-fetch]"));
    var fileArray = tutorialElements.map(function (el) {
      return el.getAttribute('data-fetch');
    });
    var filteredFileArray = fileArray.filter(function (el, pos) {
      return fileArray.indexOf(el) == pos;
    });
    filteredFileArray.map(function (source) {
      return init(source).then(function (s) {
        tutorialElements.map(function (el) {
          el.getAttribute('data-fetch') === s[0] ? splitLines(el, s) : null;
        });
      });
    });
  }

  Prism.hooks.add('line-range', function (env) {
    env.plugins = env.plugins || {};
    env.plugins.linerange = true;
  });
  Prism.plugins.linerange = {
    lineRange: lineRange
  };
  lineRange();
  
})();

},{}]},{},[1]);
