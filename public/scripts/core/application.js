define([
    'controller/mediator',
    'controller/video',
    'controller/comment',
    'controller/comment-feed',
    'controller/comment-feed-ui',
    'lib/events'
],
    function(Mediator, Video, Comment, CommentFeed, CommentFeedUI, Events) {

        return {

            init: function() {
                this.startApp();
            },

            /**
             * Initialize the controllers that listens for events
             */
            startApp: function() {
                Mediator.init();
                Video.init();
                CommentFeed.init();
                CommentFeedUI.init();
                Comment.init();
            }

        };

    });