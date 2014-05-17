define([
    'jquery',
    'backbone',
    'underscore'
], function(
    $,
    BbRet,
    UsRet) {
    "use strict";
    var RadioGroupView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this,
                'setConstants',
                'getValue'
            );

            this.setConstants(options);
        },

        setConstants: function(options) {
            this.GROUP_NAME = options.groupName;
        },

        getValue: function() {
            return this.$el.find('input[name=' + this.GROUP_NAME + ']:checked').val();
        }
    });

    return RadioGroupView;
});
