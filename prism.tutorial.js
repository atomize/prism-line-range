(function () {

    if (typeof self === 'undefined' || !self.Prism || !self.document) {
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

    function goTut() {
        let sources = []
        document.querySelectorAll("pre[data-tutorial]").forEach(function (pre) {
            var tut = pre.getAttribute("data-tutorial")
            sources.indexOf(tut) < 0 ? sources.push(tut) : null
        })

        Array.prototype.slice.call(sources).map(source => init(source).then(s => {
            document.querySelectorAll('[data-tutorial*="' + s[0] + '"]')
                .forEach(function (pre) {
                    var lineRange = pre.getAttribute("data-range")
                    var lines = lineRange.split(',')
                    lines = lines.filter(x => isNaN(x) === false)
                    var startLine = parseInt(lines[0], 10)
                    var endLine = lines[1] === undefined ? -1 : parseInt(lines[1], 10)
                    var codeRange = s[1].slice(startLine - 1, endLine).join('\n')
                    var codeRangeEl = `<code class="line-numbers">${codeRange.trim()}</code>`
                    pre.setAttribute('data-start', (parseInt(lines[0], 10)))
                    pre.innerHTML = codeRangeEl
                    Prism.highlightAllUnder(pre)
                })
        }))
    }

    window.onload = function () {
        goTut()
    }


}());