define([
    'controller/video',
    'controller/comment-feed',
    'lib/events',
    'underscore',
    'jquery'    
], function(Video, CommentFeed, Events, _, $) {

        return {

            init: function() {
                this.listen();                
            },

            listen: function() {                
                $('#comment-button').click(_.bind(this.pauseAndComment, this));
                $('#add-comment-button').click(_.bind(this.doComment, this));
            },

            pauseAndComment: function() {
                Video.pauseVideo();
                this.showForm();
            },

            showForm: function() {
                $('#comment-area').css('display', 'block');
            },

            hideForm: function(clear) {
                if (clear) {
                    $('#comment-text').val('');
                }
                $('#comment-area').css('display', 'none');  
            },

            doComment: function() {
                var time = Video.getTime();
                var comment = {
                    text: $('#comment-text').val(),
                    time: time
                }
                CommentFeed.addComment(comment);
                this.hideForm(true);        
            }

        };

});