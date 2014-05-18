<div class="page-header">
    <h2>Reorganizing JavaScript to use RequireJS <small><?php echo handle_to_date($_GET['id']); ?></small></h2>
</div>

<p>Starting with a fair number of interdependent JavaScript files that I had been loading in
the traditional way by adding all scripts in the proper order at the bottom of each page, I
wanted to reorganize these files using <a href="http://en.wikipedia.org/wiki/Asynchronous_module_definition" target="blank">AMD</a>,
which not only improves performance by allowing asynchronous loading to the extent possible but also 
makes it much easier to keep track of dependencies. I in fact discovered that I had
comments in my old files that declared dependencies that didn't in fact exist and missed dependencies
that did.</p>

<h3>What not to do</h3>
<p>I first tried to set everything up without changing all of my source files but instead just
declaring dependencies in the <code>shim</code> member of the object passed to <code>require.config()</code>
in my <code>main.js</code> file:

<pre class="prettyprint linenums lang-js">
// main.js
require.config({
    // other configuration specifications 
    shim: {
        'backbone': ['underscore', 'jquery'],
        'radioGroupView': ['backbone'],
        // other dependency declarations
    }
});
</pre>

This technique leads to ugliness and missed dependencies. It's ugly because you end up repeating
the same dependencies over and over every time you have a new <code>main.js</code> file. In the
above example, I can avoid having to declare the <code>radioGroupView</code> dependency in the
<code>shim</code> configuration if I wrap that file in a <code>define()</code> block. I had been
trying to avoid wrapping each file in a <code>define()</code> for several reasons:
<ul>
    <li>I didn't want to have to change every single JavaScript file.</li>
    <li>I didn't understand exactly how the <code>define()</code> function works.</li>
    <li>I didn't want my library code to have a dependency on <code>require.js</code>.</li>
</ul>
</p>

<p>What finally prompted me to do it correctly was when a demo of one of my JavaScript libraries failed
in Chrome because a dependency wasn't loading properly. What I eventually discovered is that my massive
<code>shim</code> object was missing a dependency. In the meantime, I had looked more closely
at the recommended way to set up modules so that I had a better understanding of the <code>define()</code>
wrapper. And I noticed that such a pervasive library as <a href="https://github.com/jquery/jquery"
target="blank">jQuery</a> has no problem with the dependency
on RequireJS, which even allows you to build all of your JavaScript into one optimized file. And
once I started reorganizing my code, I realized how much better it is to do it the recommended (right) way.</p>

<p>Since I also use <a href="http://backbonejs.org/" target="blank">Backbone.js</a>, I looked at a
<a href="http://backbonetutorials.com/organizing-backbone-using-modules/" 
target="blank">backbone tutorial</a> on file organization and discovered that I didn't
need to modify my directory structure at all. Here, I won't reiterate what I learned
in various online tutorials, but I would like to point out a few things that I didn't see in the
tutorials.</p>

<h3><code>define()</code> and <code>require()</code></h3>
<p>It makes for a clean structure to enter your JavaScript in 2 steps: First, you have a 
<code>main.js</code> file that gets called from your <code>.html</code> file with a line like:</p>

<pre class="prettyprint linenums lang-html">
&lt;script src="lib/require.js" data-main="scripts/main"&gt;&lt;/script&gt;
</pre>

<p>In <code>main.js</code> you want to do only generic configurations such
as paths to the libaries you're using and to call your executable JavaScript, which
is in a separate file <code>app.js</code>. <code>main.js</code> uses the <code>require()</code>
function as entry point into <code>app.js</code>, and after that all files, including <code>app.js</code>
is wrapped in a <code>define()</code> function. Here are the contents of my <code>main.js</code>:</p>

<pre class="prettyprint linenums lang-js">
require.config({
    baseUrl: '.',

    paths: {
        'jquery': 'lib/jquery.min',
        'bootstrap': 'lib/bootstrap/js/bootstrap.min',
        'underscore': 'lib/underscore.min',
        'backbone': 'lib/backbone.min',
        'prettify': 'lib/google-code-prettify/prettify'
    },

    shim: {
        'backbone': ['underscore', 'jquery']
    }
});

