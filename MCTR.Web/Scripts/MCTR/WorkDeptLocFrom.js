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
        var rowData = $('#WorkDeptLocFromGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['DEPT', 'LOC', 'ABU', 'POOL', 'RSC', 'Eff Date', 'Current Status'];
    var colModel = [
        { key: false, name: 'DEPTID', index: 'DEPTID', width: 95, editable: true, search: true },
        { key: false, name: 'ACCTG_LOC_CD7', index: 'ACCTG_LOC_CD7', width: 50, editable: true },
        { key: false, name: 'SETID', index: 'SETID', width: 70, editable: true },
        { key: false, name: 'ALLOW_POOL_CD7', index: 'ALLOW_POOL_CD7', width: 100, editable: true },
        { key: false, name: 'RESOURCE_SUB_CAT', index: 'RESOURCE_SUB_CAT', width: 100, editable: true },
        { key: false, name: 'EFFDT', index: 'EFFDT', width: 100, classes: 'uppercase', editable: true, formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd-M-y' } },
        { key: false, name: 'EFF_STATUS', index: 'EFF_STATUS', width: 50, editable: true }
    ];
    mctrObj.CreateJqGrid('WorkDeptLocFromGrid', '/MctrCreateForm/WorkDeptLocFromLOVJSON', 'POST', mctrLineItem, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#WorkDeptLocFromGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#WorkDeptLocFromOkBtn').click(function () {
    
        var rowId = $('#rowId').val();
        // box.modal("hide");
        var home_dept_from = $('#' + rowId + '_HOME_DEPT_FROM').val();
        var global_home_dept_from = $('#' + rowId + '_HOME_DEPT_FROM').attr('value');
        var global_work_loc_from = $('#' + rowId + '_WORK_LOC_FROM').attr('value');

        var global_work_dept_from = $('#' + rowId + '_WORK_DEPT_FROM').attr('value');
        var work_dept_red_flg_from = ''
        var proj_trans_type_from = $('#' + rowId + '_PROJ_TRANS_TYPE_FROM').val();
        var proj_trans_code_from = $('#' + rowId + '_PROJ_TRANS_CODE_FROM').val();
        var amount_from = $('#' + rowId + '_AMOUNT_FROM').val();
        var amount_to = $('#' + rowId + '_AMOUNT_TO').val();
        var class_cd_from = $('#' + rowId + '_CLASS_CD_FROM').val();
        var global_class_cd_from = $('#' + rowId + '_CLASS_CD_FROM').attr('value');
        var rsc_from = $('#' + rowId + '_RSC_FROM').val();
        var global_rsc_from = $('#' + rowId + '_RSC_FROM').attr('value');
        var work_dept_from = $('#' + rowId + '_WORK_DEPT_FROM').val();
        var work_loc_from = $('#' + rowId + '_WORK_LOC_FROM').val();
        var home_loc_from = $('#' + rowId + '_HOME_LOC_FROM').val();
        var work_pool_from = $('#' + rowId + '_WORK_POOL_FROM').val();
        var home_pool_from = $('#' + rowId + '_HOME_POOL_FROM').val();
        var labor_rate_cd7_from = $('#' + rowId + 'LABOR_RATE_CD7_FROM').val();
        var dept_status = '';
        var closeFlag = false;

        if ((work_dept_from == '' && global_work_dept_from != '') || (!$.isEmptyObject(rowObject))) {

            $('#' + rowId + '_ttdValue').addClass("white");
            $('#' + rowId + '_yearValue').addClass("white");
            $('#' + rowId + '_WORK_DEPT_FROM').removeClass().addClass("white");
            $('#' + rowId + '_WORK_LOC_FROM').removeClass().addClass("white");
            // if ($('#' + rowId + '_WORK_DEPT_FROM').val() != '' && $('#' + rowId + '_WORK_LOC_FROM').val() != '') {
            if ($('#' + rowId + '_WORK_DEPT_FROM').val() != '' && rowObject.ACCTG_LOC_CD7 != '') {
                if (rowObject.EFF_STATUS == "I" && ($('#' + rowId + '_WORK_DEPT_FROM').val() != '')) {
                    $('#' + rowId + '_WORK_DEPT_FROM').attr('red-flag', 'Y');
                    $('#' + rowId + '_WORK_DEPT_FROM').removeClass().addClass("orange");
                }
                else {
                    $('#' + rowId + '_WORK_DEPT_FROM').attr('red-flag', 'N');
                    $('#' + rowId + '_WORK_DEPT_FROM').removeClass().addClass("white");
                }
                // lov selection overrides the rsc value if already entered by non-labor class code logic.
                if (proj_trans_type_from != 'LBR') {
                    $('#' + rowId + '_RSC_FROM').val(global_rsc_from);
                    $('#' + rowId + '_RSC_FROM').attr('value', global_rsc_from);
                    rowObject.RESOURCE_SUB_CAT = global_rsc_from;
                    closeFlag = true;
                }
                else {
                    if (global_rsc_from != '') {
                        if (global_rsc_from != rowObject.RESOURCE_SUB_CAT || rowObject.RESOURCE_SUB_CAT == '') {
                            bootbox.confirm("Do you want to accept LBR Work Dept RSC overriding LBR Home Dept RSC? Click YES button to accept.", function (result) {
                                if (result) {
                                    $('#' + rowId + '_RSC_FROM').removeClass().addClass("white");
                                    $('#' + rowId + '_WORK_DEPT_FROM').val(rowObject.DEPTID);
                                    $('#' + rowId + '_WORK_DEPT_FROM').attr('value', rowObject.DEPTID);
                                    $('#' + rowId + '_WORK_LOC_FROM').val(rowObject.ACCTG_LOC_CD7);
                                    $('#' + rowId + '_WORK_LOC_FROM').attr('value', rowObject.ACCTG_LOC_CD7);
                                    $('#' + rowId + '_WORK_POOL_FROM').val(rowObject.ALLOW_POOL_CD7);
                                    $('#' + rowId + '_WORK_POOL_FROM').attr('value', rowObject.ALLOW_POOL_CD7);
                                    $('#' + rowId + '_RSC_FROM').val(rowObject.RESOURCE_SUB_CAT);
                                    $('#' + rowId + '_RSC_FROM').attr('value', rowObject.RESOURCE_SUB_CAT);
                                    $(this).parents().find('.bootbox').modal('hide');
                                }
                                else {

                                    $('#' + rowId + '_WORK_DEPT_FROM').val(rowObject.DEPTID);
                                    $('#' + rowId + '_WORK_DEPT_FROM').attr('value', rowObject.DEPTID);
                                    $('#' + rowId + '_WORK_LOC_FROM').val(rowObject.ACCTG_LOC_CD7);
                                    $('#' + rowId + '_WORK_LOC_FROM').attr('value', rowObject.ACCTG_LOC_CD7);
                                    $('#' + rowId + '_WORK_POOL_FROM').val(rowObject.ALLOW_POOL_CD7);
                                    $('#' + rowId + '_WORK_POOL_FROM').attr('value', rowObject.ALLOW_POOL_CD7);
                                    $('#' + rowId + '_RSC_FROM').val(global_rsc_from);
                                    $('#' + rowId + '_RSC_FROM').attr('value', global_rsc_from);
                                    $(this).parents().find('.bootbox').modal('hide');
                                }
                            });
                        }
                    }
                }
            }
            else {
                $('#' + rowId + '_WORK_DEPT_FROM').attr('red-flag', 'N');
                $('#' + rowId + '_WORK_POOL_FROM').val("");
                $('#' + rowId + '_WORK_POOL_FROM').attr('value', '');
                rowObject.ALLOW_POOL_CD7 = "";
                $('#' + rowId + '_WORK_DEPT_FROM').removeClass().addClass("white");
                closeFlag = true;
            }
        }
        $('#' + rowId + '_WORK_DEPT_FROM').val(rowObject.DEPTID);
        $('#' + rowId + '_WORK_POOL_FROM').attr('value', rowObject.DEPTID);
        $('#' + rowId + '_WORK_LOC_FROM').val(rowObject.ACCTG_LOC_CD7);
        $('#' + rowId + '_WORK_LOC_FROM').attr('value', rowObject.ACCTG_LOC_CD7);
        $('#' + rowId + '_WORK_POOL_FROM').val(rowObject.ALLOW_POOL_CD7);
        $('#' + rowId + '_WORK_POOL_FROM').attr('value', rowObject.ALLOW_POOL_CD7);
        $('#' + rowId + '_RSC_FROM').val(rowObject.RESOURCE_SUB_CAT);
        $('#' + rowId + '_RSC_FROM').attr('value', rowObject.RESOURCE_SUB_CAT);

        if (closeFlag) {
            $('#dialog-box').modal("hide");
            $('#mctrModal').modal("hide");
        }
    });
    $('#WorkDeptLocFromcancelBtn').click(function () {
        $('#' + rowId + '_WORK_LOC_FROM').val($('#' + rowId + '_WORK_LOC_FROM').attr('value'));
    });
    mctrObj.searchGrid('WorkDeptLocFromGrid');
});