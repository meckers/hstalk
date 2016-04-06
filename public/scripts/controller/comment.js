define([
    'lib/events',
    'underscore',
    'jquery'
], function(Events, _, $) {

        return {

            comments: [],

            init: function() {
                this.listen();
            },

            listen: function() {                
                $('#comment-button').click(_.bind(this.pauseAndComment, this));
            },

            pauseAndComment: function() {
                console.log('pause and comment!');
                Events.trigger('PAUSE_AND_COMMENT');
                this.createForm();
            },

            createForm: function() {
                var input = $('<input></input>');
                input.attr('type', 'text');
                input.attr('id', 'comment-text');
                input.css({
                    'width': '300px'
                });
                $('#comment-area').append(input);
                var button = $('<input></input>');                
                button.attr('type', 'button');
                button.attr('value', 'comment');
                button.click(_.bind(this.doComment, this));
                $('#comment-area').append(button);
                input.focus();
            },

            doComment: function() {
                var comment = {
                    text: $('#comment-text').value
                }

                this.comments.push(comment);
            }

        };

});