require([
        'scripts/app'
    ], 
    function(App) {
        App.initialize();
    }
); 
</pre>

<p>Note that I still do have a <code>shim</code> field for Backbone. That's because this code is using backbone-1.1.0,
which requires this bridge to work properly. This has been updated in the most recent release of backbone, and I'll
discuss below more about what the problem is as well as some additional consequences.</p>

<p>The <code>require()</code> call here says to load the file <code>scripts/app.js</code>, then call the function passed
to <code>require()</code> using as argument whatever it is that the function passed to <code>define()</code> in <code>app.js</code>
returns. That sounds more complicated than it is. An extremely simple <code>app.js</code> file might look like this:</p>

<pre class="prettyprint linenums lang-js">
define(function() {
    var initialize = function() {
        console.log("Hello World");
    };

    return {
        initialize: initialize
    };
});
</pre>

<p>In that case the value of the <code>App</code> argument in line 20 of <code>main.js</code> is
an object with a member <code>initialize</code>, as returned by the function passed to <code>define()</code>
in <code>app.js</code>. Its initialize field has been set there to be the function defined in lines 2-4.</p>

<p>Let's look at a more realistic version of <code>app.js</code>. Here's one I'm actually using:</p>

<pre class="prettyprint linenums lang-js">
define([
    'scripts/utilities/views/app-view'
], function(
    AppView) {
    var init = function() {
        var appView = new AppView({
            el: '#app'
        });
    };

    return {
        initialize: init
    };
});
</pre>

<p>Here there is actually only one dependency required to interpret the code in the function passed to
<code>define()</code>. So, that's the only dependency I need to declare. When this code executes, interpreter has
to know what the object is that the wrapped function in <code>scripts/utilities/views/app-view.js</code>
returns. That object is what will be called <code>AppView</code> in the scope of this function, and it better
be a constructor given the code here.</p>

<p>The beauty of this setup (in construct to the whole <code>shim</code> construct is that we only need to
declare immediate dependencies here. In fact, the code in <code>app-view.js</code> is dependent on a number of
other libraries, some my own, others imported. But those dependencies only need to be declared in <code>app-view.js</code>
itself. So, one huge advantage of this setup is that you can declare dependencies exactly once, in the file
where they're used, and then you don't have to compose a comprehensive set of dependencies when you
use that file. Each file takes care of its own dependencies.</p>

<p>Here is the relevant portion of <code>app-view.js</code>:</p>

<pre class="prettyprint linenums lang-js">
define([
    'jquery',
    'backbone',
    'underscore',
    'usr/utils',
    'scripts/utilities/views/radio-group-view'
], function(
    $,
    BbRet,
    UsRet,
    Utils,
    RadioGroupView) {
    "use strict";

    var AppView = Backbone.View.extend({
        // code for building view
    });

    return AppView;
});
</pre>

<p>The nested function depends on jQuery, Backbone, Underscore, my own library code (<code>usr/utils</code>),
and another view. And the dependent code will only executed once these dependencies are loaded.</p>

<p>Note, however, the strange names I have given the variables for Backbone (<code>BbRet</code>) and Underscore<code>UsRet</code>.
This is because my code wasn't working when I used the expected names <code>Backbone</code> and </code>_</code>, and
the error message I was getting was that the variables were undefined. The reason is that the versions
I was using didn't provide a return value but instead just created the global variables <code>Backbone</code> and
</code>_</code>. I was thus shadowing the global variable (the file was executing) with a local variable that
had the value <code>undefined</code>. jQuery, by contrast, is set up to return <code>$</code> if used in conjunction
with <code>require.js</code> and to define it globally so that it can also be run without <code>require.js</code>. The latest
version of Backbone seems to do the same thing, but I haven't tried it out and thought that, before doing so,
I would share this information for the benefit of others wondering about the same issue.</p>
