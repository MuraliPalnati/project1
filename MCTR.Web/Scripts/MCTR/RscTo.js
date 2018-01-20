$(document).ready(function () {
    
    var mctrObj = new MCTR();
    var rowObject = {};
    var rowId = $('#rowId').val();
    var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowId));
    var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowId));
    var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowId));
    var mctrLineItem = $.extend(grid1, grid2, grid3);
    var py_cy_status = parseInt($('#fyear').val().trim()) == (new Date).getFullYear() ? 'CY' : 'PY';
    if (py_cy_status == 'PY' && parseInt($('#fyear').val().trim()) > 2007 && $('#' + rowId + '_AFFILIATE_TO') != '') {
        mctrLineItem.SETID = $('#' + rowId + '_AFFILIATE_TO').val();
    }
    else {
        mctrLineItem.SETID = $('#OrigBu').val();
    }
    mctrLineItem.PERIOD_TO = $('#PeriodTo').val();
    mctrLineItem.COW = $('#COW').val();

    //var rowId = $('#rowId').val();
    //var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowId));
    //var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowId));
    //var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowId));

    //var mctrLineItem = $.extend(grid1, grid2, grid3);

    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#RscToGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['RSC', 'Description', 'Eff Date', 'Current Status'];
    var colModel = [
        { key: false, name: 'RESOURCE_SUB_CAT', index: 'RESOURCE_SUB_CAT', width: 150, search:true, editable: true },
        { key: false, name: 'DESCR', index: 'DESCR', width: 200, editable: true },
        { key: false, name: 'EFFDT', index: 'EFFDT', classes: 'uppercase',formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd-M-y' }, width: 100, editable: true },
        { key: false, name: 'EFF_STATUS', index: 'EFF_STATUS', width: 120, editable: true }
    ];
    mctrObj.CreateJqGrid('RscToGrid', '/MctrCreateForm/getRgRscToLOVJSON', 'POST', mctrLineItem, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#RscToGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#RscToOkBtn').click(function () {
        if(!$.isEmptyObject(rowObject)){
            $('#' + rowId + '_RSC_TO').val(rowObject.RESOURCE_SUB_CAT);
            $('#' + rowId + '_RSC_TO').attr('value',rowObject.RESOURCE_SUB_CAT);
        }
        else{
            $('#' + rowId + '_RSC_TO').val($('#' + rowId + '_RSC_TO').attr('value'));
          
        }
        $('#' + rowId + '_RSC_TO').removeClass().addClass('white');
        $('.bootbox').modal("hide");
    
    });
    $('#RscTocancelBtn').click(function () {
        $('#' + rowId + '_RSC_TO').val($('#' + rowId + '_RSC_TO').attr('value'));
    });
    mctrObj.searchGrid('RscToGrid');
});