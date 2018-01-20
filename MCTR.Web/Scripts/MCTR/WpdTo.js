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
    if (py_cy_status == 'PY' || fiscal_year > 2007 && $('#' + rowId + '_AFFILIATE_TO').val() != '')
    {
        v_setid = $('#' + rowId + '_AFFILIATE_TO').val();
    } else
    {
        v_setid = $('#' + rowId + '_HOME_BUGL_TO').val();
    }

    mctrLineItem.SETID = v_setid;
    mctrLineItem.FYEAR = fiscal_year;


    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#WpdToGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['WPD', 'Loc', 'Dept', 'Description', 'Eff Dt'];
    var colModel = [
        { key: false, name: 'WPD_ID7', index: 'WPD_ID7', width: 100, editable: true, search: true },
        { key: false, name: 'ACCTG_LOC_CD7', index: 'ACCTG_LOC_CD7', width: 100, editable: true },
        { key: false, name: 'DEPTID', index: 'DEPTID', width: 100, editable: true },
        { key: false, name: 'DESCR30', index: 'DESCR30', width: 150, editable: true },
        { key: false, name: 'EFFDT', index: 'EFFDT', width: 115, editable: true,stype: 'text',classes:'uppercase', formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd-M-y' } }
    ];
    mctrObj.CreateJqGrid('WpdToGrid', '/MctrCreateForm/getRgWpdToJSON','POST',mctrLineItem,columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#WpdToGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#WpdToOkBtn').click(function () {
        // $('#tblJQGridCover').setRowData($('#activeProgFrom').val(), rowObject);
        //$('#mctrModal').modal("hide");

        if (!$.isEmptyObject(rowObject)) {
            $('#' + rowId + '_WPD_TO').val(rowObject.WPD_ID7);
            $('#' + rowId + '_WPD_TO').attr('value',rowObject.WPD_ID7);
            $('#' + rowId + '_WPD_TO').removeClass();

        }
        else {
            mctrObj.showDialog($("#dialog-box"), "a bulk allocation value was not selected from list.", "error");
        }
        $('.bootbox').modal('hide');
    });
    $('#wpdcancelBtn').click(function () {
        
        $('#' + rowId + '_WPD_TO').val($('#' + rowId + '_WPD_TO').attr('value'));

    });
    mctrObj.searchGrid('WpdToGrid');
});