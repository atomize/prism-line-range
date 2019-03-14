(function () {
    if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
        return;
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
        var codeRangeEl = '<code class="line-numbers lang-js">' + codeRange.trim() + '</code>'
        !pre.getAttribute("data-start") ? pre.setAttribute('data-start', startLine) : null
        pre.innerHTML = codeRangeEl
        Prism.highlightAllUnder(pre)
    }

    function lineRange() {
        var tutorialElements = Array.prototype.slice.apply(document.querySelectorAll("pre[data-fetch]"))
        var fileArray = tutorialElements.map(el => el.getAttribute('data-fetch'))
        var filteredFileArray = fileArray.filter((el, pos) => {
            return fileArray.indexOf(el) == pos
        })
        filteredFileArray.map(source => init(source).then(s => {
            tutorialElements.map(el => {
                el.getAttribute('data-fetch') === s[0] ? splitLines(el, s) : null
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
    if (document.readyState === "loading") { // Loading hasn't finished yet
        document.addEventListener("DOMContentLoaded", lineRange);
    } else { // `DOMContentLoaded` has already fired
        lineRange();
    }
})();