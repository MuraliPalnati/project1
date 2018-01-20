$(document).ready(function () {
    var mctrObj = new MCTR();
    var rowObject = {};
    var selectRowFn = function (rowid, status, obj) {
        rowObject["fiscalYear"] = $('#mctrfiscalYearsGrid').find('#' + rowid).find('td[aria-describedby="mctrfiscalYearsGrid_fiscal_year"]').attr('title');
        var rowData = $('#mctrfiscalYearsGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['Fiscal year'];
    var colModel = [{ key: false, name: 'fiscal_year', index: 'fiscal_year',align:'center', editable: false,search:true }];

    mctrObj.CreateJqGrid('mctrfiscalYearsGrid', '/MctrCreateForm/getRgYearJson', 'GET', { fiscalYear: {}, origBu: $("#OrigBu").val() }, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn, '', '', '', 'yearPager');
    $('#fiscalYrokBtn').on("click", function () {
        $("#fyear").val(rowObject.fiscal_year);
        $('#mctrModalSmall').modal('hide');
        var currentYear = new Date().getFullYear();
        if ($("#fyear").attr('value') != rowObject.fiscal_year) {
            if (rowObject.fiscal_year < currentYear) {
                $('#prevOrCY').text('Prior Year').css({ 'font-weight': 'bold' })
                $('#py_cy_status').val("PY");
            }
            else {
                if (rowObject.fiscal_year == currentYear) {
                    $('#prevOrCY').text('Current Year').css({ 'font-weight': 'bold' })
                    $('#py_cy_status').val("CY");
                }
                else {
                    $('#prevOrCY').text('').css({ 'font-weight': 'bold' })
                }
            }
            if ($('#1_ACTIVITY_ID_FROM').val() != '') {


                $.each($('#tblJQGridCover').getGridParam('data'), function (key, value) {

                    var rowID = value['_id_'];
                    if ($('#' + rowID + '_ACTIVITY_ID_FROM').val() != '') {

                        var fiscal_year = parseInt(rowObject.fiscal_year);

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
                        if ($('#Linesfrom').val() == 0) {
                            $('#' + rowID + '_ACTIVITY_ID_FROM').removeClass().addClass('red');
                        }
                        else {
                            $('#' + rowID + '_PROJECT_ID_FROM').removeClass().addClass('red');
                            $('#' + rowID + '_PROJECT_ID_TO').removeClass().addClass('red');
                            $('#' + rowID + '_HOME_LOC_FROM').removeClass().addClass('red');
                            $('#' + rowID + '_HOME_LOC_TO').removeClass().addClass('red');
                            $('#' + rowID + '_WORK_LOC_FROM').removeClass().addClass('red');
                            $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass('red');
                        }

                    }

                })
                mctrObj.showDialog($("#dialog-box"), "line items are now ready for manual validation. to cancel changes, please close by exiting back to main menu", "warning");
            }
            var mctrCreateForm = $('#form').serialize();
            $.ajax({
                url: getBaseUrl('/MctrCreateForm/mctrHeaderbutFiscalYearWhenButtonPressedOpenLOV'),
                type: 'POST',
                data: mctrCreateForm,
                success: function (data) {
                }
            });
        }
        bootbox.hideAll();
    });
    mctrObj.searchGrid('mctrfiscalYearsGrid');

});