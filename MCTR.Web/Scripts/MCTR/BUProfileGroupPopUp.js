$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject = {};
    var selectRowFn = function (rowid, status, obj) {
        rowObject["bu"] = $('#mctrBUnitsGrid').find('#' + rowid).find('td[aria-describedby="mctrBUnitsGrid_business_unit"]').attr('title');
        rowObject["groupCd"] = $('#' + rowid).find('td[aria-describedby="mctrBUnitsGrid_group_cd7"]').attr('title');
        var rowData = $('#mctrBUnitsGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['BU', 'Group Cd', 'Description', 'Effdt', 'Status'];
    var colModel = [{ key: false, name: 'business_unit', index: 'business_unit', width:110,editable: false,search:true },
        { key: false, name: 'group_cd7', index: 'group_cd7', width: 110, editable: false, search: true },
        { key: false, name: 'descr', index: 'descr  ', width: 110, editable: false, search: true },
        { key: false, name: 'effdt', index: 'effdt', formatter: 'date', classes: 'uppercase', formatoptions: { srcformat: 'd/m/Y', newformat: 'd-M-Y' }, width: 125, editable: false, search: true },
        { key: false, name: 'eff_status', index: 'eff_status', width: 110, editable: false, search: true }];

    mctrObj.CreateJqGrid('mctrBUnitsGrid', '/MctrCreateForm/getRgBuGrpLOV', 'GET', {}, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn);

    $('#okBtn').click(function (e) {

        e.preventDefault();
        e.stopPropagation();
        if (rowObject == '' && $("#OrigBu").attr('value') == '') {
            mctrObj.showDialog($("#dialog-box"), 'A Business Unit value was not selected from list.','error');
        }
        else if (rowObject.business_unit != '' && (rowObject.business_unit == $("#OrigBu").attr('value') || rowObject.business_unit == $("#OrigBu").val())) {
            mctrObj.showDialog($("#dialog-box"), 'The Business Unit value selected from list (' + $("#OrigBu").attr('value') + ') was same as prior selected value (' + $("#OrigBu").val() + ').','error');
        }
        else {
            $('#OrigBu').val(rowObject.business_unit);
            $('#OrigGroup').val(rowObject.group_cd7);
            
          
            var OrigBu = rowObject.business_unit;
            $.ajax({
                url: getBaseUrl('/MctrCreateForm/mctrHeaderbutBuWhenButtonPressedOpenLOV'),
                type: 'POST',
                data: { OrigBu: OrigBu },
                success: function (data) {
                    if (data!='') {
                        if (data.fyear != undefined || data.fyear != '') {
                            if (parseInt(data.fyear) == (new Date().getFullYear())) {
                                $('#fyear').val(data.fyear);
                                $('#prevOrCY').text('Current Year').css({ 'font-weight': 'bold' });
                            }
                            else {
                                $('#fyear').val('');
                                $('#prevOrCY').text('');
                                 }
                            }
                        }

                    }

            });
            if ($('#1_ACTIVITY_ID_FROM').val() != '') {


                $.each($('#tblJQGridCover').getGridParam('data'), function (key, value) {
                   
                    var rowID = value['_id_'];
                    if ($('#' + rowID + '_ACTIVITY_ID_FROM').val() != '') {

                        var fiscal_year = parseInt($('#fyear').val());
                        $('#' + rowID + '_HOME_BUGL_FROM').val(rowObject.business_unit);
                        $('#' + rowID + '_HOME_BUGL_TO').val(rowObject.business_unit);
                        if ($('#py_cy_status').val() == '') {
                            if (jQuery.trim($('#' + rowID + '_AFFILIATE_FROM').val()) != '' || jQuery.trim($('#' + rowID + '_AFFILIATE_TO').val()) != '') {
                                $('#' + rowID + '_AFFILIATE_FROM').val('');
                                $('#' + rowID + '_AFFILIATE_TO').val('');
                            }
                        } else if ($('#py_cy_status').val() == 'PY' && fiscal_year > 2007) {
                            $('#' + rowID + '_AFFILIATE_FROM').val($('#' + rowID + '_HOME_BUGL_FROM').val());
                            $('#' + rowID + '_AFFILIATE_TO').val($('#' + rowID + '_AFFILIATE_FROM').val());
                        } else if ($('#py_cy_status').val() == 'CY' || ($('#py_cy_status').val() == 'PY' && fiscal_year < 2008)) {
                            if (jQuery.trim($('#' + rowID + '_AFFILIATE_FROM').val()) != '' || jQuery.trim($('#' + rowID + '_AFFILIATE_TO').val()) != '') {
                                $('#' + rowID + '_AFFILIATE_FROM').val('');
                                $('#' + rowID + '_AFFILIATE_TO').val('');
                            }
                        }
                        $('#' + rowID + '_PROJECT_ID_FROM').removeClass().addClass('red');
                        $('#' + rowID + '_PROJECT_ID_TO').removeClass().addClass('red');
                        $('#' + rowID + '_HOME_LOC_FROM').removeClass().addClass('red');
                        $('#' + rowID + '_HOME_LOC_TO').removeClass().addClass('red');
                        $('#' + rowID + '_WORK_LOC_FROM').removeClass().addClass('red');
                        $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass('red');
                        if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() != 'LBR' && ($('#' + rowID + '_CLASS_CD_FROM').val() != '' || $('#' + rowID + '_CLASS_CD_TO').val() != '')) {
                            $('#' + rowID + '_CLASS_CD_FROM').removeClass().addClass('red');
                            $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass('red');
                        }
                        if ($('#' + rowID + '_WPD_FROM').val() != '' || $('#' + rowID + '_WPD_TO').val() != '') {
                            $('#' + rowID + '_WPD_FROM').removeClass().addClass('red');
                            $('#' + rowID + '_WPD_TO').removeClass().addClass('red');
                        }
                        if ($('#' + rowID + '_BULK_FROM').val() != '' || $('#' + rowID + '_BULK_TO').val() != '') {
                            $('#' + rowID + '_BULK_FROM').removeClass().addClass('red');
                            $('#' + rowID + '_BULK_TO').removeClass().addClass('red');
                        }
                        if ($('#' + rowID + '_ESTMTG_PRICG_CD_FROM').val() != '' || $('#' + rowID + '_ESTMTG_PRICG_CD_TO').val() != '') {
                            $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').removeClass().addClass('red');
                            $('#' + rowID + '_ESTMTG_PRICG_CD_TO').removeClass().addClass('red');
                        }
                        var param = [];
                        var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                        var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                        var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));
                        var mctrLineItem = $.extend(grid1, grid2, grid3);
                        param.push(mctrLineItem);
                        var mctrCreateFormq = $('#form').serialize();
                        var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                        var mctrCreateForm = $.extend({
                            mctrLineItem: param
                        }, mctrCreateFromJson);
                        $.ajax({
                            url: getBaseUrl('/MctrCreateForm/buButPressPTTValidation'),
                            type: 'POST',
                            data: mctrCreateForm,
                            success: function (data) {
                                if (data != '') {
                                    if (data.V_Count != undefined || data.V_Count != '') {
                                        if (data.V_Count['PTTflag']==0) {
                                            $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').removeClass().addClass('red');
                                        }
                                       
                                    }

                                }

                            }
                        });
                    }

                })
            }

            if ($('#BemsSuper').val() != "") {
                if (validApprover($('#BemsSuper').val())) {
                    $('#ApprCdSuper').val("");
                    $('#DateApprSuper').val("");
                    $('#BemsSuper').val("");
                    $('#SuprApprFullName').val("");
                }
            }
            if ($('#BemsFinCtl').val() != "") {
                if (validApprover($('#BemsFinCtl').val())) {
                    $('#ApprCdFinCtl').val("");
                    $('# DateApprFinCtl').val("");
                    $('#BemsFinCtl').val("");
                    $('#FinCtlApprFullName').val("");
                }
            }
            if ($('#BemsAcct').val() != "") {
                if (validApprover($('#BemsAcct').val())) {
                    $('#ApprCdAcct').val("");
                    $('#DateApprAcct').val("");
                    $('#BemsAcct').val("");
                    $('#AcctApprFullName').val("");
                }
            }
            if ($('#BemsLbrAcct').val() != "") {
                if (validApprover($('#BemsLbrAcct').val())) {
                    $('#ApprCdLbrAcct').val("");
                    $('#DateApprLbrAcct').val("");
                    $('#BemsLbrAcct').val("");
                    $('#LbrAcctFullName').val("");
                }
            }
            if ($('#BemsMatlAcc').val() != "") {
                if (validApprover($('#BemsMatlAcc').val())) {
                    $('#ApprCdMatlAcc').val("");
                    $('#dateapprmatlacct').val("");
                    $('#BemsMatlAcc').val("");
                    $('#MatlAccApprFullName').val("");
                }
            }
            if ($('#BemsCostAcct').val() != "") {
                if (validApprover($('#BemsCostAcct').val())) {
                    $('#ApprCdCostAcct').val("");
                    $('#DateApprCostAcct').val("");
                    $('#BemsCostAcct').val("");
                    $('#CostAcctApprFullName').val("");
                }
            }
            if ($('#BemsSrAcct').val() != "") {
                if (validApprover($('#BemsSrAcct').val())) {
                    $('#ApprCdSrAcct').val("");
                    $('#DateApprSrAcct').val("");
                    $('#BemsSrAcct').val("");
                    $('#SrAcctApprFullName').val("");
                }
            }



        }

      
        $('.bootbox').modal("hide");
        $('#fiscalYearBtn').focus();
    })

    function validApprover(bems) {
        var mctrCreateForm = $('#form').serialize();
        mctrCreateForm.approvalbems = bems;
        $.ajax({
            url: getBaseUrl('/MctrCreateForm/validApprover'),
            type: 'POST',
            data: mctrCreateForm,
            success: function (data) {
                if (data != '') {
                    if (data[0].approvalbems != undefined || data[0].approvalbems != '') {
                        if (data[0].approvalbems == 'true') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }

                }

            }
        });

    };
    mctrObj.searchGrid('mctrBUnitsGrid');
});


