
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
        var rowData = $('#ListHomeLocToGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['Location', 'ABU'];
    var colModel = [{ key: false, name: 'ACCTG_LOC_CD7', index: 'ACCTG_LOC_CD7', width: 260, editable: true, search: true },
        { key: false, name: 'SETID', index: 'SETID', width: 300, editable: true }
       ];
    mctrObj.CreateJqGrid('ListHomeLocToGrid', '/MctrCreateForm/getRgListHomeLocToLOVJson', 'POST', mctrLineItem, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);
    $("#ListHomeLocToGrid").navGrid('#pager', { add: false, edit: false, del: false, search: false, refresh: true }, {}, {}, {}, {});
    $('#ListHomeLocToOkBtn').click(function () {
     
        var rowID = $('#rowId').val();

        // var dept_red_flg_to = "N";
        var work_dept_red_flg_to = '';
        var home_dept_to = $('#' + rowID + '_HOME_DEPT_TO').val();
        var class_cd_to = $('#' + rowID + '_CLASS_CD_TO').val();
        var global_class_cd_to = $('#' + rowID + '_CLASS_CD_TO').attr('value');
        var global_rsc_to = $('#' + rowID + '_RSC_TO').attr('value');
        var globalHomeLocTo = $('#' + rowID + '_HOME_LOC_TO').attr('value');
        var globalBuglto = $('#' + rowID + '_HOME_BUGL_TO').attr('value');
        var work_dept_to = $('#' + rowID + '_WORK_DEPT_TO').val();
        var work_loc_to = $('#' + rowID + '_WORK_LOC_TO').val();
        var home_loc_to = $('#' + rowID + '_HOME_LOC_TO').val();
        var work_pool_to = $('#' + rowID + '_WORK_POOL_TO').val();
        var home_pool_to = $('#' + rowID + '_HOME_POOL_TO').val();
        var validate = (($('#' + rowID + '_WORK_DEPT_TO').val() == "" && $('#' + rowID + '_WORK_LOC_TO').val() == "") || ($('#' + rowID + '_WORK_DEPT_TO').val() == $('#' + rowID + '_HOME_DEPT_TO').val() && $('#' + rowID + '_WORK_LOC_TO').val() == ""));
        var validateflag = !((home_loc_to != "" && ((work_dept_to == "" || work_loc_to == "" || work_pool_to == "") || (work_dept_to != home_dept_to) || (work_loc_to != home_loc_to) || (work_pool_to != home_pool_to))));

        if (!$.isEmptyObject(rowObject) != '' || ($('#' + rowID + '_HOME_LOC_TO').val() == "" && global_home_loc_to != "")) {

            $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass("field_white");
            $('#' + rowID + '_HOME_LOC_TO').removeClass().addClass("field_white");
            if ($('#' + rowID + '_HOME_DEPT_TO').val() != "") {
                if (rowObject.EFF_STATUS == "I") {
                    $('#' + rowID + '_HOME_DEPT_TO').attr('red-flag', 'Y');
                    $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass("orange");
                    mctrObj.showDialog($("#dialog-box"), "warning: inactive department/location combination selected.", "warning");
                }

                if ($('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == "LBR") {
                    if ($('#' + rowID + '_PROJ_TRANS_CODE_TO').val() == "PRM") {
                        $('#' + rowID + '_LABOR_RATE_CD7_TO').val('');
                        $('#' + rowID + '_LABOR_RATE_CD7_TO').attr('value', '');
                        $('#' + rowID + '_QUANTITY_TO').val("0.0");
                        $('#' + rowID + '_QUANTITY_FROM').val("0.0");

                        if (parseFloat($('#' + rowID + '_AMOUNT_TO').val()) != 0) {
                            $('#' + rowID + '_AMOUNT_TO').removeClass().addClass("red");
                        }
                        else if (parseFloat($('#' + rowID + '_AMOUNT_FROM').val()) != 0) {
                            $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass("red");
                        }
                    }

                    if (($('#' + rowID + '_CLASS_CD_TO').val() != "" && global_class_cd_to != "" && global_class_cd_to != $('#' + rowID + '_CLASS_CD_TO').val())) {
                        $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass("red");
                    }

                    else {
                        $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass("white");
                    }

                    if (($('#' + rowID + '_RSC_TO').val() != "" && global_rsc_to != "" && global_rsc_to != $('#' + rowID + '_RSC_TO').val())) {
                        $('#' + rowID + '_RSC_TO').removeClass().addClass("red");
                    }

                    else {
                
                        $('#' + rowID + '_RSC_TO').removeClass().addClass("white");
                    }
                }

                else {
                    $('#' + rowID + '_LABOR_RATE_CD7_TO').val("");
                    $('#' + rowID + '_LABOR_RATE_CD7_TO').attr('value','');
                    $('#' + rowID + '_CLASS_CD_TO').val(global_class_cd_to);
                    $('#' + rowID + '_RSC_TO').val(global_rsc_to);
                }

                if (($('#' + rowID + '_WORK_DEPT_TO').val() == "" && $('#' + rowID + '_WORK_LOC_TO').val() == "") || ($('#' + rowID + '_WORK_DEPT_TO').val() == $('#' + rowID + '_HOME_DEPT_TO').val() && $('#' + rowID + '_WORK_LOC_TO').val() == "")) {
                    $('#' + rowID + '_WORK_DEPT_TO').val($('#' + rowID + '_HOME_DEPT_TO').val());
                    $('#' + rowID + '_WORK_DEPT_TO').attr('value',$('#' + rowID + '_HOME_DEPT_TO').val());
                    $('#' + rowID + '_WORK_LOC_TO').val($('#' + rowID + '_HOME_LOC_TO').val());
                    $('#' + rowID + '_WORK_LOC_TO').attr('value',$('#' + rowID + '_HOME_LOC_TO').val());
                    $('#' + rowID + '_WORK_POOL_TO').val($('#' + rowID + '_HOME_POOL_TO').val());
                    $('#' + rowID + '_WORK_POOL_TO').attr('value',$('#' + rowID + '_HOME_POOL_TO').val());

                    if (rowObject.EFF_STATUS == "I") {
                        $('#' + rowID + '_WORK_DEPT_TO').attr('red-flag', 'Y');
                        $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("orange");

                    }

                    else {
                        $('#' + rowID + '_WORK_DEPT_TO').attr('red-flag', 'N');
                        $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("white");
                    }

                    $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("white");
                }

                else if (rowObject.ACCTG_LOC_CD7 != "" && ((work_dept_to == "" || work_loc_to == "" || work_pool_to == "") || (work_dept_to != home_dept_to) || (work_loc_to != home_loc_to) || (work_pool_to != home_pool_to))) {
                    // v_alert_choice = show_alert('alert_work_dept');

                    bootbox.confirm("Do you want to override Work Department/Location using Home Department/Location selection? Click OK button to accept.", function (result) {
                        if (result) {

                            $('#' + rowID + '_WORK_DEPT_TO').val($('#' + rowID + '_HOME_DEPT_TO').val());
                            $('#' + rowID + '_WORK_DEPT_TO').attr('value',$('#' + rowID + '_HOME_DEPT_TO').val());
                            $('#' + rowID + '_WORK_LOC_TO').val(rowObject.ACCTG_LOC_CD7);
                            $('#' + rowID + '_WORK_LOC_TO').attr('value', rowObject.ACCTG_LOC_CD7);
                            $('#' + rowID + '_WORK_POOL_TO').val($('#' + rowID + '_HOME_POOL_TO').val());
                            $('#' + rowID + '_WORK_POOL_TO').attr('value',$('#' + rowID + '_HOME_POOL_TO').val());

                            if (rowObject.EFF_STATUS == "I") {
                                $('#' + rowID + '_WORK_DEPT_TO').attr('red-flag', 'Y');
                                $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("orange");
                            }

                            else {
                                $('#' + rowID + '_WORK_DEPT_TO').attr('red-flag', 'N');
                                $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("white");

                            }

                            $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("white");
                            $(this).parents().find('.bootbox').modal('hide');
                        }
                        else
                        {
                            $('#' + rowId + '_HOME_LOC_TO').val(globalHomeLocTo);
                            $('#' + rowId + '_HOME_LOC_TO').attr('value', globalHomeLocTo);

                        }
                    });

                }

                else {
                    if ($('#' + rowID + '_HOME_DEPT_TO').val() != "" && $('#' + rowID + '_HOME_DEPT_TO').val() == $('#' + rowID + '_WORK_DEPT_TO').val() && rowObject.ACCTG_LOC_CD7 != "" && rowObject.ACCTG_LOC_CD7 == $('#' + rowID + '_WORK_LOC_TO').val()) {
                        if (rowObject.EFF_STATUS == "I") {
                            $('#' + rowID + '_WORK_DEPT_TO').attr('red-flag', 'Y');
                            $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("orange");

                        }

                        else {
                            $('#' + rowID + '_WORK_DEPT_TO').attr('red-flag', 'N');
                            $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("white");

                        }
                        $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("white");

                    }
                }
            }

            else {
                $('#' + rowID + '_HOME_POOL_TO').val("");
                $('#' + rowID + '_HOME_POOL_TO').attr('value','');
                $('#' + rowID + '_LABOR_RATE_CD7_TO').val("");
                $('#' + rowID + '_LABOR_RATE_CD7_TO').attr('value','');

                if ($('#' + rowID + '_WORK_LOC_TO').val() == "") {
                    $('#' + rowID + '_WORK_LOC_TO').val(rowObject.ACCTG_LOC_CD7);
                    $('#' + rowID + '_WORK_LOC_TO').attr('value', rowObject.ACCTG_LOC_CD7);
                    $('#' + rowID + '_WORK_POOL_TO').val($('#' + rowID + '_HOME_POOL_TO').val());
                    $('#' + rowID + '_WORK_POOL_TO').attr('value',$('#' + rowID + '_HOME_POOL_TO').val());
                    $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("white");
                    $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("white");

                }

                if ($('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == "LBR") {
                    mctrObj.showDialog($("#dialog-box"), "warning: home department/location to selection is normally required when ptt = lbr.", "warning");

                }
            }
           
            if ($('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == 'LBR') {
                // needs to be verified
                $('#' + rowId + '_QUANTITY_FROM').removeClass().addClass('red');
                $('#' + rowId + '_AMOUNT_FROM').removeClass().addClass('white');
            } else if (parseFloat($('#' + rowId + '_QUANTITY_FROM').val()) == 0 && parseFloat($('#' + rowId + '_AMOUNT_FROM').val()) == 0) {
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
        }
        $('#' + rowId + '_HOME_LOC_TO').val(rowObject.ACCTG_LOC_CD7);
        $('#' + rowId + '_HOME_LOC_TO').attr('value',rowObject.ACCTG_LOC_CD7);


        if (validate && validateflag) {
            $(this).parents().find('.bootbox').modal('hide');
        }
        if ($('#' + rowID + '_HOME_LOC_TO').attr('value') == rowObject.ACCTG_LOC_CD7) {
            $(this).parents().find('.bootbox').modal('hide');
        }
    });
    $('#ListHomeLoccancelBtn').click(function () {
        $('#' + rowId + '_HOME_LOC_TO').val($('#' + rowId + '_HOME_LOC_TO').attr('value'));
    });
    mctrObj.searchGrid('ListHomeLocToGrid');
});