
var mctrObj = new MCTR();
$(document).ready(function () {
    var rowObject = {};
    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#mctrBUnitsGrid').getRowData(rowid);
        rowObject.GROUP_CD7 = rowData.group_cd7;
        rowObject.BUSINESS_UNIT =  rowData.business_unit;
    };
    var columnNames = ['Group Cd', 'Business Unit','Eff Status','Description'];
    var colModel = [{ key: false, name: 'group_cd7', index: 'group_cd7', width: 110, editable: false, search: true },
        { key: false, name: 'business_unit', index: 'business_unit', width: 110, editable: false },
        { key: false, name: 'eff_status', index: 'eff_status', width: 110, editable: false },
        { key: false, name: 'descr', index: 'descr  ', width: 110, editable: false },
        ];
    mctrObj.CreateJqGrid('mctrBUnitsGrid', '/RoleBu/roleBuopenLOV', 'GET', {}, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn, '', '', '', 'buPager');

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
            $("#stackedModalMsg").show();
            mctrObj.showDialog($("#stackedModalMsg"), " Duplicate records cannot be added!", "error");
        }
        else {
            $("#stackedModalMsg").hide();
            $("#buGrid").jqGrid("setCell", rowID, "GROUP_CD7", rowObject.GROUP_CD7);
            $("#buGrid").jqGrid("setCell", rowID, "BUSINESS_UNIT", rowObject.BUSINESS_UNIT);
            rowObject.BEMS = $('#bems').val();
            editedRows.push(rowObject);
            $('.bootbox').modal('hide');
        }
    });
    mctrObj.searchGrid('mctrBUnitsGrid');
});