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
        var rowData = $('#ListHomeLocFromGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['Location', 'ABU'];
    var colModel = [
        { key: false, name: 'ACCTG_LOC_CD7', index: 'ACCTG_LOC_CD7', width: 260, editable: true,search:true },
        { key: false, name: 'SETID', index: 'SETID', width: 300, editable: true }
    ];
    mctrObj.CreateJqGrid('ListHomeLocFromGrid', '/MctrCreateForm/getRgListHomeLocFromLOVJson', 'POST', mctrLineItem, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#ListHomeLocFromGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#ListHomeLocFromOkBtn').click(function () {
        var rowID = $('#rowId').val();
        // var dept_red_flg_from = '';
        //var dept_red_flg_from = "N";
        var work_dept_red_flg_from = '';
        var globalHomeLocFrom = $('#' + rowID + '_HOME_LOC_FROM').attr('value');
        var globalHomeBuglFrom = $('#' + rowID + '_HOME_BUGL_FROM').attr('value');
        var home_dept_from = $('#' + rowID + '_HOME_DEPT_FROM').val();
        var class_cd_from = $('#' + rowID + '_CLASS_CD_FROM').val();
        var global_class_cd_from = $('#' + rowID + '_CLASS_CD_FROM').attr('value');
        var global_rsc_from = $('#' + rowID + '_RSC_FROM').attr('value');
        var work_dept_from = $('#' + rowID + '_WORK_DEPT_FROM').val();
        var work_loc_from = $('#' + rowID + '_WORK_LOC_FROM').val();
        var work_loc_from = $('#' + rowID + '_WORK_LOC_FROM').val();
        var home_loc_from = rowObject.ACCTG_LOC_CD7;
        var work_pool_from = $('#' + rowID + '_WORK_POOL_FROM').val();
        var home_pool_from = $('#' + rowID + '_HOME_POOL_FROM').val();
        var proj_trans_type_from = $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val();
        var validate = (($('#' + rowID + '_WORK_DEPT_FROM').val() == "" && $('#' + rowID + '_WORK_LOC_FROM').val() == "") || ($('#' + rowID + '_WORK_DEPT_FROM').val() == $('#' + rowID + '_HOME_DEPT_FROM').val() && $('#' + rowID + '_WORK_LOC_FROM').val() == ""));
        var validateflag = !(home_loc_from != null && ((work_dept_from == null || work_loc_from == null || work_pool_from == null) || (work_dept_from != home_dept_from) || (work_loc_from != home_loc_from) || (work_pool_from != home_pool_from)));

        if ((!$.isEmptyObject(rowObject) || ($('#' + rowID + '_HOME_LOC_FROM').val() == "" && global_home_loc_from != ""))) {
            $('#' + rowID + '_HOME_DEPT_FROM').attr('red-flag', 'N');
            $('#' + rowID + '_ttdValue').addClass("white");
            $('#' + rowID + '_yearValue').addClass("white");
            $('#' + rowID + '_HOME_DEPT_FROM').removeClass().addClass("white");
            $('#' + rowID + '_HOME_LOC_FROM').removeClass().addClass("white");

            if ($('#' + rowID + '_HOME_DEPT_FROM').val() != "") {
                if (rowObject.EFF_STATUS == "I") {
                    $('#' + rowID + '_HOME_DEPT_FROM').attr('red-flag', 'Y');
                    $('#' + rowID + '_HOME_DEPT_FROM').removeClass().addClass("orange");
                    mctrObj.showDialog($("#dialog-box"), "warning: inactive department/location combination selected.", "warning");
                }

                if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "LBR") {
                    if ($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == "PRM") {
                        $('#' + rowID + '_LABOR_RATE_CD7_FROM').val('');
                        $('#' + rowID + '_LABOR_RATE_CD7_FROM').attr('value','');

                        $('#' + rowID + '_QUANTITY_FROM').val(0);
                        $('#' + rowID + '_QUANTITY_FROM').val(0);

                        if (($('#' + rowID + '_AMOUNT_FROM').val() != 0)) {
                            $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass("red");

                        }

                        else if (($('#' + rowID + '_AMOUNT_TO').val() != 0)) {
                            $('#' + rowID + '_AMOUNT_TO').removeClass().addClass("red");
                        }
                    }

                    if (($('#' + rowID + '_CLASS_CD_FROM').val() != null && global_class_cd_from != "" && global_class_cd_from != $('#' + rowID + '_CLASS_CD_FROM').val())) {
                        $('#' + rowID + '_CLASS_CD_FROM').val(global_class_cd_from);
                        $('#' + rowID + '_CLASS_CD_FROM').removeClass().addClass("red");
                    }

                    else {
                        $('#' + rowID + '_CLASS_CD_FROM').removeClass().addClass("white");
                    }

                    if (($('#' + rowID + '_RSC_FROM').val() != null && global_rsc_from != null && global_rsc_from != $('#' + rowID + '_RSC_FROM').val())) {
                        $('#' + rowID + '_RSC_FROM').removeClass().addClass("red");
                    }

                    else {
                    
                        $('#' + rowID + '_RSC_FROM').removeClass().addClass("white");
                    }
                }

                else {
                    $('#' + rowID + '_LABOR_RATE_CD7_FROM').val("");
                    $('#' + rowID + '_LABOR_RATE_CD7_FROM').attr('value','');
                    $('#' + rowID + '_CLASS_CD_FROM').val(global_class_cd_from);
                    $('#' + rowID + '_RSC_FROM').val(global_rsc_from);
                }

                if (($('#' + rowID + '_WORK_DEPT_FROM').val() == "" && $('#' + rowID + '_WORK_LOC_FROM').val() == "") || ($('#' + rowID + '_WORK_DEPT_FROM').val() == $('#' + rowID + '_HOME_DEPT_FROM').val() && $('#' + rowID + '_WORK_LOC_FROM').val() == "")) {
                    $('#' + rowID + '_WORK_DEPT_FROM').val($('#' + rowID + '_HOME_DEPT_FROM').val());
                    $('#' + rowID + '_WORK_LOC_FROM').val($('#' + rowID + '_HOME_LOC_FROM').val());
                    $('#' + rowID + '_WORK_POOL_FROM').val($('#' + rowID + '_HOME_POOL_FROM').val());

                    if (rowObject.EFF_STATUS == "I") {
                        $('#' + rowID + '_WORK_DEPT_FROM').attr('red-flag', 'Y');
                        $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass("orange");

                    }

                    else {
                        $('#' + rowID + '_WORK_DEPT_FROM').attr('red-flag', 'N');
                        $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass("white");
                    }

                    $('#' + rowID + '_WORK_LOC_FROM').removeClass().addClass("white");
                }

                else if (home_loc_from != null && ((work_dept_from == null || work_loc_from == null || work_pool_from == null) || (work_dept_from != home_dept_from) || (work_loc_from != home_loc_from) || (work_pool_from != home_pool_from))) {
                    // v_alert_choice = show_alert('alert_work_dept');

                    bootbox.confirm("Do you want from override Work Department/Location using Home Department/Location selection? Click OK butfromn from accept.", function (result) {
                        if (result) {

                            $('#' + rowID + '_WORK_DEPT_FROM').val($('#' + rowID + '_HOME_DEPT_FROM').val());
                            $('#' + rowID + '_WORK_DEPT_FROM').attr('value',$('#' + rowID + '_HOME_DEPT_FROM').val());
                            $('#' + rowID + '_WORK_LOC_FROM').val($('#' + rowID + '_HOME_LOC_FROM').val());
                            $('#' + rowID + '_WORK_LOC_FROM').attr('value',$('#' + rowID + '_HOME_LOC_FROM').val());
                            $('#' + rowID + '_WORK_POOL_FROM').val($('#' + rowID + '_HOME_POOL_FROM').val());
                            $('#' + rowID + '_WORK_POOL_FROM').attr('value',$('#' + rowID + '_HOME_POOL_FROM').val());

                            if (rowObject.EFF_STATUS == "I") {
                                $('#' + rowID + '_WORK_DEPT_FROM').attr('red-flag', 'Y');
                                $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass("orange");
                            }

                            else {
                                $('#' + rowID + '_WORK_DEPT_FROM').attr('red-flag', 'N');
                                $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass("white");

                            }

                            $('#' + rowID + '_WORK_LOC_FROM').removeClass().addClass("white");
                            $(this).parents().find('.bootbox').modal('hide');
                        }
                        else
                        {
                            $('#' + rowID + '_HOME_LOC_FROM').val(globalHomeLocFrom);
                            $('#' + rowID + '_HOME_LOC_FROM').attr('value', globalHomeLocFrom);
            
                        }
                    });

                }

                else {
                    if ($('#' + rowID + '_HOME_DEPT_FROM').val() != "" && $('#' + rowID + '_HOME_DEPT_FROM').val() == $('#' + rowID + '_WORK_DEPT_FROM').val() && $('#' + rowID + '_HOME_LOC_FROM').val() != "" && $('#' + rowID + '_HOME_LOC_FROM').val() == $('#' + rowID + '_WORK_LOC_FROM').val()) {
                        if (rowObject.EFF_STATUS == "I") {
                            $('#' + rowID + '_WORK_DEPT_FROM').attr('red-flag', 'Y');
                            $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass("orange");

                        }

                        else {
                            $('#' + rowID + '_WORK_DEPT_FROM').attr('red-flag', 'N');
                            $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass("white");

                        }
                        $('#' + rowID + '_WORK_LOC_FROM').removeClass().addClass("white");

                    }
                }
            }

            else {
                $('#' + rowID + '_HOME_POOL_FROM').val("");
                $('#' + rowID + '_HOME_POOL_FROM').attr('value','');
                $('#' + rowID + '_LABOR_RATE_CD7_FROM').val("");
                $('#' + rowID + '_LABOR_RATE_CD7_FROM').attr('value','');


                if ($('#' + rowID + '_WORK_LOC_FROM').val() == "") {
                    $('#' + rowID + '_WORK_LOC_FROM').val(rowObject.ACCTG_LOC_CD7);
                    $('#' + rowID + '_WORK_LOC_FROM').attr('value', rowObject.ACCTG_LOC_CD7);
                    $('#' + rowID + '_WORK_POOL_FROM').val($('#' + rowID + '_HOME_POOL_FROM').val());
                    $('#' + rowID + '_WORK_POOL_FROM').attr('value',$('#' + rowID + '_HOME_POOL_FROM').val());
                    $('#' + rowID + '_WORK_LOC_FROM').removeClass().addClass("white");
                    $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass("white");

                }

                if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "LBR") {
                    mctrObj.showDialog($("#dialog-box"), "warning: home department/location from selection is normally required when ptt = lbr.", "warning");

                }
            }
            if (proj_trans_type_from == 'LBR') {
                // needs to be verified 
                $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass('red');
                $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass('white');
            } else if (parseFloat(('#' + rowID + '_QUANTITY_FROM').val()) == 0 && parseFloat($('#' + rowID + '_AMOUNT_FROM').val()) == 0) {
                $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass('white');
                $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass('white');
            }
            if ($('#' + rowID + '_LABOR_RATE_CD7_TO').val() == 'NR' && ($('#' + rowID + '_LABOR_RATE_CD7_FROM').val() != 'NR' || $('#' + rowID + '_LABOR_RATE_CD7_FROM').val() == '')) {
                $('#' + rowID + '_LABOR_RATE_CD7_TO').removeClass().addClass('yellow');
                $('#' + rowID + '_AMOUNT_TO').removeClass().addClass('yellow');
            }
            else {
                $('#' + rowID + '_LABOR_RATE_CD7_TO').removeClass();//field_black_on_gray
                $('#' + rowID + '_AMOUNT_TO').removeClass();//field_black_on_white
            }
        }  
        $('#' + rowID + '_HOME_LOC_FROM').val(rowObject.ACCTG_LOC_CD7);
        $('#' + rowID + '_HOME_LOC_FROM').attr('value', rowObject.ACCTG_LOC_CD7);

        if (validate && validateflag) {
            $(this).parents().find('.bootbox').modal('hide');
        }
        if ($('#' + rowID + '_HOME_LOC_FROM').attr('value') == rowObject.ACCTG_LOC_CD7) {
            $(this).parents().find('.bootbox').modal('hide');
        }
    });

    $('#ListHomeLoccancelBtn').click(function () {
        $('#' + rowId + '_HOME_LOC_FROM').val($('#' + rowId + '_HOME_LOC_FROM').attr('value'));
    });
    mctrObj.searchGrid('ListHomeLocFromGrid');
});