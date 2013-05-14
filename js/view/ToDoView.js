var TodoView = Backbone.View.extend({
    tagName:  "tr",
    template: _.template($('#entry-template').html()),
    events: {
        "click .icon-remove"   : "removeEntry",
        "click .icon-pencil" : "editEntry"
    },
    initialize: function() {
        this.model.bind('change', this.render, this);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass('done', this.model.get('done'));
        this.input = this.$('.edit');
        return this;
    },
    removeEntry:  function(){

    },
    editEntry: function(){
        var newtodo = new NewToDo(this.model);
        var newToDoModal = new NewToDoView({model: newtodo});
        $("#NewToDoPlace").append(newToDoModal.render().el);
    }
})