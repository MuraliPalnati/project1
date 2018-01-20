$(document).ready(function () {

   
    var mctrObj = new MCTR();
    $('#saveCommentBtn').hide();
    $('#newCommentSection').hide();
    $('#insertCommentBtn').show();
   
    if ($('#queryFlag').val() == "True")
    {
        $('#insertCommentBtn').attr("disabled","disabled");
    }
    $('#insertCommentBtn').on('click', function (e, obj) {
        $('#saveCommentBtn').show();
        $('#newCommentSection').show();
        $('#newComment').focus();
        $('#insertCommentBtn').hide();
    })

    $('#saveCommentBtn').on('click', function (e, obj) {
        var parameters = JSON.stringify({ mctrNo: $('#MctrNo').val(), comments: $('#newComment').val() });
        var successFn = function (data, response, xhr) {
            $('#commentsBtn').css('color', '#55E655');
            $('#mctrModalLarge').find('.modal-content').html(data);
            $('#COMMENTS').val(data.COMMENTS);
            $('#newComment').val('');
        };
        var errorFn = function (data, response,hhr) { };;
        mctrObj.ajaxOptions('/MctrCreateForm/mctrCommentbutSaveWhenButtonPressed', 'POST', parameters, successFn, errorFn);

        $('#saveCommentBtn').hide();
        $('#newCommentSection').hide();
        $('#insertCommentBtn').show();
        ////$('#closeBtn').click(function (e) {
        ////    $('.bootbox').modal('hide');
        ////});
    })

});

