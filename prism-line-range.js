(function () {
    if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
        return;
    }
    if (!window.fetch) {
        !function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):e.unfetch=n()}(this,function(){function e(e,n){return n=n||{},new Promise(function(t,r){function o(e){for(var n,t,r,s=e.getAllResponseHeaders(),u=[],i=[],f={},c=/^\s*(.*?)\s*\:\s*([\s\S]*?)\s*$/gm;n=c.exec(s);)u.push(r=n[1].toLowerCase()),i.push([r,n[2]]),t=f[r],f[r]=t?t+","+n[2]:n[2];return{type:"cors",ok:e.status/200|!1,status:e.status,statusText:e.statusText,url:e.responseURL,clone:function(){return o(e)},text:function(){return Promise.resolve(e.responseText)},json:function(){return Promise.resolve(e.responseText).then(JSON.parse)},xml:function(){return Promise.resolve(e.responseXML)},blob:function(){return Promise.resolve(e.response)},headers:{keys:function(){return u},entries:function(){return i},get:function(e){return f[e.toLowerCase()]},has:function(e){return e.toLowerCase()in f}}}}var s=new XMLHttpRequest;s.open(n.method||"get",e);for(var u in n.headers)s.setRequestHeader(u,n.headers[u]);s.onload=function(){t(o(s))},s.onerror=function(){r(Error("Network Error"))},s.send(n.body||null)})}return e});
    }
    if (!Array.prototype.filter){
        if(!Array.prototype.filter){Array.prototype.filter=function(i,r){"use strict";if(!((typeof i==="Function"||typeof i==="function")&&this))throw new TypeError;var t=this.length>>>0,e=new Array(t),n=this,f=0,h=-1;if(r===undefined){while(++h!==t){if(h in this){if(i(n[h],h,n)){e[f++]=n[h]}}}}else{while(++h!==t){if(h in this){if(i.call(r,n[h],h,n)){e[f++]=n[h]}}}}e.length=f;return e}}
    }
    function fetchText(url) {
        const response = fetch(url).then(response => {
            return response.text()
        });
        return response
    }
    function init(sourceURL) {
        return fetchText(sourceURL).then(
            x => {
                return [sourceURL, x.split('\n')]
            }
        )
    }
    function splitLines(pre, s) {
        var lineRange = pre.getAttribute("data-range")
        var rawLines = lineRange.split(',')
        var lines = rawLines.filter(x => isNaN(x) === false)
        var startLine = parseInt(lines[0], 10)
        var endLine = lines[1] === undefined ? -1 : parseInt(lines[1], 10)
        var codeRange = s[1].slice(startLine - 1, endLine).join('\n')
        var codeRangeEl = '<code class="line-numbers lang-js">'+codeRange.trim()+'</code>'
        pre.setAttribute('data-start', startLine)
        pre.innerHTML = codeRangeEl
        Prism.highlightAllUnder(pre)
    }
    function lineRange() {
        let tutorialElements = Array.prototype.slice.apply(document.querySelectorAll("pre[data-tutorial]"))
        let fileArray = tutorialElements.map(el => el.getAttribute('data-tutorial'))
        var filteredFileArray = fileArray.filter((el, pos) => {
            return fileArray.indexOf(el) == pos
        })
        filteredFileArray.map(source => init(source).then(s => {
            tutorialElements.map(el => {
                el.getAttribute('data-tutorial') === s[0] ? splitLines(el, s) : null
            })
        }))
    }
    Prism.hooks.add('line-range', function (env) {
        env.plugins = env.plugins || {};
        env.plugins.linerange = true;
    });

    Prism.plugins.linerange = {
        lineRange: lineRange
    }
    lineRange();
    })();