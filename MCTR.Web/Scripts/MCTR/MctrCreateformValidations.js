$(document).ready(function () {
    var mctrObj = new MCTR();

    function mctrHeaderjvItemCdPostTextItem() {
        
        var jv_item_cd = $('#JvItemCd').val();
        var mctrCreateFrom = $('#form').serialize();
        var Origjv_item_cd = $('#JvItemCd').attr('value');
        origValue = $('#JvItemCd').attr('value') == "" ? $('#JvItemCd').val() : $('#JvItemCd').attr('value');
        if ((jv_item_cd != Origjv_item_cd) || (Origjv_item_cd != null && jv_item_cd == null) || (Origjv_item_cd == null && jv_item_cd != null)) {
            $.ajax({
                type: "POST",
                url:getBaseUrl( "/MctrCreateForm/mctrHeaderjvItemCdPostTextItem"),
                data: mctrCreateForm,
                success: function (result) {

                },
                error: function (data) {
                    var exmsg = data.responseText;
                    var ms = exmsg.ExceptionMessage;
                    mctrObj.showDialog($("#dialog-box"), ms, "error");
                }
            });

        }
    }

    $('#JvItemCd').change(function (e) {
        mctrHeaderjvItemCdPostTextItem();
    });







});