function fetchText(url) {
    const response = fetch(url).then(response => {
        return response.text()
    });
    return response
}
var sources2 = []

function init(sourceURL) {
    return fetchText(sourceURL).then(
        x => {

            return [sourceURL, x.split('\n')]
        }
    )
}

function cb() {
    return console.log("Called back")
}

function isName(sourceFile, match) {
    return sourceFile.name === match;
}

function goTut() {
    let sources = []
    let sources2 = []
    //  Array.prototype.slice.call(document.querySelectorAll("pre[data-tutorial]")).map(x => console.log(x.getAttribute("data-range")))
    document.querySelectorAll("pre[data-tutorial]").forEach((pre) => {
        var self = this;
        var tut = pre.getAttribute("data-tutorial")
        sources.indexOf(tut) === -1 ? sources.push(tut) :
            console.log(this)


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
                Prism.highlightAllUnder(pre, false, cb)
            })
    }))
}

window.onload = function () {
    goTut()
}