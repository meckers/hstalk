define([
    'controller/comment-feed',
    'lib/events',
    'underscore',
    'jquery'    
], function(CommentFeed, Events, _, $) {

        return {

            comments: [],
            pollInterval: null,

            init: function() {
                this.listen();
            },

            listen: function() {
            },

            // this could probably be lifted out to a UI class/controller
            appendComment: function(c) {
                var commentEl = this.createCommentElement(c);
                $('#feed-list').append(commentEl);
            },

            // this could probably be lifted out to a UI class/controller
            renderFeed: function(comments) {            
                var feedList = $('#feed-list');
                feedList.empty();
                _.each(comments, _.bind(function(c) { 
                    var commentEl = this.createCommentElement(c);
                    feedList.append(commentEl);
                }, this));
            },

            // this could probably be lifted out to a UI class/controller
            createCommentElement: function(c) {
                var ce = $('<li></li>');
                ce.addClass('comment-line');
                ce.html(c.time + ' | ' + c.text);                
                return ce;
            }

        };

});