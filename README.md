# Fetch Line Range
### Efficiently display a range of line numbers from a fetch source file

# How to use

Include prism-line-range.js in your markup after you call prism.js
```
<script src="js/prism.js"></script>
<script src="../prism-line-range.min.js"></script>
```
Adding a ```data-fetch``` and ```data-range``` attribute to an empty ```<pre>``` will trigger Fetch Line Numbers. The ```data-fetch``` attribute takes a filepath or valid URL, and the ```data-range``` attribute expects a comma separated value of integers that describe the desired range of lines to display (```1,15```). The markup for some code chunks might look like this:



The first block would display the first 5 lines.
```
<pre data-fetch="../prism-line-range.js" data-range="1,5" class="language-js line-numbers"></pre>
```
The second block would be lines 6-10
```
<pre data-fetch="../prism-line-range.js" data-range="6,10" class="language-js line-numbers"></pre>
```

## Line Numbers plugin support
Fetch Line Range automatically inserts the correct ```data-start``` parameter for use with the Line Numbers plugin. This way, the line numbers displayed will correspond correctly with the code file that was fetched. you can override this functionality by setting the ```data-start``` attribute on your ```<pre>``` element manually, and Fetch Line Range will use it instead of injecting a value.