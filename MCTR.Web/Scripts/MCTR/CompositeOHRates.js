$(document).ready(function () {
    var mctrObj = new MCTR();


    var compwithFormatter = function (gridName, rowData) {
        var colObject = {};
        var colModel = $("#" + gridName).jqGrid("getGridParam", "colModel");
        colModel.forEach(function (model, index) {
            var elem = $(rowData[model.name]).not('a,br,button,label');
            elem.each(function (i, obj) {
                if (obj.type == 'checkbox') {
                    colObject[obj.id.slice(obj.id.indexOf('_') + 1)] = obj.checked;
                }
                else {
                    colObject[obj.id.slice(obj.id.indexOf('_') + 1)] = $('#' + obj.id).val();
                }
            })
        });
        return colObject;
    };


    var compsearchJqGridbyData = function (colModel, gridData, searchValue) {
        return $.grep(gridData, function (obj) {
            var searchFlag = false;
            colModel.forEach(function (model, index) {
                if (!searchFlag) {
                    if (model.formatter == 'date') {
                        searchFlag = new Date(parseInt(obj[model.name] == null ? "" : obj[model.name].substr(6))).toDateString().slice(4).search(searchValue) != -1;
                    }
                    else {
                        searchFlag = String(obj[model.name] == null ? "" : String(obj[model.name])).search(searchValue) != -1;
                    }
                }
            });
            return searchFlag;
        });
    };
    //this.searchJqGridbyDateColumn = function (searchColumnName, gridData, searchValue) {
    //    return $.grep(gridData, function (obj) {
    //        return new Date(parseInt(obj[searchColumnName].substr(6))).toDateString().slice(4).search(searchValue) != -1;
    //    });
    //};
    var searchGrid = function (gridId) {
        $('#findBtn').on('click', function (e) {
            var searchValue = $('#searchValue').val();
            var searchableColModel = $.grep($('#' + gridId).getGridParam('colModel'), function (obj) {
                return obj.search;
            });

            var filteredObjs = new MCTR().compsearchJqGridbyData($('#' + gridId).getGridParam('colModel'), $('#' + gridId).getGridParam('userData'), searchValue);
            $('#' + gridId).clearGridData(true);
            $('#' + gridId).setGridParam({ data: filteredObjs });
            $('#' + gridId).trigger('reloadGrid');
        });
    };

        $.ajax({
            url: getBaseUrl('/MctrCompRates/mctrCompRatesWhenNewFormInstance'),
            type: "GET",
            traditional: true,
            data: '',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data != null) {
                    $('#fyear').val(data[0].f_year);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });


        var selectRowFn = function (rowid, status, obj) {
            var rowData = $('#ttdInquireGrid').jqGrid('getRowData', rowid);
            rowObject = rowData;
        };

        $('#addNewRow').click(function () {
            var parameters =
        {
            rowID: parseInt($("#compOHRatesGrid").getGridParam('records')) + 1,
            // rowID:  'newRow',
            position: "first",
            initdata: {
                CUST_TYPE_INPUT: 'nl',
                BUM_INPUT: 'nl',
                COMP_SEQ: '1',
                RATE_OVERRIDE: '0',
            BASE_AMT: '1'
            },
            useDefValues: false,
            useFormatter: true,
            addRowParams: { extraparam: {} }
        };

            $("#compOHRatesGrid").addRow(parameters);
        });

        //$('#dwnloadBtn').click(function ()
        //{
        //   var data = $('#fyear').val();
        //   var mctrComp = { 'fyear': $('#fyear').val() }
        //   var Input = JSON.stringify({ 'mctrCompRates': mctrComp });
        //   mctrObj.ajaxOptions('/MctrCompRates/selectBlockbutRatesListWhenButtonPressed', 'POST', Input, null, null)
        //});
        $('#dwnloadBtn').click(function () {
            var succesFn = function (data) {

            };
            var errorFn = function (data) {

            };

        $('#compratesDownloadFrame').attr('src', getBaseUrl('/MctrCompRates/selectBlockbutRatesListWhenButtonPressed') + '?fyear=' + $('#fyear').val());

        })

        var afterInsertRow = function (rowid, rowdata, rowelem) {
            $("#" + rowid).find('input').attr('readonly', false);
            $("#" + rowid).addClass('fade-in');
            setTimeout(function () {
                $("#" + rowid).removeClass('fade-in').addClass('fade-out');
            }, 200);
            setTimeout(function () {
                $(".fade-out").removeClass('fade-out');
            }, 5000);
        };
        var gridCompleteFn = function (data) {

           

            $('input[id*=_CMPON_CD]').prop('maxLength', 2);
         $('input[id*=_FISCAL_YEAR]').prop('maxLength', 4);
         $('input[id*=_RSC_INPUT]').prop('maxLength', 3);
         $('input[id*=_CUST_TYPE_INPUT]').prop('maxLength', 2);
         $('input[id*=_BUM_INPUT]').prop('maxLength', 3);
         $('input[id*=_RSC_OUTPUT]').prop('maxLength', 3);
         $('input[id*=_POOL_OUTPUT]').prop('maxLength', 2);
         $('input[id*=_COMP_SEQ]').prop('maxLength', 1);
         $('input[id*=_RATE_OVERRIDE]').prop('maxLength', 12);

         //$('input[id*=_CMPON_CD]').addClass('uppercase');
         //$('input[id*=_RSC_INPUT]').addClass('uppercase');
         //$('input[id*=_RSC_OUTPUT]').addClass('uppercase');
         //$('input[id*=_POOL_OUTPUT]').addClass('uppercase');

         $('input[id*=_FISCAL_YEAR]').keypress(function (e) {
            var a = [];
             var k = e.which;

             for (i = 48; i < 58; i++)
                 a.push(i);

             if (!(a.indexOf(k) >= 0))
                 e.preventDefault();
                 });


            if ($('input[id*=_BASE_AMT]').val() == 1) {
                $('input[id*=_baseAmtCheck').attr("checked", "checked");
            }

            $('input[id*=CMPON_CD]').on('blur', function (e, obj) {
                e.preventDefault();
                var rowID = $(this).attr('row');
                var mctrComp = {
                    CMPON_CD: ($('#' + rowID + '_CMPON_CD').val())
                };
                var Input = JSON.stringify({ mctrCompRates: mctrComp });
                var errorFn = function (jqXHR, textStatus, errorThrown) {
                };
                var succesFn = function (data) {
                    if (data != null) {
                        if (data[0].v_count == 0) {
                            mctrObj.showDialog($("#dialog-box"), "this bu is not found in your bu/group access using mctr role bu table.", "error");
                            $('#' + rowID + '_CMPON_CD').focus();
                        }
                    else {
                        $("#dialog-box").hide();
                    }

                    }
                }
                mctrObj.ajaxOptions('/MctrCompRates/mctrCompRatescmponCdPostTextItem', 'POST', Input, succesFn, errorFn);

            });
            $('input[id*=CUST_TYPE_INPUT]').on('blur', function (e, obj) {
                e.preventDefault();
                var rowID = $(this).attr('row');
                var value = $('#' + rowID + '_CUST_TYPE_INPUT').val();
                if (value == "nl") {
                    $('#' + rowID + '_CUST_TYPE_INPUT').val("nl");
                }
                else if (value != "nl") {
                    $('#' + rowID + '_CUST_TYPE_INPUT').val($('#' + rowID + '_CUST_TYPE_INPUT').val().toUpperCase());
                }

            });

            $('input[id*=BUM_INPUT]').on('blur', function (e, obj) {
                e.preventDefault();
                var rowID = $(this).attr('row');;
                var value = $('#' + rowID + '_BUM_INPUT').val();
                if (value == "nl") {
                    $('#' + rowID + '_BUM_INPUT').val("nl");
                }
                else if (value != "nl") {
                    $('#' + rowID + '_BUM_INPUT').val($('#' + rowID + '_BUM_INPUT').val().toUpperCase());
                }

            });
            $('input[id*=RSC_OUTPUT]').on('blur', function (e, obj) {
                e.preventDefault();
                var rowID = $(this).attr('row');
                //var rowID = $(this).attr('row');
                var grid1 = compwithFormatter('compOHRatesGrid', $('#compOHRatesGrid').getRowData(rowID));

                $.ajax({
                    type: "POST",
                    url: getBaseUrl('/MctrCompRates/mctrCompRatesrscOutputPostChange'),
                    data: { mctrCompRates: grid1 },
                    success: function (data) {
                        if (data[0].RATE_I_RSC_POOL != '' || data[0].RATE_I != "") {
                            $('#' + rowID + '_RATE_I_RSC_POOL').val(data[0].RATE_I_RSC_POOL);
                            $('#' + rowID + '_RATE_I').val(data[0].RATE_I);
                            $('#' + rowID + '_RATE_OUTPUT').val(((data[0].RATE_OUTPUT)));

                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                    }
                });

            });

            $('input[id*=POOL_OUTPUT]').on('change', function (e, obj) {
                e.preventDefault();
                var rowID = $(this).attr('row');
                //var rowID = $(this).attr('row');
                var grid1 = compwithFormatter('compOHRatesGrid', $('#compOHRatesGrid').getRowData(rowID));

                $.ajax({
                    type: "POST",
                    url: getBaseUrl('/MctrCompRates/mctrCompRatespoolOutputPostChange'),
                    data: { mctrCompRates: grid1 },
                    success: function (data) {
                        if (data[0].RATE_I_RSC_POOL != '' || data[0].RATE_I != "") {
                            $('#' + rowID + '_RATE_I_RSC_POOL').val(data[0].RATE_I_RSC_POOL);
                            $('#' + rowID + '_RATE_I').val(data[0].RATE_I);
                            $('#' + rowID + '_RATE_OUTPUT').val(data[0].RATE_OUTPUT);

                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                    }
                });

            });

            $('input[id*=POOL_OUTPUT]').on('blur', function (e, obj) {

                e.preventDefault();
                var rowID = $(this).attr('row');
                var value = $('#' + rowID + '_POOL_OUTPUT').val();
                if (value == "nl") {
                    $('#' + rowID + '_POOL_OUTPUT').val("nl");
                }
                else if (value != "nl") {
                    $('#' + rowID + '_POOL_OUTPUT').val($('#' + rowID + '_POOL_OUTPUT').val().toUpperCase());
                }

            });

            $('input[id*=baseAmtCheck]').change(function (e, obj) {
                var rowID = $(this).attr('row');
                if ($('#' + rowID + '_baseAmtCheck').is(":checked")) {

                    $('#' + rowID + '_BASE_AMT').val(1);
                    ($('#' + rowID + '_RATE_OUTPUT').val((parseFloat($('#' + rowID + '_RATE_I').val()) * parseFloat($('#' + rowID + '_BASE_AMT').val())).toFixed(8)));
                }
                else {
                    $('#' + rowID + '_BASE_AMT').val(0);
                    ($('#' + rowID + '_RATE_OUTPUT').val((parseFloat($('#' + rowID + '_RATE_I').val()) * parseFloat($('#' + rowID + '_BASE_AMT').val()).toFixed(8))));
                }

            });

            $('a[id*="compRatesSaveBtn"]').hide();
            $('a[id*="compRatesDeleteBtn"]').click(function () {
                var rowID = $(this).attr('row');

                var grid1 = compwithFormatter('compOHRatesGrid', $('#compOHRatesGrid').getRowData(rowID));
                $.ajax({
                    type: "POST",
                    url: getBaseUrl('/MctrCompRates/compositeDelete'),
                    data: { mctrCompRates: grid1 },
                    success: function (result) {
                        mctrObj.showDialog($("#dialog-box"), "Delete Successfull", "success");
                        location.reload();
                        //mctrObj.showDialog($("#dialog-box"), "Delete successfull", "success");

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                    }
                });

            });

            $('a[id*="compRatesSaveBtn"]').click(function () {
                

                var rowID = $(this).attr('row');
                // alert(rowID);
                var grid1 = compwithFormatter('compOHRatesGrid', $('#compOHRatesGrid').getRowData(rowID));


                // var grid1 = compwithFormatter('compOHRatesGrid', $('#compOHRatesGrid').getRowData(value['rowID']));
                if ($('input[id*=_CMPON_CD]').val() == '' || $('input[id*=_FISCAL_YEAR]').val() == '' || $('input[id*=_RSC_INPUT]').val() == '' || $('input[id*=_CUST_TYPE_INPUT]').val() == '' || $('input[id*=_BUM_INPUT]').val() == '' || $('input[id*=_RSC_OUTPUT]').val() == '' || $('input[id*=_POOL_OUTPUT]').val() == '' || $('input[id*=_COMP_SEQ]').val() == '' || $('#' + rowID +'_RATE_OVERRIDE').val() == '') {
                    mctrObj.showDialog($("#dialog-box"), "Please Enter the required fields", "error");

                }
                else {

                    $.ajax({
                        type: "POST",
                        url: getBaseUrl('/MctrCompRates/compositeInsert'),
                        data: { mctrCompRates: grid1 },
                        success: function (result) {
                            mctrObj.showDialog($("#dialog-box"), "Save Successfull", "success");
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                        }
                    });
                }
            });

            $("#compOHRatesGrid").find('input').change(function () {
                var rowID = $(this).attr('row');
                $('#' + rowID + '_compRatesSaveBtn').show();
            });

            if ($('#filterRow').length == 0) {

                var resizeTimer;
                $('.menu-collapse-button').on('click', function (e) {
                    if ($('#inputLabel').text() == 'Input________________') {
                        $('#outputLabel').text('Output______');
                        $('#inputLabel').text('Input____________');
                    }
                    else {
                        $('#outputLabel').text('Output________');
                        $('#inputLabel').addClass('mr-3')
                        $('#inputLabel').text('Input________________')
                    }
                });

                $('button[id$=duplicateBtn]').unbind('click').bind('click', function (e) {

                    var compwithFormatter = function (gridName, rowData) {
                        var colObject = {};
                        var colModel = $("#" + gridName).jqGrid("getGridParam", "colModel");
                        colModel.forEach(function (model, index) {
                            var elem = $(rowData[model.name]).not('a,br,button,label');
                            elem.each(function (i, obj) {
                                colObject[obj.id.slice(obj.id.indexOf('_') + 1)] = $('#' + obj.id).val();
                            })
                        });
                        return colObject;
                    };
                    var rowId = $(this).attr('row');
                    var grid1 = compwithFormatter('compOHRatesGrid', $('#compOHRatesGrid').getRowData(rowId));

                    $("#compOHRatesGrid").addRowData($("#compOHRatesGrid").jqGrid('getGridParam', 'records') + 1, grid1, 'after', rowId);
                });
            }
        };

        var firstColumnFormatter = function (cellvalue, options, rowObject) {
            cellvalue = cellvalue ? cellvalue : "";
            rowObject.FISCAL_YEAR = rowObject.FISCAL_YEAR ? rowObject.FISCAL_YEAR : "";
            rowObject.RSC_INPUT = rowObject.RSC_INPUT ? rowObject.RSC_INPUT : "";
            rowObject.CUST_TYPE_INPUT = rowObject.CUST_TYPE_INPUT ? rowObject.CUST_TYPE_INPUT : "";
            return '<input id=' + options.rowId + '_' + options.colModel.index + ' row="' + options.rowId + '" value="' + cellvalue + '" maxValue="2" readonly/><input id=' + options.rowId + '_FISCAL_YEAR row="' + options.rowId + '" maxValue="4" value="' + rowObject.FISCAL_YEAR + '" readonly/><input maxValue="3" id=' + options.rowId + '_RSC_INPUT row="' + options.rowId + '" value="' + rowObject.RSC_INPUT + '" readonly/><input maxValue="2" id=' + options.rowId + '_CUST_TYPE_INPUT row="' + options.rowId + '" value="' + rowObject.CUST_TYPE_INPUT + '" readonly/></br><button class="btn btn-primary" id="' + options.rowId + '_duplicateBtn"  row="' + options.rowId + '">Duplicate Record</button><a class="glyphicon glyphicon-trash" row="' + options.rowId + '" id=' + options.rowId + '_compRatesDeleteBtn title="Delete"></a><a class="glyphicon glyphicon-floppy-disk" row="' + options.rowId + '" id=' + options.rowId + '_compRatesSaveBtn title="Save"></a>';
            //<a class="glyphicon glyphicon-floppy-disk" row="' + options.rowId + ' id=' + options.rowId + '_compRatesSaveBtn value="Save"></a>';
        };

        var dividedInputFormatter = function (cellvalue, options, rowObject) {
            cellvalue = cellvalue ? cellvalue : "";
            return '<input maxValue="2" id=' + options.rowId + '_' + options.colModel.index + ' value="' + cellvalue + '" row="' + options.rowId + '" readonly/><br/><label class="jq-place-holder"></label>';
        };

        var inputFormatter = function (cellvalue, options, rowObject) {
            cellvalue = cellvalue ? cellvalue : 0;
            return '<label class="jq-place-holder"></label><br/><input id=' + options.rowId + '_' + options.colModel.index + ' row="' + options.rowId + '" value="' + parseFloat(cellvalue).toFixed(8) + '" disabled/>';
        };

        var rscFormatter = function (cellvalue, options, rowObject) {
            cellvalue = cellvalue ? cellvalue : "";
            rowObject.POOL_OUTPUT = rowObject.POOL_OUTPUT ? rowObject.POOL_OUTPUT : "";
            rowObject.COMP_SEQ = rowObject.COMP_SEQ ? rowObject.COMP_SEQ : "";
            rowObject.RATE_OVERRIDE = rowObject.RATE_OVERRIDE ? rowObject.RATE_OVERRIDE : "0";
            return '<input maxValue="3" id=' + options.rowId + '_' + options.colModel.index + ' row="' + options.rowId + '" value="' + cellvalue + '" readonly/><input maxValue="2" id=' + options.rowId + '_POOL_OUTPUT row="' + options.rowId + '" value="' + rowObject.POOL_OUTPUT + '" readonly/><input id=' + options.rowId + '_COMP_SEQ row="' + options.rowId + '" maxValue="1" value="' + rowObject.COMP_SEQ + '" readonly/></br><input id=' + options.rowId + '_RATE_OVERRIDE row="' + options.rowId + '" value="' + rowObject.RATE_OVERRIDE + '"/>';
        };

        var incrRatesFormatter = function (cellvalue, options, rowObject) {
            cellvalue = cellvalue ? cellvalue : 0;
            rowObject.RATE_I_RSC_POOL = rowObject.RATE_I_RSC_POOL ? rowObject.RATE_I_RSC_POOL : "";
            return '<a data-toggle="modal" data-target="#mctrModal" data-backdrop="static" href="' + getBaseUrl('/MctrCompRates/getRgRateILOV') + '?rowId=' + options.rowId + '" id=' + options.rowId + '_inrRatesPopUp class="btn btn-default btn-xs">&gt;</a><input id=' + options.rowId + '_RATE_I_RSC_POOL row="' + options.rowId + '" value="' + rowObject.RATE_I_RSC_POOL + '" disabled/></br><input id=' + options.rowId + '_RATE_I row="' + options.rowId + '" value="' + parseFloat(cellvalue).toFixed(6) + '" disabled/>';
        };

        var baseAmtFormatter = function (cellvalue, options, rowObject) {

            if (options.rowId != 'filterRow') {
                rowObject.BASE_AMT = rowObject.BASE_AMT ? rowObject.BASE_AMT : "0";
                var checked = cellvalue == 'Y' ? 'checked' : '';
                return '<input type="checkbox" id=' + options.rowId + '_baseAmtCheck row="' + options.rowId + '"' + checked + '/></br><input id=' + options.rowId + '_BASE_AMT row="' + options.rowId + '" value="' + rowObject.BASE_AMT + '" disabled/>';
            }
            else return '';
        };

        var columnNames = ['BU , Year , Pool RSC , Cust Type', 'BUM Cd', 'RSC Pool Seq \nOverride', 'Comp Rate', '= Incr Rate*', 'Base Amt'];
        var colModel = [{ key: false, name: 'CMPON_CD', index: 'CMPON_CD', editable: false, width: 70, formatter: firstColumnFormatter },
                { key: false, name: 'BUM_INPUT', index: 'BUM_INPUT', editable: false, width: 25, formatter: dividedInputFormatter },
                { key: false, name: 'RSC_OUTPUT', index: 'RSC_OUTPUT', editable: false, width: 85, formatter: rscFormatter },
                { key: false, name: 'RATE_OUTPUT', index: 'RATE_OUTPUT', editable: false, width: 90, formatter: inputFormatter },
                { key: false, name: 'RATE_I', index: 'RATE_I', formatter: 'number', formatoptions: { decimalSeparator: ".", decimalPlaces: 6, defaultValue: '0.000000' }, editable: false, width: 100, formatter: incrRatesFormatter },
                { key: false, name: 'INCL_BASE', index: 'INCL_BASE', editable: false, width: 50, formatter: baseAmtFormatter }];
        mctrObj.CreateJqGrid('compOHRatesGrid', '/MctrCompRates/mctrCompRatesOnLoadJSon', 'GET', {}, columnNames, colModel, false, '', [], 6, '100%', '', selectRowFn, gridCompleteFn, null, afterInsertRow);

        $('#buFrom').addClass('uppercase');
        $('#poolRSCFrom').addClass('uppercase');
        $('#lbrOHRscFrom').addClass('uppercase');
        $('#buFrom').prop('maxLength', 2);
        $('#poolRSCFrom').prop('maxLength', 3);
        $('#lbrOHRscFrom').prop('maxLength', 3);

        $('#buTo').addClass('uppercase');
        $('#poolRSCTo').addClass('uppercase');
        $('#lbrOHRscTo').addClass('uppercase');
        $('#buTo').prop('maxLength', 2);
        $('#poolRSCTo').prop('maxLength', 3);
        $('#lbrOHRscTo').prop('maxLength', 3);

        $('#yearTo').prop('maxLength', 4);

        $('#yearTo').keypress(function (e) {
            var a = [];
            var k = e.which;

            for (i = 48; i < 58; i++)
                a.push(i);

            if (!(a.indexOf(k) >= 0))
                e.preventDefault();
        });

        $('#copyFrom').on('click', function (e, obj) {
            var invalidInputs = $('input:required:invalid');
            if (invalidInputs.length == 0) {
                var buFrom = $('#buFrom').val();
                var buTo = $('#buTo').val();
                var yearFrom = $('#yearFrom').val();
                var yearTo = $('#yearTo').val();
                var poolRSCFrom = $('#poolRSCFrom').val();
                var poolRSCTo = $('#poolRSCTo').val();
                if (buFrom == buTo && yearFrom == yearTo && poolRSCFrom == poolRSCTo) {
                    var options = {
                        animation: true,
                        container: 'td',
                        placement: 'right',
                        title: "Copy from and copy to BU/Year/Pool must be different.",
                        html: true
                    };
                    $('#lbrOHRscTo').tooltip(options);
                    $('#lbrOHRscTo').tooltip('show');
                }
                else {
                    var mctrCompRates = {
                        copy_from_bu: buFrom,
                        copy_from_yr: yearFrom,
                        copy_from_pl_rsc: poolRSCFrom,
                        copy_to_bu: buTo,
                        copy_to_yr: yearTo,
                        copy_to_pl_rsc: poolRSCTo,
                        v_lbr_from_flg: $('#lbrOHRscFrom').val()

                    };
                    // var mctrCompRates = JSON.stringify({ 'mctrCompRates': mctrComp });
                    $.ajax({
                        type: "POST",
                        url: getBaseUrl('/MctrCompRates/selectBlockbutCopyWhenButtonPressed'),
                        data: mctrCompRates,
                        success: function (result) {
                            if (result != "") {
                                var v_lbr_from_flg = result.Count['v_lbr_from_flg'];
                                var v_lbr_to_flg = result.Count['v_lbr_to_flg'];
                                if (v_lbr_from_flg == 0) {
                                    mctrObj.showDialog($("#dialog-box"), "incremental rate labor rsc does not exist for the copy from.", "success");
                                }
                                else if (v_lbr_to_flg == 0) {
                                    mctrObj.showDialog($("#dialog-box"), "incremental rate labor rsc does not exist for the copy to.", "success");
                                }
                                else {
                                    mctrObj.showDialog($("#dialog-box"), "COPY successfull", "success");
                                }

                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                        }
                    });
                }
            }
            else {
                $('input:required:invalid').addClass('invalid');
                var options = {
                    animation: true,
                    container: 'td',
                    placement: 'right',
                    title: "Please fill the required values.",
                    html: true
                }
                $('#lbrOHRscTo').tooltip(options);
                $('#lbrOHRscTo').tooltip('show');
            }
        });
        $('input:required').change(function () {
            if ($(this).val() != '') {
                $(this).removeClass('invalid');
            }
        });

        $('.menu-collapse-button').on('click', function () {
            $('#lbrOHRscTo').tooltip('destroy');
        });

        $('input[id*=year]').keypress(function (e) {
            var a = [];
            var k = e.which;

            for (i = 48; i < 58; i++)
                a.push(i);

            if (!(a.indexOf(k) >= 0))
                e.preventDefault();
        });

        $('#lbrOHRscTo').on('hidden.bs.tooltip', function () {
            $('#lbrOHRscTo').tooltip('destroy');
        });

        $('#compOHRatesGrid').setGridParam({
            onPaging: function (pg) {

                if ($('#searchRow').length != 0) {
                    var filteredObjs = filterGrid();
                    $('#compOHRatesGrid').setGridParam({ data: filteredObjs });
                }
                else {
                    $('#compOHRatesGrid').setGridParam({ data: $('#compOHRatesGrid').getGridParam('userData') });
                }
            }
        });

        var filterGrid = function () {
            var searchRowData = compwithFormatter('compOHRatesGrid', $('#compOHRatesGrid').getRowData('searchRow'));
            var filteredObj = $('#compOHRatesGrid').getGridParam('userData');
            var filter = function (i, o) {
                filteredObj = $.grep(filteredObj, function (obj) {
                    return String(obj[i]) == o;
                });
            };

            $.each(searchRowData, function (i, o) {
                if (o != '' && o != "0.00000000" && o != "0.000000") {
                    filter(i, o);
                }
            });
            return filteredObj;
        };
        //Search function
        $('#searchBtn').click(function (e) {
            if ($('#searchRow').length == 0) {
                var parameters =
                    {
                        rowID: "searchRow",
                        position: "first",
                        useDefValues: false,
                        useFormatter: true,
                        addRowParams: { extraparam: {} }
                    };

                $("#compOHRatesGrid").addRow(parameters);
                //$('#searchRow_duplicateBtn').remove();
                $('#searchRow_compRatesDeleteBtn').remove();
                $('#searchRow_duplicateBtn').attr("disabled", "disabled");
                $('#searchRow_compRatesDeleteBtn').attr("disabled", "disabled");
                $('#searchRow_compRatesSaveBtn').remove();
            }
            else {
                var filteredObjs = filterGrid();
                $("#compOHRatesGrid").clearGridData(true);
                $("#compOHRatesGrid").jqGrid('setGridParam', {
                    datatype: 'local',
                    data: filteredObjs
                }).trigger("reloadGrid");
            }
        });



    
});

