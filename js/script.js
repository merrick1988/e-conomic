$(function () {

    //Init variables
    var inEdit = null,
        canSave = true,
     dataTargetsIds = ["EntryDateID", "EntryID", "EntryTypeID",
            "TextID", "AmountID", "AccountNameID","AccountNoID", "ContraAccountID",
            "CurrencyID"];

    //Init
    //----  Get Items from storage ---///
    if (typeof(localStorage) == 'undefined' ) {
        $(".container").append('<span>Your browser does not support HTML5 localStorage. Try upgrading or use another browser.</span>');
    } else {
        for(var i = 0; i < localStorage.length; i++){
            AddNewEntry(JSON.parse(localStorage.getItem(i)), i);
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
        if(canSave){
            SaveNewEntry();
            ClearNewEntryForm();
            $("#NewEntryModalID").modal('hide');
        }
    })
    $("#cancelNewEntry").click(function () {
        ClearNewEntryForm();
        $("#NewEntryModalID").modal('hide');
    })
    $("#AccountNoID+.add-on").on("click",function(){
        $("#AccountsChartModalID").data("target", "#AccountNoID")
        $("#AccountsChartModalID").show("slow");
    })
    $("#ContraAccountID+.add-on").on("click",function(){
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
    $("#EntryDateID").on("change", function(){
        if(!isValidDate($(this).val(), true)){
            canSave = false;
            $(".error-message").html("Date is not valid")
        } else{
            canSave = true;
            $(".error-message").html("")
        }
    })

    /**
     * @private
     * @method isValidDate
     * @description
     */
    function isValidDate(str, daysFirst){
        var re = /^(\d{1,2})[\s\.\/-](\d{1,2})[\s\.\/-](\d{4})$/
        if (!re.test(str)) return false;
        var result = str.match(re);
        var m = parseInt(result[1],10);
        var d = parseInt(result[2],10);
        if (daysFirst) {
            //if dd/mm/yyyy
            d = parseInt(result[1],10);
            m = parseInt(result[2],10);
        }
        var y = parseInt(result[3],10);
        if (m < 1 || m > 12 || y < 1900 || y > 2100) return false;
        if (m == 2){
            var days = ((y % 4) == 0) ? 29 : 28;
        } else if(m == 4 || m == 6 || m == 9 || m == 11){
            var days = 30;
        } else{
            var days = 31;
        }
        return (d >= 1 && d <= days);
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
          if(localStorage.length){
              $("#EntriesCountID span").text(localStorage.length);
              $("#EntriesCountID").show()
          }else{
              $("#EntriesCountID").hide()
          }
    }
    /**
     * @private
     * @method removeEntry
     * @description remove existing entry from the page and from the storage
     */
    function removeEntry(target){
        var number =  $(target).parent().data("id");
        console.log(number)
        // remove from storage
        for(var i = number; i < localStorage.length; i++){
            localStorage.setItem(i, localStorage.getItem(i+1));
        }
        localStorage.removeItem(localStorage.length -1 );
        //remove event
        $(target).off("click", function(){
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
        inEdit = $(target).parent().data("id");
        var localData = JSON.parse(localStorage.getItem(inEdit));

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
        var jsonForStore = {}, tr;
        dataTargetsIds.forEach(function (el, index) {
            jsonForStore[el] = $("#newEntry #" + el).val();
        })
        if(inEdit !== null){
            tr = $("#ListTableID").find("tr[data-id='"+inEdit+"']");

            for (key in jsonForStore) {
                tr.find("td[data-target='" + key + "']").html(jsonForStore[key]);
            }
            localStorage.setItem(inEdit, JSON.stringify(jsonForStore))
            inEdit = null;

        } else{
            AddNewEntry(jsonForStore, localStorage.length)
            localStorage.setItem(localStorage.length, JSON.stringify(jsonForStore))
            updateEntriesCount();
        }
    }
    /**
     * @private
     * @method AddNewEntry
     * @description
     */
    function AddNewEntry(data, index){
        var list = $("#ListTableID"), removeButton, editButton;

            list.append("<tr data-id='"+index+"'>");
            removeButton = $("<td class='icon-remove'>").on("click", function(){
                removeEntry(this);
            });
            editButton = $("<td class='icon-pencil'>").on("click", function(){
                editEntry(this);
            })
            for (key in data) {
                list.find("tr").last().append("<td data-target='" + key + "'>" + data[key] + "</td>");
            }
            list.find("tr").last().append(removeButton).append(editButton);
            updateEntriesCount();
        }
});