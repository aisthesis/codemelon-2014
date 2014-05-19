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
<p>Consider the following example of prototype chaining:</p>
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

<p>Instances of the class <code>Bat</code> inherit, as expected, the functionality
of superclasses, but this technique also has some downsides:</p>

<ul>
    <li>Confusion can arise because a constructor is indistinguishable from any other function.</li>
    <li>2 steps are required to implement the inheritance.</li>
    <li>There is no way to directly reference superclass methods.</li>
</ul>

<p>Any JavaScript function <em>can</em> in fact be used as a constructor, although the result will certainly be
useless if the function hasn't been built for that purpose. Code becomes easier to read, however,
if you can immediately distinguish between the declaration of a function intended to be
used functionally and a function intended to be used as a constructor.</p>

<p>Secondly, there's no syntax for specifying the inheritance hierarchy when you
declare the constructor for a derived class. You have to make that declaration in
a separate place (lines 13 and 24 above), and the declaration is itself prone to the
error of not using the <code>new</code> operator. It's actually kind of counter-intuitive
that it is not the class "Mammal" but rather <em>one specific instance</em> of that
class that is going to be the prototype for the derived class. But if you leave the <code>new</code>
out, your derived classes won't behave as expected.</p>

<p>Object-oriented programmers coming from Java or C++ would also expect to be
able to call superclass methods, which often need to be modified in subclasses. For example,
we might want to have a <code>Dolphin</code> subclass of <code>Mammal</code> that needs
to come up for air before breathing. So, it would be nice to have some kind of
syntax like:</p>

<pre class="prettyprint linenums lang-js">
function Dolphin() {
    this.breathe = function() {
        console.log("Surfacing");
        super.breathe();
    };
};

Dolphin.prototype = new Mammal();
</pre>

<h3>Customized inheritance</h3>
<p>We can resolve all of these difficulties with a custom implementation
of inheritance.</p>
