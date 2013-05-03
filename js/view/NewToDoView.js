var NewToDoView = Backbone.View.extend({
    tagName:  "div",
    id: "NewEntryModalID",
    className: "modal hide fade",
    template: _.template($('#NewToDoTmpl').html()),

    events: {
        "click #CancelNewEntry"   : "remove",
        "click #SaveNewEntry" : "save"
    },

    initialize: function() {
        this.model.bind('change', this.render, this);

    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        $(this.el).modal('show');
        this.$("#EntryDateID").val(moment().format("DD-MM-YYYY"));
        this.$('#EntryDateID').datepicker();
        this.$("#EntryDateID").mask("99-99-9999");
        return this;
    },
    remove:  function(){
        this.$el.modal('hide');
        this.destroy();
    },
    save: function(){
        Todos.create({titles: {"date": this.$('#EntryDateID').val(), "name": this.$('#NameID').val()}});
        this.$el.modal('hide');
    }
})
