$(document).ready(function () {
    var mctrObj = new MCTR();
    var OVRHD_BASE_YR_CD7 = '';
    var HOME_LOCATION_CD7 = '';
    var DEPTID_FROM = '';
    var WORK_LOCATION_CD7 = '';
    var DEPTID = '';
    var RESOURCE_SUB_CAT = '';
    var CLASS_CD7 = '';
    var WPD_ID7 = '';
    var BULK_ALCTN_CD7 = '';
    var mctrObj = new MCTR();
    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#ttdInquireGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var initialGridData;
    var gridCompleteFn = function (data) {
        if (!initialGridData) {
            initialGridData = $('#ttdInquireGrid').getGridParam('data');
        }

        //$.each($('#ttdInquireGrid').getGridParam('data'), function (key, value) {
        //    grid1 = $('#ttdInquireGrid').getRowData(value['_id_']);
        //    initialGridData.push(grid1);
        //});
        if ($('#filterRow').length == 0) {

            var rowID = $('#rowId').val();
            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));
            var parameters =
                {
                    
                    rowID: "filterRow",
                    initdata: {
                        ANALYSIS_TYPE: 'ACT',
                        //FISCAL_YEAR: $('#1_OH_BASE_YR_FROM').val(),
                        ACTIVITY_ID: grid1.ACTIVITY_ID_FROM,
                        PROJECT_ID: grid2.PROJECT_ID_FROM,
                        OVRHD_BASE_YR_CD7: '<input id="OVRHD_BASE_YR_CD7_FILTER" class="form-control" value="' + OVRHD_BASE_YR_CD7 + '"/>',
                        ACCOUNT: grid2.ACCOUNT_FROM,
                        BUSINESS_UNIT_GL: grid2.WORK_BUGL_FROM,
                        BUS_UNIT_GL_FROM: grid2.WORK_BUGL_FROM,
                        DEPTID_FROM: '<input id="DEPTID_FROM_FILTER" class="form-control uppercase" value="' + DEPTID_FROM + '"/>',
                        CLASS_CD7: '<input id="CLASS_CD7_FROM_FILTER" class="form-control uppercase" value="' + CLASS_CD7 + '"/>',
                        AFFILIATE: grid2.WORK_BUGL_FROM,
                        PROJ_TRANS_TYPE: grid2.PROJ_TRANS_TYPE_FROM,
                        PROJ_TRANS_CODE: '<input id="PROJ_TRANS_CODE_FILTER" class="form-control uppercase" value="' + grid2.PROJ_TRANS_CODE_FROM + '" />',
                        DEPTID: '<input id="DEPTID_FILTER" class="form-control uppercase" value="' + DEPTID + '"/>',
                        HOME_LOCATION_CD7: '<input id="HOME_LOCATION_CD7_FILTER" class="form-control uppercase" value="' + HOME_LOCATION_CD7 + '"/>',
                        CLASS_CD: '<input id="CLASS_CD_FILTER" class="form-control uppercase" value="' + CLASS_CD7 + '"/>',
                        WORK_DEPT: '<input id="WORK_DEPT_FILTER" class="form-control uppercase" value="' + DEPTID + '"/>',
                        WORK_LOCATION_CD7: '<input id="WORK_LOCATION_CD7_FILTER" class="form-control uppercase" value="' + WORK_LOCATION_CD7 + '"/>',
                        RESOURCE_SUB_CAT: '<input id="RSC_FILTER" class="form-control uppercase" value="' + RESOURCE_SUB_CAT + '"/>',
                        WPD_ID7: '<input id="WPD_FILTER" class="form-control uppercase" value="' + WPD_ID7 + '"/>',
                        BULK_ALCTN_CD7: '<input id="BULK_ALCTN_CD7_FILTER" class="form-control uppercase" value="' + BULK_ALCTN_CD7 + '"/>'
                    },
                    position: "first",
                    useDefValues: false,
                    useFormatter: false,
                    addRowParams: { extraparam: {} }
                };

            $("#ttdInquireGrid").addRow(parameters);
        }
        $('#filterRow').find('td[aria-describedby=ttdInquireGrid_TTD_QUANTITY7]').text('');
        $('#filterRow').find('td[aria-describedby=ttdInquireGrid_TTD_DOMESTIC_AMT7]').text('');
        $('#filterRow_setBtn').hide();
        
        var statusid = $('#StatusId').val();
        if (statusid == "OA") {
            $('a[id*=_setBtn]').click(function (e, obj) {
                
                var rowData = $('#ttdInquireGrid').jqGrid('getRowData', e.currentTarget.attributes['row'].value);
                var gridRowId = $('#rowId').val();

                // validations to the line item from the inquire button.
                ttdInqCyrbutSetLitmWhenButtonPressed(rowData, gridRowId);

                $('#' + gridRowId + '_AMOUNT_FROM').val(-rowData.TTD_DOMESTIC_AMT7);
                $('#' + gridRowId + '_AMOUNT_FROM').attr('value',-rowData.TTD_DOMESTIC_AMT7);
                $('#' + gridRowId + '_AMOUNT_TO').val(rowData.TTD_DOMESTIC_AMT7);
                $('#' + gridRowId + '_AMOUNT_TO').attr('value', rowData.TTD_DOMESTIC_AMT7);
                $('#' + gridRowId + '_QUANTITY_FROM').val(-rowData.TTD_QUANTITY7);
                $('#' + gridRowId + '_QUANTITY_FROM').attr('value',-rowData.TTD_QUANTITY7);
                $('#' + gridRowId + '_QUANTITY_TO').val(rowData.TTD_QUANTITY7);
                $('#' + gridRowId + '_QUANTITY_TO').attr('value',rowData.TTD_QUANTITY7);
                $('#' + gridRowId + '_ADJUSTMENT_FROM').val(0.00);
                $('#' + gridRowId + '_ADJUSTMENT_FROM').attr('value',0.00);
                $('#' + gridRowId + '_ADJUSTMENT_TO').val(0.00);
                $('#' + gridRowId + '_ADJUSTMENT_TO').attr('value',0.00);
                $('#mctrModalLarge').modal('hide');
            }); 
        }
    };


    var setBtnFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue ? cellvalue : "";
        return '<a id=' + options.rowId + '_setBtn row="' + options.rowId + '" class="btn btn-primary btn-xs">Set</a>';
    }
  
    var columnNames = ['Data Thru Fiscal Year', 'Mth', 'OH Base Year', 'Anal Type', 'Activity Id', 'Project Id', 'Account', 'Work BUGL', 'Home BUGL From', 'AFF', 'Proj Trans Type', 'Proj Trans Code', 'Dept From', 'Home Loc Cd', 'Class Cd', 'Work Dept', 'Work Loc Cd', 'RSC', 'WPD (BTU)', 'Bulk Alctn', 'TTD Quantity', 'TTD Domestic Amount', ''];
    var colModel = [{ key: false, name: 'FISCAL_YEAR', index: 'FISCAL_YEAR', classes: 'cell ', stype: 'decimal', editable: false, width: 50 },
            { key: false, name: 'ACCOUNTING_PERIOD', index: 'ACCOUNTING_PERIOD', classes: 'cell', stype: 'decimal', editable: false, width: 40 },
            { key: false, name: 'OVRHD_BASE_YR_CD7', index: 'OVRHD_BASE_YR_CD7', classes: 'cell', stype: 'text', editable: false, width: 40 },
            { key: false, name: 'ANALYSIS_TYPE', index: 'ANALYSIS_TYPE', classes: 'cell', stype: 'text', stype: 'text', editable: false, width: 50 },
            { key: false, name: 'ACTIVITY_ID', index: 'ACTIVITY_ID', classes: 'cell', stype: 'text', editable: false, width: 100 },
            { key: false, name: 'PROJECT_ID', index: 'PROJECT_ID', classes: 'cell', stype: 'text', editable: false, width: 100 },
            { key: false, name: 'ACCOUNT', index: 'ACCOUNT', classes: 'cell', stype: 'text', editable: false, width: 60 },
            { key: false, name: 'BUSINESS_UNIT_GL', index: 'BUSINESS_UNIT_GL', classes: 'cell', stype: 'text', editable: false, width: 30 },
            { key: false, name: 'BUS_UNIT_GL_FROM', index: 'BUS_UNIT_GL_FROM', classes: 'cell', stype: 'text', editable: false, width: 30 },
            { key: false, name: 'AFFILIATE', index: 'AFFILIATE', classes: 'cell', stype: 'text', editable: false, width: 30 },
            { key: false, name: 'PROJ_TRANS_TYPE', index: 'PROJ_TRANS_TYPE', classes: 'cell', stype: 'text', editable: false, width: 50 },
            { key: false, name: 'PROJ_TRANS_CODE', index: 'PROJ_TRANS_CODE', classes: 'cell', stype: 'text', editable: false, width: 40 },
            { key: false, name: 'DEPTID_FROM', index: 'DEPTID_FROM', classes: 'cell', stype: 'text', editable: false, width: 40 },
            { key: false, name: 'HOME_LOCATION_CD7', index: 'HOME_LOCATION_CD7', classes: 'cell', stype: 'text', editable: false, width: 40 },
            { key: false, name: 'CLASS_CD7', index: 'CLASS_CD7', classes: 'cell', stype: 'text', editable: false, width: 35 },
            { key: false, name: 'DEPTID', index: 'DEPTID', classes: 'cell', stype: 'text', editable: false, width: 40 },
            { key: false, name: 'WORK_LOCATION_CD7', index: 'WORK_LOCATION_CD7', classes: 'cell', stype: 'text', editable: false, width: 35 },
            { key: false, name: 'RESOURCE_SUB_CAT', index: 'RESOURCE_SUB_CAT', classes: 'cell', stype: 'text', editable: false, width: 40 },
            { key: false, name: 'WPD_ID7', index: 'WPD_ID7', classes: 'cell', stype: 'text', editable: false, width: 100 },
            { key: false, name: 'BULK_ALCTN_CD7', index: 'BULK_ALCTN_CD7', classes: 'cell', stype: 'text', editable: false, width: 100 },
           { key: false, name: 'TTD_QUANTITY7', index: 'TTD_QUANTITY7', classes: 'cell', stype: 'decimal', formatter: 'number', formatoptions: { decimalSeparator: ".", decimalPlaces: 1 }, editable: false, width: 100 },
            { key: false, name: 'TTD_DOMESTIC_AMT7', index: 'TTD_DOMESTIC_AMT7', classes: 'cell', stype: 'decimal', formatter: 'number', formatoptions: { decimalSeparator: ".", decimalPlaces: 2 }, editable: false, width: 100 },
            { key: false, name: 'setButton', index: 'setButton', editable: false, width: 40, formatter: setBtnFormatter }];
    
    var rowID = $('#rowId').val();
    var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
    var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
    var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));
    var mctrlineitem = $.extend(grid1, grid2, grid3);
        mctrlineitem.MCTR_NO = $('#MctrNo').val();
        mctrlineitem.OVRHD_BASE_YR_CD7 = '';
        mctrlineitem.HOME_LOCATION_CD7 = '';
        mctrlineitem.DEPTID_FROM = '';
        mctrlineitem.WORK_LOCATION_CD7 = '';
        mctrlineitem.DEPTID = '';
        mctrlineitem.RESOURCE_SUB_CAT = '';
        mctrlineitem.CLASS_CD7 = '';
        mctrlineitem.WPD_ID7 = '';
        mctrlineitem.BULK_ALCTN_CD7 = '';
   

