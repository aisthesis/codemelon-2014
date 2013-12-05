/**
 * Dependencies:
 * extend.js
 */
var _c = _c || {};

(function(_c) {
    'use strict';

    /**
     * Traditional constructor allows us to hide _pointer as 
     * private member
     */
    function _Iterator(list) {
        var _pointer = list.head;

        this.next = function() {
            if (_pointer === null) {
                throw new _c.error.NoSuchElementException('No more elements to traverse');
            }
            var item = _pointer.item;

            _pointer = _pointer.next;
            return item;
        };

        this.hasNext = function() {
            return _pointer !== null;
        }
    };

    _c.error = _c.error || {};
    if (!_c.error.NoSuchElementException) {
        _c.error.NoSuchElementException = function(message) {
            this.message = message;
        };
        _c.error.NoSuchElementException.prototype = new Error();
    }

    _c.utils = _c.utils || {};

    _c.utils.LinkedList = _c.Base.extend({
        init: function() {
            this.head = this.tail = null;
            this.length = 0;
        },

        /**
         * Appends the specified item to the end of the list
         */
        push: function(item) {
            insert(this, item, function(context, node) {
                context.tail.next = node;
                node.prev = context.tail;
                context.tail = node;
            });
        },

        /**
         * Inserts the specified item at the front of the list
         */
        add: function(item) {
            insert(this, item, function(context, node) {
                node.next = context.head;
                context.head.prev = node;
                context.head = node;
            });
        },

        /**
         * Removes and returns the first element of this list
         * @throws {NoSuchElementException} If the list is empty 
         */
        remove: function() {
            return extract(this, function(context) {
                var result = context.head.item;

                context.head = context.head.next;
                if (context.head !== null) context.head.prev = null;
                else context.tail = null;
                return result;
            });
        },

        /**
         * Removes and returns the last element of this list
         * @throws {NoSuchElementException} If the list is empty 
         */
        pop: function() {
            return extract(this, function(context) {
                var result = context.tail.item;

                context.tail = context.tail.prev;
                if (context.tail !== null) context.tail.next = null;
                else context.head = null;
                return result;
            });
        },

        iterator: function() {
            return new _Iterator(this);
        },

        /**
         * @callback Operation to be performed successively on each item in the list
         * @param item - item on which callback operates.
         */
        forEach: function(callback) {
            var node = this.head;

            while (node !== null) {
                callback(node.item);
                node = node.next;
            }
        }
    });

    /**
     * Generic function that can be used in both add() and push().
     * callback is used to determine what happens when the list isn't
     * empty.
     * @param {Object} context - calling object ('this')
     * @param item
     * @param {Function} callback - callback will be applied to 2 parameters:
     */
    /**
     * @callback Operation to be performed when the list isn't empty
     * @param {object} context - context on which the callback acts
     * @param {object} node - node containing an item and pointers to
     * 'next' and 'prev' nodes
     */
    function insert(context, item, callback) {
        var node = {
            item: item,
            next: null,
            prev: null
        };

        if (context.head === null) {
            context.head = context.tail = node;
        }
        else {
            callback(context, node);
        }
        context.length++; 
    };

    function extract(context, callback) {
        var result;

        if (context.head === null) throw new _c.error.NoSuchElementException('List is empty');
        result = callback(context);
        context.length--;
        return result;
    };
})(_c);
