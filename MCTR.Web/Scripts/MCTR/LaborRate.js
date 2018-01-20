$(document).ready(function () {

    var mctrObj = new MCTR();
    //var cascadeFormatter = function (cellvalue, options, rowObject) {
    //    return '<a href="'+getBaseUrl('/LbrRateCy/LbrRate')+'" id=' + options.rowId + '_popUpbtn style = "background:red !important;" class="btn btn-default btn-sm">Cascade</a>';
    //};
    var columnNames = ['SetID(BU)', 'Fiscal Year', 'Labor Rate Cd7', 'Proj Trans Code', 'Rate'];
    var colModel = [
        { name: 'SETID', index: 'SETID', classes: 'cell', stype: 'text', editable: true },
        { name: 'FISCAL_YEAR', index: 'FISCAL_YEAR', classes: 'cell', stype: 'text', width: 150, editable: false },
        { name: 'LABOR_RATE_CD7', index: 'LABOR_RATE_CD7', stype: 'text', classes: 'cell', width: 150, editable: true },
        { name: 'PROJ_TRANS_CODE', index: 'PROJ_TRANS_CODE', classes: 'cell', stype: 'text', width: 150, editable: true },
        { name: 'RATE', index: 'RATE', formatter: 'number', formatoptions: { decimalSeparator: ".", decimalPlaces: 2, defaultValue: '0.00' }, classes: 'cell', width: 150, stype: 'text', editable: true }];
    mctrObj.CreateJqGrid('tblJQGrid', '/LbrRateCy/LbrRateOnLoad', 'GET', {}, columnNames, colModel, false, '', [], 10, '100%', '', null);
    $("#tblJQGrid").navGrid('#pager', { add: false, edit: false, del: false, search: true, refresh: true },{},{},{},{ width: 350, multipleSearch: true });

   });




