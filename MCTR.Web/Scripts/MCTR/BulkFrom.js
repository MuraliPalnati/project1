$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject = {};

    var rowId = $('#rowId').val();
    var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowId));
    var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowId));
    var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowId));

    var mctrLineItem = $.extend(grid1, grid2, grid3);

    var fiscal_year = parseInt($('#fyear').val().trim());
    var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
    if (py_cy_status == 'PY' || fiscal_year > 2007 && $('#' + rowId + '_AFFILIATE_TO').val() != '') {
        v_setid = $('#' + rowId + '_AFFILIATE_TO').val();
    } else {
        v_setid = $('#' + rowId + '_HOME_BUGL_TO').val();
    }

    mctrLineItem.SETID = v_setid;
    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#BulkFromGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['Bulk_Alctn_Cd7', 'Proj_Trans_Type', 'Descr'];
    var colModel = [
        { key: false, name: 'BULK_ALCTN_CD7', index: 'BULK_ALCTN_CD7', width: 160, editable: true, search: true },
        { key: false, name: 'PROJ_TRANS_TYPE', index: 'PROJ_TRANS_TYPE', width: 200, editable: true },
        { key: false, name: 'DESCR', index: 'DESCR', width: 200, editable: true }
    ];
    mctrObj.CreateJqGrid('BulkFromGrid', '/MctrCreateForm/getRgBulkFromLOVJson', 'POST', mctrLineItem, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#BulkFromGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#BulkFromOkBtn').click(function () {
        if (!$.isEmptyObject(rowObject)) {
            $('#' + rowId + '_BULK_FROM').val(rowObject.BULK_ALCTN_CD7);
            $('#' + rowId + '_BULK_FROM').attr('value', rowObject.BULK_ALCTN_CD7);
        }
        else {
            mctrObj.showDialog($("#dialog-box"), "a bulk allocation value was not selected from list.", "error");
        }
        $('.bootbox').modal('hide');
    })
});