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
        mctrLineItem.SETID = $('#' + rowId + '_AFFILIATE_TO').val();
    } else {
        mctrLineItem.SETID = $('#' + rowId + '_HOME_BUGL_TO').val();
    }

    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#ListCecEpToGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['CEC', 'ABC', 'Description'];
    var colModel = [{ key: false, name: 'ESTMTG_PRICG_CD7', index: 'ESTMTG_PRICG_CD7', width: 55, editable: false },
        { key: false, name: 'SETID', index: 'SETID', width: 100, editable: true },
        { key: false, name: 'DESCR', index: 'DESCR  ', width: 100, editable: true },
    ];
    mctrObj.CreateJqGrid('ListCecEpToGrid', '/MctrCreateForm/getRgListCecEpToLOVJson', 'POST', mctrLineItem, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#ListCecEpToGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#ListCecEpToOkBtn').click(function () {

        if (!$.isEmptyObject(rowObject)) {
            $('#' + rowId + '_ESTMTG_PRICG_CD_TO').removeClass().addClass('white');
            $('#' + rowId + '_ESTMTG_PRICG_CD_TO').val(rowObject.ESTMTG_PRICG_CD7);
            $('#' + rowId + '_ESTMTG_PRICG_CD_TO').attr('value',rowObject.ESTMTG_PRICG_CD7);
        }
        else {
            $('#' + rowId + '_ESTMTG_PRICG_CD_TO').val($('#' + rowId + '_ESTMTG_PRICG_CD_TO').attr('value'));
        }
        $('#mctrModal').modal("hide");
    });
    $('#ListCecEpTocancelBtn').click(function () {

        $('#' + rowId + '_ESTMTG_PRICG_CD_TO').val($('#' + rowId + '_ESTMTG_PRICG_CD_TO').attr('value'));

    });
});