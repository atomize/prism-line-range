/*
before-highlightall callback, selector
before - sanity - check element, language, grammar, code
before - highlight element, language, grammar, code
wrap type, content, tag, classes, attributes, language, parent
before - insert element, language, grammar, code, highlightedCode
after - highlight element, language, grammar, code, highlightedCode
complete element, language, grammar, code, highlightedCode
*/



(function () {
    if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
        return;
    }
    Prism.hooks.add('before-insert', function (env) {
        console.log("Before Insert ");
    });
    Prism.hooks.add('complete', function (env) {
        console.log("Complete " + JSON.stringify(env.element.classList));
    });
    Prism.hooks.add('before-sanity-check', function (env) {
        console.log("Before sanity check " + JSON.stringify(env.element.classList));
    });
    Prism.hooks.add('before-highlightall', function (env) {
        console.log("Before HighlightAll " + JSON.stringify(env));
    });
    Prism.hooks.add('before-highlight', function (env) {
        console.log("Before Highlight " + JSON.stringify(env.element));
    });
})();