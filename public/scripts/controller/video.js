define([
    'lib/events',
    'underscore'
], function(Events, _) {

        return {

            init: function() {
                this.listen();
            },

            listen: function() {
                Events.register('VIDEO_STATE_CHANGE', this, _.bind(this.videoStateChange, this));
                Events.register('VIDEO_PLAYER_READY', this, _.bind(this.videoPlayerReady, this));
            },

            videoPlayerReady: function(event) {
                console.log('video player ready', event);
                event.target.playVideo();
            },

            videoStateChange: function(event) {
                console.log('video state change', event);
            }

        };

});