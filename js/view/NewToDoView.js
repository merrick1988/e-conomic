var NewToDoView = Backbone.View.extend({
    events: {
        "click #CancelNewEntry"   : "remove",
        "click #SaveNewEntry" : "save",
        "click .time_up" : "timeUp",
        "click .time_down" : "timeDown",
        "change #EntryDateID" : "setDate"

    },
    render: function() {
        this.template = _.template(window.NewToDoTmpl.join("\n"));
        this.$el.html(this.template(this.model.toJSON()));

        this.$(".modal").modal('show');

        this.$('#EntryDateID').datepicker();
        this.$("#EntryDateID").mask("99-99-9999");

        return this;
    },
    setDate: function(){
        this.model.set("date", $("#EntryDateID").val())
    },
    timeUp: function(event){
        var _this = this,
            $target = $(event.target).next().find(".numbers_inner_container"),
            dateFormat = $(event.target).next().data("dateFormat"),
            dateShorthand =  $(event.target).next().data("dateShorthand");
        $("<div>").addClass("number").html(moment($target.children(".current").html(), dateShorthand).add(dateFormat, 3).format(dateShorthand)).appendTo($target);
        $target.children(".current").removeClass("current").next().addClass("current");

        $target.children().first().hide("slow");
        _this.model.set("hour", $target.find(".number.current").html());
        setTimeout(function(){
            $target.children().first().remove();
        }, 500)


    },
    timeDown: function(){
        var _this = this,
            $target = $(event.target).prev().find(".numbers_inner_container"),
            dateFormat = $(event.target).prev().data("dateFormat"),
            dateShorthand =  $(event.target).prev().data("dateShorthand");

        $("<div>").addClass("number hide").html(moment($target.children(".current").html(), dateShorthand).add(dateFormat, -3).format(dateShorthand)).prependTo($target).show("slow");
        $target.children(".current").removeClass("current").prev().addClass("current");
        $target.children().last().remove();
        _this.model.set("hour", $target.find(".number.current").html());
    },
    remove:  function(){
        this.$(".modal").modal('hide');
        this.destroy();
    },
    save: function(){
        this.setDate();
        var newToDo = Todos.create();
        newToDo.set({"date": this.$('#EntryDateID').val(),
                      "name": this.$('#NameID').val(),
                      "hour": this.$(".hour .current").html(),
                      "minute": this.$(".minute .current").html()
                    });
        this.$(".modal").modal('hide');
    }
})
