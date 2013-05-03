var NewToDo = Backbone.Model.extend({
    defaults:{
        dateInput: "date here",
        nameInput: "name here",
        nameLabel: "Name of Event",
        dateLabel: "Date of Event"
    },
    remove: function() {
        this.destroy();
    }
})
