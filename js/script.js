require(["js/template/newToDoTmpl", "js/model/ToDo", "js/model/NewToDo", "js/collection/ToDoList", "js/view/TodoView", "js/view/NewToDoView", "js/view/AppView"], function() {
    $(function() {
        var App = new AppView;
    });
});


//$(function () {
//    //Init variables
//    var inEdit = null,
//        storage = {},
//        storageLength = 0,
//        dataTargetsIds = ["EntryDateID", "NameID", "EntryTypeID",
//            "TextID", "AmountID", "AccountNoID", "ContraAccountID",
//            "CurrencyID"];
//
//    //Init
//    if (typeof(localStorage) == 'undefined' ) {
//        $(".container").append('<span>Your browser does not support HTML5 localStorage. Try upgrading or use another browser.</span>');
//    } else {
//        // Get Items from storage //
//        storage = JSON.parse(localStorage.getItem("test"));
//        storageLength = _.size(storage);
//        storageLength && _.each(storage, function(num, key){AddNewEntry(storage[key])});
//    }
//
//    // Set the all required settings for plugins
//    $("#EntryDateID").val(moment().format("DD-MM-YYYY"));
//    $('#EntryDateID').datepicker();
//    $("#EntryDateID").mask("99-99-9999");
//    $("#AccountNoID").mask("9999");
//    $("#ContraAccountID").mask("9999");
//    $(".chzn-select").chosen();
//
//    //------- Add  events -----//
////    $("#NewEntryButtonID").on("click",function () {
////        $("#NewEntryModalID").modal('show');
////    });
//    $("#saveNewEntry").click(function () {
//        $(".error-message").html("");
//        if(isAmountValid() & isValidDate()){
//            SaveNewEntry();
//            ClearNewEntryForm();
//            $("#NewEntryModalID").modal('hide');
//        }
//    })
//    $("#cancelNewEntry").click(function () {
//        ClearNewEntryForm();
//        $("#NewEntryModalID").modal('hide');
//    })
//
//    $("#AccountNoID + .add-on").on("click",function(){
//        $("#AccountsChartModalID").data("target", "#AccountNoID")
//        $("#AccountsChartModalID").show("slow");
//    })
//    $("#ContraAccountID + .add-on").on("click",function(){
//        $("#AccountsChartModalID").data("target", "#ContraAccountID")
//        $("#AccountsChartModalID").show("slow");
//    })
//    $("#AccountsChartModalID .close").on("click",function(){
//        $("#AccountsChartModalID").hide("slow");
//        return false
//    })
//    $("#AccountsChartModalID tbody tr").on("click",function(){
//        var target = $("#AccountsChartModalID").data("target");
//        $(target).val($(this).find("td").eq(0).html());
//        $("#AccountsChartModalID").hide("slow");
//        return false
//    })
//    $("#AccountsChartModalID tbody tr").on("click",function(){
//        var target = $("#AccountsChartModalID").data("target");
//        $(target + " input").val($(this).find("td").eq(0).html());
//        $("#AccountsChartModalID").hide("slow");
//        return false
//    })
//    $("#EntryDateID").on("change",function(){
//       isValidDate();
//    })
//    $("#AmountID").on("change",function(){
//        isAmountValid();
//    })
//    $(".icon-remove").on("click", function(){
//        removeEntry(this);
//    });
//    $(".icon-pencil").on("click", function(){
//        editEntry(this);
//    })
//
//    /**
//     * @private
//     * @method isValidDate
//     * @description
//     */
//    function isValidDate(){
//        if(moment($("#EntryDateID").val(), "DD-MM-YYYY").isValid()){
//            $(".error-message .date-error").remove();
//            $("#EntryDateID").removeClass("validation-error");
//            return true;
//        } else{
//            $("#EntryDateID").addClass("validation-error");
//            $(".error-message").append("<span class='date-error'>Date is not valid</span>");
//            return false;
//        }
//    };
//
//    /**
//     * @private
//     * @method updateEntriesCount
//     * @description updates the span in the bottom of the page
//     */
//    function updateEntriesCount(){
//          if(storageLength){
//              $("#EntriesCountID span").text(storageLength);
//              $("#EntriesCountID").show();
//          }else{
//              $("#EntriesCountID").hide();
//          }
//    }
//    function isAmountValid(){
//        if($("#AmountID").val()){
//            $(".error-message .amount-error").remove();
//            $("#AmountID").removeClass("validation-error");
//            return true;
//        } else{
//            $("#AmountID").addClass("validation-error");
//            $(".error-message").append("<span class='amount-error'>Amount can't be empty</span>");
//            return false;
//        }
//    }
//    /**
//     * @private
//     * @method removeEntry
//     * @description remove existing entry from the page and from the storage
//     */
//    function removeEntry(target){
//        var number =  $(target).parent()[0].rowIndex - 1;
//
//        // remove from storage
//        for(var i = number; i < storageLength; i++){
//            storage[i] = storage[i+1];
//        }
//        storageLength--;
//        localStorage.setItem("test", JSON.stringify(storage));
//
//        //remove event
//        $(target).off("click", function(){
//            removeEntry(this);
//        })
//        $(target).parent().find(".icon-pencil").off("click", function(){
//            removeEntry(this);
//        })
//        // remove from view
//        $(target).parent().remove()
//
//        updateEntriesCount();
//    }
//    /**
//     * @private
//     * @method editEntry
//     * @description open modal window for editing entry
//     */
//    function editEntry(target){
//
//        inEdit =  $(target).parent()[0].rowIndex - 1;
//
//        _.each(dataTargetsIds, function (element) {
//            $("#"+element).val(storage[inEdit][element]);
//        })
//
//        $("#NewEntryModalID").modal('show');
//    }
//    /**
//     * @private
//     * @method ClearNewEntryForm
//     * @description remove all values from the form
//     */
//    function ClearNewEntryForm(){
//        _.each(dataTargetsIds, function (element) {
//            $("#"+element).not(".no-need-clear").val("");
//        })
//    }
//    /**
//     * @private
//     * @method SaveNewEntry
//     * @description
//     */
//    function SaveNewEntry() {
//        var jsonForStorage = {}, tr;
//
//        _.each(dataTargetsIds, function (element) {
//            jsonForStorage[element] = $("#" + element).val();
//        })
//
//        if(inEdit !== null){
//
//            tr = $("#ListTableID tr").eq(inEdit+1);
//
//            _.each(jsonForStorage, function(value, key){
//                tr.find("td[data-target='" + key + "']").html(value);
//            })
//
//            storage[inEdit] = (jsonForStorage);
//            inEdit = null;
//
//        } else{
//            storage[storageLength] = jsonForStorage;
//            storageLength++;
//            AddNewEntry(jsonForStorage);
//        }
//        localStorage.setItem("test", JSON.stringify(storage));
//    }
//    /**
//     * @private
//     * @method AddNewEntry
//     * @description
//     */
//    function AddNewEntry(data){
//        $('#entry-template').tmpl(data).appendTo('#ListTableID');
//        updateEntriesCount();
//    }
//});