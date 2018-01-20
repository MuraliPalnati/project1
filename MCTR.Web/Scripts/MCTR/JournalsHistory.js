$(document).ready(function () {
    $('#alertModal').modal('show');
    jQuery("#JrnlHistory").jqGrid({
        //var mctrObj = new MCTR();
        url:getBaseUrl("/JrnlHist/jrnlHistOnLoad"),
        datatype: 'json',
        mtype: 'Get',
        ignoreCase: true,
        colNames: ['Date Journal', 'MCTR', 'LINE', 'F/T', 'Line OH', 'Intfc Line Num', 'Bus Unit', 'Project ID', 'Activity ID', 'Ledger Group', 'Bus Unit GL', 'Journal ID', 'Intfc Status', 'Load Status', 'Activity Type', 'Ledger', 'Oprid', 'Account', 'Majot Acct Nbr7', 'Deptid', 'Ovrhd Alctn Cd7', 'Affiliate', 'Deptid From', 'Ovrhd Alc Cd From7', 'Bus Unit GL From', 'Currency Cd', 'Stat Cd', 'Anal Type', 'Res Type', 'Res Sub Cat', 'Trans Date', 'Acntng Date', 'Dttm Stamp', 'Jrnl Ln Ref', 'Open Item Stat', 'Line Descr', 'Jrnl Line Date', 'Foreign Currency', 'Rt Type', 'Foreign Amount', 'Rate Mult', 'Cur Effdt', 'Proc Inst', 'Proj Trans Type', 'Proj Trans Code', 'Sys Srce', 'UOM', 'Emplid', 'Bus Unit AP', 'Vendor Id', 'Voucher Id', 'Voucher Line Num', 'Appl Jrnl Id', 'PO Id', 'BUS Unit AM', 'Asset Id', 'Cust Id', 'Item', 'Resource Quantity', 'Resource Amount', 'Res User 1', 'Res User 2', 'Res User 3', 'Res User 4', 'Res User 5', 'Res User 6', 'Res User 7', 'Res User 8', 'Res User 9', 'Res User 10', 'Res User 11', 'Ext Ref Id7', 'Wrk Loc Cd7', 'Hm Loc Cd7', 'Proj Id From7', 'Actv Id From7', 'WPD Id7', 'Casual Id7', 'Est Pric Cd7', 'Work Grp Cd7', 'Work Grp From7', 'Lbr Rate Cd7', 'Bulk Alctn Cd7', 'Ovrhd Base Yr Cd7', 'Class Cd7', 'JV Item Cd7', 'Acct Per', 'Due Date', 'Fiscal Year', 'FC Trans Cd7', 'Var Dt7', 'Avg Rt Select Cd7', 'Ext System Cd7', 'BUS Unit BD', 'BUS Unit AR', 'BUS Unit PO', 'Profile Id', 'Req Id', 'Res Detail Id7', 'Group ByNum'],
        colModel: [
         { key: false, search: false, name: 'DATE_JOURNAL', index: 'DATE_JOURNAL', classes: 'cell', width: 60, formatter: utcDateFormatter, editable: false, frozen: true },//, formatoptions: { srcformat: 'd-m-Y', newformat: 'd-M-Y' }
         { key: false, name: 'MCTR_NO', index: 'MCTR_NO', classes: 'cell', stype: 'text', width: 50, editable: false, frozen: true },
         { key: false, name: 'LINE_NO', index: 'LINE_NO', classes: 'cell', stype: 'text', width: 50, editable: false, frozen: true },
        { key: false, name: 'FROM_TO', index: 'FROM_TO', stype: 'text', classes: 'cell', width: 50, editable: false, frozen: true },
     { key: false, name: 'LINE_NO_OH', index: 'LINE_NO_OH', classes: 'cell', stype: 'text', width: 50, editable: false, frozen: true },
     { key: false, name: 'INTFC_LINE_NUM', index: 'INTFC_LINE_NUM', classes: 'cell', stype: 'text', editable: false },
    { key:false,name: 'BUSINESS_UNIT', index: 'BUSINESS_UNIT', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'PROJECT_ID', index: 'PROJECT_ID', stype: 'text', classes: 'cell', editable: false },
 { key:false,name: 'ACTIVITY_ID', index: 'ACTIVITY_ID', classes: 'cell', stype: 'text', editable: false },
         {key:false, name: 'LEDGER_GROUP', index: 'LEDGER_GROUP', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'BUSINESS_UNIT_GL', index: 'BUSINESS_UNIT_GL', classes: 'cell', stype: 'text', editable: false },
    { key:false,name: 'JOURNAL_ID', index: 'JOURNAL_ID', stype: 'text', classes: 'cell', editable: false },
 {key:false, name: 'INTFC_STATUS', index: 'INTFC_STATUS', classes: 'cell', stype: 'text', editable: false },
         { key:false,name: 'LOAD_STATUS', index: 'LOAD_STATUS', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'ACTIVITY_TYPE', index: 'ACTIVITY_TYPE', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'LEDGER', index: 'LEDGER', stype: 'text', classes: 'cell', editable: false },
 { key:false,name: 'OPRID', index: 'OPRID', classes: 'cell', stype: 'text', editable: false },
         { key:false,name: 'ACCOUNT', index: 'ACCOUNT', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'MAJOR_ACCOUNT_NBR7', index: 'MAJOR_ACCOUNT_NBR7', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'DEPTID', index: 'DEPTID', stype: 'text', classes: 'cell', editable: false },
 { key:false,name: 'OVRHD_ALCTN_CD7', index: 'OVRHD_ALCTN_CD7', classes: 'cell', stype: 'text', editable: false },
         {key:false, name: 'AFFILIATE', index: 'AFFILIATE', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'DEPTID_FROM', index: 'DEPTID_FROM', classes: 'cell', stype: 'text', editable: false },
    { key:false,name: 'OVRHD_ALC_CD_FROM7', index: 'OVRHD_ALC_CD_FROM7', stype: 'text', classes: 'cell', editable: false },
 {key:false, name: 'BUS_UNIT_GL_FROM', index: 'BUS_UNIT_GL_FROM', classes: 'cell', stype: 'text', editable: false },
 { key:false,name: 'CURRENCY_CD', index: 'CURRENCY_CD', classes: 'cell', stype: 'text', editable: false },
         {key:false, name: 'STATISTICS_CODE', index: 'STATISTICS_CODE', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'ANALYSIS_TYPE', index: 'ANALYSIS_TYPE', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'RESOURCE_TYPE', index: 'RESOURCE_TYPE', stype: 'text', classes: 'cell', editable: false },
 {key:false, name: 'RESOURCE_SUB_CAT', index: 'RESOURCE_SUB_CAT', classes: 'cell', stype: 'text', editable: false },
 {key:false, name: 'TRANS_DT', index: 'TRANS_DT', classes: 'cell', stype: 'text', formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'Y-m-d' },classes:'uppercase', editable: false },
    { key: false, name: 'ACCOUNTING_DT', index: 'ACCOUNTING_DT', stype: 'text', classes: 'cell', formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'Y-m-d' }, classes: 'uppercase', editable: false },
    { key: false, name: 'DTTM_STAMP', index: 'DTTM_STAMP', stype: 'text', formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd/m/Y' }, classes: 'cell', editable: false },
 {key:false, name: 'JRNL_LN_REF', index: 'JRNL_LN_REF', classes: 'cell', stype: 'text', editable: false },
 { key:false,name: 'OPEN_ITEM_STATUS', index: 'OPEN_ITEM_STATUS', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'LINE_DESCR', index: 'LINE_DESCR', stype: 'text', classes: 'cell', editable: false },
 {key:false, name: 'JOURNAL_LINE_DATE', index: 'JOURNAL_LINE_DATE', classes: 'cell', formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'Y/m/d' }, editable: false },
 { key:false,name: 'FOREIGN_CURRENCY', index: 'FOREIGN_CURRENCY', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'RT_TYPE', index: 'RT_TYPE', classes: 'cell', stype: 'text', editable: false },
    { key: false, name: 'FOREIGN_AMOUNT', index: 'FOREIGN_AMOUNT', stype: 'decimal', align: "right", formatter: 'number', formatoptions: { decimalSeparator: ".", decimalPlaces: 2, defaultValue: '0.00' }, classes: 'cell', editable: false },
 { key:false,name: 'RATE_MULT', index: 'RATE_MULT', classes: 'cell', stype: 'text',formatter: 'number', formatoptions: { decimalSeparator: ".", decimalPlaces: 8, defaultValue: '0.00000000' }, editable: false },
 { key: false, name: 'CUR_EFFDT', index: 'CUR_EFFDT', classes: 'cell', stype: 'text', formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'Y/m/d' }, editable: false },
    {key:false, name: 'PROCESS_INSTANCE', index: 'PROCESS_INSTANCE', stype: 'text', classes: 'cell', editable: false },
 {key:false, name: 'PROJ_TRANS_TYPE', index: 'PROJ_TRANS_TYPE', classes: 'cell', stype: 'text', editable: false },
 { key:false,name: 'PROJ_TRANS_CODE', index: 'PROJ_TRANS_CODE', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'SYSTEM_SOURCE', index: 'SYSTEM_SOURCE', stype: 'text', classes: 'cell', editable: false },
 {key:false, name: 'UNIT_OF_MEASURE', index: 'UNIT_OF_MEASURE', classes: 'cell', stype: 'text', editable: false },
 {key:false, name: 'EMPLID', index: 'EMPLID', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'BUSINESS_UNIT_AP', index: 'BUSINESS_UNIT_AP', classes: 'cell', stype: 'text', editable: false },
    { key:false,name: 'VENDOR_ID', index: 'VENDOR_ID', stype: 'text', classes: 'cell', editable: false },
 {key:false, name: 'VOUCHER_ID', index: 'VOUCHER_ID', classes: 'cell', stype: 'text', editable: false },
 { key: false, name: 'VOUCHER_LINE_NUM', index: 'VOUCHER_LINE_NUM', align: "right", classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'APPL_JRNL_ID', index: 'APPL_JRNL_ID', stype: 'text', classes: 'cell', editable: false },
 {key:false, name: 'PO_ID', index: 'PO_ID', classes: 'cell', stype: 'text', editable: false },
 {key:false, name: 'BUSINESS_UNIT_AM', index: 'BUSINESS_UNIT_AM', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'ASSET_ID', index: 'ASSET_ID', stype: 'text', classes: 'cell', editable: false },
 {key:false, name: 'CUST_ID', index: 'CUST_ID', classes: 'cell', stype: 'text', editable: false },
 {key:false, name: 'ITEM', index: 'ITEM', classes: 'cell', stype: 'text', editable: false },
 { key: false, name: 'RESOURCE_QUANTITY', index: 'RESOURCE_QUANTITY', formatter: 'number', formatoptions: { decimalSeparator: ".", decimalPlaces: 1, defaultValue: '0.0' }, classes: 'cell align-right', stype: 'text', editable: false },
    { key: false, name: 'RESOURCE_AMOUNT', index: 'RESOURCE_AMOUNT', formatter: 'number', formatoptions: { decimalSeparator: ".", decimalPlaces: 2, defaultValue: '0.00' }, classes: 'cell align-right', stype: 'text', editable: false },
    {key:false, name: 'RES_USER1', index: 'RES_USER1', stype: 'text', classes: 'cell', editable: false },
 {key:false, name: 'RES_USER2', index: 'RES_USER2', classes: 'cell', stype: 'text', editable: false },
 {key:false, name: 'RES_USER3', index: 'RES_USER3', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'RES_USER4', index: 'RES_USER4', stype: 'text', classes: 'cell', editable: false },
 {key:false, name: 'RES_USER5', index: 'RES_USER5', classes: 'cell', stype: 'text', editable: false },
 {key:false, name: 'RES_USER6', index: 'RES_USER6', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'RES_USER7', index: 'RES_USER7', stype: 'text', classes: 'cell', editable: false },
 {key:false, name: 'RES_USER8', index: 'RES_USER8', classes: 'cell', stype: 'text', editable: false },
 {key:false, name: 'RES_USER9', index: 'RES_USER9', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'RES_USER10', index: 'RES_USER10', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'RES_USER11', index: 'RES_USER11', stype: 'text', classes: 'cell', editable: false },
 {key:false, name: 'EXT_REFERENCE_ID7', index: 'EXT_REFERENCE_ID7', classes: 'cell', stype: 'text', editable: false },
 {key:false, name: 'WORK_LOCATION_CD7', index: 'WORK_LOCATION_CD7', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'HOME_LOCATION_CD7', index: 'HOME_LOCATION_CD7', stype: 'text', classes: 'cell', editable: false },
 {key:false, name: 'PROJECT_ID_FROM7', index: 'PROJECT_ID_FROM7', classes: 'cell', stype: 'text', editable: false },
 { key:false,name: 'ACTIVITY_ID_FROM7', index: 'ACTIVITY_ID_FROM7', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'WPD_ID7', index: 'WPD_ID7', stype: 'text', classes: 'cell', editable: false },
 {key:false, name: 'CAUSAL_ID7', index: 'CAUSAL_ID7', classes: 'cell', stype: 'text', editable: false },
 {key:false, name: 'ESTMTG_PRICG_CD7', index: 'ESTMTG_PRICG_CD7', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'WORK_GROUP_CD7', index: 'WORK_GROUP_CD7', classes: 'cell', stype: 'text', editable: false },
    { key:false,name: 'WORK_GROUP_FROM7', index: 'WORK_GROUP_FROM7', stype: 'text', classes: 'cell', editable: false },
 {key:false, name: 'LABOR_RATE_CD7', index: 'LABOR_RATE_CD7', classes: 'cell', stype: 'text', editable: false },
 {key:false, name: 'BULK_ALCTN_CD7', index: 'BULK_ALCTN_CD7', classes: 'cell', stype: 'text', editable: false },
 { key:false,name: 'OVRHD_BASE_YR_CD7', index: 'OVRHD_BASE_YR_CD7', classes: 'cell', stype: 'text', editable: false },
    { key:false,name: 'CLASS_CD7', index: 'CLASS_CD7', stype: 'text', classes: 'cell', editable: false },
 {key:false, name: 'JV_ITEM_CD7', index: 'JV_ITEM_CD7', classes: 'cell', stype: 'text', editable: false },
 { key: false, name: 'ACCOUNTING_PERIOD', index: 'ACCOUNTING_PERIOD', align: "right", classes: 'cell', stype: 'text', editable: false },
    { key: false, name: 'DUE_DATE', index: 'DUE_DATE', formatter: 'date', stype: 'text', formatoptions: { srcformat: 'd/m/Y', newformat: 'Y/m/d' }, classes: 'cell', editable: false },
 { key: false, name: 'FISCAL_YEAR', index: 'FISCAL_YEAR', align: "right", classes: 'cell', stype: 'text', editable: false },
 {key:false, name: 'FC_TRANSLATION_CD7', index: 'FC_TRANSLATION_CD7', classes: 'cell', stype: 'text', editable: false },
    { key: false, name: 'VARIABLE_DT7', index: 'VARIABLE_DT7', classes: 'cell', stype: 'text', formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'Y/m/d' }, editable: false },
    { key:false,name: 'AVG_RT_SELECT_CD7', index: 'AVG_RT_SELECT_CD7', stype: 'text', classes: 'cell', editable: false },
 {key:false, name: 'EXT_SYSTEM_CD7', index: 'EXT_SYSTEM_CD7', classes: 'cell', stype: 'text', editable: false },
 { key:false,name: 'BUSINESS_UNIT_BD', index: 'BUSINESS_UNIT_BD', classes: 'cell', stype: 'text', editable: false },
 { key:false,name: 'BUSINESS_UNIT_AR', index: 'BUSINESS_UNIT_AR', classes: 'cell', stype: 'text', editable: false },
 { key:false,name: 'BUSINESS_UNIT_PO', index: 'BUSINESS_UNIT_PO', classes: 'cell', stype: 'text', editable: false },
    {key:false, name: 'PROFILE_ID', index: 'PROFILE_ID', stype: 'text', classes: 'cell', editable: false },
 {key:false, name: 'REQ_ID', index: 'REQ_ID', classes: 'cell', stype: 'text', editable: false },
 { key: false, name: 'RES_DETAIL_ID7', index: 'RES_DETAIL_ID7', classes: 'cell', align: "right", stype: 'text', editable: false },
    { key: false, name: 'GROUPBYNUM', index: 'GROUPBYNUM', stype: 'text', align: "right", classes: 'cell', editable: false }],
        pager: jQuery('#pager'),
        rowNum: 10,
        height: '100%',
        viewrecords: true,
        pgtext: null,
        shrinkToFit: false,
        emptyrecords: 'No records to display',
        jsonReader: {
            page: "page",
            total: "total",
            records: "records",
            rows: "rows",
        },
        loadonce: true,
        multiselect: false

    });

    $('#selectedJrnlDate').change(function (e, j) {

        $("#JrnlHistory").jqGrid('setGridParam', {
            url: getBaseUrl('/JrnlHist/jrnlHistOnLoad')+'?jrnlHistDate=' + $(this).val(),
            datatype:'json'
        });
        $("#JrnlHistory").trigger("reloadGrid");
    });

    function utcDateFormatter(cellvalue, options, rowObject) {
        if (cellvalue) {
            return moment(cellvalue).utc().format("DD-MMM-YYYY");
        } else {
            return '';
        }
    }

    jQuery("#JrnlHistory").jqGrid('navGrid', '#pager', {
            add: false,
            edit: false,
            del: false,
            search: true,
            refresh: true
    }, {}, {}, {}, { width: 350,
            multipleSearch: true
        });
    jQuery("#JrnlHistory").jqGrid('setFrozenColumns');
});

    

