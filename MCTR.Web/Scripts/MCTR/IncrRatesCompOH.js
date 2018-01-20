$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject = {};

    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#incrRatesGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['BU', 'Year', 'RSC/Pool', 'Rate'];
    var colModel = [{ key: false, name: 'CMPON_CD', index: 'CMPON_CD', width: 140, editable: false },
        { key: false, name: 'FISCAL_YEAR', index: 'FISCAL_YEAR', width: 140, editable: false },
        { key: false, name: 'RATE_I_RSC_POOL', index: 'RATE_I_RSC_POOL  ', width: 140, editable: false },
        { key: false, name: 'RATE_I', index: 'RATE_I', formatter: 'number', formatoptions: { decimalSeparator: ".", decimalPlaces: 6, defaultValue: '0.000000' }, width: 140, editable: false }];
    mctrObj.CreateJqGrid('incrRatesGrid', '/MctrCompRates/getRgRateIJSON', 'POST', { CMPON_CD: $('#' + $('#rowId').val() + '_CMPON_CD').val(), FISCAL_YEAR: $('#' + $('#rowId').val() + '_FISCAL_YEAR').val() }, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn,'','','','#pagerPopUp');
    $("#incrRatesGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#incrRatesOkBtn').click(function () {
      //$('#compOHRatesGrid').setRowData($('#rowId').val(), rowObject);
        $('#' + $('#rowId').val() + '_RATE_I_RSC_POOL').val(rowObject.RATE_I_RSC_POOL);
        $('#' + $('#rowId').val() + '_RATE_I').val(rowObject.RATE_I);
        //$('#' + $('#rowId').val() + '_HOME_BUGL_TO').val($('#OrigBu').val());
        //$('#' + $('#rowId').val() + '_OH_BASE_YR_FROM').val($('#fyear').val());
        //$('#' + $('#rowId').val() + '_OH_BASE_YR_TO').val($('#fyear').val());

        $('#' + $('#rowId').val() + '_RATE_OUTPUT').val((rowObject.RATE_I * $('#' + $('#rowId').val() + '_BASE_AMT').val()).toFixed(8));
        $('#mctrModal').modal("hide");
        $('a[rowId*="compRatesSaveBtn"]').show();
    })
});