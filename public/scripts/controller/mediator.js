define([
    'lib/events'
], function(Events) {

        return {

            init: function() {
                this.listen();
            },

            listen: function() {
                Events.register('SAMPLE_EVENT', this, _.bind(this.handleSampleEvent, this));
            },

            handleSampleEvent: function(info) {
                console.log('handling something', info);
            }

        };

});