$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject = {};

   var rowId = $('#rowId').val();
    var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowId));
    var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowId));
    var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowId));

    var mctrLineItem = $.extend(grid1, grid2, grid3);
    var py_cy_status = parseInt($('#fyear').val().trim()) == (new Date).getFullYear() ? 'CY' : 'PY';
    if (py_cy_status == 'PY' && parseInt($('#fyear').val().trim()) > 2007 && $('#' + rowId + '_AFFILIATE_FROM') != '') {
        mctrLineItem.SETID = $('#' + rowId + '_AFFILIATE_FROM').val();
    }
    else {
        mctrLineItem.SETID = $('#OrigBu').val();
    }
    mctrLineItem.PERIOD_TO = $('#PeriodTo').val();
    mctrLineItem.COW = $('#COW').val();

    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#RscFromGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['RSC', 'Description', 'Eff Date', 'Current Status'];
    var colModel = [
        { key: false, name: 'RESOURCE_SUB_CAT', index: 'RESOURCE_SUB_CAT', width: 150, search: true, editable: true },
        { key: false, name: 'DESCR', index: 'DESCR', width: 200, editable: true },
        { key: false, name: 'EFFDT', index: 'EFFDT',classes: 'uppercase',formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd-M-y' }, width: 100, editable: true },
        { key: false, name: 'EFF_STATUS', index: 'EFF_STATUS', width: 100, editable: true }
    ];
    mctrObj.CreateJqGrid('RscFromGrid', '/MctrCreateForm/getRgRscFromLOVJson', 'POST', mctrLineItem, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#RscFromGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#RscFromOkBtn').click(function () {
        //var rowId = $('#rowId').val();
        //var rsc_from = $('#' + rowId + '_RSC_FROM').val();
        //var global_rsc_from = $('#' + rowId + '_RSC_FROM').attr('value');
        //if ($('#' + rowId + '_RSC_FROM').val() !== "" && $('#' + rowId + '_RSC_FROM').attr('value') == "" && $('#' + rowId + '_RSC_FROM').attr('value') !== $('#' + rowId + '_RSC_FROM').val()) {
        //    $('#' + rowId + '_RSC_FROM').removeClass().addClass("White");

        //    if (rsc_from != global_rsc_from || rsc_from == '' && global_rsc_from != '' || rsc_from != '' && global_rsc_from == '') {
        //        $('#' + rowId + '_TTD_FLAG').removeClass().addClass("white");
        //        $('#' + rowId + '_PER_FLAG').removeClass().addClass("white");
        //    }
        //}
        if (!$.isEmptyObject(rowObject)) {
            $('#' + rowId + '_RSC_FROM').val(rowObject.RESOURCE_SUB_CAT);
            $('#' + rowId + '_RSC_FROM').attr('value',rowObject.RESOURCE_SUB_CAT);
        }
        else {
            $('#' + rowId + '_RSC_FROM').val($('#' + rowId + '_RSC_FROM').attr('value'));

        }
        $('#' + rowId + '_RSC_FROM').removeClass().addClass('white');
        $('.bootbox').modal("hide");

    });
    $('#RscFromcancelBtn').click(function () {
        $('#' + rowId + '_RSC_FROM').val($('#' + rowId + '_RSC_FROM').attr('value'));
    });
    mctrObj.searchGrid('RscFromGrid');
});