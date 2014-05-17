/**
 * utils.js
 * Loads the complete utils module
 *
 * Copyright (c) 2014 Marshall Farrier
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Author Marshall Farrier
 * Since 2014-05-17
 */

define([
    'usr/utils/arrays',
    'usr/utils/exceptions',
    'usr/utils/linked-list',
    'usr/utils/memoize',
    'usr/utils/seq-exec',
    'usr/utils/shuffle'
], function(
    Arrays,
    Exceptions,
    LinkedList,
    Memoize,
    SeqExec,
    Shuffle) {
    "use strict";
    var Utils = {};

    Utils.Arrays = Arrays;
    Utils.Exceptions = Exceptions;
    Utils.LinkedList = LinkedList;
    Utils.Memoize = Memoize;
    Utils.SeqExec = SeqExec;
    Utils.Shuffle = Shuffle;

    return Utils;
});
