$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject = {};
    var selectRowFn = function (rowid, status, obj) {
        
        rowObject["bu"] = $('#' + rowid).find('td[aria-describedby="mctrbuGlFromGrid_business_unit"]').attr('title');
        rowObject["group"] = $('#' + rowid).find('td[aria-describedby="mctrbuGlFromGrid_group_cd7"]').attr('title');
    };
    var columnNames = ['BU', 'Group', 'Description', 'Effdt', 'Status'];
    var colModel = [{ key: false, name: 'business_unit', index: 'business_unit', width: 110, editable: false, search: true },
        { key: false, name: 'group_cd7', index: 'group_cd7', width: 110, editable: false, search: true },
        { key: false, name: 'descr', index: 'descr  ', width: 110, editable: false, search: true },
        { key: false, name: 'effdt', index: 'effdt', formatter: 'date', classes: 'uppercase', formatoptions: { srcformat: 'd/m/Y', newformat: 'd-M-y' }, width: 125, editable: false, search: true },
        { key: false, name: 'eff_status', index: 'eff_status', width: 110, editable: false, search: true }];

    mctrObj.CreateJqGrid('mctrbuGlFromGrid', '/MctrOpenReportsBl/selectionbutBuWhenButtonPressedOpenJSON', 'GET', {}, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#mctrbuGlFromGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#okBtn').click(function () {
        $("#bUGLFrom").val(rowObject.bu);
        $("#finCntrlBEMS").val("");
        $("#finCntrlFirstName").val("");
        $("#finCntrlLastName").val("");
        $("#fromDate").val("");
        $("#toDate").val("");
        $("#origBEMS").val("");
        $("#origFirstName").val("");
        $("#origLastName").val("");
        $('#mctrModal').modal('hide');

    })
    mctrObj.searchGrid('mctrbuGlFromGrid');

});