define([
    'controller/video',
    'lib/events',
    'underscore',
    'jquery'    
], function(Video, Events, _, $) {

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
                var time = Video.getTime();
                this.renderFeed(time);
            },

            addComment: function(comment) {
                console.log('adding comment', comment);
                this.comments.push(comment);
                this.appendComment(comment);
            },

            getSortedComments: function() {
                return _.sortBy(this.comments, function(c) { return c.time; })  
            },

            getCommentsBefore: function(time) {
                var sortedComments = this.getSortedComments();
                var resultingComments = _.filter(sortedComments, function(c) {
                    return c.time < time;
                });
                console.log('comments before ' + time + ':', resultingComments);
                return resultingComments;
            },

            // this could probably be lifted out to a UI class/controller
            appendComment: function(c) {
                var commentEl = this.createCommentElement(c);
                $('#feed-list').append(commentEl);
            },

            // this could probably be lifted out to a UI class/controller
            renderFeed: function(time) {
                var feedList = $('#feed-list');
                feedList.empty();
                var comments = this.getCommentsBefore(time);
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