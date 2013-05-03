var ToDo = Backbone.Model.extend({
    defaults:{
        titles:{
            date: "date here",
            name: "name here"
        }
    },

    remove: function() {
        this.destroy();
    }
})
