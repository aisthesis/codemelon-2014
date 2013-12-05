<div class="page-header">
    <h2>Object-oriented JavaScript <small>2013-12-03</small></h2>
</div>
<p>There are 3 viable design patterns for writing object-oriented JavaScript. Two
of these patterns make use only of features already built into JavaScript, while the
third provides some useful features by adding additional library code, such as
<a href="https://code.google.com/p/base2/" target="blank">base2</a>. I've
been using a very similar, but far more lightweight piece of code 
(only 40 lines of code and 2kb unminified) that improves
on the snippet that John Resig presents in his recent book <a href="http://www.manning.com/resig/"
target="blank">Secrets of the JavaScript Ninja</a>. I'll briefly talk about the first
2 patterns before discussing my version of "roll your own" JavaScript inheritance.</p>

<h3>The simplest approach: Instance properties</h3>
<p>
<pre class="prettyprint linenums lang-js">
function Melon() {
    this.ripen = function() {
        console.log('Juicy!');
    };
};
</pre>
</p>

<h3>The standard approach: Prototype properties</h3>
<h3>A better approach</h3>
