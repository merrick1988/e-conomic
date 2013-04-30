$(function () {

    //Init variables
    var inEdit = null,
        canSave = true,
        storage = JSON.parse(localStorage.getItem("test")) || {},
        storageLength =  Object.keys(storage).length || 0,
        dataTargetsIds = ["EntryDateID", "EntryID", "EntryTypeID",
            "TextID", "AmountID", "AccountNameID","AccountNoID", "ContraAccountID",
            "CurrencyID"];

    //Init
    //----  Get Items from storage ---///
    if (typeof(localStorage) == 'undefined' ) {
        $(".container").append('<span>Your browser does not support HTML5 localStorage. Try upgrading or use another browser.</span>');
    } else {
        for(var key in storage){
            AddNewEntry(storage[key]);
        }
    }

    // Set the all required settings for plugins
    $("#EntryDateID").val(getCurrentDate());
    $("#EntryDateID").mask("99-99-9999");
    $("#AccountNoID").mask("9999")
    $("#ContraAccountID").mask("9999")
    $('#EntryDateID').datepicker();
    $(".chzn-select").chosen();

    //------- Add  events -----//
    $("#NewEntryButtonID").on("click",function () {
        $("#NewEntryModalID").modal('show');
    });
    $("#saveNewEntry").click(function () {
        if(validateForm()){
            SaveNewEntry();
            ClearNewEntryForm();
            $("#NewEntryModalID").modal('hide');
        }
    })
    $("#cancelNewEntry").click(function () {
        ClearNewEntryForm();
        $("#NewEntryModalID").modal('hide');
    })

    $("#AccountNoID + .add-on").on("click",function(){
        $("#AccountsChartModalID").data("target", "#AccountNoID")
        $("#AccountsChartModalID").show("slow");
    })
    $("#ContraAccountID + .add-on").on("click",function(){
        $("#AccountsChartModalID").data("target", "#ContraAccountID")
        $("#AccountsChartModalID").show("slow");
    })
    $("#AccountsChartModalID .close").on("click",function(){
        $("#AccountsChartModalID").hide("slow");
        return false
    })
    $("#AccountsChartModalID tbody tr").on("click",function(){
        var target = $("#AccountsChartModalID").data("target");
        $(target).val($(this).find("td").eq(0).html());
        $("#AccountsChartModalID").hide("slow");
        return false
    })
    $("#AccountsChartModalID tbody tr").on("click",function(){
        var target = $("#AccountsChartModalID").data("target");
        $(target + " input").val($(this).find("td").eq(0).html());
        $("#AccountsChartModalID").hide("slow");
        return false
    })
    $("#EntryDateID").on("change",function(){
       isValidDate();
    })
    $("#AmountID").on("change",function(){
        isAmountValid();
    })

    /**
     * @private
     * @method isValidDate
     * @description
     */
    function isValidDate(){
        var target = $("#EntryDateID").val(),
            valid = true,
            regExp = /^(\d{1,2})[\s\.\/-](\d{1,2})[\s\.\/-](\d{4})$/ ;

        if (!regExp.test(target)){
            valid  = false;
        }

        var result = target.match(regExp),
            d = parseInt(result[1],10),
            m = parseInt(result[2],10),
            y = parseInt(result[3],10);

        if (m < 1 || m > 12 || y < 1900 || y > 2100){
            valid  = false;
        }

        if (m == 2){
            var days = ((y % 4) == 0) ? 29 : 28;
        } else if(m == 4 || m == 6 || m == 9 || m == 11){
            var days = 30;
        } else{
            var days = 31;
        }

        if(!(d >= 1 && d <= days)){
            valid = false}
        ;
        if(valid){
            $(".error-message .date-error").remove();
            $("#EntryDateID").removeClass("validation-error");
        } else{
            $("#EntryDateID").addClass("validation-error");
            $(".error-message").append("<span class='date-error'>Date is not valid</span>");
        }
        return canSave = valid;
    };
    /**
     * @private
     * @method getCurrentDate
     * @description take the current date form install in the form
     */
    function getCurrentDate(){
        var d = new Date(),
            month = d.getMonth()+ 1,
            day = d.getDate(),
            output =  (day<10 ? '0' : '') + day + '-' + (month<10 ? '0' : '') + month + '-' + d.getFullYear();
        return output;
    };
    /**
     * @private
     * @method updateEntriesCount
     * @description updates the span in the bottom of the page
     */
    function updateEntriesCount(){
          if(storageLength){
              $("#EntriesCountID span").text(storageLength);
              $("#EntriesCountID").show()
          }else{
              $("#EntriesCountID").hide();
          }
    }
    function isAmountValid(){
        if($("#AmountID").val()){
            $(".error-message .amount-error").remove();
            $("#AmountID").removeClass("validation-error");
            return true;
        } else{
            $("#AmountID").addClass("validation-error");
            $(".error-message").append("<span class='amount-error'>Amount can't be empty</span>");
            return canSave = false;
        }
    }
    function validateForm(){
        $(".error-message").html("");
        isAmountValid();
        isValidDate();
        return  canSave;
    }
    /**
     * @private
     * @method removeEntry
     * @description remove existing entry from the page and from the storage
     */
    function removeEntry(target){
        var number =  $(target).parent()[0].rowIndex - 1;

        // remove from storage
        for(var i = number; i < storageLength; i++){
            storage[i] = storage[i+1];
        }
        storageLength--;
        localStorage.setItem("test", JSON.stringify(storage));

        //remove event
        $(target).off("click", function(){
            removeEntry(this);
        })
        $(target).parent().find(".icon-pencil").off("click", function(){
            removeEntry(this);
        })
        // remove from view
        $(target).parent().remove()

        updateEntriesCount();
    }
    /**
     * @private
     * @method editEntry
     * @description open modal window for editing entry
     */
    function editEntry(target){
        var  localData = {};

        inEdit =  $(target).parent()[0].rowIndex - 1;
        localData = storage[inEdit];

        $("#NewEntryModalID").modal('show');
        dataTargetsIds.forEach(function (el, index) {
            $("#newEntry").find("#"+el).val(localData[el]);
        })
    }
    /**
     * @private
     * @method ClearNewEntryForm
     * @description remove all values from the form
     */
    function ClearNewEntryForm(){
        dataTargetsIds.forEach(function (el, index) {
            $("#newEntry").find("#"+el).not(".no-need-clear").val("");
        })
    }
    /**
     * @private
     * @method SaveNewEntry
     * @description remove all values from the form
     */
    function SaveNewEntry() {
        var jsonForStorage = {}, tr;

        dataTargetsIds.forEach(function (el, index) {
            jsonForStorage[el] = $("#newEntry #" + el).val();
        })
        if(inEdit !== null){
            tr = $("#ListTableID").find("tr").eq(inEdit+1);

            for (key in jsonForStorage) {
                tr.find("td[data-target='" + key + "']").html(jsonForStorage[key]);
            }
            storage[inEdit] = (jsonForStorage);
            inEdit = null;

        } else{
            storage[storageLength] = jsonForStorage;
            storageLength++;
            AddNewEntry(jsonForStorage, inEdit);
        }
        localStorage.setItem("test", JSON.stringify(storage));
    }
    /**
     * @private
     * @method AddNewEntry
     * @description
     */
    function AddNewEntry(data){
        var $list = $("#ListTableID"), removeButton, editButton;

        $list.append("<tr>");

        removeButton = $("<td class='icon-remove'>").on("click", function(){
            removeEntry(this);
        });

        editButton = $("<td class='icon-pencil'>").on("click", function(){
            editEntry(this);
        })

        for (var key in data) {
            $list.find("tr").last().append("<td data-target='" + key + "'>" + data[key] + "</td>");
        }

        $list.find("tr").last().append(removeButton).append(editButton);

        updateEntriesCount();
    }
});

