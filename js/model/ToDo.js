var ToDo = Backbone.Model.extend({
    defaults:{
        date: "date here",
        name: "name here",
        hour:"00",
        minute:"00"
    },

    remove: function() {
        this.destroy();
    }
})
