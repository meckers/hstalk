define([
    'controller/video',
    'controller/comment-feed-ui',
    'lib/events',
    'underscore',
    'jquery'    
], function(Video, CommentFeedUI, Events, _, $) {

        return {

            comments: [],
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

            updateFeed: function() {
                var time = Video.getTime();
                var comments = this.getCommentsBefore(time);
                CommentFeedUI.renderFeed(comments);                
            },

            addComment: function(comment) {
                this.comments.push(comment);
                CommentFeedUI.appendComment(comment);
            },

            getSortedComments: function() {
                return _.sortBy(this.comments, function(c) { return c.time; })  
            },

            getCommentsBefore: function(time) {
                var sortedComments = this.getSortedComments();
                var resultingComments = _.filter(sortedComments, function(c) {
                    return c.time < time;
                });
                return resultingComments;
            }

        };

});