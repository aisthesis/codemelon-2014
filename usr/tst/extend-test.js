var Person = _c.Base.extend({
    init: function(isDancing) {
        this.dancing = isDancing;
    },
    dance: function() {
        return this.dancing;
    }
});

var Ninja = Person.extend({
    init: function() {
        this._super(true);
    },
    dance: function() {
        return this._super();
    },
    swingSword: function() {
        return true;
    }
});

test( "inheritance test", function() {
    var person = new Person(false);
    ok(!person.dance(), "person isn't dancing");
    var ninja = new Ninja();
    ok(ninja.swingSword(), "sword swinging");
    ok(ninja.dance(), "ninja is dancing");
    ok(person instanceof _c.Base, "person instance of Base");
    ok(person instanceof Person, "person instance of Person");
    ok(ninja instanceof Ninja, "ninja instance of Ninja");
    ok(ninja instanceof Person, "ninja instance of Person");
});
