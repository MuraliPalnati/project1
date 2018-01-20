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
    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#WorkDeptLocToGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['Dept', 'Loc', 'ABU', 'Pool', 'RSC', 'Eff Date', 'Current Status'];
    var colModel = [{ key: false, name: 'DEPTID', index: 'DEPTID', width: 95, editable: true, search: true },
    { key: false, name: 'ACCTG_LOC_CD7', index: 'ACCTG_LOC_CD7', width: 50, editable: true },
    { key: false, name: 'SETID', index: 'SETID', width: 70, editable: true },
    { key: false, name: 'ALLOW_POOL_CD7', index: 'ALLOW_POOL_CD7', width: 100, editable: true },
    { key: false, name: 'RESOURCE_SUB_CAT', index: 'RESOURCE_SUB_CAT', width: 100, editable: true },
    { key: false, name: 'EFFDT', index: 'EFFDT', width: 100, classes: 'uppercase', editable: true, formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd-M-y' } },
    { key: false, name: 'EFF_STATUS', index: 'EFF_STATUS', width: 50, editable: true }];
    mctrObj.CreateJqGrid('WorkDeptLocToGrid', '/MctrCreateForm/WorkDeptLocToLOVJson', 'POST', mctrLineItem, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#WorkDeptLocToGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});

    $('#WorkDeptLocToOkBtn').click(function () {
   
        //if (!$.isEmptyObject(rowObject)) {
        var rowId = $('#rowId').val();

        var home_dept_from = $('#' + rowId + '_HOME_DEPT_FROM').val();
        var home_dept_to = $('#' + rowId + '_HOME_DEPT_TO').val();
        var global_home_dept_from = $('#' + rowId + '_HOME_DEPT_FROM').attr('value');
        var global_home_dept_to = $('#' + rowId + '_HOME_DEPT_TO').attr('value');
        var global_work_dept_from = $('#' + rowId + '_WORK_DEPT_FROM').attr('value');
        var global_work_dept_to = $('#' + rowId + '_WORK_DEPT_TO').attr('value');
        var proj_trans_type_to = $('#' + rowId + '_PROJ_TRANS_TYPE_TO').val();
        var amount_from = $('#' + rowId + '_AMOUNT_FROM').val();
        var amount_to = $('#' + rowId + '_AMOUNT_TO').val();
        var class_cd_from = $('#' + rowId + '_CLASS_CD_FROM').val();
        var global_class_cd_from = $('#' + rowId + '_CLASS_CD_FROM').attr('value');
        var rsc_from = $('#' + rowId + '_RSC_FROM').val();
        var rsc_to = $('#' + rowId + '_RSC_TO').val();
        var global_rsc_from = $('#' + rowId + '_RSC_FROM').attr('value');
        var global_rsc_to = $('#' + rowId + '_RSC_TO').attr('value');
        var work_dept_from = $('#' + rowId + '_WORK_DEPT_FROM').val();
        var work_dept_to = $('#' + rowId + '_WORK_DEPT_TO').val();
        var work_loc_from = $('#' + rowId + '_WORK_LOC_FROM').val();
        var work_loc_to = $('#' + rowId + '_WORK_LOC_TO').val();
        var global_work_loc_to = $('#' + rowId + '_WORK_LOC_TO').attr('value');
        var home_loc_from = $('#' + rowId + '_HOME_LOC_FROM').val();
        var home_loc_to = $('#' + rowId + '_HOME_LOC_TO').val();
        var work_pool_from = $('#' + rowId + '_WORK_POOL_FROM').val();
        var work_pool_to = $('#' + rowId + '_WORK_POOL_TO').val();
        var home_pool_from = $('#' + rowId + '_HOME_POOL_FROM').val();
        var home_pool_to = $('#' + rowId + '_HOME_POOL_TO').val();
        var labor_rate_cd7_from = $('#' + rowId + 'LABOR_RATE_CD7_FROM').val();
        var dept_status = rowObject.EFF_STATUS;//Need to Check
        var closeFlag = false;
       // var flagGlobal = (global_home_dept_to == '');
       // var flagWorkDept = home_dept_to != '' && home_dept_to == work_dept_to && home_loc_to != '' && home_loc_to == work_loc_to;
        if ((work_loc_to == '' && global_work_loc_to != '') || (!$.isEmptyObject(rowObject))) {

            $('#' + rowId + '_WORK_LOC_TO').removeClass().addClass("white");
            if ($('#' + rowId + '_WORK_DEPT_TO').val() != '') {

                if (dept_status == 'I' && work_dept_to != '') {
                    $('#' + rowId + '_WORK_DEPT_TO').attr('red-flag', 'Y');
                    $('#' + rowId + '_WORK_DEPT_TO').removeClass().addClass("orange");
                }
                else {
                    $('#' + rowId + '_WORK_DEPT_TO').attr('red-flag', 'N');
                    $('#' + rowId + '_WORK_DEPT_TO').removeClass().addClass("white");
                }

                if (proj_trans_type_to != 'LBR') {
                    $('#' + rowId + '_RSC_TO').val(global_rsc_to);
                    $('#' + rowId + '_RSC_TO').attr('value', global_rsc_to);
                    rowObject.RESOURCE_SUB_CAT = global_rsc_to;
                    closeFlag = true;
                }
                else {
                    if (global_rsc_to != '') {
                        if (global_rsc_to != rowObject.RESOURCE_SUB_CAT || rowObject.RESOURCE_SUB_CAT == '') {
                            bootbox.confirm("Do you want to accept LBR Work Dept RSC overriding LBR Home Dept RSC? Click YES button to accept.", function (result) {
                                if (result) {
  
                                    $('#' + rowId + '_WORK_DEPT_TO').val(rowObject.DEPTID);
                                    $('#' + rowId + '_WORK_DEPT_TO').attr('value', rowObject.DEPTID);
                                    $('#' + rowId + '_WORK_LOC_TO').val(rowObject.ACCTG_LOC_CD7);
                                    $('#' + rowId + '_WORK_LOC_TO').attr('value', rowObject.ACCTG_LOC_CD7);
                                    $('#' + rowId + '_WORK_POOL_TO').val(rowObject.ALLOW_POOL_CD7);
                                    $('#' + rowId + '_WORK_POOL_TO').attr('value', rowObject.ALLOW_POOL_CD7);
                                    $('#' + rowId + '_RSC_TO').val(rowObject.RESOURCE_SUB_CAT);
                                    $('#' + rowId + '_RSC_TO').attr('value', rowObject.RESOURCE_SUB_CAT);
                                    $(this).parents().find('.bootbox').modal('hide');
                                }
                                else
                                {
                                  //  $('#' + rowId + '_RSC_TO').removeClass().addClass("white");
                                    $('#' + rowId + '_WORK_DEPT_TO').val(rowObject.DEPTID);
                                    $('#' + rowId + '_WORK_DEPT_TO').attr('value', rowObject.DEPTID);
                                    $('#' + rowId + '_WORK_LOC_TO').val(rowObject.ACCTG_LOC_CD7);
                                    $('#' + rowId + '_WORK_LOC_TO').attr('value', rowObject.ACCTG_LOC_CD7);
                                    $('#' + rowId + '_WORK_POOL_TO').val(rowObject.ALLOW_POOL_CD7);
                                    $('#' + rowId + '_WORK_POOL_TO').attr('value', rowObject.ALLOW_POOL_CD7);
                                    $('#' + rowId + '_RSC_TO').val(global_rsc_from);
                                    $('#' + rowId + '_RSC_TO').attr('value', global_rsc_from);
                                    $(this).parents().find('.bootbox').modal('hide');
                                }
                            });
                        }
                    }
                }
            }
            else {
                $('#' + rowId + '_WORK_DEPT_TO').attr('red-flag', 'N');
                $('#' + rowId + '_WORK_POOL_TO').val("");
                rowObject.ALLOW_POOL_CD7 = "";
                $('#' + rowId + '_WORK_POOL_TO').attr('value', '');
                $('#' + rowId + '_WORK_DEPT_TO').removeClass().addClass("white");
                closeFlag = true;
            }
        }
        $('#' + rowId + '_WORK_DEPT_TO').val(rowObject.DEPTID);
        $('#' + rowId + '_WORK_DEPT_TO').attr('value', rowObject.DEPTID);
        $('#' + rowId + '_WORK_LOC_TO').val(rowObject.ACCTG_LOC_CD7);
        $('#' + rowId + '_WORK_LOC_TO').attr('value', rowObject.ACCTG_LOC_CD7);
        $('#' + rowId + '_WORK_POOL_TO').val(rowObject.ALLOW_POOL_CD7);
        $('#' + rowId + '_WORK_POOL_TO').attr('value', rowObject.ALLOW_POOL_CD7);
        $('#' + rowId + '_RSC_TO').val(rowObject.RESOURCE_SUB_CAT);
        $('#' + rowId + '_RSC_TO').attr('value', rowObject.RESOURCE_SUB_CAT);
        if (closeFlag) {
            $(this).parents().find('.bootbox').modal('hide');
            //  $('.bootbox').modal('hide');
            //   $('#dialog-box').modal("hide");
        }

        //}
        //else {
        //    mctrObj.showDialog($('#dialog-box'), "You have not selected a value from list", "warning");
        //}
    });

    $('#WorkDeptLocTocancelBtn').click(function () {
        $('#' + rowId + '_WORK_LOC_TO').val($('#' + rowId + '_WORK_LOC_TO').attr('value'));
    });
    mctrObj.searchGrid('ListworkdepttoGrid');

});