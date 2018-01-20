$(document).ready(function () {

    var mctrObj = new MCTR();

    var columnNames = ['MCTR', 'MCTR Line', 'FR/TO', 'OH Line', 'BU GL','Activity Id'];
    var columnNamesMiddle = ['Project Id', 'Account', 'Trn Typ', 'Trn Cd', 'Stat Cd', 'UOM Cd', 'AFF Cd', 'Home Dept', 'Hm Loc', 'BUGL From', 'Hm OH', 'Lbr Cd', 'Cls Cd', 'Work Dept', 'Wrk Loc', 'Wrk OH', 'RSC Cd', 'WPD', 'Bulk Alctn', 'Base Year'];
    var columnNamesRight = ['Resource Quantity', 'Resource Amount'];


    var colModel = [
         { name: 'MCTR_NO', index: 'MCTR_NO', classes: 'cell', stype: 'integer', editable: false },
         { name: 'LINE_NO', index: 'LINE_NO', classes: 'cell', stype: 'short', editable: false },
        { name: 'FROM_TO', index: 'FROM_TO', stype: 'text', classes: 'cell', editable: false },
        { name: 'LINE_NO_OH', index: 'LINE_NO_OH', classes: 'cell', stype: 'short', editable: false },
    { name: 'WORK_BUGL_FROM', index: 'WORK_BUGL_FROM', classes: 'cell', stype: 'short', editable: false },
    { name: 'ACTIVITY_ID_FROM', index: 'ACTIVITY_ID_FROM', classes: 'cell', stype: 'short', editable: false }, ];

    var colModelMiddle = [
     { name: 'PROJECT_ID_FROM', index: 'PROJECT_ID_FROM', classes: 'cell', stype: 'decimal', editable: false },
    { name: 'ACCOUNT_FROM', index: 'ACCOUNT_FROM', classes: 'cell', stype: 'text', editable: false },
    { name: 'PROJ_TRANS_TYPE_FROM', index: 'PROJ_TRANS_TYPE_FROM', stype: 'text', classes: 'cell', editable: false },
 { name: 'PROJ_TRANS_CODE_FROM', index: 'PROJ_TRANS_CODE_FROM', classes: 'cell', stype: 'text', editable: false },
         { name: 'STAT_CODE_FROM', index: 'STAT_CODE_FROM', classes: 'cell', stype: 'text', editable: false },
    { name: 'UOM_FROM', index: 'UOM_FROM', classes: 'cell', stype: 'text', editable: false },
    { name: 'AFFILIATE_FROM', index: 'AFFILIATE_FROM', stype: 'text', classes: 'cell', editable: false },
 { name: 'HOME_DEPT_FROM', index: 'HOME_DEPT_FROM', classes: 'cell', stype: 'text', editable: false },
         { name: 'HOME_LOC_FROM', index: 'HOME_LOC_FROM', classes: 'cell', stype: 'text', editable: false },
    { name: 'HOME_BUGL_FROM', index: 'HOME_BUGL_FROM', classes: 'cell', stype: 'text', editable: false },
    { name: 'HOME_POOL_FROM', index: 'HOME_POOL_FROM', stype: 'text', classes: 'cell', editable: false },
 { name: 'LABOR_RATE_CD7_FROM', index: 'LABOR_RATE_CD7_FROM', classes: 'cell', stype: 'text', editable: false },
         { name: 'CLASS_CD_FROM', index: 'CLASS_CD_FROM', classes: 'cell', stype: 'text', editable: false },
    { name: 'WORK_DEPT_FROM', index: 'WORK_DEPT_FROM', classes: 'cell', stype: 'text', editable: false },
    { name: 'WORK_LOC_FROM', index: 'WORK_LOC_FROM', stype: 'text', classes: 'cell', editable: false },
 { name: 'WORK_POOL_FROM', index: 'WORK_POOL_FROM', classes: 'cell', stype: 'text', editable: false },
         { name: 'RSC_FROM', index: 'RSC_FROM', classes: 'cell', stype: 'text', editable: false },
         { name: 'WPD_FROM', index: 'WPD_FROM', classes: 'cell', stype: 'text', editable: false },
         { name: 'BULK_ALCTN_CD7', index: 'BULK_ALCTN_CD7', classes: 'cell', stype: 'text', editable: false },
         { name: 'OH_BASE_YR_FROM', index: 'OH_BASE_YR_FROM', classes: 'cell', stype: 'text', editable: false },

        ];
    var colModelRight = [
        { name: 'QUANTITY_FROM', index: 'QUANTITY_FROM', classes: 'cell', formatter: 'number', formatoptions: { decimalSeparator: ".", decimalPlaces: 1, defaultValue: '0.0' }, stype: 'decimal', editable: false },
    { name: 'AMOUNT_FROM', index: 'AMOUNT_FROM', classes: 'cell', stype: 'text', formatter: 'number', formatoptions: { decimalSeparator: ".", decimalPlaces: 2, defaultValue: '0.00' }, editable: false },
    ];
    var mctrno = $('#MctrNo').val();
    var lineNo = $('#rowId').val();
    mctrObj.CreateJqGrid('leftPanelGrid', '/MctrOhFormBl/mctrOhMctrOhOnLoadFrom', 'GET', { MctrNo: mctrno, LineNo: lineNo }, columnNames, colModel, false, 'SETID', [], 100, '100%', 'desc', false);
    mctrObj.CreateJqGrid('middlePanelGrid', '/MctrOhFormBl/mctrOhMctrOhOnLoadFrom', 'GET', { MctrNo: mctrno, LineNo: lineNo }, columnNamesMiddle, colModelMiddle, false, 'SETID', [], 100, '100%', 'desc', false);
    mctrObj.CreateJqGrid('rightPanelGrid', '/MctrOhFormBl/mctrOhMctrOhOnLoadFrom', 'GET', { MctrNo: mctrno, LineNo: lineNo }, columnNamesRight, colModelRight, false, 'SETID', [], 100, '100%', 'desc', false);

});