define([
    'controller/video',
    'controller/comment-feed',
    'lib/events',
    'lib/guid',
    'underscore',
    'jquery'    
], function(Video, CommentFeed, Events, Guid, _, $) {

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
                $('#comment-fields').css('display', 'block');
            },

            hideForm: function(clear) {
                if (clear) {
                    $('#comment-text').val('');
                }
                $('#comment-fields').css('display', 'none');  
            },

            doComment: function() {
                var time = Video.getTime();
                var comment = {
                    id: Guid.guid(3),
                    text: $('#comment-text').val(),
                    time: time
                }
                CommentFeed.addComment(comment);
                this.hideForm(true);        
            }

        };

});