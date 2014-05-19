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
error of forgetting the <code>new</code> operator <em>when you create a subclass</em>. It's actually kind of counter-intuitive
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
<p>We can resolve these difficulties with a custom implementation
of inheritance:</p>

<pre class="prettyprint linenums lang-js">
var Extend = {},
    initializing = false;

// generic base class
Extend.Base = function() {};

Extend.Base.extend = function extend(properties) {
    var _super = this.prototype,
        proto,
        name;

    initializing = true;
    proto = new this();
    initializing = false;

    // leaving out check for presence of "_super" string
    for (name in properties) {
        proto[name] = typeof properties[name] === "function" &&
            typeof _super[name] === "function" ? (function (name, fn) {
                var retFn = function () {
                    var tmp = this._super,
                        ret;

                    this._super = _super[name];
                    ret = fn.apply(this, arguments);
                    this._super = tmp;
                    return ret;
                };
                return retFn;
            })(name, properties[name]) : properties[name];
    }

    function Class() {
        if (!initializing && this.init) {
            this.init.apply(this, arguments);
        }
    }

    Class.prototype = proto;
    Class.constructor = Class;
    Class.extend = extend;
    return Class;
};
</pre>

<p>The code is very similar to what John Resig proposes in <a href="http://www.manning.com/resig/"
target="blank">Secrets of the JavaScript Ninja</a>, pp. 145f., but with 3 improvements:</p>
<ul>
    <li>Rather than modifying JavaScript's native <code>Object</code>, 
    this technique creates a separate <code>Extend</code> object with the desired functionality.</li>
    <li>Resig's use of <code>arguments.callee</code> is eliminated as this feature is 
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/arguments/callee"
    target="blank">deprecated
    in strict mode</a> in the 5th edition of ECMAScript (ES5).</li>
    <li>The check for function serialization, which is supported in all modern browsers, is
    removed. The check is expensive, and, although Resig says function serialization isn't supported universally, I have been
    unable to find any browser where it <em>isn't</em> supported (IE6 and mobile appear to support this feature). More details 
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString#Browser_compatibility"
    target="blank">here</a>.</li>
</ul>

<p>The above code, wrapped in such a way that it can be run with or without <code>require.js</code>, then allows the following
inheritance hierarchy:</p>

<pre class="prettyprint linenums lang-js">
var Animal = Extend.Base.extend({
    breathe: function() {
        console.log('Breathing');
    }
});

var Mammal = Animal.extend({
    run: function() {
        console.log('Running');
    }
});

var Dolphin = Mammal.extend({
    breathe: function() {
        console.log('Surfacing');
        this._super();
    },

    run: function() {
        console.log("Can't run");
    }
});

var flipper = new Dolphin();

flipper.breathe(); // output: Surfacing\ Breathing
flipper.run();  // output: Can't run
if (flipper instanceof Dolphin) { console.log('Dolphin'); } // ouput: Dolphin
if (flipper instanceof Mammal) { console.log('Mammal'); } // ouput: Mammal
if (flipper instanceof Animal) { console.log('Animal'); } // ouput: Animal
</pre>

<p>And that's the behavior we're looking for!</p>

<p>The complete <a href="usr/extend.js" target="blank">extend.js</a> code can be used without modification
and with no dependencies either as a <code>require.js</code> module or as a standalone.</p>
