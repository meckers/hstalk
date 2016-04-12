define([
    'controller/video',
    'collections/comment-collection',
    'lib/events',
    'underscore',
    'jquery'    
], function(Video, CommentCollection, Events, _, $) {

        return {

            pollInterval: null,

            init: function() {
                this.listen();
            },

            listen: function() {
                Events.register('VIDEO_STATE_CHANGE', this, _.bind(this.onVideoStateChange, this));
            },

            onVideoStateChange: function(event) {                
                this.updateFeed();
                if (event.data == YT.PlayerState.PLAYING) {
                    this.startPoll();      
                }                
                else {
                    this.stopPoll();
                }
            },

            startPoll: function() {
                this.pollInterval = window.setInterval(_.bind(this.poll, this), 1000);
            },

            stopPoll: function() {
                window.clearInterval(this.pollInterval);
            },

            poll: function() {                
                this.updateFeed();
            },

            addComment: function(comment) {
                CommentCollection.addComment(comment);
                this.updateFeed();
            },            

            updateFeed: function() {
                var time = Video.getTime();
                var comments = CommentCollection.getCommentsBefore(time);
                this.renderFeed(comments);                
            },

            renderFeed: function(comments) {            
                var feedList = $('#feed-list');
                feedList.empty();
                _.each(comments, _.bind(function(c) { 
                    var commentEl = this.createCommentElement(c);
                    feedList.append(commentEl);
                }, this));
            },

            createCommentElement: function(c) {
                var ce = $('<li></li>');
                ce.addClass('comment-line');
                ce.html(c.time + ' | ' + c.text);                
                return ce;
            }            

        };

});