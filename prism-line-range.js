(function () {
    if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
        return;
    }
    Prism.hooks.add('complete', function (env) {
        console.log("Hello Prism");
    });


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


    function cb() {
        return console.log("Called back")
    }




    function lineRange() {

        let allEls = Array.prototype.slice.apply(document.querySelectorAll("pre[data-tutorial]"))
        allEls = allEls.map(datatt => datatt.getAttribute('data-tutorial'))
        var filteredEls = allEls.filter((el, pos) => {
            return allEls.indexOf(el) == pos
        })

        filteredEls.map(source => init(source).then(s => {
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
    //goTut()

    Prism.hooks.add('line-range', function (env) {
        env.plugins = env.plugins || {};
        env.plugins.linerange = true;
    });


    Prism.plugins.linerange = {
        lineRange: lineRange
    }
    lineRange();
})();
//goTut()