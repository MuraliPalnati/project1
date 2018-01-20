$(document).ready(function () {
    var mctrObj = new MCTR();
    $('#add-button').click(function (e) {
        e.preventDefault();
        $('#dialog-content').hide();
        $('#Job_Status').val("");
        $('#Eff_Date_From').val("");
        $('#Eff_Date_Thru').val("");
        $('#reason').val("");
    });
    $('#save').click(function (e) {
        $('#dialog-content').hide();
        if ($('#Job_Status').val() != '') {
            if ($.isNumeric($('#Job_Status').val()) && $('#Job_Status').val() > 0 && $('#Job_Status').val() <= 2) {
                if ($('#reason').val() != '') {
                    var thrDate =$('#Eff_Date_Thru').val();
                    var fromDate =$('#Eff_Date_From').val();
                    var d3 = new Date().toJSON().slice(0, 10);
                    var Today = new Date(d3);
       
                    if (($('#Eff_Date_From').val() != "") && $('#Eff_Date_Thru').val() != "") {

                        $.ajax({
                            url: getBaseUrl('/MCTRJobStatus/DateCheck'),
                            type: 'POST',
                            data: { dateThru: thrDate, dateFrom: fromDate, dateNow: Today },
                            success: function (data) {
                                if (data==true)
                                    {
                                    var postdata = {
                                        Job_Status: $('#Job_Status').val(),
                                        Eff_Date_From: $('#Eff_Date_From').val(),
                                        Eff_Date_Thru: $('#Eff_Date_Thru').val(),
                                        Bems_Admin: $('#Bems_Admin').val(),
                                        reason: $('#reason').val(),
                                        Date_Entered: $('#Date_Entered').val(),
                                        job_Id: $('#Job_Id').val()

                                    }

                                    var Input = JSON.stringify(postdata);

                                    $.ajax({
                                        url: getBaseUrl('/MCTRJobStatus/MCTRJobStatusOnInsert'),
                                        type: "POST",
                                        traditional: true,
                                        data: Input,
                                        contentType: 'application/json; charset=utf-8',
                                        success: function (data) {
                                            mctrObj.showDialog($("#dialog-box"), "The record has been saved successfully!", "success");
                                        },

                                        error: function (jqXHR, textStatus, errorThrown) {
                                            mctrObj.showDialog($("#dialog-box"), errorThrown.toString(), "error");
                                        }
                                    })

                                } else {
                                    $('.datepicker').addClass('invalid');
                                    mctrObj.showDialog($("#dialog-box"), 'There is a Problem with Effective Dates.Please re-check the Dates Entered', "error");
                                }


                            }
                        });

                        

                    }
                    else {
                        mctrObj.showDialog($("#dialog-box"), 'Please Enter valid Date', "error");
                    }
                }
                else {
                    mctrObj.showDialog($("#dialog-box"), 'Reason is Missing. please re-check', "error");
                }
            }
            else {
                mctrObj.showDialog($("#dialog-box"), 'Invalid job status code. please re-check the job status entered.', "error");
            }
        }
        else {
            mctrObj.showDialog($("#dialog-box"), 'Job status code is missing. please re-check.', "error");
        }

    });
    //if (!Modernizr.inputtypes.date) {
    $(".datepicker").datepicker();
    $(".datepicker").datepicker("option", "dateFormat", "dd-M-yy");
    $(".datepicker").blur(function () {
        var dateArray = $(this).val().split('-');
        var monthString = dateArray[1];
        ////maps months to integer from 0 to 11
        var monthArray = { "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06", "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nev": "11", "Dec": "12" };
        ////get the values from the string
        var month = monthArray[monthString];
        ////create date object with values
        var dateObject = Date.parse(dateArray[2] + "-" + month + "-" + dateArray[0]);

        if (isNaN(dateObject) == true && $(this).val() !== '') {
            $(this).addClass('invalid');
        }
        else {
            $(this).removeClass('invalid');
        }

        //var isValidDate = function (dateAsString) {
        //    var parsedDate = Date.parse(dateAsString);
        //    if (isNaN(parsedDate) && parsedDate !== new Date(parsedDate)) {
        //        return false
        //    }

        //    return true
        //}
        //var dateArray = $(this).val().split('-');
        //var dateString = dateArray[1] + "/" + dateArray[0] + "/" + dateArray[2];
        //var d = isValidDate(dateString);
    });
    //}

});