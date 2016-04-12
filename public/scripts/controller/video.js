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
                    height: '100%',
                    width: '100%',
                    videoId: 'IMKuVsGhVuU',
                    events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                    }
                });
            },

            // Expose the YT object
            getYT: function() {
                return YT;
            },

            initGlobalYTHandlers: function() {

                window.onYouTubeIframeAPIReady = _.bind(this.initPlayer, this);

                window.onPlayerReady = _.bind(function(event) {
                    Events.trigger('VIDEO_PLAYER_READY', event);
                    event.target.playVideo();
                }, this);

                window.onPlayerStateChange = _.bind(function(event) {
                    console.log('video player state change', event);
                    Events.trigger('VIDEO_STATE_CHANGE', event);
                }, this);
            },

            playVideo: function() {
                this.player.playVideo();
            },

            stopVideo: function() {
                this.player.stopVideo();
            },

            pauseVideo: function() {
                this.player.pauseVideo();
            },

            getTime: function() {
                return this.player.getCurrentTime();
            }

        };

});