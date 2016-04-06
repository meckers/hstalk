define([
    'controller/mediator',
    'controller/youtube',
    'controller/video',
    'lib/events'
],
    function(Mediator, YouTube, Video, Events) {

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
                YouTube.init();
            }

        };

    });