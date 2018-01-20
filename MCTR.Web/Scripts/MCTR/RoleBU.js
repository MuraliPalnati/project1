$(document).ready(function () {
    $('#saveButton').hide();
    var btnFormatter = function (cellvalue, options, rowObject) {
        return '<a row-id="' + options.rowId + '" id=' + options.rowId + '_selectStackedModal class="btn btn-primary btn-xs" >Select Grp / BU</a>';
    }
    $("#mctrModal").draggable({
        handle: ".modal-header"
        });
    var gridComplete = function () {
        $("a[id*=_selectStackedModal]").on('click', function () {
            var rowID = $(this).attr('row-id');
            var succesFn = function (data) {
                if ($('.bootbox').length == 0) {
                    if (data) {
                        var box = bootbox.dialog({
                            title: "Business Unit Groups / Business Units",
                            onEscape: true,
                            message: data
                        });
                        box.modal('show');
                    }
                }
            };
            var errorFn = function (jqXHR, textStatus, errorThrown) {

            };
            mctrObj.ajaxOptions('/RoleBu/GetAllBUs', 'GET', { rowId: rowID }, succesFn, errorFn);
        });
        $('#stackedOkBtn').click(function () {
            $('#saveButton').show();
            var rowID = $('#rowId').val();
            var flag = false;
            var bu = $('#buGrid').getGridParam('data');
            $.each(bu, function (i, obj) {
                if (obj.GROUP_CD7 == rowObject.GROUP_CD7 && obj.BUSINESS_UNIT == rowObject.BUSINESS_UNIT) {
                    flag = true;
                }
            })
            if (flag) {
                $("#modalMsg").show();
                mctrObj.showDialog($("#modalMsg"), " Duplicate records cannot be added!", "error");
                $("#buGrid").jqGrid("setCell", rowID, "GROUP_CD7", rowObject.GROUP_CD7);
                $("#buGrid").jqGrid("setCell", rowID, "BUSINESS_UNIT", rowObject.BUSINESS_UNIT);
            }
            else {
                $("#modalMsg").hide();
                $("#buGrid").jqGrid("setCell", rowID, "GROUP_CD7", rowObject.GROUP_CD7);
                $("#buGrid").jqGrid("setCell", rowID, "BUSINESS_UNIT", rowObject.BUSINESS_UNIT);

            }
            rowObject.BEMS = $('#bems').val();
            editedRows.push(rowObject);
            hideStackedModal();
        })    };
    var mctrObj = new MCTR();
    var columnNames = ['','Group Cd', 'BU','BEMS'];
    var colModel = [{ name: 'GoTo', index: 'GoTo', resizable: false, search: false, align: 'center', width: 200, sortable: false, formatter: btnFormatter },
        { key: false, name: 'GROUP_CD7', index: 'GROUP_CD7', width: 200, editable: false },
 { key: false, name: 'BUSINESS_UNIT', index: 'BUSINESS_UNIT', width: 170, editable: false },
    { key: false, name: 'BEMS', index: 'BEMS', editable: false, hidden: true, editoptions: { defaultValue: $("#bems").val() } }];

    mctrObj.CreateJqGrid('buGrid', '/RoleBu/rolebuonload', 'GET', { BEMS: $("#bems").val() }, columnNames, colModel, false, '', [], 10, '100%', 'desc', false, gridComplete);
    $('#mctrModal').on('hidden.bs.modal', function (e) {
        $('#mctrModal').removeData();
        $(this).find('.modal-content').children().remove();
    })


    $("#addButton").on('click', function () {
        $('#buGrid').addRow("new");
    });

    $("#saveButton").on('click', function () {
        var successFn = function (data) {
            $("#buGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
            if (data != null) {             
                $("#modalMsg").show();
                mctrObj.showDialog($("#modalMsg"), " BU Group added sucessfully!", "success");
            }
            
        };

        var flag = true;
        var bu = $('#buGrid').getGridParam('data');
        var compareValue = '';
        var currentValue = '';
        for (var i = 0; i < bu.length; i++) {
            if (flag) {
                compareValue = bu[i].GROUP_CD7 + bu[i].BUSINESS_UNIT;
                for (var j = 0; j < bu.length; j++) {
                    if (i == j) continue;
                    currentValue = bu[j].GROUP_CD7 + bu[j].BUSINESS_UNIT;
                    if (compareValue == currentValue) {
                        flag = false;
                        break;
                    }
                }
            }
        }

        if (flag) {
            mctrObj.ajaxOptions('/RoleBu/roleBuPostUpdate', 'POST', JSON.stringify({ roleBu: $('#buGrid').getGridParam('data') }), successFn, "json");
        }
        else {
            mctrObj.showDialog($("#modalMsg"), "Unable to INSERT records!", "error");
        }
    });


    $("#deleteButton").on('click', function () {
        var successFn = function (data) {
            $("#buGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
            if (data != null) {
                mctrObj.showDialog($("#modalMsg"), " BU Group deletd sucessfully!", "success");
            }
        };
        var selRowId = jQuery("#buGrid").getGridParam('selrow');
        if (selRowId.search('jqg') != -1) {
            $("#buGrid").delRowData(selRowId);
        }
        else {
            mctrObj.ajaxOptions('/RoleBu/roleBuPostDelete', 'POST', JSON.stringify({ roleBu: jQuery("#buGrid").getRowData(selRowId) }), successFn, "json");
        }
    });

    var SessionBems = $('#SessionBems').val();
    var Bems = $('#bems').val();

    if (SessionBems == Bems) {
        $('#addButton').attr("disabled", true);
        $('#saveButton').attr("disabled", true);
        $('#deleteButton').attr("disabled", true);
        $('#1_selectbtn').attr("disabled", true);

    }

});