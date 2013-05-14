var NewToDo = Backbone.Model.extend({
    defaults:{
        date: moment().format("DD-MM-YYYY"),
        nameInput: "Name here",
        hour: moment().format("HH"),
        minute: moment().format("MM")
    },
    remove: function() {
        this.destroy();
    },
    validate: function(attr) {
        $(".error-message").html("");
        if(moment(attr.date, "DD-MM-YYYY").isValid()){
            $(".error-message .date-error").remove();
            $("#EntryDateID").removeClass("validation-error");
        } else{
            $("#EntryDateID").addClass("validation-error");
            $(".error-message").append("<span class='date-error'>Date is not valid</span>");
            return false;
        }
    }
})
