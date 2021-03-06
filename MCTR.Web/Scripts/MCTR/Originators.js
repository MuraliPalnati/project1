$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject = {};

    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#mctrOriginatorsGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['Last_Name', 'First_Name', 'Bems_Id'];
    var colModel = [{ key: false, name: 'LAST_NAME', index: 'LAST_NAME', width: 200, editable: false },
        { key: false, name: 'FIRST_NAME', index: 'FIRST_NAME', width: 200, editable: true },
        { key: false, name: 'BEMS_ID', index: 'BEMS_ID  ', width: 160, editable: true }];
    mctrObj.CreateJqGrid('mctrOriginatorsGrid', '/MctrJrnlByDateRptBl/getRgOrigJson', 'GET', {origBu: $('#bUGLFrom').val()}, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);

    $('#okBtn').click(function () {
        $('#origBEMS').val(rowObject.BEMS_ID);
        $('#origLastName').val(rowObject.LAST_NAME);
        $('#origFirstName').val(rowObject.FIRST_NAME);

        $('#finCntrlBEMS').val('');
        $('#finCntrlLastName').val('');
        $('#finCntrlFirstName').val('');
        $('#mctrModal').modal("hide");
    })
});