$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject = {};
    var rowId = $('#rowId').val();
    var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowId));
    var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowId));
    var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowId));

    var mctrLineItem = $.extend(grid1, grid2, grid3);
    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#AffiliateFromGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['Affiliate'];
    var colModel = [
        { key: false, name: 'AFFILIATE', index: 'AFFILIATE', width: 265, search: true }
       ];
    mctrObj.CreateJqGrid('AffiliateFromGrid', '/MctrCreateForm/getRgAffiliateFromLOVJson', 'POST', mctrLineItem, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn, '', '', '', 'affliateFromPager');
    $("#AffiliateFromGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#AffiliateFromOkBtn').click(function () {

        //$('#tblJQGridCover').setRowData($('#activeProgFrom').val(), rowObject);
        //$('#mctrModal').modal("hide");
        if (!$.isEmptyObject(rowObject)) {
            $('#' + rowId + '_AFFILIATE_FROM').removeClass().addClass('white');
            $('#' + rowId + '_AFFILIATE_TO').val(rowObject.AFFILIATE);
        }
        $('#' + rowId + '_AFFILIATE_FROM').val(rowObject.AFFILIATE);
        $('#' + rowId + '_AFFILIATE_FROM').attr('value',rowObject.AFFILIATE);
        $('.bootbox').modal('hide');

    });
    
    $('#AffiliateFromcancelBtn').click(function () {
        $('#' + rowId + '_AFFILIATE_FROM').val($('#' + rowId + '_AFFILIATE_FROM').attr('value'));
    });
    mctrObj.searchGrid('AffiliateFromGrid');
});