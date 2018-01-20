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
        var rowData = $('#mctrHomeDeptFromGrid').jqGrid('getRowData', rowid);
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
        { key: false, name: 'EFFDT', index: 'EFFDT', width: 100, formatter: 'date', formatoptions: { srcformat: 'd/m/Y', newformat: 'd-M-y' },classes:'uppercase', editable: false },
        { key: false, name: 'EFF_STATUS', index: 'EFF_STATUS', width: 60, editable: false }];
    mctrObj.CreateJqGrid('mctrHomeDeptFromGrid', '/MctrCreateForm/getRgListHomeDeptFromJSON', 'POST', mctrLineItem, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#mctrHomeDeptFromGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#mctrHomeDeptOkBtn').click(function (e) {
 
        var rowId = $('#rowId').val();
        var home_dept_from = $('#' + rowId + '_HOME_DEPT_FROM').val();
        var global_home_dept_from = $('#' + rowId + '_HOME_DEPT_FROM').attr('value');
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
        var laborRate= $('#' + rowId + '_LABOR_RATE_CD7_FROM').val();
        var homeBuglFrom= $('#' + rowId + '_HOME_BUGL_FROM').val();
        var workBuglFrom = $('#' + rowId + '_WORK_BUGL_FROM').val();
        var flagWorkDept =(rowObject.ACCTG_LOC_CD7 != '' && ($('#' + rowId + '_WORK_DEPT_FROM').val() == '' || work_loc_from == '' || work_pool_from == '' || ($('#' + rowId + '_WORK_DEPT_FROM').val() != rowObject.DEPTID) || (work_loc_from != rowObject.ACCTG_LOC_CD7) || (work_pool_from != rowObject.ALLOW_POOL_CD7)))
       // var flagWorkDept = $('#' + rowId + '_HOME_LOC_FROM').val() != '' && $('#' + rowId + '_WORK_DEPT_FROM').val() == '' || work_loc_from == '' || work_pool_from == '' || $('#' + rowId + '_WORK_DEPT_FROM').val() != home_dept_from || work_loc_from != home_loc_from || work_pool_from != home_pool_from;
        var flagGlobalValues = (global_home_dept_from == '');
        if ((home_dept_from == '' && global_home_dept_from != '') || (!$.isEmptyObject(rowObject))) {
            $('#' + rowId + '_HOME_DEPT_FROM').attr('red-flag', 'N');
            $('#' + rowId + '_ttdValue').addClass("white");
            $('#' + rowId + '_yearValue').addClass("white");

            $('#' + rowId + '_HOME_DEPT_FROM').removeClass().addClass("white");
            $('#' + rowId + '_HOME_LOC_FROM').removeClass().addClass("white");

            if ($('#' + rowId + '_HOME_DEPT_FROM').val() != '') {
                if (rowObject.EFF_STATUS == 'I') {
                    $('#' + rowId + '_HOME_DEPT_FROM').attr('red-flag', 'Y');
                    $('#' + rowId + '_HOME_DEPT_FROM').removeClass().addClass("orange");
                    mctrObj.showDialog($('#dialog-box'), 'warning: inactive department/location combination selected.', 'warning');

                }
                if (proj_trans_type_from == 'LBR') {
                    if (proj_trans_code_from == 'PRM') {
                        $('#' + rowId + '_LABOR_RATE_CD7_FROM').val('');
                        rowObject.LABOR_RATE_CD7 = "";
                        $('#' + rowId + '_LABOR_RATE_CD7_FROM').attr('value','');
                        $('#' + rowId + '_QUANTITY_TO').val('0');
                        $('#' + rowId + '_QUANTITY_FROM').val('0');
                        if ($('#' + rowId + '_AMOUNT_FROM').val() != 0) {
                            $('#' + rowId + '_AMOUNT_FROM').removeClass().addClass('red');
                        }
                        else if ($('#' + rowId + '_AMOUNT_TO').val() != 0) {
                            $('#' + rowId + '_AMOUNT_TO').removeClass().addClass('red');

                        }
                    }
                    //rsc and class pulled in when department is selected.
                    if ((rowObject.CLASS_CD != '' && global_class_cd_from != '') && (global_class_cd_from != rowObject.CLASS_CD)) {
                        //reset class code in case selected using inquire set button feature.
                        $('#' + rowId + '_CLASS_CD_FROM').val(global_class_cd_from);
                        $('#' + rowId + '_CLASS_CD_FROM').attr('value', global_class_cd_from);
                        rowObject.CLASS_CD = global_class_cd_from;

                        $('#' + rowId + '_CLASS_CD_FROM').removeClass().addClass('red');
                    } else {
                        $('#' + rowId + '_CLASS_CD_FROM').removeClass().addClass('white');
                    }
                    if ((rowObject.RESOURCE_SUB_CAT != '' && global_rsc_from != '') && (global_rsc_from != rowObject.RESOURCE_SUB_CAT)) {
                        $('#' + rowId + '_RSC_FROM').removeClass().addClass('red');
                    } else {
                        $('#' + rowId + '_RSC_FROM').removeClass().addClass('white');
                    }
                } else {
                    $('#' + rowId + '_LABOR_RATE_CD7_FROM').val('');
                    $('#' + rowId + '_LABOR_RATE_CD7_FROM').attr('value', '');
                    rowObject.LABOR_RATE_CD7 = "";
                    $('#' + rowId + '_CLASS_CD_FROM').val(global_class_cd_from);
                    rowObject.CLASS_CD = global_class_cd_from;
                    $('#' + rowId + '_RSC_FROM').val(global_rsc_from);
                    rowObject.RESOURCE_SUB_CAT = global_rsc_from;
                   
                }
                if (($('#' + rowId + '_WORK_DEPT_FROM').val() == '' && work_loc_from == '') || ($('#' + rowId + '_WORK_DEPT_FROM').val() == home_dept_from && work_loc_from == '')) {
                    //$('#' + rowId + '_WORK_DEPT_FROM').val($('#' + rowId + '_HOME_DEPT_FROM').val());
                    //$('#' + rowId + '_WORK_DEPT_FROM').attr('value',$('#' + rowId + '_HOME_DEPT_FROM').val());
                    //$('#' + rowId + '_WORK_LOC_FROM').val($('#' + rowId + '_HOME_LOC_FROM').val());
                    //$('#' + rowId + '_WORK_LOC_FROM').attr('value', $('#' + rowId + '_HOME_LOC_FROM').val());
                    //$('#' + rowId + '_WORK_POOL_FROM').val($('#' + rowId + '_HOME_POOL_FROM').val());
                    //$('#' + rowId + '_WORK_POOL_FROM').attr('value', $('#' + rowId + '_HOME_POOL_FROM').val());

                    $('#' + rowId + '_WORK_DEPT_FROM').val(rowObject.DEPTID);
                    $('#' + rowId + '_WORK_DEPT_FROM').attr('value', rowObject.DEPTID);
                    $('#' + rowId + '_WORK_POOL_FROM').val(rowObject.ALLOW_POOL_CD7);
                    $('#' + rowId + '_WORK_POOL_FROM').attr('value', rowObject.ALLOW_POOL_CD7);
                    $('#' + rowId + '_WORK_LOC_FROM').val(rowObject.ACCTG_LOC_CD7);
                    $('#' + rowId + '_WORK_LOC_FROM').attr('value', rowObject.ACCTG_LOC_CD7);

                    if (rowObject.EFF_STATUS == 'I') {
                        $('#' + rowId + '_WORK_DEPT_FROM').attr('red-flag', 'Y');
                        $('#' + rowId + '_WORK_DEPT_FROM').removeClass().addClass('orange');
                    } else {
                        $('#' + rowId + '_WORK_DEPT_FROM').attr('red-flag', 'N');
                        $('#' + rowId + '_WORK_DEPT_FROM').removeClass().addClass('white');
                    }
                    $('#' + rowId + '_WORK_LOC_FROM').removeClass().addClass('white');
                }
                else if (rowObject.ACCTG_LOC_CD7 != '' && ($('#' + rowId + '_WORK_DEPT_FROM').val() == '' || work_loc_from == '' || work_pool_from == '' || ($('#' + rowId + '_WORK_DEPT_FROM').val() != rowObject.DEPTID) || (work_loc_from != rowObject.ACCTG_LOC_CD7) || (work_pool_from != rowObject.ALLOW_POOL_CD7))) {
                 
                    bootbox.confirm("Do you want to override Work Department/Location using Home Department/Location selection? Click OK button to accept.", function (result) {
                        if (result) {


                            $('#' + rowId + '_WORK_DEPT_FROM').val(rowObject.DEPTID);
                            $('#' + rowId + '_WORK_DEPT_FROM').attr('value',rowObject.DEPTID);
                            $('#' + rowId + '_WORK_LOC_FROM ').val(rowObject.ACCTG_LOC_CD7);
                            $('#' + rowId + '_WORK_LOC_FROM ').attr('value', rowObject.ACCTG_LOC_CD7);
                            $('#' + rowId + '_WORK_POOL_FROM ').val(rowObject.ALLOW_POOL_CD7);
                            $('#' + rowId + '_WORK_POOL_FROM ').attr('value', rowObject.ALLOW_POOL_CD7);

                            if (rowObject.EFF_STATUS == 'I') {
                               
                                $('#' + rowId + '_WORK_DEPT_FROM').removeClass().addClass('orange');
                                $('#' + rowId + '_WORK_DEPT_FROM').attr('red-flag', 'Y');
                            } else {
                                $('#' + rowId + '_WORK_DEPT_FROM').attr('red-flag', 'N');
                                $('#' + rowId + '_WORK_DEPT_FROM').removeClass().addClass('white');
                            }

                            $('#' + rowId + '_WORK_LOC_FROM').removeClass().addClass('white');
                            $(this).parents().find('.bootbox').modal('hide');
                        }
                        else {

                            $('#' + rowId + '_HOME_POOL_FROM').val(rowObject.ALLOW_POOL_CD7);
                            $('#' + rowId + '_HOME_POOL_FROM').attr('value', rowObject.ALLOW_POOL_CD7);
                            $('#' + rowId + '_HOME_DEPT_FROM').val(rowObject.DEPTID);
                            $('#' + rowId + '_HOME_DEPT_FROM').attr('value', rowObject.DEPTID);
                            $('#' + rowId + '_HOME_LOC_FROM').val(rowObject.ACCTG_LOC_CD7);
                            $('#' + rowId + '_HOME_LOC_FROM').attr('value', rowObject.ACCTG_LOC_CD7);
                            $('#' + rowId + '_LABOR_RATE_CD7_FROM').val(rowObject.LABOR_RATE_CD7);
                            $('#' + rowId + '_LABOR_RATE_CD7_FROM').attr('value', rowObject.LABOR_RATE_CD7);
                            $('#' + rowId + '_CLASS_CD_FROM').val(rowObject.CLASS_CD);
                            $('#' + rowId + '_CLASS_CD_FROM').attr('value', rowObject.CLASS_CD);
                            $('#' + rowId + '_RSC_FROM').val(rowObject.RESOURCE_SUB_CAT);                
                            $('#' + rowId + '_RSC_FROM').attr('value', rowObject.RESOURCE_SUB_CAT);


                            $('#' + rowId + '_WORK_POOL_FROM').val(work_pool_from);
                            $('#' + rowId + '_WORK_POOL_FROM').attr('value', work_pool_from);
                            $('#' + rowId + '_WORK_DEPT_FROM').val(work_dept_from);
                            $('#' + rowId + '_WORK_DEPT_FROM').attr('value', work_dept_from);                          
                            $('#' + rowId + '_WORK_LOC_FROM').val(work_loc_from);
                            $('#' + rowId + '_WORK_LOC_FROM').attr('value', work_loc_from);

                            $(this).parents().find('.bootbox').modal('hide');
                        }
                        
                    });
                    //}
                    //if (home_dept_from != '' && home_dept_from == work_dept_from && home_loc_from != '' && home_loc_from == work_loc_from) {
                    //    dept_status = 'I';
                    //    $('#' + rowId + '_WORK_DEPT_FROM').removeClass().addClass('orange');
                    //} else {
                    //    work_dept_red_flg_from = 'N';
                    //    $('#' + rowId + '_WORK_DEPT_FROM').removeClass().addClass('white');
                    //}
                    //$('#' + rowId + '_WORK_LOC_FROM').removeClass().addClass('white');
                }
                // }
            }// close of home dept from not null
            else {
                $('#' + rowId + '_HOME_POOL_FROM').attr('value', '');
                $('#' + rowId + '_HOME_POOL_FROM').val("");
                rowObject.ALLOW_POOL_CD7 = "";
                $('#' + rowId + '_LABOR_RATE_CD7_FROM').val("");
                $('#' + rowId + '_LABOR_RATE_CD7_FROM').attr('value', '');
                rowObject.LABOR_RATE_CD7 = "";
                if ($('#' + rowId + '_HOME_LOC_FROM').val() != '') {
                    $('#' + rowId + '_HOME_LOC_FROM').removeClass().addClass('red');
                }
                if ($('#' + rowId + '_CLASS_CD_FROM').val() != '') {
                    $('#' + rowId + '_CLASS_CD_FROM').removeClass().addClass('red');
                }
                if ($('#' + rowId + '_RSC_FROM').val() != '') {
                    $('#' + rowId + '_RSC_FROM').removeClass().addClass('red');
                }
                if (proj_trans_type_from == 'LBR') {
                    mctrObj.showDialog($('#dialog-box'), 'warning: home department/location to selection is normally required when ptt = lbr.', 'error');

                }

            }
        
            //dept_status = '';
            if (proj_trans_type_from == 'LBR') {
                // needs to be verified 
                $('#' + rowId + '_QUANTITY_FROM').removeClass().addClass('red');
                $('#' + rowId + '_AMOUNT_FROM').removeClass().addClass('white');
            } else if (parseFloat($('#' + rowId + '_QUANTITY_FROM').val()) == 0 && parseFloat($('#' + rowId + '_AMOUNT_FROM').val()) == 0) {
                $('#' + rowId + '_QUANTITY_FROM').removeClass().addClass('white');
                $('#' + rowId + '_AMOUNT_FROM').removeClass().addClass('white');
            }
            if (  $('#' + rowId + '_LABOR_RATE_CD7_TO').val() == 'NR' && ( $('#' + rowId + '_LABOR_RATE_CD7_FROM').val() != 'NR' ||   $('#' + rowId + '_LABOR_RATE_CD7_FROM').val() == '')) {
                $('#' + rowId + '_LABOR_RATE_CD7_TO').removeClass().addClass('yellow');
                $('#' + rowId + '_AMOUNT_TO').removeClass().addClass('yellow');
            }
            else {
                $('#' + rowId + '_LABOR_RATE_CD7_TO').removeClass();//field_black_on_gray
                $('#' + rowId + '_AMOUNT_TO').removeClass();//field_black_on_white
            }

        }
        $('#' + rowId + '_HOME_POOL_FROM').val(rowObject.ALLOW_POOL_CD7);
        $('#' + rowId + '_HOME_POOL_FROM').attr('value', rowObject.ALLOW_POOL_CD7);
        $('#' + rowId + '_HOME_DEPT_FROM').val(rowObject.DEPTID);
        $('#' + rowId + '_HOME_DEPT_FROM').attr('value', rowObject.DEPTID);
        $('#' + rowId + '_HOME_LOC_FROM').val(rowObject.ACCTG_LOC_CD7);
        $('#' + rowId + '_HOME_LOC_FROM').attr('value', rowObject.ACCTG_LOC_CD7);
        $('#' + rowId + '_LABOR_RATE_CD7_FROM').val(rowObject.LABOR_RATE_CD7);
        $('#' + rowId + '_LABOR_RATE_CD7_FROM').attr('value', rowObject.LABOR_RATE_CD7);
        $('#' + rowId + '_CLASS_CD_FROM').val(rowObject.CLASS_CD);
        $('#' + rowId + '_CLASS_CD_FROM').attr('value', rowObject.CLASS_CD);
        $('#' + rowId + '_RSC_FROM').val(rowObject.RESOURCE_SUB_CAT);
        $('#' + rowId + '_RSC_FROM').attr('value', rowObject.RESOURCE_SUB_CAT);

        //$('#' + rowId + '_WORK_POOL_FROM').val(rowObject.ALLOW_POOL_CD7);
        //$('#' + rowId + '_WORK_POOL_FROM').attr('value', rowObject.ALLOW_POOL_CD7);
        //$('#' + rowId + '_WORK_DEPT_FROM').val(rowObject.DEPTID);
        //$('#' + rowId + '_WORK_DEPT_FROM').attr('value', rowObject.DEPTID);
        //$('#' + rowId + '_WORK_LOC_FROM').val(rowObject.ACCTG_LOC_CD7);
        //$('#' + rowId + '_WORK_LOC_FROM').attr('value', rowObject.ACCTG_LOC_CD7);

 
         
       // }


        //if (global_home_dept_from=="")
        //{
        //    $(this).parents().find('.bootbox').modal('hide');
        //}
        //if (!bootbox) {
        //    $('.bootbox').modal("hide");
        //}
        //if ((global_home_dept_from == '') && ((work_dept_from == ''))) {
        //    $(this).parents().find('.bootbox').modal('hide');
        //}
        //$('.bootbox').modal("hide");
        //if (!bootbox) {
        //    $('.bootbox').modal("hide");
        //}
        //if ($('#' + rowId + '_HOME_LOC_FROM').val() != '' && $('#' + rowId + '_WORK_DEPT_FROM').val() == '' || work_loc_from == '' || work_pool_from == '' || $('#' + rowId + '_WORK_DEPT_FROM').val() != home_dept_from || work_loc_from != home_loc_from || work_pool_from != home_pool_from) {
        //    $(this).parents().find('.bootbox').modal('hide');
        //}
        if (!bootbox) {
            $('.bootbox').modal("hide");
        }
        if (flagGlobalValues || !flagWorkDept) {
            $(this).parents().find('.bootbox').modal('hide');
        }
    });

    $('#mctrHomeDeptcancelBtn').click(function () {
        $('#' + rowId + '_HOME_DEPT_FROM').val($('#' +rowId + '_HOME_DEPT_FROM').attr('value'));
    });

    mctrObj.searchGrid('mctrHomeDeptFromGrid');

});