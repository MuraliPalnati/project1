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

    mctrLineItem.COW = $('#COW').val();
    mctrLineItem.PERIOD_TO = $('#PeriodTo').val();
    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#HomeDeptLocToGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['Dept', 'BU', 'Loc', 'Pool', 'Labor Rate', 'Class Code', 'RSC', 'Eff Date', 'Current Status'];
    var colModel = [{ key: false, name: 'DEPTID', index: 'DEPTID', width: 65, search: true, editable: false },
        { key: false, name: 'SETID', index: 'SETID', width: 55, editable: false },
        { key: false, name: 'ACCTG_LOC_CD7', index: 'ACCTG_LOC_CD7  ', width: 55, editable: false },
        { key: false, name: 'ALLOW_POOL_CD7', index: 'ALLOW_POOL_CD7', width: 55, editable: false },
        { key: false, name: 'LABOR_RATE_CD7', index: 'LABOR_RATE_CD7', width: 55, editable: false },
    { key: false, name: 'CLASS_CD', index: 'CLASS_CD', width: 60, editable: false },
        { key: false, name: 'RESOURCE_SUB_CAT', index: 'RESOURCE_SUB_CAT', width: 60, editable: false },
        { key: false, name: 'EFFDT', index: 'EFFDT', width: 100, formatter: 'date',classes:'uppercase', formatoptions: { srcformat: 'd/m/Y', newformat: 'd-M-y' }, editable: false },
        { key: false, name: 'EFF_STATUS', index: 'EFF_STATUS', width: 60, editable: false }];
    mctrObj.CreateJqGrid('HomeDeptLocToGrid', '/MctrCreateForm/HomeDeptLocToJson', 'POST', mctrLineItem, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);

    $('#HomeDeptLocToOkBtn').click(function () {
       
        $('#formOrToFlag').val('to');
        var rowId = $('#rowId').val();
        var home_dept_to = $('#' + rowId + '_HOME_DEPT_TO').val();
        var global_home_loc_to = $('#' + rowId + '_HOME_LOC_TO').attr('value');
        var global_home_dept_to = $('#' + rowId + '_HOME_DEPT_TO').attr('value');
        var proj_trans_type_to = $('#' + rowId + '_PROJ_TRANS_TYPE_TO').val();
        var proj_trans_code_to = $('#' + rowId + '_PROJ_TRANS_CODE_TO').val();
        var amount_from = $('#' + rowId + '_AMOUNT_FROM').val();
        var amount_to = $('#' + rowId + '_AMOUNT_TO').val();
        var class_cd_to = $('#' + rowId + '_CLASS_CD_TO').val();
        var global_class_cd_to = $('#' + rowId + '_CLASS_CD_TO').attr('value');
        var rsc_to = $('#' + rowId + '_RSC_TO').val();
        var global_rsc_to = $('#' + rowId + '_RSC_TO').attr('value');
        var work_dept_to = $('#' + rowId + '_WORK_DEPT_TO').val();
        var work_loc_to = $('#' + rowId + '_WORK_LOC_TO').val();
        var home_loc_to = $('#' + rowId + '_HOME_LOC_TO').val();
        var work_pool_to = $('#' + rowId + '_WORK_POOL_TO').val();
        var home_pool_to = $('#' + rowId + '_HOME_POOL_TO').val();
        var labor_rate_cd7_to = $('#' + rowId + 'LABOR_RATE_CD7_TO').val();
        var dept_status = '';
        var quantity_from = $('#' + rowId + '_QUANTITY_FROM').val();
        var flagGlobal = (global_home_dept_to == '');
        //var flagWorkDept = home_dept_to != '' && home_dept_to == work_dept_to && home_loc_to != '' && home_loc_to == work_loc_to;
        var flagWorkDept = (rowObject.DEPTID != '' && (work_dept_to == '' || work_loc_to == '' || work_pool_to == '' || work_dept_to != rowObject.DEPTID || work_loc_to != rowObject.ACCTG_LOC_CD7 || work_pool_to != rowObject.ALLOW_POOL_CD7));

        if ((!$.isEmptyObject(rowObject)) || ($('#' + rowId + '_HOME_LOC_TO').val() == "" && global_home_loc_to != "")) {
            $('#' + rowId + '_HOME_DEPT_TO').attr('red-flag', 'N');
            $('#' + rowId + '_HOME_DEPT_TO').removeClass().addClass("white");
            $('#' + rowId + '_HOME_LOC_TO').removeClass().addClass("white");

            if (home_dept_to != '') {
                if (rowObject.EFF_STATUS == 'I') {
                    $('#' + rowId + '_HOME_DEPT_TO').removeClass().addClass("orange");
                    $('#' + rowId + '_HOME_DEPT_TO').attr('red-flag', 'Y');
                    mctrObj.showDialog($('#dialog-box'), 'warning: inactive department/location combination selected.', 'warning');

                }
                if (proj_trans_type_to == 'LBR') {
                    if (proj_trans_code_to == 'PRM') {
                        rowObject.LABOR_RATE_CD7 = "";
                        $('#' + rowId + '_LABOR_RATE_CD7_TO').val('');
                        $('#' + rowId + '_LABOR_RATE_CD7_TO').attr('value', '');
                       
                        $('#' + rowId + '_QUANTITY_TO').val('0.0');
                        $('#' + rowId + '_QUANTITY_FROM').val('0.0');
                        if (parseFloat(amount_to) != 0) {
                            $('#' + rowId + '_AMOUNT_TO').removeClass().addClass('red');
                        } else if (parseFloat(amount_from) != 0) {
                                $('#' + rowId + '_AMOUNT_FROM').removeClass().addClass('red');

                            }

                        }
                    if (rowObject.CLASS_CD != '' && global_class_cd_to != '' && global_class_cd_to != rowObject.CLASS_CD) {
                        $('#' + rowId + '_CLASS_CD_TO').removeClass().addClass('red');
                    } else {
                        $('#' + rowId + '_CLASS_CD_TO').removeClass().addClass('white');
                    }
                    if (rowObject.RESOURCE_SUB_CAT != '' && global_rsc_to != '' && global_rsc_to != rowObject.RESOURCE_SUB_CAT) {
                        $('#' + rowId + '_RSC_TO').removeClass().addClass('red');
                    } else {
                       
                        $('#' + rowId + '_RSC_TO').removeClass().addClass('white');
                    }
                    //} 
                }
                else {
                    $('#' + rowId + '_LABOR_RATE_CD7_TO').val('');
                    rowObject.LABOR_RATE_CD7 = "";
                    $('#' + rowId + '_CLASS_CD_TO').val(global_class_cd_to);
                    $('#' + rowId + '_RSC_TO').val(global_rsc_to);
                    rowObject.CLASS_CD = global_class_cd_to;
                    rowObject.RESOURCE_SUB_CAT = global_rsc_to;
                }
                if ((work_dept_to == '' && work_loc_to == '') || (work_dept_to == rowObject.DEPTID && work_loc_to == '')) {
                    $('#' + rowId + '_WORK_DEPT_TO').val(rowObject.DEPTID);
                    $('#' + rowId + '_WORK_LOC_TO').val(rowObject.ACCTG_LOC_CD7);
                    $('#' + rowId + '_WORK_POOL_TO').val(rowObject.ALLOW_POOL_CD7);

                    if (rowObject.EFF_STATUS == 'I') {
                        $('#' + rowId + '_WORK_DEPT_TO').attr('red-flag', 'Y');
                        $('#' + rowId + '_WORK_DEPT_TO').removeClass().addClass('orange');
                    } else {
                        $('#' + rowId + '_WORK_DEPT_TO').attr('red-flag', 'N');
                        $('#' + rowId + '_WORK_DEPT_TO').removeClass().addClass('white');
                    }
                    $('#' + rowId + '_WORK_LOC_TO').removeClass().addClass('white');
                }
                else if (rowObject.DEPTID != '' && (work_dept_to == '' || work_loc_to == '' || work_pool_to == '' || work_dept_to != rowObject.DEPTID || work_loc_to != rowObject.ACCTG_LOC_CD7 || work_pool_to != rowObject.ALLOW_POOL_CD7)) {
                    bootbox.confirm("Do you want to override Work Department/Location using Home Department/Location selection? Click OK button to accept.", function (result) {
                        if (result != "") {

                            $('#' + rowId + '_WORK_DEPT_TO').val(rowObject.DEPTID);
                            $('#' + rowId + '_WORK_DEPT_TO').attr('value', rowObject.DEPTID);
                            $('#' + rowId + '_WORK_LOC_TO').val(rowObject.ACCTG_LOC_CD7);
                            $('#' + rowId + '_WORK_LOC_TO').attr('value', rowObject.ACCTG_LOC_CD7);
                            $('#' + rowId + '_WORK_POOL_TO').val(rowObject.ALLOW_POOL_CD7);
                            $('#' + rowId + '_WORK_POOL_TO').attr('value', rowObject.ALLOW_POOL_CD7);
                            $('#' + rowId + '_LABOR_RATE_CD7_TO').val(rowObject.LABOR_RATE_CD7);
                            $('#' + rowId + '_LABOR_RATE_CD7_TO').attr('value', rowObject.LABOR_RATE_CD7);
                            $('#' + rowId + '_CLASS_CD_TO').val(rowObject.CLASS_CD);
                            $('#' + rowId + '_CLASS_CD_TO').attr('value', rowObject.CLASS_CD);
                            $('#' + rowId + '_RSC_TO').val(rowObject.RESOURCE_SUB_CAT);
                            $('#' + rowId + '_RSC_TO').attr('value', rowObject.RESOURCE_SUB_CAT);

                            if (rowObject.EFF_STATUS == 'I') {
                                $('#' + rowId + '_WORK_DEPT_TO').attr('red-flag', 'Y');
                                $('#' + rowId + '_WORK_DEPT_TO').removeClass().addClass('orange');
                            } else {
                                $('#' + rowId + '_WORK_DEPT_TO').attr('red-flag', 'N');
                                $('#' + rowId + '_WORK_DEPT_TO').removeClass().addClass('white');
                            }
                            $('#' + rowId + '_WORK_LOC_TO').removeClass().addClass('white');
                            $(this).parents().find('.bootbox').modal('hide');
                        }
                        else {

                            $('#' + rowId + '_HOME_POOL_TO').val(rowObject.ALLOW_POOL_CD7);
                            $('#' + rowId + '_HOME_POOL_TO').attr('value', rowObject.ALLOW_POOL_CD7);
                            $('#' + rowId + '_HOME_DEPT_TO').val(rowObject.DEPTID);
                            $('#' + rowId + '_HOME_DEPT_TO').attr('value', rowObject.DEPTID);
                            $('#' + rowId + '_HOME_LOC_TO').val(rowObject.ACCTG_LOC_CD7);
                            $('#' + rowId + '_HOME_LOC_TO').attr('value', rowObject.ACCTG_LOC_CD7);
                            $('#' + rowId + '_LABOR_RATE_CD7_TO').val(rowObject.LABOR_RATE_CD7);
                            $('#' + rowId + '_LABOR_RATE_CD7_TO').attr('value', rowObject.LABOR_RATE_CD7);
                            $('#' + rowId + '_CLASS_CD_TO').val(rowObject.CLASS_CD);
                            $('#' + rowId + '_CLASS_CD_TO').attr('value', rowObject.CLASS_CD);
                            $('#' + rowId + '_RSC_TO').val(rowObject.RESOURCE_SUB_CAT);
                            $('#' + rowId + '_RSC_TO').attr('value', rowObject.RESOURCE_SUB_CAT);


                            $('#' + rowId + '_WORK_POOL_TO').val(work_pool_to);
                            $('#' + rowId + '_WORK_POOL_TO').attr('value', work_pool_to);
                            $('#' + rowId + '_WORK_DEPT_TO').val(work_dept_to);
                            $('#' + rowId + '_WORK_DEPT_TO').attr('value', work_dept_to);
                            $('#' + rowId + '_WORK_LOC_TO').val(work_loc_to);
                            $('#' + rowId + '_WORK_LOC_TO').attr('value', work_loc_to);
                            $(this).parents().find('.bootbox').modal('hide');


                        }
                    });
                }

                else {
                    if (rowObject.DEPTID != '' && rowObject.DEPTID == work_dept_to && rowObject.ALLOW_POOL_CD7 != '' && rowObject.ALLOW_POOL_CD7 == work_loc_to) {
                        if (rowObject.EFF_STATUS == 'I') {
                            $('#' + rowId + '_WORK_DEPT_TO').attr('red-flag', 'Y');
                            $('#' + rowId + '_WORK_DEPT_TO').removeClass().addClass('orange');
                        }
                        else {
                            $('#' + rowId + '_WORK_DEPT_TO').attr('red-flag', 'N');
                            $('#' + rowId + '_WORK_DEPT_TO').removeClass().addClass('white');
                        }
                    }
                    $('#' + rowId + '_WORK_LOC_TO').removeClass().addClass('white');
                }
            }
            else {
                rowObject.ALLOW_POOL_CD7 = "";
                rowObject.LABOR_RATE_CD7 = "";
                $('#' + rowId + '_HOME_POOL_TO').value('');
                $('#' + rowId + '_HOME_POOL_TO').attr('value', '');
                $('#' + rowId + '_LABOR_RATE_CD7_TO').val('');
                $('#' + rowId + '_LABOR_RATE_CD7_TO').attr('value', '');
                if (work_loc_to == '') {
                    $('#' + rowId + '_WORK_LOC_TO').value(rowObject.ACCTG_LOC_CD7);
                    $('#' + rowId + '_WORK_LOC_TO').attr('value', rowObject.ACCTG_LOC_CD7);
                    $('#' + rowId + '_WORK_POOL_TO').value(rowObject.ALLOW_POOL_CD7);
                    $('#' + rowId + '_WORK_POOL_TO').attr('value', rowObject.ALLOW_POOL_CD7);
                }
                if (proj_trans_type_to == 'LBR') {
                    mctrObj.showDialog($('#dialog-box'), 'warning: home department/location to selection is normally required when ptt = lbr.', 'warning');
                }
            }
            dept_status = '';
            if (proj_trans_type_to == 'LBR') {
                // needs to be verified
                $('#' + rowId + '_QUANTITY_FROM').removeClass().addClass('red');
                $('#' + rowId + '_AMOUNT_FROM').removeClass().addClass('white');
            } else if (parseFloat(quantity_from) == 0 && parseFloat(amount_from) == 0) {
                $('#' + rowId + '_QUANTITY_FROM').removeClass().addClass('white');
                $('#' + rowId + '_AMOUNT_FROM').removeClass().addClass('white');
            }
            if ($('#' + rowId + '_LABOR_RATE_CD7_TO').val() == 'NR' && ($('#' + rowId + '_LABOR_RATE_CD7_FROM').val() != 'NR' || $('#' + rowId + '_LABOR_RATE_CD7_FROM').val() == '')) {
                $('#' + rowId + '_LABOR_RATE_CD7_TO').removeClass().addClass('yellow');
                $('#' + rowId + '_AMOUNT_TO').removeClass().addClass('yellow');
            }
            else {
                $('#' + rowId + '_LABOR_RATE_CD7_TO').removeClass();//field_black_on_gray
                $('#' + rowId + '_AMOUNT_TO').removeClass();//field_black_on_white
            }

            // }
        }

        $('#' + rowId + '_HOME_POOL_TO').val(rowObject.ALLOW_POOL_CD7);
        $('#' + rowId + '_HOME_POOL_TO').attr('value', rowObject.ALLOW_POOL_CD7);
        $('#' + rowId + '_HOME_DEPT_TO').val(rowObject.DEPTID);
        $('#' + rowId + '_HOME_DEPT_TO').attr('value', rowObject.DEPTID);
        $('#' + rowId + '_HOME_LOC_TO').val(rowObject.ACCTG_LOC_CD7);
        $('#' + rowId + '_HOME_LOC_TO').attr('value', rowObject.ACCTG_LOC_CD7);
        $('#' + rowId + '_LABOR_RATE_CD7_TO').val(rowObject.LABOR_RATE_CD7);
        $('#' + rowId + '_LABOR_RATE_CD7_TO').attr('value', rowObject.LABOR_RATE_CD7);
        $('#' + rowId + '_CLASS_CD_TO').val(rowObject.CLASS_CD);
        $('#' + rowId + '_CLASS_CD_TO').attr('value', rowObject.CLASS_CD);
        $('#' + rowId + '_RSC_TO').val(rowObject.RESOURCE_SUB_CAT);
        $('#' + rowId + '_RSC_TO').attr('value', rowObject.RESOURCE_SUB_CAT);


        if (!bootbox) {
            $('.bootbox').modal("hide");
        }
        if (flagGlobal || !flagWorkDept) {
            $(this).parents().find('.bootbox').modal('hide');
        }

    });
    $('#HomeDeptLocTocancelBtn').click(function (e) {
      
        $('#' + rowId + '_HOME_LOC_TO').val($('#' + rowId + '_HOME_LOC_TO').attr('value'));
      
    });
    mctrObj.searchGrid('HomeDeptLocToGrid');
});

