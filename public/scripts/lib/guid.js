define(function() {

    return {

    	guid: function(length) {
    		var id = '';
    		for (var i=0; i<length; i++) {
    			id += this.s4();
    		}
    		return id;
    	},    	

    	s4: function() {
    		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    	}

    };
})