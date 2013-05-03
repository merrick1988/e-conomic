var ToDoList = Backbone.Collection.extend({
    model: ToDo,
    inEdit: null,
    storage: {},
    storageLength: 0,
    localStorage: new Store("ToDo")

})
var Todos = new ToDoList;