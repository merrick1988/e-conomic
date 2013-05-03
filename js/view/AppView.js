var AppView = Backbone.View.extend({
    tagName: "tr",
    el: $("#ToDoListID"),
    newButton:$("#NewEntryButtonID"),

    statsTemplate: _.template($('#counter-template').html()),

    events: {
        "click #NewEntryButtonID":  "showNewToDoModal"
    },
    render: function() {
    },

    initialize: function() {
        Todos.bind('add', this.addOne, this);
        Todos.bind('reset', this.addAll, this);
        Todos.bind('all', this.render, this);
        Todos.fetch();
    },
    showNewToDoModal: function(){
        var newtodo = new NewToDo;
        var newToDoModal = new NewToDoView({model: newtodo});
        $("#NewToDoPlace").append(newToDoModal.render().el);
    },
    addOne: function(todo) {
        var view = new TodoView({model: todo});
        this.$("#ListTableID").append(view.render().el);
    },
    addAll: function() {
        Todos.each(this.addOne);
    }
});

