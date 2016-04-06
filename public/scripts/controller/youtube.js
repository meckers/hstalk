define([
    'lib/events',
    'underscore'
], function(Events, _) {

        return {

            player: null,
            done: false,

            init: function() {
                this.listen();
                this.loadAPI();
            },

            listen: function() {
                this.initGlobalYTHandlers();
            },

            loadAPI: function() {
                // 2. This code loads the IFrame Player API code asynchronously.
                var tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);                
            },

            initPlayer: function() {
                this.player = new YT.Player('player', {
                    height: '390',
                    width: '640',
                    videoId: 'M7lc1UVf-VE',
                    events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                    }
                });
            },

            initGlobalYTHandlers: function() {

                window.onYouTubeIframeAPIReady = this.initPlayer;

                window.onPlayerReady = _.bind(function(event) {
                    Events.trigger('VIDEO_PLAYER_READY', event);
                }, this);

                window.onPlayerStateChange = _.bind(function(event) {
                    Events.trigger('VIDEO_STATE_CHANGE', event);
                }, this);
            },

            stopVideo: function() {
                this.player.stopVideo();
            }

        };

});