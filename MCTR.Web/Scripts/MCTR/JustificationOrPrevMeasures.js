$(document).ready(function () {
    var mctrObj = new MCTR();

        if($('#queryFlag').val() == "True") {
            $('#justification').attr("disabled", "disabled");
            $('#preventiveMeasures').attr("disabled", "disabled");
            $('#JusOrPrevSaveBtn').attr("disabled", "disabled")
            }


    $('#JusOrPrevSaveBtn').on('click', function (e) {
        $('#prevMeasures').val($('#preventiveMeasures').val());
        $('#jpbut').css('color', '#55E655');
        var createForm = {
            MctrNo:$('#MctrNo').val(),
            justification: $('#justification').val(),
            preventativeMeasures: $('#preventiveMeasures').val()
        }
        var mctrCreateForm= JSON.stringify(createForm);
        var successFn = function () { };
        var errorFn = function () { };
        //mctrObj.ajaxOptions('/MctrCreateForm/justificationsave', 'POST', mctrCreateForm, successFn, errorFn);
        $.ajax({
            url: getBaseUrl('/MctrCreateForm/justificationsave'),
            type: "POST",
            traditional: true,
            data: mctrCreateForm,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                mctrObj.showDialog($("#dialog-box"), "The record has been saved successfully!", "success");
                $('#mctrModalJustification').modal("hide");
                $('.bootbox').modal('hide');
            },

            error: function (jqXHR, textStatus, errorThrown) {
                mctrObj.showDialog($("#dialog-box"), errorThrown.toString(), "error");
            }
        });
       

    })

    $('#JusOrPrevCloseBtn').click(function () {
        $('#mctrModalJustification').modal("hide");
    })
});