define([
    'controller/mediator',
    'controller/video',
    'controller/comment',
    'controller/comment-feed',
    'lib/events'
],
    function(Mediator, Video, Comment, CommentFeed, Events) {

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
                Comment.init();
            }

        };

    });