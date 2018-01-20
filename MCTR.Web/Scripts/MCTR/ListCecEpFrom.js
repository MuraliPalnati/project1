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
    if (py_cy_status == 'PY' || fiscal_year > 2007 && $('#' + rowId + '_AFFILIATE_FROM').val() != '') {
        mctrLineItem.SETID = $('#' + rowId + '_AFFILIATE_FROM').val();
    } else {
        mctrLineItem.SETID = $('#' + rowId + '_HOME_BUGL_FROM').val();
    }
    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#ListCecEpFromGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['CEC', 'ABU', 'Effdt', 'Eff_Status', 'Description'];
    var colModel = [{ key: false, name: 'ESTMTG_PRICG_CD7', index: 'ESTMTG_PRICG_CD7', width: 55, editable: false },
        { key: false, name: 'SETID', index: 'SETID', width: 100, editable: true },
        { key: false, name: 'EFFDT', index: 'EFFDT  ', classes: 'uppercase', formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd-M-y' }, width: 100, editable: true },
        { key: false, name: 'EFF_STATUS', index: 'EFF_STATUS', width: 100,  editable: true },
        { key: false, name: 'DESCR', index: 'DESCR', width: 150, editable: true },
   ];
    mctrObj.CreateJqGrid('ListCecEpFromGrid', '/MctrCreateForm/getRgListCecEpFromLOVJson', 'POST', mctrLineItem, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#ListCecEpFromGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#ListCecEpFromOkBtn').click(function () {

        if (!$.isEmptyObject(rowObject)) {
            $('#' + rowId + '_ESTMTG_PRICG_CD_FROM').removeClass().addClass('white');
            $('#' + rowId + '_ESTMTG_PRICG_CD_FROM').val(rowObject.ESTMTG_PRICG_CD7);
            $('#' + rowId + '_ESTMTG_PRICG_CD_FROM').attr('value',rowObject.ESTMTG_PRICG_CD7);
        }
        else {
            $('#' + rowId + '_ESTMTG_PRICG_CD_FROM').val($('#' + rowId + '_ESTMTG_PRICG_CD_FROM').attr('value'));
        }
        $('#mctrModal').modal("hide");

    });

    $('#ListCecEpFromcancelBtn').click(function () {

        $('#' + rowId + '_ESTMTG_PRICG_CD_FROM').val($('#' + rowId + '_ESTMTG_PRICG_CD_FROM').attr('value'));

    });
});