$(document).ready(function () {
    $.each($('.approver'), function (i, obj) {
        if (obj.value == 'N') {
            $(obj).parentsUntil('tr').siblings().find('input').addClass('invalid');
            $(obj).addClass('invalid');
        }
    })
    $('#JvItemCd').keyup(function () {
        this.value = this.value.toUpperCase();
    });
    $('#JvItemCd').prop('maxLength', 6);
   // $(document).ready(function() {
    $("body").tooltip({
        selector: '[data-toggle=tooltip]'
    });
  //  });
   // $('#1_MTL_JRNL').removeAttr('checked');
    var mctrObj = new MCTR();
    var fiscal_year = $('#fyear').val();
    var postUpdateFlag = false;
    var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
    $('#Unjournal').hide();
    $('#Journal').hide();
    $('#JournlInPro').hide();
    $('#batchBut').hide();
    $('#submitBtn').hide();
    $('#cancelBut').hide();
    $('#reopenBut').hide();
    $('#resetBut').hide();
    $('#recallButton').hide();
    $('#searchbutt').hide();
    $('#reasonCodeBtn').attr('disabled', 'disabled');
    $('#JvItemCd').attr('readonly', true);
    $('#qmode').hide();
    if ($('#MctrNo').val() != 0) {
        if (($('#StatusId').val() == "OA" || $('#StatusId').val() == "OR") && $('#SessionBems').val() == $('#BemsOrig').val()) {
            $('#submitBtn').show();
            $('#batchBut').show();
            $('#cancelBut').show();
            $('#querybut').hide();
            if ($('#StatusId').val() == "OR") {
                $('#resetBut').show();
        }
        }
  $('#querybut').hide();
    }
    if ($('#fyear').val() != "") {
        var currentYear = new Date().getFullYear();
        if ($('#fyear').val() < currentYear) {
            $('#prevOrCY').text('Prior Year').css({ 'font-weight': 'bold' })
            $('#py_cy_status').val("PY");
        }
        else {
            if ($('#fyear').val() == currentYear) {
                $('#prevOrCY').text('Current Year').css({ 'font-weight': 'bold' })
                $('#py_cy_status').val("CY");
            }
            else {
                $('#prevOrCY').text('').css({ 'font-weight': 'bold' })
            }
        }
    }

    if ($('#MctrNo').val() != 0) {
        if (($('#StatusId').val() == "OA" || $('#StatusId').val() == "AA" || $('#StatusId').val() == "CA" || $('#StatusId').val() == "JA" || $('#StatusId').val() == "")) {
            $('#reasonCodeBtn').removeAttr('disabled');
            $('#JvItemCd').attr('readonly', false);
        }
    }

   
    if ($('#queryFlag').val() == "True") {

        $('#qmode').show();
        $("#form :input").prop("disabled", true)
        $('#savebut').hide();
        $('#querybut').hide();
       // $('#tblJQGridFirst').find('*').find('input ,a').attr('disabled', true);
      //  $('#tblJQGridCover').find('*').find('input ,a').attr('disabled', true);
       // $('#tblJQGridInner').find('*').find('input ,a').attr('disabled', true);
        $('#overbut').removeAttr('disabled');
        $('#offbut').removeAttr('disabled');
        $('#1_ttdbtn ').removeAttr('disabled');
        $('#1_yearbtn ').removeAttr('disabled');
        $('#1_yearbtn ').removeAttr('disabled');
         $('#firstcol').find('*').removeAttr('disabled');
         $('#secondcol').find('*').removeAttr('disabled');
         $('#createReportBtn ').removeAttr('disabled');
         $('#printclose').removeAttr('disabled');
         $('#pclose').removeAttr('disabled');
    }

    if ($('#BemsSuper').val() != "" && $('#StatusId').val() == 'SA') {
        $('#SupAppr').removeAttr("disabled");
        $('#recallButton').show();
        $('#submitBtn').hide();
    }

    $('.popoverAppr').popover({
        html: true, content: '<button title= "N" class = "btn btn-xs btn-pop" >No</button><br><button title= "Y" class = "btn btn-xs btn-pop" >Yes</button><br><button title= "NY" class = "btn btn-xs btn-pop" >Not Yet</button>'
    });
    $('.popoverAppr').on('shown.bs.popover', function (e) {
        var parent = $(e.currentTarget.offsetParent).siblings();
        $('.btn-pop').click(function (e, obj) {

            $(parent).find("input[name^='Appr']").val($(this)[0].title);
            $(parent).find("input[name^='Date']").val(new Date().toUTCString().slice(5, 16).toUpperCase());
            if ($(this)[0].title == "N") {
                
                $.ajax({
                    url: getBaseUrl('/MctrCreateForm/RejectCheck'),
                    type: 'POST',
                    data: { origBu: $('#OrigBu').val() },
                    success: function (data) {
                        if(data==true)
                        {
                var successFn = function (data) {
                    if ($('.bootbox').length == 0) {
                    if (data) {
                        bootbox.dialog({
                            title: "Choose Reject Reason Code",
                            message: data,
                            onEscape: true,
                            size: ""
                        });
                    }

                    }
                    else {
                        mctrObj.showDialog($("#dialog-box"), "must have the accountant role to enter this value.", "error");
                    }
                };
                mctrObj.ajaxOptions('/MctrCreateForm/getRgLOVReject', 'GET', {
                    approverId: $(parent).find("input[name^='Appr']").attr('id')
                }, successFn);
                $('.popoverAppr').popover('hide');

                        }
                        else
                        {

                        }

                    }
                });



               
            }
            else if( $(this)[0].title == "NY" )
            {
                $(parent).find("input[name^='Appr']").val("");
                $(parent).find("input[name^='Date']").val("");
            }
        });
    });

    if ($('#StatusId').val() == "JA" && (($('#BemsCostAcct').val() == $('#SessionBems').val() && ($('#ApprCdCostAcct').val() == "Y")) || ($('#BemsSrAcct').val() == $('#SessionBems').val() && ($('#ApprCdSrAcct').val() == "Y"))))
    {
        if ($('#BemsCostAcct').val() != "" && $('#BemsSrAcct').val() != "")
        {
            if ($('#ApprCdCostAcct').val() == "Y" && $('#ApprCdSrAcct').val() == "Y") {
                $('#Journal').show();
            }
        }

       else if ($('#BemsCostAcct').val() != "" || $('#BemsSrAcct').val() != "") {
           
           if($('#BemsCostAcct').val()!="")
           {
               if($('#ApprCdCostAcct').val()=="Y")
               {
                   $('#Journal').show();
               }
           }
           else
           {
               if ($('#ApprCdSrAcct').val() == "Y") {
                   $('#Journal').show();
               }
           }
        }
        else {
            $('#Journal').show();
        }
        }

    if ($('#ApprCdCostAcct').val() == "Y" && $('#BemsSrAcct').val() == "" && $('#SessionBems').val() == $('#BemsCostAcct').val()) {
        $('#Journal').show();
    }

    if ($('#ApprCdSuper').val() == "Y" && $('#BemsFinCtl').val() != "" && $('#SessionBems').val() == $('#BemsFinCtl').val()) {
        $('#FinAppr').removeAttr("disabled");
        $('#recallButton').show();
        $('#supbut').attr("disabled", "disabled").button('refresh');
        $('#SupAppr').attr("disabled", "disabled").button('refresh');
    }

    if (($('#ApprCdFinCtl').val() == "Y" && $('#ApprCdSuper').val() == "Y") && $('#AccountantRole').val() == "Y") {
        $('#AccBut').removeAttr("disabled");
        $('#LbrAccBut').removeAttr("disabled");
        $('#MatAccBut').removeAttr("disabled");
        $('#CostAccBut').removeAttr("disabled");
        $('#JrnlAppBut').removeAttr("disabled");
        $('#supbut').attr("disabled", "disabled").button('refresh');
        $('#SupAppr').attr("disabled", "disabled").button('refresh');
        $('#Finbut').attr("disabled", "disabled").button('refresh');
        $('#FinAppr').attr("disabled", "disabled").button('refresh');
    }

    if ($('#ApprCdSuper').val() == "Y" && $('#ApprCdFinCtl').val() == "Y" && $('#BemsAcct').val() != "" && $('#SessionBems').val() == $('#BemsAcct').val()) {
        $('#AccAppr').removeAttr("disabled");
        $('#supbut').attr("disabled", "disabled").button('refresh');
        $('#SupAppr').attr("disabled", "disabled").button('refresh');
        $('#Finbut').attr("disabled", "disabled").button('refresh');
        $('#FinAppr').attr("disabled", "disabled").button('refresh');
    }

    if ($('#ApprCdSuper').val() == "Y" && $('#ApprCdFinCtl').val() == "Y" && $('#ApprCdAcct').val() == "Y") {
        if ($('#BemsLbrAcct').val() != "" && $('#SessionBems').val() == $('#BemsLbrAcct').val()) {
            $('#LbrAccAppr').removeAttr("disabled");
            $('#recallButton').show();
            $('#supbut').attr("disabled", "disabled").button('refresh');
            $('#SupAppr').attr("disabled", "disabled").button('refresh');
            $('#Finbut').attr("disabled", "disabled").button('refresh');
            $('#FinAppr').attr("disabled", "disabled").button('refresh');
            $('#AccBut').attr("disabled", "disabled").button('refresh');
            $('#AccAppr').attr("disabled", "disabled").button('refresh');
            if ($('#BemsMatlAcct').val() != "" && $('#ApprCdLbrAcct').val() == "Y" && $('#SessionBems').val() == $('#BemsMatlAcct').val()) {
                $('#MtlAccAppr').removeAttr("disabled");
                $('#recallButton').show();
                $('#supbut').attr("disabled", "disabled").button('refresh');
                $('#SupAppr').attr("disabled", "disabled").button('refresh');
                $('#Finbut').attr("disabled", "disabled").button('refresh');
                $('#FinAppr').attr("disabled", "disabled").button('refresh');
                $('#AccBut').attr("disabled", "disabled").button('refresh');
                $('#AccAppr').attr("disabled", "disabled").button('refresh');
                $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                if ($('#BemsCostAcct').val() != "" && $('#ApprCdMatlAcct').val() == "Y" && $('#SessionBems').val() == $('#BemsCostAcct').val()) {
                    $('#CostAccAppr').removeAttr("disabled");
                    $('#recallButton').show();
                    $('#supbut').attr("disabled", "disabled").button('refresh');
                    $('#SupAppr').attr("disabled", "disabled").button('refresh');
                    $('#Finbut').attr("disabled", "disabled").button('refresh');
                    $('#FinAppr').attr("disabled", "disabled").button('refresh');
                    $('#AccBut').attr("disabled", "disabled").button('refresh');
                    $('#AccAppr').attr("disabled", "disabled").button('refresh');
                    $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                    $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                    $('#MtlAccAppr').attr("disabled", "disabled").button('refresh');
                    $('#MatAccBut').attr("disabled", "disabled").button('refresh');
                    if ($('#BemsSrAcct').val() != "" && $('#ApprCdCostAcct').val() == "Y" && $('#SessionBems').val() == $('#BemsSrAcct').val()) {
                        $('#JrnlAppr').removeAttr("disabled");
                        $('#recallButton').show();
                        $('#supbut').attr("disabled", "disabled").button('refresh');
                        $('#SupAppr').attr("disabled", "disabled").button('refresh');
                        $('#Finbut').attr("disabled", "disabled").button('refresh');
                        $('#FinAppr').attr("disabled", "disabled").button('refresh');
                        $('#AccBut').attr("disabled", "disabled").button('refresh');
                        $('#AccAppr').attr("disabled", "disabled").button('refresh');
                        $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                        $('#MtlAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#MatAccBut').attr("disabled", "disabled").button('refresh');
                        $('#CostAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#CostAccBut').attr("disabled", "disabled").button('refresh');
                        $('#JrnlAppBut').attr("disabled", "disabled").button('refresh');
                    }
                }
            }
            if ($('#BemsCostAcct').val() != "" && $('#BemsMatlAcct').val() == "" && $('#ApprCdLbrAcct').val() == "Y" && $('#SessionBems').val() == $('#BemsCostAcct').val()) {
                $('#CostAccAppr').removeAttr("disabled");
                $('#recallButton').show();
                $('#supbut').attr("disabled", "disabled").button('refresh');
                $('#SupAppr').attr("disabled", "disabled").button('refresh');
                $('#Finbut').attr("disabled", "disabled").button('refresh');
                $('#FinAppr').attr("disabled", "disabled").button('refresh');
                $('#AccBut').attr("disabled", "disabled").button('refresh');
                $('#AccAppr').attr("disabled", "disabled").button('refresh');
                $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                $('#MtlAccAppr').attr("disabled", "disabled").button('refresh');
                $('#MatAccBut').attr("disabled", "disabled").button('refresh');
                if ($('#BemsSrAcct').val() != "" && $('#ApprCdCostAcct').val() == "Y" && $('#SessionBems').val() == $('#BemsSrAcct').val()) {
                    $('#JrnlAppr').removeAttr("disabled");
                    $('#recallButton').show();
                    $('#supbut').attr("disabled", "disabled").button('refresh');
                    $('#SupAppr').attr("disabled", "disabled").button('refresh');
                    $('#Finbut').attr("disabled", "disabled").button('refresh');
                    $('#FinAppr').attr("disabled", "disabled").button('refresh');
                    $('#AccBut').attr("disabled", "disabled").button('refresh');
                    $('#AccAppr').attr("disabled", "disabled").button('refresh');
                    $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                    $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                    $('#MtlAccAppr').attr("disabled", "disabled").button('refresh');
                    $('#MatAccBut').attr("disabled", "disabled").button('refresh');
                    $('#CostAccAppr').attr("disabled", "disabled").button('refresh');
                    $('#CostAccBut').attr("disabled", "disabled").button('refresh');
                    $('#JrnlAppBut').attr("disabled", "disabled").button('refresh');
                }
            }
        }
        else {
            if ($('#BemsMatlAcct').val() != "" && $('#SessionBems').val() == $('#BemsMatlAcct').val()) {
                $('#MtlAccAppr').removeAttr("disabled");
                $('#recallButton').show();
                $('#supbut').attr("disabled", "disabled").button('refresh');
                $('#SupAppr').attr("disabled", "disabled").button('refresh');
                $('#Finbut').attr("disabled", "disabled").button('refresh');
                $('#FinAppr').attr("disabled", "disabled").button('refresh');
                $('#AccBut').attr("disabled", "disabled").button('refresh');
                $('#AccAppr').attr("disabled", "disabled").button('refresh');
                $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                if ($('#BemsCostAcct').val() != "" && $('#ApprCdMatlAcct').val() == "Y" && $('#SessionBems').val() == $('#BemsCostAcct').val()) {
                    $('#CostAccAppr').removeAttr("disabled");
                    $('#recallButton').show();
                    $('#supbut').attr("disabled", "disabled").button('refresh');
                    $('#SupAppr').attr("disabled", "disabled").button('refresh');
                    $('#Finbut').attr("disabled", "disabled").button('refresh');
                    $('#FinAppr').attr("disabled", "disabled").button('refresh');
                    $('#AccBut').attr("disabled", "disabled").button('refresh');
                    $('#AccAppr').attr("disabled", "disabled").button('refresh');
                    $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                    $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                    $('#MtlAccAppr').attr("disabled", "disabled").button('refresh');
                    $('#MatAccBut').attr("disabled", "disabled").button('refresh');
                    if ($('#BemsSrAcct').val() != "" && $('#ApprCdCostAcct').val() == "Y" && $('#SessionBems').val() == $('#BemsSrAcct').val()) {
                        $('#JrnlAppr').removeAttr("disabled");
                        $('#recallButton').show();
                        $('#supbut').attr("disabled", "disabled").button('refresh');
                        $('#SupAppr').attr("disabled", "disabled").button('refresh');
                        $('#Finbut').attr("disabled", "disabled").button('refresh');
                        $('#FinAppr').attr("disabled", "disabled").button('refresh');
                        $('#AccBut').attr("disabled", "disabled").button('refresh');
                        $('#AccAppr').attr("disabled", "disabled").button('refresh');
                        $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                        $('#MtlAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#MatAccBut').attr("disabled", "disabled").button('refresh');
                        $('#CostAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#CostAccBut').attr("disabled", "disabled").button('refresh');
                        $('#JrnlAppBut').attr("disabled", "disabled").button('refresh');
                    }
                }
            }
            else {
                if ($('#BemsCostAcct').val() != "" && $('#SessionBems').val() == $('#BemsCostAcct').val()) {
                    $('#CostAccAppr').removeAttr("disabled");
                    $('#recallButton').show();
                    $('#supbut').attr("disabled", "disabled").button('refresh');
                    $('#SupAppr').attr("disabled", "disabled").button('refresh');
                    $('#Finbut').attr("disabled", "disabled").button('refresh');
                    $('#FinAppr').attr("disabled", "disabled").button('refresh');
                    $('#AccBut').attr("disabled", "disabled").button('refresh');
                    $('#AccAppr').attr("disabled", "disabled").button('refresh');
                    $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                    $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                    $('#MtlAccAppr').attr("disabled", "disabled").button('refresh');
                    $('#MatAccBut').attr("disabled", "disabled").button('refresh');
                    if ($('#BemsSrAcct').val() != "" && $('#ApprCdCostAcct').val() == "Y" && $('#SessionBems').val() == $('#BemsSrAcct').val()) {
                        $('#JrnlAppr').removeAttr("disabled");
                        $('#recallButton').show();
                        $('#supbut').attr("disabled", "disabled").button('refresh');
                        $('#SupAppr').attr("disabled", "disabled").button('refresh');
                        $('#Finbut').attr("disabled", "disabled").button('refresh');
                        $('#FinAppr').attr("disabled", "disabled").button('refresh');
                        $('#AccBut').attr("disabled", "disabled").button('refresh');
                        $('#AccAppr').attr("disabled", "disabled").button('refresh');
                        $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                        $('#MtlAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#MatAccBut').attr("disabled", "disabled").button('refresh');
                        $('#CostAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#CostAccBut').attr("disabled", "disabled").button('refresh');
                        $('#JrnlAppBut').attr("disabled", "disabled").button('refresh');
                    }
                }
                else {
                    if ($('#BemsSrAcct').val() != "" && $('#SessionBems').val() == $('#BemsSrAcct').val()) {

                        $('#JrnlAppr').removeAttr("disabled");
                        $('#recallButton').show();
                        $('#supbut').attr("disabled", "disabled").button('refresh');
                        $('#SupAppr').attr("disabled", "disabled").button('refresh');
                        $('#Finbut').attr("disabled", "disabled").button('refresh');
                        $('#FinAppr').attr("disabled", "disabled").button('refresh');
                        $('#AccBut').attr("disabled", "disabled").button('refresh');
                        $('#AccAppr').attr("disabled", "disabled").button('refresh');
                        $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                        $('#MtlAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#MatAccBut').attr("disabled", "disabled").button('refresh');
                        $('#CostAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#CostAccBut').attr("disabled", "disabled").button('refresh');
                        $('#JrnlAppBut').attr("disabled", "disabled").button('refresh');
                    }
                }
            }
        }
    }

    if ($('#BemsSrAcct').val() != "" && $('#ApprCdAcct').val() == "Y" && $('#ApprCdSrAcct').val() == "Y" && $('#SessionBems').val() == $('#BemsSrAcct').val()) {
        $('#Journal').show();
        $('#JrnlAppr').attr("disabled", "disabled").button('refresh');
    }
    if ($('#StatusId').val() == "OR" && $('#SessionBems').val() == $('#BemsOrig').val()) {
        $('#resetBut').show();
        $('#recallButton').hide();
    }

    if ($('#StatusId').val() == "AA" && $('#ApprCdAcct').val() == "" && $('#SessionBems').val() == $('#BemsAcct').val()) {
        $('#AccAppr').show();
    }
    if ($('#StatusId').val() == "OA") {
        $('#supbut').removeAttr("disabled");
        $('#SupAppr').removeAttr("disabled");
        $('#Finbut').removeAttr("disabled");
        $('#FinAppr').removeAttr("disabled");
        $('#AccBut').removeAttr("disabled");
        $('#AccAppr').removeAttr("disabled");
        $('#LbrAccAppr').removeAttr("disabled");
        $('#LbrAccBut').removeAttr("disabled");
        $('#MtlAccAppr').removeAttr("disabled");
        $('#MatAccBut').removeAttr("disabled");
        $('#CostAccAppr').removeAttr("disabled");
        $('#CostAccBut').removeAttr("disabled");
        $('#JrnlAppBut').removeAttr("disabled");
        $('#JrnlAppr').removeAttr("disabled");
        $('#recallButton').hide();
      }

    if ($('#StatusId').val() == "IP") {
        $('#Journal').hide();
        $('#Unjournal').show();
        $('#JournlInPro').show();
        $('#recallButton').hide();
    }
    if ($('#StatusId').val() == "AA") {
        $('#recallButton').hide();
    }

    if ($('#StatusId').val() == "XX" || $('#StatusId').val() == "XS") {
        $('#reopenBut').hide();
    }

    $('#searchModal').on('shown.bs.modal', function (e) {
        $('#searchMctrBtn').click(function (e) {
            var no = $('#searchMctr').val();
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: getBaseUrl("/MctrCreateForm/querymodecheck"),
                data: { mctrNo: no },
                success: function (result) {
                    if (result) {
                        window.location.href = getBaseUrl("/MctrCreateForm/MctrQmode") + "?mctrNo=" + $('#searchMctr').val();
               
                    }
                    else {
                        mctrObj.showDialog($("#alertSearch"), "Invalid MCTR No.", "error");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                }
            });

        });
    })

    function mctrheadertitleposttextitem() {
        var titleValue = $('#title').val();
        var origValue = $('#title').attr('value');

        origValue = $('#title').attr('value') == "" ? $('#title').val() : $('#title').attr('value');
        var statusID = $('#StatusId').val();
        if ((titleValue != origValue || titleValue == "") || (titleValue == "" && origValue != "") || (origValue == "" && titleValue != "")) {
            if (((statusID != "OA" || statusID != "") && $('#BemsOrig').attr('value') != $('#BemsOrig').val())) {//Inclue Session
                $('#title').val(origValue);
                mctrObj.showDialog($("#dialog-box"), "You must be the originator in the oa or or status to change title.", "error");
            }
            else if ((titleValue == "" && origValue != "")) {
                $('#title').val(origValue);
            }
        }
        if (titleValue == "" || titleValue == undefined) {
            mctrObj.showDialog($("#dialog-box"), "Please provide a title name.", "error");
            $('#title').val == " ";
        }

        $('#title').attr('value', origValue);
    };
    $('#title').change(function () {
        mctrheadertitleposttextitem();
    });

    $('#appljrnlbutn').unbind('click').click(function (e) {
        var statusid = $('#StatusId').val();
        if (((statusid == "OA") || (statusid == "AA") || (statusid == "JA")) || (statusid == "")) {
            var successFn = function (data) {
                if (data) {
                    bootbox.dialog({
                        title: "Application Journal Ids",
                        message: data,
                        onEscape: true,
                        size: "small"
                    })
                }
                else {
                    mctrObj.showDialog($("#dialog-box"), "must have the accountant role to enter this value.", "error");
                }
            };

            mctrObj.ajaxOptions('/MctrCreateForm/getRgApplLOV', 'GET', {
            }, successFn);
        }

        else {
            mctrObj.showDialog($("#dialog-box"), " status must be set to oa, aa, or ja to change this field.", "error");
        }
    });
    $('#reasonCodeBtn').unbind('click').click(function (e) {
        var status_id = $('#StatusId').val();
        if (((status_id == 'OA') || (status_id == 'AA') || (status_id == 'JA')) || (status_id == "")) {
            return true;
        }
            //set_item_property('reason_code',update_allowed,property_true);
            // set_item_property('reason_code',update_allowed,property_false);
            //message('a value was not selected from list.');
        else {
            mctrObj.showDialog($("#dialog-box"), "status (' || status_id || ') must be set to oa, aa, or ja to change this field.", "error");
            return false;
        }
    });

   
    $('#jpbut').click(function (e) {
        var origBu = $('#OrigBu').val();
        var mctrNo = $('#MctrNo').val();
         var succesFn = function (data) {
                                if ($('.bootbox').length == 0) {
                                if (data) {
                                    bootbox.dialog({
                                        title: "MCTR Justification Window",
                                            message: data,
                                            onEscape: true
                                          
                                    })
                                    }
                                }
                                };
         mctrObj.ajaxOptions('/MctrCreateForm/mctrHeaderbutJustificationWhenButtonPressed', 'GET', {
             origBu: origBu, mctrNo: mctrNo
                            }, succesFn);

});

   


    $('#fiscalYearBtn').unbind('click').click(function (e) {
        var lineItemCount = $('#Linesfrom').val();
        var origBu = $('#OrigBu').val();
        var statusId = $('#StatusId').val();
        var twiceFlag = true;
        if (origBu != "") {
            if (statusId == "" || statusId == "OA") {
                //LineItem Exists
                if ($('#1_ACTIVITY_ID_FROM').val() != '') {
                    twiceFlag = false;
                  bootbox.confirm("Do you want to continue with this action?", function (result) {
                        if (result) {
                            
                            var succesFn = function (data) {
                                if ($('.bootbox').not('.bootbox-confirm').length == 0) {
                                if (data) {
                                    bootbox.dialog({
                                        title: "Fiscal Year of Transfer(s)",
                                        message: data,
                                        onEscape: true,
                                        size: "small"
                                    })
                                }
                                }
                            };
                            mctrObj.ajaxOptions('/MctrCreateForm/getRgYearLOV', 'GET', {
                            }, succesFn);
                        }
                       
                    });

                }
                if (twiceFlag) {
                    var successFn = function (data) {
                        if ($('.bootbox').length == 0) {
                        if (data) {
                            bootbox.dialog({
                                title: "Fiscal Year of Transfer(s)",
                                message: data,
                                onEscape: true,
                                size: "small"
                            })
                        }
                        }
                    };
                    mctrObj.ajaxOptions('/MctrCreateForm/getRgYearLOV', 'GET', {
                    }, successFn);
                }
            }
            else {
                mctrObj.showDialog($("#dialog-box"), "The Oh Base year can only be changed when status is OA or blank for new entry by ORIGINATOR.", "error");
            }
        }
        else {
            mctrObj.showDialog($("#dialog-box"), "Please Select the business unit first.", "error");
        }
    });
    $('#cancelBut').click(function (e) {
        var status_id = $('#StatusId').val();
        bootbox.confirm("You have pressed a button that will send the MCTR to the 'Cancelled' status.Do you want to continue with this action?", function (result) {
            if (result) {
                if ((status_id == "OA" || status_id == "OR") && ($('#BemsOrig').val() == $('#SessionBems').val())) {
                    // note: the header date enter is set to itself to force workflow &quot;pre_update&quot; trigger to fire.
                    // note: this is method used to check to see if workflow status needs to be changed.
                    //:date_enter := :date_enter;
                    $('#processType').val("c");
                    var mctrcreateform = $('#form').serialize();
                    var mctrCreateForm = $('#form').serialize();
                    mctrCreateForm.StatusId = "XX";
                    $.ajax({
                        type: "POST",
                        url: getBaseUrl("/MctrCreateForm/mctrHeaderPreUpdate"),
                        data: mctrcreateform,
                        success: function (result) {
                            $('#StatusId').val(result.StatusId);
                            $('#StatusDescription').val("Cancelled MCTR");
                            mctrObj.showDialog($("#dialog-box"), "PRE Success", "success");
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                        }
                    });
                    $.ajax({
                        type: "POST",
                        url: getBaseUrl("/MctrCreateForm/mctrHeaderPreInsert"),
                        data: mctrCreateForm,
                        success: function (result) {
                            $('#reopenBut').show();
                            $('#cancelBut').hide();
                            mctrObj.showDialog($("#dialog-box"), "Cancel Successfull", "success");
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                        }
                    });
                }
            }
        });
    });

    $('#recallButton').click(function (e) {
        var status_id = $('#StatusId').val();
        $('#RejectCode').val("");
        //bootbox.confirm("  ", function (result) {
        bootbox.dialog({
            message: "You have pressed a button that will recall the MCTR to the Originator Rejection Status or Accounting Action Status. Existing approvals will be kept.",
            title: "Do you want to continue with this action??",
            onEscape: true,
            buttons: {
                success: {
                    label: "OK",
                    className: "btn-success",
                    callback: function () {
                        if ((status_id == 'SA' || status_id == 'LA' || status_id == 'FA') && ($('#BemsOrig').val() == $('#SessionBems').val())) {
                            $('#processType').val("rc");
                            var mctrcreateform = $('#form').serialize();
                            //mctrCreateForm.StatusId = status_id;
                            var mctrCreateForm = '';
                            $.ajax({
                                type: "POST",
                                url: getBaseUrl("/MctrCreateForm/mctrHeaderPreUpdate"),
                                data: mctrcreateform,
                                success: function (data) {
                                    $('#StatusId').val(data.StatusId);
                                    $('#StatusDescription').val(data.StatusDescription);
                                    $('#submitBtn').show();
                                    $('#resetBut').show();
                                            mctrObj.showDialog($("#dialog-box"), "Recall Successfull", "success");
                                            $('#recallButton').hide();
                                            $('#form').submit();
                                    if (data.StatusId = "FA") {
                                        $('#FinAppr').attr("disabled", "disabled").button('refresh');
                                        $('#Finbut').attr("disabled", "disabled").button('refresh');
                                    }

                                    if (data.StatusId = "SA") {
                                        $('#supbut').attr("disabled", "disabled").button('refresh');
                                        $('#SupAppr').attr("disabled", "disabled").button('refresh');
                                    }
                                    // mctrObj.showDialog($("#dialog-box"), "Recall Successfull", "success");
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                                }
                            });

                            var mctrCreateForm = $('#form').serialize();;
                        }
                        else if ((status_id == 'LM' || status_id == 'LB' || status_id == 'MA' || status_id == 'CA' || status_id == 'SR' || status_id == 'JA') && $('#BemsAcct').val() == $('#SessionBems').val()) {
                            $('#processType').val("rc");
                            $('#ApprCdAcct').val("");
                            $('#DateApprAcct').val("");
                            var mctrcreateform = $('#form').serialize();
                            $.ajax({
                                type: "POST",
                                url: getBaseUrl("/MctrCreateForm/mctrHeaderPreUpdate"),
                                data: mctrcreateform,
                                success: function (data) {
                                    $('#StatusId').val(data.StatusId);
                                    $('#StatusDescription').val(data.StatusDescription);
                                    var mctrCreateForm = JSON.stringify(data);
                                    if ($('#BemsOrig').val() == $('#SessionBems').val()) {
                                        $('#AccAppr').prop('disabled', false);
                                        $('#Journal').hide();
                                    }
                                    $('#recallButton').hide();
                                    $.ajax({
                                        type: "POST",
                                        url: getBaseUrl("/MctrCreateForm/mctrHeaderPreInsert"),
                                        data: mctrCreateForm,
                                        dataType: "json",
                                        contentType: "application/json; charset=utf-8",
                                        success: function (dataobj) {
                                            $('#submitBtn').show();
                                            $('#resetBut').show();
                                            $('#cancelBut').hide();
                                            //$('#AccAppr').removeAttr('disabled');
                                            if ($('#BemsOrig').val() == $('#SessionBems').val()) {
                                                $('#AccAppr').prop('disabled', false);
                                            }
                                            $('#form').submit();
                                            mctrObj.showDialog($("#dialog-box"), "Recall Successfull", "success");
                                            
                                        },
                                        error: function (jqXHR, textStatus, errorThrown) {
                                            mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                                        }
                                    });
                                    //  mctrObj.showDialog($("#dialog-box"), "PRE Success", "success");
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                                }
                            });


                        }
                        else {
                            mctrObj.showDialog($("#dialog-box"), "please save outstanding changes before using recall button.", "error");
                        }
                    }
                },
                main: {
                    label: "Cancel",
                    className: "btn-primary",
                    callback: function () {
                        // Example.show("Primary button");
                    }
                }
            }
        });
        $('#processType').val("");
    });

    $('#commentsBtn').click(function (e) {
        var succesFn = function (data) {
            if ($('.bootbox').length == 0) {
                if (data) {
                    bootbox.dialog({
                        title: "MCTR Comments Window",
                        message: data,
                        onEscape: true

                    })
                }
            }
        };

        mctrObj.ajaxOptions('/MctrCreateForm/MctrCommentOnLoad', 'GET', {
                mctrNo: $('#MctrNo').val()
        }, succesFn);


    });
    $('#reopenBut').click(function (e) {
        bootbox.confirm("You have pressed a button that will send the cancelled MCTR to the 'OR - Originator Rejection' status.Do you want to continue with this action?", function (result) {
            if (result) {
                $('#processType').val("o");
                var mctrcreateform = $('#form').serialize();
                $.ajax({
                    type: "POST",
                    url: getBaseUrl("/MctrCreateForm/mctrHeaderPreUpdate"),
                    data: mctrcreateform,
                    success: function (result) {
                        $('#StatusId').val(result.StatusId);
                        $('#StatusDescription').val(result.StatusDescription);
                        mctrObj.showDialog($("#dialog-box"), "PRE Success", "success");
                        var mctrCreateForm = $('#form').serialize();
                        $.ajax({
                            type: "POST",
                            url: getBaseUrl("/MctrCreateForm/mctrHeaderPreInsert"),
                            data: mctrCreateForm,
                            success: function (result) {
                                $('#cancelBut').show();
                                $('#reopenBut').hide();
                                $('#resetBut').show();
                                mctrObj.showDialog($("#dialog-box"), "Reopen Successfull", "success");
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                            }
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                    }
                });
             }
        });
    });
    $('#resetBut').click(function (e) {
        bootbox.confirm("You have pressed a button that will RESET all approval codes sending MCTR to 'Originator Action' status. Line item row validation will be performed.Do you want to continue with this action?", function (result) {
            if (result) {
                $('#processType').val("r");
                if ($('#StatusId').val() == "OR") {
                                    $('#ApprCdSuper').val("");
                                    $('#ApprCdFinCtl').val("");
                                    $('#ApprCdAcct').val("");
                                    $('#ApprCdLbrAcct').val("");
                                    $('#ApprCdMatlAcct').val("");
                                    $('#ApprCdCostAcct').val("");
                                    $('#ApprCdSrAcct').val("");
                                    $('#DateApprSuper').val("");
                                    $('#DateApprFinCtl').val("");
                                    $('#DateApprAcct').val("");
                                    $('#DateApprLbrAcct').val("");
                                    $('#DateApprMatlAcct').val("");
                                    $('#DateApprCostAcct').val("");
                                    $('#DateApprSrAcct').val("");
                                }
                                else {
                                    $('#ApprCdAcct').val("");
                                    $('#ApprCdLbrAcct').val("");
                                    $('#ApprCdMatlAcct').val("");
                                    $('#ApprCdCostAcct').val("");
                                    $('#ApprCdSrAcct').val("");
                                    $('#DateApprAcct').val("");
                                    $('#DateApprLbrAcct').val("");
                                    $('#DateApprMatlAcct').val("");
                                    $('#DateApprCostAcct').val("");
                                    $('#DateApprSrAcct').val("");
                                }
                var mctrcreateform = $('#form').serialize();
                $.ajax({
                    type: "POST",
                    url: getBaseUrl("/MctrCreateForm/mctrHeaderPreUpdate"),
                    data: mctrcreateform,
                    success: function (data) {
                        $('#StatusId').val(data.StatusId);
                        $('#StatusDescription').val("Originator Actions");
                        mctrObj.showDialog($("#dialog-box"), "PRE Success", "success");
                        if (data.StatusId == "OA") {
                            $('#submitBtn').show();
                            $('#JvItemCd').removeAttr('readonly');
                            $('#reasonCodeBtn').removeAttr("disabled");
                        }
                        var mctrCreateForm = $('#form').serialize();
                        $.ajax({
                            type: "POST",
                            url: getBaseUrl("/MctrCreateForm/mctrHeaderPreInsert"),
                            data: mctrCreateForm,
                            success: function (result) {
                                $('#cancelBut').show();
                                $('#reopenBut').hide();
                                $('#resetBut').hide();
                                mctrObj.showDialog($("#dialog-box"), "Reset Successfull", "success");
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                            }
                        });
                    }
                });
            }
        });
    });
    $('#postdelete').click(function (e) {
        var param = [];

        var statusid = $('#StatusId').val();

        var mctrCreateFormq = $('#form').serialize();
        var postdelete = JSON.stringify(mctrCreateFormq);
        var mctrCreateForm = $.extend({ mctrLineItem: param }, postdelete);
        mctrCreateForm.MctrNo = $('#MctrNo').val();
        mctrCreateForm.LineNo = $('#LineNo').val();
        $.each($('#tblJQGridCover').getGridParam('data'), function (key, value) {
            var rowID = value['_id_'];
            mctrCreateForm.LineNo = $('#' + rowID + '_LINE_NO').val();
            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

            var mctrLineItem = $.extend(grid1, grid2, grid3);
            param.push(mctrLineItem);
            $.ajax({
                url: getBaseUrl('/MctrCreateForm/mctrLineItemPostDelete'),
                type: 'POST',
                data: mctrCreateForm,
                //contentType: 'application/json'
                success: function (data) {

                    if (data.total_offset == 0) {
                        $('#' + rowID + '_total_offset').removeClass().addClass("yellow");
                    }
                    else {
                        $('#total_offset').removeClass().addClass("gray");
                    }
                }
            });

        });
    });
    $('#bubut').unbind('click').click(function (e) {
        var lineItemCount = $('#Linesfrom').val();
        var BemsOrig = $('#BemsOrig').val();
        var oldValOrigbu = $('#BemsOrig').attr('value');
        var origValueBu = $('#OrigBu').attr('value');
        var twiceFlag = true;
        //sessionbems 
        var statusId = $('#StatusId').val();
        if (statusId == "" || statusId == "OA") {
            if ($('#1_ACTIVITY_ID_FROM').val() != '')//proceed changing line items home bu when chosen = true
            {
                twiceFlag = false;
                if (!($('#tblJQGridFirst').find("*").hasClass("red") || $('#tblJQGridCover').find("*").hasClass("red") || $('#tblJQGridInner').find('input').hasClass("red"))) {
                var savedLines = parseInt($('#Linesfrom').val());
                var currentLines = 0;
                $.each($('#tblJQGridCover').getGridParam('data'), function (key, value) {
                    var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(value['_id_']));
                    if (grid1.ACTIVITY_ID_FROM !== '') {
                        currentLines = $('#tblJQGridCover').getGridParam('data')[key]._id_;
                    }
                    
                });
                if (savedLines == currentLines) {
                    bootbox.confirm("Do you want to continue with this action?", function (result) {
                        if (result) {
                            var succesFn = function (data) {
                                if ($('.bootbox').length == 0) {
                                if (data) {
                                    bootbox.dialog({
                                        title: "Business Units you can Submit an MCTR for",
                                        message: data,
                                        onEscape: true,
                                        size: "medium"
                                    })
                                }
                                }
                            };
                            mctrObj.ajaxOptions('/MctrCreateForm/BUGroupPopUp', 'GET', {
                                OrigBu: $('#OrigBu').val()
                            }, succesFn);
                        }
                        else {
                            $('#bubut').modal('hide');
                        }
                    });
                }
                else {
                    bootbox.alert(" Please SAVE or CANCEL outsatnding changes before using BU GRP button");
                }
                }
                else {
                    bootbox.alert(" Please SAVE or CANCEL outsatnding changes before using BU GRP button");
                }

                
            }
            if ($('#ReasonCode').val() != '') {
                //ajax call to segment
            }


            var successFn = function (data) {
                if (data) {
                    bootbox.dialog({
                        title: "Business Units you can Submit an MCTR for",
                        onEscape: true,
                        message: data
                    })
                }
                if (lineItemCount == 0) {
                    $('#fyear').val("");

                }
                else {
                    var mctrCreateForm = $('#form').serialize();
                    //  mctrObj.ajaxOptions('/MctrCreateForm/bubutapproversisvalid', 'GET', { mctrCreateForm }, successFn);
                }
                //   mctrObj.ajaxOptions('/MctrCreateForm/BUGroupPopUp', 'GET', {}, successFn);
                //reset fields when business unit is changed.
            };
            if (twiceFlag) {
                mctrObj.ajaxOptions('/MctrCreateForm/BUGroupPopUp', 'GET', {
                }, successFn);
            }
        }
        else {
            mctrObj.showDialog($("#dialog-box"), "the bu grp value can only be changed by originator when status is oa or blank for new entry.", "error");
        }
    });
    function preMctrLineItem(preUrl, mctrLineItem) {
        // $('#PreInsert').click(function (e) {
        preUrl = getBaseUrl(preUrl);
        var param = [];
        param.push(mctrLineItem);
        var statusid = $('#StatusId').val();

        var mctrCreateFormq = $('#form').serialize();
        //mctrCreateForm.mctrLineItem = param;
        var preupdate = JSON.stringify(mctrCreateFormq);
        var mctrCreateForm = $.extend({
            mctrLineItem: param
        }, preupdate);
        mctrCreateForm.title = $('#title').val();
        mctrCreateForm.MctrNo = $('#MctrNo').val();
        mctrCreateForm.StatusId = $('#StatusId').val();
        mctrCreateForm.OrigBu = $('#OrigBu').val();
        mctrCreateForm.fiscal_year = $('#fyear').val();
        mctrCreateForm.fyear = $('#fyear').val();
        //mtrCreateForm.py_cy_status = $('#py_cy_status').val();
        //var py_cy_status = $('#py_cy_status').val();
        var globalpy_cy_status;

        var currentYear = new Date().getFullYear();
        if (mctrCreateForm.fiscal_year < currentYear) {
            globalpy_cy_status = "PY";
            mctrCreateForm.py_cy_status = "PY";
        }
        else {
            globalpy_cy_status = "CY";
            mctrCreateForm.py_cy_status = "CY";
        }

        var rowID = mctrLineItem.LINE_NO;
        //set internal fields when value is missing.
        if (statusid == "OA" || statusid == "OR") {

            if (mctrCreateForm.acty_red_flg_from == "") {
                mctrCreateForm.acty_red_flg_from = "N";
            }
            if (mctrCreateForm.acty_red_flg_to == "") {
                mctrCreateForm.acty_red_flg_to = "N";
            }
            if (mctrCreateForm.dept_red_flg_from == "") {
                mctrCreateForm.dept_red_flg_from = "N";
                $('#' + rowID + '_HOME_DEPT_FROM').removeClass().addClass('white');
                $('#' + rowID + '_HOME_DEPT_FROM').attr("red-flag", "N");
            }
            if (mctrCreateForm.dept_red_flg_to == "") {
                mctrCreateForm.dept_red_flg_to = "N";
                $('#' + rowID + '_HOME_DEPT_TO').attr("red-flag", "N");
                $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass('white');

            }
            if (mctrCreateForm.work_dept_red_flg_from == "") {
                mctrCreateForm.work_dept_red_flg_from = "N";
                $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass('white');
                $('#' + rowID + '_WORK_DEPT_FROM').attr("red-flag", "N");
            }
            if (mctrCreateForm.work_dept_red_flg_to == "") {
                mctrCreateForm.work_dept_red_flg_to = "N";
                $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass('white');
                $('#' + rowID + '_WORK_DEPT_TO').attr("red-flag", "N");
            }



            //make hour and amounts null values are set to zero.
            if ($('#' + rowID + '_QUANTITY_FROM').val() == "") {
                $('#' + rowID + '_QUANTITY_FROM').val(0);
                $('#' + rowID + '_QUANTITY_TO').val(0);
            }
            if ($('#' + rowID + '_AMOUNT_FROM').val() == "") {
                $('#' + rowID + '_AMOUNT_FROM').val(0);
                $('#' + rowID + '_AMOUNT_TO').val(0);
            }
            if ($('#' + rowID + '_ADJUSTMENT_FROM').val() == "") {
                $('#' + rowID + '_ADJUSTMENT_FROM').val(0);
                $('#' + rowID + '_ADJUSTMENT_TO').val(0);
            }
            if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "LBR") {
                $('#' + rowID + '_MATERIAL_QUANTITY_FROM').val("");
                $('#' + rowID + '_MATERIAL_QUANTITY_TO').val("");
            }
            else if ($.trim($('#' + rowID + '_MATERIAL_QUANTITY_FROM').val()) != "") {

                $('#' + rowID + '_MATERIAL_QUANTITY_TO').val($('#' + rowID + '_MATERIAL_QUANTITY_FROM').val() * -1);
            }
            else {
                $('#' + rowID + '_MATERIAL_QUANTITY_TO').val($('#' + rowID + '_MATERIAL_QUANTITY_FROM').val());
            }

        }
        //line item key edit checks
        var accountfrom = $('#' + rowID + '_ACCOUNT_FROM ').val();
        var accountto = $('#' + rowID + '_ACCOUNT_TO ').val();
        var activityidto = $('#' + rowID + '_ACTIVITY_ID_TO ').val();
        var ftfFlag = true;


        if (statusid == "OA" || statusid == "OR" || statusid == "AA" || statusid == "CA" || statusid == "JA") {

            if (($('#' + rowID + '_ACTIVITY_ID_FROM').val() != "") && (($('#' + rowID + '_ACTIVITY_ID_FROM').val() != "REQUIRED"))) {

                if (ftfFlag && (($('#' + rowID + '_OH_BASE_YR_FROM ').val() == "") || (($('#' + rowID + '_OH_BASE_YR_TO ').val() == ""))) || (($('#' + rowID + '_OH_BASE_YR_FROM ').val() != mctrCreateForm.fiscal_year) || ($('#' + rowID + '_OH_BASE_YR_TO ').val() != mctrCreateForm.fiscal_year))) {
                    $('#' + rowID + '_ACTIVITY_ID_FROM').removeClass().addClass('red');

                    if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                        $('#loadingIcon').hide();
                        mctrObj.showDialog($("#dialog-box"), "'Line Item oh base year error encountered.'.", "error");
                        ftfFlag = false;

                    }

                }

                //if(ftfFlag && ( (($('#' + rowID + '_HOME_BUGL_FROM ').val() == "") || (($('#' + rowID + '_HOME_BUGL_TO ').val() == ""))) || ($('#' + rowID + '_HOME_BUGL_FROM ').val() != mctrCreateForm.fiscal_year))) {
                if (ftfFlag && ((($('#' + rowID + '_HOME_BUGL_FROM ').val() == "") || ($('#' + rowID + '_HOME_BUGL_FROM ').val() != mctrCreateForm.OrigBu)))) {
                    $('#' + rowID + '_ACTIVITY_ID_FROM').removeClass().addClass('red');
                    // e.stopPropagation();
                    // e.preventDefault();
                    if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                        $('#loadingIcon').hide();
                        mctrObj.showDialog($("#dialog-box"), "from line error: home bugl (from) value is missing or does not match the orig bu..", "error");
                        ftfFlag = false;
                    }
                }

                if (ftfFlag && ($('#' + rowID + '_PROJECT_ID_FROM ').val() == "")) {
                    $('#' + rowID + '_PROJECT_ID_FROM').removeClass().addClass('red');
                    //  e.stopPropagation();
                    //   e.preventDefault();
                    if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                        $('#loadingIcon').hide();
                        mctrObj.showDialog($("#dialog-box"), "from line error: project id (from) value is missing.", "error");
                        ftfFlag = false;
                    }
                    else if ($('#' + rowID + '_PROJECT_ID_FROM ').val() == "REQUIRED") {
                        $('#' + rowID + '_PROJECT_ID_FROM').removeClass().addClass('red');

                        if (ftfFlag && (!(statusid == "OR" && $('#processType').val() == "LR"))) {
                            $('#loadingIcon').hide();
                            mctrObj.showDialog($("#dialog-box"), "error: project id (from) contains the value required and must be corrected.", "error");
                            ftfFlag = false;
                        }
                    }

                }

                //}

                if (ftfFlag && ($('#' + rowID + '_ACTIVITY_ID_TO ').val() == "")) {
                    $('#' + rowID + '_ACTIVITY_ID_TO').removeClass().addClass('red');
                    //  e.stopPropagation();
                    //  e.preventDefault();
                    if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                        $('#loadingIcon').hide();
                        mctrObj.showDialog($("#dialog-box"), "to line error: activity id (to) value is missing.", "error");
                        ftfFlag = false;
                    }
                    else if ($('#' + rowID + '_ACTIVITY_ID_TO ').val() == "REQUIRED") {
                        $('#' + rowID + '_ACTIVITY_ID_TO').removeClass().addClass('red');
                        //     e.stopPropagation();
                        //     e.preventDefault();
                        if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                            $('#loadingIcon').hide();
                            mctrObj.showDialog($("#dialog-box"), "error: activity id (to) contains the value required and must be corrected.", "error");
                            ftfFlag = false;
                        }
                    }

                }

                if (ftfFlag && ($('#' + rowID + '_HOME_BUGL_TO ').val() == "")) {
                    $('#' + rowID + '_HOME_BUGL_TO').removeClass().addClass('red');
                    //  e.stopPropagation();
                    //  e.preventDefault();
                    if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                        $('#loadingIcon').hide();
                        mctrObj.showDialog($("#dialog-box"), "to line error: home bugl (to) value is missing.", "error");
                        ftfFlag = false;
                    }

                }
                if (ftfFlag && ($('#' + rowID + '_PROJECT_ID_TO ').val() == "")) {
                    $('#' + rowID + '_PROJECT_ID_TO').removeClass().addClass('red');
                    //  e.stopPropagation();
                    // e.preventDefault();
                    if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                        $('#loadingIcon').hide();
                        mctrObj.showDialog($("#dialog-box"), "to line error: project id (to) value is missing.", "error");
                        ftfFlag = false;
                    }
                    else if ($('#' + rowID + '_PROJECT_ID_TO ').val() == "REQUIRED") {
                        $('#' + rowID + '_PROJECT_ID_TO').removeClass().addClass('red');
                        //   e.stopPropagation();
                        //   e.preventDefault();
                        if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                            $('#loadingIcon').hide();
                            mctrObj.showDialog($("#dialog-box"), "error: project id (to) contains the value required and must be corrected.", "error");
                            ftfFlag = false;
                        }
                    }
                }

                //  }

                if (ftfFlag && ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM ').val() == "")) {
                    $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').removeClass().addClass('red');
                    //   e.stopPropagation();
                    //   e.preventDefault();
                    if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                        $('#loadingIcon').hide();
                        mctrObj.showDialog($("#dialog-box"), "from line error: project trans type (from) value is missing.", "error");
                        ftfFlag = false;
                    }
                }

                if (ftfFlag && ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM ').val() == "REQ")) {
                    $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').removeClass().addClass('red');
                    //  e.stopPropagation();
                    //  e.preventDefault();
                    if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                        $('#loadingIcon').hide();
                        mctrObj.showDialog($("#dialog-box"), "error: project trans type (from) contains the value req and must be corrected.", "error");
                        ftfFlag = false;
                    }
                }

                if (ftfFlag && ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM ').val() == "LBR")) {
                    if ($('#' + rowID + '_ACCOUNT_TO ').val() == "") {
                        $('#' + rowID + '_ACCOUNT_TO').removeClass().addClass('red');
                        //      e.stopPropagation();
                        //     e.preventDefault();
                        $('#loadingIcon').hide();
                        mctrObj.showDialog($("#dialog-box"), "ptt lbr error: missing account (to) value is required when ptt = lbr.", "error");
                        ftfFlag = false;
                    }
                        //to be verified 
                    else if ($('#' + rowID + '_WPD_TO ').val() == "" && mctrCreateForm.fiscal_year >= 2005) {
                        $('#' + rowID + '_WPD_TO').removeClass().addClass('red');
                        //    e.stopPropagation();
                        //     e.preventDefault();
                        if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                            $('#loadingIcon').hide();
                            mctrObj.showDialog($("#dialog-box"), "ptt lbr error: missing wpd (to) value is required when ptt = lbr.", "error");
                            ftfFlag = false;
                        }
                    }

                    if (ftfFlag && (($('#' + rowID + '_PROJ_TRANS_CODE_FROM ').val() == "OTS") || ($('#' + rowID + '_PROJ_TRANS_CODE_FROM ').val() == "STR"))) {
                        if (($('#' + rowID + '_CLASS_CD_FROM').val() == "") || ($('#' + rowID + '_CLASS_CD_TO').val() == "")) {

                            if ($('#' + rowID + '_CLASS_CD_FROM').val() == "") {
                                $('#' + rowID + '_CLASS_CD_FROM').removeClass().addClass('red');
                            }

                            if ($('#' + rowID + '_CLASS_CD_TO').val() == "") {
                                $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass('red');
                            }

                            if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                                $('#loadingIcon').hide();
                                mctrObj.showDialog($("#dialog-box"), "ptt lbr error: class code(from/to) values are required when ptc = str/ots.", "error");
                                ftfFlag = false;
                            }

                        }
                    }
                }

                if (ftfFlag && ((accountfrom != "" && globalpy_cy_status == 'PY') && (accountfrom.match("^6") || accountfrom.match("^7") || accountfrom.match("^8")))) {

                    $('#' + rowID + '_ACCOUNT_FROM').removeClass().addClass('red');

                    if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                        $('#loadingIcon').hide();
                        mctrObj.showDialog($("#dialog-box"), "from line error: accounts starting with 6, 7, 8 not allowed for prior year", "error");
                        ftfFlag = false;
                    }

                }


                if (ftfFlag && ((accountto != "" && globalpy_cy_status == 'PY') && (accountto.match("^6") || accountto.match("^7") || accountto.match("^8")))) {

                    $('#' + rowID + '_ACCOUNT_TO').removeClass().addClass('red');

                    if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                        $('#loadingIcon').hide();
                        mctrObj.showDialog($("#dialog-box"), "to line error: accounts starting with 6, 7, 8 not allowed for prior year", "error");
                        ftfFlag = false;
                    }

                }



                if (ftfFlag && ((activityidto != "OVERHEAD") && ($('#' + rowID + '_RSC_TO ').val()) == "")) {
                    if (globalpy_cy_status == 'CY' || (globalpy_cy_status == 'PY' && activityidto != 'NON-PROJ')) {

                        $('#' + rowID + '_RSC_TO').removeClass().addClass('red');
                    }

                    if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                        $('#loadingIcon').hide();
                        mctrObj.showDialog($("#dialog-box"), "to line error: the required rsc (to) value is missing.", "error");
                        ftfFlag = false;
                    }

                }

                if (ftfFlag && ((globalpy_cy_status == 'PY') && (($('#' + rowID + '_AFFILIATE_FROM').val()) == "") && mctrCreateForm.fiscal_year > 2007)) {

                    if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                        $('#' + rowID + '_AFFILIATE_FROM').val($('#' + rowID + '_HOME_BUGL_FROM').val());
                        $('#' + rowID + '_AFFILIATE_TO').val($('#' + rowID + '_AFFILIATE_FROM').val());
                    }
                    else {
                        $('#' + rowID + '_AFFILIATE_FROM').removeClass.addClass('red');
                        if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                            $('#loadingIcon').hide();
                            mctrObj.showDialog($("#dialog-box"), "from line error: affiliate (from) value is missing.", "error");
                            ftfFlag = false;
                        }
                    }

                }

                if (ftfFlag && (py_cy_status == 'CY')) {

                    if (($('#' + rowID + '_QUANTITY_TO').val() != ($('#' + rowID + '_QUANTITY_FROM').val() * - 1)) && ($('#' + rowID + '_QUANTITY_FROM').val() != 0)) {

                        $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass('red');

                        if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                            $('#loadingIcon').hide();
                            mctrObj.showDialog($("#dialog-box"), "line item net error: quantity from does not equal quantity to * -1.", "error");
                            ftfFlag = false;
                        }

                    }


                    if (ftfFlag && (($('#' + rowID + '_AMOUNT_TO').val() != ($('#' + rowID + '_AMOUNT_FROM').val() * - 1)) && ($('#' + rowID + '_AMOUNT_FROM').val() != 0))) {
                        $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass('red');

                        if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                            $('#loadingIcon').hide();
                            mctrObj.showDialog($("#dialog-box"), "line item net error: amount from does not equal amount to * -1.", "error");
                            ftfFlag = false;
                        }

                    }

                }

            }
            else {
                $('#' + rowID + '_ACTIVITY_ID_FROM').removeClass().addClass('red');

                if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "please enter valid activity id (from) value first.", "error");
                    ftfFlag = false;
                }
            }

            //check for validation fields that need to be corrected.
            //}
            var validationflag = ftfFlag;

            if (!(statusid == "OR" && $('#processType').val() == "LR")) {
                if (validationflag && (($('#' + rowID + '_ACTIVITY_ID_FROM').attr("class") == "red") || ($('#' + rowID + '_PROJECT_ID_FROM').attr("class") == "red"))) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "error: activity id / project id (from) fields need to be re-checked or corrected.", "error");
                    validationflag = false;
                }
                if (validationflag && (($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').attr("class") == "red"))) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "error: ptt (from/to) fields need to be re-checked or corrected.", "error");
                    validationflag = false;
                }
                if (validationflag && (($('#' + rowID + '_AFFILIATE_FROM').attr("class") == "red"))) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "error: affiliate (from/to) fields need to be re-checked or corrected.", "error");
                    validationflag = false;
                }
                if (validationflag && (($('#' + rowID + '_HOME_DEPT_FROM').attr("class") == "red") || ($('#' + rowID + '_HOME_LOC_FROM').attr("class") == "red"))) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "error: home department / location (from) fields need to be re-checked or corrected.", "error");
                    validationflag = false;
                }
                if (validationflag && (($('#' + rowID + '_WORK_DEPT_FROM').attr("class") == "red") || ($('#' + rowID + '_WORK_LOC_FROM').attr("class") == "red"))) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "error: work department / location (from) fields need to be re-checked or corrected.", "error");
                    validationflag = false;
                }
                if (validationflag && (($('#' + rowID + '_ACCOUNT_FROM').attr("class") == "red"))) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "error: account (from) field needs to be re-checked or corrected.", "error");
                    validationflag = false;
                }
                if (validationflag && (($('#' + rowID + '_CLASS_CD_FROM').attr("class") == "red"))) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "error: class code (from) field needs to be re-checked or corrected.", "error");
                    validationflag = false;
                }
                if (validationflag && (($('#' + rowID + '_RSC_FROM').attr("class") == "red"))) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "error: rsc (from) field needs to be re-checked or corrected.", "error");
                    validationflag = false;
                }
                if (validationflag && (($('#' + rowID + '_WPD_FROM').attr("class") == "red"))) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "error: wpd (from) field needs to be re-checked or corrected.", "error");
                    validationflag = false;
                }
                if (validationflag && (($('#' + rowID + '_BULK_FROM').attr("class") == "red"))) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "error: bulk (from) field needs to be re-checked or corrected.", "error");
                    validationflag = false;
                }
                if (validationflag && (($('#' + rowID + '_ESTMTG_PRICG_CD_FROM').attr("class") == "red"))) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "error: cec code (from) field needs to be re-checked or corrected.", "error");
                    validationflag = false;
                }
                if (validationflag && (($('#' + rowID + '_ACTIVITY_ID_TO').attr("class") == "red") || ($('#' + rowID + '_PROJECT_ID_TO').attr("class") == "red"))) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "error: activity id / project id (to) fields need to be re-checked or corrected.", "error");
                    validationflag = false;

                }
                if (validationflag && (($('#' + rowID + '_HOME_DEPT_TO').attr("class") == "red") || ($('#' + rowID + '_HOME_LOC_TO').attr("class") == "red"))) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "error: home department / location (to) fields need to be re-checked or corrected.", "error");
                    validationflag = false;

                }
                if (validationflag && (($('#' + rowID + '_WORK_DEPT_TO').attr("class") == "red") || ($('#' + rowID + '_WORK_LOC_TO').attr("class") == "red"))) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "error: work department / location (to) fields need to be re-checked or corrected.", "error");
                    validationflag = false;

                }
                if (validationflag && (($('#' + rowID + '_ACCOUNT_TO').attr("class") == "red"))) {
                    $('#loadingIcon').hide();

                    mctrObj.showDialog($("#dialog-box"), "error: account (to) field needs to be re-checked or corrected.", "error");
                    validationflag = false;
                }
                if (validationflag && (($('#' + rowID + '_CLASS_CD_TO').attr("class") == "red"))) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "error: class code (to) field needs to be re-checked or corrected.", "error");
                    validationflag = false;
                }
                if (validationflag && (($('#' + rowID + '_RSC_TO').attr("class") == "red"))) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "error: rsc (to) field needs to be re-checked or corrected.", "error");
                    validationflag = false;
                }
                if (validationflag && (($('#' + rowID + '_WPD_TO').attr("class") == "red"))) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "error: wpd (to) field needs to be re-checked or corrected.", "error");
                    validationflag = false;
                }
                if (validationflag && (($('#' + rowID + '_BULK_TO').attr("class") == "red"))) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "error: bulk (to) field needs to be re-checked or corrected.", "error");
                    validationflag = false;
                }
                if (validationflag && (($('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr("class") == "red"))) {
                    $('#loadingIcon').hide();

                    mctrObj.showDialog($("#dialog-box"), "error: cec code (to) field needs to be re-checked or corrected.", "error");
                    validationflag = false;
                }
                if (validationflag && (($('#' + rowID + '_QUANTITY_FROM').attr("class") == "red") || ($('#' + rowID + '_AMOUNT_FROM').attr("class") == "red"))) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "error: hours and amount (from/to) fields need to be re-checked or corrected.", "error");
                    validationflag = false;

                }

            }
        }

        if (validationflag && ftfFlag) {
            $.ajax({
                //url: '/MctrCreateForm/mctrLineItemPreUpdate',
                url: preUrl,
                type: 'POST',
                data: mctrCreateForm,
                async: false,
                success: function (data) {

                    var ttdflg = data[data.length -1].mctrLineItem[data[data.length -1].mctrLineItem.length -1].TTD_FLAG;
                    var perflg = data[data.length -1].mctrLineItem[data[data.length -1].mctrLineItem.length -1].PER_FLAG;

                    if ((ttdflg == null) || (ttdflg == 'B')) {

                        $('#' + rowID + '_ttdValue').addClass('black');
                        $('#' + rowID + '_ttdValue').text('B');
                    }
                    else if (ttdflg == 'R') {
                        $('#' + rowID + '_ttdValue').text('R');
                        $('#' + rowID + '_ttdValue').addClass('red');
                    }
                    else if (ttdflg == 'Y') {
                        $('#' + rowID + '_ttdValue').text('Y');
                        $('#' + rowID + '_ttdValue').addClass('yellow');
                    }
                    else if (ttdflg == 'G') {
                        $('#' + rowID + '_ttdValue').text('G');
                        $('#' + rowID + '_ttdValue').addClass('green');
                    }

                    else {
                        $('#' + rowID + '_ttdValue').text('B');
                        $('#' + rowID + '_ttdValue').addClass('black');

                    }

                    //set per_status box validation color.  
                    if ((perflg == null) || (data.per_flag == 'B')) {
                        $('#' + rowID + '_yearValue').text('B');
                        $('#' + rowID + '_yearValue').addClass('black');
                    }
                    else if (perflg == 'R') {
                        $('#' + rowID + '_yearValue').text('R');
                        $('#' + rowID + '_yearValue').addClass('red');
                    }
                    else if (perflg == 'Y') {
                        $('#' + rowID + '_yearValue').text('Y');
                        $('#' + rowID + '_yearValue').addClass('yellow');
                    }
                    else if (perflg == 'G') {
                        $('#' + rowID + '_yearValue').text('G');
                        $('#' + rowID + '_yearValue').addClass('green');
                    }

                    else {
                        $('#' + rowID + '_yearValue').text('B');
                        $('#' + rowID + '_yearValue').addClass('black');

                    }


                }
                //error: function (jqXHR, textStatus, errorThrown) {
                //    alert("fail");
                //}
            }
                );
        }
        // });
    }
    function postMctrLineItem(postUrl, mctrLineItem) {
        postUrl = getBaseUrl(postUrl);
        //$('#PostInsert').click(function (e) {
        var param = [];
        param.push(mctrLineItem);
        var statusid = $('#StatusId').val();

        var mctrCreateFormq = $('#form').serialize();
        var preupdate = JSON.stringify(mctrCreateFormq);
        var mctrCreateForm = $.extend({
            mctrLineItem: param
        }, preupdate);
        mctrCreateForm.MctrNo = $('#MctrNo').val();
        mctrCreateForm.StatusId = $('#StatusId').val();
        mctrCreateForm.OrigBu = $('#OrigBu').val();
        mctrCreateForm.fiscal_year = $('#fyear').val();
        mctrCreateForm.fyear = $('#fyear').val();

        var py_cy_status;
        var currentYear = new Date().getFullYear();
        if (mctrCreateForm.fiscal_year < currentYear) {
            globalpy_cy_status = "PY";
            mctrCreateForm.py_cy_status = "PY";
        } else {
            globalpy_cy_status = "CY";
            mctrCreateForm.py_cy_status = "CY";
        }

        //  $.each($('#tblJQGridCover').getGridParam('data'), function (key, value) {
        //var rowID = value['_id_'];
        //mctrCreateForm.LineNo = $('#' + rowID + '_LINE_NO').val();
        //  var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
        //  var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
        // var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

        //  var mctrLineItem = $.extend(grid1, grid2, grid3);
        //   param.push(mctrLineItem);


        $.ajax({
            // url: '/MctrCreateForm/mctrLineItemPostUpdate',
            url: postUrl,
            type: 'POST',
            data: mctrCreateForm,
            success: function (data) {

                //highlight total offset field when offset amount nets to zero and offset rows exist.
                $('#' + mctrLineItem.LINE_NO + '_OH_AMT_FROM').val(data[0].OHAmtFrom);
                $('#' + mctrLineItem.LINE_NO + '_OH_AMT_TO').val(data[0].OHAmtTo);
                $('#totalOhFrom').val(data[0].totalOhFrom);
                $('#totalOh').val(data[0].totalOh);
                $('#totalOhTo').val(data[0].totalOhTo);
                $('#totaloffset').val(data[0].totaloffset);
                var offsetLines = data[0].OffsetLines;

                if ((data[0].totalOffset) == 0 && offsetLines > 0) {

                    $('#totalOffset').addClass('yellow');
                }
                else {
                    //  $('#' + mctrLineItem.LINE_NO + '_totaloffset').removeClass().addClass('black');
                    $('#totalOffset').removeClass('yellow').addClass('white');

                }
            }
        });


    }
    function mctrLineItemhomeDeptFromPostTextItem() {
        var fiscal_year = $('#fyear').val();
        var py_cy_status = $('#fyear').val().trim() == (new Date).getFullYear() ? 'CY' : 'PY';
        var status_id = $('#StatusId').val();
        var bems_orig = $('#BemsOrig').val();
        var bems_acct = $('#BemsAcct').val();
        var home_dept_from = $('input[id*=HOMEDEPT]').val();
        var OrigHomeDeptFrom = $('input[id*=HOMEDEPT]').attr('value') == "" ? $('input[id*=HOMEDEPT]').val() : $('input[id*=HOMEDEPT]').attr('value');

        if (($('#' + rowID + '_HOME_DEPT_FROM').val() != OrigHomeDeptFrom) || ($('#' + rowID + '_HOME_DEPT_FROM').val() != "" && ($('#' + rowID + '_HOME_LOC_FROM').val() == "") || ($('#' + rowID + '_HOME_LOC_FROM').val() != "" && home_dept_from.attr('value') == "") || ($('#' + rowID + '_HOME_LOC_FROM').val() == "" && home_dept_from.attr('value') != "") || $('#' + rowID + '_HOME_DEPT_FROM').attr('class') == "red")) {
            if (((status_id && bems_orig == $('#SessionBems').val()) || (status_id && bems_acct == $('#SessionBems').val()) || (status_id == "CA" && bems_cost_acct == $('#SessionBems').val())) && ($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() != "frg" || $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == "")) {
                if ($('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || $('#' + rowID + '_PERIOD_TO').val() == "" || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == "REQUIRED") {
                    $('#' + rowID + '_HOME_DEPT_FROM').val(home_dept_from.attr('value'));
                    mctrObj.showDialog($("#dialog-box"), "please enter the activity id (from) first.", "error");
                }
                else if ($('#' + rowID + '_PROJECT_ID_FROM').val() == "" || $('#' + rowID + '_PROJECT_ID_FROM').val() == "REQUIRED") {
                    $('#' + rowID + '_HOME_DEPT_FROM').val(home_dept_from.attr('value'));
                    mctrObj.showDialog($("#dialog-box"), "please enter the project id (from) first.", "error");
                }
                else if ($('#' + rowID + '_ACCOUNT_FROM').val() == "") {
                    $('#' + rowID + '_HOME_DEPT_FROM').val(home_dept_from.attr('value'));
                    mctrObj.showDialog($("#dialog-box"), "please enter the account (from)  first.", "error");
                }
                else if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "" || $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "REQ") {
                    $('#' + rowID + '_HOME_DEPT_FROM').val(home_dept_from.attr('value'));
                    mctrObj.showDialog($("#dialog-box"), "project trans type (from) value must be entered first.", "error");
                }
                else if (($('#' + rowID + '_HOME_DEPT_FROM').val() != "" && $('#' + rowID + '_HOME_LOC_FROM').val()) && ($('#' + rowID + '_HOME_DEPT_FROM').val() == home_dept_from.attr('value') && $('#' + rowID + '_HOME_POOL_FROM').val() == "") && ($('#' + rowID + '_HOME_DEPT_FROM').attr('class') == "red")) {
                    $('#' + rowID + '_HOME_LOC_FROM').removeClass().addClass("background-color", "red");
                    $('#' + rowID + '_HOME_DEPT_FROM').removeClass().addClass("white");
                    $('#' + rowID + '_HOME_DEPT_FROM').attr("red-flag", "N");
                }
                else {
                    if (py_cy_status == "CY") {
                        if ($('#' + rowID + '_PERIOD_FROM').val() == period_from.attr('value')) {
                            $('#' + rowID + '_PERIOD_TO').val(period_to.attr('value'));
                        }
                    }
                    if ($('#' + rowID + '_HOME_BUGL_FROM').val() == "") {
                        $('#' + rowID + '_HOME_BUGL_FROM').val(bems_orig);
                    }
                    if ((py_cy_status == "PY" && fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_FROM').val() != "")) {
                        setid.attr($('#' + rowID + '_AFFILIATE_FROM').val());
                    }
                    else {
                        setid.attr($('#' + rowID + '_HOME_BUGL_FROM').val());
                    }
                    var v_setid = setid.attr('value');
                }
                if ($('#' + rowID + '_HOME_DEPT_FROM').val() == "" && home_dept_from.attr('value') !== "") {
                    mctrlineitem.dept_red_flg_from == "N";
                    $('#' + rowID + '_TTD_FLAG').removeClass().addClass("white");
                    $('#' + rowID + '_PER_FLAG').removeClass().addClass("white");
                    $('#' + rowID + '_HOME_DEPT_FROM').removeClass().addClass("white");
                    $('#' + rowID + '_HOME_DEPT_FROM').attr("red-flag", "N");

                    $('#' + rowID + '_HOME_LOC_FROM').removeClass().addClass("white");

                    if ($('#' + rowID + '_HOME_DEPT_FROM').val() == "null") {
                        if (DEPT_STATUS == "I") {
                            $('#' + rowID + '_HOME_DEPT_FROM').removeClass().addClass("Orange");
                            $('#' + rowId + '_HOME_DEPT_FROM').attr('red-flag', 'Y');
                            mctrObj.showDialog($("#dialog-box"), "warning: inactive department/location combination selected.", "warning");
                        }
                        if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "LBR") {
                            if ($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() = "PRM") {
                                if ($('#' + rowID + '_LABOR_RATE_CD7_FROM').val("00"));
                                if ($('#' + rowID + '_QUANTITY_FROM').val("0"));
                                if ($('#' + rowID + '_QUANTITY_TO').val("0"));
                                if ($('#' + rowID + '_AMOUNT_FROM').val() !== 0) {
                                    $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass("Red");
                                }
                                else if ($('#' + rowID + '_AMOUNT_TO').val() !== 0) {
                                    $('#' + rowID + '_AMOUNT_TO').removeClass().addClass("Red");
                                }
                            }
                            if ($('#' + rowID + '_CLASS_CD_FROM').val() !== "" && class_cd_from.attr('value') !== "" && class_cd_from.attr('value') == $('#' + rowID + '_CLASS_CD_FROM').val()) {
                                $('#' + rowID + '_CLASS_CD_FROM').val(class_cd_from.attr('value'));
                                $('#' + rowID + '_CLASS_CD_FROM').removeClass().addClass("Red");
                            }
                            else {
                                $('#' + rowID + '_CLASS_CD_FROM').removeClass().addClass("White");
                            }
                            if ($('#' + rowID + '_RSC_FROM').val() !== "" && rsc_from.attr('value') == "" && rsc_from.attr('value') !== $('#' + rowID + '_RSC_FROM').val()) {
                                $('#' + rowID + '_RSC_FROM').removeClass().addClass("Red");
                            }
                            else {
                                $('#' + rowID + '_RSC_FROM').removeClass().addClass("White");
                            }
                        }
                        else {
                            $('#' + rowID + '_LABOR_RATE_CD7_FROM').val("");
                            $('#' + rowID + '_CLASS_CD_FROM').val(class_cd_from.attr('value'));
                            $('#' + rowID + '_RSC_FROM').val(rsc_from.attr('value'));
                        }
                        if ($('#' + rowID + '_WORK_DEPT_FROM').val() == "" && $('#' + rowID + '_WORK_LOC_FROM').val() == "" || $('#' + rowID + '_WORK_DEPT_FROM').val() == $('#' + rowID + '_HOME_DEPT_FROM').val() && $('#' + rowID + '_WORK_LOC_FROM').val() == "") {
                            $('#' + rowID + '_WORK_DEPT_FROM').val($('#' + rowID + '_HOME_DEPT_FROM').val());
                            $('#' + rowID + '_WORK_LOC_FROM').val($('#' + rowID + '_HOME_LOC_FROM').val());
                            $('#' + rowID + '_WORK_POOL_FROM').val($('#' + rowID + '_HOME_POOl_FROM').val());
                            if (DEPT_STATUS == "I") {
                                mctrlineitem.work_dept_red_flg_from == "Y";
                                $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass("Orange");
                                $('#' + rowId + '_WORK_DEPT_FROM').attr('red-flag', 'Y');
                            }
                            else {
                                mctrlineitem.work_dept_red_flg_from == "N";
                                $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass("White");
                                $('#' + rowID + '_WORK_DEPT_FROM').attr("red-flag", "N");
                            }
                        }
                        else if ($('#' + rowID + '_HOME_LOC_FROM').val() !== "" && $('#' + rowID + '_WORK_DEPT_FROM').val() == "" || $('#' + rowID + '_WORK_LOC_FROM').val() == "" || $('#' + rowID + '_WORK_POOl_FROM').val() == "" || $('#' + rowID + '_WORK_DEPT_FROM').val() !== $('#' + rowID + '_HOME_DEPT_FROM').val() || $('#' + rowID + '_WORK_LOC_FROM').val() !== $('#' + rowID + '_HOME_LOC_FROM').val() || $('#' + rowID + '_WORK_POOL_FROM').val() !== $('#' + rowID + '_HOME_POOL_FROM').val()) {
                            //bootbox 
                        }
                    }
                    else {
                        $('#' + rowID + '_HOME_POOL_FROM').val("");
                        $('#' + rowID + '_LABOR_RATE_CD7_FROM').val("");
                        if ($('#' + rowID + '_HOME_LOC_FROM').val() !== "") {
                            $('#' + rowID + '_HOME_LOC_FROM').removeClass().addClass("Red");
                        }
                        if ($('#' + rowID + '_CLASS_CD_FROM').val() !== "") {
                            $('#' + rowID + '_CLASS_CD_FROM').removeClass().addClass("Red");
                        }
                        if ($('#' + rowID + '_RSC_FROM').val() !== "") {
                            $('#' + rowID + '_RSC_FROM').removeClass().addClass("Red");
                        }
                        if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM') == "LBR") {
                            mctrObj.showDialog($("#dialog-box"), "warning: home department/location from selection is normally required when ptt = lbr.", "error");
                        }
                    }
                    DEPT_STATUS == null;
                    if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM') == "LBR") {
                        $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').removeClass().addClass("Red");
                        $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass("Red");
                    }
                    else if ($('#' + rowID + '_QUANTITY_FROM').val() == 0 && $('#' + rowID + '_AMOUNT_FROM').val() == 0) {

                    }

                }
            }
        }
    }

    $("#savebut").click(function (e) {
        var title = $('#title').val();
        var reasonCode = $('#ReasonCode').val();
        var OrigBu = $('#OrigBu').val();
        var fyear = $('#fyear').val();
        var OrigGroup = $('#OrigGroup').val();
        var mctrno = $('#MctrNo').val();
        var activityid = $('#1_ACTIVITY_ID_FROM').val();

        if ($('#ApprCdCostAcct').val() == "Y" && $('#BemsSrAcct').val() == "" && $('#SessionBems').val() == $('#BemsCostAcct').val()) {
            $('#Journal').show();
        }

        if ($('#ApprCdSuper').val() == "Y" && $('#BemsFinCtl').val() != "" && $('#SessionBems').val() == $('#BemsFinCtl').val()) {
            $('#FinAppr').removeAttr("disabled");
            $('#recallButton').show();
            $('#supbut').attr("disabled", "disabled").button('refresh');
            $('#SupAppr').attr("disabled", "disabled").button('refresh');
        }

        if (($('#ApprCdFinCtl').val() == "Y" && $('#ApprCdSuper').val() == "Y") && $('#AccountantRole').val() == "Y") {
            $('#AccBut').removeAttr("disabled");
            $('#LbrAccBut').removeAttr("disabled");
            $('#MatAccBut').removeAttr("disabled");
            $('#CostAccBut').removeAttr("disabled");
            $('#JrnlAppBut').removeAttr("disabled");
            $('#supbut').attr("disabled", "disabled").button('refresh');
            $('#SupAppr').attr("disabled", "disabled").button('refresh');
            $('#Finbut').attr("disabled", "disabled").button('refresh');
            $('#FinAppr').attr("disabled", "disabled").button('refresh');
        }

        if ($('#ApprCdSuper').val() == "Y" && $('#ApprCdFinCtl').val() == "Y" && $('#BemsAcct').val() != "" && $('#SessionBems').val() == $('#BemsAcct').val()) {
            $('#AccAppr').removeAttr("disabled");
            $('#supbut').attr("disabled", "disabled").button('refresh');
            $('#SupAppr').attr("disabled", "disabled").button('refresh');
            $('#Finbut').attr("disabled", "disabled").button('refresh');
            $('#FinAppr').attr("disabled", "disabled").button('refresh');
        }

        if ($('#ApprCdSuper').val() == "Y" && $('#ApprCdFinCtl').val() == "Y" && $('#ApprCdAcct').val() == "Y") {
            if ($('#BemsLbrAcct').val() != "" && $('#SessionBems').val() == $('#BemsLbrAcct').val()) {
                $('#LbrAccAppr').removeAttr("disabled");
                $('#recallButton').show();
                $('#supbut').attr("disabled", "disabled").button('refresh');
                $('#SupAppr').attr("disabled", "disabled").button('refresh');
                $('#Finbut').attr("disabled", "disabled").button('refresh');
                $('#FinAppr').attr("disabled", "disabled").button('refresh');
                $('#AccBut').attr("disabled", "disabled").button('refresh');
                $('#AccAppr').attr("disabled", "disabled").button('refresh');
                if ($('#BemsMatlAcct').val() != "" && $('#ApprCdLbrAcct').val() == "Y" && $('#SessionBems').val() == $('#BemsMatlAcct').val()) {
                    $('#MtlAccAppr').removeAttr("disabled");
                    $('#recallButton').show();
                    $('#supbut').attr("disabled", "disabled").button('refresh');
                    $('#SupAppr').attr("disabled", "disabled").button('refresh');
                    $('#Finbut').attr("disabled", "disabled").button('refresh');
                    $('#FinAppr').attr("disabled", "disabled").button('refresh');
                    $('#AccBut').attr("disabled", "disabled").button('refresh');
                    $('#AccAppr').attr("disabled", "disabled").button('refresh');
                    $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                    $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                    if ($('#BemsCostAcct').val() != "" && $('#ApprCdMatlAcct').val() == "Y" && $('#SessionBems').val() == $('#BemsMatlAcct').val()) {
                        $('#CostAccAppr').removeAttr("disabled");
                        $('#recallButton').show();
                        $('#supbut').attr("disabled", "disabled").button('refresh');
                        $('#SupAppr').attr("disabled", "disabled").button('refresh');
                        $('#Finbut').attr("disabled", "disabled").button('refresh');
                        $('#FinAppr').attr("disabled", "disabled").button('refresh');
                        $('#AccBut').attr("disabled", "disabled").button('refresh');
                        $('#AccAppr').attr("disabled", "disabled").button('refresh');
                        $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                        $('#MtlAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#MatAccBut').attr("disabled", "disabled").button('refresh');
                        if ($('#BemsSrAcct').val() != "" && $('#ApprCdCostAcct').val() == "Y" && $('#SessionBems').val() == $('#BemsMatlAcct').val()) {
                            $('#JrnlAppr').removeAttr("disabled");
                            $('#recallButton').show();
                            $('#supbut').attr("disabled", "disabled").button('refresh');
                            $('#SupAppr').attr("disabled", "disabled").button('refresh');
                            $('#Finbut').attr("disabled", "disabled").button('refresh');
                            $('#FinAppr').attr("disabled", "disabled").button('refresh');
                            $('#AccBut').attr("disabled", "disabled").button('refresh');
                            $('#AccAppr').attr("disabled", "disabled").button('refresh');
                            $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                            $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                            $('#MtlAccAppr').attr("disabled", "disabled").button('refresh');
                            $('#MatAccBut').attr("disabled", "disabled").button('refresh');
                            $('#CostAccAppr').attr("disabled", "disabled").button('refresh');
                            $('#CostAccBut').attr("disabled", "disabled").button('refresh');
                            $('#JrnlAppBut').attr("disabled", "disabled").button('refresh');
                        }
                    }
                }
                if ($('#BemsCostAcct').val() != "" && $('#BemsMatlAcct').val() == "" && $('#ApprCdLbrAcct').val() == "Y" && $('#SessionBems').val() == $('#BemsCostAcct').val()) {
                    $('#CostAccAppr').removeAttr("disabled");
                    $('#recallButton').show();
                    $('#supbut').attr("disabled", "disabled").button('refresh');
                    $('#SupAppr').attr("disabled", "disabled").button('refresh');
                    $('#Finbut').attr("disabled", "disabled").button('refresh');
                    $('#FinAppr').attr("disabled", "disabled").button('refresh');
                    $('#AccBut').attr("disabled", "disabled").button('refresh');
                    $('#AccAppr').attr("disabled", "disabled").button('refresh');
                    $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                    $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                    $('#MtlAccAppr').attr("disabled", "disabled").button('refresh');
                    $('#MatAccBut').attr("disabled", "disabled").button('refresh');
                    if ($('#BemsSrAcct').val() != "" && $('#ApprCdCostAcct').val() == "Y" && $('#SessionBems').val() == $('#BemsSrAcct').val()) {
                        $('#JrnlAppr').removeAttr("disabled");
                        $('#recallButton').show();
                        $('#supbut').attr("disabled", "disabled").button('refresh');
                        $('#SupAppr').attr("disabled", "disabled").button('refresh');
                        $('#Finbut').attr("disabled", "disabled").button('refresh');
                        $('#FinAppr').attr("disabled", "disabled").button('refresh');
                        $('#AccBut').attr("disabled", "disabled").button('refresh');
                        $('#AccAppr').attr("disabled", "disabled").button('refresh');
                        $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                        $('#MtlAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#MatAccBut').attr("disabled", "disabled").button('refresh');
                        $('#CostAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#CostAccBut').attr("disabled", "disabled").button('refresh');
                        $('#JrnlAppBut').attr("disabled", "disabled").button('refresh');
                    }
                }
                
            }
            else {
                if ($('#BemsMatlAcct').val() != "" && $('#SessionBems').val() == $('#BemsMatlAcct').val()) {
                    $('#MtlAccAppr').removeAttr("disabled");
                    $('#recallButton').show();
                    $('#supbut').attr("disabled", "disabled").button('refresh');
                    $('#SupAppr').attr("disabled", "disabled").button('refresh');
                    $('#Finbut').attr("disabled", "disabled").button('refresh');
                    $('#FinAppr').attr("disabled", "disabled").button('refresh');
                    $('#AccBut').attr("disabled", "disabled").button('refresh');
                    $('#AccAppr').attr("disabled", "disabled").button('refresh');
                    $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                    $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                    if ($('#BemsCostAcct').val() != "" && $('#ApprCdMatlAcct').val() == "Y" && $('#SessionBems').val() == $('#BemsCostAcct').val()) {
                        $('#CostAccAppr').removeAttr("disabled");
                        $('#recallButton').show();
                        $('#supbut').attr("disabled", "disabled").button('refresh');
                        $('#SupAppr').attr("disabled", "disabled").button('refresh');
                        $('#Finbut').attr("disabled", "disabled").button('refresh');
                        $('#FinAppr').attr("disabled", "disabled").button('refresh');
                        $('#AccBut').attr("disabled", "disabled").button('refresh');
                        $('#AccAppr').attr("disabled", "disabled").button('refresh');
                        $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                        $('#MtlAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#MatAccBut').attr("disabled", "disabled").button('refresh');
                        if ($('#BemsSrAcct').val() != "" && $('#ApprCdCostAcct').val() == "Y" && $('#SessionBems').val() == $('#BemsSrAcct').val()) {
                            $('#JrnlAppr').removeAttr("disabled");
                            $('#recallButton').show();
                            $('#supbut').attr("disabled", "disabled").button('refresh');
                            $('#SupAppr').attr("disabled", "disabled").button('refresh');
                            $('#Finbut').attr("disabled", "disabled").button('refresh');
                            $('#FinAppr').attr("disabled", "disabled").button('refresh');
                            $('#AccBut').attr("disabled", "disabled").button('refresh');
                            $('#AccAppr').attr("disabled", "disabled").button('refresh');
                            $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                            $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                            $('#MtlAccAppr').attr("disabled", "disabled").button('refresh');
                            $('#MatAccBut').attr("disabled", "disabled").button('refresh');
                            $('#CostAccAppr').attr("disabled", "disabled").button('refresh');
                            $('#CostAccBut').attr("disabled", "disabled").button('refresh');
                            $('#JrnlAppBut').attr("disabled", "disabled").button('refresh');
                        }
                    }
                }
                else {
                    if ($('#BemsCostAcct').val() != "" && $('#SessionBems').val() == $('#BemsCostAcct').val()) {
                        $('#CostAccAppr').removeAttr("disabled");
                        $('#recallButton').show();
                        $('#supbut').attr("disabled", "disabled").button('refresh');
                        $('#SupAppr').attr("disabled", "disabled").button('refresh');
                        $('#Finbut').attr("disabled", "disabled").button('refresh');
                        $('#FinAppr').attr("disabled", "disabled").button('refresh');
                        $('#AccBut').attr("disabled", "disabled").button('refresh');
                        $('#AccAppr').attr("disabled", "disabled").button('refresh');
                        $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                        $('#MtlAccAppr').attr("disabled", "disabled").button('refresh');
                        $('#MatAccBut').attr("disabled", "disabled").button('refresh');
                        if ($('#BemsSrAcct').val() != "" && $('#ApprCdCostAcct').val() == "Y" && $('#SessionBems').val() == $('#BemsSrAcct').val()) {
                            $('#recallButton').show();
                            $('#JrnlAppr').removeAttr("disabled");
                            $('#supbut').attr("disabled", "disabled").button('refresh');
                            $('#SupAppr').attr("disabled", "disabled").button('refresh');
                            $('#Finbut').attr("disabled", "disabled").button('refresh');
                            $('#FinAppr').attr("disabled", "disabled").button('refresh');
                            $('#AccBut').attr("disabled", "disabled").button('refresh');
                            $('#AccAppr').attr("disabled", "disabled").button('refresh');
                            $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                            $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                            $('#MtlAccAppr').attr("disabled", "disabled").button('refresh');
                            $('#MatAccBut').attr("disabled", "disabled").button('refresh');
                            $('#CostAccAppr').attr("disabled", "disabled").button('refresh');
                            $('#CostAccBut').attr("disabled", "disabled").button('refresh');
                            $('#JrnlAppBut').attr("disabled", "disabled").button('refresh');
                        }
                    }
                    else {
                        if ($('#BemsSrAcct').val() != "" && $('#SessionBems').val() == $('#BemsSrAcct').val()) {
                            $('#JrnlAppBut').attr("disabled", "disabled").button('refresh');
                            $('#JrnlAppr').removeAttr("disabled");
                            $('#recallButton').show();
                            $('#supbut').attr("disabled", "disabled").button('refresh');
                            $('#SupAppr').attr("disabled", "disabled").button('refresh');
                            $('#Finbut').attr("disabled", "disabled").button('refresh');
                            $('#FinAppr').attr("disabled", "disabled").button('refresh');
                            $('#AccBut').attr("disabled", "disabled").button('refresh');
                            $('#AccAppr').attr("disabled", "disabled").button('refresh');
                            $('#LbrAccAppr').attr("disabled", "disabled").button('refresh');
                            $('#LbrAccBut').attr("disabled", "disabled").button('refresh');
                            $('#MtlAccAppr').attr("disabled", "disabled").button('refresh');
                            $('#MatAccBut').attr("disabled", "disabled").button('refresh');
                            $('#CostAccAppr').attr("disabled", "disabled").button('refresh');
                            $('#CostAccBut').attr("disabled", "disabled").button('refresh');
                            $('#JrnlAppBut').attr("disabled", "disabled").button('refresh');
                        }
                    }
                }
            }
        }

        if ($('#BemsSrAcct').val() != "" && $('#ApprCdSrAcct').val() == "Y" && $('#SessionBems').val() == $('#BemsSrAcct').val()) {
            $('#recallButton').hide();
            $('#Journal').show();
            $('#JrnlAppr').attr("disabled", "disabled").button('refresh');
        }

        if ($('#StatusId').val() == "OR") {
            $('#resetBut').show();
            $('#recallButton').hide();
        }
        if ($('#StatusId').val() == "OA") {
            $('#recallButton').hide();
        }
        if ((activityid == "" || activityid == undefined) || (mctrno == 0 || mctrno == undefined)) {
            if (OrigBu == "" || OrigGroup == "") {
                $('#loadingIcon').hide();
                mctrObj.showDialog($("#dialog-box"), "The Bu Grp selection is required in order to create a cost transfer.", "error");
                return false;
            }
            else if (fyear == "") {
                $('#loadingIcon').hide();
                mctrObj.showDialog($("#dialog-box"), "The Oh Base Year selection is required in order to create a cost transfer.", "error");
                return false;
            }
            else if (title == "") {
                $('#loadingIcon').hide();
                mctrObj.showDialog($("#dialog-box"), "Please provide a title ", "error");
                return false;
            }
            else {
                $('#loadingIcon').show();
                $('#form').submit();
                $('#loadingIcon').hide();
            }
        }
        else {
            $('#loadingIcon').show();
            var param = [];
            var param1 = [];
            var param2 = [];
            var linesfrom = 0;
            var qtyFrom = 0;
            var qtyTo = 0;
            var AmtFrom = 0;
            var AmtTo = 0;

            $.each($('#tblJQGridCover').getGridParam('data'), function (key, value) {
                var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(key +1));
                var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(key +1));
                var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(key +1));

                var mctrLineItem = $.extend(grid1, grid2, grid3);
                mctrLineItem.MCTR_NO = $('#MctrNo').val();
                
                mctrLineItem.MTL_JRNL = $('#' + grid1.LINE_NO + '_MTL_JRNL').val();
            
                if (grid1.ACTIVITY_ID_FROM == undefined || grid1.ACTIVITY_ID_FROM == "") {

                }
                else {

                    if ($('#' + String(key +1)).find('input').filter("[row-edit='true']") || $(value['_id_']).find('input').filter("[row-insert='false']")) {

                        preMctrLineItem("/MctrCreateForm/mctrLineItemPreUpdate", mctrLineItem);//mctrLineItemPreInsert
                        postUpdateFlag = true;
                    }
                    else {
                        preMctrLineItem("/MctrCreateForm/mctrLineItemPreInsert", mctrLineItem);//mctrLineItemPreUpdate
                        postUpdateFlag = false;
                      
                    }

                    mctrLineItem.TTD_FLAG = $('#' + grid1.LINE_NO + '_ttdValue').text();
                    mctrLineItem.PER_FLAG = $('#' + grid1.LINE_NO + '_yearValue').text();
                    mctrLineItem.ACTY_RED_FLG_FROM = $('#' + grid1.LINE_NO + '_ACTIVITY_ID_FROM').attr('red-flag');
                    mctrLineItem.ACTY_RED_FLG_TO = $('#' + grid1.LINE_NO + '_ACTIVITY_ID_TO').attr('red-flag');
                    mctrLineItem.DEPT_RED_FLG_FROM = $('#' + grid1.LINE_NO + '_HOME_DEPT_FROM').attr('red-flag');
                    mctrLineItem.DEPT_RED_FLG_TO = $('#' + grid1.LINE_NO + '_HOME_DEPT_TO').attr('red-flag');
                    mctrLineItem.WORK_DEPT_RED_FLG_FROM = $('#' + grid1.LINE_NO + '_WORK_DEPT_FROM').attr('red-flag');
                    mctrLineItem.WORK_DEPT_RED_FLG_TO = $('#' + grid1.LINE_NO + '_WORK_DEPT_TO').attr('red-flag');

                    param.push(mctrLineItem);
                   
                    qtyFrom += isNaN(parseFloat(grid3.QUANTITY_FROM)) ? 0 : parseFloat(grid3.QUANTITY_FROM);
                    qtyTo += isNaN(parseFloat(grid3.QUANTITY_TO)) ? 0 : parseFloat(grid3.QUANTITY_TO);
                    AmtFrom += isNaN(parseFloat(grid3.AMOUNT_FROM)) ? 0 : parseFloat(grid3.AMOUNT_FROM);
                    AmtTo += isNaN(parseFloat(grid3.AMOUNT_TO)) ? 0 : parseFloat(grid3.AMOUNT_TO);
                }


                // if (contract_num_from !=contract_num_to)
                //  {
                //      set_item_instance_property('contract_num_to',current_record,visual_attribute,'field_blue_on_gray');
                //  }
                //   else
                //   {
                //      set_item_instance_property('contract_num_to',current_record,visual_attribute,'field_black_on_gray');
                //   }

                //if (mctrLineItem.PROJ_TRANS_CODE_TO == 'FRG') {
                //    $('#' + grid1.LINE_NO + '_PROJ_TRANS_CODE_TO').removeClass().addClass("yellow");

                //}
                //else {
                //    //           $('#' + grid1.LINE_NO + '_PROJ_TRANS_CODE_TO').removeClass().addClass("black");//field_black_on_gray
                //}
                //if (mctrLineItem.LABOR_RATE_CD7_TO == "NR" && (mctrLineItem.LABOR_RATE_CD7_FROM != "NR" || mctrLineItem.LABOR_RATE_CD7_FROM == "")) {
                //    $('#' + grid1.LINE_NO + '_LABOR_RATE_CD7_TO').removeClass().addClass("yellow");
                //    $('#' + grid1.LINE_NO + '_AMOUNT_TO').removeClass().addClass("yellow");
                //}
                //else {
                //    //         $('#' + grid1.LINE_NO + '_LABOR_RATE_CD7_TO').removeClass().addClass("black");//field_black_on_gray
                //    //         $('#' + grid1.LINE_NO + '_AMOUNT_TO').removeClass().addClass("black");//field_black_on_white

                //}
                //if (mctrLineItem.BUM_CD7_TO != mctrLineItem.BUM_CD7_TO_ORIG) {
                //    $('#' + grid1.LINE_NO + '_BUM_CD7_TO').removeClass().addClass("blue");//field_blue_on_white
                //    $('#' + grid1.LINE_NO + '_BUM_CD7_TO_ORIG').removeClass().addClass("blue");//field_blue_on_gray

                //}
                //else {
                //    //        $('#' + grid1.LINE_NO + '_BUM_CD7_TO').removeClass().addClass("black");//field_black_on_white
                //    //         $('#' + grid1.LINE_NO + '_BUM_CD7_TO_ORIG').removeClass().addClass("black");//field_black_on_gray

                //}
                //var acty_red_flg_from = $('#' + grid1.LINE_NO + '_ACTIVITY_ID_FROM').attr('red-flag');
                //if (acty_red_flg_from == 'Y') {
                //    $('#' + grid1.LINE_NO + '_ACTIVITY_ID_FROM').removeClass().addClass("orange");

                //    $('#' + grid1.LINE_NO + '_PROJECT_ID_FROM').removeClass().addClass("orange");

                //}
                //else {
                //    if ($('#' + grid1.LINE_NO + '_ACTIVITY_ID_FROM').val() !== "") {
                //    $('#' + grid1.LINE_NO + '_ACTIVITY_ID_FROM').removeClass().addClass("white");//field_white
                //    }
                //    $('#' + grid1.LINE_NO + '_ACTIVITY_ID_FROM').attr("red-flag", "N");
                //    //       $('#' + grid1.LINE_NO + '_PROJECT_ID_FROM').removeClass().addClass("black");//field_black_on_gray

                //}
                //var acty_red_flg_to = $('#' + grid1.LINE_NO + '_ACTIVITY_ID_TO').attr('red-flag');
                //if (acty_red_flg_to == 'Y') {
                //    $('#' + grid1.LINE_NO + '_ACTIVITY_ID_TO').removeClass().addClass("orange");
                //    $('#' + grid1.LINE_NO + '_PROJECT_ID_TO').removeClass().addClass("orange");
                //}
                //else {
                //    if ($('#' + grid1.LINE_NO + '_ACTIVITY_ID_TO').val()!==""){
                //    $('#' + grid1.LINE_NO + '_ACTIVITY_ID_TO').removeClass().addClass("white");//field_white
                //        }
                //    $('#' + grid1.LINE_NO + '_ACTIVITY_ID_TO').attr("red-flag", "N");
                //    //     $('#' + grid1.LINE_NO + '_PROJECT_ID_TO').removeClass().addClass("black");//field_black_on_gray

                //}
                //var dept_red_flg_from = $('#' + grid1.LINE_NO + '_HOME_DEPT_FROM').attr('red-flag');
                //if (dept_red_flg_from == 'Y') {
                //    $('#' + grid1.LINE_NO + '_HOME_DEPT_FROM').removeClass().addClass("orange");
                //}
                //else {
                //    if ($('#' + grid1.LINE_NO + '_HOME_DEPT_FROM').val() !== "") {
                //    $('#' + grid1.LINE_NO + '_HOME_DEPT_FROM').removeClass().addClass("white");
                //    }
                //    $('#' + grid1.LINE_NO + '_HOME_DEPT_FROM').attr("red-flag", "N");
                //}
                //var dept_red_flg_to = $('#' + grid1.LINE_NO + '_HOME_DEPT_TO').attr('red-flag');
                //if (dept_red_flg_to == 'Y') {
                //    $('#' + grid1.LINE_NO + '_HOME_DEPT_TO').removeClass().addClass("orange");
                //}
                //else {
                //    if ($('#' + grid1.LINE_NO + '_HOME_DEPT_TO').val() !== "") {
                //    $('#' + grid1.LINE_NO + '_HOME_DEPT_TO').removeClass().addClass("white");
                //    }
                //    $('#' + grid1.LINE_NO + '_HOME_DEPT_TO').attr("red-flag", "N");
                //}
                //var work_dept_red_flg_from = $('#' + grid1.LINE_NO + '_WORK_DEPT_FROM').attr('red-flag');
                //if (work_dept_red_flg_from == 'Y') {
                //    $('#' + grid1.LINE_NO + '_WORK_DEPT_FROM').removeClass().addClass("orange");
                //}
                //else {
                //    if ($('#' + grid1.LINE_NO + '_WORK_DEPT_FROM').val() !== "") {
                //    $('#' + grid1.LINE_NO + '_WORK_DEPT_FROM').removeClass().addClass("white");
                //    }
                //    $('#' + grid1.LINE_NO + '_WORK_DEPT_FROM').attr("red-flag", "N");
                //}
                //var work_dept_red_flg_to = $('#' + grid1.LINE_NO + '_WORK_DEPT_FROM').attr('red-flag');
                //if (work_dept_red_flg_to == 'Y') {
                //    $('#' + grid1.LINE_NO + '_WORK_DEPT_TO').removeClass().addClass("orange");
                //}
                //else {
                //    if ($('#' + grid1.LINE_NO + '_WORK_DEPT_TO').val() !== "") {
                //    $('#' + grid1.LINE_NO + '_WORK_DEPT_TO').removeClass().addClass("white");
                //    }
                //    $('#' + grid1.LINE_NO + '_WORK_DEPT_TO').attr("red-flag", "N");
                //}

            })
            var formdata = $("#form").serializeArray();
            var mctrCreateForm = {
            };
            $(formdata).each(function (index, obj) {
                mctrCreateForm[obj.name] = obj.value;
            });
            var mctrcreateform = {
            };
            $(formdata).each(function (index, obj) {
                mctrcreateform[obj.name] = obj.value;
            });

            $.ajax({
                type: "POST",
                url: getBaseUrl("/MctrCreateForm/mctrHeaderPreInsert"),
                data: mctrCreateForm,
                success: function (result) {
                    
                    $.ajax({
                        type: "POST",
                        url: getBaseUrl("/MctrCreateForm/mctrHeaderPreUpdate"),
                        data: mctrcreateform,
                        success: function (data) {
                            if (data.StatusId != "SA" || data.StatusId != "" || data.StatusId != null) {
                                $('#StatusId').val(data.StatusId);
                                $('#StatusDescription').val(data.StatusDescription);
                                if (data.StatusId == "OR" || data.StatusId == "OA") {
                                    $('#resetBut').show();
                                    $('#recallButton').hide();
                                }
                            }
                            mctrCreateForm = JSON.stringify(data);
                            $.each($('#tblJQGridCover').getGridParam('data'), function (key, value) {
                                var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(key +1));
                                var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(key +1));
                                var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(key +1));

                                var mctrLineItem = $.extend(grid1, grid2, grid3);
                                mctrLineItem.MCTR_NO = $('#MctrNo').val();
                                mctrLineItem.FYEAR = $('#fyear').val();
                                //mctrLineItem.PERIOD_TO = $('#PeriodTo').val();
                                //mctrLineItem.PERIOD_FROM = $('#PeriodFrom').val();
                               
                                if (grid1.ACTIVITY_ID_FROM == undefined || grid1.ACTIVITY_ID_FROM == "") {
                                  
                                }
                                else {
                                    mctrLineItem.TTD_FLAG = $('#' + grid1.LINE_NO + '_ttdValue').text();
                                    mctrLineItem.PER_FLAG = $('#' + grid1.LINE_NO + '_yearValue').text();
                                    mctrLineItem.ACTY_RED_FLG_FROM = $('#' + grid1.LINE_NO + '_ACTIVITY_ID_FROM').attr('red-flag');
                                    mctrLineItem.ACTY_RED_FLG_TO = $('#' + grid1.LINE_NO + '_ACTIVITY_ID_TO').attr('red-flag');
                                    mctrLineItem.DEPT_RED_FLG_FROM = $('#' + grid1.LINE_NO + '_HOME_DEPT_FROM').attr('red-flag');
                                    mctrLineItem.DEPT_RED_FLG_TO = $('#' + grid1.LINE_NO + '_HOME_DEPT_TO').attr('red-flag');
                                    mctrLineItem.WORK_DEPT_RED_FLG_FROM = $('#' + grid1.LINE_NO + '_WORK_DEPT_FROM').attr('red-flag');
                                    mctrLineItem.WORK_DEPT_RED_FLG_TO = $('#' + grid1.LINE_NO + '_WORK_DEPT_TO').attr('red-flag');
                                    mctrLineItem.PERIOD_TO = $('#PeriodTo').val();
                                    mctrLineItem.PERIOD_FROM = $('#PeriodFrom').val();
                                    mctrLineItem.MTL_JRNL = $('#' + grid1.LINE_NO + '_MTL_JRNL').val();
                                    param2.push(mctrLineItem);

                                }
                            })


                            if (!($('#tblJQGridFirst').find("*").hasClass("red") || $('#tblJQGridCover').find("*").hasClass("red") || $('#tblJQGridInner').find('input').hasClass("red"))) {
                               
                                $.ajax({
                                    type: "POST",
                                    url: getBaseUrl("/MctrCreateForm/mInsert"),
                                    data: {
                                        mctrLineItem: param2
                                    },
                                    success: function (result) {
                                        $.each($('#tblJQGridCover').getGridParam('data'), function (key, value) {
                                            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(value['_id_']));
                                            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(value['_id_']));
                                            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(value['_id_']));

                                            var mctrLineItem = $.extend(grid1, grid2, grid3);
                                            mctrLineItem.MCTR_NO = $('#MctrNo').val();
                                            mctrLineItem.FYEAR = $('#fyear').val();
                                            if (grid1.ACTIVITY_ID_FROM == undefined || grid1.ACTIVITY_ID_FROM == "") {
                                                //postMctrLineItem("/MctrCreateForm/mctrLineItemPostUpdate", mctrLineItem);
                                            }
                                            else {
                                                if (postUpdateFlag == true) {
                                                    preMctrLineItem("/MctrCreateForm/mctrLineItemPreUpdate", mctrLineItem);
                                                    postMctrLineItem("/MctrCreateForm/mctrLineItemPostUpdate", mctrLineItem);
                                                }
                                                else {
                                                    postMctrLineItem("/MctrCreateForm/mctrLineItemPostInsert", mctrLineItem);

                                                }
                                                mctrLineItem.TTD_FLAG = $('#' + grid1.LINE_NO + '_ttdValue').text();
                                                mctrLineItem.PER_FLAG = $('#' + grid1.LINE_NO + '_yearValue').text();
                                                mctrLineItem.ACTY_RED_FLG_FROM = $('#' + grid1.LINE_NO + '_ACTIVITY_ID_FROM').attr('red-flag');
                                                mctrLineItem.ACTY_RED_FLG_TO = $('#' + grid1.LINE_NO + '_ACTIVITY_ID_TO').attr('red-flag');
                                                mctrLineItem.DEPT_RED_FLG_FROM = $('#' + grid1.LINE_NO + '_HOME_DEPT_FROM').attr('red-flag');
                                                mctrLineItem.DEPT_RED_FLG_TO = $('#' + grid1.LINE_NO + '_HOME_DEPT_TO').attr('red-flag');
                                                mctrLineItem.WORK_DEPT_RED_FLG_FROM = $('#' + grid1.LINE_NO + '_WORK_DEPT_FROM').attr('red-flag');
                                                mctrLineItem.WORK_DEPT_RED_FLG_TO = $('#' + grid1.LINE_NO + '_WORK_DEPT_TO').attr('red-flag');
                                                mctrLineItem.PERIOD_TO = $('#PeriodTo').val();
                                                mctrLineItem.PERIOD_FROM = $('#PeriodFrom').val();
                                                mctrLineItem.MTL_JRNL = $('#' + grid1.LINE_NO + '_MTL_JRNL').val();
                                                param1.push(mctrLineItem);

                                            }
                                        })
                                        $.ajax({
                                            type: "POST",
                                            url: getBaseUrl("/MctrCreateForm/mInsert"),
                                            data: {
                                                mctrLineItem: param1
                                            },
                                            success: function (result) {
                                                $('#form').submit();
                                                $('#loadingIcon').hide();
                                               
                                            },
                                            error: function (jqXHR, textStatus, errorThrown) {
                                             $('#loadingIcon').hide();
                                                mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                                            }
                                        });




                                    },
                                    error: function (jqXHR, textStatus, errorThrown) {
                                        $('#loadingIcon').hide();
                                        mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                                    }
                                });
                            }
                            // mctrCreateForm = {};
                            //// param = [];
                            // $(formdata).each(function (index, obj) {
                            //     mctrCreateForm[obj.name] = obj.value;
                            // });

                            // $.ajax({
                            //     type: "POST",
                            //     url: getBaseUrl("/MctrCreateForm/mctrHeaderPreInsert"),
                            //     data: mctrCreateForm,
                            //     success: function (data) {

                            //     },
                            //         error: function (jqXHR, textStatus, errorThrown) {
                            //             mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                            //         }
                            //     });


                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            $('#loadingIcon').hide();
                            mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                        }
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                }
            });




            e.preventDefault();
            //  mctrLineItemPostQuery(linesfrom);
            //preMctrLineItem("/MctrCreateForm/mctrLineItemPreUpdate");
            // postMctrLineItem("/MctrCreateForm/mctrLineItemPostUpdate");
        }


    });

    $('#Unjournal').click(function (e) {
        var status_id = $('#StatusId').val();
        if (status_id == "IP") {
            var mctrCreateForm = $('#form').serialize();
            if ($('#AccountantRole').val() == 'Y') {

                bootbox.confirm("You have pressed a button that will delete Journal entries for this MCTR. Status will change to 'JA - Journal Actions'", function (result) {
                    if (result) {

                        $.ajax({
                            type: "POST",
                            url: getBaseUrl("/MctrCreateForm/mctrHeaderbutUnjrnlWhenButtonPressed"),
                            data: mctrCreateForm,
                            success: function (data) {
                                if (data != '') {
                                    if (data[0].V_Countstring['error'] == "") {
                                    $('#StatusId').val(data[0].StatusId);
                                    $('#StatusDescription').val(data[0].StatusDescription);
                                    $('#Journal').show();
                                    $('#recallButton').show();
                                    $('#Unjournal').hide();
                                    $('#JournlInPro').hide();
                                    }
                                    else {
                                        mctrObj.showDialog($("#dialog-box"), 'UNABLE TO PERFORM THIS FUNCTION. JOURNALS MAY HAVE BEEN PROCESSED.', "error");

                                    }

                                }
                            },
                            error: function (data) {
                                var exception = JSON.parse(data.responseText);
                                var ms = exception.ExceptionMessage;
                                mctrObj.showDialog($("#dialog-box"), ms, "error");
                            }
                        });
                    }
                });
            }


        }
        else {
            mctrObj.showDialog($("#dialog-box"), 'Status id must be value ip to proceed.', "error");
        }
    });

    $('#Journal').click(function (e) {
        var status_id = $('#StatusId').val();
        if ($('#ApplJrnlId').val() != "" && $('#JvItemCd').val() != "") {
            if (status_id == "JA") {
                var mctrcreateForm = $('#form').serialize();
                $.ajax({
                    type: "POST",
                    url: getBaseUrl("/MctrCreateForm/mctrHeaderbutJrnlWhenButtonPressed"),
                    data: mctrcreateForm,
                    success: function (data) {
                        $('#Journal').hide();
                        $('#Unjournal').show();
                        $('#JournlInPro').show();
                        $('#recallButton').hide();
                        $('#StatusId').val(data[0].StatusId);
                        $('#StatusId').attr('value', data[0].StatusId);
                        $('#StatusDescription').val(data[0].StatusDescription);
                        $('#StatusDescription').attr('value', data[0].StatusDescription);
                        mctrObj.showDialog($("#dialog-box"), "Journal Successfull", "success");
                    },
                    error: function (data) {
                        var exmsg = data.responseText;
                        mctrObj.showDialog($("#dialog-box"), exmsg, "error");
                    }
                });
            }
            else {
                mctrObj.showDialog($("#dialog-box"), 'Status id must be value JP to proceed.', "error");
            }
        }
        else {
            mctrObj.showDialog($("#dialog-box"), 'Please enter Appl Jrnl ID and JV Item Code', "error");
        }
    });

    $('#submitBtn').click(function (e) {
        $('#loadingIcon').show();
        var reason_code = $('#ReasonCode').val();
        var v_li_edit_error = "N";
        var v_lineitems_ok = true;
        var v_man_rated_flag;
        e.preventDefault();
        var id = $('#tblJQGridCover').getGridParam('data')[0]._id_;
        //Check if any are red throw exception

        if ($('#ApprCdAcct').val() == 'Y' && $('#ApprCdLbrAcct').val() == 'Y' && $('#ApprCdCostAcct').val() == 'Y' && $('#ApprCdSrAcct').val() == 'Y') {
            mctrObj.showDialog($("#dialog-box"), "Form Submit Successful", "success");
        }

        else {

            if ($('#BemsOrig').val() == $('#SessionBems').val()) {
                if ($('#StatusId').val() == "OA" || $('#StatusId').val() == "OR" || $('#StatusId').val() == "SA" || $('#StatusId').val() == "FA") {
                    if ($('#prevMeasures').val() == undefined || $('#prevMeasures').val() == "") {
                        v_lineitems_ok = false;
                        $('#loadingIcon').hide();
                        mctrObj.showDialog($("#dialog-box"), "Please complete justification and preventative measure before you submit.", "error"); 
                    }
                    else {
                        if ($('#BemsSuper').val() != "" && $('#BemsFinCtl').val() != "") {
                            if ($('#Linesfrom').val() > 0) {
                                $('#supbut').attr("disabled", "disabled");
                                $('#SupAppr').attr("disabled", "disabled");
                                $('#Finbut').attr("disabled", "disabled");
                                $('#FinAppr').attr("disabled", "disabled");
                                $('#AccBut').attr("disabled", "disabled");
                                $('#AccAppr').attr("disabled", "disabled");
                                $('#LbrAccAppr').attr("disabled", "disabled");
                                $('#LbrAccBut').attr("disabled", "disabled");
                                $('#MtlAccAppr').attr("disabled", "disabled");
                                $('#MatAccBut').attr("disabled", "disabled");
                                $('#CostAccAppr').attr("disabled", "disabled");
                                $('#CostAccBut').attr("disabled", "disabled");
                                $('#JrnlAppBut').attr("disabled", "disabled");
                                $('#JrnlAppr').attr("disabled", "disabled");
                                if ($('#StatusId') == "OR") {
                                    if (py_cy_status == "PY" && $('#fyear').val() > 2007)
                                        //check line items for unassigned affiliate.
                                    {
                                        if ($('input[id*=AFFILIATE_TO]').val() == "") {
                                            $('input[id*=AFFILIATE_FROM]').removeClass().addClass('red');
                                        }
                                        if (($('#tblJQGridFirst').find("*").hasClass("red") || $('#tblJQGridCover').find("*").hasClass("red") || $('#tblJQGridInner').find('input').hasClass("red"))) {
                                            v_li_edit_error = "Y";
                                        }
                                    }
                                }

                                if (v_li_edit_error == "N") {
                                    if (py_cy_status == 'CY') {
                                        //check for amounts with value zero for current year only.
                                        var v_line_count = 0;
                                        var v_line_no = 0;
                                        $.each($('#tblJQGridCover').getGridParam('data'), function (key, value) {
                                            if ($('input[id*=AMOUNT_FROM]').val() + $('input[id*=ADJUSTMENT_FROM]').val() == 0 || $('input[id*=AMOUNT_TO]').val() + $('input[id*=ADJUSTMENT_TO]').val() == 0) {
                                                v_line_count++;
                                                
                                            }
                                        })
                                        
                                        if (v_line_count > 0) {
                                            if ($('input[id*=AMOUNT_FROM]').val() + $('input[id*=ADJUSTMENT_FROM]').val() == 0 || $('input[id*=AMOUNT_TO]').val() + $('input[id*=ADJUSTMENT_TO]').val() == 0) {
                                                v_line_no = $('input[id*=NO]').val();
                                                return v_line_no;
                                            }
                                            if ($('#StatusId').val() == "OA") {
                                                $('#loadingIcon').hide();
                                                var Message = "'Counted (' || " + v_line_count + " || ') line items with amount set to zero starting with line no [' || " + v_line_no + " || ']'";
                                                mctrObj.showDialog($("#dialog-box"), Message, "error");
                                            }
                                            else {
                                                $('#loadingIcon').hide();
                                                message = 'Please use reset button since line items have amount set to zero.';
                                                mctrObj.showDialog($("#dialog-box"), Message, "error");
                                            }
                                            v_lineitems_ok = false;
                                        }
                                    }
                                        else {
                                            var mctrCreateForm = $('#form').serialize();
                                            $.ajax({
                                                type: "POST",
                                                url: getBaseUrl("/MctrCreateForm/manRatedFlag"),
                                                data: mctrCreateForm,
                                                async: false,
                                                //dataType: "json",
                                                //contentType: "application/json; charset=utf-8",
                                                success: function (data) {
                                                    v_man_rated_flag = data.MTL_JRNL;
                                                    V_count = data.V_Count['estmtgPricgCd'];
                                                    if (v_man_rated_flag == "N") {
                                                        if (V_count == 0) {
                                                            $('#loadingIcon').hide();
                                                            mctrObj.showDialog($("#dialog-box"), "Cannot submit a prior year mctr when the rates for the selected year are not loaded.", "error");
                                                            v_lineitems_ok = false;
                                                        }
                                                    }
                                                },
                                                error: function (jqXHR, textStatus, errorThrown) {
                                                    $('#loadingIcon').hide();
                                                    mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                                                }
                                            });
                                        }
                                    }
                                else {
                                    $('#loadingIcon').hide();
                                    mctrObj.showDialog($("#dialog-box"), "Cannot submit mctr since line item field errors were found that should be corrected.", "error");
                                    v_lineitems_ok = false;
                                }
                                }
                                else {
                                    if ($('#StatusId').val() == "OA") {
                                        v_lineitems_ok == false;
                                        $('#loadingIcon').hide();
                                        mctrObj.showDialog($("#dialog-box"), "Line items are required in order to submit this entry.", "error");
                                    }
                                    else {
                                        v_lineitems_ok = false;
                                        $('#loadingIcon').hide();
                                        mctrObj.showDialog($("#dialog-box"), "Please use reset button since line items are required in order to submit this entry.", "error");
                                    }
                                v_lineitems_ok = false;
                            }
                        }
                        else {
                            v_lineitems_ok = false;
                            $('#loadingIcon').hide();
                            mctrObj.showDialog($("#dialog-box"), "Please identify supervisor/financial control approvers before you submit.", "error");
                        }
                              
                    }
                }
                else {
                    $('#loadingIcon').hide();
                    mctrObj.showDialog($("#dialog-box"), "Mctr status must be values oa or or before you as originator can submit.", "error");
                    v_lineitems_ok = false;
                }
            }
            else {
                $('#loadingIcon').hide();
                mctrObj.showDialog($("#dialog-box"), "you must be the mctr originator for this entry in order to submit.", "error");
                v_lineitems_ok = false;
            }






        }
        //all business segment requires that reason is provided for cost transfer root cause analysis.
        if (v_lineitems_ok == true) {
            if ($('#MctrNo').val() > 0 && ($('#StatusId').val() == "OA" || $('#StatusId').val() == "OR") && $('#BemsOrig').val() == $('#SessionBems').val()) {
                $.each($('#tblJQGridCover').getGridParam('data'), function (key, value) {
                    var rowID = $('#tblJQGridCover').getGridParam('data')[0]._id_;
                    if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "OTS" || $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "STR") {
                        if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() != "" && $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() != "NR") {
                            if ($('#py_cy_status').val() == "PY" && $('#fyear').val() > 2007) {
                                $.ajax({
                                    type: "POST",
                                    url: "/MctrCreateForm/submitBtnmctrLineItemquantityFromPostTextItem",
                                    data: mctrCreateForm,
                                    success: function (data) {
                                        pyquantityratefrom = data.V_CountDouble['pyquantityratefrom'];
                                        pyquantityrateto = data.V_CountDouble['pyquantityrateto'];
                                        cyquantityratefrom = data.V_CountDouble['cyquantityratefrom'];
                                    },
                                    error: function (data) {
                                        var exmsg = data.responseText;
                                        var ms = exmsg.ExceptionMessage;
                                            $('#loadingIcon').hide();
                                            mctrObj.showDialog($("#dialog-box"), ms, "error");
                                            v_lineitems_ok = false;
                                    }
                                });

                                if (pyquantityratefrom != 0) {
                                    var v_amount = ($('#' + rowID + '_QUANTITY_FROM').val() * v_rate).toFixed(2);
                                }
                                if ($('#' + rowID + '_QUANTITY_FROM').val() != v_amount) {
                                    if ($('#status_id').val() == "OA") {
                                        $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass("red");
                                    }
                                }
                            }
                            else if (py_cy_status = "CY") {
                                v_amount = 0;
                                if (cyquantityratefrom != 0) {
                                    v_amount = ($('#' + rowID + '_QUANTITY_FROM').val() * v_rate).toFixed(2);
                                }
                                if ($('#' + rowID + '_QUANTITY_FROM').val() != v_amount) {
                                    if ($('#status_id').val() == "OA") {
                                        $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass("red");
                                    }
                                }
                            }
                        }
                    }
                });
                if (v_lineitems_ok == true) {
                    if (reason_code == "" || reason_code == undefined) {
                            $('#loadingIcon').hide();
                        mctrObj.showDialog($("#dialog-box"), "Reason code is required in order to submit.", "error");
                    }

                    else {
                        bootbox.confirm("You have pressed a button that will RESET all 'No' approval codes sending MCTR to the next status requiring approval. Line item row validation will not be performed", function (result) {
                            if (result) {
                                $('#processType').val("s");
                                var mctrcreateform = $('#form').serialize();
                                $.ajax({
                                    type: "POST",
                                    url: getBaseUrl("/MctrCreateForm/mctrHeaderPreUpdate"),
                                    data: mctrcreateform,
                                    success: function (data) {
                                        $('#StatusId').val(data.StatusId);
                                        $('#StatusDescription').val(data.StatusDescription);
                                        mctrCreateForm = JSON.stringify(data);
                                        $.ajax({
                                            type: "POST",
                                            url: getBaseUrl("/MctrCreateForm/mctrHeaderPreInsert"),
                                            data: mctrCreateForm,
                                            dataType: "json",
                                            contentType: "application/json; charset=utf-8",
                                            success: function (data) {
                                                    $('#loadingIcon').hide();
                                                mctrObj.showDialog($("#dialog-box"), "Submit Successfull", "success");
                                            },
                                            error: function (jqXHR, textStatus, errorThrown) {
                                                    $('#loadingIcon').hide();
                                                mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                                            }
                                        });

                                        if ($('#BemsSuper').val() != "" && data.StatusId == "SA") {
                                            $('#SupAppr').removeAttr("disabled");
                                            $('#submitBtn').hide();
                                        }
                                        //if (data.StatusId == "SA") {
                                        //    $('#SupAppr').removeAttr("disabled");
                                        //    $('#submitBtn').hide();
                                        //}
                                        else if (data.StatusId == "FA") {
                                            $('#FinAppr').removeAttr("disabled");
                                            $('#submitBtn').hide();
                                        }
                                        else if (data.StatusId == "AA") {
                                            $('#AccAppr').removeAttr("disabled");
                                            $('#submitBtn').hide();
                                        }
                                        else if (data.StatusId == "LM") {
                                            $('#LbrAccAppr').removeAttr("disabled");
                                            $('#submitBtn').hide();
                                        }
                                        else if (data.StatusId == "LB") {
                                            $('#LbrAccAppr').removeAttr("disabled");
                                            $('#submitBtn').hide();
                                        }
                                        else if (data.StatusId == "MA") {
                                            $('#MtlAccAppr').removeAttr("disabled");
                                            $('#submitBtn').hide();
                                        }
                                        else if (data.StatusId == "CA") {
                                            $('#CostAccAppr').removeAttr("disabled");
                                            $('#submitBtn').hide();
                                        }
                                        else {
                                            $('#JrnlAppr').removeAttr("disabled");
                                            $('#submitBtn').hide();
                                        }
                                        mctrObj.showDialog($("#dialog-box"), "Submit Successfull", "success");
                                    },
                                    error: function (jqXHR, textStatus, errorThrown) {
                                        $('#loadingIcon').hide();
                                        mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                                    }
                                });
                                if ($('#ApprCdSuper').val() == "N") {
                                    $('#ApprCdSuper').val("");
                                    $('#DateApprSuper').val("");
                                }
                                if ($('#ApprCdFinCtl').val() == "N") {
                                    $('#ApprCdFinCtl').val("");
                                    $('# DateApprFinCtl').val("");
                                }
                                if ($('#ApprCdAcct').val() == "N") {
                                    $('#ApprCdAcct').val("");
                                    $('#DateApprAcct').val("");
                                }
                                if ($('#ApprCdLbrAcct').val() == "N") {
                                    $('#ApprCdLbrAcct').val("");
                                    $('#DateApprLbrAcct').val("");
                                }
                                if ($('#apprcdmatlacct').val() == "N") {
                                    $('#ApprCdMatlAcc').val("");
                                    $('#dateapprmatlacct').val("");
                                }
                                if ($('#ApprCdCostAcct').val() == "N") {
                                    $('#ApprCdCostAcct').val("");
                                    $('#DateApprCostAcct').val("");
                                }
                                if ($('#ApprCdSrAcct').val() == "N") {
                                    $('#ApprCdSrAcct').val("");
                                    $('#DateApprSrAcct').val("");
                                }

                            }
                            else
                            {
                                $('#loadingIcon').hide();
                            }
                        });
                    }
                }
            }
        }
    });

    function mctrHeaderjvItemCdPostTextItem() {

        var jv_item_cd = $('#JvItemCd').val();
        var mctrCreateForm = $('#form').serialize();
        var Origjv_item_cd = $('#JvItemCd').attr('value');
        origValue = $('#JvItemCd').attr('value') == "" ? $('#JvItemCd').val() : $('#JvItemCd').attr('value');
        if ((jv_item_cd != Origjv_item_cd) || (Origjv_item_cd != null && jv_item_cd == null) || (Origjv_item_cd == null && jv_item_cd != null)) {
            $.ajax({
                type: "POST",
                url: getBaseUrl("/MctrCreateForm/mctrHeaderjvItemCdPostTextItem"),
                data: mctrCreateForm,
                success: function (result) {
                    mctrObj.showDialog($("#dialog-box"), "Please save outstanding changes.", "error");
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
    //function mctrLineItemactivityIdFromPostTextItem() {
    //    var mctrCreateForm = $('#form').serialize();
    //    var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData('1'));
    //    var activity_id_from = grid2.activity_id_from;
    //    var Origactivity_id_from = $('#Activity_Id').attr('value');
    //    var status_id = mctrCreateForm.statusID;
    //    var bems_orig = mctrCreateForm.BemsOrig;
    //    var orig_bu = mctrCreateForm.orig_bu;
    //    var proj_trans_code_from = grid2.proj_trans_code_from;
    //    var fiscal_year = mctrCreateForm.fyear;
    //    var BemsOrig = $('#BemsOrig').val();
    //    var Session_bems = bems_orig;//Nedd to get session values

    //    if ((activity_id_from != Origactivity_id_from) ||
    //       (activity_id_from == null && Origactivity_id_from != null) ||
    //       (activity_id_from != null && Origactivity_id_from == null))// ||
    //        //($('#activity_id_from'), current_record, visual_attribute) = 'field_red')) 
    //    {
    //        if ((status_id == 'oa' && bems_orig == Session_bems) &&  //GEt session value
    //           (proj_trans_code_from != 'frg' || proj_trans_code_from == null)) {
    //            if ((mctr_header.orig_bu == null || mctr_header.fiscal_year == null) ||
    //               (Origperiod_from == null || Origperiod_to == null)) {
    //                mctrObj.showDialog($("#dialog-box"), "Please save mctr selecting grp bu && year values before continuing to line items.", "error");
    //            }
    //            else if (activity_id_from == null && Origactivity_id_from != null) {
    //                // activity_id_from = Origactivity_id_from;
    //                mctrObj.showDialog($("#dialog-box"), "Activity id (from) is a required field.", "error");
    //            }
    //            else {
    //                home_bugl_from = orig_bu;
    //                if (home_bugl_to == null) {
    //                    home_bugl_to = mctr_header.orig_bu;
    //                }
    //                period_from = Origperiod_from;
    //                period_to = Origperiod_to;
    //                oh_base_yr_from = mctr_header.fiscal_year;
    //                oh_base_yr_to = mctr_header.fiscal_year;
    //                if ((activity_id_from != Origactivity_id_from) ||
    //                   (activity_id_from == null && Origactivity_id_from != null) ||
    //                   (activity_id_from != null && Origactivity_id_from == null)) {
    //                    activity_status = null;
    //                    project_status = null;
    //                    work_bugl_from = null;
    //                    project_id_from = null;
    //                    contract_num_from = null;
    //                    bum_cd7_from = null;
    //                    cust_type_cd7_from = null;
    //                    account_from = null;
    //                    $('#account_from').attr("white");
    //                    if (activity_id_from != null && period_to != null && activity_id_from != 'required') {
    //                        $('#activity_id_from').attr("white");
    //                    }
    //                }

    //                $('#ttd_flag').addClass("white");
    //                $('#per_flag').addClass("white");
    //            }
    //        }
    //        else
    //            activity_id_from = Origactivity_id_from;
    //        mctrObj.showDialog($("#dialog-box"), "You either do not have the proper role or proper status setting to change this field.", "error");
    //    }
    //}
    //function mctrLineItemamountToPostTextItem(e, obj) {
    //    var rowID = parseInt(e.target.id.slice(0, 1));
    //    var status_id = $('#StatusId').val();
    //    var bems_orig = $('#BemsOrig').val();
    //    var bems_acct = $('#BemsAcct').val();
    //    var mctrCreateForm = $('#form').serialize();
    //    var amount_to = $('#' +rowID + '_AMOUNT_TO').val();
    //    var Origamountto = $('#').attr('value');
    //    var activity_id_to = $('#' +rowID + '_ACTIVITY_ID_TO').val();
    //    var activity_id_from = $('#' +rowID + '_ACTIVITY_ID_FROM').val();
    //    var project_id_from = $('#' +rowID + '_PROJECT_ID_FROM').val();
    //    var account_from = $('#' +rowID + '_ACCOUNT_FROM').val();
    //    var proj_trans_type_from = $('#' +rowID + '_PROJ_TRANS_TYPE_FROM').val();
    //    var project_id_to = $('#' +rowID + '_PROJECT_ID_TO').val();
    //    var account_to = $('#' +rowID + '_ACCOUNT_TO').val();
    //    var proj_trans_type_to = $('#' +rowID + '_PROJ_TRANS_TYPE_TO').val();
    //    var period_to = $('#PeriodTo').val();
    //    var fiscal_year = mctrCreateForm.fyear;
    //    var py_cy_status = $('#fyear').val().trim() == (new Date).getFullYear() ? 'CY': 'PY';
    //    var affiliate_to = $('#' +rowID + '_AFFILIATE_TO').val();
    //    if ((status_id == "OA" && bems_orig == $('#SessionBems').val()) || (status_id == "AA" && bems_acct == $('#SessionBems').val())) {
    //        if (activity_id_from == "" || period_to == "" || activity_id_from == "REQUIRED") {
    //            $('#' +rowID + '_AMOUNT_TO').attr('value');
    //            mctrObj.showDialog($("#dialog-box"), "Please enter the activity id (from) first.", "error");
    //        }
    //        else if (project_id_from == "" || project_id_from == "REQUIRED") {

    //            $('#' +rowID + '_AMOUNT_TO').attr('value');

    //            mctrObj.showDialog($("#dialog-box"), "Please enter the project id (from) first.", "error");
    //        }

    //        else if (account_from == "") {
    //            $('#' +rowID + '_AMOUNT_TO').attr('value');
    //            mctrObj.showDialog($("#dialog-box"), "Please enter the account (from) first.", "error");
    //        }
    //        else if (proj_trans_type_from == "" || proj_trans_type_from == "REQ") {
    //            $('#' +rowID + '_AMOUNT_TO').attr('value');
    //            mctrObj.showDialog($("#dialog-box"), "Project trans type (from) value must be entered first.", "error");
    //        }
    //        else if (activity_id_to == "" || activity_id_to == "REQUIRED") {
    //            $('#' +rowID + '_AMOUNT_TO').attr('value');
    //            mctrObj.showDialog($("#dialog-box"), "Please enter the activity id (to) first.", "error");
    //        }
    //        else if (project_id_to == "" || project_id_to == "REQUIRED") {
    //            $('#' +rowID + '_AMOUNT_TO').attr('value');
    //            mctrObj.showDialog($("#dialog-box"), "Please enter the project id (to) first.", "error");
    //        }
    //        else if (account_to == "" && proj_trans_type_to == "LBR") {
    //            $('#' +rowID + '_AMOUNT_TO').attr('value');
    //            mctrObj.showDialog($("#dialog-box"), "Please enter the Account(to) first.", "error");
    //        }
    //    }
    //        // define 
    //    else if (amount_to != Origamountto) //system.mode == "normal") &&

    //    {
    //        if (proj_trans_type_to == "LBR") {

    //            if ((py_cy_status == ("py"))) {
    //                if (fiscal_year > 2007 && affiliate_to != "") {
    //                    mctrCreateForm.setid = affiliate_to;
    //                }

    //                else {
    //                    mctrCreateForm.setid = $('#' +rowID + '_HOME_BUGL_TO').val();
    //                }

    //                $.ajax({
    //                    type: "POST",
    //                    url: getBaseUrl("/MctrCreateForm/mctrLineItemamountToPostTextItem"),
    //                    data: mctrCreateForm,
    //                    success: function (result) {

    //                    },
    //                    error: function (data) {

    //                        var exmsg = data.responseText;
    //                        var ms = exmsg.ExceptionMessage;
    //                        mctrObj.showDialog($("#dialog-box"), ms, "error");
    //                    }
    //                });
    //            }
    //        }

    //    }

    //    else {
    //        amount_to = $('#' +rowID + '_AMOUNT_TO').attr('value');
    //        mctrObj.showDialog($("#dialog-box"), "you either do not have the proper role or proper status setting to change this field", "error");
    //    }
    //}
    function mctrlineitemestmtgpricgcdtoposttextitem(e, obj) {
        var rowID = parseInt(e.target.id.slice(0, 1));
        var status_id = $('#StatusId').val();
        var bems_orig = $('#BemsOrig').val();
        var bems_acct = $('#BemsAcct').val();
        var period_to = $('#PeriodTo').val();
        var estmtg_pricg_cd_to = $('#' + rowID + '_ESTMTG_PRICG_CD_TO').val();
        var py_cy_status = $('#fyear').val().trim() == (new Date).getFullYear() ? 'CY' : 'PY';
        var fiscal_year = mctrCreateForm.fyear;
        if ($('#' + rowID + '_ESTMTG_PRICG_CD_TO').val() != $('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr('value') || ($('#' + rowID + '_ESTMTG_PRICG_CD_TO').val() == "" && $('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr('value') != "") || ($('#' + rowID + '_ESTMTG_PRICG_CD_TO').val() != null && $('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr('value') == "") || $('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr('class') == "red") {
            if (((status_id && bems_orig == $('#SessionBems').val()) || (status_id && bems_acct == $('#SessionBems').val()) || (status_id == "CA" && bems_cost_acct == $('#SessionBems').val())) && ($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() != "frg" || $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == "")) {
                if ($('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || period_to == "" || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == "required") {
                    estmtg_pricg_cd_to = $('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter the activity id (from) first.", "error");
                }
                else if ($('#' + rowID + '_PROJECT_ID_FROM').val() == "" && $('#' + rowID + '_PROJECT_ID_FROM').val() == "requried") {
                    estmtg_pricg_cd_to = $('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter the project id (from) first.", "error");
                }
                else if ($('#' + rowID + '_ACCOUNT_FROM').val() == "") {
                    estmtg_pricg_cd_to = $('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter the account (from) first.", "error");
                }
                else if (($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "" || $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "req")) {
                    estmtg_pricg_cd_to = $('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "project trans type (from) value must be entered first.", "error");
                }
                else if (($('#' + rowID + '_ACTIVITY_ID_TO').val() == null || $('#' + rowID + '_ACTIVITY_ID_TO').val() == "required")) {
                    estmtg_pricg_cd_to = $('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter the activity id (to) first.", "error");
                }
                else if (($('#' + rowID + '_PROJECT_ID_TO').val() == "" || $('#' + rowID + '_PROJECT_ID_TO').val() == "required")) {
                    estmtg_pricg_cd_to = $('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter the project id (to) first.", "error");
                }
                else if (($('#' + rowID + '_ACCOUNT_TO').val() == "" && $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == "lbr")) {
                    estmtg_pricg_cd_to = $('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr('value');
                    message("please enter the account (to) first.")
                }
                else if ((estmtg_pricg_cd_to != "")) {
                    if (($('#' + rowID + '_HOME_BUGL_TO').val() == "")) {
                        $('#' + rowID + '_HOME_BUGL_TO').val() = mctrObj.orig_bu;
                    }
                    if ((py_cy_status == "py" && fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_TO').val() != "")) {
                        mctrCreateForm.setid = $('#' + rowID + '_AFFILIATE_TO').val();
                    }

                    else {
                        mctrCreateForm.setid = $('#' + rowID + '_HOME_BUGL_TO').val();
                    }
                    $.ajax({
                        type: "POST",
                        url: getBaseUrl("/MctrCreateForm/mctrlineitemestmtgpricgcdtoposttextitemopenlov"),
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
                else {
                    $('#' + rowID + '_ESTMTG_PRICG_CD_TO').removeClass().addClass("white");
                }
            }
            else {
                estmtg_pricg_cd_to = $('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr('value');
                mctrObj.showDialog($("#dialog-box"), "you either do not have the proper role or proper status setting to change this field.", "error");
            }
        }

    }
    function mctrLineItemrscToPostTextItem(e, obj) {
        var rowID = parseInt(e.target.id.slice(0, 1));
        var rsc_to = $('#' + rowID + '_RSC_TO').val();
        var status_id = $('#StatusId').val();
        var bems_orig = $('#BemsOrig').val();
        var bems_acct = $('#BemsAcct').val();
        var period_to = $('#PeriodTo').val();
        var fiscal_year = mctrCreateForm.fyear;
        var py_cy_status = $('#fyear').val().trim() == (new Date).getFullYear() ? 'CY' : 'PY';
        if ((rsc_to != $('#' + rowID + '_RSC_TO').attr('value')) || (rsc_to != "" && $('#' + rowID + '_RSC_TO').attr('value') == "") || (rsc_to == "" && $('#' + rowID + '_RSC_TO').attr('value') != "") || $('#' + rowID + '_RSC_TO').attr('class') == "red") {
            if (((status_id && bems_orig == $('#SessionBems').val()) || (status_id && bems_acct == $('#SessionBems').val()) || (status_id == "CA" && bems_cost_acct == $('#SessionBems').val())) && ($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() != "FRG" || $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == "")) {
                if (($('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || period_to == null || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == ("required"))) {
                    rsc_to = $('#' + rowID + '_RSC_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter the activity id (from) first.", "error");
                }
                else if (($('#' + rowID + '_PROJECT_ID_FROM').val() == "" || $('#' + rowID + '_PROJECT_ID_FROM').val() == "required")) {
                    rsc_to = $('#' + rowID + '_RSC_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter the project id (from) first.", "error");
                }
                else if (($('#' + rowID + '_ACCOUNT_FROM').val() == "")) {
                    rsc_to = $('#' + rowID + '_RSC_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter the account (from) first.", "error");
                }
                else if (($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "" || $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "req")) {
                    rsc_to = $('#' + rowID + '_RSC_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter the project trans type (from) first.", "error");
                }
                else if (($('#' + rowID + '_ACTIVITY_ID_TO').val() == "" || ($('#' + rowID + '_ACTIVITY_ID_TO').val() == "required"))) {
                    rsc_to = $('#' + rowID + '_RSC_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter activity (To) first.", "error");
                }
                else if (($('#' + rowID + '_PROJECT_ID_TO').val() == "" || $('#' + rowID + '_PROJECT_ID_TO').val() == "required")) {
                    rsc_to = $('#' + rowID + '_RSC_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter project id (To) first.", "error");
                }
                else if ($('#' + rowID + '_ACCOUNT_TO'.val() == "" && ($('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == "LBR"))) {
                    rsc_to = $('#' + rowID + '_RSC_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter account (To) first.", "error");
                }
                else if ($('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == "LBR" && (rsc_to == "" || (rsc_to.indexOf("6__") != - 1 && !rsc_to == "091"))) {
                    if (($('#' + rowID + '_HOME_BUGL_TO').val() == "")) {
                        $('#' + rowID + '_HOME_BUGL_TO').val() = mctrObj.orig_bu;
                    }

                    if ((py_cy_status == "PY" && fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_TO').val() != "")) {
                        mctrcreateform.setid = $('#' + rowID + '_AFFILIATE_TO').val();
                    }
                    else {
                        mctrcreateform.setid = $('#' + rowID + '_HOME_BUGL_TO').val();
                    }
                    $.ajax({
                        type: "POST",
                        url: getBaseUrl("/MctrCreateForm/mctrLineItemrscToPostTextItemOpenLOV"),
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
                else {
                    $('#' + rowID + '_RSC_TO').removeClass().addClass("white");
                }
            }
        }
    }
    function mctrLineItemworkLocToPostTextItem(e, obj) {
        var rowID = parseInt(e.target.id.slice(0, 1));
        var status_id = $('#StatusId').val();
        var bems_orig = $('#BemsOrig').val();
        var bems_acct = $('#BemsAcct').val();
        var period_to = $('#PeriodTo').val();
        var period_from = $('#PeriodFrom').val();
        var fiscal_year = mctrCreateForm.fyear;
        var rsc_to = $('#' + rowID + '_RSC_TO').val();
        var work_loc_to = $('#' + rowID + '_WORK_LOC_TO').val();
        var py_cy_status = $('#fyear').val().trim() == (new Date).getFullYear() ? 'CY' : 'PY';
        if ((work_loc_to != $('#' + rowID + '_WORK_LOC_TO').attr('value')) || (work_loc_to != "" && $('#' + rowID + '_WORK_LOC_TO').attr('value') == "") || (work_loc_to == "" && $('#' + rowID + '_WORK_LOC_TO').attr('value') != "") || $('#' + rowID + '_WORK_LOC_TO').attr('class') == "red") {
            if (((status_id && bems_orig == $('#SessionBems').val()) || (status_id && bems_acct == $('#SessionBems').val()) || (status_id == "CA" && bems_cost_acct == $('#SessionBems').val())) && ($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() != "FRG" || $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == "")) {
                if ($('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || period_to == "" || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == "REQUIRED") {
                    work_loc_to = $('#' + rowID + '_WORK_LOC_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter activityId (From) first.", "error");
                }
                else if (($('#' + rowID + '_PROJECT_ID_FROM').val() == "" || $('#' + rowID + '_PROJECT_ID_FROM').val() == "REQUIRED")) {
                    work_loc_to = $('#' + rowID + '_WORK_LOC_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter projectId (From) first.", "error");
                }
                else if (($('#' + rowID + '_ACCOUNT_FROM').val() = "")) {
                    work_loc_to = $('#' + rowID + '_WORK_LOC_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter Account (From) first.", "error");
                }
                else if ((PROJ_TRANS_TYPE_FROM == "" || PROJ_TRANS_TYPE_FROM.equals("req"))) {
                    work_loc_to = $('#' + rowID + '_WORK_LOC_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter project trans type(From) first.", "error");
                }

                else if (($('#' + rowID + '_ACTIVITY_ID_TO').val() == "" || ($('#' + rowID + '_ACTIVITY_ID_TO').val() = "required"))) {
                    work_loc_to = $('#' + rowID + '_WORK_LOC_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter activity(To) first.", "error");
                }

                else if ($('#' + rowID + '_PROJECT_ID_TO').val() == "" || $('#' + rowID + '_PROJECT_ID_TO').val() == ("required")) {
                    work_loc_to = $('#' + rowID + '_WORK_LOC_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter project(To) first.", "error");
                }

                else if (($('#' + rowID + '_ACCOUNT_TO').val() == "" && $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == "lbr")) {
                    work_loc_to = $('#' + rowID + '_WORK_LOC_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter Account(To) first.", "error");
                }
                else {
                    if ((py_cy_status == "CY")) {
                        if (period_from == $('#PeriodFrom').attr('value') && (period_to != $('#PeriodTo').attr('value'))) {
                            period_to = $('#PeriodTo').attr('value');
                        }
                    }
                    if (($('#' + rowID + '_HOME_BUGL_TO').val() == "")) {
                        $('#' + rowID + '_HOME_BUGL_TO').val() = mctrObj.orig_bu;
                    }

                    if ((py_cy_status == "py" && fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_TO').val() != "")) {
                        mctrcreateform.setid = $('#' + rowID + '_AFFILIATE_TO').val();
                    }

                    else {
                        mctrcreateform.setid = $('#' + rowID + '_HOME_BUGL_TO').val();

                    }

                    $.ajax({
                        type: "POST",
                        url: getBaseUrl("/MctrCreateForm/mctrLineItemworkLocToPostTextItemOpenLOV"),
                        data: mctrCreateForm,
                        success: function (result) {

                        },
                        error: function (data) {

                            var exmsg = data.responseText;
                            var ms = exmsg.ExceptionMessage;
                            mctrObj.showDialog($("#dialog-box"), ms, "error");
                        }
                    });


                    if (work_loc_to == "" && $('#' + rowID + '_WORK_LOC_TO').attr('value') != "") {
                        $('#' + rowID + '_WORK_LOC_TO').val().removeClass.addClass("white");
                        if (($('#' + rowID + '_WORK_DEPT_TO').val() != "")) {
                            if (DEPT_STATUS == "I" && $('#' + rowID + '_WORK_DEPT_TO').val() != "") {
                                mctrcreateform.work_dept_red_flg_to == "Y";

                                $('#' + rowID + '_WORK_DEPT_TO').removeClass.addClass("orange");
                                $('#' + rowId + '_WORK_DEPT_TO').attr('red-flag', 'Y');
                            }
                            else {
                                mctrcreateform.work_dept_red_flg_to == "N";
                                $('#' + rowID + '_WORK_DEPT_TO').removeClass.addClass("White");
                            }
                            if ($('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() != "LBR") {
                                rsc_to = $('#' + rowID + '_RSC_TO').attr('value');
                            }
                            else {
                                if ($('#' + rowID + '_RSC_TO').attr('value') != "") {
                                    if ((($('#' + rowID + '_RSC_TO').attr('value') != rsc_to) || rsc_to == "")) {
                                        bootbox.confirm("alert_wlbr_rsc", function (result) {
                                            if (result) {
                                                rsc_to = $('#' + rowID + '_RSC_TO').attr('value');
                                            }

                                        });

                                    }
                                }
                            }
                        }

                        else {
                            $('#' + rowID + '_WORK_POOL_TO').val("");
                            mctrcreateform.work_dept_red_flg_to == "N";
                            $('#' + rowID + '_WORK_DEPT_TO').removeClass.addClass("White");
                            $('#' + rowID + '_WORK_DEPT_TO').attr("red-flag", "N");
                        }
                        DEPT_STATUS.val("");
                    }
                }
            }
            else {
                work_loc_to = $('#' + rowID + '_WORK_LOC_TO').attr('value');
                mctrObj.showDialog($("#dialog-box"), "you either do not have the proper role or proper status setting to change this field.", "error");
            }
        }
    }
    function mctrlineitemworkdepttoposttextitem(e, obj) {
        var rowID = parseInt(e.target.id.slice(0, 1));
        var status_id = $('#StatusId').val();
        var bems_orig = $('#BemsOrig').val();
        var bems_acct = $('#BemsAcct').val();
        var period_to = $('#PeriodTo').val();
        var period_from = $('#PeriodFrom').val();
        var fiscal_year = mctrCreateForm.fyear;
        var rsc_to = $('#' + rowID + '_RSC_TO').val();
        var work_dept_to = $('#' + rowID + '_WORK_DEPT_TO').val();
        if ((work_dept_to != $('#' + rowID + '_WORK_DEPT_TO').attr('value')) || (work_dept_to != "" && $('#' + rowID + '_WORK_LOC_TO').val() == "") || (work_dept_to != "" && $('#' + rowID + '_WORK_DEPT_TO').attr('value') == "") || (work_dept_to == "" && $('#' + rowID + '_WORK_DEPT_TO').attr('value') == "") || $('#' + rowID + '_WORK_DEPT_TO').attr('class') == "red") {
            if (((status_id && bems_orig == $('#SessionBems').val()) || (status_id && bems_acct == $('#SessionBems').val()) || (status_id == "CA" && bems_cost_acct == $('#SessionBems').val())) && ($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() != "FRG" || $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == "")) {
                if (($('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || period_to == "" || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == "REQUIRED")) {
                    work_dept_to = $('#' + rowID + '_WORK_DEPT_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter the activity id (from) first.", "error");
                }
                else if (($('#' + rowID + '_PROJECT_ID_FROM').val() == null || $('#' + rowID + '_PROJECT_ID_FROM').val() == "REQUIRED")) {
                    work_dept_to = $('#' + rowID + '_WORK_DEPT_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter the project id (from) first.", "error");
                }
                else if (($('#' + rowID + '_ACCOUNT_FROM').val() == "")) {
                    work_dept_to = $('#' + rowID + '_WORK_DEPT_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter the account (from) first.", "error");
                }
                else if (($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "" || $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "REQ")) {
                    work_dept_to = $('#' + rowID + '_WORK_DEPT_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter the project trans type(from) first.", "error");
                }
                else if (($('#' + rowID + '_ACTIVITY_ID_TO').val() == "" || $('#' + rowID + '_ACTIVITY_ID_TO').val() == "REQUIRED")) {
                    work_dept_to = $('#' + rowID + '_WORK_DEPT_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter the activity id(to) first.", "error");
                }
                else if (($('#' + rowID + '_PROJECT_ID_TO').val() == "" || $('#' + rowID + '_PROJECT_ID_TO').val() == "REQUIRED")) {
                    work_dept_to = $('#' + rowID + '_WORK_DEPT_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter the project id(to) first.", "error");
                }
                else if (($('#' + rowID + '_ACCOUNT_TO').val() == "" && $('#' + rowID + '_ACCOUNT_TO').val() == "LBR")) {
                    work_dept_to = $('#' + rowID + '_WORK_DEPT_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter the account(to) first.", "error");
                }
                else if ((work_dept_to != "" && $('#' + rowID + '_WORK_LOC_TO').val() != "") && (work_dept_to == $('#' + rowID + '_WORK_DEPT_TO').attr('value') && $('#' + rowID + '_WORK_POOL_TO').val() != "") && $('#' + rowID + '_WORK_DEPT_TO').attr('class') == "red") {
                    $('#' + rowID + '_WORK_LOC_TO').removeClass.addClass("RED");
                    $('#' + rowID + '_WORK_DEPT_TO').val().removeClass.addClass("RED");
                }
                else {
                    if ((py_cy_status == "CY")) {
                        if (period_from = $('#PeriodFrom').attr('value') && (period_to != $('#PeriodTo').attr('value'))) {
                            period_to = $('#PeriodTo').attr('value');
                        }
                    }
                    if (($('#' + rowID + '_HOME_BUGL_TO').val() == "")) {
                        $('#' + rowID + '_HOME_BUGL_TO').val() = mctrObj.orig_bu;
                    }
                    if ((py_cy_status == "PY" && fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_TO').val() != "")) {
                        mctrcreateform.setid = $('#' + rowID + '_AFFILIATE_TO').val();

                    }
                    else {
                        mctrcreateform.setid = $('#' + rowID + '_HOME_BUGL_TO').val();
                    }
                    $.ajax({
                        type: "POST",
                        url: getBaseUrl("/MctrCreateForm/mctrLineItemworkDeptToPostTextItemOpenLOV"),
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
                if ((work_dept_to == "" && $('#' + rowID + '_WORK_DEPT_TO').attr('value') != "")) {
                    mctrcreateform.work_dept_red_flg_from = "N";
                    $('#' + rowID + '_WORK_DEPT_TO').removeClass.addClass("RED")
                    if ((work_dept_to != "")) {
                        $('#' + rowID + '_WORK_LOC_TO').removeClass.addClass("White");
                        if (DEPT_STATUS == "I" && work_dept_to != "") {
                            mctrcreateform.work_dept_red_flg_to == "Y";
                            $('#' + rowID + '_WORK_DEPT_TO').val().removeClass.addClass("orange");
                            $('#' + rowId + '_WORK_DEPT_TO').attr('red-flag', 'Y');
                        }
                        if ($('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() != "LBR") {
                            rsc_to = $('#' + rowID + '_RSC_TO').attr('value');
                        }
                        else {
                            if (($('#' + rowID + '_RSC_TO').attr('value') = "")) {
                                if ((($('#' + rowID + '_RSC_TO').attr('value') != rsc_to) || rsc_to == "")) {
                                    bootbox.confirm("alert_wlbr_rsc", function (result) {
                                        if (result) {
                                            rsc_to = $('#' + rowID + '_RSC_TO').attr('value');
                                        }
                                    });
                                }

                            }
                        }
                    }
                    else {
                        (work_dept_to == "" && $('#' + rowID + '_WORK_DEPT_TO').attr('value') != "")
                        {
                            $('#' + rowID + '_WORK_POOL_TO').val("");
                        }

                        if ($('#' + rowID + '_WORK_LOC_TO').val() != "") {
                            $('#' + rowID + '_WORK_LOC_TO').removeClass.addClass("RED");
                        }
                    }

                }
            }
        }
        else {
            $('#' + rowID + '_WORK_DEPT_TO').val($('#' + rowID + '_WORK_DEPT_TO').attr('value'));
            mctrObj.showDialog($("#dialog-box"), "you either do not have the proper role or proper status setting to change this field.", "error");

        }
    }
    function mctrLineItemclassCdToPostTextItem(e, obj) {
        var rowID = parseInt(e.target.id.slice(0, 1));
        var status_id = $('#StatusId').val();
        var bems_orig = $('#BemsOrig').val();
        var bems_acct = $('#BemsAcct').val();
        var period_to = $('#PeriodTo').val();
        var period_from = $('#PeriodFrom').val();
        var fiscal_year = mctrCreateForm.fyear;
        var class_cd_to = $('#' + rowID + '_CLASS_CD_TO').val();
        if ((class_cd_to != $('#' + rowID + '_CLASS_CD_TO').attr('value') || (class_cd_to != "" && $('#' + rowID + '_CLASS_CD_TO').attr('value') == "") || (class_cd_to == null && $('#' + rowID + '_CLASS_CD_TO').attr('value') != "") || $('#' + rowID + '_CLASS_CD_TO').attr('class') == "red")) {
            if (((status_id && bems_orig == $('#SessionBems').val()) || (status_id && bems_acct == $('#SessionBems').val()) || (status_id == "CA" && bems_cost_acct == $('#SessionBems').val())) && ($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() != "FRG" || $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == "")) {
                if (($('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || period_to == "" || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == "REQUIRED")) {
                    class_cd_to = $('#' + rowID + '_CLASS_CD_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter the activity id (from) first.", "error");
                }
                else if (($('#' + rowID + '_PROJECT_ID_FROM').val() == "" || $('#' + rowID + '_PROJECT_ID_FROM').val() == "REQUIRED")) {
                    class_cd_to = $('#' + rowID + '_CLASS_CD_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter the project id (from) first.", "error");
                }

                else if (($('#' + rowID + '_ACCOUNT_FROM').val() == "")) {
                    class_cd_to = $('#' + rowID + '_CLASS_CD_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter the account (from) first.", "error");
                }
                else if (($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "" || $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == ("REQ"))) {
                    class_cd_to = $('#' + rowID + '_CLASS_CD_TO').attr('value');
                    mctrObj.showDialog($("#dialog-box"), "please enter the project trans type (from) first.", "error");
                }
                else if ((ACTIVITY_ID_TO == null || ACTIVITY_ID_TO == ("REQUIRED"))) {
                    class_cd_to = global.hold_class_cd_to;
                    message("please enter the activity id (to) first.")
                }


            }
            else {
                class_cd_to = $('#' + rowID + '_CLASS_CD_TO').attr('value');
                mctrObj.showDialog($("#dialog-box"), "you either do not have the proper role or proper status setting to change this field.", "error");

            }
        }

    }

    $('#copybut').click(function (e) {
        if ((status_id == 'OA' && bems_orig == Session_bems) || (status_id.equals("AA") && bems_acct == global.session_bems && activity_id_from == null && global.py_frg_lbr.equals("y"))) {
            mctrObj.showDialog($("#dialog-box"), "please save outstanding changes before using copy button..", "error");
        }
        else {
            mctrObj.showDialog($("#dialog-box"), "you need to be the originator and status must be set to oa to use the copy button.", "error");
        }
    });
    $('#supbut').on('click', function (e) {

        var status_id = $('#StatusId').val();
        var bems_orig = $('#BemsOrig').val();
        var orig_bu = $('#OrigBu').val();
        if ((status_id == "OA" || status_id == "OR" || status_id == "") && (bems_orig == $('#SessionBems').val())) {
            if (orig_bu != "") {
                $(this).attr('href', getBaseUrl("/MctrCreateForm/getRgSuperLOV"));
                e.preventDefault();
            }
            else {
                mctrObj.showDialog($("#dialog-box"), "Please select the Business Unit and Group first.", "error");
                return false;
            }
        }
        else {
            mctrObj.showDialog($("#dialog-box"), " Status must be oa/or with originator role authority to set approver.", "error");
            return false;
        }
    });
    $('#SupAppr').on('keyup click', function (e) {

        var status_id = $('#StatusId').val();
        var apprCdSuper = $('#ApprCdSuper').val();
        var bems_super = $('#BemsSuper').val();
        if ((status_id == "SA") && (bems_super == $('#SessionBems').val())) {

            return true;
        }
            // message("use the save button to process your selection.")
        else if (apprCdSuper != "") {
            mctrObj.showDialog($("#dialog-box"), "Please check with originator for help to reset.", "warning");
            $('.popoverAppr').popover('hide');
        }
        else {
            mctrObj.showDialog($("#dialog-box"), "Status must be sa with originator role authority to set this field.", "error");
            $('.popoverAppr').popover('hide');
        }

    });
    $('#Finbut').on('keyup click', function (e) {
        var status_id = $('#StatusId').val();
        var bems_orig = $('#BemsOrig').val();
        var orig_bu = $('#OrigBu').val();
        if ((status_id == "OA" || status_id == "OR" || status_id == "") && (bems_orig == $('#SessionBems').val())) {
            if ((orig_bu != "")) {
                $(this).attr('href', getBaseUrl("/MctrCreateForm/getRgFinCtlLOV"));
                e.preventDefault();
            }
            else {
                mctrObj.showDialog($("#dialog-box"), "Please select the Business Unit and Group first.", "error");
                return false;
            }
        }
        else {
            mctrObj.showDialog($("#dialog-box"), "Status must be oa/or with originator role authority to set approver.", "error");
            return false;
        }
    });
    $('#FinAppr').on('keyup click', function (e) {

        var status_id = $('#StatusId').val();
        var apprCdFinCtl = $('#ApprCdFinCtl').val();
        var bems_fin_ctl = $('#BemsFinCtl').val();
        if ((status_id == "FA") && (bems_fin_ctl == $('#SessionBems').val())) {
            return true;
        }
            // message("use the save button to process your selection.")
        else if (apprCdFinCtl != "") {
            mctrObj.showDialog($("#dialog-box"), "please check with originator for help to reset.", "error");
            $('.popoverAppr').popover('hide');
        }

        else {
            mctrObj.showDialog($("#dialog-box"), "status must be fa with originator role authority to set this field.", "error");
            $('.popoverAppr').popover('hide');
        }

    });
    $('#AccBut').on('Keyup click', function (e) {
        var apprCdAcct = $('#ApprCdAcct').val();
        var statusId = $('#StatusId').val();
        $('#AccBut').attr('href', getBaseUrl("/MctrCreateForm/getRgAcctLOV"));
        // if (system.form_status == "query") {
        if (apprCdAcct == "") {
            $.ajax({
                type: "POST",
                url: getBaseUrl("/MctrCreateForm/mctrHeaderbutAcctWhenButtonPressedOpenLOV"),
                data: null,
                success: function (result) {
                    if (result) {
                        if (statusId == "AA") {
                            $('#AccBut').attr('href', getBaseUrl("/MctrCreateForm/getRgAcctLOV"));
                            return true;
                        }
                            //else
                            //    -- required at time accountant is assigned.
                            //    commit_form;
                        else {
                            $('#mctrModal').modal("hide");
                            mctrObj.showDialog($("#dialog-box"), "Status must be AA with accountant role authority to set approver.", "error");
                            return true;
                        }
                    }
                    else {
                        // you must have the accountant role authority to set the approver.
                        $('#mctrModal').modal("hide");
                        mctrObj.showDialog($("#dialog-box"), " you must have the accountant role authority to set the approver.", "error");
                        return false;
                    }
                },
                error: function (req, status, error) {

                }
            });
        }
        else {
            mctrObj.showDialog($("#dialog-box"), " Approval action has been performed", "error");
            return false;
        }

    });
    $('#AccAppr').on('keyup click', function (e) {
        if ($('#StatusId').val() == "AA" && $('#BemsCostAcct').val() != "" && $('#SessionBems').val() == $('#BemsAcct').val()) {
            var status_id = $('#StatusId').val();
            var apprCdAcct = $('#ApprCdAcct').val();
            var bems_acct = $('#BemsAcct').val();
            if ((status_id == "AA") && (bems_acct == $('#SessionBems').val())) {
                return true;
            }
                // pending to be done if no value is selected form lov
            else if (apprCdAcct != "") {
                mctrObj.showDialog($("#dialog-box"), "Accountant can use recall button if approval needs to be reset..", "error");
                $('.popoverAppr').popover('hide');
            }
            else {
                mctrObj.showDialog($("#dialog-box"), "Status must be AA with originator role authority to set this field.", "error");
                $('.popoverAppr').popover('hide');
            }
        }
        else {
            mctrObj.showDialog($("#dialog-box"), "The cost accountant approver entry is missing and needs to be assigned before approving.", "error");
            $('.popoverAppr').popover('hide');
        }
    });
    $('#LbrAccBut').on('keyup click', function (e) {
        var apprCdLbrAcct = $('#ApprCdLbrAcct').val();
        var statusId = $('#StatusId').val();
        $(this).attr('href', getBaseUrl("/MctrCreateForm/getRgLbrAcctLOV"));
        if (apprCdLbrAcct == "") {
            $.ajax({
                type: "POST",
                url: getBaseUrl("/MctrCreateForm/mctrHeaderbutAcctWhenButtonPressedOpenLOV"),
                data: null,
                success: function (result) {
                    if (result) {
                        if (statusId == "AA" || statusId == "LM" || statusId == "LB") {
                            $(this).attr('href', getBaseUrl("/MctrCreateForm/getRgLbrAcctLOV"));
                            e.preventDefault();
                        }
                        else {
                            mctrObj.showDialog($("#dialog-box"), "Status must be AA / LM/ LB in order to assign an approver..", "error");
                            return false;
                        }
                    } else {
                        $('#mctrModal').modal("hide");
                        mctrObj.showDialog($("#dialog-box"), "You must have the accountant role authority to set the approver.", "error");
                        return false;
                    }
                },
                error: function (req, status, error) {

                }
            });
        }
        else {
            mctrObj.showDialog($("#dialog-box"), " Approval action has been performed.", "error");
            return false;
        }

    });
    $('#LbrAccAppr').on('keyup click', function (e) {
        var status_id = $('#StatusId').val();
        var apprCdLbrAcct = $('#ApprCdLbrAcct').val();
        var bems_lbr_acct = $('#BemsLbrAcct').val();
        if ((status_id == "LB" || status_id == "LM") && (bems_lbr_acct == $('#SessionBems').val())) {
            return true;
        }
            // message("use the save button to process your selection.")
        else if (apprCdLbrAcct != "") {
            if ($('#ApprCdLbrAcct').val() == "Y") {
                mctrObj.showDialog($("#dialog-box"), "Please check with accountant for help to recall.", "warning");
                $('.popoverAppr').popover('hide');
                return false;
            }
        }
        else {
            mctrObj.showDialog($("#dialog-box"), "status must be LB / LM with accountant role authority to set this field.", "error");
            $('.popoverAppr').popover('hide');
            return false;
        }
    });
    $('#MatAccBut').on('keyup click', function (e) {
        var apprCdMatlAcct = $('#ApprCdMatlAcct').val();
        var statusId = $('#StatusId').val();
        $(this).attr('href', getBaseUrl("/MctrCreateForm/getRgMatlAcctLOV"));
        if (apprCdMatlAcct == "") {
            $.ajax({
                type: "POST",
                url: getBaseUrl("/MctrCreateForm/mctrHeaderbutAcctWhenButtonPressedOpenLOV"),
                data: null,
                success: function (result) {
                    if (result) {
                        if (statusId == "AA" || statusId == "LM" || statusId == "MA") {
                            $(this).attr('href', getBaseUrl("/MctrCreateForm/getRgMatlAcctLOV"));
                            e.preventDefault();
                        }
                        else {
                            mctrObj.showDialog($("#dialog-box"), "Status must be AA / LM / MA in order to assign an approver..", "error");
                            return false;
                        }
                    } else {
                        $('#mctrModal').modal("hide");
                        mctrObj.showDialog($("#dialog-box"), " you must have the accountant role authority to set the approver.", "error");
                        return false;
                    }
                },
                error: function (req, status, error) {

                }
            });
        }
        else {
            mctrObj.showDialog($("#dialog-box"), " Approval action has been performed.", "error");
            return false;
        }
        
    });
    $('#MtlAccAppr').on('keyup click', function (e) {
        var status_id = $('#StatusId').val();
        var apprCdMatlAcct = $('#ApprCdMatlAcct').val();
    if ((status_id == "MA" || status_id == "LM") && ($('#BemsMatlAcct').val() == $('#SessionBems').val())) {
            return true;
        }
            // message("use the save button to process your selection.")
        else if (apprCdMatlAcct != "") {
            if ($('#ApprCdMatlAcct').val() == "Y") {
                mctrObj.showDialog($("#dialog-box"), "please check with accountant for help to recall.", "warning");
                $('.popoverAppr').popover('hide');
            }
        }
        else {
            mctrObj.showDialog($("#dialog-box"), "status must be ma/lm with accountant role authority to set this field.", "error");
            $('.popoverAppr').popover('hide');
        }
    });
    $('#CostAccBut').on('keyup click', function (e) {
        var apprCdCostAcct = $('#ApprCdCostAcct').val();
        var statusId = $('#StatusId').val();
        $('#CostAccBut').attr('href', getBaseUrl("/MctrCreateForm/getRgCostAcctLOV"));
        if (apprCdCostAcct == "") {
            $.ajax({
                type: "POST",
                url: getBaseUrl("/MctrCreateForm/mctrHeaderbutAcctWhenButtonPressedOpenLOV"),
                data: null,
                success: function (result) {
                    if (result) {
                        if (statusId == "AA" || statusId == "LM" || statusId == "LB" || statusId == "MA" || statusId == "CA") {

                            $('#CostAccBut').attr('href', getBaseUrl("/MctrCreateForm/getRgCostAcctLOV"));
                            e.preventDefault();
                            return false;
                       
                        }
                        else {
                            $('#mctrModal').modal("hide");
                            mctrObj.showDialog($("#dialog-box"), "Status must be aa/lm/lb/ma/ca in order to assign an approver..", "error");
                            return false;
                        }
                    } else {
                        // you must have the accountant role authority to set the approver.
                        $('#mctrModal').modal("hide");
                        mctrObj.showDialog($("#dialog-box"), " you must have the accountant role authority to set the approver.", "error");
                        return false;
                    }
                },
                error: function (req, status, error) {

                }
            });
        }
        else {
            $('#mctrModal').modal("hide");
            mctrObj.showDialog($("#dialog-box"), " Approval action has been performed.", "error");
            return false;
        }


    });
    $('#CostAccAppr').on('keyup click', function (e) {
        var status_id = $('#StatusId').val();
        var apprCdCostAcct = $('#ApprCdCostAcct').val();
        if (status_id == "CA" && ($('#BemsCostAcct').val() == $('#SessionBems').val())) {
            return true;
        }
            // message("use the save button to process your selection.")
        else if (apprCdCostAcct != "") {
            if ($('#ApprCdCostAcct').val() == "Y") {
                mctrObj.showDialog($("#dialog-box"), "please check with accountant for help to recall.", "warning");
                $('.popoverAppr').popover('hide');
            }
        }
        else {
            mctrObj.showDialog($("#dialog-box"), "status must be ca with accountant role authority to set this field.", "error");
            $('.popoverAppr').popover('hide');
        }
    });
    $('#JrnlAppBut').on('keyup click', function (e) {
        var apprCdSrAcct = $('#ApprCdSrAcct').val();
        var statusId = $('#StatusId').val();
        $(this).attr('href', getBaseUrl("/MctrCreateForm/getRgSrAcctLOV"));
        if (apprCdSrAcct == "") {
            $.ajax({
                type: "POST",
                url: getBaseUrl("/MctrCreateForm/mctrHeaderbutAcctWhenButtonPressedOpenLOV"),
                data: null,
                success: function (result) {
                    if (result) {
                        if (statusId == "AA" || statusId == "LM" || statusId == "LB" || statusId == "MA" || statusId == "CA" || statusId == "SR") {
                            $(this).attr('href', getBaseUrl("/MctrCreateForm/getRgSrAcctLOV"));
                            e.preventDefault();
                        }
                        else {
                            $('#mctrModal').modal("hide");
                            mctrObj.showDialog($("#dialog-box"), "Status must be AA / LM / LB / MA / CA / SR in order to assign an approver..", "error");
                        }
                    } else {
                        // you must have the accountant role authority to set the approver.
                        $('#mctrModal').modal("hide");
                        mctrObj.showDialog($("#dialog-box"), " you must have the accountant role authority to set the approver.", "error");
                    }
                },
                error: function (req, status, error) {

                }
            });
        }
        else {
            $('#mctrModal').modal("hide");
            mctrObj.showDialog($("#dialog-box"), " Approval action has been performed.", "error");
            return false;
        }
        
    });
    $('#JrnlAppr').on('keyup click', function (e) {
        var status_id = $('#StatusId').val();
        var apprCdSrAcct = $('#ApprCdSrAcct').val();
        var BemsSrAcct = $('#BemsSrAcct').val();
        if ((status_id == "SR") && (BemsSrAcct == $('#SessionBems').val())) {
            return true;
        }
            // message("use the save button to process your selection.")
        else if (apprCdSrAcct != "") {
            if ($('#ApprCdSrAcct').val() == "Y") {
                mctrObj.showDialog($("#dialog-box"), "Please check with accountant for help to recall.", "warning");
                $('.popoverAppr').popover('hide');
            }
        }

        else {
            mctrObj.showDialog($("#dialog-box"), "Status must be sr with accountant role authority to set this field.", "error");
            $('.popoverAppr').popover('hide');
        }
    });

    $('#batchBut').click(function (e) {
        $("#batchInput").click();
    });
    $('#batchInput').change(function () {
        var formData = new FormData(event.target.files[0]);
        formData.append('file', event.target.files[0]);

        $.ajax({
            url: getBaseUrl('/MctrCreateForm/whenbuttonpressed'),
            type: 'POST',
            data: formData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success: function (data) {
                var lineitem = data.records;

                // delete obj["mctrLineItem"];
                //param.push(data.records);
                //var litem = param[0];
                //var mctrCreateForm = $.extend(obj,{
                //    mctrLineItem: litem[0]
                //});


                //$.ajax({
                //    url: getBaseUrl("/MctrCreateForm/batchModeCheck1"),
                //    type: "POST",
                //    contentType: "application/json; charset=utf-8",
                //    datatype: 'json',
                //    data: mctrCreateForm,
                //    success: function (data) {

                //    },
                //    error:function()
                //    {

                //    }
                //});



                $('#tblJQGridInner').jqGrid('setGridParam', {
                    datatype: 'local',
                    data: lineitem
                }).trigger("reloadGrid");
                $('#tblJQGridCover').jqGrid('setGridParam', {
                    datatype: 'local',
                    data: lineitem
                }).trigger("reloadGrid");
                $('#tblJQGridFirst').jqGrid('setGridParam', {
                    datatype: 'local',
                    data: lineitem
                }).trigger("reloadGrid");
                var param = [];
              //  $.each($('#tblJQGridCover').getGridParam('data'), function (key, value) {
                    var rowID;
                for (rowID = 1; rowID <= lineitem.length; rowID++)
                    // = value['_id_'];
                        {
                    var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                    var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                    var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                    var mctrItem = $.extend(grid1, grid2, grid3);
                    mctrItem.FYEAR = $('#fyear').val().trim();
                    mctrItem.PERIOD_TO = $('#PeriodTo').val();
                    mctrItem.COW = $('#COW').val();
                    param.push(mctrItem);
                }
                var mctrcreateForm = $('#form').serialize().split("&");
                var obj = {
                };
                for (var key in mctrcreateForm) {
                    //console.log(data[key]);

                    obj[mctrcreateForm[key].split("=")[0]] = mctrcreateForm[key].split("=")[1];

                }

                //  var mctrCreateFormq = $('#form').serialize();
                //  var obj = JSON.stringify(mctrCreateFormq);
                var mctrCreateForm = $.extend({
                    mctrLineItem: param
                }, obj);
                mctrCreateForm.PeriodTo = $('#PeriodTo').val();
                mctrCreateForm.COW = $('#COW').val();

                $.ajax({
                    type: "POST",
                    url: getBaseUrl("/MctrCreateForm/batchModeCheck1"),
                    data: mctrCreateForm,
                    datatype: 'json',
                    success: function (data) {
                        var i = 0;
                        var n = data.mctrLineItem.length;
                        $('#tblJQGridInner').jqGrid('setGridParam', {
                            datatype: 'local',
                            data: data.mctrLineItem
                        }).trigger("reloadGrid");
                        $('#tblJQGridCover').jqGrid('setGridParam', {
                            datatype: 'local',
                            data: data.mctrLineItem
                        }).trigger("reloadGrid");
                        $('#tblJQGridFirst').jqGrid('setGridParam', {
                            datatype: 'local',
                            data: data.mctrLineItem
                        }).trigger("reloadGrid");
                        for (i = 0; i < n; i++) {
                            $.each(data.mctrLineItem[i].flagValidations, function (index, item) {
                                if (item[0] == "r") {
                                    $('#' + (i + 1) + '_' + index + '').removeClass().addClass("red");
                                }
                                else if (item[0] == "o") {
                                    $('#' + (i + 1) + '_' + index + '').removeClass().addClass("orange");
                                }
                                else {
                                    $('#' + (i + 1) + '_' + index + '').removeClass();
                                }

                            });
                        }


                    },
                    error: function () {

                    }
                });





                $('#tblJQGridFirst').find('#2').find('*').attr('disabled', false);
                $('#tblJQGridCover').find('#2').find('*').attr('disabled', false);
                $('#tblJQGridInner').find('#2').find('*').attr('disabled', false);
                $('#tblJQGridFirst').find('#3').find('*').attr('disabled', false);
                $('#tblJQGridCover').find('#3').find('*').attr('disabled', false);
                $('#tblJQGridInner').find('#3').find('*').attr('disabled', false);


            }
        });

    });

    $('#ovrheadChk').change(function () {
        if ($('#AccountantRole').val() == "Y") {
            $('#ovrheadChk').attr("checked", true);
        }
        else {
            $('#ovrheadChk').attr("checked", false);
            mctrObj.showDialog($('#printMctrMsgDialog'), "Must have an accounting role to view Overhead line items.", "error");
        }
    });
    $('#offsetChk').change(function () {
        if ($('#AccountantRole').val() == "Y") {
            $('#offsetChk').attr("checked", true);
        }
        else {
            $('#offsetChk').attr("checked", false);
            mctrObj.showDialog($('#printMctrMsgDialog'), "Must have an accounting role to view Overhead line items.", "error");
        }
    });
});