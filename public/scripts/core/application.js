define([
    'controller/mediator',
    'controller/video',
    'controller/comment',
    'lib/events'
],
    function(Mediator, Video, Comment, Events) {

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
                Comment.init();
            }

        };

    });