if ($('#fyear').val() == (new Date).getFullYear()) {
        mctrObj.CreateJqGrid('ttdInquireGrid', '/MctrCreateForm/ttdInqCyrTtdInqCyrOnLoad', 'POST', mctrlineitem, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn, gridCompleteFn,null,null,"ttdInquirepager");
        $("#ttdInquireGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
}
    else { 
    mctrObj.CreateJqGrid('ttdInquireGrid', '/MctrCreateForm/ttdInqPyrTtdInqPyrOnLoad', 'POST', mctrlineitem, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn, gridCompleteFn, null, null,"ttdInquirepager");
    $("#ttdInquireGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
}



$('#ohyrBtn').click(function () {
        if ($('#OVRHD_BASE_YR_CD7_FILTER').val() != '') {
    document.getElementById('OVRHD_BASE_YR_CD7_FILTER').value = "";
       }
        else {
        document.getElementById('OVRHD_BASE_YR_CD7_FILTER').value = mctrlineitem.OH_BASE_YR_FROM;
    }
    });
$('#ptcBtn').click(function () {
    
        if ($('#PROJ_TRANS_CODE_FILTER').val() != '') {
    document.getElementById('PROJ_TRANS_CODE_FILTER').value = "";
}
    else {
        document.getElementById('PROJ_TRANS_CODE_FILTER').value = mctrlineitem.PROJ_TRANS_CODE_FROM;
    }
});
$('#hdptBtn').click(function () {
    
        if ($('#DEPTID_FROM_FILTER').val() != '') {
    document.getElementById('DEPTID_FROM_FILTER').value = "";
}
    else {
        document.getElementById('DEPTID_FROM_FILTER').value = mctrlineitem.HOME_DEPT_FROM;
    }
});
$('#hlBtn').click(function () {
    
        if ($('#HOME_LOCATION_CD7_FILTER').val() != '') {
            $('#HOME_LOCATION_CD7_FILTER').val('');
}
    else {
            $('#HOME_LOCATION_CD7_FILTER').val(mctrlineitem.HOME_LOC_FROM);
    }
});
$('#ccBtn').click(function () {

        if ($('#CLASS_CD7_FROM_FILTER').val() != '') {
    document.getElementById('CLASS_CD7_FROM_FILTER').value = "";
}
    else {
        document.getElementById('CLASS_CD7_FROM_FILTER').value = mctrlineitem.CLASS_CD_FROM;
    }
});
$('#wdptBtn').click(function () {
        if ($('#DEPTID_FILTER').val() != '') {
    document.getElementById('DEPTID_FILTER').value = "";
}
    else {
        document.getElementById('DEPTID_FILTER').value = mctrlineitem.WORK_DEPT_FROM;
    }
});
$('#wlBtn').click(function () {
        if ($('#WORK_LOCATION_CD7_FILTER').val() != '') {
    document.getElementById('WORK_LOCATION_CD7_FILTER').value = "";
}
    else {
        document.getElementById('WORK_LOCATION_CD7_FILTER').value = mctrlineitem.WORK_LOC_FROM;
    }
});
$('#rscBtn').click(function () {
        if ($('#RSC_FILTER').val() != '') {
    document.getElementById('RSC_FILTER').value = "";
}
    else {
        document.getElementById('RSC_FILTER').value = mctrlineitem.RSC_FROM;
    }
});
$('#wpdBtn').click(function () {
        if ($('#WPD_FILTER').val() != '') {
            $('#WPD_FILTER').val('');
}
    else {
            $('#WPD_FILTER').val(mctrlineitem.WPD_FROM);
    }
});
$('#blkBtn').click(function () {
        if ($('#BULK_ALCTN_CD7_FILTER').val() != '') {
    document.getElementById('BULK_ALCTN_CD7_FILTER').value = "";
}
    else {
        document.getElementById('BULK_ALCTN_CD7_FILTER').value = mctrlineitem.BULK_ALCTN_CD7;
    }
});

$('#filterBtn').click(function (e) {
    var filteredObjs = $.grep(initialGridData, function (obj) {
        var ovrHeadFlag = obj.OVRHD_BASE_YR_CD7 == $('#OVRHD_BASE_YR_CD7_FILTER').val().toUpperCase() || $('#OVRHD_BASE_YR_CD7_FILTER').val() == "";
        var homeLocFlag = obj.HOME_LOCATION_CD7 == $('#HOME_LOCATION_CD7_FILTER').val().toUpperCase() || $('#HOME_LOCATION_CD7_FILTER').val() == "";
        var deptIdFromFlag = obj.DEPTID_FROM == $('#DEPTID_FROM_FILTER').val().toUpperCase() || $('#DEPTID_FROM_FILTER').val() == "";
        var workLocFlag = obj.WORK_LOCATION_CD7 == $('#WORK_LOCATION_CD7_FILTER').val().toUpperCase() || $('#WORK_LOCATION_CD7_FILTER').val() == "";
        var deptIdFlag = obj.DEPTID == $('#DEPTID_FILTER').val().toUpperCase() || $('#DEPTID_FILTER').val() == "";
        var rscFlag = obj.RESOURCE_SUB_CAT == $('#RSC_FILTER').val().toUpperCase() || $('#RSC_FILTER').val() == "";
        var projTransCodeFlag = obj.PROJ_TRANS_CODE == $('#PROJ_TRANS_CODE_FILTER').val() || $('#PROJ_TRANS_CODE_FILTER').val() == "";
        var classCodeFlag = obj.CLASS_CD7 == $('#CLASS_CD7_FROM_FILTER').val().toUpperCase() || $('#CLASS_CD7_FROM_FILTER').val() == "";
        var wpdFlag = obj.WPD == $('#WPD_FILTER').val().toUpperCase() || $('#WPD_FILTER').val() == "";
        var bulkActionFlag = obj.BULK_ALCTN_CD7 == $('#BULK_ALCTN_CD7_FILTER').val().toUpperCase() || $('#BULK_ALCTN_CD7_FILTER').val() == "";
        OVRHD_BASE_YR_CD7 = $('#OVRHD_BASE_YR_CD7_FILTER').val() == undefined ? '' : $('#OVRHD_BASE_YR_CD7_FILTER').val();
        HOME_LOCATION_CD7 = $('#HOME_LOCATION_CD7_FILTER').val() == undefined ? '' : $('#HOME_LOCATION_CD7_FILTER').val().toUpperCase();
        DEPTID_FROM = $('#DEPTID_FROM_FILTER').val() == undefined ? '' : $('#DEPTID_FROM_FILTER').val().toUpperCase();
        WORK_LOCATION_CD7 = $('#WORK_LOCATION_CD7_FILTER').val() == undefined ? '' : $('#WORK_LOCATION_CD7_FILTER').val().toUpperCase();
        DEPTID = $('#DEPTID_FILTER').val() == undefined ? '' : $('#DEPTID_FILTER').val().toUpperCase();
        RESOURCE_SUB_CAT = $('#RSC_FILTER').val() == undefined ? '' : $('#RSC_FILTER').val().toUpperCase();
        CLASS_CD7 = $('#CLASS_CD7_FROM_FILTER').val() == undefined ? '' : $('#CLASS_CD7_FROM_FILTER').val().toUpperCase();
        WPD_ID7 = $('#WPD_FILTER').val() == undefined ? '' : $('#WPD_FILTER').val().toUpperCase();
        BULK_ALCTN_CD7 = $('#BULK_ALCTN_CD7_FILTER').val() == undefined ? '' : $('#BULK_ALCTN_CD7_FILTER').val().toUpperCase();

        return ovrHeadFlag && homeLocFlag && deptIdFromFlag && workLocFlag && deptIdFlag && rscFlag && projTransCodeFlag && classCodeFlag && wpdFlag && bulkActionFlag;
    });

    $("#ttdInquireGrid").clearGridData(true);
    $("#ttdInquireGrid").jqGrid('setGridParam', {
        datatype: 'local',
        data: filteredObjs
    }).trigger("reloadGrid");

});
});


