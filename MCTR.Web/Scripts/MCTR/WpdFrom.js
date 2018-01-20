$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject = {};
    var rowId = $('#rowId').val();
    var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowId));
    var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowId));
    var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowId));

    var mctrLineItem = $.extend(grid1, grid2, grid3);

    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#WpdFromGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['WPD', 'Descr30'];
    var colModel = [
        { key: false, name: 'WPD_ID7', index: 'WPD_ID7', width: 250, editable: true },
        { key: false, name: 'DESCR30', index: 'DESCR30', width: 315, editable: true }
    ];
    mctrObj.CreateJqGrid('WpdFromGrid', '/MctrCreateForm/getRgWpdFromLOVJson', 'POST', mctrLineItem, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#WpdFromGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#WpdFromOkBtn').click(function () {

        if (!$.isEmptyObject(rowObject)) {
            $('#' + rowId + '_WPD_FROM').removeClass().addClass('white');
            $('#' + rowId + '_WPD_FROM').val(rowObject.WPD_ID7);
            $('#' + rowId + '_WPD_FROM').attr('value',rowObject.WPD_ID7);
        }
        else
        {
            $('#' + rowId + '_WPD_FROM').val($('#' + rowId + '_WPD_FROM').attr('value'));
        }
        $('.bootbox').modal('hide');
    });

    $('#WpdFromcancelBtn').click(function () {
        $('#' + rowId + '_WPD_FROM').val($('#' + rowId + '_WPD_FROM').attr('value'));
    });
});