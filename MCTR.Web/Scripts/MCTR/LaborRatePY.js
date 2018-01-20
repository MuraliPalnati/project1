$(document).ready(function () {


    $.ajax({
        url: getBaseUrl('/LbrRate/LbrRatesWhenNewFormInstance'),
        type: "GET",
        traditional: true,
        data: '',
        contentType: 'application/json; charset=utf-8',
        success: function (dataa) {
            if (dataa != null) {
                $('#f_year').val(dataa[0].f_year);
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
    }
    var gridCompleteFn = function () {
        $('#' + editedRowBtnId + '_cascadeBtn').show();
    };
    var columnNames = ['SetID(BU)', 'Fiscal Year', 'Labor Rate Cd7', 'Proj Trans Code', 'Rate'];
    var colModel = [
        { name: 'SETID',classes:'uppercase', index: 'SETID', classes: 'cell', stype: 'text', editable: true, editrules: { required: true } },
        { name: 'FISCAL_YEAR', index: 'FISCAL_YEAR', classes: 'cell', stype: 'text', width: 150, editable: true, editrules: { required: true, integer: true, minValue: 2000, maxValue: 2099 } },
        { name: 'LABOR_RATE_CD7', classes: 'uppercase', index: 'LABOR_RATE_CD7', stype: 'text', classes: 'cell', width: 150, editable: true, editrules: { required: true, custom: true, custom_func: validatelaborrate } },
        { name: 'PROJ_TRANS_CODE', classes: 'uppercase', index: 'PROJ_TRANS_CODE', classes: 'cell', stype: 'text', width: 150, editable: true, editrules: { required: true, custom: true, custom_func: validateprojtranscode } },
        { name: 'RATE', index: 'RATE',formatter:'currency',  formatoptions: { decimalSeparator: ".", decimalPlaces: 2, defaultValue: '0.00' }, classes: 'cell', width: 150, stype: 'text', editable: true, editrules: { custom: true, custom_func: validaterate, required: true, number: true } }, ];
    mctrObj.CreateJqGrid('tblJQGrid', '/LbrRate/LbrRateOnLoad', 'GET', {}, columnNames, colModel, false, '', [], 10, '100%', '', selectRowFn, gridCompleteFn);
    var editedRowBtnId;
    $("#tblJQGrid").navGrid('#pager', { edittitle: "Edit Selected Record", edit: true, addtitle: "Insert Record", add: true, deltitle: "Remove Record", del: true, searchtitle: "Find Records", search: true, refresh: true, closeAfterAdd: true },
        {
            // edit options
            zIndex: 100,
            url: getBaseUrl("/LbrRate/Edits"),
            closeOnEscape: true,
            closeAfterEdit: true,
            recreateForm: false,
            afterSubmit: function (response, data) {
                if (data != '') {
                    v_count = response.responseJSON[0].LbrCount['add'];

                    if (v_count == 0) {
                        mctrObj.showDialog($("#dialog-box"), "Record Edited Successfull", "success");
                        $("#tblJQGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid', [{ current: true }]);
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
                $("#SETID").attr("readonly", true);                
               
                
            },
            afterShowForm: function () {
                $('#SETID').prop('maxLength', 2);
                $('#FISCAL_YEAR').prop('maxLength', 4);
                $('#PROJ_TRANS_CODE').prop('maxLength', 5);
                $('#LABOR_RATE_CD7').prop('maxLength', 4);
                $('#RATE').prop('maxLength', 9);

                $('#RATE').prop('number', true);
            },
            afterComplete: function (response, postdata, formid) {
                if (response.status == 200) {
                    //var selRowId = $('#tblJQGrid').getGridParam('selrow');
                    //$("#tblJQGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid', [{ current: true }]);
                    //mctrObj.showDialog($("#dialog-box"), "The record has been edited successfully!", "success");
                    editedRowBtnId = postdata.id;
                }
                else {
                    //$("#tblJQGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                    mctrObj.showDialog($("#dialog-box"), response.responseText, "error");
                }
            },
            serializeEditData: function (postdata) {
                return { "lbrRateRequest": postdata, "editRowData": rowObject };
            }
        },
        {
            // add options
            zIndex: 100,
            url: getBaseUrl("/LbrRate/Create"),
            closeAfterAdd: true,
            mtype: "POST",
            datatype: 'json',
            afterSubmit: function (response, data)
            {  
                if (data != '')
                {
                    v_count = response.responseJSON[0].lbrCount['add'];

                    if (v_count == 0)
                    {
                        mctrObj.showDialog($("#dialog-box"), "Record Created Successfull", "success");
                        $("#tblJQGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                        return data;
                      
                    }
                    else
                    {
                    
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
                
                $("#SETID").removeAttr("readonly");
               
            },
            afterShowForm: function (formid) {

                $('#SETID').prop('maxLength', 2);
                $('#FISCAL_YEAR').prop('maxLength', 4);
                $('#LABOR_RATE_CD7').prop('maxLength', 2);
                $('#PROJ_TRANS_CODE').prop('maxLength', 3);
                $('#RATE').prop('maxLength', 20);              

                $('#SETID').blur(function () {
                    $('#FormError').hide();
                    if (($('#SETID').val() != '') && ($('#SETID').val().length <= 2)) {


                        var LbrPyRequest = {
                            SETID: $('#SETID').val().toUpperCase()
                        };
                        
                        var Input = JSON.stringify(LbrPyRequest);

                        
                        var errorFn = function (jqXHR, textStatus, errorThrown) {
                            

                        };

                        var succesFn = function (data) {
                           
                            if (data != null) {
                                if (data[0].v_count == 0) {
                                   
                                    $('#FormError').find('td').text('This BU is not in your BU/Group access');
                                    $('#FormError').show();
                                    $('#SETID').focus();
                                }

                            }
                        }
                        mctrObj.ajaxOptions('/LbrRate/lbrRatesetidPostChange', 'POST', Input, succesFn, errorFn);
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
                            $('#FormError').find('td').text('prior year must be a numeric value between 2000 and 2099');
                            $('#FormError').show();
                        }
                    }
                    else {
                        $('#FormError').find('td').text('Year is not in valid format');
                        $('#FormError').show();
                    }
                });
            },
            
        },
        {
            // delete options
            zIndex: 100,
            url: getBaseUrl("/LbrRate/Delete"),
            
            closeOnEscape: true,
            closeAfterDelete: true,
            recreateForm: true,
            datatype: "json",
            msg: "Are you sure you want to delete this task?",
            mtype: "POST", reloadAfterSubmit: false,
            onclickSubmit: function (rp_ge, postdata) {
                var rowData = $("#" + postdata).children();
                var json = {};
                json["lbrRate"] = {};
                json.lbrRate.SETID = rowData[0]["title"];
                json.lbrRate.FISCAL_YEAR = rowData[1]["title"];
                json.lbrRate.LABOR_RATE_CD7 = rowData[2]["title"];
                json.lbrRate.PROJ_TRANS_CODE = rowData[3]["title"];
                json.lbrRate.RATE = rowData[4]["title"];
                return json;
            },
            afterComplete: function (response) {
                if (response.status == 200) {
                    $("#jGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                    mctrObj.showDialog($("#dialog-box"), "The record has been deleted successfully!", "success");
                }
                else {
                    mctrObj.showDialog($("#dialog-box"), response.responseText, "error");
                }
            },
            serializeDelData: function (postdata) {
                return { "lbrRate": postdata.lbrRate };
            }
        },
        { width: 350, multipleSearch: true });


    function validatesetid(value, column) {
        if (value >= 2)
            return [false, "Please enter a valid BU"];
        else
            return [true, ""];
    }

    function validatefiscalyear() {
        if ($('#FISCAL_YEAR').val().length > 3)
            return [false, "Please enter a valid year"];
        else
            return [true, ""];
    }
    function validatelaborrate() {
        if ($('#LABOR_RATE_CD7').val().length > 3)
            return [false, " please enter valid labor rate"];
        else
            return [true, ""];

    }
    function validateprojtranscode() {
        if ($('#PROJ_TRANS_CODE').val.length > 3)
            return [false, "please enter valid proj trans code"];
        else
            return [true, ""];
    }

    function validaterate() {
        //if ($('#RATE').val().length > 12)
        //    return [false, "rate should be less than 12 float digits"];
        //else
        //    return [true, ""];
        var RateRegEx =/^\d{0,6}(\.\d{1,2})?$/;
        var rate=$('#RATE').val();
        if (!(RateRegEx.test(rate)))
            return [false, "Please enter valid Rate"];
        else
            return [true, ""];

    }

    
    $('.lbrpy-modal-body').append('<iframe id="downloadFrame" style="display:none"></iframe>');
    $('#dwnloadBtn').unbind('click').bind('click', (function () {
        $('#downloadFrame').attr('src', getBaseUrl('/LbrRate/selectionbutRatesListWhenButtonPressed')+'?f_year=' + $('#f_year').val());
    }));
});