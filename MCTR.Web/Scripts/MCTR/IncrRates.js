$(document).ready(function () {

    $.ajax({
        url: getBaseUrl('/MctrIncrRates/mctrIncrRatesWhenNewFormInstance'),
        type: "GET",
        traditional: true,
        data: '',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data != null) {
                $('#f_year').val(data[0].f_year);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });

    var mctrObj = new MCTR();
    var rowObject = {};
    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#tblJQGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var cascadeFormatter = function (cellvalue, options, rowObject) {
        if (cellvalue == "cascade") {
            return '<a id=' + options.rowId + '_cascadeBtn class="btn btn-default btn-sm" row-id="' + options.rowId + '">Cascade</a>';
        }
        else { return ""; }
    };

    var gridCompleteFn = function () {

        $('a[id*=cascadeBtn]').on('click', function (e, obj) {

            var mctrIncrRates = $("#tblJQGrid").getRowData($(e.currentTarget).attr('row-id'));
            mctrIncrRates.CASCADE_FLG = "cascade";
            $.ajax({
                type: "POST",
                url: getBaseUrl("/MctrIncrRates/mctrIncrRatescascadeFlgWhenMouseClick"),
                data: mctrIncrRates,
                success: function (result) {
                },
                error: function (req, status, error) {
                }
            });


            $("#tblJQGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
        })
    };
    var columnNames = ['BU', 'Year', 'Pool/RSC', 'Rate'];
    var colModel = [
          { name: 'CMPON_CD', index: 'CMPON_CD', classes: 'cell', stype: 'text', editable: true, classes:'uppercase'},
          { name: 'FISCAL_YEAR', index: 'FISCAL_YEAR', classes: 'cell', stype: 'text', width: 150, editable: true, editrules: { integer: true, minValue: 2000, maxValue: 2099, required: true } },
          { name: 'RSC_POOL', index: 'RSC_POOL', stype: 'text', classes: 'cell', width: 150, editable: true, editrules: { custom: true, custom_func: validaterscpool, required: true } },
          { name: 'RATE', index: 'RATE', formatter: 'number', formatoptions: { decimalSeparator: ".", decimalPlaces: 6, defaultValue: '0.000000' }, classes: 'cell', width: 150, stype: 'text', editable: true, editrules: { number: true } },
          ];
    mctrObj.CreateJqGrid('tblJQGrid', '/MctrIncrRates/mctrIncrRatesMctrIncrRatesOnLoad', 'POST', {}, columnNames, colModel, false, '', [], 10, '100%', '', selectRowFn, gridCompleteFn);

    var editedRowBtnId;
    $("#tblJQGrid").navGrid('#pager', { edittitle: "Edit Selected Record", edit: true, addtitle: "Insert Record", add: true, deltitle: "Remove Record", del: true, searchtitle: "Find Records", search: true, refresh: true },
        {
            // edit options
            zIndex: 100,
            url: getBaseUrl("/MctrIncrRates/Edits"),
            closeOnEscape: true,
            closeAfterEdit: true,
            recreateForm: false,
            afterSubmit: function (response, data) {
                if (data != '') {
                    v_count = response.responseJSON[0].IncrCount['add'];

                    if (v_count == 0) {
                        mctrObj.showDialog($("#dialog-box"), "Record Edited Successfull", "success");
                        $("#tblJQGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                        return data;
                    }
                    else {

                        $('#FormError').find('td').text('Unable to update record');
                        $('#FormError').show();
                        return [false];
                    }
                }
            },
            errorTextFormat: function (data) {
                if (data.status == 500)
                    return data.responseText;
            },
            beforeShowForm: function () {
                $("#CMPON_CD").attr('readonly', true);
                $('#CMPON_CD').css('background-color', '#FF0000');
               
            },
            afterShowForm: function () {
                $('#CMPON_CD').prop('maxLength', 2);
                $('#FISCAL_YEAR').prop('maxLength', 4);
                $('#RSC_POOL').prop('maxLength', 3);
                $('#RATE').prop('maxLength', 20);
            },
            afterComplete: function (response, postdata, formid) {
                if (response.status == 200) {
                    $("#tblJQGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                    mctrObj.showDialog($("#dialog-box"), "The record has been edited successfully!", "success");
                    editedRowBtnId = postdata.id;
                }
                else {
                    $("#tblJQGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                    mctrObj.showDialog($("#dialog-box"), response.responseText, "error");
                }
            },
            serializeEditData: function (postdata) {
                return { "IncrRatesRequest": postdata, "editRowData": rowObject };
            }
        },
        {
            // add options
            zIndex: 100,
            url: getBaseUrl("/MctrIncrRates/Create"),
            closeAfterAdd: true,
            mtype: "POST",
            datatype: 'json',
            afterSubmit: function (response, data) {
                if (data != '') {
                    if (($('#CMPON_CD').val() != '') && ($('#CMPON_CD').val().length <= 2)) {


                        var IncrRequest = {
                            CMPON_CD: $('#CMPON_CD').val().toUpperCase()
                        };

                        var Input = JSON.stringify(IncrRequest);


                        var errorFn = function (jqXHR, textStatus, errorThrown) {


                        };

                        var succesFn = function (data) {

                            if (data != null) {
                                if (data[0].v_count == 0) {

                                    $('#FormError').find('td').text('This BU is not in your BU/Group access');
                                    $('#FormError').show();
                                    $('#CMPON_CD').focus();
                                }
                            }
                        }
                        mctrObj.ajaxOptions('/MctrIncrRates/mctrIncrRatescmponCdPostTextItem', 'POST', Input, succesFn, errorFn);
                    }
                    else {
                        $('#FormError').find('td').text('Please enter correct BU');
                        $('#FormError').show();
                    }
                    v_count = response.responseJSON[0].IncrCount['add'];
                   
                    if (v_count == 0) {
                        mctrObj.showDialog($("#dialog-box"), "Record Created Successfull", "success");
                        $("#tblJQGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                        return data;

                    }
                    else {

                        $('#FormError').find('td').text('Duplicate Record cannot be Added');
                        $('#FormError').show();
                        return [false];
                    }
                }
            },
            errorTextFormat: function (data) {
                if (data.status == 500)
                    return data.responseText;
            },
            beforeShowForm: function () {
                $("#CMPON_CD").removeAttr("readonly");
                
            },
            afterShowForm: function (formid) {

                $('#CMPON_CD').keyup(function () {
                    //this.value = this.value.toUpperCase();
                });


                $('#RSC_POOL').keyup(function () {
                    this.value = this.value.toUpperCase();
                });



                $('#CMPON_CD').prop('maxLength', 2);
                $('#FISCAL_YEAR').prop('maxLength', 4);
                $('#RSC_POOL').prop('maxLength', 3);
                $('#RATE').prop('maxLength', 20);
                $('.edithdtblJQGrid').find('CMPON_CD').on('blur', function (e, obj) {
                    var vClass = $(this).attr('class');
                    var change = $(this).val();
                        if ($('#CMPON_CD').val() != '') {
                            $(this).trigger('change');
                        }
                });

                $('#CMPON_CD').on('change', function (e, obj) {
                    $('#FormError').hide();
                    if (($('#CMPON_CD').val() != '') && ($('#CMPON_CD').val().length <= 2)) {


                        var IncrRequest = {
                            CMPON_CD: $('#CMPON_CD').val().toUpperCase()
                        };
                      
                        var Input = JSON.stringify(IncrRequest);

                        
                        var errorFn = function (jqXHR, textStatus, errorThrown) {


                        };

                        var succesFn = function (data) {
                           
                            if (data != null) {
                                if (data[0].v_count == 0) {
                                   
                                    $('#FormError').find('td').text('This BU is not in your BU/Group access');
                                    $('#FormError').show();
                                    $('#CMPON_CD').focus();
                                }
                            }
                        }
                        mctrObj.ajaxOptions('/MctrIncrRates/mctrIncrRatescmponCdPostTextItem', 'POST', Input, succesFn, errorFn);
                    }
                    else {
                        $('#FormError').find('td').text('Please enter correct BU');
                        $('#FormError').show();
                    }
                });



                $('#FISCAL_YEAR').change(function () {
                    if ($.isNumeric($('#FISCAL_YEAR').val()) && $('#FISCAL_YEAR').val() != '') {
                        $('#FormError').hide();
                        if (($('#FISCAL_YEAR').val() >= 2000) && ($('#FISCAL_YEAR').val() <= 2099)) {
                            $('#FormError').hide();
                        }
                        else {
                            $('#FormError').find('td').text('Prior year must be a numeric value between 2000 and 2099');
                            $('#FormError').show();
                        }
                    }
                    else {
                        $('#FormError').find('td').text('Year is not in valid format');
                        $('#FormError').show();
                    }
                });



            },
            afterComplete: function (response) {
                if (response.status == 200) {
                    $("#tblJQGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                    mctrObj.showDialog($("#dialog-box"), "The record has been added successfully!", "success");
                }
                else {
                    $("#tblJQGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                    mctrObj.showDialog($("#dialog-box"), response.responseText, "error");
                }
            }
        },
        {
            // delete options
            zIndex: 100,
            url: getBaseUrl("/MctrIncrRates/Deletes"),
            closeOnEscape: true,
            closeAfterDelete: true,
            recreateForm: true,
            msg: "Are you sure you want to delete this task?",
            mtype: "POST", reloadAfterSubmit: false,
            onclickSubmit: function (rp_ge, postdata) {
                var rowData = $("#" + postdata).children();
                var json = {};
                json["mctrIncrRates"] = {};
                json.mctrIncrRates.CMPON_CD = rowData[0]["title"];
                json.mctrIncrRates.FISCAL_YEAR = rowData[1]["title"];
                json.mctrIncrRates.RSC_POOL = rowData[2]["title"];
                json.mctrIncrRates.RATE = rowData[3]["title"];
                return json;
            },
            afterComplete: function (response) {
                if (response.status == 200) {
                    $("#tblJQGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                    mctrObj.showDialog($("#dialog-box"), "The record has been deleted successfully!", "success");
                }
                else {
                    $("#tblJQGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                    mctrObj.showDialog($("#dialog-box"), response.responseText, "error");
                }
            },
            serializeDelData: function (postdata) {
                return { "MctrIncrRates": postdata.mctrIncrRates };
            }
        },
        {
            width:350,
            multipleSearch: true
        });


    function validatecmponcd() {
        if ($('#CMPON_CD').val().length > 2)
            return [false, "Please enter a valid BU"];
        else
            return [true, ""];
    }


    function validaterscpool() {
        if ($('#RSC_POOL').val().length > 3)
            return [false, "Please enter a valid pool/rsc"];
        else
            return [true, ""];
    }

    function validaterate() {
        if ($('#RATE').val().length > 12)
            return [false, "rate should be less than 12 float digits"];
        else
            return [true, ""];
    }

    $('.incr-modal-body').append('<iframe id="downloadFrame" style="display:none"></iframe>');
    $('#dwnloadBtn').unbind('click').bind('click', (function () {
        $('#downloadFrame').attr('src', getBaseUrl('/MctrIncrRates/selectionbutRatesListWhenButtonPressed')+'?f_year=' + $('#f_year').val());

    }));

})