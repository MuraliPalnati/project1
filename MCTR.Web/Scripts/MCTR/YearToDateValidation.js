$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowId = $('#rowId').val();
    var columnNames = ['Line', 'OH Base Year', 'Anal Type', 'Activity Id', 'Project Id', 'Account', 'Proj Trans Type','Proj Trans Code', 'AFF', 'BU GL From', 'Home Loc Code', 'Dept From','Bus Unit GL', 'Class Code','Work Loc Code','Dept', 'RSC', 'WPD (BTU)', 'Bulk Alctn', 'TTD Quantity', 'TTD Domestic Amount'];
    var colModel = [{ key: false, name: 'LINE_NO', index: 'LINE_NO',width:30, editable: false },
        { key: false, name: 'FISCAL_YEAR', index: 'FISCAL_YEAR', width: 30, editable: false },
        { key: false, name: 'ANALYSIS_TYPE', index: 'ANALYSIS_TYPE', width: 30, editable: false },
        { key: false, name: 'ACTIVITY_ID', index: 'ACTIVITY_ID', width: 100, editable: false },
        { key: false, name: 'PROJECT_ID', index: 'PROJECT_ID', width: 100, editable: false },
        { key: false, name: 'ACCOUNT', index: 'ACCOUNT', width: 100, editable: false },
        { key: false, name: 'PROJ_TRANS_TYPE', index: 'PROJ_TRANS_TYPE', width: 45, editable: false },
        { key: false, name: 'PROJ_TRANS_CODE', index: 'PROJ_TRANS_CODE', width: 45, editable: false },
        { key: false, name: 'AFFILIATE', index: 'AFFILIATE', width: 30, editable: false },
        { key: false, name: 'WORK_BUGL', index: 'WORK_BUGL', width: 50, editable: false },
        { key: false, name: 'HOME_LOC', index: 'HOME_LOC', width: 50, editable: false },
        { key: false, name: 'HOME_DEPT', index: 'HOME_DEPT', width: 50, editable: false },
        { key: false, name: 'HOME_BUGL', index: 'HOME_BUGL', width: 50, editable: false },
        { key: false, name: 'CLASS_CD', index: 'CLASS_CD', width: 50, editable: false },
        { key: false, name: 'WORK_LOC', index: 'WORK_LOC', width: 30, editable: false },
        { key: false, name: 'WORK_DEPT', index: 'WORK_DEPT', width: 45, editable: false },
        { key: false, name: 'RSC', index: 'RSC', width: 50, editable: false },
        { key: false, name: 'WPD', index: 'WPD', width: 100, editable: false },
        { key: false, name: 'BULK_ALCTN_CD7', index: 'BULK_ALCTN_CD7', width: 100, editable: false },
        { key: false, name: 'QUANTITY_YTD', index: 'QUANTITY_YTD', formatter: 'number', formatoptions: { decimalSeparator: ".", decimalPlaces: 1, defaultValue: '0.0' }, width: 100, editable: false },
        { key: false, name: 'AMOUNT_YTD', index: 'AMOUNT_YTD', width: 100,formatter: 'number', formatoptions: { decimalSeparator: ".", decimalPlaces: 2, defaultValue: '0.00' },  editable: false }];

    mctrObj.CreateJqGrid('ytdGrid', '/PerCheckBl/perCheckPerCheckOnLoad', 'POST', { MctrNo: $('#MctrNo').val(), LineNo: $('#' + rowId + '_LINE_NO').val() }, columnNames, colModel, false, '', [], 10, '100%', 'desc');
    $("#ytdGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});

});

