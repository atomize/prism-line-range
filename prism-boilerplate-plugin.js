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
    Prism.hooks.add('before-highlightall', function (env) {
        console.log(env.selector);
    });
    Prism.hooks.add('before-sanity-check', function (env) {
        console.log(env.element);
    });
    Prism.hooks.add('before-highlight', function (env) {
        console.log(env.element);
    });
    /* Prism.hooks.add('wrap', function (env) {
        console.log("Wrap ");
    }); */
    Prism.hooks.add('before-insert', function (env) {
        console.log(env.element);
    });
    Prism.hooks.add('after-highlight', function (env) {
        console.log("After Highlight ");
    });
    Prism.hooks.add('complete', function (env) {
        console.log("Complete " + JSON.stringify(env.element.classList));
    });


})();