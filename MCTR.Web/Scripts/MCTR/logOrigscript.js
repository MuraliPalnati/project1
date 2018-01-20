$(document).ready(function () {

    var mctrObj = new MCTR();

    $('#item_Mctr_No').blur(function () {
        $('#loadingIcon').show();
        //   $('#logOrig').find("input[type='text']").val('');
       $('#item_Bems_Orig_New').val('');
       $('#item_reason').val('');
       $('#item_Status_Id').val('');
       $('#item_Bems_Orig').val('');

            if ($('#item_Mctr_No').val() != '') {
                if ($.isNumeric($('#item_Mctr_No').val())) {
                    var mctrLogOrigmctr = {
                        Mctr_No: $('#item_Mctr_No').val(),
                        Bems_Orig_New: '',
                        reason: '',
                        Bems_Admin: '',
                        Date_Changed: '',
                        IsEnabled: '',
                        Status_Id: '',
                        Bems_Orig: '',
                        RespMsg: ''
                    }
                    var Input = JSON.stringify(mctrLogOrigmctr);
                    $.ajax({
                        url: getBaseUrl('/MctrLogOrig/Postjson'),
                        type: "POST",
                        traditional: true,
                        data: Input,
                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {
                            $('#loadingIcon').hide();
                            if (data != null) {
                                if (data[0].RespMsg == '') {
                                    $('#item_Mctr_No').val(data[0].Mctr_No);

                                    $('#item_Bems_Orig_New').val(data[0].Bems_Orig_New);

                                    $('#item_reason').val(data[0].reason);

                                    $('#item_Bems_Admin').val(data[0].Bems_Admin)

                                    $('#item_Status_Id').val(data[0].Status_Id);

                                    $('#item_Bems_Orig').val(data[0].Bems_Orig);

                                } else {

                                    mctrObj.showDialog($("#dialog-box"), data[0].RespMsg, "error");
                                    $("#item_Mctr_No").focus();
                                }
                            }


                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            $('#loadingIcon').hide();
                            mctrObj.showDialog($("#dialog-box"), jqXHR.responseText, "error");
                            $("#item_Mctr_No").focus();
                        }
                    })
                }
                else {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), 'MCTR No should be numeric', "error");
                    $("#item_Mctr_No").focus();
                }
            }
            else {
                $('#loadingIcon').hide();
                mctrObj.showDialog($("#dialog-box"), 'MCTR No cant be null', "error");
            }
        
    });

    $('#item_Bems_Orig_New').change(function () {
        $('#loadingIcon').show();
        if ($.isNumeric($('#item_Bems_Orig_New').val()) && ($('#item_Bems_Orig_New').val() != '') && $('#item_Bems_Orig_New').val().length != 0) {
            var BEMS = $('#item_Bems_Orig_New').val();
            if (BEMS.length == 6) {
                BEMS = "0" + BEMS;
            }
            if (BEMS.length == 5) {
                BEMS = "00" + BEMS;
            }
            if (BEMS.length == 4) {
                BEMS = "000" + BEMS;
            }

            var mctrLogtmctr = {
                Mctr_No: $('#item_Mctr_No').val(),
                Bems_Orig_New: BEMS,
                reason: '',
                Bems_Admin: '',
                Date_Changed: '',
                IsEnabled: '',
                Status_Id: '',
                Bems_Acct: '',
                RespMsg: ''
            }
            var Input = JSON.stringify(mctrLogtmctr);
            $.ajax({
                url: getBaseUrl('/MctrLogOrig/validateBemsJson'),
                type: "POST",
                traditional: true,
                data: Input,
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    $('#loadingIcon').hide();
                    if (data != null) {
                        if (data[0].RespMsg == '') {
                            $('#item_Bems_Orig_New').val(data[0].Bems_Orig_New);
                        }
                        else {
                            $("#item_Bems_Orig_New").focus();
                            mctrObj.showDialog($("#dialog-box"), data[0].RespMsg, "error");
                        }
                        
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $('#loadingIcon').hide();
                    $("#item_Bems_Orig_New").focus();
                    mctrObj.showDialog($("#dialog-box"), 'Please enter valid BEMSID', "error");
                }
            })
        }
        else {
            $('#loadingIcon').hide();
            mctrObj.showDialog($("#dialog-box"), 'Please enter valid BEMSID', "error");
        }
    });

    $("#item_Mctr_No").keydown(function (e) {
        if (e.which == 9) {
            $("#item_Bems_Orig_New").focus();
            e.preventDefault();
        }
    });

    $('#save').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#loadingIcon').show();
        if ($('#item_Mctr_No').val() != '' && $.isNumeric($('#item_Mctr_No').val()) && $('#item_Mctr_No').val().length <= 6 && $('#item_Mctr_No').val() != 0) {
            var mctrLogOrigmctr = {
                Mctr_No: $('#item_Mctr_No').val(),
                Bems_Orig_New: $('#item_Bems_Orig_New').val(),
                reason: '',
                Bems_Admin: '',
                Date_Changed: '',
                IsEnabled: '',
                Status_Id: '',
                Bems_Orig: '',
                RespMsg: ''
            }
            var Input = JSON.stringify(mctrLogOrigmctr);
            $.ajax({
                url: getBaseUrl('/MctrLogOrig/Postjson'),
                type: "POST",
                traditional: true,
                data: Input,
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data != null) {

                        if (data[0].RespMsg == '') {


                            $('#item_Mctr_No').val(data[0].Mctr_No);

                            $('#item_Bems_Orig_New').val(data[0].Bems_Orig_New);

                            $('#item_reason').val(data[0].reason);

                            $('#item_Bems_Admin').val(data[0].Bems_Admin)


                            $('#item_Status_Id').val(data[0].Status_Id);

                            $('#item_Bems_Orig').val(data[0].Bems_Orig);
                        }
                        else {
                            $('#loadingIcon').hide();
                            mctrObj.showDialog($("#dialog-box"), data[0].RespMsg, "error");

                        }


                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), jqXHR.responseText, "error");
                }
            });
        }
        else {
            $('#loadingIcon').hide();
            $("#item_Mctr_No").focus();
            mctrObj.showDialog($("#dialog-box"), 'Invalid number in record', "error");
        }
        if ($('#item_Bems_Orig_New').val() != '' && $('#item_Bems_Orig_New').val().length == 7 && $('#item_Bems_Orig_New').val() != '' && $.isNumeric($('#item_Bems_Orig_New').val())) {
            var mctrLogOrigmctr = {
                Mctr_No: $('#item_Mctr_No').val(),
                Bems_Orig_New: $('#item_Bems_Orig_New').val(),
                reason: $('#item_reason').val(),
                Bems_Admin: $('#Bems_Admin').val(),
                Date_Changed: $('#item_Date_Changed').val(),
                IsEnabled: $('#item_IsEnabled').val(),
                Status_Id: $('#item_Status_Id').val(),
                Bems_Orig: $('#item_Bems_Orig').val(),
                RespMsg: $('#item_RespMsg').val()
            }
            var Input = JSON.stringify(mctrLogOrigmctr);
            if ($('#item_reason').val() != "") {
                $.ajax({
                    url: getBaseUrl('/MctrLogOrig/mctrLogOnInsert'),
                    type: "POST",
                    traditional: true,
                    data: Input,
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $('#loadingIcon').hide();
                        if (data != null) {
                            if (data[0].RespMsg == '') {
                                $('#item_Mctr_No').val(data[0].Mctr_No);

                                $('#item_Bems_Orig_New').val(data[0].Bems_Orig_New);

                                $('#item_reason').val(data[0].reason);

                                $('#item_Bems_Admin').val(data[0].Bems_Admin)

                                $('#item_Status_Id').val(data[0].Status_Id);

                                $('#item_Bems_Orig').val(data[0].Bems_Orig);


                                mctrObj.showDialog($("#dialog-box"), "The Originator has been updated successfully!", "success");

                            }
                            else {
                                mctrObj.showDialog($("#dialog-box"), data[0].RespMsg, "error");
                            }
                        }
                        
                    },

                    error: function (jqXHR, textStatus, errorThrown) {
                        $('#loadingIcon').hide();
                    }
                });
            }
            else {
                $('#loadingIcon').hide();
                mctrObj.showDialog($("#dialog-box"), 'Please enter valid reason', "error");
                $("#item_reason").focus();
            }
        }
        else {
            $('#loadingIcon').hide();
            mctrObj.showDialog($("#dialog-box"), 'Please enter valid BEMS', "error");
            $("#item_Bems_Orig_New").focus();
        }
    });
});