function ttdInqCyrbutSetLitmWhenButtonPressed(rowData, gridRowId) {

    var mctrObj = new MCTR();
    var v_ok_flg = "";
    var globalpy_cy_status = "";
    var currentYear = new Date().getFullYear();
    //if (rowObject.fiscalYear < currentYear) {
    //    globalpy_cy_status = "PY";
    //}
    //else {
    //    globalpy_cy_status = "CY";
    //}
    var globalpy_cy_status = parseInt($('#fyear').val().trim()) == (new Date).getFullYear() ? 'CY' : 'PY';

    if ($.trim(rowData.ACTIVITY_ID) != "") {
        //if (trim(:global.g_line_record)!=""){
        if (($('#' + gridRowId + '_ACTIVITY_ID_FROM').val() == rowData.ACTIVITY_ID) && ($('#' + gridRowId + '_PROJECT_ID_FROM').val() == rowData.PROJECT_ID))// && ($('#' + gridRowId + '_ACCOUNT_FROM').val() == rowData.ACCOUNT) && ($('#' + gridRowId + '_BUGL_WORK_FROM').val() == rowData.BUSINESS_UNIT_GL) && ($('#' + gridRowId + '_BUGL_HOME_FROM').val() == rowData.BUS_UNIT_GL_FROM) && (globalpy_cy_status == 'CY' || rowID.FISCAL_YEAR < 2008 || (globalpy_cy_status == 'PY' && rowID.FISCAL_YEAR > 2007 && ($('#' + gridRowId + '_AFFILIATE_FROM').val() == rowData.AFFILIATE))))
        {
            if ($('#' + gridRowId + '_PROJ_TRANS_TYPE_FROM').val() == 'OTH') {
                if (rowData.PROJ_TRANS_TYPE == 'OTH') {
                    v_ok_flg = 'Y';
                }
                else if (!(rowData.PROJ_TRANS_TYPE).match("^LB")) {
                    // ptt oth is catch all for all ptt values except labor.
                    v_ok_flg = 'Y';
                }
                else {
                    v_ok_flg = 'N';
                }
            }
            else if ($('#' + gridRowId + '_PROJ_TRANS_TYPE_FROM').val() == rowData.PROJ_TRANS_TYPE ||
                 ($('#' + gridRowId + '_PROJ_TRANS_TYPE_FROM').val() == 'LBR') && (rowData.PROJ_TRANS_TYPE.match("^LB"))) {
                v_ok_flg = 'Y';
            }
            else {
                v_ok_flg = 'N';
            }

            if (v_ok_flg = 'Y') {
                if ($.trim($('#' + gridRowId + '_PROJ_TRANS_CODE_FROM').val()) == "" || ($.trim($('#' + gridRowId + '_PROJ_TRANS_CODE_FROM').val() != "" && ($.trim(rowData.PROJ_TRANS_CODE) != "" && $('#' + gridRowId + '_PROJ_TRANS_CODE_FROM').val() == rowData.PROJ_TRANS_CODE)))) {

                    //go_block("mctr_line_item")
                    //go_record(to_number(global.g_line_record))

                    var linehomedeptfrom = $.trim($('#' + gridRowId + '_HOME_DEPT_FROM').val());
                    var inqdeptfrom = rowData.DEPTID_FROM;
                    var linehomelocfrom = $.trim($('#' + gridRowId + '_HOME_LOC_FROM').val());
                    var inqlocfrom = rowData.HOME_LOCATION_CD7;

                    if ((linehomedeptfrom != "" && inqdeptfrom == "") || (linehomedeptfrom == "" && inqdeptfrom != "") || ((linehomedeptfrom != "" && inqdeptfrom != "") && (linehomedeptfrom != inqdeptfrom))) {
                        $('#' + gridRowId + '_HOME_DEPT_FROM').val(rowData.DEPTID_FROM);
                        $('#' + gridRowId + '_HOME_DEPT_FROM').attr('value',rowData.DEPTID_FROM);
                        //:global.f_home_dept := :home_dept_from;
                        if ((linehomelocfrom != "" && inqlocfrom == "") || (linehomelocfrom == "" && inqlocfrom != "") || (linehomelocfrom != "" && inqlocfrom != "") && (linehomelocfrom != inqlocfrom)) {
                            $('#' + gridRowId + '_HOME_LOC_FROM').val(rowData.HOME_LOCATION_CD7);
                            $('#' + gridRowId + '_HOME_LOC_FROM').attr('value',rowData.HOME_LOCATION_CD7);
                        }

                        $('#' + gridRowId + '_HOME_LOC_FROM').removeClass().addClass('red');
                    }

                    else if ((linehomelocfrom != "" && inqlocfrom == "") || (linehomelocfrom == "" && inqlocfrom != "") || (linehomelocfrom != "" && inqlocfrom != "" && (linehomelocfrom != inqlocfrom))) {
                        //home_loc_from = ttd_inq_pyr.home_location_cd7;
                        // global.f_home_loc = home_loc_from;
                        // set_item_instance_property("home_loc_from",current_record,visual_attribute,"field_red")
                        $('#' + gridRowId + '_HOME_LOC_FROM').val(rowData.HOME_LOCATION_CD7);
                        $('#' + gridRowId + '_HOME_LOC_FROM').attr('value',rowData.HOME_LOCATION_CD7);
                        $('#' + gridRowId + '_HOME_LOC_FROM').removeClass().addClass('red');
                    }

                    var lineclasscdfrom = $.trim($('#' + gridRowId + '_CLASS_CD_FROM').val());
                    var inqclasscd7 = rowData.CLASS_CD7;

                    if (inqclasscd7 == undefined || (inqclasscd7 == " ")) {
                        inqclasscd7 = "";
                    }
                    if ((lineclasscdfrom != "" && inqclasscd7 == "") || (lineclasscdfrom == "" && inqclasscd7 != "") || (lineclasscdfrom != "" && inqclasscd7 != "" && (lineclasscdfrom != inqclasscd7))) {
                        //class_cd_from = ttd_inq_pyr.class_cd7;
                        //global.f_class_cd = class_cd_from;
                        //set_item_instance_property("class_cd_from",current_record,visual_attribute,"field_red")
                        $('#' + gridRowId + '_CLASS_CD_FROM').val(rowData.CLASS_CD7);
                        $('#' + gridRowId + '_CLASS_CD_FROM').attr('value',rowData.CLASS_CD7);
                        $('#' + gridRowId + '_CLASS_CD_FROM').removeClass().addClass('red');
                    }

                    var lineworkdeptfrom = $.trim($('#' + gridRowId + '_WORK_DEPT_FROM').val());
                    var inqdepid = rowData.DEPTID;
                    var lineworklocfrom = $.trim($('#' + gridRowId + '_WORK_LOC_FROM').val());
                    var inqworklocationcd7 = rowData.WORK_LOCATION_CD7;

                    if ((lineworkdeptfrom != "" && inqdepid == "") || (lineworkdeptfrom == "" && inqdepid != "") || (lineworkdeptfrom != "" && inqdepid != "" && (lineworkdeptfrom != inqdepid))) {
                        // work_dept_from = ttd_inq_pyr.deptid;
                        //global.f_work_dept;
                        // = work_dept_from;
                        $('#' + gridRowId + '_WORK_DEPT_FROM').val(rowData.DEPTID);
                        $('#' + gridRowId + '_WORK_DEPT_FROM').attr('value',rowData.DEPTID);
                        if ((lineworklocfrom != "" && inqworklocationcd7 == "") || (lineworklocfrom == "" && inqworklocationcd7 != "") || (lineworklocfrom != "" && inqworklocationcd7 != "" && (lineworklocfrom != inqworklocationcd7))) {
                            // work_loc_from = ttd_inq_pyr.work_location_cd7;
                            // global.f_work_loc;
                            // = work_loc_from;
                            $('#' + gridRowId + '_WORK_LOC_FROM').val(rowData.WORK_LOCATION_CD7);
                            $('#' + gridRowId + '_WORK_LOC_FROM').attr('value',rowData.WORK_LOCATION_CD7);
                        }

                        //set_item_instance_property("work_loc_from",current_record,visual_attribute,"field_red")
                        $('#' + gridRowId + '_WORK_LOC_FROM').removeClass().addClass('red');
                    }

                    else if ((lineworklocfrom != "" && inqworklocationcd7 == "") || (lineworklocfrom == "" && inqworklocationcd7 != "") || (lineworklocfrom != "" && inqworklocationcd7 != "" && (lineworklocfrom != inqworklocationcd7))) {
                        // work_loc_from = ttd_inq_pyr.work_location_cd7;
                        // global.f_work_loc;
                        // = work_loc_from;
                        // set_item_instance_property("work_loc_from",current_record,visual_attribute,"field_red")
                        $('#' + gridRowId + '_WORK_LOC_FROM').val(rowData.WORK_LOCATION_CD7);
                        $('#' + gridRowId + '_WORK_LOC_FROM').attr('value',rowData.WORK_LOCATION_CD7);
                        $('#' + gridRowId + '_WORK_LOC_FROM').removeClass().addClass('red');
                    }

                    var linerscfrom = $.trim($('#' + gridRowId + '_RSC_FROM').val());
                    var inqresourcesubcat = rowData.RESOURCE_SUB_CAT;
                 
                    if (inqresourcesubcat == undefined || (inqresourcesubcat == " ")) {
                        inqresourcesubcat = "";
                    }

                    if ((linerscfrom != "" && inqresourcesubcat == "") || (linerscfrom == "" && inqresourcesubcat != "") || (linerscfrom != "" && inqresourcesubcat != "" && (linerscfrom != inqresourcesubcat))) {
                        //rsc_from = ttd_inq_pyr.resource_sub_cat;
                        //global.f_rsc;
                        // = rsc_from;
                        //set_item_instance_property("rsc_from",current_record,visual_attribute,"field_red")
                        $('#' + gridRowId + '_RSC_FROM').val(rowData.RESOURCE_SUB_CAT);
                        $('#' + gridRowId + '_RSC_FROM').attr('value',rowData.RESOURCE_SUB_CAT);
                        $('#' + gridRowId + '_RSC_FROM').removeClass().addClass('red');
                    }
                    var linewpdfrom = $.trim($('#' + gridRowId + '_WPD_FROM').val());
                    var inqwpdid7 = rowData.WPD_ID7;
                    if (inqwpdid7 == undefined || (inqwpdid7 == " ")) {
                        inqwpdid7 = "";
                    }

                    if ((linewpdfrom != "" && inqwpdid7 == "") || (linewpdfrom == "" && inqwpdid7 != "") || (linewpdfrom != "" && inqwpdid7 != "" && (linewpdfrom != inqwpdid7))) {
                        // wpd_from = ttd_inq_pyr.wpd_id7;
                        // global.f_wpd;
                        // = wpd_from;
                        //set_item_instance_property("wpd_from",current_record,visual_attribute,"field_red")
                        $('#' + gridRowId + '_WPD_FROM').val(rowData.WPD_ID7);
                        $('#' + gridRowId + '_WPD_FROM').removeClass().addClass('red');
                    }

                    var linebulkfrom = $.trim($('#' + gridRowId + '_BULK_FROM').val());
                    var inqbulkalctncd7 = rowData.BULK_ALCTN_CD7;
                    if (inqbulkalctncd7 == undefined || (inqbulkalctncd7 == " ")) {
                        inqbulkalctncd7 = "";
                    }

                    if ((linebulkfrom != "" && inqbulkalctncd7 == "") || (linebulkfrom == "" && inqbulkalctncd7 != "") || (linebulkfrom != "" && inqbulkalctncd7 != "" && (linebulkfrom != inqbulkalctncd7))) {
                        //bulk_from = ttd_inq_pyr.bulk_alctn_cd7;
                        // global.f_bulk;
                        //= bulk_from;
                        //set_item_instance_property("bulk_from",current_record,visual_attribute,"field_red")
                        $('#' + gridRowId + '_BULK_FROM').val(rowData.BULK_ALCTN_CD7);
                        $('#' + gridRowId + '_BULK_FROM').attr('value',rowData.BULK_ALCTN_CD7);
                        $('#' + gridRowId + '_BULK_FROM').removeClass().addClass('red');
                    }
                    var projtranstypefrom = $('#' + gridRowId + '_PROJ_TRANS_TYPE_FROM').val();
                    var projtranscodefrom = $('#' + gridRowId + '_PROJ_TRANS_CODE_FROM').val();

                    if ((projtranstypefrom == "LBR" && (projtranscodefrom == "STR" || projtranscodefrom == "OTS")) && ($('#' + gridRowId + '_QUANTITY_FROM').val() == 0 && rowData.TTD_QUANTITY7 != 0) && ($('#' + gridRowId + '_AMOUNT_FROM').val() == 0 && rowData.TTD_DOMESTIC_AMT7 != 0)) {
                        $('#' + gridRowId + '_QUANTITY_FROM').val(rowData.TTD_QUANTITY7 * -1);
                        $('#' + gridRowId + '_QUANTITY_TO').val(rowData.TTD_QUANTITY7);
                        $('#' + gridRowId + '_AMOUNT_FROM').val(rowData.TTD_DOMESTIC_AMT7 * -1);
                        $('#' + gridRowId + '_AMOUNT_TO').val(rowData.TTD_DOMESTIC_AMT7);
                        //set_item_instance_property("quantity_from",current_record,visual_attribute,"field_red")
                        $('#' + gridRowId + '_QUANTITY_FROM').removeClass().addClass('red');
                    }

                    else if (($('#' + gridRowId + '_QUANTITY_FROM').val() == 0 && $('#' + gridRowId + '_AMOUNT_FROM').val() == 0 && rowData.TTD_DOMESTIC_AMT7 != 0)) {
                        $('#' + gridRowId + '_AMOUNT_FROM').val(rowData.TTD_DOMESTIC_AMT7 * -1);
                        $('#' + gridRowId + '_AMOUNT_TO').val(rowData.TTD_DOMESTIC_AMT7);
                        //set_item_instance_property("amount_from",current_record,visual_attribute,"field_red")
                        $('#' + gridRowId + '_AMOUNT_FROM').removeClass().addClass('red');
                    }

                    // go_block("ttd_inq_pyr")
                    //go_item("ttd_inq_pyr.but_close_inq")
                }

                else {
                    mctrObj.showDialog($("#dialog-box"), "the selected inquire row ptc value does not match up to selected line item. filter by ptc and try again.", "error");
                }
            }

            else {
                mctrObj.showDialog($("#dialog-box"), "the selected inquire row ptt value does not match up to selected line item ptt value.", "error");
            }
        }

        else {
            mctrObj.showDialog($("#dialog-box"), "the selected inquire row does not match up to selected line item entry. reset and try again.", "error");
        }
        //}

        // else
        //{
        //   mctrObj.showDialog($("#dialog-box"), "key inquire information is missing for selected line item entry. please reset and try inquiry again.", "error");
        //}
    }
    
    else {
        mctrObj.showDialog($("#dialog-box"), "the activity id selection entry is missing. please reset and try inquiry again.", "error");
    }
}