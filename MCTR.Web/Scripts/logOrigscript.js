$(document).ready(function () {
    $('#item_Mctr_No').blur(function () {
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
            url: '/MctrLogOrig/Postjson',
            type: "POST",
            traditional: true,
            data: Input,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data != null) {

                    $('#item_Mctr_No').val(data[0].Mctr_No);

                    $('#item_Bems_Orig_New').val(data[0].Bems_Orig_New);

                    $('#item_reason').val(data[0].reason);

                    $('#item_Bems_Admin').val(data[0].Bems_Admin)

                   // $('#item_Date_Changed').val(new Date(parseInt(data[0].Date_Changed.substr(6))));

                    $('#item_IsEnabled').val(data[0].IsEnabled);

                    $('#item_Status_Id').val(data[0].Status_Id);

                    $('#item_Bems_Orig').val(data[0].Bems_Orig);

                    $('#item_RespMsg').val(data[0].RespMsg);

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert("Error --- " + errorThrown.toString() + "---" + jqXHR.toString());
                //alert(ErrorEvent.prototype);

            }
        })

    });
    $('#save').click(function () {
       var mctrLogOrigmctr = {
            Mctr_No: $('#item_Mctr_No').val(),
            Bems_Orig_New: $('#item_Bems_Orig_New').val(),
            reason: $('#item_reason').val(),
            Bems_Admin: $('#item_Bems_Admin').val(),
            Date_Changed: $('#item_Date_Changed').val(),
            IsEnabled: $('#item_IsEnabled').val(),
            Status_Id: $('#item_Status_Id').val(),
            Bems_Orig: $('#item_Bems_Orig').val(),
            RespMsg: $('#item_RespMsg').val()
        }

        var Input = JSON.stringify(mctrLogOrigmctr);

        $.ajax({
            url: '/MctrLogOrig/mctrLogOnInsert',
            type: "POST",
            traditional: true,
            data: Input,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data != null) {
                   
                    $('#item_Mctr_No').val(data[0].Mctr_No);
      
                    $('#item_Bems_Orig_New').val(data[0].Bems_Orig_New);
                   
                    $('#item_reason').val(data[0].reason);
                   
                    $('#item_Bems_Admin').val(data[0].Bems_Admin)
                
                   // $('#item_Date_Changed').val(new Date(parseInt(data[0].Date_Changed.substr(6))).toDateString();
              
                    $('#item_IsEnabled').val(data[0].IsEnabled);
               
                    $('#item_Status_Id').val(data[0].Status_Id);
          
                    $('#item_Bems_Orig').val(data[0].Bems_Orig);
                   
                    $('#item_RespMsg').val(data[0].RespMsg);
                    //alert(data[0].RespMsg);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert("Error --- " + errorThrown.toString() + "---" + jqXHR.toString());
                //alert(ErrorEvent.prototype);

            }
        })

    });

});
