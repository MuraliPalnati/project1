$(document).ready(function () {



    var mctrObj = new MCTR();
    var rowObject = {};
    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#tblJQGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var userIsAuth;
    var successFn = function (data, xhr, xhrResponse) {
        if (data != null) {

            if (data == "Y") {

                userIsAuth = true;
            }
            else {
                userIsAuth = false;
            }
            $("#tblJQGrid").navGrid('#pager', { edittitle: "Edit selected Record", edit: userIsAuth, addtitle: "Insert Record", add: (userIsAuth ? true : false), deltitle: "Remove Record", del: (userIsAuth ? true : false), searchtitle: "Find Records", search: true, refresh: true },

                {
                    // edit options
                    zIndex: 100,
                    url: getBaseUrl("/TransType/transTypeEdit"),      
                    closeOnEscape: true,
                    closeAfterEdit: true,
                    recreateForm: false,
                    afterSubmit: function (response, data) {
                        if (data != '') {
                            v_count = response.responseJSON[0].TransCount['add'];

                            if (v_count == 0) {
                                mctrObj.showDialog($("#dialog-box"), "Record Edited Successfull", "success");
                                $("#tblJQGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid', [{ current: true }]);
                                return data;

                            }
                            else {

                                $('#FormError').find('td').text('Update cannot be allowed');
                                $('#FormError').show();
                                return [false];
                            }
                        }
                       
                    },
                    errorTextFormat: function (data) {
                        if (data.status == 500)
                            return data.responseText;
                    },
                    afterShowForm: function (formid) {  
                        $('#CMPON_CD').keyup(function () {
                            this.value = this.value.toUpperCase();
                        });

                        $('#PROJ_TRANS_TYPE').keyup(function () {
                            this.value = this.value.toUpperCase();
                        });


                        $('#PROJ_TRANS_CODE').keyup(function () {
                            this.value = this.value.toUpperCase();
                        });




                        $('#STATISTICS_CODE').keyup(function () {
                            this.value = this.value.toUpperCase();
                        });




                        $('#UNIT_OF_MEASURE').keyup(function () {
                            this.value = this.value.toUpperCase();
                        });
                        
                        $('#CMPON_CD').blur(function () {
                            $('#FormError').hide();
                            if (($('#CMPON_CD').val() != '') && ($('#CMPON_CD').val().length <= 2)) {


                                var TransTypeRequest = {
                                    CMPON_CD: $('#CMPON_CD').val().toUpperCase()
                                };
                               
                                var Input = JSON.stringify(TransTypeRequest);

                              
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
                                mctrObj.ajaxOptions('/TransType/transTypecmponCdPostTextItem', 'POST', Input, succesFn, errorFn);
                            }
                            else {
                                $('#FormError').find('td').text('Please enter correct BU');
                                $('#FormError').show();
                            }
                        });
                    },
                    afterComplete: function (response, postdata, formid) {
                        if (response.status == 200) {
                            $("#tblJQGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid', [{current:true}]);
                            mctrObj.showDialog($("#dialog-box"), response.textStatus, "success");
                            mctrObj.showDialog($('#dialog-box'), 'The record has been edited successfully!', 'success');
                            editedRowBtnId = postdata.id;
                           

                            
                        }
                        else {
                           // $("#tblJQGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid', [{ current: true }]);
                            mctrObj.showDialog($("#dialog-box"), response.responseText, "error");
                        }
                    },
                    serializeEditData: function (postdata) {
                        return { "transTypeRequest": postdata, "editRowData": rowObject };
            }
                },
                {
                    // add options
                    zIndex: 100,
                    url: getBaseUrl("/TransType/transTypeWhenNewFormInstance"),
                    closeAfterAdd: true,
                    mtype: "POST",
                    datatype: 'json',
                    afterSubmit: function (response, data) {
                        if (data != '') {
                           
                            v_count = response.responseJSON[0].TransCount['add'];

                            if (v_count == 0) {
                                mctrObj.showDialog($("#dialog-box"), "Record Created Successfull", "success");
                                $("#tblJQGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid', [{ current: true }]);
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


                    afterShowForm: function (formid) {  
                        $('#CMPON_CD').keyup(function () {
                            this.value = this.value.toUpperCase();
                        });

                        $('#PROJ_TRANS_TYPE').keyup(function () {
                            this.value = this.value.toUpperCase();
                        });


                        $('#PROJ_TRANS_CODE').keyup(function () {
                            this.value = this.value.toUpperCase();
                        });




                        $('#STATISTICS_CODE').keyup(function () {
                            this.value = this.value.toUpperCase();
                        });

                        $('#UNIT_OF_MEASURE').keyup(function () {
                            this.value = this.value.toUpperCase();
                        });
                        $('#CMPON_CD').change(function () {
                            $('#FormError').hide();
                        });

                        $('#CMPON_CD').blur(function () {
                            if (($('#CMPON_CD').val() != '') && ($('#CMPON_CD').val().length <= 2)) {
                                var TransTypeRequest = {
                                    CMPON_CD: $('#CMPON_CD').val().toUpperCase()
                                };
                              
                                var Input = JSON.stringify(TransTypeRequest);

                               
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
                                mctrObj.ajaxOptions('/TransType/transTypecmponCdPostTextItem', 'POST', Input, succesFn, errorFn);
                            }
                            else {
                                $('#FormError').find('td').text('Please enter correct BU');
                                $('#FormError').show();
                            }
                        });

                        $('#PROJ_TRANS_TYPE').focusin(function () {
                            if ($('#CMPON_CD').val() == '') {
                                $("#CMPON_CD").focus();
                            }
                        });
                        $('#PROJ_TRANS_CODE').focusin(function () {
                            if ($('#CMPON_CD').val() == '') {
                                $("#CMPON_CD").focus();
                            }
                        });
                        $('#STATISTICS_CODE').focusin(function () {
                            if ($('#CMPON_CD').val() == '') {
                                $("#CMPON_CD").focus();
                            }
                        });

                        $('#UNIT_OF_MEASURE').focusin(function () {
                            if ($('#CMPON_CD').val() == '') {
                                $("#CMPON_CD").focus();
                            }
                        });
                        $('#CMPON_CD').keyup(function () {
                            this.value = this.value.toUpperCase();
                        });
                        
                        $('#PROJ_TRANS_TYPE').keyup(function () {
                            this.value = this.value.toUpperCase();
                        });

                        $('#PROJ_TRANS_CODE').keyup(function () {
                            this.value = this.value.toUpperCase();
                        });

                        $('#STATISTICS_CODE').keyup(function () {
                            this.value = this.value.toUpperCase();
                        });

                        $('#UNIT_OF_MEASURE').keyup(function () {
                            this.value = this.value.toUpperCase();
                        });
                        


                    },
                    afterComplete: function (response) {
                        if (response.status == 200) {
                            $("#tblJQGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid', [{ current: true }]);
                            mctrObj.showDialog($("#dialog-box"), "The record has been added successfully!", "success");
                           
                        }
                        else {
                            //$("#tblJQGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                            mctrObj.showDialog($("#dialog-box"), response.responseText, "error");
                        }
                    }
                },
                {
                    // delete options
                    zIndex: 100,
                    url: getBaseUrl("/TransType/transTypeDelete"),
                    closeOnEscape: true,
                    closeAfterDelete: true,
                    recreateForm: true,
                    msg: "Are you sure you want to delete this task?",
                    mtype: "POST", reloadAfterSubmit: false,
                    onclickSubmit: function (rp_ge, postdata) {
                        var rowData = $("#" + postdata).children();
                        var json = {};
                        json["transtype"] = {};
                        json.transtype.CMPON_CD = rowData[0]["title"];
                        json.transtype.PROJ_TRANS_TYPE = rowData[1]["title"];
                        json.transtype.PROJ_TRANS_CODE = rowData[2]["title"];
                        json.transtype.STATISTICS_CODE = rowData[3]["title"];
                        json.transtype.UNIT_OF_MEASURE = rowData[4]["title"];


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
                        return { "transtype": postdata.transtype };
                    }
                },
                {
                    width: 350, multipleSearch: true
                });
        }
    }
    var errorFn = function (data, error, xhrResponse) {
        var x = data;
    }
    mctrObj.ajaxOptions('/TransType/rolecheck', 'GET', null, successFn, errorFn);
    columnNames = ['Bus Unit', 'Proj Trans Type', 'Proj Trans Code', 'Stat Code', 'Unit Of Measure'],
    colModel = [
    { key: false, name: 'CMPON_CD', index: 'CMPON_CD', classes: 'cell', stype: 'text', editoptions: { maxlength: "2" }, editable: true, editrules: { required: true } },
    { key: false, name: 'PROJ_TRANS_TYPE', index: 'PROJ_TRANS_TYPE', classes: 'cell', stype: 'text', editable: true, editoptions: { maxlength: "3" }, editrules: { custom: true, custom_func: validateprojtranstype, required: true } },
    { key: false, name: 'PROJ_TRANS_CODE', index: 'PROJ_TRANS_CODE', classes: 'cell', stype: 'text', editable: true, editoptions: { maxlength: "3" }, editrules: { custom: true, custom_func: validateprojtranscode } },
    { key: false, name: 'STATISTICS_CODE', index: 'STATISTICS_CODE', classes: 'cell', stype: 'text', editable: true, editoptions: { maxlength: "3" }, editrules: { custom: true, custom_func: validatestatisticscode } },
    { key: false, name: 'UNIT_OF_MEASURE', index: 'UNIT_OF_MEASURE', classes: 'cell', stype: 'text', editable: true, editoptions: { maxlength: "3" }, editrules: { custom: true, custom_func: validateunitofmeasure } }],

    mctrObj.CreateJqGrid('tblJQGrid', "/TransType/transtypeonload", 'POST', {}, columnNames, colModel, false, '', [], 10, '100%', '', selectRowFn, null);
    var editedRowBtnId;

    function validatecmponcd(value, column) {
        if (value >= 2)
            return [false, "Please enter a valid BU"];
        else
            return [true, ""];
    }

    function validateprojtranstype() {
        if ($('#PROJ_TRANS_TYPE').val().length > 3)
            return [false, "Please enter a valid projtranstype"];
        else
            return [true, ""];
    }
    function validateprojtranscode() {
        if ($('#PROJ_TRANS_CODE').val().length > 3)
            return [false, "Please enter a valid transcode"];
        else
            return [true, ""];
    }

    function validatestatisticscode() {
        if ($('#STATISTICS_CODE').val().length > 3)
            return [false, "Please enter a valid statistics code"];
        else
            return [true, ""];
    }

    function validateunitofmeasure() {
        if ($('#UNIT_OF_MEASURE').val().length > 3)
            return [false, "Please enter a valid unit of measure"];
        else
            return [true, ""];
    }

})








