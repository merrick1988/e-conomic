/**
 * @class
 * @namespace ETest
 * @description
 */
var ETest = function(){
    /**
     * @public
     * @property {Array} testArrayIDs
     */
    this.testArrayIDs = [ "EntryID", "TextID", "AmountID", "AccountNoID", "ContraAccountID"];
    /**
     * @public
     * @method Init
     * @description Sets initial state of the object
     */
     this.Init = function () {
         var _this = this;
         this.testForAdd();
     };
    /**
     * @public
     * @method testForInputs
     * @description Sets initial state of the object
     */
    this.testForAdd = function(){
        var _this = this;
        $("#NewEntryModalID").modal('show');
        this.testArrayIDs.forEach(function (el, index) {
            $("#newEntry").find("#"+el).val("125");
        })
        $("#saveNewEntry").trigger("click");

        test( "Add new Entry", function() {
            _this.testArrayIDs.forEach(function (el, index) {
                equal( $("#ListTableID tr").last().find("td[data-target='"+el+"']").html(), "125", el + " adding" );
            })
        });
    };/**
     * @public
     * @method testForInputs
     * @description Sets initial state of the object
     */
    this.testForAccountNoID = function(){
        var _this = this;
        $("#ListTableID tr").last().find(".icon-pencil").trigger("click");
        setTimeout(function(){
           $("#AccountNoID + .add-on").trigger("click");
            setTimeout(function(){
                $("#AccountsChartTableID tr").eq(1).trigger("click");
            }, 1000)
            setTimeout(function(){
                $("#saveNewEntry").trigger("click");
            }, 1000)
        }, 1000)
        setTimeout(function(){
            test( "Add new Entry", function() {
                    equal( $("#ListTableID tr").last().find("td[data-target='AccountNoID']").html(), "1000", AccountNoID + " adding" );
            });
        }, 3000)
    };
    this.testForContraAccountID = function(){
        var _this = this;
        $("#ListTableID tr").last().find(".icon-pencil").trigger("click");
        setTimeout(function(){
            $("#ContraAccountID + .add-on").trigger("click");
            setTimeout(function(){
                $("#AccountsChartTableID tr").eq(2).trigger("click");
            }, 1000)
            setTimeout(function(){
                $("#saveNewEntry").trigger("click");
            }, 1000)
        }, 1000)
        setTimeout(function(){
            test( "Add new Entry", function() {
                equal( $("#ListTableID tr").last().find("td[data-target='ContraAccountID']").html(), "1010", AccountNoID + " adding" );
            });
        }, 3000)
    };
    this.testForRemove = function(){
        var  length = $("#ListTableID tbody tr").length;
        $("#ListTableID tr").last().find(".icon-remove").trigger("click");
        setTimeout(function(){
            test( "Add new Entry", function() {
                equal($("#ListTableID tbody tr").length, length-1,  "remove test" );
            });
        }, 1000)
    }

};
function showTests(){
    $(".test").show();
    window.ETestForm = new ETest();
    ETestForm.Init();
}
