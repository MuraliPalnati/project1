$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject = {};
    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#mctrBUnitsGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['BU Grp', 'Group Cd', 'Description', 'Effdt', 'Status'];
    var colModel = [{ key: false, name: 'business_unit', index: 'business_unit', width: 110, editable: false, search: true },
        { key: false, name: 'group_cd7', index: 'group_cd7', width: 110, editable: false },
        { key: false, name: 'descr', index: 'descr  ', width: 110, editable: false },
        { key: false, name: 'effdt', index: 'effdt', classes: 'uppercase', formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd-M-Y' }, width: 125, editable: false },
        { key: false, name: 'eff_status', index: 'eff_status', width: 110, editable: false }];

    mctrObj.CreateJqGrid('mctrBUnitsGrid', '/MctrRptsAdmnBl/getRgBuJSON', 'POST', {}, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#mctrBUnitsGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#okBtn').click(function () {
        $('#BusinessGroup').val(rowObject.group_cd7);
        $('#BusinessUnit').val(rowObject.business_unit);
        $('#mctrModal').modal('hide');
    });

});