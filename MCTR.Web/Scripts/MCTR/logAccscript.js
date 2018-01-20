$(document).ready(function () {

    var mctrObj = new MCTR();
    $('#Bems_Admin').val();
    $('#item_Mctr_No').blur(function () {
      
        $('#item_Bems_Acct_New').val('');
        $('#item_reason').val('');
        $('#item_Status_Id').val('');
        $('#item_Bems_Acct').val('');
       
        if ($('#item_Mctr_No').val() != '') {
            if ($.isNumeric($('#item_Mctr_No').val())) {
                var mctrLogAcctmctr = {
                    Mctr_No: $('#item_Mctr_No').val(),
                    Bems_Acct_New: '',
                    reason: '',
                    Bems_Admin: '',
                    Date_Changed: '',
                    IsEnabled: '',
                    Status_Id: '',
                    Bems_Acct: '',
                    RespMsg: ''
                }
                var Input = JSON.stringify(mctrLogAcctmctr);
                $.ajax({
                    url: getBaseUrl('/MctrLogAcct/Postjson'),
                    type: "POST",
                    traditional: true,
                    data: Input,
                    datatype:"json",
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        if (data != "") {
                            if (data[0].Status_Id != "") {

                                $('#item_Mctr_No').val(data[0].Mctr_No);

                                $('#item_Status_Id').val(data[0].Status_Id);

                                $('#item_Bems_Admin').val(data[0].Bems_Admin);

                                $('#item_Bems_Acct').val(data[0].Bems_Acct);

                            }
                            else {
                                mctrObj.showDialog($("#dialog-box"), "Invalid MCTR No. Please Enter Valid MCTR No", "error");
                            }
                        }
                        else {
                            mctrObj.showDialog($("#dialog-box"), "Invalid MCTR No. Please Enter Valid MCTR No", "error");
                        }
                        
                       
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        mctrObj.showDialog($("#dialog-box"), 'No Record could be retrieved', "error");
                    }
                })
            }

            else {
                mctrObj.showDialog($("#dialog-box"), 'MCTR No should be numeric', "error");
            }
        }
        else
        {
            mctrObj.showDialog($("#dialog-box"), 'No Record could be retrieved', "error");
        }

    });

    $('#item_Bems_Acct_New').change(function () {
        var BEMS = $('#item_Bems_Acct_New').val();
        if (BEMS.length == 6) {
            BEMS = "0" + BEMS;
        }
        if (BEMS.length == 5) {
            BEMS = "00" + BEMS;
        }
        if (BEMS.length == 4) {
            BEMS = "000" + BEMS;
        }
        if ($.isNumeric($('#item_Bems_Acct_New').val()) && ($('#item_Bems_Acct_New').val() != '') && $('#item_Bems_Acct_New').val().length != 0) {
            if ($('#item_Bems_Acct_New').val().length ==7) {
                var mctrLogAcctmctr = {
                    Mctr_No: $('#item_Mctr_No').val(),
                    Bems_Acct_New: BEMS,
                    reason: '',
                    Bems_Admin: '',
                    Date_Changed: '',
                    IsEnabled: '',
                    Status_Id: '',
                    Bems_Acct: '',
                    RespMsg: ''
                }
                var Input = JSON.stringify(mctrLogAcctmctr);
                $.ajax({
                    url: getBaseUrl('/MctrLogAcct/validBemsjson'),
                    type: "POST",
                    traditional: true,
                    data: Input,
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        if (data != null) {
                            if (data[0].RespMsg == '') {
                                $('#item_Bems_Admin').val(data[0].Bems_Admin);
                            }
                            else {
                                mctrObj.showDialog($("#dialog-box"), data[0].RespMsg, "error");
                            }

                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        mctrObj.showDialog($("#dialog-box"), 'Please enter valid BEMSID', "error");
                    }
                })
            }
            else {
                mctrObj.showDialog($("#dialog-box"), 'BemsAcctNew entered value must be seven characters in length', "error");
                $("#item_Bems_Acct_New").focus();
            }
        }

    });

    $('#save').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        if ($('#item_Mctr_No').val() != '' && $.isNumeric($('#item_Mctr_No').val()) && $('#item_Mctr_No').val().length <= 6 && $('#item_Mctr_No').val() !=0 ) {
            var mctrLogAcctmctr = {
                Mctr_No: $('#item_Mctr_No').val(),
                Bems_Acct_New: '',
                reason: '',
                Bems_Admin: '',
                Date_Changed: '',
                IsEnabled: '',
                Status_Id: '',
                Bems_Acct: '',
                RespMsg: ''
            }
            var Input = JSON.stringify(mctrLogAcctmctr);
           
            if ($('#item_Bems_Acct_New').val().length == 7 && $('#item_Bems_Acct_New').val() != '') {
                var mctrLogOrigmctr = {
                    Mctr_No: $('#item_Mctr_No').val(),
                    Bems_Acct_New: $('#item_Bems_Acct_New').val(),
                    reason: $('#item_reason').val(),
                    Bems_Admin: $('#Bems_Admin').val(),
                    Date_Changed: $('#DateChanged').val(),
                    IsEnabled: $('#item_IsEnabled').val(),
                    Status_Id: $('#item_Status_Id').val(),
                    Bems_Acct: $('#item_Bems_Acct').val(),
                    RespMsg: $('#item_RespMsg').val()
                }
                var Input = JSON.stringify(mctrLogOrigmctr);
                $.ajax({
                    url: getBaseUrl('/MctrLogAcct/mctrLogOnInsert'),
                    type: "POST",
                    traditional: true,
                    data: Input,
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        if (data != null) {
                            if (data[0].RespMsg == '') {


                                $('#item_Mctr_No').val(data[0].Mctr_No);

                                $('#item_Bems_Acct_New').val(data[0].Bems_Acct_New);

                                $('#item_reason').val(data[0].reason);

                                $('#item_Bems_Admin').val(data[0].Bems_Admin);

                                $('#item_IsEnabled').val(data[0].IsEnabled);

                                $('#item_Status_Id').val(data[0].Status_Id);

                                $('#item_Bems_Acct').val(data[0].Bems_Acct);


                                mctrObj.showDialog($("#dialog-box"), "The Accountant has been updated successfully!", "success");
                            }
                            else {
                                mctrObj.showDialog($("#dialog-box"), data[0].RespMsg, "error");
                            }
                        }

                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });
            }
            else
            {
                mctrObj.showDialog($("#dialog-box"), 'BemsAcctNew entered value must be seven characters in length', "error");
                $("#item_Bems_Acct_New").focus();
            }
        }
        else
        {
            mctrObj.showDialog($("#dialog-box"), 'Invalid MCTR number in record ', "error");
        }
    });

    $("#item_Mctr_No").keydown(function (e) {
        if (e.which == 9) {
            $("#item_Bems_Acct_New").focus();
            e.preventDefault();
        }
    });

});
