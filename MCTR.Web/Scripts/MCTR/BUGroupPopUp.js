$(document).ready(function () {
    
    var mctrObj = new MCTR();
    var valObj = new MctrCreateformValidation();
    var rowObject = {};
    var selectRowFn = function (rowid, status, obj) {
        rowObject.GROUP_CD7 = $('#' + rowid).find('td[aria-describedby="mctrBUnitsGrid_group_cd7"]').attr('title');
        rowObject.BUSINESS_UNIT =  $('#' + rowid).find('td[aria-describedby="mctrBUnitsGrid_business_unit"]').attr('title');
    };
    var columnNames = ['BU', 'Group Cd', 'Description', 'Effdt', 'Status'];
    var colModel = [{ key: false, name: 'business_unit', index: 'business_unit', width: 110, editable: false },
        { key: false, name: 'group_cd7', index: 'group_cd7', width: 110, editable: false },
        { key: false, name: 'descr', index: 'descr  ', width: 110, editable: false },
        { key: false, name: 'effdt', index: 'effdt', width: 125, formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/M/Y' },editable: false },
        { key: false, name: 'eff_status', index: 'eff_status', width: 110, editable: false }];
    mctrObj.CreateJqGrid('mctrBUnitsGrid', '/RoleBu/roleBuopenLOV', 'GET', {}, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#mctrBUnitsGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#stackedOkBtn').click(function () {

        var rowID = $('#rowId').val();
        $("#buGrid").jqGrid("setCell", rowID, "GROUP_CD7", rowObject.GROUP_CD7);
        $("#buGrid").jqGrid("setCell", rowID, "BUSINESS_UNIT", rowObject.BUSINESS_UNIT);
      
        rowObject.BEMS=$('#bems').val();
        editedRows.push(rowObject);
        $('#stackedModal').modal("hide");

        if ($('#OrigBu').val() == "") {
            mctrObj.showDialog($("#dialog-box"), "a business unit value was not selected from list.", "error");
        }
        else if ($('#OrigBu').val() == $('#OrigBu').attr('value')) {
            mctrObj.showDialog($("#dialog-box"), "the business unit value selected from list ('" + $('#OrigBu').attr('value') + "') was same as prior selected value ('" + $('#OrigBu').val() + "').", "error");
        }
    })

    $('#stackedModal').on('hidden.bs.modal',  function () {
        $(this).removeData('bs.modal');
    });

});