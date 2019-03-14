# Fetch Line Range
## A plugin for [Prism.js](https://prismjs.com) -  [:octocat:](https://github.com/PrismJS/prism)
### Efficiently display a range of line numbers from a fetched source file

# How to use

Include prism-line-range.js in your markup after you call prism.js
```html
<script src="js/prism.js"></script>
<script src="../prism-line-range.min.js"></script>
```
Adding a ```data-fetch``` and ```data-range``` attribute to an empty ```<pre>``` will trigger Fetch Line Numbers. The ```data-fetch``` attribute takes a filepath or valid URL, and the ```data-range``` attribute expects a comma separated value of integers that describe the desired range of lines to display (```1,15```). The markup for some code chunks might look like this:



The first block would display the first 5 lines.
```html
<pre data-fetch="../prism-line-range.js" data-range="1,5" class="language-js line-numbers"></pre>
```
The second block would be lines 6-10
```html 
<pre data-fetch="../prism-line-range.js" data-range="6,10" class="language-js line-numbers"></pre>
```

## Line Numbers plugin support
Fetch Line Range automatically inserts the correct ```data-start``` parameter for use with the Line Numbers plugin. This way, the line numbers displayed will correspond correctly with the code file that was fetched. you can override this functionality by setting the ```data-start``` attribute on your ```<pre>``` element manually, and Fetch Line Range will use it instead of injecting a value.

## Caveats
**Whitespace Normalization**: If you are using the Whitespace Normalization plugin with Prism, *leading* and *trailing* empty lines are stripped even if included ```data-range``` attribute. This does not affect the line numbering.

**fetch() and Promise**: Under the hood, Fetch Line Range uses ```fetch()``` and ```Promise``` which are (wtf let's get a move on =) not supported by all browser environments. For these cases there is a minified version with Promises and fetch() polyfilled in the smallest manner I could find. The resulting polyfilled plugin is a whopping 10.8kb, compared to without the polyfills of ~1.6kb.