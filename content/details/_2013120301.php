<div class="page-header">
    <h2>Object-oriented JavaScript <small><?php echo handle_to_date($_GET['id']); ?></small></h2>
</div>
<p>There are two viable design patterns for writing object-oriented JavaScript. The first
of these patterns, prototype chaining, is built into the language but has downsides. 
The second approach avoids these downsides by adding additional library code and is exemplified by
<a href="https://code.google.com/p/base2/" target="blank">base2</a>. I've
been using a similar, but far more lightweight piece of code 
(only 40 lines of code and 2kb unminified) that improves
on the snippet that John Resig presents in his recent book <a href="http://www.manning.com/resig/"
target="blank">Secrets of the JavaScript Ninja</a>. I'll briefly talk about the first
pattern before discussing my version of "roll your own" JavaScript inheritance.</p>

<h3>Inheritance through prototype chaining</h3>
<p>Consider the following example:</p>
<pre class="prettyprint linenums lang-js">
function Animal() {
    this.breathe = function() {
        console.log('Breathing');
    };
};

function Mammal() {
    this.run = function() {
        console.log('Running');
    };
};

Mammal.prototype = new Animal();

function Bat() {
    this.fly = function() {
        console.log('Flying');
    };
    this.run = function() {
        console.log('cannot run');
    };
};

Bat.prototype = new Mammal();

var bat = new Bat();
bat.breathe(); // output: Breathing
bat.run(); // output: cannot run
bat.fly(); // output: Flying
if (bat instanceof Bat) console.log('Bat'); // output: Bat 
if (bat instanceof Mammal) console.log('Mammal');  // output: Mammal
if (bat instanceof Animal) console.log('Animal');  // output: Animal
</pre>
<p>Comments</p>
<h4>Limitations</h4>
<p><strong>Doesn't allow reference to superclass method.</strong></p>
<p><strong>Can lead to errors</strong></p>
<h3>Customized inheritance</h3>
