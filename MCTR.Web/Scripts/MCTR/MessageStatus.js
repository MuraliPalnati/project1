$(document).ready(function () {
    var mctrObj = new MCTR();


    $('#save').click(function (e) {

        if ($('#MESSAGE_STATUS').val() != '') {
            if ($.isNumeric($('#MESSAGE_STATUS').val()) && $('#MESSAGE_STATUS').val() >= 0 && $('#MESSAGE_STATUS').val() <= 2) {


                if ($('#MESSAGE_TEXT').val().length !== 0) {
                    if (($('#MESSAGE_TEXT').val().length <= 99)) {
                        e.preventDefault();
                        var mctrMessageStatus =
                            {
                                'MESSAGE_STATUS': $('#MESSAGE_STATUS').val(),
                                'MESSAGE_TEXT': $('#MESSAGE_TEXT').val()
                            }

                        var Input = JSON.stringify({ 'mctrMessageStatus': mctrMessageStatus });

                        $.ajax({
                            url: getBaseUrl('/MctrMessageStatus/mctrMessageStatusOnInsert'),
                            type: "POST",
                            traditional: true,
                            data: Input,
                            contentType: 'application/json; charset=utf-8',
                            success: function (data) {
                                if (data != null) {

                                    $('#MESSAGE_STATUS').val(data[0].MESSAGE_STATUS);

                                    $('#MESSAGE_TEXT').val(data[0].MESSAGE_TEXT);

                                    mctrObj.showDialog($("#dialog-box"), "The record has been saved successfully!", "success");
                                }
                            },

                            error: function (jqXHR, textStatus, errorThrown) {
                                mctrObj.showDialog($("#dialog-box"), errorThrown.toString(), "error");
                            }
                        })

                    }
                    else
                    {
                        mctrObj.showDialog($("#dialog-box"), 'Description should be less than 99 characters', "error");
                    }
                }
                else { mctrObj.showDialog($("#dialog-box"), 'Please enter a valid Message Status Text', "error"); }
            }

            else
            {
                mctrObj.showDialog($("#dialog-box"), 'Message Status  should be in Range of 0,1,2', "error");
            }
        }
        else
        {
            mctrObj.showDialog($("#dialog-box"), 'Please enter valid Message Status Code', "error");
        }

    });
});

