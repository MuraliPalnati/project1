$(document).ready(function () {

    function resetPopupCheckBoxes() {
        $('#Bulk_Flg').removeAttr("disabled");
        $('#Rsc_Lbr_Flg').removeAttr("disabled");
        $('#Cls_Vdt_Flg').removeAttr("disabled");
        $('#Reject_Flg').removeAttr("disabled");
        $('#Man_Rated_Flg').removeAttr("disabled");
        $('#Pyr_Only_Flg').removeAttr("disabled");

        $('#Bulk_Flg').prop("checked", false);
        $('#Rsc_Lbr_Flg').prop("checked", false);
        $('#Cls_Vdt_Flg').prop("checked", false);
        $('#Reject_Flg').prop("checked", false);
        $('#Man_Rated_Flg').prop("checked", false);
        $('#Pyr_Only_Flg').prop("checked", false);
    }
    function validateprojtranstype() {

        if ($("#jGrid").find("*").hasClass("invalid"))
            return [false, "Please validate the highlighted fields"];
        else
            return [true, ""];
    }

    function disablePopupCheckBoxes() {
        $('#Bulk_Flg').attr("disabled", true);
        $('#Rsc_Lbr_Flg').attr("disabled", true);
        $('#Cls_Vdt_Flg').attr("disabled", true);
        $('#Reject_Flg').attr("disabled", true);
        $('#Man_Rated_Flg').attr("disabled", true);
        $('#Pyr_Only_Flg').attr("disabled", true);
    }
    var formatter = function (cellvalue, options, rowObject) {
        return '<a data-toggle="modal" data-target="#mctrModal" data-backdrop="static" href="' + getBaseUrl('/Buprofile/getRgAdminLOV') + '?id=' + rowObject.Business_Unit + '&rowId=' + options.rowId + '" id=' + options.rowId + '_popUpbtn class="btn btn-default btn-xs">	&gt;</a>';

    };


    $('#Save-button').click(function () {
        var rowId = $('#rowId').val();
        var buProfile = $('#jGrid').getRowData(rowId);
        var Input = JSON.stringify(buProfile);
        $.ajax({
            url: getBaseUrl('/BUProfile/buProfilePostUpdate'),
            type: "POST",
            traditional: true,
            data: Input,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {

                if (data != null) {
                    mctrObj.showDialog($("#dialog-box"), 'Record updated successfully', "success");
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    });

    var mctrObj = new MCTR();

    $("#jGrid").jqGrid({
        url: getBaseUrl("/BUProfile/GetAllBUProfiles"),
        datatype: 'json',
        mtype: 'Get',
        colNames: ['Id', 'Bus Unit', 'Check Bulk Flag', 'RSC TTD LBR', 'Check Class Code', 'EO&T Reject Flag ', 'Man Rated Flag', 'PYR Only Flag', 'Offset Activity', 'Offset Project', 'Offset Account', '', 'BEMS Admin', 'Name'],
        colModel: [{ key: true, hidden: true, name: 'Id', index: 'Id', editable: true },
             { key: false, name: 'Business_Unit', index: 'Business_Unit', editable: true, editoptions: { maxlength: "2", dataInit: function (el) { $(el).css('text-transform', 'uppercase'); } }, editrules: { required: true }, classes: 'uppercase' },
             { key: false, name: 'Bulk_Flg', index: 'Bulk_Flg', editable: true, width: 70, align: "center", edittype: 'checkbox', formatter: "checkbox", formatoptions: { disabled: true }, editoptions: { value: "Y:N" }, },
             { key: false, name: 'Rsc_Lbr_Flg', index: 'Rsc_Lbr_Flg', editable: true, width: 70, align: "center", edittype: 'checkbox', formatter: "checkbox", formatoptions: { disabled: true }, editoptions: { value: "Y:N" } },
             { key: false, name: 'Cls_Vdt_Flg', index: 'Cls_Vdt_Flg', editable: true, width: 70, align: "center", edittype: 'checkbox', formatter: "checkbox", formatoptions: { disabled: true }, editoptions: { value: "Y:N" } },
             { key: false, name: 'Reject_Flg', index: 'Reject_Flg', editable: true, width: 70, align: "center", edittype: 'checkbox', formatter: "checkbox", formatoptions: { disabled: true }, editoptions: { value: "Y:N" } },
             { key: false, name: 'Man_Rated_Flg', index: 'Man_Rated_Flg', editable: true, width: 70, align: "center", edittype: 'checkbox', formatter: "checkbox", formatoptions: { disabled: true }, editoptions: { value: "Y:N" } },
             { key: false, name: 'Pyr_Only_Flg', index: 'Pyr_Only_Flg', editable: true, width: 70, align: "center", edittype: 'checkbox', formatter: "checkbox", formatoptions: { disabled: true }, editoptions: { value: "Y:N" } },
             {
                 key: false, name: 'Offset_Activity', index: 'Offset_Activity', classes: 'uppercase', editable: true, search: true, editrules: {
                     custom: true, custom_func: validateprojtranstype, required: true
                 }
             },
             { key: false, name: 'Offset_Project', index: 'Offset_Project', classes: 'uppercase', editable: true, search: false, editrules: { required: true, custom: true, custom_func: validateprojtranstype, required: true } },
             { key: false, name: 'Offset_Account', index: 'Offset_Account', classes: 'uppercase', editable: true, search: false, editrules: { required: true, custom: true, custom_func: validateprojtranstype, required: true } },

             {
                 name: 'popUpBtn', index: 'popUpBtn', edittype: 'custom', width: 0, editable: true, editoptions: {
                     custom_element: function (value, options) {
                         return $('<a data-toggle="modal" data-target="#mctrModal" data-backdrop="static" href="' + getBaseUrl('/Buprofile/getRgAdminLOV') + '?id=' + $('#Business_Unit').val() + '" id=' + options.rowId + '_popUpbtn class="btn btn-default btn-xs" >&gt;</a>')[0];
                     },
                     custom_value: function (value, options) {
                         return true;
                     }
                 }, sortable: false, hidden: true, formatter: formatter
             },
             { key: false, name: 'Bems_Admin', index: 'Bems_Admin', editable: true, editoptions: { disabled: true } },
             { key: false, name: 'LastName', index: 'LastName', width: 180, editable: true, editoptions: { disabled: true } }
        ],
        pager: $('#buPager'),
        rowNum: 10,
        height: '100%',
        viewrecords: true,
        ignoreCase: true,
        pgtext: null,
        loadonce: true,
        search: true,
        //cellEdit:true,
        emptyrecords: 'No records to display',
        jsonReader: {
            page: "page",
            total: "total",
            records: "records",
            rows: "rows",
            Id: "0"
        },
        multiselect: false
    }).navGrid('#buPager', { edittitle: "Edit Selected Record", edit: true, addtitle: "Insert Record", add: true, deltitle: "Remove Record", del: true, searchtitle: "Find Records", search: true, refresh: true },

{
    // edit options
    zIndex: 100,
    url: getBaseUrl("/BUProfile/buProfilePostUpdate"),
    closeOnEscape: true,
    closeAfterEdit: true,
    recreateForm: true,
    errorTextFormat: function (data) {
        if (data.status == 500)
            return "Please validate the highlighted fields before submit"; 
    },
    beforeShowForm: function () {
        $("#Business_Unit").attr('readonly', true);
        $('#Offset_Activity').addClass('uppercase');
        $('#Offset_Project').addClass('uppercase');
        $('#Offset_Account').addClass('uppercase');
        $('.invalid').removeClass('invalid');
    },
    afterShowForm: function (formid) {
        $('#tr_popUpBtn').show();

        $('#Offset_Account').on('change', function (e, obj) {
            e.preventDefault();
            $('#Offset_Account').removeClass('invalid');
            if ($('#Business_Unit').val() != '') {
                if ($('#Offset_Activity').val() != '') {
                    // if ($('#FormError').find('td').text() == '') {
                    this.value = this.value.toUpperCase();
                    $('#FormError').hide();

                    var mctrBuProfile = {
                        Business_Unit: $('#Business_Unit').val(),
                        Offset_Account: $('#Offset_Account').val(),
                        Offset_Activity: $('#Offset_Activity').val(),
                        Offset_Project: $('#Offset_Project').val()
                    };
                    var Input = JSON.stringify(mctrBuProfile);
                    var errorFn = function (jqXHR, textStatus, errorThrown) {
                    };
                    var succesFn = function (data) {
                        //$('#FormError').hide();
                        if (data[0].V_Count['account1'] == 0) {
                            $('#FormError').find('td').text('Account ' + $('#Offset_Account').val() + ' and BU' + $('#Business_Unit').val() + '  combination could not be validated using eas account or project tables.');
                            $('#FormError').show();
                            $('#Offset_Account').focus();
                            $('#Offset_Account').addClass('invalid');
                            return false;
                        }
                        else {
                            $('#FormError').find('td').text('');
                            $('#FormError').hide();
                        }

                    }
                    mctrObj.ajaxOptions('/BuProfile/buProfileoffsetAccountPostTextItem', 'POST', Input, succesFn, errorFn);

                    //  }

                }
                else {
                    $('#FormError').find('td').text('Please enter Offset Activity .');
                    $('#FormError').show();
                    $('#Offset_Activity').focus();
                    $('#Offset_Account').val('');
                }
            }

            else {
                $('#FormError').find('td').text('Please enter Business Unit.');
                $('#FormError').show();
                $('#Business_Unit').focus();
                $('#Offset_Account').val('');
            }

        });
        $('#Offset_Activity').on('change', function (e, obj) {
            $('#Offset_Activity').removeClass('invalid');
            e.preventDefault();
            if ($('#Business_Unit').val() != '') {
                // if ($('#FormError').find('td').text() == '') {
                this.value = this.value.toUpperCase();
                // $('#FormError').hide();


                var mctrBuProfile = {
                    Business_Unit: $('#Business_Unit').val(),
                    Offset_Activity: $('#Offset_Activity').val(),
                    Offset_Project: $('#Offset_Project').val()

                };
                var Input = JSON.stringify(mctrBuProfile);
                var errorFn = function (jqXHR, textStatus, errorThrown) {
                    //$('#FormError').find('td').text(JSON.parse(jqXHR.responseText).Message);
                    //$('#FormError').show();

                };
                var succesFn = function (data) {
                    //$('#FormError').hide();
                    if (data[0].V_Count['offset1'] == 0) {
                        $('#FormError').find('td').text('new acitivity Id is entered in this case');
                        $('#FormError').show();
                        $('#Offset_Activity').focus();

                    }
                    else {
                        $('#FormError').find('td').text('');
                        $('#FormError').hide();
                    }

                    if (data[0].V_Count['offset2'] == 0) {
                        $('#FormError').find('td').text('Activity  ' + $('#Offset_Activity').val() + '  BU  ' + $('#Business_Unit').val() + '  combination entered could not be validated using EAS PS_PROJ_ACTIVITY_7 table.');
                        $('#FormError').show();
                        $('#Offset_Activity').focus();
                        $('#Offset_Activity').addClass('invalid');
                    }
                    else {
                        $('#FormError').find('td').text('');
                        $('#FormError').hide();
                    }

                }
                mctrObj.ajaxOptions('/BuProfile/buProfileoffsetActivityPostTextItem', 'POST', Input, succesFn, errorFn);



                //  }

            }
                //
            else {
                $('#FormError').find('td').text('Please enter Business Unit.');
                $('#Offset_Activity').val('');
                $('#FormError').show();
                $('#Business_Unit').focus();
            }


        });
        $('#Offset_Project').on('change', function (e, obj) {
            $('#Offset_Project').removeClass('invalid');
            e.preventDefault();
            if ($('#Business_Unit').val() != '') {
                if ($('#Offset_Activity').val() != '') {
                    //    if ($('#FormError').find('td').text() == '')
                    // {
                    this.value = this.value.toUpperCase();
                    $('#FormError').hide();

                    var mctrBuProfile = {
                        Business_Unit: $('#Business_Unit').val(),
                        Offset_Account: $('#Offset_Account').val(),
                        Offset_Activity: $('#Offset_Activity').val(),
                        Offset_Project: $('#Offset_Project').val()

                    };
                    var Input = JSON.stringify(mctrBuProfile);
                    var errorFn = function (jqXHR, textStatus, errorThrown) {
                        //$('#FormError').find('td').text(JSON.parse(jqXHR.responseText).Message);
                        //$('#FormError').show();

                    };
                    var succesFn = function (data) {
                        //$('#FormError').hide();
                        if (data[0].V_Count['project1'] == 0) {
                            $('#FormError').find('td').text('Project ' + $('#Offset_Project').val() + ' Activity ' + $('#Offset_Activity').val() + ' BU ' + $('#Business_Unit').val() + ' combination could not be validated using EAS PS_PROJ_ACTIVITY_7 table.');
                            $('#FormError').show();
                            $('#Offset_Project').focus();
                            $('#Offset_Project').addClass('invalid');
                            return [false, ""];
                        }
                        else {
                            $('#FormError').find('td').text('');
                            $('#FormError').hide();
                        }
                    }
                    mctrObj.ajaxOptions('/BuProfile/buProfileoffsetProjectPostTextItem', 'POST', Input, succesFn, errorFn);

                    //  }

                }
                else {
                    $('#FormError').find('td').text('Please enter Offset Activity .');
                    $('#FormError').show();
                    $('#Offset_Activity').focus();
                    $('#Offset_Project').val('');
                }

            }
            else {
                $('#FormError').find('td').text('Please enter Business Unit.');
                $('#FormError').show();
                $('#Offset_Project').val('');
                $('#Business_Unit').focus();
            }


        });
        
    },
    afterComplete: function (response) {
        if (response.status == 200) {
            $("#jGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid', [{ current: true }]);
            mctrObj.showDialog($("#dialog-box"), "The record has been saved successfully!", "success");
        }
        else {
            mctrObj.showDialog($("#dialog-box"), "Please validate  the highlighted  fields before submit", "error");
        }
    },
    beforeSubmit: function (postdata, formid) {
       
            if ($('.invalid').length != 0) {
                return [false, "Please validate the highlighted fields"];
            } else {
                return [true];
            }
            }

       
    
},
        {
            // add options
            zIndex: 100,
            url: "/BUProfile/buProfilePostInsert",
            closeAfterAdd: true,
            mtype: "POST",
            datatype: 'json',
            errorTextFormat: function (data) {
                if (data.status == 500)
                    return "Please validate the highlighted fields before submit";  
            },
            beforeShowForm: function () {

                $("#Business_Unit").removeAttr("readonly");
                $('#Offset_Activity').addClass('uppercase');
                $('#Offset_Project').addClass('uppercase');
                $('#Offset_Account').addClass('uppercase');
                $('.invalid').removeClass('invalid');
            },
            afterShowForm: function (formid) {
                $('#tr_popUpBtn').show();
                $('.FormElement[type=text]').change(function () {
                    $(this).removeClass('invalid');
                    $('.FormGrid').find('input').not('input[id=Business_Unit]').removeAttr('disabled');
                });

                $('#Offset_Account').on('change', function (e, obj) {
                    e.preventDefault();
                    $('#Offset_Account').removeClass('invalid');
                    if ($('#Business_Unit').val() != '') {
                        if ($('#Offset_Activity').val() != '') {
                            // if ($('#FormError').find('td').text() == '') {
                            this.value = this.value.toUpperCase();
                            $('#FormError').hide();

                            var mctrBuProfile = {
                                Business_Unit: $('#Business_Unit').val(),
                                Offset_Account: $('#Offset_Account').val(),
                                Offset_Activity: $('#Offset_Activity').val(),
                                Offset_Project: $('#Offset_Project').val()
                            };
                            var Input = JSON.stringify(mctrBuProfile);
                            var errorFn = function (jqXHR, textStatus, errorThrown) {
                            };
                            var succesFn = function (data) {
                                //$('#FormError').hide();
                                if (data[0].V_Count['account1'] == 0) {
                                    $('#FormError').find('td').text('Account ' + $('#Offset_Account').val() + ' and BU' + $('#Business_Unit').val() + '  combination could not be validated using eas account or project tables.');
                                    $('#FormError').show();
                                    $('#Offset_Account').focus();
                                    $('#Offset_Account').addClass('invalid');
                                    return false;
                                }
                                else {
                                    $('#FormError').find('td').text('');
                                    $('#FormError').hide();
                                }

                            }
                            mctrObj.ajaxOptions('/BuProfile/buProfileoffsetAccountPostTextItem', 'POST', Input, succesFn, errorFn);

                            //  }

                        }
                        else {
                            $('#FormError').find('td').text('Please enter Offset Activity .');
                            $('#FormError').show();
                            $('#Offset_Activity').focus();
                            $('#Offset_Account').val('');
                        }
                    }

                    else {
                        $('#FormError').find('td').text('Please enter Business Unit.');
                        $('#FormError').show();
                        $('#Business_Unit').focus();
                        $('#Offset_Account').val('');
                    }

                });

                $('#Business_Unit').on('change', function () {
                    this.value = this.value.toUpperCase();

                    $('#FormError').hide();

                    $('#Business_Unit').val($('#Business_Unit').val().toUpperCase());

                    var mctrBuProfile = {
                        Business_Unit: $('#Business_Unit').val(),
                    };
                    var BU_Entered = $('#Business_Unit').val();
                    var Input = JSON.stringify(mctrBuProfile);
                    var errorFn = function (jqXHR, textStatus, errorThrown) {
                        //$('#FormError').find('td').text(JSON.parse(jqXHR.responseText).Message);
                        //$('#FormError').show();
                    };
                    var succesFn = function (data) {

                        //$('#FormError').hide();
                        if ($('#Business_Unit').val() == '') {
                            $('#FormError').find('td').text('Please enter Business Unit.');
                            $('#FormError').show();
                            $('#Business_Unit').focus();
                        }
                        else {

                            if (data[0].V_Count['bucount1'] == 1) {

                                if (data[0].V_Count['bucount2'] == 1) {
                                    $('#FormError').find('td').text('Business Unit entered is a duplicate. BU already exists in MCTR BU PROFILE table.');
                                    $('#FormError').show();
                                    $('#Business_Unit').focus();
                                    $('.FormGrid').find('input').not('input[id=Business_Unit]').attr('disabled', true);
                                    resetPopupCheckBoxes();
                                    return false;
                                }
                                else {
                                    $('.FormGrid').find('input').not('input[id=Business_Unit]').removeAttr('disabled');
                                    $('#Bems_Admin').attr('disabled', true);
                                    $('#LastName').attr('disabled', true);
                                    $('#FormError').find('td').text('');
                                    $('#FormError').hide();
                                }

                            }
                            else {
                                $('#FormError').find('td').text('Business Unit entered ' + $('#Business_Unit').val().toUpperCase() + ' was not found in master EAS business unit table.');
                                $('#FormError').show();
                                $('#Business_Unit').focus();
                                $('#Business_Unit').addClass('invalid');
                                resetPopupCheckBoxes();
                                return false;
                            }

                        }
                    }
                    mctrObj.ajaxOptions('/BuProfile/buProfilebusinessUnitPostTextItem', 'POST', Input, succesFn, errorFn);
                    

                });


                $('#Offset_Activity').on('change', function (e, obj) {
                    $('#Offset_Activity').removeClass('invalid');
                    e.preventDefault();
                    if ($('#Business_Unit').val() != '') {
                        // if ($('#FormError').find('td').text() == '') {
                        this.value = this.value.toUpperCase();
                        // $('#FormError').hide();


                        var mctrBuProfile = {
                            Business_Unit: $('#Business_Unit').val(),
                            Offset_Activity: $('#Offset_Activity').val(),
                            Offset_Project: $('#Offset_Project').val()

                        };
                        var Input = JSON.stringify(mctrBuProfile);
                        var errorFn = function (jqXHR, textStatus, errorThrown) {
                            //$('#FormError').find('td').text(JSON.parse(jqXHR.responseText).Message);
                            //$('#FormError').show();

                        };
                        var succesFn = function (data) {
                            //$('#FormError').hide();
                            if (data[0].V_Count['offset1'] == 0) {
                                $('#FormError').find('td').text('new acitivity Id is entered in this case');
                                $('#FormError').show();
                                $('#Offset_Activity').focus();

                            }
                            else {
                                $('#FormError').find('td').text('');
                                $('#FormError').hide();
                            }

                            if (data[0].V_Count['offset2'] == 0) {
                                $('#FormError').find('td').text('Activity  ' + $('#Offset_Activity').val() + '  BU  ' + $('#Business_Unit').val() + '  combination entered could not be validated using EAS PS_PROJ_ACTIVITY_7 table.');
                                $('#FormError').show();
                                $('#Offset_Activity').focus();
                                $('#Offset_Activity').addClass('invalid');
                            }
                            else {
                                $('#FormError').find('td').text('');
                                $('#FormError').hide();
                            }

                        }
                        mctrObj.ajaxOptions('/BuProfile/buProfileoffsetActivityPostTextItem', 'POST', Input, succesFn, errorFn);
                    }



                        //  }

                    
                        //
                    else {
                        $('#FormError').find('td').text('Please enter Business Unit.');
                        $('#Offset_Activity').val('');
                        $('#FormError').show();
                        $('#Business_Unit').focus();
                    }


                });
                $('#Offset_Project').on('change', function (e, obj) {
                    $('#Offset_Project').removeClass('invalid');
                    e.preventDefault();
                    if ($('#Business_Unit').val() != '') {
                        if ($('#Offset_Activity').val() != '') {
                            //    if ($('#FormError').find('td').text() == '')
                            // {
                            this.value = this.value.toUpperCase();
                            $('#FormError').hide();

                            var mctrBuProfile = {
                                Business_Unit: $('#Business_Unit').val(),
                                Offset_Account: $('#Offset_Account').val(),
                                Offset_Activity: $('#Offset_Activity').val(),
                                Offset_Project: $('#Offset_Project').val()

                            };
                            var Input = JSON.stringify(mctrBuProfile);
                            var errorFn = function (jqXHR, textStatus, errorThrown) {
                                //$('#FormError').find('td').text(JSON.parse(jqXHR.responseText).Message);
                                //$('#FormError').show();

                            };
                            var succesFn = function (data) {
                                //$('#FormError').hide();
                                if (data[0].V_Count['project1'] == 0) {
                                    $('#FormError').find('td').text('Project ' + $('#Offset_Project').val() + ' Activity ' + $('#Offset_Activity').val() + ' BU ' + $('#Business_Unit').val() + ' combination could not be validated using EAS PS_PROJ_ACTIVITY_7 table.');
                                    $('#FormError').show();
                                    $('#Offset_Project').focus();
                                    $('#Offset_Project').addClass('invalid');
                                    return [false, ""];
                                }
                                else {
                                    $('#FormError').find('td').text('');
                                    $('#FormError').hide();
                                }
                            }
                            mctrObj.ajaxOptions('/BuProfile/buProfileoffsetProjectPostTextItem', 'POST', Input, succesFn, errorFn);

                            //  }

                        }
                        else {
                            $('#FormError').find('td').text('Please enter Offset Activity .');
                            $('#FormError').show();
                            $('#Offset_Activity').focus();
                            $('#Offset_Project').val('');
                        }

                    }
                    else {
                        $('#FormError').find('td').text('Please enter Business Unit.');
                        $('#FormError').show();
                        $('#Offset_Project').val('');
                        $('#Business_Unit').focus();
                    }


                });
            },
            afterComplete: function (response) {
                if (response.status == 200) {
                    $("#jGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid', [{ current: true }]);
                    mctrObj.showDialog($("#dialog-box"), "The record has been added successfully!", "success");
                }
                else {
                    mctrObj.showDialog($("#dialog-box"), "Please validate  the highlighted Fields before submit", "error");
                }
            },
            beforeSubmit: function (postdata, formid) {
                {
                    if ($('.invalid').length != 0) {
                        return [false, "Please validate the highlighted fields"];
                    } else {
                        return [true];
                    }
                }
            }
        },
        {
            // delete options
            zIndex: 100,
            url: getBaseUrl("/BUProfile/buProfileDelete"),
            closeOnEscape: true,
            closeAfterDelete: true,
            recreateForm: true,
            datatype: "json",
            msg: "Are you sure you want to delete this task?",
            mtype: "POST", reloadAfterSubmit: false,
            onclickSubmit: function (rp_ge, postdata) {
                var rowData = $("#" + postdata).children();
                var json = {};
                json["buProfile"] = {};
                json.buProfile.Business_Unit = rowData[1]["title"];
                json.buProfile.Bulk_Flg = rowData[2]["title"];
                json.buProfile.Rsc_Lbr_Flg = rowData[3]["title"];
                json.buProfile.Cls_Vdt_Flg = rowData[4]["title"];
                json.buProfile.Reject_Flg = rowData[5]["title"];
                json.buProfile.Man_Rated_Flg = rowData[6]["title"];
                json.buProfile.Pyr_Only_Flg = rowData[7]["title"];
                json.buProfile.Offset_Activity = rowData[8]["title"];
                json.buProfile.Offset_Project = rowData[9]["title"];
                json.buProfile.Offset_Account = rowData[10]["title"];
                return json;
            },

            afterComplete: function (response) {
                if (response.status == 200) {
                    $("#jGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid', [{ current: true }]);
                    mctrObj.showDialog($("#dialog-box"), "The record has been deleted successfully!", "success");
                }
                else {

                    mctrObj.showDialog($("#dialog-box"), response.responseText, "error");
                }
            },

            serializeDelData: function (postdata) {
                return { "buProfile": postdata.buProfile };
            }

        },
    { width: 350, multipleSearch: true });

});



