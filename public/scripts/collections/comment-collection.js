define([
    'underscore',
    'jquery'    
], function(_, $) {

        return {

            comments: [],

            init: function() {
            },

            listen: function() {
            },

            addComment: function(comment) {
                this.comments.push(comment);
            },

            getSortedComments: function() {
                return _.sortBy(this.comments, function(c) { return c.time; })  
            },

            getCommentsBefore: function(time) {
                var sortedComments = this.getSortedComments();
                var resultingComments = _.filter(sortedComments, function(c) {
                    return c.time <= time;
                });
                return resultingComments;
            }

        };

});