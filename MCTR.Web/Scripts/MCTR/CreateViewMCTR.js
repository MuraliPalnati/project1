
$(document).ready(function () {
    $('#batchInput').hide();
    $('.btn-line').children().not('[style="display: none;"]').last().blur(function () {
        $('#1_ACTIVITY_ID_FROM').focus();
    });

    var py_cy_status = $('#fyear').val().trim() == (new Date).getFullYear() ? 'CY' : 'PY';
    var fiscal_year = $('#fyear').val().trim();
    var justifValue = $('#prevMeasures').val();
    if (justifValue == '' || justifValue == undefined) {
        $('#jpbut').css('color', '#FF0606');
    }
    else {
        $('#jpbut').css('color', '#55E655');
    }
    var attachCount = $('#AttachmentCount').val();
    if (attachCount !== '0') {
        $('#attachBtn').css('color', '#55E655');
    }
    var offsetLines = parseInt($('#OffsetLines').val());
    if (offsetLines > 0) {
        if (parseFloat($('#totalOffset').val()) == 0) {
            $('#totalOffset').css('background', 'yellow!important');
        }
    }

    var commentsCount = $('#CommentsCount').val();
    if (commentsCount !== '0' || commentsCount == undefined) {
        $('#commentsBtn').css('color', '#55E655');
    }
    var ValidaitonsCreateFormObj = new ValidaitonsCreateForm();

    $('#Email').on('click', function () {
        var mctrCreateForm = $('#form').serialize();
        $.ajax({
            url: getBaseUrl('/MctrCreateForm/SendMail'),
            type: "POST",
            traditional: true,
            data: mctrCreateForm,
            //contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data != null) {
                    mctrObj.showDialog($("#dialog-box"), "Mail has been sent successfully", "success");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    });
    var afterInsertRow = function (rowid, rowdata, rowelem) {
        var loadCmplt;
        var loadCmpltFn;
        var loadCmpltTh;
    };
    $('#addLineIemNewRow').click(function () {
        var data = $("#tblJQGridFirst").getGridParam('data');
        var maxLineNo = parseInt(data[data.length - 1]['_id_']);
        var rowId = maxLineNo + 1;
        var parameters =
    {
        rowID: rowId,
        position: "last",
        useDefValues: false,
        useFormatter: true,
        addRowParams: { extraparam: {} }
    };

        $("#tblJQGridFirst").addRow(parameters);
        $('#tblJQGridInner').addRow(parameters);
        $('#tblJQGridCover').addRow(parameters);
    });
    var onSelRowFn = function (rowid, status, obj) {
        //$('a[id*=lineItemDeleteBtn]').hide();
        //$('#'+rowid+'_lineItemDeleteBtn').show();
    };

    var formatter = function (cellName, href) {
        href = getBaseUrl(href);
        return function (cellvalue, options, rowObject) {
            return '<a data-toggle="modal" row-id="' + options.rowId + '" data-target="#mctrModal" data-backdrop="static" href=' + href + options.rowId + ' id=' + options.rowId + '_' + cellName + ' class="btn btn-default btn-xs">&gt;</a>';
        };
    };


    var addRowForGrid = function (gridId) {
        var newlyAddedRows;
        return function () {
            var dataFromDb = $('#' + gridId).getGridParam('userData');
            var gridLength = dataFromDb.length;
            var records = $('#' + gridId).getGridParam('records');
            var data = $('#' + gridId).getGridParam('data');

            if (data.length != dataFromDb.length) {
                newlyAddedRows = $.grep(data, function (obj) {
                    return obj.ACTIVITY_ID_FROM === undefined;
                });
            }

            var newlyAddeData = $.grep(data, function (obj) {
                return obj.ACTIVITY_ID_FROM === undefined;
            });
            var maxLineNo;
            if (dataFromDb && dataFromDb.length != 0) {
                maxLineNo = (dataFromDb.length == newlyAddeData.length) ? dataFromDb[dataFromDb.length - 1].LINE_NO : parseInt(data[data.length - 1]["_id_"]);
            }
            else {
                maxLineNo = dataFromDb.length;
            }

            var rowId = gridLength == 0 ? 1 : maxLineNo + 1;
            if (!newlyAddedRows && gridLength < 3) {
                for (var i = 1; i <= 3 - gridLength ; i++) {
                    var parameters =
                     {
                         rowID: rowId,
                         position: "last",
                         usedefvalues: false,
                         useformatter: true,
                         addrowparams: { extraparam: {} }
                     };
                    $('#' + gridId).addRow(parameters);
                    rowId++
                };
            };
        }
    };

    //Stretch || Reset View Toggle
    var initWidth = $("#root a").first().width();
    var fullWidth = $("#root .wrp").width();
    var animSpeed = "slow";
    $("#stretchBtn").click(function (e) {
        e.preventDefault();
        var $this = $(this);

        if ($this.text() == 'Stretch') {
            $('.overlay-inner').removeClass('col-md-5').addClass('col-md-1').toggle('slide', { direction: 'right' }, 500);
            $('.overlay-cover').removeClass('overflow');
            $('.overlay-cover-content').removeClass('content');
            $('.overlay-cover').switchClass('col-md-5', 'col-md-10', 500, 'swing', null)
            $this.text("Reset View");

        }
        else {
            $('.overlay-cover').removeClass('overflow').addClass('overflow');
            $('.overlay-cover-content').removeClass('content').addClass('content');
            $('.overlay-cover').removeClass('col-md-5').addClass('col-md-5');
            $('.overlay-inner').removeClass('col-md-1').addClass('col-md-5');
            $('.overlay-inner').toggle('slide', { direction: 'left' }, 10);
            $this.text("Stretch");
            setJqGridWidth();
        }

    });

    //Grid View
    var mctrObj = new MCTR();
    var inputObj = {};
    var firstColumnFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue ? cellvalue : "";
        return '<a href="#" data-toggle="modal" " row-id="' + options.rowId + '" id=' + options.rowId + '_projFrom  class="btn btn-default btn-xs">&gt;</a></br><a href="#" data-toggle="modal" " row-id="' + options.rowId + '" id=' + options.rowId + '_projTo class="btn btn-default btn-xs">&gt;</a>';
    };
    var projectinputFormatter = function (columnName, disabledFrom, disabledTo, maxValue) {
        disabledFrom = disabledFrom ? disabledFrom : '';
        disabledTo = disabledTo ? disabledTo : '';
        return function (cellvalue, options, rowObject) {

            var fromOrTo = $('#formOrToFlag').val();
            cellvalue = cellvalue ? cellvalue : "";

            var oldFromValue = $('#' + options.rowId + '_' + columnName + '_FROM').val();
            if (!oldFromValue && oldFromValue != 'undefined') { oldFromValue = ""; }
            var fromValueInsert = fromOrTo == "from" ? cellvalue : oldFromValue;

            if ((oldFromValue != "" && oldFromValue) && (fromValueInsert == "" || fromValueInsert) && (oldFromValue == fromValueInsert)) {
                fromValueInsert = oldFromValue;
            }

            var oldToValue = $('#' + options.rowId + '_' + columnName + '_TO').val();
            if (!oldToValue && oldToValue != 'undefined') { oldToValue = ""; }
            var toValueInsert = fromOrTo == "from" ? oldToValue : cellvalue;

            if ((oldToValue != "" && oldToValue) && (toValueInsert == "" || toValueInsert) && (oldToValue == toValueInsert)) {
                toValueInsert = oldToValue;
            }
            var fromValue = rowObject[columnName + '_FROM'] ? rowObject[columnName + '_FROM'] : fromValueInsert;
            var toValue = rowObject[columnName + '_TO'] ? rowObject[columnName + '_TO'] : toValueInsert;
            if (columnName == 'HOME_DEPT') {
                var redflag;
                var redflagto;
                var classcol;
                var classcolto;
                switch (rowObject.DEPT_RED_FLG_FROM) {
                    case ('Y'): redflag = 'Y'; classcol = 'orange'; break;
                    case ('N'): redflag = 'N'; classcol = 'white'; break;
                    default: redflag = 'N';

                }
                switch (rowObject.DEPT_RED_FLG_TO) {
                    case ('Y'): redflagto = 'Y'; classcolto = 'orange'; break;
                    case ('N'): redflagto = 'N'; classcolto = 'white'; break;
                    default: redflagto = 'N';

                }
                return '<input red-flag="' + redflag + '" class="' + classcol + '" row-id="' + options.rowId + '"  id="' + options.rowId + '_' + columnName + '_FROM" maxlength="' + maxValue + '" value="' + fromValue + '"' + disabledFrom + '></br><input red-flag="' + redflagto + '" class="' + classcolto + '" row-id="' + options.rowId + '" maxlength="' + maxValue + '" id="' + options.rowId + '_' + columnName + '_TO"  value="' + toValue + '" ' + disabledTo + '>';

            }
            else if (columnName == 'PROJECT_ID') {
                var redflag;
                var redflagto;
                var classcol;
                var classcolto;
                switch (rowObject.ACTY_RED_FLG_FROM) {
                    case ('Y'): redflag = 'Y'; classcol = 'orange'; break;
                    case ('N'): redflag = 'N'; classcol = 'white'; break;
                    default: redflag = 'N';
                }
                switch (rowObject.ACTY_RED_FLG_TO) {
                    case ('Y'): redflagto = 'Y'; classcolto = 'orange'; break;
                    case ('N'): redflagto = 'N'; classcolto = 'white'; break;
                    default: redflagto = 'N';
                }
                return '<input red-flag="' + redflag + '" class="' + classcol + '" row-id="' + options.rowId + '"  id="' + options.rowId + '_' + columnName + '_FROM" maxlength="' + maxValue + '" value="' + fromValue + '"' + disabledFrom + '></br><input red-flag="' + redflagto + '" class="' + classcolto + '" row-id="' + options.rowId + '" maxlength="' + maxValue + '" id="' + options.rowId + '_' + columnName + '_TO"  value="' + toValue + '" ' + disabledTo + '>';


            }
            else if (columnName == 'WORK_DEPT') {
                var redflag;
                var redflagto;
                var classcol;
                var classcolto;
                
                switch (rowObject.WORK_DEPT_RED_FLG_FROM) {
                    case ('Y'): redflag = 'Y'; classcol = 'orange'; break;
                    case ('N'): redflag = 'N'; classcol = 'white'; break;
                    default: redflag = 'N';
                }
                switch (rowObject.WORK_DEPT_RED_FLG_TO) {
                    case ('Y'): redflagto = 'Y'; classcolto = 'orange'; break;
                    case ('N'): redflagto = 'N'; classcolto = 'white'; break;
                    default: redflagto = 'N';
                }
                return '<input red-flag="' + redflag + '" class="' + classcol + '" row-id="' + options.rowId + '"  id="' + options.rowId + '_' + columnName + '_FROM" maxlength="' + maxValue + '" value="' + fromValue + '"' + disabledFrom + '></br><input red-flag="' + redflagto + '" class="' + classcolto + '" row-id="' + options.rowId + '" maxlength="' + maxValue + '" id="' + options.rowId + '_' + columnName + '_TO"  value="' + toValue + '" ' + disabledTo + '>';


            }
            else if (columnName == 'AMOUNT' || columnName == 'ADJUSTMENT' || columnName == 'QUANTITY') {

                var bClass;
                if ((rowObject.ACTIVITY_ID_FROM == undefined || rowObject.ACTIVITY_ID_FROM == "") && options.rowId != 1) {
                    fromValue = "";
                    toValue = "";
                }

                else {
                    if (columnName == 'QUANTITY') {
                        fromValue = fromValue == "" ? ".0" : parseFloat(fromValue).toFixed(1);
                        toValue = toValue == "" ? ".0" : parseFloat(toValue).toFixed(1);
                    }
                    else {
                        fromValue = fromValue == "" ? ".00" : parseFloat(fromValue).toFixed(2);
                        toValue = toValue == "" ? ".00" : parseFloat(toValue).toFixed(2);
                    }
                }
                if (rowObject.MTL_JRNL == "Y")
                {
                    bClass = "black";
                }
                return '<input  class="' + bClass + '" row-id="' + options.rowId + '"  id="' + options.rowId + '_' + columnName + '_FROM" maxlength="' + maxValue + '" value="' + fromValue + '"' + disabledFrom + '></br><input class="' + bClass + '"  maxlength="' + maxValue + '" row-id="' + options.rowId + '" id="' + options.rowId + '_' + columnName + '_TO"  value="' + toValue + '" ' + disabledTo + '>';

            }
            else if (columnName == 'OH_AMT') {


                fromValue = fromValue == "" ? "" : parseFloat(fromValue).toFixed(2);
                toValue = toValue == "" ? "" : parseFloat(toValue).toFixed(2);
                if (fromValue.split('.')[0] == '-0') {
                    fromValue = "-." + fromValue.split('.')[1]
                }

                if (toValue.split('.')[0] == '0') {
                    toValue = "." + toValue.split('.')[1]
                }
                return '<input row-id="' + options.rowId + '"  id="' + options.rowId + '_' + columnName + '_FROM" maxlength="' + maxValue + '" value="' + fromValue + '"' + disabledFrom + '></br><input maxlength="' + maxValue + '" row-id="' + options.rowId + '" id="' + options.rowId + '_' + columnName + '_TO"  value="' + toValue + '" ' + disabledTo + '>';
            }
            else {
                return '<input row-id="' + options.rowId + '"  id="' + options.rowId + '_' + columnName + '_FROM" maxlength="' + maxValue + '" value="' + fromValue + '"' + disabledFrom + '></br><input maxlength="' + maxValue + '" row-id="' + options.rowId + '" id="' + options.rowId + '_' + columnName + '_TO"  value="' + toValue + '" ' + disabledTo + '>';
            }



        };


    }
    //Inner Grid Components
    var GLPCFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue ? cellvalue : "";
        var colorClassTTD = '';
        switch (rowObject.TTD_FLAG) {
            case ('G'): colorClassTTD = 'green'; break;
            case ('B'): colorClassTTD = 'black'; break;
            case ('R'): colorClassTTD = 'red'; break;
            case ('Y'): colorClassTTD = 'yellow'; break;
            default: colorClassTTD = 'white';
        }
        var colorClassPER = '';
        switch (rowObject.PER_FLAG) {
            case ('G'): colorClassPER = 'green'; break;
            case ('B'): colorClassPER = 'black'; break;
            case ('R'): colorClassPER = 'red'; break;
            case ('Y'): colorClassPER = 'yellow'; break;
            default: colorClassPER = 'white';
        }
        rowObject.PER_FLAG = rowObject.PER_FLAG == null ? '' : rowObject.PER_FLAG;
        rowObject.TTD_FLAG = rowObject.TTD_FLAG == null ? '' : rowObject.TTD_FLAG;
        return '<a title="TTD" row-id="' + options.rowId + '" id=' + options.rowId + '_ttdbtn data-toggle="modal" data-target="#mctrModalXtraLarge" data-backdrop="static" href="' + getBaseUrl('/TtdCheckBl/ttdCheckLoad') + '?rowId=' + options.rowId + '" class="btn btn-default btn-xs mr-3">TTD</a><a title="' + rowObject.TTD_FLAG + '"  id="' + options.rowId + '_ttdValue" class="btn btn-default btn-xs mr-3 ' + colorClassTTD + '" data-toggle="modal" data-target="#mctrModal" data-backdrop="static" href ="' + getBaseUrl('/MctrCreateForm/TTDFlagLegend') + '">' + rowObject.TTD_FLAG + '</a><a title="Year" row-id="' + options.rowId + '" id=' + options.rowId + '_yearbtn data-toggle="modal" data-target="#mctrModalXtraLarge" data-backdrop="static" href="' + getBaseUrl('/PerCheckBl/perCheckLoad') + '?rowId=' + options.rowId + '" class="btn btn-default btn-xs mr-3"">Year</a><a id="' + options.rowId + '_yearValue" class="btn btn-default btn-xs mr-3 ' + colorClassPER + '" data-toggle="modal" data-target="#mctrModal" data-backdrop="static" href ="' + getBaseUrl('/MctrCreateForm/PERFlagLegend') + '" title="' + rowObject.PER_FLAG + '">' + rowObject.PER_FLAG + '</a></br><a title="Inquire" row-id="' + options.rowId + '" id="' + options.rowId + '_inquireBtn" data-toggle="modal" data-target="#mctrModalXtraLarge" data-backdrop="static" href = "#" class="btn btn-xs align-center">Inquire</a>';

    }

    var overHeadFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue ? cellvalue : "";
        return '<a row-id="' + options.rowId + '" data-toggle="modal" id=' + options.rowId + '_overHeadBtnFrom data-target="#mctrModalXtraLarge" data-backdrop="static" href="' + getBaseUrl("/MctrOhFormBl/MctrOHForm") + '?rowId=' + options.rowId + '" class="btn btn-default btn-xs">&#60;</a></br><a row-id="' + options.rowId + '" id=' + options.rowId + '_overHeadBtnTo data-toggle="modal" data-target="#mctrModalXtraLarge" data-backdrop="static"  href="' + getBaseUrl("/MctrOhFormBl/MctrOHFormTo") + '?rowId=' + options.rowId + '" class="btn btn-default btn-xs">&#60;</a>';
    }
    var loadCmpltTh;
    var thirdGridComplitionFunction = function () {
        setTimeout(addRowForGrid('tblJQGridInner'), 30);
        $(document).keypress(function (e) {
            if (e.which == 13) {
                var modal;
                modal = $(document).find('.bootbox-confirm');
                if (modal.length == 0) {
                    modal = $(document).find('.modal-body').not('.in-form');
                    if (modal.length != 0 && !modal.hasClass('justification')) {
                        modal.find('section .align-right > button').first().click();
                        $('.jQGridRow').find('input[focus=true],a[focus=true]').focus();
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                }

            }
        });

        $(document).keyup(function (e) {
            if (e.keyCode == 27) {
                var modal = $(document).find('.modal-body').not('.in-form');
                if (modal.length != 0) {
                    $('.jQGridRow').find('input[focus=true],a[focus=true]').focus();
                    $('#mctrModal,#mctrModalSmall,#mctrModalLarge,#mctrModalXtraLarge').modal('hide');
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        });

        $("input[id*=_QUANTITY_FROM]").keydown(function (e) {
            if (e.which == 9) {
                $('#' + $(this).attr('row-id') + '_AMOUNT_FROM').focus();
                $('.jQGridRow').find('input[focus=true],a[focus=true]').removeAttr('focus');
                $('#' + $(this).attr('row-id') + '_AMOUNT_FROM').attr('focus', true);
                e.preventDefault();
                e.stopPropagation();
            }
        });
        $("input[id*=_AMOUNT_FROM]").keydown(function (e) {
            if (e.which == 9) {
                $('#' + $(this).attr('row-id') + '_ADJUSTMENT_FROM').focus();
                $('.jQGridRow').find('input[focus=true],a[focus=true]').removeAttr('focus');
                $('#' + $(this).attr('row-id') + '_ADJUSTMENT_FROM').attr('focus', true);
                e.preventDefault();
                e.stopPropagation();
            }
        });
        $("input[id*=_ADJUSTMENT_FROM]").keydown(function (e) {
            if (e.which == 9) {
                $('#' + $(this).attr('row-id') + '_AMOUNT_TO').focus();
                $('.jQGridRow').find('input[focus=true],a[focus=true]').removeAttr('focus');
                $('#' + $(this).attr('row-id') + '_AMOUNT_TO').attr('focus', true);
                e.preventDefault();
                e.stopPropagation();
            }
        });
        $("input[id*=_AMOUNT_TO]").keydown(function (e) {
            if (e.which == 9) {
                $('#' + $(this).attr('row-id') + '_inquireBtn').focus();
                $('.jQGridRow').find('input[focus=true],a[focus=true]').removeAttr('focus');
                $('#' + $(this).attr('row-id') + '_inquireBtn').attr('focus', true);
                e.preventDefault();
                e.stopPropagation();
            }
        });
        $("a[id*=_inquireBtn]").keydown(function (e) {
            if (e.which == 9) {
                $('#' + $(this).attr('row-id') + '_overHeadBtnFrom').focus();
                $('.jQGridRow').find('input[focus=true],a[focus=true]').removeAttr('focus');
                $('#' + $(this).attr('row-id') + '_overHeadBtnFrom').attr('focus', true);
                e.preventDefault();
                e.stopPropagation();
            }
        });
        $("a[id*=_overHeadBtnTo]").keydown(function (e) {
            if (e.which == 9) {
                $('#' + $(this).attr('row-id') + '_ttdbtn').focus();
                $('.jQGridRow').find('input[focus=true],a[focus=true]').removeAttr('focus');
                $('#' + $(this).attr('row-id') + '_ttdbtn').attr('focus', true);
                e.preventDefault();
                e.stopPropagation();
            }
        });
        $("a[id*=_ttdbtn]").keydown(function (e) {
            if (e.which == 9) {
                $('#' + $(this).attr('row-id') + '_yearbtn').focus();
                $('.jQGridRow').find('input[focus=true],a[focus=true]').removeAttr('focus');
                $('#' + $(this).attr('row-id') + '_yearbtn').attr('focus', true);
                e.preventDefault();
                e.stopPropagation();
            }
        });
        $("a[id*=_yearbtn]").keydown(function (e) {
            if (e.which == 9) {
                $('#' + $(this).attr('row-id') + '_LINE_NO').focus();
                $('.jQGridRow').find('input[focus=true],a[focus=true]').removeAttr('focus');
                $('#' + $(this).attr('row-id') + '_LINE_NO').attr('focus', true);
                e.preventDefault();
                e.stopPropagation();
            }
        });
        $('input[id*=_QUANTITY_FROM]').on('change', function (e, obj) {
            e.preventDefault();
            var rowID = $(this).attr('row-id');
            var mctrno = $('#MctrNo').val();
            var SessionBems = $('#SessionBems').val();
            var period_to = $('#PeriodTo').val();;
            var statusID = $('#StatusId').val();
            var BemsOrig = $('#BemsOrig').val();
            var global_quantity_from = $('#' + rowID + '_QUANTITY_FROM').attr('value');
            var global_amount_from = $('#' + rowID + '_AMOUNT_FROM').attr('value');
            var fiscal_year = $('#fyear').val().trim();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var OrignatorStatusID = ['OA', 'OR'];
            var AccountantStatusID = ['AA', 'OR'];
            var bems_cost_acct = $('#BemsCostAcct').val();
            var v_value_chosen = false;
            var v_setid = "";
            var v_count = 0;
            var BemsAcct = $('#BemsAcct').val();
            var v_value_chosen = false;
            var param = [];
            //:system.mode = 'normal' 
            if (!isNaN($('#' + rowID + '_QUANTITY_FROM').val())) {
                if (($('#' + rowID + '_QUANTITY_FROM').val() != global_quantity_from || ($('#' + rowID + '_QUANTITY_FROM').val() != 0 && ($('#' + rowID + '_AMOUNT_FROM').val() == 0 || $('#' + rowID + '_AMOUNT_FROM').attr('class') == "red")) || $('#' + rowID + '_QUANTITY_FROM').attr('class') == "red")) {
                    if ((statusID == "OA" && BemsOrig == $('#SessionBems').val()) || (statusID == "AA" && BemsAcct == $('#SessionBems').val())) {
                        if (($('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || period_to == "" || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == "REQUIRED")) {
                            $('#' + rowID + '_QUANTITY_FROM').val(global_quantity_from);
                            mctrObj.showDialog($("#dialog-box"), "Please enter the Activity ID (From) First.", "error");
                        }

                        else if (($('#' + rowID + '_PROJECT_ID_FROM').val() == "" || $('#' + rowID + '_PROJECT_ID_FROM').val() == "REQUIRED")) {
                            $('#' + rowID + '_QUANTITY_FROM').val(global_quantity_from);
                            mctrObj.showDialog($("#dialog-box"), "Please enter the Project ID (From) First.", "error");
                        }

                        else if ($('#' + rowID + '_ACCOUNT_FROM').val() == "") {
                            $('#' + rowID + '_QUANTITY_FROM').val(global_quantity_from);
                            mctrObj.showDialog($("#dialog-box"), "Please enter the Account(From) first.", "error");
                        }

                        else if (($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "" || $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == ("REQ"))) {
                            $('#' + rowID + '_QUANTITY_FROM').val(global_quantity_from);
                            mctrObj.showDialog($("#dialog-box"), "Please enter the Project Transtype(From) First.", "error");
                        }

                        else if (($('#' + rowID + '_ACTIVITY_ID_TO').val() == "" || $('#' + rowID + '_ACTIVITY_ID_TO').val() == ("REQUIRED"))) {
                            $('#' + rowID + '_QUANTITY_FROM').val(global_quantity_from);
                            mctrObj.showDialog($("#dialog-box"), "Please enter the Activity ID (To) First.", "error");
                        }

                        else if (($('#' + rowID + '_PROJECT_ID_TO').val() == "" || $('#' + rowID + '_PROJECT_ID_TO').val() == ("REQUIRED"))) {
                            $('#' + rowID + '_QUANTITY_FROM').val(global_quantity_from);
                            mctrObj.showDialog($("#dialog-box"), "Please enter the Project ID (To) First.", "error");
                        }

                        else if (($('#' + rowID + '_ACCOUNT_TO').val() == "" && $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == ("LBR"))) {
                            $('#' + rowID + '_QUANTITY_FROM').val(global_quantity_from);
                            mctrObj.showDialog($("#dialog-box"), "Please enter the Account (To) First.", "error");
                        }
                        else if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == ("LBR")) {

                            var param = [];
                            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                            var mctrItem = $.extend(grid1, grid2, grid3);
                            mctrItem.FYEAR = $('#fyear').val().trim();
                            param.push(mctrItem);

                            var mctrCreateFormq = $('#form').serialize();
                            var lineitem = JSON.stringify(mctrCreateFormq);
                            var mctrCreateForm = $.extend({
                                mctrLineItem: param
                            }, lineitem);

                            mctrCreateForm.py_cy_status = py_cy_status;

                            $.ajax({
                                type: "POST",
                                url: getBaseUrl('/MctrCreateForm/mctrLineItemquantityFromPostTextItem'),
                                data: mctrCreateForm,
                                success: function (data) {
                                    vquantityWpdSet = data.V_Count['quantityWpdSet'];
                                    vquantityratefrom = data.V_CountDouble['quantityratefrom'];
                                    vquantityratefromV = data.V_CountDouble['quantityratefromV'];
                                    vquantityrateto = data.V_CountDouble['quantityrateto'];
                                    vquantityratetoV = data.V_CountDouble['quantityratetoV'];


                                    if ($('#' + rowID + '_WPD_TO').val() == "" && fiscal_year >= 2005 && $('#' + rowID + '_ACCOUNT_TO').val() != "") {
                                        if (vquantityWpdSet > 0) {
                                            $('#' + rowID + '_WPD_TO').val("IN");
                                            $('#' + rowID + '_WPD_TO').attr('value', "IN");
                                        }
                                    }

                                    if ($('#' + rowID + '_WPD_TO').val() == "" && fiscal_year >= 2005) {
                                        $('#' + rowID + '_WPD_TO').removeClass().addClass("red");

                                    }
                                    if ($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == "OTS" || $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == "STR") {
                                        if ($('#' + rowID + '_CLASS_CD_FROM').val() == "") {
                                            $('#' + rowID + '_CLASS_CD_FROM').removeClass().addClass("red");

                                        }
                                        if ($('#' + rowID + '_CLASS_CD_TO').val() == "") {
                                            $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass("red");

                                        }
                                        $('#' + rowID + '_QUANTITY_FROM').val((parseFloat($('#' + rowID + '_QUANTITY_FROM').val())).toFixed(1));
                                        $('#' + rowID + '_QUANTITY_TO').val(($('#' + rowID + '_QUANTITY_FROM').val() * -1).toFixed(1));
                                        $('#' + rowID + '_QUANTITY_TO').attr('value', ($('#' + rowID + '_QUANTITY_FROM').val() * -1).toFixed(1));

                                        if (py_cy_status == 'PY') {
                                            v_rate = vquantityratefrom;
                                        }
                                        else {
                                            v_rate = vquantityratefromV;
                                        }
                                        if (v_rate == "" || (1 > v_rate && v_rate > -1)) {
                                            v_rate = 0;
                                            mctrObj.showDialog($("#dialog-box"), "Labor Rate is not known. Please input amount manually.", "error");

                                        }
                                        else {
                                            $('#' + rowID + '_AMOUNT_FROM').val(($('#' + rowID + '_QUANTITY_FROM').val() * v_rate).toFixed(2));

                                            $('#' + rowID + '_AMOUNT_FROM').attr('value', $('#' + rowID + '_AMOUNT_FROM').val());
                                        }

                                        if (py_cy_status == 'PY') {
                                            v_rate = vquantityrateto;
                                        }
                                        else {
                                            v_rate = vquantityratetoV;
                                        }
                                        if (v_rate == "" || (1 > v_rate && v_rate > -1)) {
                                            v_rate = 0;
                                        }
                                        if ((py_cy_status == ("CY"))) {
                                            $('#' + rowID + '_AMOUNT_TO').val(($('#' + rowID + '_AMOUNT_FROM').val() * -1).toFixed(2));

                                            $('#' + rowID + '_AMOUNT_TO').attr('value', $('#' + rowID + '_AMOUNT_TO').val());

                                        }

                                        else if ((v_rate != 0)) {
                                            $('#' + rowID + '_AMOUNT_TO').val(($('#' + rowID + '_QUANTITY_TO').val() * v_rate).toFixed(2));
                                            $('#' + rowID + '_AMOUNT_TO').attr('value', $('#' + rowID + '_AMOUNT_TO').val());
                                        }

                                        if (($('#' + rowID + '_QUANTITY_FROM').val() != global_quantity_from) || ($('#' + rowID + '_AMOUNT_FROM').val() != global_amount_from)) {
                                            $('#' + rowID + '_ttdValue').addClass("white");
                                            $('#' + rowID + '_yearValue').addClass("white");
                                        }

                                    }
                                    else {
                                        $('#' + rowID + '_QUANTITY_FROM').val('.0');
                                        $('#' + rowID + '_QUANTITY_FROM').attr('value', '.0');
                                        $('#' + rowID + '_QUANTITY_TO').val('.0');
                                        $('#' + rowID + '_QUANTITY_TO').attr('value', '.0');
                                        mctrObj.showDialog($("#dialog-box"), "project trans code must be value ots or str to enter hours", "error");
                                    }

                                },
                                error: function (data) {

                                    var exmsg = data.responseText;
                                    var ms = exmsg.ExceptionMessage;
                                    mctrObj.showDialog($("#dialog-box"), ms, "error");
                                }
                            });


                        }
                        else {
                            $('#' + rowID + '_QUANTITY_FROM').val('.0');
                            $('#' + rowID + '_QUANTITY_FROM').attr('value', '.0');
                            $('#' + rowID + '_QUANTITY_TO').val('.0');
                            $('#' + rowID + '_QUANTITY_TO').attr('value', '.0');
                            mctrObj.showDialog($("#dialog-box"), "project trans type must be lbr to enter labor hours into the quantity field.", "error");

                        }


                        if (($('#' + rowID + '_QUANTITY_FROM').attr('class') == "red") || ($('#' + rowID + '_AMOUNT_FROM').attr('class') == "red")) {
                            if (($('#' + rowID + '_QUANTITY_FROM').val() == 0 && $('#' + rowID + '_AMOUNT_FROM').val() == 0)) {
                                $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass("white");
                                $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass("white");
                            }

                            else if (($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == ("LBR") && ($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == ("OTS") || $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == ("STR")))) {

                                $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass("white");
                                if (($('#' + rowID + '_QUANTITY_FROM').val() == 0)) {
                                    $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass("red");
                                }

                                else {
                                    $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass("white");

                                }
                            }

                            else {
                                if (($('#' + rowID + '_QUANTITY_FROM').val() == 0)) {
                                    $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass("white");
                                }

                                if (($('#' + rowID + '_AMOUNT_FROM').val() == 0)) {
                                    $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass("white");
                                }
                            }
                        }
                    }

                    else {
                        $('#' + rowID + '_QUANTITY_FROM').val(global_quantity_from);
                        $('#' + rowID + '_QUANTITY_FROM').attr('value', global_quantity_from);
                        mctrObj.showDialog($("#dialog-box"), "you either do not have the proper role or proper status setting to change this field.", "error");

                    }
                }
            }
            else {
                mctrObj.showDialog($("#dialog-box"), "Field must be of form 999,999.9", "error");
                $('#' + rowID + '_QUANTITY_FROM').val(global_quantity_from);
                $('#' + rowID + '_QUANTITY_FROM').attr('value', global_quantity_from);
            }
        });
        $('input[id*=_AMOUNT_TO]').on('change', function (e, obj) {
            e.preventDefault();

            var rowID = $(this).attr('row-id');
            var status_id = $('#StatusId').val();
            var bems_orig = $('#BemsOrig').val();
            var bems_acct = $('#BemsAcct').val();
            var SessionBems = $('#SessionBems').val();
            var mctrCreateForm = $('#form').serialize();
            var amount_to = $('#' + rowID + '_AMOUNT_TO').val();
            var BemsAcct = $('#BemsOrig').val();
            var global_amount_to = $('#' + rowID + '_AMOUNT_TO').attr('value');
            var activity_id_to = $('#' + rowID + '_ACTIVITY_ID_TO').val();
            var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
            var project_id_from = $('#' + rowID + '_PROJECT_ID_FROM').val();
            var account_from = $('#' + rowID + '_ACCOUNT_FROM').val();
            var proj_trans_type_from = $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val();
            var project_id_to = $('#' + rowID + '_PROJECT_ID_TO').val();
            var account_to = $('#' + rowID + '_ACCOUNT_TO').val();
            var proj_trans_type_to = $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val();
            var period_to = $('#PeriodTo').val();
            var fiscal_year = $('#fyear').val().trim();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var v_value_chosen = false;
            var v_setid = "";
            var v_rate = 0;
            var v_count = 0;
            var v_countEAS = 0;
            var v_countLOV = 0;
            var param = [];

            if (!isNaN(amount_to)) {
                if (amount_to != global_amount_to) {
                    if ((status_id == "OA" && bems_orig == SessionBems) || (status_id == "AA" && bems_acct == SessionBems)) {
                        if (activity_id_from == "" || period_to == "" || activity_id_from == "REQUIRED") {
                            $('#' + rowID + '_AMOUNT_TO').val(global_amount_to);
                            mctrObj.showDialog($("#dialog-box"), "Please enter the activity id (from) first.", "error");
                        }
                        else if (project_id_from == "" || project_id_from == "REQUIRED") {

                            $('#' + rowID + '_AMOUNT_TO').val(global_amount_to);
                            mctrObj.showDialog($("#dialog-box"), "Please enter the project id (from) first.", "error");
                        }

                        else if (account_from == "") {
                            $('#' + rowID + '_AMOUNT_TO').val(global_amount_to);
                            mctrObj.showDialog($("#dialog-box"), "Please enter the account (from) first.", "error");
                        }
                        else if (proj_trans_type_from == "" || proj_trans_type_from == "REQ") {
                            $('#' + rowID + '_AMOUNT_TO').val(global_amount_to);
                            mctrObj.showDialog($("#dialog-box"), "Project trans type (from) value must be entered first.", "error");
                        }
                        else if (activity_id_to == "" || activity_id_to == "REQUIRED") {
                            $('#' + rowID + '_AMOUNT_TO').val(global_amount_to);
                            mctrObj.showDialog($("#dialog-box"), "Please enter the activity id (to) first.", "error");
                        }
                        else if (project_id_to == "" || project_id_to == "REQUIRED") {
                            $('#' + rowID + '_AMOUNT_TO').val(global_amount_to);
                            mctrObj.showDialog($("#dialog-box"), "Please enter the project id (to) first.", "error");
                        }
                        else if (account_to == "" && proj_trans_type_to == "LBR") {
                            $('#' + rowID + '_AMOUNT_TO').val(global_amount_to);
                            mctrObj.showDialog($("#dialog-box"), "Please enter the Account(to) first.", "error");
                        }

                            // define
                        else {
                            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                            var mctrLineItem = $.extend(grid1, grid2, grid3);
                            param.push(mctrLineItem);
                            var mctrCreateFormq = $('#form').serialize();
                            var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                            var mctrCreateForm = $.extend({
                                mctrLineItem: param
                            }, mctrCreateFromJson);
                            mctrCreateForm.LineNo = $('#' + rowID + '_LINE_NO').val();
                            mctrCreateForm.StatusID = $('#StatusId').val();
                            mctrCreateForm.BemsOrig = $('#BemsOrig').val();
                            mctrCreateForm.py_cy_status = py_cy_status;
                            mctrCreateForm.fyear = $('#fyear').val().trim();


                            $.ajax({
                                url: getBaseUrl('/MctrCreateForm/mctrLineItemamountToPostTextItem'),
                                type: 'POST',
                                data: mctrCreateForm,
                                success: function (data) {
                                    if (data != '') {
                                        if (proj_trans_type_to == "LBR") {
                                            v_rate = data.V_CountDouble['rate'];
                                        }
                                        if (proj_trans_type_to != "LBR" || ($('#' + rowID + '_QUANTITY_TO').val() != 0 && (v_rate > 1 || -1 > v_rate))) {
                                            $('#' + rowID + '_AMOUNT_TO').val(global_amount_to);
                                            mctrObj.showDialog($("#dialog-box"), "wrong proj trans type (not lbr) / labor rate to change manually.", "error");

                                        }

                                        else {
                                            if ((py_cy_status == ("CY"))) {
                                                $('#' + rowID + '_AMOUNT_FROM').val(($('#' + rowID + '_AMOUNT_TO').val()) * -1);
                                                $('#' + rowID + '_AMOUNT_FROM').attr('value', ($('#' + rowID + '_AMOUNT_FROM').val()));
                                            }

                                            if (($('#' + rowID + '_QUANTITY_FROM').val() > 0 && $('#' + rowID + '_AMOUNT_FROM').val() < 0) || ($('#' + rowID + '_QUANTITY_FROM').val() < 0 && $('#' + rowID + '_AMOUNT_FROM').val() > 0) || ($('#' + rowID + '_QUANTITY_TO').val() > 0 && $('#' + rowID + '_AMOUNT_TO').val() < 0) || ($('#' + rowID + '_QUANTITY_TO').val() < 0 && $('#' + rowID + '_AMOUNT_TO').val() > 0)) {
                                                mctrObj.showDialog($("#dialog-box"), "warning: hours / amount signs reversed (negative vs positive).", "warning");
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
                else {
                    $('#' + rowID + '_AMOUNT_TO').val(global_amount_to);
                    $('#' + rowID + '_AMOUNT_TO').attr('value', global_amount_to);
                    mctrObj.showDialog($("#dialog-box"), "You either do not have the proper role or proper status setting to change this field", "error");
                }
            } else {
                $('#' + rowID + '_AMOUNT_TO').val(global_amount_to);
                $('#' + rowID + '_AMOUNT_TO').attr('value', global_amount_to);
                mctrObj.showDialog($("#dialog-box"), "Field must be of form 999,999,999.99", "error");
            }
        });
        $('input[id*=_AMOUNT_FROM]').on('change', function (e, obj) {
            e.preventDefault();
            var rowID = $(this).attr('row-id');
            var param = [];
            var status_id = $('#StatusId').val();
            var bems_orig = $('#BemsOrig').val();
            var SessionBems = $('#SessionBems').val();
            var bems_acct = $('#BemsAcct').val();
            var period_to = $('#PeriodTo').val();
            var period_from = $('#PeriodFrom').val();
            var fiscal_year = $('#fyear').val().trim();
            var ProjectTransCodeFrom = ['OTS', 'STR'];
            var v_rate;
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            if (!isNaN($('#' + rowID + '_AMOUNT_FROM').val())) {
                if (($('#' + rowID + '_AMOUNT_FROM').val() != $('#' + rowID + '_AMOUNT_FROM').attr('value') || $('#' + rowID + '_AMOUNT_FROM').attr('class') == "red")) {
                    if ((status_id == "OA" && bems_orig == SessionBems) || (status_id == "AA" && bems_acct == SessionBems)) {
                        if (($('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || period_to == "" || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == "REQUIRED")) {
                            $('#' + rowID + '_AMOUNT_FROM').val($('#' + rowID + '_AMOUNT_FROM').attr('value'));
                            mctrObj.showDialog($("#dialog-box"), "Please enter activity id (from).", "error");
                        }
                        else if (($('#' + rowID + '_PROJECT_ID_FROM').val() == "" || $('#' + rowID + '_PROJECT_ID_FROM').val() == "REQUIRED")) {
                            $('#' + rowID + '_AMOUNT_FROM').val($('#' + rowID + '_AMOUNT_FROM').attr('value'));
                            mctrObj.showDialog($("#dialog-box"), "Please enter Project ID (From).", "error");
                        }
                        else if (($('#' + rowID + '_ACCOUNT_FROM').val() == "")) {
                            $('#' + rowID + '_AMOUNT_FROM').val($('#' + rowID + '_AMOUNT_FROM').attr('value'));
                            mctrObj.showDialog($("#dialog-box"), "Please enter Account (From).", "error");
                        }
                        else if (($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "" || $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "REQ")) {
                            $('#' + rowID + '_AMOUNT_FROM').val($('#' + rowID + '_AMOUNT_FROM').attr('value'));
                            mctrObj.showDialog($("#dialog-box"), "Please enter Proj Trans Type (From).", "error");
                        }
                        else if (($('#' + rowID + '_ACTIVITY_ID_TO').val() == "" || $('#' + rowID + '_ACTIVITY_ID_TO').val() == "required")) {
                            $('#' + rowID + '_AMOUNT_FROM').val($('#' + rowID + '_AMOUNT_FROM').attr('value'));
                            mctrObj.showDialog($("#dialog-box"), "Please enter Activity (To).", "error");
                        }
                        else if (($('#' + rowID + '_PROJECT_ID_TO').val() == " " || $('#' + rowID + '_PROJECT_ID_TO').val() == "REQUIRED")) {
                            $('#' + rowID + '_AMOUNT_FROM').val($('#' + rowID + '_AMOUNT_FROM').attr('value'));
                            mctrObj.showDialog($("#dialog-box"), "Please enter Project (To).", "error");
                        }
                        else if (($('#' + rowID + '_ACCOUNT_TO').val() == "" && $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == "LBR")) {
                            $('#' + rowID + '_AMOUNT_FROM').val($('#' + rowID + '_AMOUNT_FROM').attr('value'));
                            mctrObj.showDialog($("#dialog-box"), "Please enter Account (To).", "error");
                        }

                        else {

                            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                            var mctrLineItem = $.extend(grid1, grid2, grid3);

                            //mctrLineItem.SETID = v_setid;
                            param.push(mctrLineItem);
                            var mctrCreateFormq = $('#form').serialize();
                            var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                            var mctrCreateForm = $.extend({
                                mctrLineItem: param
                            }, mctrCreateFromJson);
                            mctrCreateForm.LineNo = $('#' + rowID + '_LINE_NO').val();
                            mctrCreateForm.OrigBu = $('#OrigBu').val();
                            mctrCreateForm.fyear = $('#fyear').val().trim();

                            $.ajax({
                                type: "POST",
                                url: getBaseUrl('/MctrCreateForm/mctrLineItemamountfromPostTextItemOpenLOV'),
                                data: mctrCreateForm,
                                success: function (data) {
                                    if (data != '') {
                                        if (($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "LBR")) {
                                            if ((py_cy_status == "PY")) {
                                                v_rate = data.V_CountDouble['Vrate'];

                                            }
                                            else {
                                                v_rate = data.V_CountDouble['Vrateview'];
                                            }
                                        }
                                        if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() != "LBR" || $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "PRM" || v_rate == "" || (1 > v_rate && v_rate > -1)) {
                                            if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() != "LBR" || (py_cy_status == ("CY"))) {
                                                $('#' + rowID + '_AMOUNT_FROM').val((parseFloat($('#' + rowID + '_AMOUNT_FROM').val())).toFixed(2));
                                                $('#' + rowID + '_AMOUNT_TO').val(((parseFloat($('#' + rowID + '_AMOUNT_FROM').val()) * -1)).toFixed(2));
                                                $('#' + rowID + '_AMOUNT_TO').attr('value', ($('#' + rowID + '_AMOUNT_FROM').val()) * -1);

                                            }

                                            if ((parseFloat($('#' + rowID + '_QUANTITY_FROM').val()) > 0 && parseFloat($('#' + rowID + '_AMOUNT_FROM').val() < 0)) || (parseFloat($('#' + rowID + '_QUANTITY_FROM').val()) < 0 && parseFloat($('#' + rowID + '_AMOUNT_FROM').val()) > 0)) {
                                                mctrObj.showDialog($("#dialog-box"), "Warning: Hours / Amount signs reversed (Negative vs Positive).", "warning");
                                            }

                                            if (($('#' + rowID + '_AMOUNT_FROM').val() != $('#' + rowID + '_AMOUNT_FROM').attr('value'))) {
                                                $('#' + rowID + '_ttdValue').addClass("white");
                                                $('#' + rowID + '_yearValue').addClass("white");

                                            }
                                            $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass("white");
                                        }
                                        else {
                                            $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass("white");

                                            if (parseFloat($('#' + rowID + '_QUANTITY_FROM').val()) != 0) {
                                                if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "LBR" && ($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == "OTS" || $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == "STR")) {
                                                    if ((v_rate == 0 || (1 > v_rate && v_rate > -1))) {
                                                    }
                                                    else {
                                                        v_amount_from = ($('#' + rowID + '_QUANTITY_FROM').val() * v_rate).toFixed(2);

                                                        if ((parseFloat($('#' + rowID + '_AMOUNT_FROM').val()) != parseFloat($('#' + rowID + '_AMOUNT_FROM').attr('value'))) && (v_amount_from == parseFloat($('#' + rowID + '_AMOUNT_FROM').attr('value')))) {
                                                            $('#' + rowID + '_AMOUNT_FROM').val($('#' + rowID + '_AMOUNT_FROM').attr('value'));
                                                            mctrObj.showDialog($("#dialog-box"), "Wrong Proj Trans Type / Labor Rate to change amount manually.", "error");
                                                        }

                                                        else {
                                                            $('#' + rowID + '_AMOUNT_FROM').val($('#' + rowID + '_AMOUNT_FROM').attr('value'));
                                                            $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass("red");
                                                        }
                                                    }
                                                }

                                                else {
                                                    $('#' + rowID + '_QUANTITY_FROM').val('.0');
                                                    $('#' + rowID + '_QUANTITY_FROM').attr('value', '.0');
                                                    $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass("white");
                                                }
                                            }
                                        }
                                        // }


                                    }
                                },
                                error: function (data) {

                                    var exmsg = data.responseText;
                                    var ms = exmsg.ExceptionMessage;
                                    mctrObj.showDialog($("#dialog-box"), ms, "error");
                                }
                            });

                            //if ((py_cy_status == "PY"))
                            //{
                            //    if ((fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_FROM').val() != "")) {
                            //        v_setid = $('#' + rowID + '_AFFILIATE_FROM').val();
                            //    }

                            //    else {
                            //        v_setid = $('#' + rowID + '_HOME_BUGL_FROM').val();
                            //    }


                            //}

                        }
                    }
                    else {
                        $('#' + rowID + '_AMOUNT_FROM').val($('#' + rowID + '_AMOUNT_FROM').attr('value'));
                        mctrObj.showDialog($("#dialog-box"), "You either do not have the proper role or proper status setting to change this field.", "error");
                    }
                }
            } else {
                $('#' + rowID + '_AMOUNT_FROM').val($('#' + rowID + '_AMOUNT_FROM').attr('value'));
                mctrObj.showDialog($("#dialog-box"), "Field must be of form 999,999,999.99", "error");
            }

        });
        $('input[id*=_ADJUSTMENT_FROM]').change(function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var id = $(this).attr('row-id');
            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(id));
            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(id));
            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(id));

            var grid = $.extend(grid1, grid2, grid3);

            var origAdjustmentFrom = $('#' + id + '_ADJUSTMENT_FROM').attr('value');
            var sessionBems = $('#SessionBems').val();
            var formdata = $("#form").serializeArray();
            var mctrCreateForm = {
            };
            var forward = false;
            $(formdata).each(function (index, obj) {
                mctrCreateForm[obj.name] = obj.value;
            });

            if (!isNaN(grid.ADJUSTMENT_FROM)) {
                if (grid.ADJUSTMENT_FROM != 0 && mctrCreateForm.StatusId == "OA") {
                    //bootbox.dialog({
                    //    message: "Do you want to reset the adjustment amount to zero?",
                    //    buttons: {
                    //        YES: {
                    //            label: "YES!",
                    //            className: "btn-success",
                    //            callback: function () {

                    //            }
                    //        },
                    //        NO: {
                    //            label: "NO!",
                    //            className: "btn-danger",
                    //            callback: function () {
                    if ((mctrCreateForm.StatusId == "AA" && mctrCreateForm.BemsAcct == sessionBems) || (mctrCreateForm.StatusId == "CA" && mctrCreateForm.BemsCostAcct == sessionBems)) {
                        $('#' + id + '_ADJUSTMENT_FROM').val(origAdjustmentFrom);
                        $('#' + id + '_ADJUSTMENT_TO').val(origAdjustmentFrom);

                    }
                    else {

                        $('#' + id + '_ADJUSTMENT_FROM').val(".00");
                        $('#' + id + '_ADJUSTMENT_TO').val(".00");
                        mctrObj.showDialog($("#dialog-box"), "You do not have the proper Accountant Role && Status ID to change the field.", "error");

                    }

                    //            }
                    //        }
                    //    }
                    //});
                }

                if ((grid.ADJUSTMENT_FROM != origAdjustmentFrom) || (grid.ADJUSTMENT_FROM != "" && origAdjustmentFrom == "") || (grid.ADJUSTMENT_FROM == "" && origAdjustmentFrom != "")) {
                    if ((mctrCreateForm.StatusId == "AA" && mctrCreateForm.BemsAcct == sessionBems) ||
                       (mctrCreateForm.StatusId == "CA" && mctrCreateForm.BemsCostAcct == sessionBems)) {
                        if (grid.PROJ_TRANS_CODE_FROM == "STR" || grid.PROJ_TRANS_CODE_FROM == "OTS") {
                            $('#' + id + '_ADJUSTMENT_TO').val($('#' + id + '_ADJUSTMENT_FROM').val() * -1);
                            $('#' + id + '_ttdValue').addClass('white');
                            $('#' + id + '_yearValue').addClass('white');
                        }
                        else {
                            $('#' + id + '_ADJUSTMENT_FROM').val(origAdjustmentFrom);
                            mctrObj.showDialog($("#dialog-box"), "Adjustment  only allowed on Labor when Project Trans Code  value STR or OTS.", "error");
                        }

                    }
                    else {
                        $('#' + id + '_ADJUSTMENT_FROM').val(origAdjustmentFrom);
                        mctrObj.showDialog($("#dialog-box"), "You do not have the proper Accountant Role && Status ID to change the field.", "error");
                    }
                }


            } else {
                $('#' + id + '_ADJUSTMENT_FROM').val(origAdjustmentFrom);
                mctrObj.showDialog($("#dialog-box"), "Field must be of form 999,999,999.99", "error");
            }
        });


        $('a[id*=_inquireBtn]').on('click', function (e, obj) {

            var rowID = $(this).attr('row-id');

            var fiscal_year = $('#fyear').val().trim();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY'

            if ($('#MctrNo').val() != "") {
                if ($('#' + rowID + '_ACTIVITY_ID_FROM').val() != "" && $('#' + rowID + '_PROJ_TRANS_TYPE_FROM ').val() != "" && $('#' + rowID + '_PROJECT_ID_FROM').val() != "" && $('#' + rowID + '_ACCOUNT_FROM').val() != "" && $('#' + rowID + '_HOME_BUGL_FROM').val() != "" && (((py_cy_status == "CY" || fiscal_year < 2008) && $('#' + rowID + '_AFFILIATE_FROM').val() == "") || ((py_cy_status == "PY" || fiscal_year > 2007) && $('#' + rowID + '_AFFILIATE_FROM').val() != ""))) {

                    $(this).attr('href', getBaseUrl('/MctrCreateForm/TTDInquiryOnLoad') + '?rowId=' + rowID);
                }
                else {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    bootbox.alert("please enter the line item from key input fields (activity, project, trans type, aff, bugl) first.", function () {
                        $('#mctrModalXtraLarge').hide();
                    });

                }
            }
        });

    };


    var memoFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue ? cellvalue : "";
        return '<textarea row-id="' + options.rowId + '" class ="form-control" value="' + cellvalue + '" disabled/>';
    }
    var columnNames1 = ['Hours', 'Amount', 'Adj', 'GLPC Backup', 'Related Overhead Amt', ''];
    var colModel1 = [{ key: false, name: 'QUANTITY', index: 'QUANTITY', classes: 'align-right-input', sortable: false, editable: false, formatter: projectinputFormatter("QUANTITY", '', "readonly", 10) },
        { key: false, name: 'AMOUNT', index: 'AMOUNT', classes: 'align-right-input', editable: false, sortable: false, formatter: projectinputFormatter("AMOUNT", '', '', 12) },
        { key: false, name: 'ADJUSTMENT', index: 'ADJUSTMENT', classes: 'align-right-input', sortable: false, editable: false, search: true, formatter: projectinputFormatter("ADJUSTMENT", '', "readonly") },
        { key: false, name: 'VOUCHER_ID', index: 'last_name', sortable: false, editable: false, width: 280, title: false, search: false, formatter: GLPCFormatter },
        { key: false, name: 'OH_AMT', index: 'OH_AMT', sortable: false, classes: 'align-right-input', editable: false, search: true, formatter: projectinputFormatter("OH_AMT", "readonly", "readonly"), formatoptions: { decimalPlaces: 2 } },
        {
            name: 'popUpBtn', index: 'popUpBtn', sortable: false, resizable: false, search: false, align: 'center', title: false, sortable: false, width: 70, formatter: overHeadFormatter
        }
    ];
    mctrObj.CreateJqGrid('tblJQGridInner', '/MctrCreateForm/mctrLineItemOnLoad', 'POST', { mctrNo: $('#MctrNo').val() }, columnNames1, colModel1, true, 'SETID', [], 1000, '100%', 'desc', false, thirdGridComplitionFunction, null, afterInsertRow);

    //OverLay Grid Components
    var bumOrigFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue ? cellvalue : "";
        rowObject.BUM_CD7_TO_ORIG = rowObject.BUM_CD7_TO_ORIG ? rowObject.BUM_CD7_TO_ORIG : "";
        // return '<a data-toggle="modal" data-target="#mctrModal" id=' + options.rowId + '_bumOrigpopUpFrombtn class="btn btn-default btn-xs">&gt;</a></br><input row-id="' + options.rowId + '" id="' + options.rowId + '_BUM_CD7_TO_ORIG" value="' + cellvalue + '" readonly>';
        return '<a href="#" data-toggle="modal" row-id="' + options.rowId + '" id=' + options.rowId + '_bumOrigpopUpFrombtn class="btn btn-default btn-xs">&gt;</a></br><input row-id="' + options.rowId + '" id="' + options.rowId + '_BUM_CD7_TO_ORIG" value="' + rowObject.BUM_CD7_TO_ORIG + '" readonly>';
    }

    var wpdBtnFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue ? cellvalue : "";
        //return '<input  id="' + options.rowId + '_wpdValue" value="' + cellvalue + '" disabled></br><a data-toggle="modal" data-target="#mctrModal" data-backdrop="static" href="' + getBaseUrl('/MctrCreateForm/getRgWpdToLOV') + '?rowId=' + options.rowId + '" id=' + options.rowId + '_wpdTopopUpbtn class="btn btn-default btn-xs">&gt;</a>';
        return '<label class="filler"></label></br><a href="#" data-toggle="modal" row-id="' + options.rowId + '" row="' + options.rowId + '"id=' + options.rowId + '_wpdTopopUpbtn class="btn btn-default btn-xs">&gt;</a>';
    }


    var wpdInputFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue ? cellvalue : "";
        return '<input row-id="' + options.rowId + '" value="' + cellvalue + '" ></br><input row-id="' + options.rowId + '" value="' + cellvalue + '" >';
    }

    var homeLocFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue ? cellvalue : "";
        return '<input row-id="' + options.rowId + '" id="' + options.rowId + '_homeLocFrom" value="' + cellvalue + '" ></br><input row-id="' + options.rowId + '" id="' + options.rowId + '_homeLocTo"  value="' + cellvalue + '">';
    }

    var BulkBtnFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue ? cellvalue : "";
        return '<label class="filler"></label></br><a row-id="' + options.rowId + '" href="#" data-toggle="modal" row="' + options.rowId + '" id=' + options.rowId + '_BulkpopUpToBtn class="btn btn-default btn-xs">&gt;</a>';
    }
    var recordsCompleted;
    var gridCompleteFnFirstGrid = function () {
        setTimeout(addRowForGrid('tblJQGridFirst'), 30);
        $('#title').focus();
        $("a[id*=_selectbtn]").keydown(function (e) {
            if (e.which == 9) {
                $('#' + $(this).attr('row-id') + '_ACTIVITY_ID_TO').focus();
                $('.jQGridRow').find('input[focus=true],a[focus=true]').removeAttr('focus');
                $('#' + $(this).attr('row-id') + '_ACTIVITY_ID_TO').attr('focus', true);
                e.preventDefault();
                e.stopPropagation();
            }
        });
        $("input[id*=_ACTIVITY_ID_FROM]").keydown(function (e) {
            e.stopImmediatePropagation();
            if (e.which == 9) {
                $('#' + $(this).attr('row-id') + '_projFrom').focus();
                $('.jQGridRow').find('input[focus=true],a[focus=true]').removeAttr('focus');
                $('#' + $(this).attr('row-id') + '_projFrom').attr('focus', true);
                e.preventDefault();
                e.stopPropagation();
            }
        });
        $("input[id*=_ACTIVITY_ID_TO]").keydown(function (e) {
            e.stopImmediatePropagation();
            if (e.which == 9) {
                $('#' + $(this).attr('row-id') + '_projTo').focus();
                $('.jQGridRow').find('input[focus=true],a[focus=true]').removeAttr('focus');
                $('#' + $(this).attr('row-id') + '_projTo').attr('focus', true);
                e.preventDefault();
                e.stopPropagation();
            }
        });

        if ($('#queryFlag').val() != "True") {
            $('#tblJQGridFirst').find('#1').find('input ,a').attr('disabled', false);
            $('#tblJQGridCover').find('#1').find('input ,a').attr('disabled', false);
            $('#tblJQGridInner').find('#1').find('input ,a').attr('disabled', false);
        }

        if ($('#Linesfrom').val() > 0) {
            $('#batchBut').hide();
        }

        for (var gridDataLength = $("#tblJQGridCover").getGridParam('userData').length ; gridDataLength <= 3; gridDataLength++) {
            if (gridDataLength != 1 && $('#queryFlag').val() == "False") {
                //    $('#tblJQGridFirst').find('#' + gridDataLength).find('input ,a').attr('disabled', true);
                //     $('#tblJQGridCover').find('#' + gridDataLength).find('input ,a').attr('disabled', true);
                //    $('#tblJQGridInner').find('#' + gridDataLength).find('input ,a').attr('disabled', true);
            }
            else if ($('#queryFlag').val() == "True") {

                $('#tblJQGridFirst').find('#' + gridDataLength).find('input ,a').attr('disabled', true);
                $('#tblJQGridCover').find('#' + gridDataLength).find('input ,a').attr('disabled', true);
                $('#tblJQGridInner').find('#' + gridDataLength).find('input ,a').attr('disabled', true);
                $('#' + gridDataLength + '_ttdbtn ').removeAttr('disabled');
                $('#' + gridDataLength + '_yearbtn ').removeAttr('disabled');
                $('#' + gridDataLength + '_inquireBtn ').removeAttr('disabled');
                $('#' + gridDataLength + '_ttdValue ').removeAttr('disabled');
                $('#' + gridDataLength + '_yearValue ').removeAttr('disabled');
                $('#' + gridDataLength + '_overHeadBtnFrom ').removeAttr('disabled');
                $('#' + gridDataLength + '_overHeadBtnTo ').removeAttr('disabled');

                //i++;

                $('#tblJQGridFirst').find('#1').find('input ,a').attr('disabled', true);
                $('#tblJQGridCover').find('#1').find('input ,a').attr('disabled', true);
                $('#tblJQGridInner').find('#1').find('input ,a').attr('disabled', true);
                $('#1_ttdbtn ').removeAttr('disabled');
                $('#1_yearbtn ').removeAttr('disabled');
                $('#1_inquireBtn ').removeAttr('disabled');
                $('#1_ttdValue ').removeAttr('disabled');
                $('#1_yearValue ').removeAttr('disabled');
                $('#1_overHeadBtnFrom ').removeAttr('disabled');
                $('#1_overHeadBtnTo ').removeAttr('disabled');

                //i++;
            }
        }
        $('input[id*=_MTL_JRNL]').click(function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var mtljrnl = $(this).is(':checked');
            if (($('#StatusId').val() == "AA" || $('#StatusId').val() == "CA" || $('#StatusId').val() == "SR" || $('#StatusId').val() == "JA") && $('#' + rowID + '_ACTIVITY_ID_FROM').val() != "") {
                $.ajax({
                    url: getBaseUrl('/MctrCreateForm/mctrLineItemcbMtlJrnlWhenCheckboxChanged'),
                    type: 'POST',
                    data: { mtljrnl: mtljrnl },
                    success: function (data) {

                        if (mtljrnl != data) {
                            $('#' + rowID + '_MTL_JRNL').prop('checked', true);
                            $('#' + rowID + '_MTL_JRNL').val("true");
                            $('#' + rowID + '_LINE_NO').removeClass().addClass('black');
                            // $('#' + rowID + '_LINE_NO').removeAttr('readonly').addClass('black').attr('disabled', 'disabled')
                            $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass('black');
                            $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass('black');
                            $('#' + rowID + '_ADJUSTMENT_FROM').removeClass().addClass('black');
                            $('#' + rowID + '_QUANTITY_TO').addClass('black');
                            //$('#'+ rowID + '_QUANTITY_TO').removeAttr('readonly').addClass('black').attr('disabled', 'disabled')
                            $('#' + rowID + '_AMOUNT_TO').removeClass().addClass('black');
                            $('#' + rowID + '_ADJUSTMENT_TO').removeClass().addClass('black');//field_white_on_black
                            //$('#' + rowID + '_ADJUSTMENT_TO').removeAttr('readonly').addClass('black').attr('disabled', 'disabled')
                        }
                        else {
                            $('#' + rowID + '_MTL_JRNL').prop('checked', false);
                            $('#' + rowID + '_MTL_JRNL').val("false");
                            $('#' + rowID + '_LINE_NO').removeClass('black');//.addClass('black');//.addClass('field_black_on_gray');
                            //$('#' + rowID + '_LINE_NO').removeAttr('readonly').addClass('black').attr('disabled', 'disabled')
                            $('#' + rowID + '_QUANTITY_FROM').removeClass('black');//.addClass('black');//field_black_on_white
                            $('#' + rowID + '_AMOUNT_FROM').removeClass('black');//.addClass('black');//field_black_on_white
                            $('#' + rowID + '_ADJUSTMENT_FROM').removeClass('black');//.addClass('black');//field_black_on_white
                            $('#' + rowID + '_QUANTITY_TO').removeClass('black');//.addClass('black');//.addClass('field_black_on_gray');
                            // $('#' + rowID + '_QUANTITY_TO').removeAttr('readonly').addClass('black').attr('disabled', 'disabled')
                            $('#' + rowID + '_AMOUNT_TO').removeClass('black');//addClass('black');//field_black_on_white
                            $('#' + rowID + '_ADJUSTMENT_TO').removeClass('black');//.addClass('black');//.addClass('field_black_on_gray');
                            //$('#' +rowID + '_ADJUSTMENT_TO').removeAttr('readonly').addClass('black').attr('disabled', 'disabled')
                        }
                        $('#' + rowID + '_ACTIVITY_ID_TO').focus();

                    }
                });
            }
            else {
                mctrObj.showDialog($("#dialog-box"), "You either do not have the proper role or proper status setting to change this field.", "error");
                if ($('#' + rowID + '_MTL_JRNL').prop('checked') == false) {
                    $('#' + rowID + '_MTL_JRNL').prop('checked', true);
                } else {
                    $('#' + rowID + '_MTL_JRNL').prop('checked', false);
                }

            }
        });
        $('.ui-jqgrid input').change(function () {
            var rowID = $(this).attr('row-id');
            $('#' + rowID + '_ACTIVITY_ID_FROM').attr('row-edit', true);
        });

        $('a[id*=selectbtn]').unbind('click').bind('click', function (e, obj) {
            var rowID = $(this).attr("row-id");
            var LineNo = $('#' + rowID + '_LINE_NO').val();
            var activity_id_to = $('#' + rowID + '_ACTIVITY_ID_TO').val();
            var status_id = $('#StatusId').val();
            var bems_orig = $('#BemsOrig').val();
            var bems_acct = $('#BemsAcct').val();
            var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();

            //  mctrLineItembutCopyWhenButtonPressed(e, obj);
            //if ($('#' + rowID + '_MTL_JRNL').prop("checked")) {

            if (($('#' + rowID + '_ACTIVITY_ID_TO').val() == "" && $('#' + rowID + '_ACTIVITY_ID_FROM').val() == "")) {
                if ((status_id == 'OA' && bems_orig == $('#SessionBems').val())) {
                    var savedLines = parseInt($('#Linesfrom').val());
                    var currentLines = 0;
                    $.each($('#tblJQGridCover').getGridParam('data'), function (key, value) {
                        var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(value['_id_']));
                        if (grid1.ACTIVITY_ID_FROM !== '') {
                            currentLines = $('#tblJQGridCover').getGridParam('data')[key]._id_;
                        }

                    });
                    if ((!($('#tblJQGridFirst').find("*").hasClass("red") || $('#tblJQGridCover').find("*").hasClass("red")))) {
                        if ((savedLines == currentLines)) {
                            if ($('input[id*=ACTIVITY_ID_FROM][row-edit=true]').length == 0 || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || $('#' + rowID + '_ACTIVITY_ID_TO').val() == "") {
                                if (rowID > 1) {
                                    var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(parseInt(rowID) - 1));
                                    var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(parseInt(rowID) - 1));
                                    var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(parseInt(rowID) - 1));
                                    var colNamesGrid1 = [];
                                    var colNamesGrid2 = [];
                                    var colNamesGrid3 = [];
                                    $.each($("#tblJQGridFirst").getGridParam('colModel'), function (i, obj) {
                                        if (!(grid1[obj.name])) {
                                            grid1[obj.name] = '';
                                        }
                                    });
                                    $.each($("#tblJQGridCover").getGridParam('colModel'), function (i, obj) {
                                        if (!(grid2[obj.name])) {
                                            grid2[obj.name] = '';
                                        }
                                    });
                                    $.each($("#tblJQGridInner").getGridParam('colModel'), function (i, obj) {
                                        if (!(grid3[obj.name])) {
                                            grid3[obj.name] = '';
                                        }
                                    });
                                    var prevRowId = rowID - 1;
                                    var actToClass = $('#' + prevRowId + '_ACTIVITY_ID_TO').attr('class');
                                    var actToClassFlag = $('#' + prevRowId + '_ACTIVITY_ID_TO').attr('red-flag');
                                    var actFromClass = $('#' + prevRowId + '_ACTIVITY_ID_FROM').attr('class');
                                    var actFromClassFlag = $('#' + prevRowId + '_ACTIVITY_ID_FROM').attr('red-flag');
                                    var deptToClass = $('#' + prevRowId + '_WORK_DEPT_TO').attr('class');
                                    var deptToClassFlag = $('#' + prevRowId + '_WORK_DEPT_TO').attr('red-flag');
                                    var deptFromClass = $('#' + prevRowId + '_WORK_DEPT_FROM').attr('class');
                                    var deptFromClassFlag = $('#' + prevRowId + '_WORK_DEPT_FROM').attr('red-flag');
                                    var homeDeptToClass = $('#' + prevRowId + '_HOME_DEPT_TO').attr('class');
                                    var homeDeptToClassFlag = $('#' + prevRowId + '_HOME_DEPT_TO').attr('red-flag');
                                    var homeDeptFromClass = $('#' + prevRowId + '_HOME_DEPT_FROM').attr('class');
                                    var homeDeptFromClassFlag = $('#' + prevRowId + '_HOME_DEPT_FROM').attr('red-flag');

                                    $("#tblJQGridFirst").delRowData(rowID);
                                    $("#tblJQGridCover").delRowData(rowID);
                                    $("#tblJQGridInner").delRowData(rowID);
                                    $("#tblJQGridFirst").addRowData(rowID, grid1, 'after', parseInt(rowID) - 1);
                                    $("#tblJQGridCover").addRowData(rowID, grid2, 'after', parseInt(rowID) - 1);
                                    $("#tblJQGridInner").addRowData(rowID, grid3, 'after', parseInt(rowID) - 1);
                                    var nextRowId = prevRowId + 1;
                                    $('#' + nextRowId + '_LINE_NO').val(nextRowId);
                                    $('#' + nextRowId + '_ACTIVITY_ID_TO').attr('class', actToClass);
                                    $('#' + nextRowId + '_ACTIVITY_ID_TO').attr('red-flag', actToClassFlag);
                                    $('#' + nextRowId + '_PROJECT_ID_TO').attr('class', actToClass);
                                    $('#' + nextRowId + '_ACTIVITY_ID_FROM').attr('class', actFromClass);
                                    $('#' + nextRowId + '_ACTIVITY_ID_FROM').attr('red-flag', actFromClassFlag);
                                    $('#' + nextRowId + '_PROJECT_ID_FROM').attr('class', actFromClass);
                                    $('#' + nextRowId + '_WORK_DEPT_TO').attr('class', deptToClass);
                                    $('#' + nextRowId + '_WORK_DEPT_TO').attr('red-flag', deptToClassFlag);
                                    $('#' + nextRowId + '_WORK_DEPT_FROM').attr('class', deptFromClass);
                                    $('#' + nextRowId + '_WORK_DEPT_FROM').attr('red-flag', deptFromClassFlag);
                                    $('#' + nextRowId + '_HOME_DEPT_TO').attr('class', homeDeptToClass);
                                    $('#' + nextRowId + '_HOME_DEPT_TO').attr('red-flag', homeDeptToClassFlag);
                                    $('#' + nextRowId + '_HOME_DEPT_FROM').attr('class', homeDeptFromClass);
                                    $('#' + nextRowId + '_HOME_DEPT_FROM').attr('red-flag', homeDeptFromClassFlag);
                                    //$('#' + nextRowId + '_OH_AMT_FROM').val(.00);
                                    //$('#' + nextRowId + '_OH_AMT_TO').val(.00);
                                    $('#' + nextRowId + '_QUANTITY_FROM').val('.0');
                                    $('#' + nextRowId + '_QUANTITY_TO').val('.0');
                                    $('#' + nextRowId + '_AMOUNT_FROM').val('.00');
                                    $('#' + nextRowId + '_AMOUNT_TO').val('.00');
                                    $('#' + nextRowId + '_ADJUSTMENT_FROM').val('.00');
                                    $('#' + nextRowId + '_ADJUSTMENT_TO').val('.00');
                                }
                                else {
                                    // e.preventDefault();
                                    mctrLineItembutCopyWhenButtonPressed(e, obj, rowID);
                                }
                            }
                            else {
                                mctrObj.showDialog($("#dialog-box"), "please save outstanding changes before using copy button.", "error");
                            }
                        }
                        else {
                            mctrObj.showDialog($("#dialog-box"), "please save outstanding changes before using copy button.", "error");
                        }
                    }
                    else {
                        mctrObj.showDialog($("#dialog-box"), "please save outstanding changes before using copy button.", "error");
                    }
                } else {
                    mctrObj.showDialog($("#dialog-box"), "you need to be the originator and status must be set to oa to use the copy button.", "error");
                }
            }
            else {
                //  e.preventDefault();
                mctrLineItembutCopyWhenButtonPressed(e, obj, rowID);
            }

        });


        $('a[id*=lineItemDeleteBtn]').click(function (e, obj) {
            e.stopImmediatePropagation();
            var no = $(this).attr("row-id");
            var id = $('#' + no + '_LINE_NO').val();

            if ($('#StatusId').val() == "OA" || ($('#StatusId').val() == "AA" && $('#' + no + '_PROJ_TRANS_TYPE_FROM').val() == '' && $('#' + no + '_ACTIVITY_ID_FROM').val() == '') || $('#StatusId').val() == "AA" && $('#' + no + '_PROJ_TRANS_CODE_FROM').val() == 'FRG' && $('#' + no + '_PROJ_TRANS_CODE_FROM').val() != '') {
                bootbox.confirm("Are you sure you want to delete the Line Item ? Click 'OK' button to accept.", function (result) {
                    if (result) {
                        var rowInsert = $('#' + no + '_LINE_NO').attr('row-insert');
                        if (rowInsert == 'true') {
                            $('#tblJQGridCover').jqGrid('delRowData', no);
                            $('#tblJQGridInner').jqGrid('delRowData', no);
                            $('#tblJQGridFirst').jqGrid('delRowData', no);
                        }
                        else {
                            $.ajax({
                                url: getBaseUrl('/MctrCreateForm/mctrLineItemPreDelete') + '?mctrNo=' + $('#MctrNo').val() + '&Lineno=' + id,
                                type: "POST",
                                traditional: true,
                                contentType: 'application/json; charset=utf-8',
                                success: function (data) {
                                    if (data != null) {
                                        //mctrObj.showDialog($("#dialog-box"), "Deleted Successfully", "success")
                                        $.ajax({
                                            url: getBaseUrl('/MctrCreateForm/mctrLineItemDelete') + '?mctrNo=' + $('#MctrNo').val() + '&Lineno=' + id,
                                            type: "POST",
                                            traditional: true,
                                            contentType: 'application/json; charset=utf-8',
                                            success: function (data) {
                                                if (data != null) {
                                                    mctrObj.showDialog($("#dialog-box"), "Deleted Successfully", "success");
                                                    postDelete(data[0].LINE_NO);

                                                }

                                            },
                                            error: function (jqXHR, textStatus, errorThrown) {

                                            }
                                        });
                                    }

                                },
                                error: function (jqXHR, textStatus, errorThrown) {

                                }


                            });
                        }
                    }

                });
            }

            else if ($('#StatusId').val() == "AA" && $('#' + no + '_PROJ_TRANS_CODE_FROM').val() != '' && (
$('#' + no + '_PROJ_TRANS_CODE_FROM').val() != "FRG") || ($('#' + no + '_PROJ_TRANS_CODE_FROM').val() == '')) {
                mctrObj.showDialog($("#dialog-box"), "Only man Rated Fringe (FRG) Line Items can be deleted", "error");

            }
            else {

                mctrObj.showDialog($("#dialog-box"), "Deleting Line Item entry is not allowed.", "error");
            }
        });
        $('#1_ACTIVITY_ID_FROM').on('focus', function (e, obj) {
            $('#batchBut').hide();
        });
        $('input[id*=_ACTIVITY_ID_FROM]').on('change', function (e, obj) {
            var id = $(this).attr('row-id');
            //if ($('input[id*=_ACTIVITY_ID_FROM]').val() != "" || $('input[id*=_ACTIVITY_ID_FROM]').val() == undefined) {
            //    $('input[id*=_ACTIVITY_ID_FROM]').removeClass().addClass("white");
            //}
            $('#' + id + '_ACTIVITY_ID_FROM').val($('#' + id + '_ACTIVITY_ID_FROM').val().toUpperCase());
            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(id));
            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(id));
            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(id));

            var mctrLineItem = $.extend(grid1, grid2, grid3);

            var message = ValidaitonsCreateFormObj.mctrLineItemactivityIdFromPostTextItem(mctrLineItem, id);
            e.preventDefault();
            if (message != undefined) {
                mctrObj.showDialog($("#dialog-box"), message, "error");
            }
        });
        $('input[id*=_ACTIVITY_ID_TO]').on('change', function (e, obj) {
            var id = $(this).attr('row-id');
            $('#' + id + '_ACTIVITY_ID_TO').val($('#' + id + '_ACTIVITY_ID_TO').val().toUpperCase());
            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(id));
            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(id));
            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(id));

            var mctrLineItem = $.extend(grid1, grid2, grid3);

            var message = ValidaitonsCreateFormObj.mctrLineItemactivityIdToPostTextItem(mctrLineItem, id);
            if (message != undefined) {
                mctrObj.showDialog($("#dialog-box"), message, "error");
            }
        });
    };
    function mctrLineItembutCopyWhenButtonPressed(e, obj, id) {

        var rowID = id;
        var LineNo = $('#' + rowID + '_LINE_NO').val();
        var activity_id_to = $('#' + rowID + '_ACTIVITY_ID_TO').val();
        var status_id = $('#StatusId').val();
        var bems_orig = $('#BemsOrig').val();
        var status_id = $('#StatusId').val();
        var bems_acct = $('#BemsAcct').val();
        var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
        var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();

        if ((status_id == 'OA' && bems_orig == $('#SessionBems').val())) {
            if (activity_id_from == "" || activity_id_from == undefined) {
                var savedLines = parseInt($('#Linesfrom').val());
                var currentLines = 0;
                $.each($('#tblJQGridCover').getGridParam('data'), function (key, value) {
                    var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(value['_id_']));
                    if (grid1.ACTIVITY_ID_FROM !== '') {
                        currentLines = $('#tblJQGridCover').getGridParam('data')[key]._id_;
                    }

                });
                if (!($('#tblJQGridFirst').find("*").hasClass("red") || $('#tblJQGridCover').find("*").hasClass("red") || $('#tblJQGridInner').find('input').hasClass("red"))) {
                    //if (savedLines == currentLines) {
                    $('#' + rowID + '_LINE_NO').val("");
                    $('#' + rowID + '_QUANTITY_FROM').val('.0');
                    $('#' + rowID + '_AMOUNT_FROM').val('.00');
                    $('#' + rowID + '_ADJUSTMENT_FROM').val('.00');
                    $('#' + rowID + '_QUANTITY_TO').val('.00');
                    $('#' + rowID + '_AMOUNT_TO').val('.0');
                    $('#' + rowID + '_ADJUSTMENT_TO').val('.00');
                    // $('#' + rowID + '_OH_AMT_FROM').val('.00');
                    // $('#' + rowID + '_OH_AMT_TO').val('.00');
                    $('#' + rowID + '_ttdValue').text("");
                    $('#' + rowID + '_yearValue').text("");
                    //   $('#cb_mtl_jrnl').checkBoxValue = "n";
                    //to be checked 
                    $('#' + rowID + '_LINE_NO').removeClass();//.addClass("gray");//black_on_gray
                    $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass("white");//black_on_white
                    $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass("white");//black_on_white
                    $('#' + rowID + '_ADJUSTMENT_FROM').removeClass().addClass("white");//black_on_white
                    $('#' + rowID + '_QUANTITY_TO').removeClass();//.addClass("gray");//black_on_gray
                    $('#' + rowID + '_AMOUNT_TO').removeClass().addClass("white");//black_on_white
                    $('#' + rowID + '_ADJUSTMENT_TO').removeClass();//.addClass("gray");//black_on_gray
                    $('#' + rowID + '_ttdValue').addClass("white");
                    $('#' + rowID + '_yearValue').addClass("white");

                    var ACTY_RED_FLG_FROM = $('#' + rowID + '_ACTIVITY_ID_FROM').attr('red-flag');
                    if (ACTY_RED_FLG_FROM == "Y") {
                        $('#' + rowID + '_ACTIVITY_ID_FROM').removeClass().addClass("orange");
                        $('#' + rowID + '_ACTIVITY_ID_FROM').attr('red-flag', 'Y');
                        $('#' + rowID + '_PROJECT_ID_FROM').removeClass().addClass("orange");

                    }
                    var ACTY_RED_FLG_TO = $('#' + rowID + '_ACTIVITY_ID_TO').attr('red-flag');
                    if (ACTY_RED_FLG_TO == "Y") {
                        $('#' + rowID + '_ACTIVITY_ID_TO').removeClass().addClass("orange");
                        $('#' + rowID + '_ACTIVITY_ID_TO').attr('red-flag', 'Y');
                    }
                    var DEPT_RED_FLG_FROM = $('#' + rowID + '_HOME_DEPT_FROM').attr('red-flag');
                    if (DEPT_RED_FLG_FROM == "Y") {
                        $('#' + rowID + '_HOME_DEPT_FROM').removeClass().addClass("orange");
                        $('#' + rowID + '_HOME_DEPT_FROM').attr('red-flag', 'Y');

                    }
                    var DEPT_RED_FLG_TO = $('#' + rowID + '_HOME_DEPT_TO').attr('red-flag');
                    if (DEPT_RED_FLG_TO == "Y") {
                        $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass("orange");
                        $('#' + rowID + '_HOME_DEPT_TO').attr('red-flag', 'Y');
                    }
                    var WORK_DEPT_RED_FLG_FROM = $('#' + rowID + '_WORK_DEPT_FROM').attr('red-flag');
                    if (WORK_DEPT_RED_FLG_FROM == "Y") {
                        $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass("orange");
                    }
                    if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "LBR") {
                        $('#' + rowID + '_MATERIAL_QUANTITY_FROM').val('');
                        $('#' + rowID + '_MATERIAL_QUANTITY_TO').val('');
                    }
                    else if ($('#' + rowID + '_MATERIAL_QUANTITY_FROM').val() != "") {
                        $('#' + rowID + '_MATERIAL_QUANTITY_TO').val($('#' + rowID + '_MATERIAL_QUANTITY_FROM').val() * (-1));
                    }
                    else {
                        $('#' + rowID + '_MATERIAL_QUANTITY_TO').val($('#' + rowID + '_MATERIAL_QUANTITY_FROM').val());
                    }
                }
                else {
                    mctrObj.showDialog($("#dialog-box"), "please save outstanding changes before using copy button.", "error");
                }
                //}
                //else {
                //    mctrObj.showDialog($("#dialog-box"), "please save outstanding changes before using copy button.", "error");
                //}
            }
            else if (activity_id_to == "" || activity_id_to == undefined) {
                $('#' + rowID + '_ACTIVITY_ID_TO').val($('#' + rowID + '_ACTIVITY_ID_FROM').val());
                //   $('#' + rowID + '_OH_BASE_YR_TO').val($('#' + rowID + '_FISCAL_YEAR').val());
                $('#' + rowID + '_HOME_BUGL_TO').val($('#' + rowID + '_HOME_BUGL_FROM').val());
                $('#' + rowID + '_WORK_BUGL_TO').val($('#' + rowID + '_WORK_BUGL_FROM').val());
                $('#' + rowID + '_PROJECT_ID_TO').val($('#' + rowID + '_PROJECT_ID_FROM').val());
                $('#' + rowID + '_CONTRACT_NUM_TO').val($('#' + rowID + '_CONTRACT_NUM_FROM').val());
                $('#' + rowID + '_ACCOUNT_TO').val($('#' + rowID + '_ACCOUNT_FROM').val());
                $('#' + rowID + '_BUM_CD7_TO').val($('#' + rowID + '_BUM_CD7_FROM').val());
                $('#' + rowID + '_CUST_TYPE_CD7_TO').val($('#' + rowID + '_CUST_TYPE_CD7_FROM').val());
                $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val());
                $('#' + rowID + '_PROJ_TRANS_CODE_TO').val($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val());
                $('#' + rowID + '_STAT_CODE_TO').val($('#' + rowID + '_STAT_CODE_FROM').val());
                $('#' + rowID + '_UOM_TO').val($('#' + rowID + '_UOM_FROM').val());
                $('#' + rowID + '_AFFILIATE_TO').val($('#' + rowID + '_AFFILIATE_FROM').val());
                $('#' + rowID + '_HOME_DEPT_TO').val($('#' + rowID + '_HOME_DEPT_FROM').val());
                $('#' + rowID + '_HOME_LOC_TO').val($('#' + rowID + '_HOME_LOC_FROM').val());
                $('#' + rowID + '_HOME_POOL_TO').val($('#' + rowID + '_ HOME_POOL_FROM').val());
                $('#' + rowID + '_LABOR_RATE_CD7_TO').val($('#' + rowID + '_LABOR_RATE_CD7_FROM').val());
                $('#' + rowID + '_CLASS_CD_TO').val($('#' + rowID + '_CLASS_CD_FROM').val());
                $('#' + rowID + '_WORK_DEPT_TO').val($('#' + rowID + '_WORK_DEPT_FROM').val());
                $('#' + rowID + '_WORK_LOC_TO').val($('#' + rowID + '_WORK_LOC_FROM').val());
                $('#' + rowID + '_WORK_POOL_TO').val($('#' + rowID + '_WORK_POOL_FROM').val());
                $('#' + rowID + '_RSC_TO').val($('#' + rowID + '_RSC_FROM').val());
                $('#' + rowID + '_RSC_TO').attr('value', $('#' + rowID + '_RSC_FROM').val());
                $('#' + rowID + '_WPD_TO').val($('#' + rowID + '_WPD_FROM').val());
                $('#' + rowID + '_BULK_TO').val($('#' + rowID + '_BULK_FROM').val());
                $('#' + rowID + '_CAUSAL_ID_TO').val($('#' + rowID + '_CAUSAL_ID_FROM').val());
                $('#' + rowID + '_ESTMTG_PRICG_CD_TO').val($('#' + rowID + '_ESTMTG_PRICG_CD_FROM').val());
                $('#' + rowID + '_PO_ID_TO').val($('#' + rowID + '_PO_ID_FROM').val());
                $('#' + rowID + '_PART_NO_TO').val($('#' + rowID + '_PART_NO_FROM').val());
                $('#' + rowID + '_EPACS_CTT_TO').val($('#' + rowID + '_EPACS_CTT_FROM').val());
                $('#' + rowID + '_SHOP_ORDER_TO').val($('#' + rowID + '_SHOP_ORDER_FROM').val());
                $('#' + rowID + '_PO_LINE_TO').val($('#' + rowID + '_PO_LINE_FROM').val());
                if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "LBR") {
                    $('#' + rowID + '_MATERIAL_QUANTITY_FROM').val('');
                    $('#' + rowID + '_MATERIAL_QUANTITY_TO').val('');
                }

                else if ($('#' + rowID + '_MATERIAL_QUANTITY_FROM').val() != "") {
                    $('#' + rowID + '_MATERIAL_QUANTITY_TO').val($('#' + rowID + '_MATERIAL_QUANTITY_FROM').val() * (-1));
                }
                else {
                    $('#' + rowID + '_MATERIAL_QUANTITY_TO').val($('#' + rowID + '_MATERIAL_QUANTITY_FROM').val());
                }
                // identify to fields that need to be validated.
                if ($('#' + rowID + '_PROJECT_ID_TO').val() != "" || ($('#' + rowID + '_ACCOUNT_TO').val() != "" && $('#' + rowID + '_PROJECT_ID_TO').val() == "")) {
                    $('#' + rowID + '_PROJECT_ID_TO').addClass("red");
                }
                else {
                    $('#' + rowID + '_PROJECT_ID_TO').removeClass('red');
                    $('#' + rowID + '_ACCOUNT_TO').removeClass().addClass("white");
                }
                if ($('#' + rowID + '_HOME_DEPT_TO').val() != "" && $('#' + rowID + '_HOME_DEPT_TO').val() == "") {
                    $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass("red");
                    // $('#' + rowID + '_HOME_DEPT_TO').attr("red-flag","Y");
                    $('#' + rowID + '_HOME_LOC_TO').removeClass().addClass("white");
                }
                else if ($('#' + rowID + '_HOME_DEPT_TO').val() != "" && $('#' + rowID + '_HOME_DEPT_TO').val() != "") {
                    $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass("white");
                    $('#' + rowID + '_HOME_DEPT_TO').attr("red-flag", "N");
                    $('#' + rowID + '_HOME_LOC_TO').removeClass().addClass("red");
                }
                else {
                    $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass("white");
                    if ($('#' + rowID + '_HOME_LOC_TO').val() != "" && $('#' + rowID + '_HOME_DEPT_TO').val() == "") {
                        $('#' + rowID + '_HOME_LOC_TO').removeClass().addClass("red");
                    }
                    else {
                        $('#' + rowID + '_HOME_LOC_TO').removeClass().addClass("white");
                    }
                }
                if ($('#' + rowID + '_WORK_DEPT_TO').val() != "" && $('#' + rowID + '_WORK_DEPT_TO').val() == "") {
                    $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("red");
                    // $('#' + rowID + '_WORK_DEPT_TO').attr("red-flag", "Y");
                    $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("white");
                }
                else if ($('#' + rowID + '_WORK_DEPT_TO').val() != "" && $('#' + rowID + '_WORK_DEPT_TO').val() != "") {

                    $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("white");
                    $('#' + rowID + '_WORK_DEPT_TO').attr("red-flag", "N");
                    $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("red");
                }
                else {
                    $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("white");
                    $('#' + rowID + '_WORK_DEPT_TO').attr("red-flag", "N");
                    if ($('#' + rowID + '_WORK_LOC_TO').val() != "" && $('#' + rowID + '_WORK_DEPT_TO').val() == "") {
                        $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("red");
                    }
                    else {
                        $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("white");
                    }
                }
                if ($('#' + rowID + '_CLASS_CD_TO').val() != "") {
                    $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass("red");
                }
                else {
                    $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass("white");
                }
                if ($('#' + rowID + '_RSC_TO').val() != "") {
                    $('#' + rowID + '_RSC_TO').removeClass().addClass("red");
                }
                else {
                    $('#' + rowID + '_RSC_TO').removeClass().addClass("white");
                }
                if ($('#' + rowID + '_WPD_TO').val() != "") {
                    $('#' + rowID + '_WPD_TO').removeClass().addClass("red");
                }
                else {
                    $('#' + rowID + '_WPD_TO').removeClass().addClass("white");
                }
                if ($('#' + rowID + '_BULK_TO').val() != "") {
                    $('#' + rowID + '_BULK_TO').removeClass().addClass("red");
                }
                else {
                    $('#' + rowID + '_BULK_TO').removeClass().addClass("white");
                }
                if ($('#' + rowID + '_ESTMTG_PRICG_CD_TO').val() != "") {
                    $('#' + rowID + '_ESTMTG_PRICG_CD_TO').removeClass().addClass("red");
                }
                else {
                    $('#' + rowID + '_ESTMTG_PRICG_CD_TO').removeClass().addClass("white");
                }

                if ($('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == 'LBR' && $('#' + rowID + '_ACCOUNT_TO').val() != "") {
                    var param = [];
                    var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                    var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                    var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                    var mctrItem = $.extend(grid1, grid2, grid3);
                    mctrItem.FYEAR = $('#fyear').val().trim();
                    param.push(mctrItem);

                    var mctrCreateFormq = $('#form').serialize();
                    var lineitem = JSON.stringify(mctrCreateFormq);
                    var mctrCreateForm = $.extend({
                        mctrLineItem: param
                    }, lineitem);
                    if ($('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == 'LBR' && $('#' + rowID + '_ACCOUNT_TO').val() != "") {
                        $.ajax({
                            url: getBaseUrl('/MctrCreateForm/mctrLineItembutCopyWhenButtonPressed'),
                            type: 'POST',
                            data: mctrCreateForm,
                            success: function (data) {
                                v_count = data.V_Count['copyCount'];

                                if (v_count > 0) {
                                    $('#' + rowID + '_WPD_TO').val('IN');
                                    $('#' + rowID + '_WPD_TO').removeClass('red');

                                }
                            }
                        });
                    }
                }
            }
            else {
                bootbox.dialog({
                    message: "Use ALL Button to copy FROM Line of Acctg to all To Line fields.Use FILL Button copy FROM Line to TO Line fields with no values",
                    title: "Copy Button",
                    onEscape: true,
                    buttons: {
                        success: {
                            label: "ALL",
                            className: "btn-success",
                            callback: function () {
                                $('#' + rowID + '_ACTIVITY_ID_TO').val($('#' + rowID + '_ACTIVITY_ID_FROM').val());
                                $('#' + rowID + '_ACTIVITY_ID_TO').attr('value', $('#' + rowID + '_ACTIVITY_ID_FROM').val());
                                $('#' + rowID + '_WORK_BUGL_TO').val($('#' + rowID + '_WORK_BUGL_FROM').val());
                                $('#' + rowID + '_WORK_BUGL_TO').attr('value', $('#' + rowID + '_WORK_BUGL_FROM').val());
                                $('#' + rowID + '_PROJECT_ID_TO').val($('#' + rowID + '_PROJECT_ID_FROM').val());
                                $('#' + rowID + '_PROJECT_ID_TO').attr('value', $('#' + rowID + '_PROJECT_ID_FROM').val());
                                $('#' + rowID + '_CONTRACT_NUM_TO').val($('#' + rowID + '_CONTRACT_NUM_FROM').val());
                                $('#' + rowID + '_CONTRACT_NUM_TO').attr('value', $('#' + rowID + '_CONTRACT_NUM_FROM').val());
                                $('#' + rowID + '_ACCOUNT_TO').val($('#' + rowID + '_ACCOUNT_FROM').val());
                                $('#' + rowID + '_ACCOUNT_TO').attr('value', $('#' + rowID + '_ACCOUNT_FROM').val());
                                $('#' + rowID + '_BUM_CD7_TO').val($('#' + rowID + '_BUM_CD7_FROM').val());
                                $('#' + rowID + '_BUM_CD7_TO').attr('value', $('#' + rowID + '_BUM_CD7_FROM').val());
                                $('#' + rowID + '_CUST_TYPE_CD7_TO').val($('#' + rowID + '_CUST_TYPE_CD7_FROM').val());
                                $('#' + rowID + '_CUST_TYPE_CD7_TO').attr('value', $('#' + rowID + '_CUST_TYPE_CD7_FROM').val());
                                $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val());
                                $('#' + rowID + '_PROJ_TRANS_TYPE_TO').attr('value', $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val());
                                $('#' + rowID + '_PROJ_TRANS_CODE_TO').val($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val());
                                $('#' + rowID + '_PROJ_TRANS_CODE_TO').attr('value', $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val());
                                $('#' + rowID + '_STAT_CODE_TO').val($('#' + rowID + '_STAT_CODE_FROM').val());
                                $('#' + rowID + '_STAT_CODE_TO').attr('value', $('#' + rowID + '_STAT_CODE_FROM').val());
                                $('#' + rowID + '_UOM_TO').val($('#' + rowID + '_UOM_FROM').val());
                                $('#' + rowID + '_UOM_TO').attr('value', $('#' + rowID + '_UOM_FROM').val());
                                $('#' + rowID + '_AFFILIATE_TO').val($('#' + rowID + '_AFFILIATE_FROM').val());
                                $('#' + rowID + '_AFFILIATE_TO').attr('value', $('#' + rowID + '_AFFILIATE_FROM').val());
                                $('#' + rowID + '_HOME_DEPT_TO').val($('#' + rowID + '_HOME_DEPT_FROM').val());
                                $('#' + rowID + '_HOME_DEPT_TO').attr('value', $('#' + rowID + '_HOME_DEPT_FROM').val());
                                $('#' + rowID + '_HOME_LOC_TO').val($('#' + rowID + '_HOME_LOC_FROM').val());
                                $('#' + rowID + '_HOME_LOC_TO').attr('value', $('#' + rowID + '_HOME_LOC_FROM').val());
                                $('#' + rowID + '_HOME_BUGL_TO').val($('#' + rowID + '_HOME_BUGL_FROM').val());
                                $('#' + rowID + '_HOME_BUGL_TO').attr('value', $('#' + rowID + '_HOME_BUGL_FROM').val());
                                $('#' + rowID + '_HOME_POOL_TO').val($('#' + rowID + '_HOME_POOL_FROM').val());
                                $('#' + rowID + '_HOME_POOL_TO').attr('value', $('#' + rowID + '_HOME_POOL_FROM').val());
                                $('#' + rowID + '_LABOR_RATE_CD7_TO').val($('#' + rowID + '_LABOR_RATE_CD7_FROM').val());
                                $('#' + rowID + '_LABOR_RATE_CD7_TO').attr('value', $('#' + rowID + '_LABOR_RATE_CD7_FROM').val());
                                $('#' + rowID + '_CLASS_CD_TO').val($('#' + rowID + '_CLASS_CD_FROM').val());
                                $('#' + rowID + '_CLASS_CD_TO').attr('value', $('#' + rowID + '_CLASS_CD_FROM').val());
                                $('#' + rowID + '_WORK_DEPT_TO').val($('#' + rowID + '_WORK_DEPT_FROM').val());
                                $('#' + rowID + '_WORK_DEPT_TO').attr('value', $('#' + rowID + '_WORK_DEPT_FROM').val());
                                $('#' + rowID + '_WORK_LOC_TO').val($('#' + rowID + '_WORK_LOC_FROM').val());
                                $('#' + rowID + '_WORK_LOC_TO').attr('value', $('#' + rowID + '_WORK_LOC_FROM').val());
                                $('#' + rowID + '_WORK_POOL_TO').val($('#' + rowID + '_WORK_POOL_FROM').val());
                                $('#' + rowID + '_WORK_POOL_TO').attr('value', $('#' + rowID + '_WORK_POOL_FROM').val());
                                $('#' + rowID + '_RSC_TO').val($('#' + rowID + '_RSC_FROM').val());
                                $('#' + rowID + '_RSC_TO').attr('value', $('#' + rowID + '_RSC_FROM').val());
                                $('#' + rowID + '_WPD_TO').val($('#' + rowID + '_WPD_FROM').val());
                                $('#' + rowID + '_WPD_TO').attr('value', $('#' + rowID + '_WPD_FROM').val());
                                $('#' + rowID + '_BULK_TO').val($('#' + rowID + '_BULK_FROM').val());
                                $('#' + rowID + '_BULK_TO').attr('value', $('#' + rowID + '_BULK_FROM').val());
                                $('#' + rowID + '_CAUSAL_ID_TO').val($('#' + rowID + '_CAUSAL_ID_FROM').val());
                                $('#' + rowID + '_CAUSAL_ID_TO').attr('value', $('#' + rowID + '_CAUSAL_ID_FROM').val());
                                $('#' + rowID + '_ESTMTG_PRICG_CD_TO').val($('#' + rowID + '_ESTMTG_PRICG_CD_FROM').val());
                                $('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr('value', $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').val());
                                $('#' + rowID + '_PO_ID_TO').val($('#' + rowID + '_PO_ID_FROM').val());
                                $('#' + rowID + '_PO_ID_TO').attr('value', $('#' + rowID + '_PO_ID_FROM').val());
                                $('#' + rowID + '_PART_NO_TO').val($('#' + rowID + '_PART_NO_FROM').val());
                                $('#' + rowID + '_PART_NO_TO').attr('value', $('#' + rowID + '_PART_NO_FROM').val());
                                $('#' + rowID + '_EPACS_CTT_TO').val($('#' + rowID + '_EPACS_CTT_FROM').val());
                                $('#' + rowID + '_EPACS_CTT_TO').attr('value', $('#' + rowID + '_EPACS_CTT_FROM').val());
                                $('#' + rowID + '_SHOP_ORDER_TO').val($('#' + rowID + '_SHOP_ORDER_FROM').val());
                                $('#' + rowID + '_SHOP_ORDER_TO').attr('value', $('#' + rowID + '_SHOP_ORDER_FROM').val());
                                $('#' + rowID + '_PO_LINE_TO').val($('#' + rowID + '_PO_LINE_FROM').val());
                                $('#' + rowID + '_PO_LINE_TO').attr('value', $('#' + rowID + '_PO_LINE_FROM').val());
                                if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "LBR") {
                                    $('#' + rowID + '_MATERIAL_QUANTITY_FROM').val("");
                                    $('#' + rowID + '_MATERIAL_QUANTITY_TO').val("");
                                }
                                else if ($('#' + rowID + '_MATERIAL_QUANTITY_FROM').val() != "") {
                                    $('#' + rowID + '_MATERIAL_QUANTITY_TO').val(($('#' + rowID + '_MATERIAL_QUANTITY_FROM').val()) * -1);
                                    $('#' + rowID + '_MATERIAL_QUANTITY_TO').attr('value', $('#' + rowID + '_MATERIAL_QUANTITY_FROM').val());

                                }
                                else {
                                    $('#' + rowID + '_MATERIAL_QUANTITY_TO').val($('#' + rowID + '_MATERIAL_QUANTITY_FROM').val());
                                    $('#' + rowID + '_MATERIAL_QUANTITY_TO').attr('value', $('#' + rowID + '_MATERIAL_QUANTITY_FROM').val());
                                }
                                //identify to fields that need to be validated.
                                if ($('#' + rowID + '_PROJECT_ID_TO').val() != "" || ($('#' + rowID + '_ACCOUNT_TO').val() != "" && $('#' + rowID + '_PROJECT_ID_TO').val() == "")) {
                                    $('#' + rowID + '_PROJECT_ID_TO').addClass("red");
                                }
                                else {
                                    $('#' + rowID + '_PROJECT_ID_TO').removeClass('red');//black_on_gray
                                }
                                $('#' + rowID + '_ACCOUNT_TO').removeClass().addClass("white");
                                if ($('#' + rowID + '_HOME_DEPT_TO').val() != "" && $('#' + rowID + '_HOME_DEPT_TO').val() == "") {
                                    $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass("red");
                                    //  $('#' + rowID + '_HOME_DEPT_TO').attr("red-flag", "Y");
                                    $('#' + rowID + '_HOME_LOC_TO').removeClass().addClass("white");
                                }
                                else if ($('#' + rowID + '_HOME_DEPT_TO').val() != "" && $('#' + rowID + '_HOME_DEPT_TO').val() != "") {
                                    $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass("white");
                                    $('#' + rowID + '_HOME_DEPT_TO').attr("red-flag", "N");
                                    $('#' + rowID + '_HOME_LOC_TO').removeClass().addClass("red");
                                }
                                else {
                                    $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass("white");
                                    if ($('#' + rowID + '_HOME_LOC_TO').val() != "" && $('#' + rowID + '_HOME_DEPT_TO').val() == "") {
                                        $('#' + rowID + '_HOME_LOC_TO').removeClass().addClass("red");
                                    }
                                    else {
                                        $('#' + rowID + '_HOME_LOC_TO').removeClass().addClass("white");
                                    }
                                }
                                if ($('#' + rowID + '_WORK_DEPT_TO').val() != "" && $('#' + rowID + '_WORK_DEPT_TO').val() == "") {
                                    $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("red");
                                    $('#' + rowID + '_WORK_DEPT_TO').attr("red-flag", "Y");
                                    $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("white");
                                }
                                else if ($('#' + rowID + '_WORK_DEPT_TO').val() != "" && $('#' + rowID + '_WORK_DEPT_TO').val() != "") {
                                    $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("white");
                                    $('#' + rowID + '_WORK_DEPT_TO').attr("red-flag", "N");
                                    $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("red");
                                }
                                else {
                                    $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("white");
                                    $('#' + rowID + '_WORK_DEPT_TO').attr("red-flag", "N");
                                    if ($('#' + rowID + '_WORK_LOC_TO') != "" && $('#' + rowID + '_WORK_DEPT_TO').val() == "") {
                                        $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("red");
                                    }
                                    else {
                                        $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("white");
                                    }
                                }
                                if ($('#' + rowID + '_CLASS_CD_TO').val() != "") {
                                    $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass("red");
                                }
                                else {
                                    $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass("white");
                                }
                                if ($('#' + rowID + '_RSC_TO').val() != "") {
                                    $('#' + rowID + '_RSC_TO').removeClass().addClass("red");
                                }
                                else {
                                    $('#' + rowID + '_RSC_TO').removeClass().addClass("white");
                                }
                                if ($('#' + rowID + '_WPD_TO').val() != "") {
                                    $('#' + rowID + '_WPD_TO').removeClass().addClass("red");
                                }
                                else {
                                    $('#' + rowID + '_WPD_TO').removeClass().addClass("white");
                                }
                                if ($('#' + rowID + '_BULK_TO').val() != "") {
                                    $('#' + rowID + '_BULK_TO').removeClass().addClass("red");
                                }
                                else {
                                    $('#' + rowID + '_BULK_TO').removeClass().addClass("white");
                                }
                                if ($('#' + rowID + '_ESTMTG_PRICG_CD_TO').val() != "") {
                                    $('#' + rowID + '_ESTMTG_PRICG_CD_TO').removeClass().addClass("red");
                                }
                                else {
                                    $('#' + rowID + '_ESTMTG_PRICG_CD_TO').removeClass().addClass("white");
                                }
                                if ($('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == 'LBR' && $('#' + rowID + '_ACCOUNT_TO').val() != "") {
                                    var param = [];
                                    var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                                    var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                                    var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                                    var mctrItem = $.extend(grid1, grid2, grid3);
                                    mctrItem.FYEAR = $('#fyear').val().trim();
                                    param.push(mctrItem);

                                    var mctrCreateFormq = $('#form').serialize();
                                    var lineitem = JSON.stringify(mctrCreateFormq);
                                    var mctrCreateForm = $.extend({
                                        mctrLineItem: param
                                    }, lineitem);
                                    if ($('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == 'LBR' && $('#' + rowID + '_ACCOUNT_TO').val() != "") {
                                        $.ajax({
                                            url: getBaseUrl('/MctrCreateForm/mctrLineItembutCopyWhenButtonPressed'),
                                            type: 'POST',
                                            data: mctrCreateForm,
                                            success: function (data) {
                                                v_count = data.V_Count['copyCount'];

                                                if (v_count > 0) {
                                                    $('#' + rowID + '_WPD_TO').val('IN');
                                                    $('#' + rowID + '_WPD_TO').removeClass('red');

                                                }
                                            }
                                        });
                                    }
                                }
                            }
                        },
                        danger: {
                            label: "FILL",
                            className: "btn-danger",
                            callback: function () {
                                if ($('#' + rowID + '_ACTIVITY_ID_TO').val() == "" && $('#' + rowID + '_ACTIVITY_ID_FROM').val() != "") {
                                    $('#' + rowID + '_ACTIVITY_ID_TO').val($('#' + rowID + '_ACTIVITY_ID_FROM').val());
                                    $('#' + rowID + '_ACTIVITY_ID_TO').attr('value', $('#' + rowID + '_ACTIVITY_ID_FROM').val());
                                    $('#' + rowID + '_HOME_BUGL_TO').val($('#' + rowID + '_ORIG_BU').val());
                                    $('#' + rowID + '_HOME_BUGL_TO').attr('value', $('#' + rowID + '_ORIG_BU').val());
                                }

                                if ($('#' + rowID + '_PROJECT_ID_TO').val() == "" && $('#' + rowID + '_PROJECT_ID_FROM').val() != "") {
                                    $('#' + rowID + '_ACTIVITY_ID_TO').val($('#' + rowID + '_ACTIVITY_ID_FROM').val());
                                    $('#' + rowID + '_ACTIVITY_ID_TO').attr('value', $('#' + rowID + '_ACTIVITY_ID_FROM').val());
                                    $('#' + rowID + '_WORK_BUGL_TO').val($('#' + rowID + '_WORK_BUGL_FROM').val());
                                    $('#' + rowID + '_WORK_BUGL_TO').attr('value', $('#' + rowID + '_WORK_BUGL_FROM').val());
                                    $('#' + rowID + '_PROJECT_ID_TO').val($('#' + rowID + '_PROJECT_ID_FROM').val());
                                    $('#' + rowID + '_PROJECT_ID_TO').attr('value', $('#' + rowID + '_PROJECT_ID_FROM').val());
                                    $('#' + rowID + '_CONTRACT_NUM_TO').val($('#' + rowID + '_CONTRACT_NUM_FROM').val());
                                    $('#' + rowID + '_CONTRACT_NUM_TO').attr('value', $('#' + rowID + '_CONTRACT_NUM_FROM').val());
                                    $('#' + rowID + '_ACCOUNT_TO').val($('#' + rowID + '_ACCOUNT_FROM').val());
                                    $('#' + rowID + '_ACCOUNT_TO').attr('value', $('#' + rowID + '_ACCOUNT_FROM').val());
                                    $('#' + rowID + '_BUM_CD7_TO').val($('#' + rowID + '_BUM_CD7_FROM').val());
                                    $('#' + rowID + '_BUM_CD7_TO').attr('value', $('#' + rowID + '_BUM_CD7_FROM').val());
                                    $('#' + rowID + '_CUST_TYPE_CD7_TO').val($('#' + rowID + '_CUST_TYPE_CD7_FROM').val());
                                    $('#' + rowID + '_CUST_TYPE_CD7_TO').attr('value', $('#' + rowID + '_CUST_TYPE_CD7_FROM').val());
                                    $('#' + rowID + '_PROJECT_ID_TO').removeClass().addClass("red");

                                }

                                if ($('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == "" && $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() != "") {
                                    $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val());
                                    $('#' + rowID + '_PROJ_TRANS_TYPE_TO').attr('value', $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val());
                                    $('#' + rowID + '_PROJ_TRANS_CODE_TO').val($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val());
                                    $('#' + rowID + '_PROJ_TRANS_CODE_TO').attr('value', $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val());
                                    $('#' + rowID + '_STAT_CODE_TO').val($('#' + rowID + '_STAT_CODE_FROM').val());
                                    $('#' + rowID + '_STAT_CODE_TO').attr('value', $('#' + rowID + '_STAT_CODE_FROM').val());
                                    $('#' + rowID + '_UOM_TO').val($('#' + rowID + '_UOM_FROM').val());
                                    $('#' + rowID + '_UOM_TO').attr('value', $('#' + rowID + '_UOM_FROM').val());
                                }

                                if ($('#' + rowID + '_AFFILIATE_TO').val() == "" && $('#' + rowID + '_AFFILIATE_FROM').val() != "") {
                                    $('#' + rowID + '_AFFILIATE_TO').val($('#' + rowID + '_AFFILIATE_FROM').val());
                                    $('#' + rowID + '_AFFILIATE_TO').attr('value', $('#' + rowID + '_AFFILIATE_FROM').val());
                                }
                                if ($('#' + rowID + '_HOME_DEPT_TO').val() == "" && $('#' + rowID + '_HOME_DEPT_FROM').val() != "") {
                                    $('#' + rowID + '_HOME_DEPT_TO').val($('#' + rowID + '_HOME_DEPT_FROM').val());
                                    $('#' + rowID + '_HOME_DEPT_TO').attr('value', $('#' + rowID + '_HOME_DEPT_FROM').val());
                                    $('#' + rowID + '_HOME_LOC_TO').val($('#' + rowID + '_HOME_LOC_FROM').val());
                                    $('#' + rowID + '_HOME_LOC_TO').attr('value', $('#' + rowID + '_HOME_LOC_FROM').val());
                                    $('#' + rowID + '_HOME_POOL_TO').val($('#' + rowID + '_HOME_POOL_FROM').val());
                                    $('#' + rowID + '_HOME_POOL_TO').attr('value', $('#' + rowID + '_HOME_POOL_FROM').val());
                                    $('#' + rowID + '_LABOR_RATE_CD7_TO').val($('#' + rowID + '_LABOR_RATE_CD7_FROM').val());
                                    $('#' + rowID + '_LABOR_RATE_CD7_TO').attr('value', $('#' + rowID + '_LABOR_RATE_CD7_FROM').val());

                                    if ($('#' + rowID + '_HOME_DEPT_TO').val() != "" && $('#' + rowID + '_HOME_DEPT_TO').val() == "") {
                                        $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass("red");
                                        // $('#' + rowID + '_HOME_DEPT_TO').attr("red-flag", "Y");
                                    }
                                    else if ($('#' + rowID + '_HOME_DEPT_TO').val() != "" && $('#' + rowID + '_HOME_DEPT_TO').val() != "") {
                                        $('#' + rowID + '_HOME_LOC_TO').removeClass().addClass("red");
                                    }
                                }
                                if ($('#' + rowID + '_HOME_LOC_TO').val() == "" && $('#' + rowID + '_HOME_LOC_FROM').val() != "") {
                                    $('#' + rowID + '_HOME_LOC_TO').val($('#' + rowID + '_HOME_LOC_FROM').val());
                                    $('#' + rowID + '_HOME_LOC_TO').attr('value', $('#' + rowID + '_HOME_LOC_FROM').val());
                                    $('#' + rowID + '_HOME_LOC_TO').removeClass().addClass("red");
                                }
                                if ($('#' + rowID + '_HOME_BUGL_TO').val() == "" && $('#' + rowID + '_HOME_BUGL_FROM').val() != "") {
                                    $('#' + rowID + '_HOME_BUGL_TO').val($('#' + rowID + '_HOME_BUGL_FROM').val());
                                    $('#' + rowID + '_HOME_BUGL_TO').attr('value', $('#' + rowID + '_HOME_BUGL_FROM').val());
                                }
                                if ($('#' + rowID + '_CLASS_CD_TO').val() == "" && $('#' + rowID + '_CLASS_CD_FROM').val() != "") {
                                    $('#' + rowID + '_CLASS_CD_TO').val($('#' + rowID + '_CLASS_CD_FROM').val());
                                    $('#' + rowID + '_CLASS_CD_TO').attr('value', $('#' + rowID + '_CLASS_CD_FROM').val());
                                    $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass("red");
                                }
                                if ($('#' + rowID + '_WORK_DEPT_TO').val() == "" && $('#' + rowID + '_WORK_POOL_FROM').val() != "") {
                                    $('#' + rowID + '_WORK_DEPT_TO').val($('#' + rowID + '_WORK_DEPT_FROM').val());
                                    $('#' + rowID + '_WORK_DEPT_TO').attr('value', $('#' + rowID + '_WORK_DEPT_FROM').val());
                                    $('#' + rowID + '_WORK_LOC_TO').val($('#' + rowID + '_WORK_LOC_FROM').val());
                                    $('#' + rowID + '_WORK_LOC_TO').attr('value', $('#' + rowID + '_WORK_LOC_FROM').val());
                                    $('#' + rowID + '_WORK_POOL_TO').val($('#' + rowID + '_WORK_POOL_FROM').val());
                                    $('#' + rowID + '_WORK_POOL_TO').attr('value', $('#' + rowID + '_WORK_POOL_FROM').val());

                                    if ($('#' + rowID + '_WORK_DEPT_TO').val() != "" && $('#' + rowID + '_WORK_DEPT_TO').val() == "") {
                                        $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("red");
                                        //   $('#' + rowID + '_WORK_DEPT_TO').attr("red-flag", "Y");
                                    }
                                    else if ($('#' + rowID + '_WORK_DEPT_TO').val() != "" && $('#' + rowID + '_WORK_DEPT_TO').val() != "") {
                                        $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("red");

                                    }
                                }
                                if ($('#' + rowID + '_WORK_LOC_TO').val() == "" && $('#' + rowID + '_WORK_LOC_FROM').val() != "") {
                                    $('#' + rowID + '_WORK_LOC_TO').val($('#' + rowID + '_WORK_LOC_FROM').val());
                                    $('#' + rowID + '_WORK_LOC_TO').attr('value', $('#' + rowID + '_WORK_LOC_FROM').val());
                                    $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("red");
                                }
                                if ($('#' + rowID + '_RSC_TO').val() == "" && $('#' + rowID + '_RSC_FROM').val() != "") {
                                    $('#' + rowID + '_RSC_TO').val($('#' + rowID + '_RSC_FROM').val());
                                    $('#' + rowID + '_RSC_TO').attr('value', $('#' + rowID + '_RSC_FROM').val());
                                    $('#' + rowID + '_RSC_TO').removeClass().addClass("red");
                                }
                                if ($('#' + rowID + '_WPD_TO').val() == "" && $('#' + rowID + '_WPD_FROM').val() != "") {
                                    $('#' + rowID + '_WPD_TO').val($('#' + rowID + '_WPD_FROM').val());
                                    $('#' + rowID + '_WPD_TO').attr('value', $('#' + rowID + '_WPD_FROM').val());

                                    $('#' + rowID + '_WPD_TO').removeClass().addClass("red");
                                }
                                if ($('#' + rowID + '_BULK_TO').val() == "" && $('#' + rowID + 'BULK_FROM').val() != "") {
                                    $('#' + rowID + '_BULK_TO').val($('#' + rowID + 'BULK_FROM').val());
                                    $('#' + rowID + '_BULK_TO').attr('value', $('#' + rowID + 'BULK_FROM').val());
                                    $('#' + rowID + '_BULK_TO').removeClass().addClass("red");
                                }
                                if ($('#' + rowID + '_ESTMTG_PRICG_CD_TO').val() == "" && $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').val() != "") {
                                    $('#' + rowID + '_ESTMTG_PRICG_CD_TO').val($('#' + rowID + '_ESTMTG_PRICG_CD_FROM').val());
                                    $('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr('value', $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').val());
                                    $('#' + rowID + '_ESTMTG_PRICG_CD_TO').removeClass().addClass("red");
                                }
                                if ($('#' + rowID + '_PO_ID_TO').val() == "" && $('#' + rowID + '_PO_ID_FROM').val() != "") {
                                    $('#' + rowID + '_PO_ID_TO').val($('#' + rowID + '_PO_ID_FROM').val());
                                    $('#' + rowID + '_PO_ID_TO').attr('value', $('#' + rowID + '_PO_ID_FROM').val());
                                }

                                if ($('#' + rowID + '_PART_NO_TO').val() == "" && $('#' + rowID + '_PART_NO_FROM').val() != "") {
                                    $('#' + rowID + '_PART_NO_TO').val($('#' + rowID + '_PART_NO_FROM').val());
                                    $('#' + rowID + '_PART_NO_TO').attr('value', $('#' + rowID + '_PART_NO_FROM').val());
                                }

                                if ($('#' + rowID + '_PO_LINE_TO').val() == "" && $('#' + rowID + '_PO_LINE_FROM').val() != "") {
                                    $('#' + rowID + '_PO_LINE_TO').val($('#' + rowID + '_PO_LINE_FROM').val());
                                    $('#' + rowID + '_PO_LINE_TO').attr('value', $('#' + rowID + '_PO_LINE_FROM').val());
                                }

                                if ($('#' + rowID + '_CAUSAL_ID_TO').val() == "" && $('#' + rowID + '_CAUSAL_ID_FROM').val() != "") {
                                    $('#' + rowID + '_CAUSAL_ID_TO').val($('#' + rowID + '_CAUSAL_ID_FROM').val());
                                    $('#' + rowID + '_CAUSAL_ID_TO').attr('value', $('#' + rowID + '_CAUSAL_ID_FROM').val());
                                }
                                if ($('#' + rowID + '_EPACS_CTT_TO').val() == "" && $('#' + rowID + '_EPACS_CTT_FROM').val() != "") {
                                    $('#' + rowID + '_EPACS_CTT_TO').val($('#' + rowID + '_EPACS_CTT_FROM').val());
                                    $('#' + rowID + '_EPACS_CTT_TO').attr('value', $('#' + rowID + '_EPACS_CTT_FROM').val());
                                }
                                if ($('#' + rowID + '_BULK_TO').val() == "" && $('#' + rowID + '_BULK_FROM').val() != "") {
                                    $('#' + rowID + '_BULK_TO').val($('#' + rowID + '_BULK_FROM').val());
                                    $('#' + rowID + '_BULK_TO').attr('value', $('#' + rowID + '_BULK_FROM').val());
                                }

                                if ($('#' + rowID + '_ SHOP_ORDER_TO').val() == "" && $('#' + rowID + '_SHOP_ORDER_FROM').val() != "") {
                                    $('#' + rowID + '_SHOP_ORDER_TO').val($('#' + rowID + '_SHOP_ORDER_FROM').val());
                                    $('#' + rowID + '_SHOP_ORDER_TO').attr('value', $('#' + rowID + '_SHOP_ORDER_FROM').val());
                                }
                                if (($('#' + rowID + '_ PROJ_TRANS_TYPE_FROM').val() == "LBR")) {

                                    $('#' + rowID + '_MATERIAL_QUANTITY_FROM').val("");
                                    $('#' + rowID + '_MATERIAL_QUANTITY_FROM').val("");
                                    $('#' + rowID + '_MATERIAL_QUANTITY_TO').val("");
                                    $('#' + rowID + '_MATERIAL_QUANTITY_TO').val("");
                                }

                                else if ($('#' + rowID + '_MATERIAL_QUANTITY_FROM').val() != "") {

                                    $('#' + rowID + '_MATERIAL_QUANTITY_TO').val(($('#' + rowID + '_MATERIAL_QUANTITY_FROM').val()) * +1);
                                    $('#' + rowID + '_MATERIAL_QUANTITY_TO').val(($('#' + rowID + '_MATERIAL_QUANTITY_FROM').val()) * +1);
                                }
                                else {

                                    $('#' + rowID + '_MATERIAL_QUANTITY_TO').val(($('#' + rowID + '_MATERIAL_QUANTITY_FROM').val()));
                                    $('#' + rowID + '_MATERIAL_QUANTITY_TO').val(($('#' + rowID + '_MATERIAL_QUANTITY_FROM').val()));
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


            }
            if ($('#' + rowID + '_CONTRACT_NUM_FROM').val() != $('#' + rowID + '_CONTRACT_NUM_TO').val()) {
                $('#' + rowID + '_CONTRACT_NUM_TO').removeClass().addClass("blue_on_gray");
            }

            else {
                $('#' + rowID + '_CONTRACT_NUM_TO').removeClass('blue_on_gray');//.addClass("black_on_gray");

            }

            if ($('#' + rowID + '_LABOR_RATE_CD7_TO').val() == ("NR") && ($('#' + rowID + '_LABOR_RATE_CD7_FROM').val() != ("NR") || $('#' + rowID + '_LABOR_RATE_CD7_FROM').val() == "")) {
                $('#' + rowID + '_LABOR_RATE_CD7_TO').removeClass().addClass("yellow");
                $('#' + rowID + '_AMOUNT_TO').removeClass().addClass("yellow");
            }

            else {
                $('#' + rowID + '_LABOR_RATE_CD7_TO').removeClass();//.addClass("black_on_gray");
                $('#' + rowID + '_AMOUNT_TO').removeClass().addClass("white");
            }
        }
        else if ((status_id == 'AA' && bems_acct == $('#SessionBems').val() && $('#' + rowID + '_ACTIVITY_ID_FROM').val() == "")) {

            var savedLines = parseInt($('#Linesfrom').val());
            var currentLines = 0;
            $.each($('#tblJQGridCover').getGridParam('data'), function (key, value) {
                var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(value['_id_']));
                if (grid1.ACTIVITY_ID_FROM !== '') {
                    currentLines = $('#tblJQGridCover').getGridParam('data')[key]._id_;
                }

            });
            if (!($('#tblJQGridFirst').find("*").hasClass("red") || $('#tblJQGridCover').find("*").hasClass("red") || $('#tblJQGridInner').find('input').hasClass("red"))) {
                if (savedLines == currentLines) {
                    $('#' + rowID + '_BUM_CD7_FROM').val("");
                    $('#' + rowID + '_LINE_NO').val("");
                    $('#' + rowID + '_QUANTITY_FROM').val(".0");
                    $('#' + rowID + '_AMOUNT_FROM').val(".00");
                    $('#' + rowID + '_ADJUSTMENT_FROM').val(".00");
                    $('#' + rowID + '_QUANTITY_TO').val(".0");
                    $('#' + rowID + '_AMOUNT_TO').val(".00");
                    $('#' + rowID + '_ADJUSTMENT_TO ').val(".00");
                    //$('#' + rowID + '_OH_AMT_FROM').val(".00");
                    // $('#' + rowID + '_OH_AMT_TO').val(".00");
                    $('#' + rowID + '_TTD_FLAG ').val("");
                    $('#' + rowID + '_PER_FLAG').val("");
                    $('#' + rowID + '_CB_MTL_JRNL').val("n");
                    $('#' + rowID + '_LINE_NO').removeClass();//.addClass("black_on_gray");
                    $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass("white");
                    $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass("white");
                    $('#' + rowID + '_ADJUSTMENT_FROM').removeClass().addClass("white");
                    $('#' + rowID + '_QUANTITY_TO').removeClass();//.addClass("black_on_gray");
                    $('#' + rowID + '_AMOUNT_TO').removeClass().addClass("white");
                    $('#' + rowID + '_ADJUSTMENT_TO').removeClass();//.addClass("black_on_gray");
                    $('#' + rowID + '_TTD_FLAG').addClass("white");
                    $('#' + rowID + '_PER_FLAG').addClass("white");
                    if (ACTY_RED_FLG_FROM == ("Y")) {
                        $('#' + rowID + '_ACTIVITY_ID_FROM').removeClass().addClass("orange");
                        $('#' + rowID + '_PROJECT_ID_FROM').removeClass().addClass("orange");
                    }
                    if (ACTY_RED_FLG_TO == ("Y")) {
                        $('#' + rowID + '_ACTIVITY_ID_TO').removeClass().addClass("orange");
                        $('#' + rowID + '_PROJECT_ID_TO').removeClass().addClass("orange");
                    }
                    if (DEPT_RED_FLG_FROM == ("Y")) {
                        $('#' + rowID + '_HOME_DEPT_FROM').removeClass().addClass("orange");
                    }
                    if (DEPT_RED_FLG_TO == ("Y")) {
                        $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass("orange");
                    }
                    if (WORK_DEPT_RED_FLG_FROM == ("Y")) {
                        $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass("orange");
                    }
                    if (WORK_DEPT_RED_FLG_TO == ("Y")) {
                        $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("orange");
                    }

                    $('#' + rowID + '_BUM_CD7_FROM').val("");
                    $('#' + rowID + '_BUM_CD7_TO').val("");
                    $('#' + rowID + '_BUM_CD7_TO_ORIG').val("");
                    $('#' + rowID + '_CUST_TYPE_CD7_FROM').val("");
                    $('#' + rowID + '_CUST_TYPE_CD7_TO').val("");
                    $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val("LBR");
                    $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val("FRG");
                    $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val("LBR");
                    $('#' + rowID + '_PROJ_TRANS_CODE_TO').val("FRG");
                    $('#' + rowID + '_PROJ_TRANS_CODE_TO').removeClass().addClass("yellow");
                    $('#' + rowID + '_STAT_CODE_FROM').val("");
                    $('#' + rowID + '_UOM_FROM').val("");
                    $('#' + rowID + '_STAT_CODE_TO').val("");
                    $('#' + rowID + '_UOM_TO').val("");
                    $('#' + rowID + '_LABOR_RATE_CD7_FROM').val("");
                    $('#' + rowID + '_LABOR_RATE_CD7_TO').val("");
                    $('#' + rowID + '_CAUSAL_ID_FROM').val("");
                    $('#' + rowID + '_CAUSAL_ID_TO').val("");
                    $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').val("");
                    $('#' + rowID + '_ESTMTG_PRICG_CD_TO').val("");
                    $('#' + rowID + '_PO_ID_FROM').val("");
                    $('#' + rowID + '_PO_ID_TO').val("");
                    $('#' + rowID + '_PART_NO_FROM').val("");
                    $('#' + rowID + '_PART_NO_TO').val("");
                    $('#' + rowID + '_EPACS_CTT_FROM').val("");
                    $('#' + rowID + '_EPACS_CTT_TO').val("");
                    $('#' + rowID + '_SHOP_ORDER_FROM').val("");
                    $('#' + rowID + '_SHOP_ORDER_TO').val("");
                    $('#' + rowID + '_PO_LINE_FROM').val("");
                    $('#' + rowID + '_PO_LINE_TO').val("");
                    $('#' + rowID + '_MATERIAL_QUANTITY_FROM').val("");
                    $('#' + rowID + '_MATERIAL_QUANTITY_TO').val("");
                }
                else {
                    mctrObj.showDialog($("#dialog-box"), "please save outstanding changes before using copy button.", "error");
                }
            }
            else {
                mctrObj.showDialog($("#dialog-box"), "please save outstanding changes before using copy button.", "error");
            }
        }
        else {
            mctrObj.showDialog($("#dialog-box"), "you need to be the originator and status must be set to oa to use the copy button.", "error");
        }

    }
    var loadCmpltFn;
    var gridCompleteFn = function () {
        setTimeout(addRowForGrid('tblJQGridCover'), 30);
        $('#tblJQGridCover').find("input,a").keydown(function (e) {
            if (e.which == 9) {
                var fromOrTo = $(this).attr('id').split('_')[$(this).attr('id').split('_').length - 1];
                if (fromOrTo == "FROM") {
                    var nextElems = $(this).parents('td').nextAll().find('input[id*=FROM],a').not('input[readonly],[id*="To"]');
                }
                else if (fromOrTo == "TO") {
                    var nextElems = $(this).parents('td').nextAll().find('input[id*=TO],a').not('input[readonly],[id*="From"]');
                }
                else {
                    var elemId = $(this).attr('id');
                    if (elemId.search('From') != -1) {
                        var nextElems = $(this).parents('td').nextAll().find('input[id*=FROM],a').not('input[readonly],[id*="To"]');
                    }
                    else if (elemId.search('To') != -1) {
                        var nextElems = $(this).parents('td').nextAll().find('input[id*=TO],a').not('input[readonly],[id*="From"]');
                    }
                    else {
                        var nextElems = $(this).parents('td').nextAll().find('input[id*=FROM],a').not('input[readonly],[id*="To"]');
                    }
                }
                if (nextElems.length == 0) {
                    if (fromOrTo == "FROM") {
                        $('#' + $(this).attr('row-id') + '_selectbtn').focus();
                    }
                    else {
                        $('#' + $(this).attr('row-id') + '_QUANTITY_FROM').focus();
                    }
                }
                else {
                    nextElems.first().focus();
                    $('.jQGridRow').find('input[focus=true],a[focus=true]').removeAttr('focus');
                    nextElems.first().attr('focus', true);
                }
                e.preventDefault();
                e.stopPropagation();
            }
        });
        $('.jQGridRow').find('input').on('blur', function (e, obj) {
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var vClass = $(this).attr('class');
            var change = $(this).val();
            if (vClass == 'red' || change == "") {
                if ($('.bootbox').length == 0) {
                    $(this).trigger('change');
                }
            }
        });
        $('input[id*=_EPACS_CTT_TO]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var id = $(this).attr('row-id');
            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(id));
            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(id));
            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(id));

            var mctrLineItem = $.extend(grid1, grid2, grid3);

            var message = ValidaitonsCreateFormObj.mctrLineItemepacsCttToPostTextItem(mctrLineItem, id);
            e.preventDefault();
            if (message != false) {
                if (message != true) {
                    mctrObj.showDialog($("#dialog-box"), message, "error");
                }
            }

        });
        $('input[id*=_EPACS_CTT_FROM]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var id = $(this).attr('row-id');
            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(id));
            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(id));
            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(id));

            var mctrLineItem = $.extend(grid1, grid2, grid3);

            var message = ValidaitonsCreateFormObj.mctrLineItemepacsCttFromPostTextItem(mctrLineItem, id);
            e.preventDefault();
            if (message != false) {
                if (message != true) {
                    mctrObj.showDialog($("#dialog-box"), message, "error");
                }
            }

        });
        $('input[id*=_CAUSAL_ID_FROM]').on('change', function (e, obj) {
            var id = $(this).attr('row-id');
            e.preventDefault();
            e.stopImmediatePropagation();
            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(id));
            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(id));
            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(id));

            var mctrLineItem = $.extend(grid1, grid2, grid3);

            var message = ValidaitonsCreateFormObj.mctrLineItemcausalIdFromPostTextItem(mctrLineItem, id);
            e.preventDefault();
            if (message != false) {
                if (message != true) {
                    mctrObj.showDialog($("#dialog-box"), message, "error");
                }
            }
        });
        $('input[id*=_CAUSAL_ID_TO]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var id = $(this).attr('row-id');
            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(id));
            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(id));
            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(id));

            var mctrLineItem = $.extend(grid1, grid2, grid3);

            var message = ValidaitonsCreateFormObj.mctrLineItemcausalIdToPostTextItem(mctrLineItem, id);
            e.preventDefault();
            if (message != false) {
                if (message != true) {
                    mctrObj.showDialog($("#dialog-box"), message, "error");
                }
            }
        });
        $('input[id*=_MATERIAL_QUANTITY_FROM]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var id = $(this).attr('row-id');
            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(id));
            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(id));
            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(id));

            var mctrLineItem = $.extend(grid1, grid2, grid3);

            var message = ValidaitonsCreateFormObj.mctrLineItemmtlQtyFromPostTextItem(mctrLineItem, id);
            e.preventDefault();
            if (message != false) {
                if (message != true) {

                    mctrObj.showDialog($("#dialog-box"), message, "error");

                }
            }
        });
        $('input[id*=_SHOP_ORDER_FROM]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var id = $(this).attr('row-id');
            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(id));
            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(id));
            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(id));

            var mctrLineItem = $.extend(grid1, grid2, grid3);

            var message = ValidaitonsCreateFormObj.mctrLineItemshoporderFromPostTextItem(mctrLineItem, id);
            e.preventDefault();
            if (message != false && message != true) {

                mctrObj.showDialog($("#dialog-box"), message, "error");

            }

        });
        $('input[id*=_SHOP_ORDER_TO]').on('change', function (e, obj) {
            e.preventDefault();
            var id = $(this).attr('row-id');
            e.stopImmediatePropagation();
            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(id));
            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(id));
            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(id));

            var mctrLineItem = $.extend(grid1, grid2, grid3);

            var message = ValidaitonsCreateFormObj.mctrLineItemshoporderToPostTextItem(mctrLineItem, id);
            e.preventDefault();
            if (message != false && message != true && message != undefined) {

                mctrObj.showDialog($("#dialog-box"), message, "error");

            }

        });
        $('input[id*=_PART_NO_FROM]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var id = $(this).attr('row-id');
            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(id));
            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(id));
            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(id));

            var mctrLineItem = $.extend(grid1, grid2, grid3);

            var message = ValidaitonsCreateFormObj.mctrLineItempartNoFromPostTextItem(mctrLineItem, id);
            e.preventDefault();
            if (message != false && message != true && message != undefined) {

                mctrObj.showDialog($("#dialog-box"), message, "error");

            }

        });
        $('input[id*=_PART_NO_TO]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var id = $(this).attr('row-id');
            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(id));
            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(id));
            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(id));

            var mctrLineItem = $.extend(grid1, grid2, grid3);

            var message = ValidaitonsCreateFormObj.mctrLineItempartNoToPostTextItem(mctrLineItem, id);
            e.preventDefault();
            if (message != false && message != true && message != undefined) {

                mctrObj.showDialog($("#dialog-box"), message, "error");

            }

        });
        $('input[id*=_PO_LINE_FROM]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var id = $(this).attr('row-id');
            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(id));
            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(id));
            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(id));

            var mctrLineItem = $.extend(grid1, grid2, grid3);

            var message = ValidaitonsCreateFormObj.mctrLineItempoLineFromPostTextItem(mctrLineItem, id);
            e.preventDefault();
            if (message != false && message != true && message != undefined) {

                mctrObj.showDialog($("#dialog-box"), message, "error");

            }

        });
        $('input[id*=_PO_LINE_TO]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var id = $(this).attr('row-id');
            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(id));
            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(id));
            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(id));

            var mctrLineItem = $.extend(grid1, grid2, grid3);

            var message = ValidaitonsCreateFormObj.mctrLineItempoLineToPostTextItem(mctrLineItem, id);
            e.preventDefault();
            if (message != false && message != true && message != undefined) {

                mctrObj.showDialog($("#dialog-box"), message, "error");

            }

        });
        $('input[id*=_PO_ID_TO]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var id = $(this).attr('row-id');
            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(id));
            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(id));
            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(id));

            var mctrLineItem = $.extend(grid1, grid2, grid3);

            var message = ValidaitonsCreateFormObj.mctrLineItempoIdToPostTextItem(mctrLineItem, id);
            e.preventDefault();
            if (message != false && message != true && message != undefined) {

                mctrObj.showDialog($("#dialog-box"), message, "error");

            }

        });
        $('input[id*=_PO_ID_FROM]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var id = $(this).attr('row-id');
            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(id));
            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(id));
            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(id));

            var mctrLineItem = $.extend(grid1, grid2, grid3);

            var message = ValidaitonsCreateFormObj.mctrLineItempoIdFromPostTextItem(mctrLineItem, id);
            e.preventDefault();
            if (message != false && message != true && message != undefined) {

                mctrObj.showDialog($("#dialog-box"), message, "error");

            }

        });

        $('#dwnloadBtn').click(function () {
            $('#DownloadFrame').attr('src', getBaseUrl('/MctrCreateForm/mctrheaderbuttoxlswhenbuttonpressed') + '?MctrNo=' + $("#MctrNo").val() + '&appyear=' + $('#fyear').val());
        })

        $('a[id*=_projFrom]').click(function (e, obj, options) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var mctrno = $('#MctrNo').val();
            var StatusID = $('#StatusId').val();
            var proj_trans_code_from = $('#' + rowID + '_PROJ_TRANS_CODE_FROM ').val();
            var activity_id = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
            var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
            var fiscal_year = $('#fyear').val().trim();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var period_to = $('#PeriodTo').val();
            var BemsOrig = $('#BemsOrig').val();
            var SessionBems = $('#SessionBems').val();


            if (mctrno != "" && StatusID == "OA" && (BemsOrig == SessionBems) && ((proj_trans_code_from != "FRG") || proj_trans_code_from == "")) {
                if ((activity_id_from == "" || period_to == "" || activity_id_from == "REQUIRED")) {
                    mctrObj.showDialog($('#dialog-box'), 'Please enter the Activity ID (From) First.', 'error');
                    $('#' + rowID + '_ACTIVITY_ID_FROM').focus();
                }

                else {
                    $.ajax({
                        type: "POST",
                        url: getBaseUrl("/MctrCreateForm/ValidateActivityID"),
                        data: {
                            activity_id: activity_id
                        },
                        success: function (data) {
                            if (data.V_Count['valid'] > 0) {

                                if (data.V_Count['validStatus'] > 0) {

                                    if (data.V_Count['validStatus'] > 100 || ($('#' + rowID + '_ACTIVITY_ID_FROM').val().toUpperCase() == 'OVERHEAD' || $('#' + rowID + '_ACTIVITY_ID_FROM').val().toUpperCase() == 'NON-PROJ' || $('#' + rowID + '_ACTIVITY_ID_FROM').val().toUpperCase() == 'UNALLOW')) {
                                        var succesFn = function (data) {
                                            if ($('.bootbox').length == 0) {
                                                if (data) {
                                                    bootbox.dialog({
                                                        title: "Project From Prompt Window",
                                                        message: data,
                                                        onEscape: true,
                                                        size: "small"
                                                    });
                                                }
                                            }
                                        };
                                        mctrObj.ajaxOptions('/MctrCreateForm/ProjectFromPromptWindow', 'GET', {
                                            rowId: rowID
                                        }, succesFn);
                                    }
                                    else {
                                        var succesFn = function (data) {
                                            if ($('.bootbox').length == 0) {
                                                if (data) {
                                                    bootbox.dialog({
                                                        title: "Active Projects",
                                                        message: data,
                                                        onEscape: true,
                                                        size: "large"
                                                    });
                                                }
                                            }
                                        };
                                        mctrObj.ajaxOptions('/MctrCreateForm/getRgProjFromLOV', 'GET', {
                                            rowId: rowID
                                        }, succesFn);

                                    }
                                }
                                else {
                                    mctrObj.showDialog($('#dialog-box'), 'Check Activity ID (From) value entered for [eff_status = A or (eff_status=I and direct_chrg_flg7=Y)].', 'error');
                                }
                            } else {
                                mctrObj.showDialog($('#dialog-box'), 'Invalid Activity Id (From) value was entered.', 'error');
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                        }
                    });
                }
            }
            else if (mctrno != "") {
                mctrObj.showDialog($("#dialog-box"), 'you either do not have the proper role or proper status setting to change this field', "error");
            }

        });

        $('a[id*=_projTo]').click(function (e, obj, options) {
            e.preventDefault();
            e.stopImmediatePropagation();
            // var rowId = e.target.id.slice(0, 1);
            var rowID = $(this).attr('row-id');
            var activity_id = $('#' + rowID + '_ACTIVITY_ID_TO').val();
            var activity_id_to = $('#' + rowID + '_ACTIVITY_ID_TO').val();

            var mctrno = $('#MctrNo').val();
            var StatusID = $('#StatusId').val();
            var proj_trans_code_from = $('#' + rowID + '_PROJ_TRANS_CODE_FROM ').val();
            var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
            var fiscal_year = $('#fyear').val().trim();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var period_to = $('#PeriodTo').val();
            var BemsOrig = $('#BemsOrig').val();
            var SessionBems = $('#SessionBems').val();
            var account_to = $('#' + rowID + '_ACCOUNT_TO').val();


            if (mctrno != "" && StatusID == "OA" && (BemsOrig == SessionBems) && ((proj_trans_code_from != "FRG") || proj_trans_code_from == "")) {

                if (($('#' + rowID + '_PROJECT_ID_TO').attr('class') == "red") && (account_to != null)) {

                    $('#' + rowID + '_ACCOUNT_TO').attr('value', account_to);
                }

                else {
                    $('#' + rowID + '_ACCOUNT_TO').attr('value', "");
                }

                if ((activity_id_from == "" || period_to == "" || activity_id_from == "REQUIRED")) {
                    mctrObj.showDialog($('#dialog-box'), 'please enter the activity id (from) first.', 'error');
                    $('#' + rowID + '_ACTIVITY_ID_FROM').focus();
                }

                else if ((activity_id_to == "" || activity_id_to == "REQUIRED")) {
                    mctrObj.showDialog($('#dialog-box'), 'please enter the activity id (to) first.', 'error');
                    $('#' + rowID + '_ACTIVITY_ID_TO').focus();
                }

                else {

                    $.ajax({
                        type: "POST",
                        url: getBaseUrl("/MctrCreateForm/ValidateActivityID"),
                        data: {
                            activity_id: activity_id
                        },
                        success: function (data) {
                            if (data.V_Count['valid'] > 0) {

                                if (data.V_Count['validStatus'] > 0) {
                                    if (data.V_Count['validStatus'] > 100 || $('#' + rowID + '_ACTIVITY_ID_TO').val().toUpperCase() == 'OVERHEAD' || $('#' + rowID + '_ACTIVITY_ID_TO').val().toUpperCase() == 'NON-PROJ' || $('#' + rowID + '_ACTIVITY_ID_TO').val().toUpperCase() == 'UNALLOW') {
                                        var succesFn = function (data) {
                                            if (data) {
                                                if ($('.bootbox').length == 0) {
                                                    bootbox.dialog({
                                                        title: "Project To Prompt Window",
                                                        message: data,
                                                        onEscape: true,
                                                        size: "small"
                                                    })
                                                }
                                            }
                                        };
                                        mctrObj.ajaxOptions('/MctrCreateForm/ProjectToPromptWindow', 'GET', {
                                            rowId: rowID
                                        }, succesFn);
                                    }
                                    else {
                                        var succesFn = function (data) {
                                            if (data) {
                                                if ($('.bootbox').length == 0) {
                                                    bootbox.dialog({
                                                        title: "Active Projects",
                                                        onEscape: true,
                                                        message: data,
                                                        size: "large"
                                                    })
                                                }
                                            }
                                        };
                                        mctrObj.ajaxOptions('/MctrCreateForm/getRgProjToLOV', 'GET', {
                                            rowId: rowID
                                        }, succesFn);
                                    }
                                }
                                else {
                                    mctrObj.showDialog($('#dialog-box'), 'Check Activity Id (To) value entered for [eff_status=A or (eff_status=I and direct_chrg_flg7=Y)].', 'error');
                                }
                            } else {
                                mctrObj.showDialog($('#dialog-box'), 'Invalid Activity Id (To) value was entered.', 'error');
                            }

                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
                        }
                    });
                }
            }
            else if (mctrno != "") {
                mctrObj.showDialog($("#dialog-box"), 'you either do not have the proper role or proper status setting to change this field', "error");
            }
        });

        $('a[id*=BulkpopUpToBtn]').click(function (e, oj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var mctrno = $('#MctrNo').val();
            var SessionBems = $('#SessionBems').val();
            var statusID = $('#StatusId').val();
            var BemsOrig = $('#BemsOrig').val();
            var bulk_from = $('#' + rowID + '_BULK_FROM').val();
            var bulk_to = $('#' + rowID + '_BULK_TO').val();
            var global_bulk_from = $('#' + rowID + '_BULK_FROM').attr('value');
            var proj_trans_type_from = $('#' + rowID + '_PROJ_TRANS_TYPE_FROM ').val();
            var proj_trans_type_to = $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val();
            var proj_trans_code_from = $('#' + rowID + '_PROJ_TRANS_CODE_FROM ').val();
            var fiscal_year = $('#fyear').val().trim();
            var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
            var activity_id_to = $('#' + rowID + '_ACTIVITY_ID_TO').val();
            var account_from = $('#' + rowID + '_ACCOUNT_FROM').val();
            var account_to = $('#' + rowID + '_ACCOUNT_TO').val();
            var home_bugl_from = $('#' + rowID + '_HOME_BUGL_FROM').val();;
            var project_id_from = $('#' + rowID + '_PROJECT_ID_FROM').val();
            var project_id_to = $('#' + rowID + '_PROJECT_ID_TO').val();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var StatusID = $('#StatusId').val();
            var bems_cost_acct = $('#SessionBems').val();
            var period_to = $('#PeriodTo').val();
            var BemsAcct = $('#BemsAcct').val();
            var bems_cost_acct = $('#BemsCostAcct').val();
            var v_value_chosen = false;
            var v_setid = "";
            var v_count = '';
            var global_rsc_from = '';
            var param = [];
            var global_set_id = $('#' + rowID + '_HOME_BUGL_FROM').attr('value');


            if ((mctrno != '') && ((proj_trans_code_from != 'FRG') || (proj_trans_code_from == '')) && (((StatusID == "OA" || StatusID == "OR") && BemsOrig == $('#SessionBems').val()) || ((StatusID == "AA" || StatusID == "OR") && BemsAcct == $('#SessionBems').val()) || (StatusID == 'CA' && bems_cost_acct == $('#SessionBems').val()))) {
                if (activity_id_from == '' || period_to == '' || activity_id_from == 'REQUIRED') {

                    mctrObj.showDialog($('#dialog-box'), 'Please Enter The Activity Id (From) First.', 'error');
                    $('#' + rowID + '_ACTIVITY_ID_FROM').focus();
                    //go_item('activity_id_from');
                }
                else if (project_id_from == '' || project_id_from == 'REQUIRED') {

                    mctrObj.showDialog($('#dialog-box'), 'Please Enter The Project Id (From) First.', 'error');
                    $('#' + rowID + '_popUpbtn1').focus();
                    //go_item('but_proj_from');
                }
                else if (account_from == '') {

                    mctrObj.showDialog($('#dialog-box'), 'please enter the account (from) first.', 'error');
                    $('#' + rowID + '_ACCOUNT_FROM').focus();
                    //go_item('account_from');
                }
                else if (proj_trans_type_from == '' || proj_trans_type_from == 'REQ') {

                    mctrObj.showDialog($('#dialog-box'), 'project trans type (from) value must be entered first.', 'error');
                    $('#' + rowID + '_bumOrigpopUpFrombtn').focus();
                    // go_item('but_trans_from');
                }
                else if (activity_id_to == '' && activity_id_to == 'REQUIRED') {

                    mctrObj.showDialog($('#dialog-box'), 'please enter the activity id (to) first.', 'error');
                    $('#' + rowID + '_ACTIVITY_ID_TO').focus();
                    //go_item('activity_id_to');
                }
                else if (project_id_to == '' && project_id_to == 'REQUIRED') {

                    mctrObj.showDialog($('#dialog-box'), 'pplease enter the project id (to) first.', 'error');
                    $('#' + rowID + '_popUpbtn1').focus();
                    //go_item('but_proj_to');
                }
                else if (account_to == '' && proj_trans_type_to == 'LBR') {

                    mctrObj.showDialog($('#dialog-box'), 'please enter the account (to) first.', 'error');
                    $('#' + rowID + '_ACCOUNT_TO').focus();
                    //go_item('account_to');
                }

                else {


                    if (($('#' + rowID + '_HOME_BUGL_TO').val() == "")) {
                        $('#' + rowID + '_HOME_BUGL_FROM').val($('#OrigBu').val());
                    }

                    var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                    var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                    var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                    var mctrLineItem = $.extend(grid1, grid2, grid3);
                    if (py_cy_status == 'PY' && fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_FROM').val() != '') {
                        mctrLineItem.SETID = $('#' + rowID + '_AFFILIATE_TO').val()
                    }
                    else {
                        mctrLineItem.SETID = $('#' + rowID + '_HOME_BUGL_TO').val()
                    }
                    param.push(mctrLineItem);
                    var mctrCreateFormq = $('#form').serialize();
                    var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                    var mctrCreateForm = $.extend({
                        mctrLineItem: param
                    }, mctrCreateFromJson);
                    mctrCreateForm.OrigBu = $('#OrigBu').val();
                    //if (py_cy_status == 'PY' && fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_FROM').val() != '')
                    //{
                    //    mctrCreateForm.mctrLineItem.SETID = $('#' + rowID + '_AFFILIATE_TO').val()
                    //}
                    //else
                    //{
                    //    mctrCreateForm.mctrLineItem.SETID = $('#' + rowID + '_HOME_BUGL_TO').val()
                    //}

                    $.ajax({
                        url: getBaseUrl('/MctrCreateForm/mctrLineItembutBulkWhenButtonPressedOpenLOV '),
                        type: 'POST',
                        data: mctrCreateForm,
                        success: function (data) {
                            if (data != '') {

                                var v_bulk_flg = data.V_Countstring['Bulkflag'];
                                var v_BulkCount = data.V_Count['BulkCount'];
                                var BulkCountLOV = data.V_Count['BulkCountLOV'];

                                if (v_bulk_flg == 'N') {
                                    $('#' + rowID + '_BULK_TO').val("");
                                    $('#' + rowID + '_BULK_TO').removeClass();
                                    mctrObj.showDialog($('#dialog-box'), 'originating business unit does not move bulk allocation detail. bulk flag = n.', 'success');

                                }
                                else {
                                    v_count = 0;
                                    if ($('#' + rowID + '_BULK_TO').attr('class') == "red") {
                                        $('#' + rowID + '_BULK_TO').removeClass();
                                        if ($('#' + rowID + '_BULK_TO').val() !== "" && $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() != "") {
                                            v_count = v_BulkCount;
                                        }
                                    }
                                }
                                if (v_count == 0) {
                                    if (BulkCountLOV > 0) {
                                        var errorFn = function (jqXHR, textStatus, errorThrown) {
                                        };
                                        var succesFn = function (data) {
                                            if ($('.bootbox').length == 0) {
                                                if (data) {
                                                    bootbox.dialog({
                                                        title: "Bulk Allocation Codes (To) Listing",
                                                        message: data,
                                                        onEscape: true,
                                                        size: "medium"
                                                    })
                                                }
                                            }
                                        };
                                        mctrObj.ajaxOptions('/MctrCreateForm/getRgBulkToLOV', 'GET', {
                                            rowId: rowID
                                        }, succesFn, errorFn);
                                    }
                                    else {
                                        bootbox.alert("List of Values Contains No Entries", function () {
                                        });
                                    }

                                }
                                //go_item('causal_id_to');
                                $('#' + rowID + '_CAUSAL_ID_TO').focus();
                            }
                        }
                    });
                }
            }
            else if (mctrno != '') {
                mctrObj.showDialog($('#dialog-box'), 'you either do not have the proper role  or  proper status setting to change this field.', 'error');
            }

        });

        $('a[id*=wpdTopopUpbtn]').click(function (e, oj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var mctrno = $('#MctrNo').val();
            var SessionBems = $('#SessionBems').val();
            var statusID = $('#StatusId').val();
            var BemsOrig = $('#BemsOrig').val();
            var wpd_from = $('#' + rowID + '_WPD_FROM').val();
            var wpd_to = $('#' + rowID + '_WPD_TO').val();
            var global_wpd_to = $('#' + rowID + '_WPD_TO').attr('value');
            var proj_trans_type_from = $('#' + rowID + '_PROJ_TRANS_TYPE_FROM ').val();
            var proj_trans_type_to = $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val();
            var proj_trans_code_from = $('#' + rowID + '_PROJ_TRANS_CODE_FROM ').val();
            var fiscal_year = $('#fyear').val().trim();
            var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
            var activity_id_to = $('#' + rowID + '_ACTIVITY_ID_TO').val();
            var account_from = $('#' + rowID + '_ACCOUNT_FROM').val();
            var account_to = $('#' + rowID + '_ACCOUNT_TO').val();
            var home_bugl_from = $('#' + rowID + '_HOME_BUGL_FROM').val();;
            var project_id_from = $('#' + rowID + '_PROJECT_ID_FROM').val();
            var project_id_to = $('#' + rowID + '_PROJECT_ID_TO').val();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var StatusID = $('#StatusId').val();
            var bems_cost_acct = $('#SessionBems').val();
            var period_to = $('#PeriodTo').val();
            var BemsAcct = $('#BemsAcct').val();
            var bems_cost_acct = $('#BemsCostAcct').val();
            var v_value_chosen = false;
            var v_setid = "";
            var v_count = '';
            var global_rsc_from = '';
            var param = [];
            var global_set_id = $('#' + rowID + '_HOME_BUGL_FROM').attr('value');
            var v_hold_wpd_to = $('#' + rowID + '_WPD_TO').val();


            if ((mctrno != '') && ((proj_trans_code_from != 'FRG') || (proj_trans_code_from == '')) && (((StatusID == "OA" || StatusID == "OR") && BemsOrig == $('#SessionBems').val()) || ((StatusID == "AA" || StatusID == "OR") && BemsAcct == $('#SessionBems').val()) || (StatusID == 'CA' && bems_cost_acct == $('#SessionBems').val()))) {
                if (activity_id_from == '' || period_to == '' || activity_id_from == 'REQUIRED') {

                    mctrObj.showDialog($('#dialog-box'), 'Please Enter The Activity Id (From) First.', 'error');
                    $('#' + rowID + '_ACTIVITY_ID_FROM').focus();
                    //go_item('activity_id_from');
                }
                else if (project_id_from == '' || project_id_from == 'REQUIRED') {

                    mctrObj.showDialog($('#dialog-box'), 'Please Enter The Project Id (From) First.', 'error');
                    $('#' + rowID + '_popUpbtn1').focus();
                    //go_item('but_proj_from');
                }
                else if (account_from == '') {

                    mctrObj.showDialog($('#dialog-box'), 'please enter the account (from) first.', 'error');
                    $('#' + rowID + '_ACCOUNT_FROM').focus();
                    //go_item('account_from');
                }
                else if (proj_trans_type_from == '' || proj_trans_type_from == 'REQ') {

                    mctrObj.showDialog($('#dialog-box'), 'project trans type (from) value must be entered first.', 'error');
                    $('#' + rowID + '_bumOrigpopUpFrombtn').focus();
                    // go_item('but_trans_from');
                }
                else if (activity_id_to == '' && activity_id_to == 'REQUIRED') {

                    mctrObj.showDialog($('#dialog-box'), 'please enter the activity id (to) first.', 'error');
                    $('#' + rowID + '_ACTIVITY_ID_TO').focus();
                    //go_item('activity_id_to');
                }
                else if (project_id_to == '' && project_id_to == 'REQUIRED') {

                    mctrObj.showDialog($('#dialog-box'), 'pplease enter the project id (to) first.', 'error');
                    $('#' + rowID + '_popUpbtn1').focus();
                    //go_item('but_proj_to');
                }
                else if (account_to == '' && proj_trans_type_to == 'LBR') {

                    mctrObj.showDialog($('#dialog-box'), 'please enter the account (to) first.', 'error');
                    $('#' + rowID + '_ACCOUNT_TO').focus();
                    //go_item('account_to');
                }

                else {

                    //if (py_cy_status == 'PY' || fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_FROM').val() != '') {
                    //    mctrItem.SETID == $('#' + rowID + '_AFFILIATE_FROM').val()
                    //}
                    //else {
                    //    mctrItem.SETID == $('#' + rowID + '_HOME_BUGL_FROM').val()
                    //}

                    var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                    var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                    var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                    var mctrLineItem = $.extend(grid1, grid2, grid3);
                    param.push(mctrLineItem);
                    var mctrCreateFormq = $('#form').serialize();
                    var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                    var mctrCreateForm = $.extend({
                        mctrLineItem: param
                    }, mctrCreateFromJson);

                    if (proj_trans_type_to == 'LBR' && account_to != "") {
                        $.ajax({
                            url: getBaseUrl('/MctrCreateForm/mctrLineItembutWpdWhenButtonPressedOpenLOV'),
                            type: 'POST',
                            data: mctrCreateForm,
                            success: function (data) {
                                if (data != '') {

                                    v_WpdCount = data.V_Count['WpdCount'];
                                    v_WpdCountmas = data.V_Count['WpdCountmas'];

                                    v_count = v_WpdCount;
                                    if (v_count > 0) {
                                        $('#' + rowID + '_WPD_TO').val('IN');
                                    }
                                    else if ($('#' + rowID + '_WPD_TO').val() == 'IN') {
                                        $('#' + rowID + '_WPD_TO').val("");
                                    }
                                    if (fiscal_year < 2005) {
                                        v_count = 0;
                                        mctrObj.showDialog($('#dialog-box'), 'wpd does not have to be entered for overhead base year < 2005 (optional)', 'success');
                                        $('#' + rowID + '_WPD_TO').removeClass().addClass('gray');
                                    }
                                    else if (v_count > 0) {
                                        mctrObj.showDialog($('#dialog-box'), 'wpd to can only be entered for direct labor. indirect labor assigned value in.', 'error');
                                        $('#' + rowID + '_WPD_TO').removeClass().addClass('gray');
                                    }
                                    else if ($('#' + rowID + '_WPD_TO').attr('class') == "red") {
                                        $('#' + rowID + '_WPD_TO').removeClass();

                                        if ($('#' + rowID + '_WPD_TO').val() != "" && $('#' + rowID + '_WPD_TO').val() == v_hold_wpd_to) {
                                            if ($('#' + rowID + '_WPD_TO').val() != "IN") {
                                                // should write here ajax call.
                                                v_count = v_WpdCountmas;
                                            }
                                        }

                                    }
                                    if (v_count == 0) {

                                        var errorFn = function (jqXHR, textStatus, errorThrown) {
                                        };

                                        var succesFn = function (data) {
                                            if ($('.bootbox').length == 0) {
                                                if (data) {
                                                    bootbox.dialog({
                                                        title: "WPD Direct (To) Listing",
                                                        onEscape: true,
                                                        message: data
                                                    })
                                                }
                                            };
                                        }
                                        mctrObj.ajaxOptions('/MctrCreateForm/getRgWpdToLOV', 'GET', {
                                            rowId: rowID
                                        }, succesFn, errorFn);
                                    }
                                }

                                //if (v_value_chosen == false) {
                                //    mctrObj.showDialog($('#dialog-box'), 'warning - a wpd value was not selected from list.', 'success');

                                //}
                                //else {
                                //    $('#' + rowID + '_WPD_TO').removeClass().addClass('gray');
                                //}

                            }

                        });
                    }
                    else {
                        if ($('#' + rowID + '_WPD_TO').val() != "") {
                            $('#' + rowID + '_WPD_TO').val("");
                        }
                        $('#' + rowID + '_WPD_TO').removeClass();
                        mctrObj.showDialog($('#dialog-box'), 'wpd to can only be entered for direct labor (ptt = lbr) along with a valid account.', 'error');
                    }
                    $('#' + rowID + '_BulkpopUpToBtn').focus();
                }

            }
            else if (mctrno != '') {
                mctrObj.showDialog($('#dialog-box'), 'you either do not have the proper role  or  proper status setting to change this field.', 'error');
            }

        });

        $('input[id*=_BUM_CD7_TO').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var param = [];
            var status_id = $('#StatusId').val();
            var bems_orig = $('#BemsOrig').val();
            var SessionBems = $('#SessionBems').val();
            var bems_acct = $('#BemsAcct').val();
            var period_to = $('#PeriodTo').val();
            var period_from = $('#PeriodFrom').val();
            var fiscal_year = $('#fyear').val().trim();
            var ProjectTransCodeFrom = ['OTS', 'STR'];
            var bum_cd7_to = $('#' + rowID + '_BUM_CD7_TO').val();
            var globalhold_bum_cd7_to = $('#' + rowID + '_BUM_CD7_TO').attr('value');
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var account_to = $('#' + rowID + '_ACCOUNT_TO').val();
            var account_from = $('#' + rowID + '_ACCOUNT_FROM').val();

            if ((bum_cd7_to != globalhold_bum_cd7_to || (bum_cd7_to != "" && globalhold_bum_cd7_to == "") || (bum_cd7_to = "" && globalhold_bum_cd7_to != ""))) {
                if ((status_id == "OA" && bems_orig == SessionBems) || (status_id == "AA" || status_id == "OR" && bems_acct == SessionBems) || (status_id == "CA" && bems_acct == SessionBems)) {
                    if (($('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || period_to == "" || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == "REQUIRED")) {
                        $('#' + rowID + '_BUM_CD7_TO').val($('#' + rowID + '_BUM_CD7_TO').attr('value'));
                        mctrObj.showDialog($("#dialog-box"), "Please enter activity id (from).", "error");
                    }
                    else if (($('#' + rowID + '_PROJECT_ID_FROM').val() == "" || $('#' + rowID + '_PROJECT_ID_FROM').val() == "REQUIRED")) {
                        $('#' + rowID + '_BUM_CD7_TO').val($('#' + rowID + '_BUM_CD7_TO').attr('value'));
                        mctrObj.showDialog($("#dialog-box"), "Please enter project id (from).", "error");
                    }
                    else if (($('#' + rowID + '_ACCOUNT_FROM').val() == "")) {
                        $('#' + rowID + '_BUM_CD7_TO').val($('#' + rowID + '_BUM_CD7_TO').attr('value'));
                        mctrObj.showDialog($("#dialog-box"), "Please enter account (from).", "error");
                    }
                    else if (($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "" || $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "REQ")) {
                        $('#' + rowID + '_BUM_CD7_TO').val($('#' + rowID + '_BUM_CD7_TO').attr('value'));
                        mctrObj.showDialog($("#dialog-box"), "Please enter proj trans type (from).", "error");
                    }
                    else if (($('#' + rowID + '_ACTIVITY_ID_TO').val() == "" || $('#' + rowID + '_ACTIVITY_ID_TO').val() == "REQUIRED")) {
                        $('#' + rowID + '_BUM_CD7_TO').val($('#' + rowID + '_BUM_CD7_TO').attr('value'));
                        mctrObj.showDialog($("#dialog-box"), "Please enter activity (to).", "error");
                    }
                    else if (($('#' + rowID + '_PROJECT_ID_TO').val() == " " || $('#' + rowID + '_PROJECT_ID_TO').val() == "REQUIRED")) {
                        $('#' + rowID + '_BUM_CD7_TO').val($('#' + rowID + '_BUM_CD7_TO').attr('value'));
                        mctrObj.showDialog($("#dialog-box"), "Please enter project (to).", "error");
                    }
                    else if ((account_to != '' && py_cy_status == 'PY') && (account_from.match('^6') || account_from.match('^7') || account_from.match('^8'))) {

                        $('#' + rowID + '_BUM_CD7_TO').val($('#' + rowID + '_BUM_CD7_TO').attr('value'));
                        mctrObj.showDialog($("#dialog-box"), "accounts starting with 6, 7, and 8 are not acceptable for prior year.", "error");
                    }

                } else {
                    $('#' + rowID + '_BUM_CD7_TO').val($('#' + rowID + '_BUM_CD7_TO').attr('value'));
                    mctrObj.showDialog($("#dialog-box"), "you either do not have the proper role or proper status setting to change this field.", "error");
                }
            }

        });

        $('input[id*=_ACCOUNT_TO]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var period_to = $('#PeriodTo').val();
            var rowID = $(this).attr('row-id');
            var account_to = $('#' + rowID + '_ACCOUNT_TO').val();
            var account_from = $('#' + rowID + '_ACCOUNT_FROM').val();
            var statusID = $('#StatusId').val();
            var OrignatorStatusID = ['OA', 'OR'];
            var AccountantStatusID = ['AA', 'OR'];
            var bemsID = $('#SessionBems').val();
            var v_rate = 0;
            var v_count = 0;
            var param = [];
            var v_setid = 0;
            var project_trans_code = $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val();
            var project_id_from = $('#' + rowID + '_PROJECT_ID_FROM').val();
            var project_id_to = $('#' + rowID + '_PROJECT_ID_TO').val();
            var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
            var activity_id_to = $('#' + rowID + '_ACTIVITY_ID_TO').val();
            var home_bugl_from = $('#' + rowID + '_HOME_BUGL_FROM').val();
            var py_cy_status = $('#fyear').val().trim() == (new Date).getFullYear() ? 'CY' : 'PY';

            if ((account_to != $('#' + rowID + '_ACCOUNT_TO').attr('value')) || (account_to != '' && $('#' + rowID + '_ACCOUNT_TO').attr('value') == '') || (account_to == '' && $('#' + rowID + '_ACCOUNT_TO').attr('value') != '') || $('#' + rowID + '_ACCOUNT_TO').attr('class') == 'red') {
                $('#' + rowID + '_ACCOUNT_TO').removeClass().addClass('white');

                if (((jQuery.inArray(statusID, OrignatorStatusID) == 0 && bemsID == $('#BemsOrig').val()) || (jQuery.inArray(statusID, AccountantStatusID) == 0 && bemsID == $('#BemsAcct').val()) || (statusID == 'CA' && bemsID == $('#BemsCostAcct').val()) && ($('#' + rowID + '_ACCOUNT_TO').attr('value') != '1200000' || $('#' + rowID + '_ACCOUNT_TO').attr('value') == '') && (project_trans_code != 'FRG' || project_trans_code == ''))) {

                    if (activity_id_from == '' || period_to == '' || activity_id_from == 'REQUIRED') {
                        $('#' + rowID + '_ACCOUNT_TO').val($('#' + rowID + '_ACCOUNT_TO').attr('value'));
                        mctrObj.showDialog($("#dialog-box"), "Please enter the activity id (from) first", "error");
                    } else if (project_id_from == '' || project_id_from == 'REQUIRED') {
                        $('#' + rowID + '_ACCOUNT_TO').val($('#' + rowID + '_ACCOUNT_TO').attr('value'));
                        mctrObj.showDialog($("#dialog-box"), "Please select the project id (from) first.", "error");
                    }
                    else if (account_from == "") {
                        $('#' + rowID + '_ACCOUNT_TO').val($('#' + rowID + '_ACCOUNT_TO').attr('value'));
                    }
                    else if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "" || $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == 'REQ') {
                        $('#' + rowID + '_ACCOUNT_TO').val($('#' + rowID + '_ACCOUNT_TO').attr('value'));
                        mctrObj.showDialog($("#dialog-box"), "project trans type (from) value must be entered first.", "error");
                    }
                    else if (activity_id_to == '' || activity_id_to == 'REQUIRED') {
                        $('#' + rowID + '_ACCOUNT_TO').val($('#' + rowID + '_ACCOUNT_TO').attr('value'));
                        mctrObj.showDialog($("#dialog-box"), "Please enter the activity id (to) first", "error");
                    }
                    else if (project_id_to == '' || project_id_to == 'REQUIRED') {
                        $('#' + rowID + '_ACCOUNT_TO').val($('#' + rowID + '_ACCOUNT_TO').attr('value'));
                        mctrObj.showDialog($("#dialog-box"), "Please select the project id (to) first.", "error");
                    }

                    else if ((account_to != '' && py_cy_status == 'PY') && (account_to.match(/^6/) || account_to.match(/^7/) || account_to.match(/^8/))) {
                        $('#' + rowID + '_ACCOUNT_TO') = $('#' + rowID + '_ACCOUNT_TO').attr('value');
                        mctrObj.showDialog($("#dialog-box"), "accounts starting with 6, 7, and 8 are not acceptable for prior year.", "error");
                    }
                    else if (account_to == "" && $('#' + rowID + '_ACCOUNT_TO').attr('value') != "" && $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == "LBR") {
                        $('#' + rowID + '_ACCOUNT_TO').val($('#' + rowID + '_ACCOUNT_TO').attr('value'));
                        mctrObj.showDialog($("#dialog-box"), "account (to) value is required when ptt = lbr.", "error");
                    }

                    else {
                        if (account_to.length == 7) {
                            if (home_bugl_from == '') {
                                $('#' + rowID + '_HOME_BUGL_TO').val($('#OrigBu').val());
                            }
                            if ($('#' + rowID + '_WORK_BUGL_TO').val() == '') {
                                $('#' + rowID + '_WORK_BUGL_TO').val($('#OrigBu').val());
                            }
                            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                            var mctrLineItem = $.extend(grid1, grid2, grid3);

                            mctrLineItem.SETID = v_setid;
                            param.push(mctrLineItem);
                            var mctrCreateFormq = $('#form').serialize();
                            var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                            var mctrCreateForm = $.extend({
                                mctrLineItem: param
                            }, mctrCreateFromJson);
                            mctrCreateForm.LineNo = $('#' + rowID + '_LINE_NO').val();
                            $.ajax({
                                type: "POST",
                                url: getBaseUrl('/MctrCreateForm/mctrLineItemaccountToPostTextItem'),
                                data: mctrCreateForm,
                                success: function (data) {
                                    if (data != '') {
                                        v_count = data.V_Count['account_to'];
                                        var v_account_to_wpd = data.V_Count['account_to_wpd'];
                                        if (v_count == 0) {
                                            $('#' + rowID + '_ACCOUNT_TO').val($('#' + rowID + '_ACCOUNT_TO').attr('value'));
                                            //mctrObj.showDialog($("#dialog-box"), "no list of actively effective valid values found for business unit" + $('#' + rowID + '_HOME_BUGL_TO').val() + "", "error");
                                            mctrObj.showDialog($("#dialog-box"), "unable to validate the account from value [ " + account_to + "] entered.", "error");

                                        }
                                        else {
                                            mctrObj.showDialog($("#dialog-box"), "The account to value entered was successfully validated.", "success");
                                            if ($('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == "LBR") {
                                                if (v_account_to_wpd > 0) {
                                                    $('#' + rowID + '_WPD_TO').val('IN');
                                                    $('#' + rowID + '_WPD_TO').removeClass();

                                                }
                                                else if ($('#' + rowID + '_WPD_TO').val() != "" && $('#' + rowID + '_WPD_TO').val() != 'IN') {
                                                    $('#' + rowID + '_WPD_TO').val('');
                                                    $('#' + rowID + '_WPD_TO').removeClass();
                                                }

                                            }
                                            else {
                                                if ($('#' + rowID + '_WPD_TO').val() != "" && $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() != 'REQ') {
                                                    $('#' + rowID + '_WPD_TO').val('');
                                                    $('#' + rowID + '_WPD_TO').removeClass();
                                                }
                                            }
                                        }
                                    }
                                },
                                error: function (data) {
                                    mctrObj.showDialog($("#dialog-box"), "Error", "error");
                                }

                            });
                        }
                        else {
                            $('#' + rowID + '_ACCOUNT_TO').val($('#' + rowID + '_ACCOUNT_TO').attr('value'));
                            mctrObj.showDialog($("#dialog-box"), "Warning - account to value entered does not contained 7 characters.", "warning");
                        }
                        if (account_to != '' || (account_to != $('#' + rowID + '_ACCOUNT_TO').attr('value'))) {
                            $('#' + rowID + '_ttdValue').addClass('white')
                            $('#' + rowID + '_yearValue').addClass('white');
                        }
                    }
                } else {
                    $('#' + rowID + '_ACCOUNT_TO').val($('#' + rowID + '_ACCOUNT_TO').attr('value'));
                    if ((jQuery.inArray(statusID, OrignatorStatusID) == 0 && bemsID == $('#BemsOrig').val()) || ($('#' + rowID + '_ACCOUNT_TO').attr('value') == '1200000' || $('#' + rowID + '_ACCOUNT_TO').attr('value') != '')) {
                        mctrObj.showDialog($("#dialog-box"), "You do not have the proper role and status to change this field when account is 1200000.", "error");
                    }

                    mctrObj.showDialog($("#dialog-box"), "You either do not have the proper role or proper status setting to change this field.", "error");
                }
            }
        });

        $('input[id*=HOME_BUGL_TO]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var mctrno = $('#MctrNo').val();
            var SessionBems = $('#SessionBems').val();
            var period_to = $('#PeriodTo').val();
            var period_from = $('#PeriodFrom').val();
            var statusID = $('#StatusId').val();
            var BemsOrig = $('#BemsOrig').val();
            var global_home_bugl_to = $('#' + rowID + '_HOME_BUGL_TO').attr('value');
            var fiscal_year = $('#fyear').val().trim();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var OrignatorStatusID = ['OA', 'OR'];
            var AccountantStatusID = ['AA', 'OR'];
            var bems_cost_acct = $('#BemsCostAcct').val();
            var v_value_chosen = false;
            var v_setid = "";
            var v_count = 0;
            var BemsAcct = $('#BemsAcct').val();
            var v_value_chosen = false;
            var home_bugl_to = $('#' + rowID + '_HOME_BUGL_TO').val();
            if ((home_bugl_to != global_home_bugl_to) || (home_bugl_to != "" && global_home_bugl_to == "") || (home_bugl_to == "" && global_home_bugl_to != "") || $('#' + rowID + '_HOME_BUGL_TO').attr('class') == "red") {
                if (((statusID == "OA" || statusID == "OR") && BemsOrig == $('#SessionBems').val())) {
                    if (($('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || period_to == "" || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == ("REQUIRED"))) {
                        $('#' + rowID + '_HOME_BUGL_TO').val(global_home_bugl_to);
                        mctrObj.showDialog($("#dialog-box"), "please enter activity id (from).", "error");
                    }
                    else if (($('#' + rowID + '_ACTIVITY_ID_TO').val() == "" || $('#' + rowID + '_ACTIVITY_ID_TO').val() == "REQUIRED")) {
                        $('#' + rowID + '_HOME_BUGL_TO').val(global_home_bugl_to);
                        mctrObj.showDialog($("#dialog-box"), "please enter activity id (to).", "error");
                    }
                    else {
                        if ((py_cy_status == "CY")) {
                            if ((period_from == $('#PeriodFrom').val()) && (period_to != $('#PeriodTo').val())) {
                                period_to = $('#PeriodTo').val();
                            }
                        }

                        if (($('#' + rowID + '_HOME_BUGL_TO').val() == "")) {
                            $('#' + rowID + '_HOME_BUGL_TO').val($('#OrigBu').val());
                        }
                        if (($('#' + rowID + '_HOME_BUGL_TO').val() != $('#OrigBu').val())) {
                            if ((py_cy_status == "CY")) {

                                var param = [];
                                var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                                var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                                var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                                var mctrItem = $.extend(grid1, grid2, grid3);
                                mctrItem.FYEAR = $('#fyear').val().trim();
                                param.push(mctrItem);

                                var mctrCreateFormq = $('#form').serialize();
                                var lineitem = JSON.stringify(mctrCreateFormq);
                                var mctrCreateForm = $.extend({
                                    mctrLineItem: param
                                }, lineitem);

                                $.ajax({
                                    type: "POST",
                                    url: getBaseUrl("/MctrCreateForm/mctrLineItemhomeBuglToPostTextItem"),
                                    data: mctrCreateForm,
                                    success: function (data) {
                                        vcountbuCheck = data.V_Count['buCheck'];
                                        vcountbuAuthority = data.V_Count['buAuthority'];

                                        if (vcountbuCheck == 0) {
                                            $('#' + rowID + '_HOME_BUGL_TO').val($('#OrigBu').val());
                                            mctrObj.showDialog($("#dialog-box"), "business unit value entered was not found on business unit profile table. reset to orig bu.", "error");
                                        }
                                        if (vcountbuAuthority == 0) {
                                            $('#' + rowID + '_HOME_BUGL_TO').val($('#OrigBu').val());
                                            mctrObj.showDialog($("#dialog-box"), "you are not setup with the mctr role bu table authority for bu value entered.", "error");
                                        }
                                        else {
                                            // cannot perform this change until the icat requirements are programmed.
                                            $('#' + rowID + '_HOME_BUGL_TO').val($('#OrigBu').val());
                                            mctrObj.showDialog($("#dialog-box"), "cannot override the home bugl to value at this time.", "error");
                                        }
                                        homebuglto();

                                    },
                                    error: function (data) {

                                        var exmsg = data.responseText;
                                        var ms = exmsg.ExceptionMessage;
                                        mctrObj.showDialog($("#dialog-box"), ms, "error");
                                    }
                                });
                            }
                            else {
                                $('#' + rowID + '_HOME_BUGL_TO').val($('#OrigBu').val());
                                mctrObj.showDialog($("#dialog-box"), "business unit to value can only be changed for a current year cost transfer.", "error");
                                homebuglto();
                            }

                            function homebuglto() {
                                $('#' + rowID + '_HOME_BUGL_TO').removeClass().addClass("white");
                                if ($('#' + rowID + '_HOME_BUGL_TO').val() != global_home_bugl_to) {
                                    if ($('#' + rowID + '_HOME_DEPT_TO').val() != "") {
                                        $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass("red");
                                    }

                                    if ($('#' + rowID + '_HOME_LOC_TO').val() != "") {
                                        $('#' + rowID + '_HOME_LOC_TO').removeClass().addClass("red");
                                    }

                                    if ($('#' + rowID + '_WORK_DEPT_TO').val() != "") {
                                        $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("red");
                                    }

                                    if ($('#' + rowID + '_WORK_LOC_TO').val() != "") {
                                        $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("red");
                                    }
                                    if ($('#' + rowID + '_CLASS_CD_TO ').val() != "") {
                                        $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass("red");
                                    }
                                    if ($('#' + rowID + '_RSC_TO').val() != "") {
                                        $('#' + rowID + '_RSC_TO').removeClass().addClass("red");
                                    }

                                    if ($('#' + rowID + '_WPD_TO').val() != "") {
                                        $('#' + rowID + '_WPD_TO').removeClass().addClass("red");
                                    }

                                    if ($('#' + rowID + '_BULK_TO').val() != "") {
                                        $('#' + rowID + '_BULK_TO').removeClass().addClass("red");
                                    }
                                    if ($('#' + rowID + '_ESTMTG_PRICG_CD_TO').val() != "") {
                                        $('#' + rowID + '_ESTMTG_PRICG_CD_TO').removeClass().addClass("red");
                                    }
                                }
                            }
                        }

                    }
                }
                else {
                    $('#' + rowID + '_HOME_BUGL_TO').val($('#' + rowID + '_HOME_BUGL_TO').attr('value'));
                    mctrObj.showDialog($("#dialog-box"), "you need to be the originator and status must be set to oa to change this field.", "error");
                }
            }
        });

        $('input[id*=_ACCOUNT_FROM]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var period_to = $('#PeriodTo').val();
            var account_from = $('#' + rowID + '_ACCOUNT_FROM').val();
            var globalhold_account_from = $('#' + rowID + '_ACCOUNT_FROM').attr('value');
            var statusID = $('#StatusId').val();
            var OrignatorStatusID = ['OA', 'OR'];
            var AccountantStatusID = ['AA', 'OR'];
            var bemsID = $('#SessionBems').val();
            var v_rate = 0;
            var v_count = 0;
            var param = [];
            var v_setid = 0;
            var project_trans_code = $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val();
            var project_id_from = $('#' + rowID + '_PROJECT_ID_FROM').val();
            var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
            var home_bugl_from = $('#' + rowID + '_HOME_BUGL_FROM').val();
            var py_cy_status = $('#fyear').val().trim() == (new Date).getFullYear() ? 'CY' : 'PY';

            if ((account_from != globalhold_account_from) || (account_from != '' && globalhold_account_from == '') || (account_from == '' && globalhold_account_from != '') || $('#' + rowID + '_ACCOUNT_FROM').attr('class') == "red") {
                $('#' + rowID + '_ACCOUNT_FROM').removeClass().addClass("white");

                if ((((jQuery.inArray(statusID, OrignatorStatusID) == 0 && bemsID == $('#BemsOrig').val()) || (jQuery.inArray(statusID, AccountantStatusID) == 0 && bemsID == $('#BemsAcct').val()) || (statusID == 'CA' && bemsID == $('#BemsCostAcct').val())) && (globalhold_account_from != '1200000' || globalhold_account_from == '') && (project_trans_code != 'FRG' || project_trans_code == ''))) {

                    if (activity_id_from == '' || period_to == '' || activity_id_from == 'REQUIRED') {
                        $('#' + rowID + '_ACCOUNT_FROM').val(globalhold_account_from);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the activity id (from) first", "error");
                    } else if (project_id_from == '' || project_id_from == 'REQUIRED') {
                        $('#' + rowID + '_ACCOUNT_FROM').val(globalhold_account_from);
                        mctrObj.showDialog($("#dialog-box"), "Please select the project id (from) first.", "error");
                    }
                    else if (account_from == '') {
                        $('#' + rowID + '_ACCOUNT_FROM').val(globalhold_account_from);

                        mctrObj.showDialog($("#dialog-box"), "ACCOUNT FROM value cannot be blank and is required for GLPC validation.", "error");
                    }
                    else if ((account_from != '' && py_cy_status == 'PY') && (account_from.match('^6') || account_from.match('^7') || account_from.match('^8'))) {
                        $('#' + rowID + '_ACCOUNT_FROM').val(globalhold_account_from);
                        mctrObj.showDialog($("#dialog-box"), "accounts starting with 6, 7, and 8 are not acceptable for prior year.", "error");
                    }

                    else {
                        if ($('#' + rowID + '_ACCOUNT_FROM').val().length == 7) {
                            if (home_bugl_from == '') {
                                $('#' + rowID + '_HOME_BUGL_FROM').val($('#OrigBu').val());
                            }
                            if ($('#' + rowID + '_WORK_BUGL_FROM').val() == '') {
                                $('#' + rowID + '_WORK_BUGL_FROM').val($('#OrigBu').val());
                            }
                            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                            var mctrLineItem = $.extend(grid1, grid2, grid3);

                            mctrLineItem.SETID = v_setid;
                            param.push(mctrLineItem);
                            var mctrCreateFormq = $('#form').serialize();
                            var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                            var mctrCreateForm = $.extend({
                                mctrLineItem: param
                            }, mctrCreateFromJson);
                            mctrCreateForm.LineNo = $('#' + rowID + '_LINE_NO').val();
                            $.ajax({
                                type: "POST",
                                url: getBaseUrl('/MctrCreateForm/mctrLineItemaccountFromPostTextItem'),
                                data: mctrCreateForm,
                                success: function (data) {
                                    if (data != '') {
                                        v_count = data.V_Count['account_from'];

                                        if (v_count == 0) {
                                            $('#' + rowID + '_ACCOUNT_FROM').val($('#' + rowID + '_ACCOUNT_FROM').attr('value'));
                                            //mctrObj.showDialog($("#dialog-box"), "no list of actively effective valid values found for business unit" + $('#' + rowID + '_HOME_BUGL_TO').val() + "", "error");
                                            mctrObj.showDialog($("#dialog-box"), "Unable to validate the account from value [ " + account_from + "] entered.", "error");

                                        }
                                        else {

                                            mctrObj.showDialog($("#dialog-box"), "The account from value entered was successfully validated.", "success");
                                            $('#' + rowID + '_ACCOUNT_FROM').attr('value', $('#' + rowID + '_ACCOUNT_FROM').val());
                                        }
                                    }

                                },
                                error: function (data) {
                                    mctrObj.showDialog($("#dialog-box"), "Error", "error");
                                }

                            });
                        }
                        else {
                            $('#' + rowID + '_ACCOUNT_FROM').val(globalhold_account_from);
                            mctrObj.showDialog($("#dialog-box"), "warning - account from value entered does not contained 7 characters.", "warning");
                        }

                        if ($('#' + rowID + '_ACCOUNT_FROM').val() != '' || ($('#' + rowID + '_ACCOUNT_FROM').val() != globalhold_account_from)) {
                            $('#' + rowID + '_ttdValue').addClass('white');
                            $('#' + rowID + '_yearValue').addClass('white');
                        }
                    }
                }

                else {
                    $('#' + rowID + '_ACCOUNT_FROM').val($('#' + rowID + '_ACCOUNT_FROM').attr('value'));
                    if ((jQuery.inArray(statusID, OrignatorStatusID) == 0 && bemsID == $('#BemsOrig').val()) || ($('#' + rowID + '_ACCOUNT_FROM').attr('value') == '1200000' || $('#' + rowID + '_ACCOUNT_FROM').attr('value') != '')) {
                        mctrObj.showDialog($("#dialog-box"), "You do not have the proper role and status to change this field when account is 1200000.", "error");
                    }
                    else {

                        mctrObj.showDialog($("#dialog-box"), "You either do not have the proper role or proper status setting to change this field.", "error");
                    }
                }

            }
        });

        $('input[id*=_ESTMTG_PRICG_CD_FROM]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var mctrno = $('#MctrNo').val();
            var SessionBems = $('#SessionBems').val();
            var StatusID = $('#StatusId').val();
            var BemsOrig = $('#BemsOrig').val();
            var class_cd_from = $('#' + rowID + '_CLASS_CD_FROM').val();
            var global_class_cd_from = $('#' + rowID + '_CLASS_CD_FROM').attr('value');
            //var AFFILIATE_TO = $('#' + rowID + 'AFFILIATE_TO').val();
            var proj_trans_type_from = $('#' + rowID + '_PROJ_TRANS_TYPE_FROM ').val();
            var proj_trans_code_from = $('#' + rowID + '_PROJ_TRANS_CODE_FROM ').val();
            var fiscal_year = $('#fyear').val().trim();
            var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
            var account_from = $('#' + rowID + '_ACCOUNT_FROM').val();
            var home_bugl_from = $('#' + rowID + '_HOME_BUGL_FROM').val();;
            var project_id_from = $('#' + rowID + '_PROJECT_ID_FROM').val();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var bems_cost_acct = $('#SessionBems').val();
            var period_to = $('#PeriodTo').val();
            var BemsAcct = $('#BemsOrig').val();
            var v_value_chosen = false;
            var param = [];
            var v_setid = "";
            var v_count = 0;
            var v_countEAS = 0;
            var v_countLOV = 0;
            var global_rsc_from = '';
            var global_set_id = $('#' + rowID + '_HOME_BUGL_FROM').attr('value');
            var global_estmtg_pricg_cd_from = $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').attr('value');
            var estmtg_pricg_cd_from = $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').val();
            var py_cy_status = $('#fyear').val().trim() == (new Date).getFullYear() ? 'CY' : 'PY';


            if ($('#' + rowID + '_ESTMTG_PRICG_CD_FROM').val() != $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').attr('value') || ($('#' + rowID + '_ESTMTG_PRICG_CD_FROM').val() == "" && $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').attr('value') != "") || ($('#' + rowID + '_ESTMTG_PRICG_CD_FROM').val() != '' && $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').attr('value') == "") || $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').attr('class') == "red") {
                if (((StatusID == "OA" || StatusID == "OR") && BemsOrig == $('#SessionBems').val()) || ((StatusID == "AA" || StatusID == "OR") && BemsAcct == $('#SessionBems').val()) || (StatusID == 'CA' && bems_cost_acct == $('#SessionBems').val() && proj_trans_code_from != 'FRG' || proj_trans_code_from == '')) {
                    if ($('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || period_to == "" || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == "REQUIRED") {
                        $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').val(global_estmtg_pricg_cd_from);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the activity id (from) first.", "error");
                    }
                    else if ($('#' + rowID + '_PROJECT_ID_FROM').val() == "" && $('#' + rowID + '_PROJECT_ID_FROM').val() == "REQURIED") {
                        $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').val(global_estmtg_pricg_cd_from);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the project id (from) first.", "error");
                    }
                    else if ($('#' + rowID + '_ACCOUNT_FROM').val() == "") {
                        $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').val(global_estmtg_pricg_cd_from);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the account (from) first.", "error");
                    }
                    else if (($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "" || $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "REQ")) {
                        $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').val(global_estmtg_pricg_cd_from);
                        mctrObj.showDialog($("#dialog-box"), "project trans type (from) value must be entered first.", "error");
                    }


                    else if ((estmtg_pricg_cd_from != "")) {
                        if (($('#' + rowID + '_HOME_BUGL_FROM').val() == "")) {
                            $('#' + rowID + '_HOME_BUGL_FROM').val($('#OrigBu').val());
                        }
                        if ((py_cy_status == "PY" && fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_FROM').val() != "")) {
                            v_setid = $('#' + rowID + '_AFFILIATE_FROM').val();
                        }

                        else {
                            v_setid = $('#' + rowID + '_HOME_BUGL_FROM').val();
                        }
                        var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                        var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                        var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                        var mctrLineItem = $.extend(grid1, grid2, grid3);

                        mctrLineItem.SETID = v_setid;
                        param.push(mctrLineItem);
                        var mctrCreateFormq = $('#form').serialize();
                        var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                        var mctrCreateForm = $.extend({
                            mctrLineItem: param
                        }, mctrCreateFromJson);
                        mctrCreateForm.LineNo = $('#' + rowID + '_LINE_NO').val();


                        $.ajax({
                            url: getBaseUrl('/MctrCreateForm/mctrLineItemestmtgPricgCdFromPostTextItemOpenLOV'),
                            type: 'POST',
                            data: mctrCreateForm,
                            success: function (data) {
                                if (data != '') {
                                    var v_estmtgPricg = data.V_Count['estmtgPricg'];
                                    var v_estmtgPricgCd = data.V_Count['estmtgPricgCd'];

                                    v_count = v_estmtgPricg;

                                    if (v_count == 0) {
                                        v_count = v_estmtgPricgCd;

                                        if (v_count == 0) {
                                            mctrObj.showDialog($("#dialog-box"), "no list of actively effective valid values found for business unit" + $('#' + rowID + '_HOME_BUGL_TO').val() + "", "error");
                                            //mctrObj.showDialog($("#dialog-box"), "Please select from list of valid values provided", "error");
                                            $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').val(global_estmtg_pricg_cd_from);
                                        }
                                        else {
                                            mctrObj.showDialog($("#dialog-box"), "warning - value entered was not found. Please select from list of valid values provided", "warning");

                                            var errorFn = function (jqXHR, textStatus, errorThrown) {
                                            };

                                            var succesFn = function (data) {
                                                if ($('.bootbox').length == 0) {
                                                    if (data) {
                                                        bootbox.dialog({
                                                            title: "Estimating Pricing Code (From) List",
                                                            onEscape: true,
                                                            message: data

                                                        })
                                                    }
                                                };
                                            }
                                            mctrObj.ajaxOptions('/MctrCreateForm/getRgListCecEpFromLOV', 'GET', {
                                                rowId: rowID
                                            }, succesFn, errorFn);
                                        }

                                    }
                                    else {

                                        if (estmtg_pricg_cd_from == global_estmtg_pricg_cd_from && $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').attr('class') == "red") {
                                            $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').removeClass().addClass("white");

                                        }
                                        else {
                                            var succesFn = function (data) {
                                                if ($('.bootbox').length == 0) {
                                                    if (data) {
                                                        bootbox.dialog({
                                                            title: "Estimating Pricing Code (From) List",
                                                            message: data,
                                                            onEscape: true

                                                        })
                                                    }
                                                }
                                            };
                                            mctrObj.ajaxOptions('/MctrCreateForm/getRgListCecEpFromLOV', 'GET', {
                                                rowId: rowID
                                            }, succesFn, errorFn);
                                        }
                                    }

                                }
                            }

                        });
                    }
                    else {
                        $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').removeClass().addClass("white");
                    }
                }
                else {
                    $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').val(global_estmtg_pricg_cd_from);
                    mctrObj.showDialog($("#dialog-box"), "You either do not have the proper role or proper status setting to change this field.", "error");
                }
            }

        });

        $('input[id*=_ESTMTG_PRICG_CD_TO]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var mctrno = $('#MctrNo').val();
            var SessionBems = $('#SessionBems').val();
            var BemsOrig = $('#BemsOrig').val();
            var class_cd_from = $('#' + rowID + '_CLASS_CD_FROM').val();
            var global_class_cd_from = $('#' + rowID + '_CLASS_CD_FROM').attr('value');
            //var AFFILIATE_TO = $('#' + rowID + 'AFFILIATE_TO').val();
            var proj_trans_type_from = $('#' + rowID + '_PROJ_TRANS_TYPE_FROM ').val();
            var proj_trans_code_from = $('#' + rowID + '_PROJ_TRANS_CODE_FROM ').val();
            var fiscal_year = $('#fyear').val().trim();
            var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
            var account_from = $('#' + rowID + '_ACCOUNT_FROM').val();
            var home_bugl_from = $('#' + rowID + '_HOME_BUGL_FROM').val();;
            var project_id_from = $('#' + rowID + '_PROJECT_ID_FROM').val();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var StatusID = $('#StatusId').val();
            var bems_cost_acct = $('#SessionBems').val();
            var period_to = $('#PeriodTo').val();
            var BemsAcct = $('#BemsOrig').val();
            var bems_cost_acct = $('#BemsCostAcct').val();
            var v_value_chosen = false;
            var v_setid = "";
            var v_count = 0;
            var v_countEAS = 0;
            var v_countLOV = 0;
            var global_rsc_from = '';
            var global_set_id = $('#' + rowID + '_HOME_BUGL_FROM').attr('value');
            var param = [];
            var status_id = $('#StatusId').val();
            var bems_orig = $('#BemsOrig').val();
            var SessionBems = $('#SessionBems').val();
            var bems_acct = $('#BemsAcct').val();
            var BemsAcct = $('#BemsOrig').val();
            var bems_cost_acct = $('#BemsCostAcct').val();
            var period_to = $('#PeriodTo').val();
            var fiscal_year = $('#fyear').val().trim();
            var v_setid = "";
            var v_count = 0;
            var global_estmtg_pricg_cd_to = $('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr('value');
            var estmtg_pricg_cd_to = $('#' + rowID + '_ESTMTG_PRICG_CD_TO').val();

            var py_cy_status = $('#fyear').val().trim() == (new Date).getFullYear() ? 'CY' : 'PY';


            if ($('#' + rowID + '_ESTMTG_PRICG_CD_TO').val() != $('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr('value') || ($('#' + rowID + '_ESTMTG_PRICG_CD_TO').val() == "" && $('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr('value') != "") || ($('#' + rowID + '_ESTMTG_PRICG_CD_TO').val() != '' && $('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr('value') == "") || $('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr('class') == "red") {
                if (((StatusID == "OA" || StatusID == "OR") && BemsOrig == $('#SessionBems').val()) || ((StatusID == "AA" || StatusID == "OR") && BemsAcct == $('#SessionBems').val()) || (StatusID == 'CA' && bems_cost_acct == $('#SessionBems').val() && proj_trans_code_from != 'FRG' || proj_trans_code_from == '')) {

                    if ($('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || period_to == "" || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == "REQUIRED") {
                        $('#' + rowID + '_ESTMTG_PRICG_CD_TO').val(global_estmtg_pricg_cd_to);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the activity id (from) first.", "error");
                    }
                    else if ($('#' + rowID + '_PROJECT_ID_FROM').val() == "" && $('#' + rowID + '_PROJECT_ID_FROM').val() == "REQURIED") {
                        $('#' + rowID + '_ESTMTG_PRICG_CD_TO').val(global_estmtg_pricg_cd_to);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the project id (from) first.", "error");
                    }
                    else if ($('#' + rowID + '_ACCOUNT_FROM').val() == "") {
                        $('#' + rowID + '_ESTMTG_PRICG_CD_TO').val(global_estmtg_pricg_cd_to);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the account (from) first.", "error");
                    }
                    else if (($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "" || $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "REQ")) {
                        $('#' + rowID + '_ESTMTG_PRICG_CD_TO').val(global_estmtg_pricg_cd_to);
                        mctrObj.showDialog($("#dialog-box"), "project trans type (from) value must be entered first.", "error");
                    }
                    else if (($('#' + rowID + '_ACTIVITY_ID_TO').val() == null || $('#' + rowID + '_ACTIVITY_ID_TO').val() == "REQUIRED")) {
                        $('#' + rowID + '_ESTMTG_PRICG_CD_TO').val(global_estmtg_pricg_cd_to);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the activity id (to) first.", "error");
                    }
                    else if (($('#' + rowID + '_PROJECT_ID_TO').val() == "" || $('#' + rowID + '_PROJECT_ID_TO').val() == "REQUIRED")) {
                        $('#' + rowID + '_ESTMTG_PRICG_CD_TO').val(global_estmtg_pricg_cd_to);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the project id (to) first.", "error");
                    }
                    else if (($('#' + rowID + '_ACCOUNT_TO').val() == "" && $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == "LBR")) {
                        $('#' + rowID + '_ESTMTG_PRICG_CD_TO').val(global_estmtg_pricg_cd_to);
                        message("Please enter the account (to) first.")
                    }
                    else if ((estmtg_pricg_cd_to != "")) {
                        if (($('#' + rowID + '_HOME_BUGL_TO').val() == "")) {
                            $('#' + rowID + '_HOME_BUGL_FROM').val($('#OrigBu').val());
                        }
                        if ((py_cy_status == "py" && fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_TO').val() != "")) {
                            v_setid = $('#' + rowID + '_AFFILIATE_TO').val();
                        }

                        else {
                            v_setid = $('#' + rowID + '_HOME_BUGL_TO').val();
                        }
                        var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                        var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                        var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                        var mctrLineItem = $.extend(grid1, grid2, grid3);

                        mctrLineItem.SETID = v_setid;
                        param.push(mctrLineItem);
                        var mctrCreateFormq = $('#form').serialize();
                        var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                        var mctrCreateForm = $.extend({
                            mctrLineItem: param
                        }, mctrCreateFromJson);
                        mctrCreateForm.LineNo = $('#' + rowID + '_LINE_NO').val();
                        $.ajax({
                            type: "POST",
                            url: getBaseUrl('/MctrCreateForm/mctrLineItemestmtgPricgCdToPostTextItemOpenLOV'),
                            data: mctrCreateForm,
                            success: function (data) {
                                if (data != '') {
                                    var v_estmtgPricg = data.V_Count['estmtgPricg'];
                                    var v_estmtgPricgCd = data.V_Count['estmtgPricgCd'];
                                    v_count = v_estmtgPricg;
                                    if (v_count == 0) {
                                        v_count = v_estmtgPricgCd;
                                        if (v_count == 0) {
                                            mctrObj.showDialog($("#dialog-box"), "no list of actively effective valid values found for business unit " + $('#' + rowID + '_HOME_BUGL_TO').val() + "", "error");
                                            $('#' + rowID + '_ESTMTG_PRICG_CD_TO').val(global_estmtg_pricg_cd_to);
                                        }
                                        else {
                                            mctrObj.showDialog($("#dialog-box"), "Warning - Value entered was not found. Please select from list of valid values provided", "warning");
                                            var errorFn = function (jqXHR, textStatus, errorThrown) {
                                            };

                                            var succesFn = function (data) {
                                                if ($('.bootbox').length == 0) {
                                                    if (data) {
                                                        bootbox.dialog({
                                                            title: "Estimating Pricing Code (To) List",
                                                            message: data,
                                                            onEscape: true
                                                        })
                                                    }
                                                }
                                            };
                                            mctrObj.ajaxOptions('/MctrCreateForm/getRgListCecEpToLOV', 'GET', {
                                                rowId: rowID
                                            }, succesFn, errorFn);

                                        }
                                    }
                                    else {

                                        if (estmtg_pricg_cd_to == global_estmtg_pricg_cd_to && $('#' + rowID + '_ESTMTG_PRICG_CD_TO').attr('class') == "red") {
                                            $('#' + rowID + '_ESTMTG_PRICG_CD_TO').removeClass().addClass("white");

                                        }
                                        else {
                                            var errorFn = function (jqXHR, textStatus, errorThrown) {
                                            };

                                            var succesFn = function (data) {
                                                if ($('.bootbox').length == 0) {
                                                    if (data) {
                                                        bootbox.dialog({
                                                            title: "Estimating Pricing Code (To) List",
                                                            message: data,
                                                            onEscape: true


                                                        })
                                                    }
                                                }
                                            };
                                            mctrObj.ajaxOptions('/MctrCreateForm/getRgListCecEpToLOV', 'GET', {
                                                rowId: rowID
                                            }, succesFn, errorFn);

                                        }
                                    }
                                }
                            }

                        });
                    }
                    else {
                        $('#' + rowID + '_ESTMTG_PRICG_CD_TO').removeClass().addClass("white");
                    }
                }
                else {
                    $('#' + rowID + '_ESTMTG_PRICG_CD_TO').val(global_estmtg_pricg_cd_to);
                    mctrObj.showDialog($("#dialog-box"), "You either do not have the proper role or proper status setting to change this field.", "error");
                }
            }

        });

        $('input[id*=_CLASS_CD_TO]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var mctrno = $('#MctrNo').val();
            var SessionBems = $('#SessionBems').val();
            var statusID = $('#StatusId').val();
            var BemsOrig = $('#BemsOrig').val();
            var class_cd_to = $('#' + rowID + '_CLASS_CD_TO').val();
            var global_class_cd_to = $('#' + rowID + '_CLASS_CD_TO').attr('value');
            //var AFFILIATE_TO = $('#' + rowID + 'AFFILIATE_TO').val();
            var proj_trans_type_from = $('#' + rowID + '_PROJ_TRANS_TYPE_FROM ').val();
            var proj_trans_type_to = $('#' + rowID + '_PROJ_TRANS_TYPE_TO ').val();
            var proj_trans_code_from = $('#' + rowID + '_PROJ_TRANS_CODE_FROM ').val();
            var proj_trans_code_to = $('#' + rowID + '_PROJ_TRANS_CODE_TO ').val();
            var fiscal_year = $('#fyear').val().trim();
            var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
            var activity_id_to = $('#' + rowID + '_ACTIVITY_ID_TO').val();
            var account_from = $('#' + rowID + '_ACCOUNT_FROM').val();
            var account_to = $('#' + rowID + '_ACCOUNT_TO').val();
            var home_bugl_from = $('#' + rowID + '_HOME_BUGL_FROM').val();
            var home_bugl_to = $('#' + rowID + '_HOME_BUGL_TO').val();
            var project_id_from = $('#' + rowID + '_PROJECT_ID_FROM').val();
            var project_id_to = $('#' + rowID + '_PROJECT_ID_TO').val();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var OrignatorStatusID = ['OA', 'OR'];
            var AccountantStatusID = ['AA', 'OR'];
            var StatusID = $('#StatusId').val();
            var bems_cost_acct = $('#SessionBems').val();
            var period_to = $('#PeriodTo').val();
            var BemsAcct = $('#BemsOrig').val();
            var bems_cost_acct = $('#BemsCostAcct').val();
            var v_value_chosen = true;
            var v_setid = "";
            var v_count = 0;
            var status_id = $('#StatusId').val();
            var bems_orig = $('#BemsOrig').val();
            var bems_acct = $('#BemsAcct').val();
            var period_to = $('#PeriodTo').val();
            var SessionBems = $('#SessionBems').val();
            var BemsAcct = $('#BemsOrig').val();
            var global_class_cd_to = $('#' + rowID + '_CLASS_CD_TO').attr('value');
            var v_setid = "";
            var v_count = 0;
            var bems_cost_acct = $('#BemsCostAcct').val();
            var OrignatorStatusID = ['OA', 'OR'];
            var AccountantStatusID = ['AA', 'OR'];
            var period_from = $('#PeriodFrom').val();
            var fiscal_year = $('#fyear').val().trim();
            var class_cd_to = $('#' + rowID + '_CLASS_CD_TO').val();
            var v_countEAS = 0;
            var v_countLOV = 0;
            var global_rsc_from = '';
            var global_rsc_to = '';
            var global_set_id = $('#' + rowID + '_HOME_BUGL_TO').attr('value');
            var param = [];
            if ((class_cd_to != $('#' + rowID + '_CLASS_CD_TO').attr('value') || (class_cd_to != "" && $('#' + rowID + '_CLASS_CD_TO').attr('value') == "") || (class_cd_to == "" && $('#' + rowID + '_CLASS_CD_TO').attr('value') != "") || $('#' + rowID + '_CLASS_CD_TO').attr('class') == "red")) {
                //if (((jQuery.inArray(OrignatorStatusID) && BemsOrig == $('#SessionBems').val()) || ((jQuery.inArray(AccountantStatusID) && BemsAcct == SessionBems) || (StatusID == "CA" && bems_cost_acct == SessionBems)) && ($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() != "FRG" || $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == ""))) {
                if (((StatusID == "OA" || StatusID == "OR") && BemsOrig == $('#SessionBems').val()) || ((StatusID == "AA" || StatusID == "OR") && BemsAcct == $('#SessionBems').val()) || (StatusID == 'CA' && bems_cost_acct == $('#SessionBems').val() && proj_trans_code_from != 'FRG' || proj_trans_code_from == '')) {
                    if (($('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || period_to == "" || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == "REQUIRED")) {
                        $('#' + rowID + '_CLASS_CD_TO').val(global_class_cd_to);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the activity id (from) first.", "error");
                    } else if (($('#' + rowID + '_PROJECT_ID_FROM').val() == "" || $('#' + rowID + '_PROJECT_ID_FROM').val() == "REQUIRED")) {
                        $('#' + rowID + '_CLASS_CD_TO').val(global_class_cd_to);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the project id (from) first.", "error");
                    } else if (($('#' + rowID + '_ACCOUNT_FROM').val() == "")) {
                        $('#' + rowID + '_CLASS_CD_TO').val(global_class_cd_to);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the account (from) first.", "error");
                    } else if (($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "" || $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == ("REQ"))) {
                        $('#' + rowID + '_CLASS_CD_TO').val(global_class_cd_to);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the project trans type (from) first.", "error");
                    } else if (($('#' + rowID + '_ACTIVITY_ID_TO').val() == "" || $('#' + rowID + '_ACTIVITY_ID_TO').val() == "REQUIRED")) {
                        $('#' + rowID + '_CLASS_CD_TO').val(global_class_cd_to);
                        mctrObj.showDialog($("#dialog-box"), "Please enter activity id (to) first.", "error");
                    } else if (($('#' + rowID + '_PROJECT_ID_TO').val() == "" || $('#' + rowID + '_PROJECT_ID_TO').val() == "REQUIRED")) {
                        $('#' + rowID + '_CLASS_CD_TO').val(global_class_cd_to);
                        mctrObj.showDialog($("#dialog-box"), "Please enter project id to first.", "error");
                    } else if (($('#' + rowID + '_ACCOUNT_TO').val() == "" && $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == "LBR")) {
                        $('#' + rowID + '_CLASS_CD_TO').val(global_class_cd_to);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the account (to) first.", "error");
                    } else {
                        if (($('#' + rowID + '_CLASS_CD_TO').val()) != "") {

                            if ($('#' + rowID + '_HOME_BUGL_TO').val() == '') {
                                $('#' + rowID + '_HOME_BUGL_TO').val($('#OrigBu').val());
                            }
                            if (py_cy_status == 'PY' || fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_TO').val() != '') {
                                v_setid = $('#' + rowID + '_AFFILIATE_TO').val();
                            } else {
                                v_setid = $('#' + rowID + '_HOME_BUGL_TO').val();
                            }
                            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                            var mctrLineItem = $.extend(grid1, grid2, grid3);

                            mctrLineItem.SETID = v_setid;
                            param.push(mctrLineItem);
                            var mctrCreateFormq = $('#form').serialize();
                            var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                            var mctrCreateForm = $.extend({
                                mctrLineItem: param
                            }, mctrCreateFromJson);
                            mctrCreateForm.LineNo = $('#' + rowID + '_LINE_NO').val();

                            $.ajax({
                                url: getBaseUrl('/MctrCreateForm/mctrLineItemclassCdToPostTextItemOpenLOV'),
                                type: 'POST',
                                data: mctrCreateForm,
                                success: function (data) {
                                    if (data != '') {

                                        var v_ClassCd = data.V_Count['ClassCd'];
                                        v_countLOV = data.V_Count['ClassCdLOV'];

                                        v_count = v_ClassCd;
                                        if (v_count == 0) {
                                            v_count = v_countLOV;
                                            if (v_count == 0) {
                                                mctrObj.showDialog($('#dialog-box'), 'unable to validate the class code to value ' + class_cd_to + ' entered for selected ptt.', 'error');
                                                $('#' + rowID + '_CLASS_CD_TO').val(global_class_cd_to);
                                                v_value_chosen = false;
                                            }
                                            else {
                                                mctrObj.showDialog($('#dialog-box'), 'Warning - Value entered was not found. Please select from list of values.', 'warning');
                                                var errorFn = function (jqXHR, textStatus, errorThrown) {

                                                    v_value_chosen = true;
                                                };
                                                var succesFn = function (data) {
                                                    if ($('.bootbox').length == 0) {
                                                        if (data) {
                                                            var box = bootbox.dialog({
                                                                title: "Class Codes (To) Listing",
                                                                onEscape: true,
                                                                message: data

                                                            });

                                                            box.modal('show');
                                                        }
                                                    }
                                                };
                                                v_value_chosen = false;
                                                mctrObj.ajaxOptions('/MctrCreateForm/getRgListClassCodeToLOV', 'GET', {
                                                    rowId: rowID
                                                }, succesFn, errorFn);
                                            }

                                            //if (v_countEAS > 0) {
                                            //    mctrObj.showDialog($('#dialog-box'), 'Accepted - RP Master Accounting found using class code from value entered.', 'success');

                                            //} else {
                                            //    v_value_chosen == false;
                                            //}
                                        }
                                        else {

                                            if (class_cd_to == global_class_cd_to && $('#' + rowID + '_CLASS_CD_TO').attr('class') == 'red') {
                                                //mctrObj.showDialog($('#dialog-box'), 'Accepted - the class code to value was successfully validated.', 'success');
                                                // v_value_chosen = true;
                                                $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass('white');
                                                // $('#' + rowID + '_CLASS_CD_TO').attr('value', $('#' + rowID + '_CLASS_CD_TO').val().toUpperCase());
                                            } else {
                                                // v_value_chosen = show_lov('lov_class_code_to');
                                                var errorFn = function (jqXHR, textStatus, errorThrown) {
                                                    v_value_chosen = true;
                                                };
                                                var succesFn = function (data) {
                                                    if ($('.bootbox').length == 0) {
                                                        if (data) {
                                                            var box = bootbox.dialog({
                                                                title: "Class Codes (To) Listing",
                                                                onEscape: true,
                                                                message: data

                                                            });

                                                            box.modal('show');
                                                        }
                                                    }
                                                };
                                                v_value_chosen = false;
                                                mctrObj.ajaxOptions('/MctrCreateForm/getRgListClassCodeToLOV', 'GET', {
                                                    rowId: rowID
                                                }, succesFn, errorFn);

                                                //if (v_value_chosen = false) {
                                                //    class_cd_to == global_class_cd_to;
                                                //}
                                            }
                                        }
                                        if ((v_value_chosen)) {
                                            $('#' + rowID + '_CLASS_CD_TO').val(global_class_cd_to);

                                        }
                                        else {
                                            if ($('#' + rowID + '_CLASS_CD_TO').val() == "") {

                                                $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass("white");
                                            }
                                            //if ($('#' + rowID + '_CLASS_CD_TO').val() != "" && $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() != "LBR") {
                                            //    mctrLineItem.CLASS_CD_TO = rowObject.CLASS_CD7;
                                            //    param.push(mctrLineItem);
                                            //    var mctrCreateFormq = $('#form').serialize();
                                            //    var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                                            //    var mctrCreateForm = $.extend({ mctrLineItem: param }, mctrCreateFromJson);
                                            //    mctrCreateForm.py_cy_status = $('#fyear').val().trim() == (new Date).getFullYear() ? 'CY' : 'PY';
                                            //    mctrCreateForm.OrigBu = $('#OrigBu').val();

                                            //    $.ajax({
                                            //        url: getBaseUrl('/MctrCreateForm/mctrLineItemclassCdToPostTextItemOpenLOV'),
                                            //        type: 'POST',
                                            //        data: mctrCreateForm,
                                            //        success: function (data) {
                                            //            if (data != '') {
                                            //                $('#' + rowID + '_RSC_TO').val(data.V_Countstring['rscto']);
                                            //                $('#' + rowID + '_RSC_TO').attr('value', data.V_Countstring['rscto']);

                                            //            }
                                            //        },
                                            //        error: function () { }
                                            //    });
                                        }
                                    }
                                }
                            });
                        }
                        else {
                            $('#' + rowID + '_CLASS_CD_TO').attr('value', $('#' + rowID + '_CLASS_CD_TO').val());
                            if (proj_trans_code_from == "OTS" || proj_trans_code_from == "STR") {

                                mctrObj.showDialog($('#dialog-box'), 'warning: class code to value is required when ptt = lbr along with home department.', 'warning');

                            }
                            $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass('white');
                        }

                    }
                }
                else {
                    $('#' + rowID + '_CLASS_CD_TO').val(global_class_cd_to);
                    mctrObj.showDialog($('#dialog-box'), 'You either do not have the proper role  or  proper status setting to change this field.', 'error');

                }
            }


        });

        $('input[id*=_CLASS_CD_FROM]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var mctrno = $('#MctrNo').val();
            var SessionBems = $('#SessionBems').val();
            var statusID = $('#StatusId').val();
            var BemsOrig = $('#BemsOrig').val();
            var class_cd_from = $('#' + rowID + '_CLASS_CD_FROM').val();
            var global_class_cd_from = $('#' + rowID + '_CLASS_CD_FROM').attr('value');
            //var AFFILIATE_TO = $('#' + rowID + 'AFFILIATE_TO').val();
            var proj_trans_type_from = $('#' + rowID + '_PROJ_TRANS_TYPE_FROM ').val();
            var proj_trans_code_from = $('#' + rowID + '_PROJ_TRANS_CODE_FROM ').val();
            var fiscal_year = $('#fyear').val().trim();
            var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
            var account_from = $('#' + rowID + '_ACCOUNT_FROM').val();
            var home_bugl_from = $('#' + rowID + '_HOME_BUGL_FROM').val();;
            var project_id_from = $('#' + rowID + '_PROJECT_ID_FROM').val();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var OrignatorStatusID = ['OA', 'OR'];
            var AccountantStatusID = ['AA', 'OR'];
            var StatusID = $('#StatusId').val();
            var bems_cost_acct = $('#SessionBems').val();
            var period_to = $('#PeriodTo').val();;
            var BemsAcct = $('#BemsOrig').val();
            var bems_cost_acct = $('#BemsCostAcct').val();
            var v_value_chosen = true;
            var v_setid = "";
            var v_count = 0;
            var v_countEAS = 0;
            var v_countLOV = 0;
            var global_rsc_from = $('#' + rowID + '_RSC_FROM').attr('value');
            var vflag = true; //validate flag
            // var global_set_id = $('#' + rowID + '_HOME_BUGL_FROM').attr('value');
            var param = [];
            if ((class_cd_from != global_class_cd_from) || (class_cd_from != '' && global_class_cd_from == '') || (class_cd_from == '' && global_class_cd_from != '') || ($('#' + rowID + '_CLASS_CD_FROM').attr('class') == "red")) {
                if (((StatusID == "OA" || StatusID == "OR") && BemsOrig == $('#SessionBems').val()) || ((StatusID == "AA" || StatusID == "OR") && BemsAcct == $('#SessionBems').val()) || (StatusID == 'CA' && bems_cost_acct == $('#SessionBems').val() && proj_trans_code_from != 'FRG' || proj_trans_code_from == '')) {
                    if (activity_id_from == '' || period_to == '' || activity_id_from == 'REQUIRED') {
                        $('#' + rowID + '_CLASS_CD_FROM').val(global_class_cd_from);
                        mctrObj.showDialog($('#dialog-box'), 'Please Enter The Activity Id (From) First.', 'error');
                        vflag = false;
                    } else if (vflag && project_id_from == '' || project_id_from == 'REQUIRED') {
                        $('#' + rowID + '_CLASS_CD_FROM').val(global_class_cd_from);
                        mctrObj.showDialog($('#dialog-box'), 'Please Enter The Project Id (From) First.', 'error');
                        vflag = false;
                    } else if (vflag && account_from == '') {
                        $('#' + rowID + '_CLASS_CD_FROM').val(global_class_cd_from);
                        vflag = false;
                        mctrObj.showDialog($('#dialog-box'), 'Please enter the account (from) first.', 'error');
                    } else if (vflag && proj_trans_type_from == '' || proj_trans_type_from == 'REQ') {
                        $('#' + rowID + '_CLASS_CD_FROM').val(global_class_cd_from);
                        mctrObj.showDialog($('#dialog-box'), 'project trans type (from) value must be entered first.', 'error');
                        vflag = false;
                    } else {
                        if ($('#' + rowID + '_HOME_BUGL_FROM').val() == '') {
                            $('#' + rowID + '_HOME_BUGL_FROM').val($('#OrigBu').val());
                        }

                        var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                        var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                        var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                        var mctrLineItem = $.extend(grid1, grid2, grid3);

                        if (py_cy_status == 'PY' && fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_FROM').val() != '') {
                            mctrLineItem.SETID = $('#' + rowID + '_AFFILIATE_TO').val()
                        }
                        else {
                            mctrLineItem.SETID = $('#' + rowID + '_HOME_BUGL_TO').val()
                        }
                        param.push(mctrLineItem);
                        var mctrCreateFormq = $('#form').serialize();
                        var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                        var mctrCreateForm = $.extend({
                            mctrLineItem: param
                        }, mctrCreateFromJson);
                        mctrCreateForm.LineNo = $('#' + rowID + '_LINE_NO').val();
                        mctrCreateForm.OrigBu = $('#OrigBu').val();

                        $.ajax({
                            url: getBaseUrl('/MctrCreateForm/mctrLineItemClassCditemOpenLOV'),
                            type: 'POST',
                            data: mctrCreateForm,
                            success: function (data) {
                                if (data != '') {
                                    var v_ClassCd = data.V_Count['ClassCd'];
                                    v_countEAS = data.V_Count['ClassCdEAS'];
                                    v_countLOV = data.V_Count['ClassCdLOV'];
                                    //var v_rscfrom = data.V_Countstring['rscfrom'];

                                    if (($('#' + rowID + '_CLASS_CD_FROM').val() != "")) {
                                        v_count = v_ClassCd;
                                        if (v_count == 0) {
                                            //lbr comparision moved to repository.
                                            v_count = v_countEAS;
                                            if (v_count > 0) {
                                                v_value_chosen = false;
                                                mctrObj.showDialog($('#dialog-box'), 'Accepted - RP Master Accounting found using class code from value entered.', 'success');
                                                $('#' + rowID + '_CLASS_CD_FROM').attr('value', ($('#' + rowID + '_CLASS_CD_FROM').val().toUpperCase()));

                                            }
                                            else {
                                                v_value_chosen = true;
                                            }
                                        }
                                        else {

                                            if (class_cd_from == class_cd_from && $('#' + rowID + '_CLASS_CD_FROM').attr("class") == 'red') {
                                                v_value_chosen = false;
                                                mctrObj.showDialog($('#dialog-box'), 'Accepted - the class code from value was successfully validated.', 'success');
                                                $('#' + rowID + '_CLASS_CD_FROM').attr('value', $('#' + rowID + '_CLASS_CD_FROM').val());

                                            }
                                            else {
                                                // v_value_chosen = show_lov('lov_class_code_from');
                                                var errorFn = function (jqXHR, textStatus, errorThrown) {

                                                };
                                                var succesFn = function (data) {
                                                    if ($('.bootbox').length == 0) {
                                                        if (data) {
                                                            var box = bootbox.dialog({
                                                                title: "Class Codes (From) Listing",
                                                                onEscape: true,
                                                                message: data
                                                            });
                                                            box.modal('show');
                                                        }
                                                    }
                                                };
                                                v_value_chosen = true;
                                                mctrObj.ajaxOptions('/MctrCreateForm/getRgListClassCodeFromLOV', 'GET', {
                                                    rowId: rowID
                                                }, succesFn, errorFn);
                                            }
                                        }

                                        if (v_count == 0 || (v_value_chosen)) {
                                            v_count = v_countLOV;
                                            if (v_count == 0) {
                                                mctrObj.showDialog($('#dialog-box'), 'unable to validate the class code from value ' + class_cd_from + ' entered for selected ptt.', 'error');
                                                $('#' + rowID + '_CLASS_CD_FROM').val(global_class_cd_from);

                                            } else {
                                                // if (v_countLOV == 0) {
                                                mctrObj.showDialog($('#dialog-box'), 'Warning - Value entered was not found. Please select from list of values.', 'warning');
                                                var errorFn = function (jqXHR, textStatus, errorThrown) {

                                                };
                                                var succesFn = function (data) {
                                                    if (data) {
                                                        if ($('.bootbox').length == 0) {
                                                            var box = bootbox.dialog({
                                                                title: "Class Codes (From) Listing",
                                                                onEscape: true,
                                                                message: data
                                                            });
                                                            box.modal('show');
                                                        }
                                                    }
                                                };
                                                mctrObj.ajaxOptions('/MctrCreateForm/getRgListClassCodeFromLOV', 'GET', {
                                                    rowId: rowID
                                                }, succesFn, errorFn);
                                                //  }
                                                // v_value_chosen = show_lov('lov_list_class_code_from');

                                            }
                                        }
                                        else {
                                            $('#' + rowID + '_CLASS_CD_FROM').removeClass().addClass('white');
                                        }


                                    }
                                    else {
                                        // class code is normally required when labor hours are entered.
                                        $('#' + rowID + '_CLASS_CD_FROM').attr('value', $('#' + rowID + '_CLASS_CD_FROM').val());
                                        if (proj_trans_code_from == "OTS" || proj_trans_code_from == "STR") {

                                            mctrObj.showDialog($('#dialog-box'), 'warning: class code from value is required when ptt = lbr along with home department.', 'warning');
                                        }
                                        $('#' + rowID + '_CLASS_CD_FROM').removeClass().addClass('white');
                                    }
                                    //if (v_value_chosen == false) {
                                    //    $('#' + rowID + '_CLASS_CD_FROM').val(global_class_cd_from);
                                    //} else {
                                    //    mctrObj.showDialog($('#dialog-box'), 'Warning - Value entered was not found. Please select from list of values.', 'warning');
                                    //    $('#' + rowID + '_CLASS_CD_FROM').removeClass().addClass('white');
                                    //}

                                    if ((class_cd_from != global_class_cd_from) || (class_cd_from == '' && global_class_cd_from != '') || (class_cd_from != '' && global_class_cd_from == '')) {
                                        // mctrLineItem.CLASS_CD_FROM = $('#' + rowID + '_CLASS_CD_FROM').val();
                                        //$('#' + rowID + '_RSC_FROM').val(v_rscfrom)
                                        $('#' + rowID + '_TTD_FLAG').addClass("white");
                                        $('#' + rowID + '_YEARVALUE').addClass("white");

                                        if ($('#' + rowID + '_CLASS_CD_FROM') != "" && (proj_trans_type_from != 'LBR')) {
                                            if (($('#' + rowID + '_RSC_FROM').val() != global_rsc_from) || ($('#' + rowID + '_RSC_FROM').val() != '' && global_rsc_from == '')) {
                                                $('#' + rowID + '_RSC_FROM').removeClass().addClass("White");
                                            }
                                        }
                                    }


                                    //if ($('#' + rowID + '_RSC_FROM').val() == global_rsc_from || $('#' + rowID + '_RSC_FROM').val() != '' && global_rsc_from == '') {
                                    //    $('#' + rowID + '_RSC_FROM').removeClass().addClass("White");
                                    //} else {
                                    //    $('#' + rowID + '_CLASS_CD_FROM').val(global_class_cd_from);
                                    //    mctrObj.showDialog($('#dialog-box'), 'You either do not have the proper role  or  proper status setting to change this field.', 'error');
                                    //    mctrObj.showDialog($('#dialog-box'), 'You either do not have the proper role  or  proper status setting to change this field.', 'error');
                                    //    // raise form_trigger_failure;
                                    //}
                                }
                            }
                        });
                    }
                }
                else {
                    $('#' + rowID + '_CLASS_CD_FROM').val(global_class_cd_from);
                    mctrObj.showDialog($('#dialog-box'), 'You either do not have the proper role  or  proper status setting to change this field.', 'error');
                }
            }

        });

        $('input[id*=HOME_DEPT_TO]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var mctrno = $('#MctrNo').val();
            var SessionBems = $('#SessionBems').val();
            var statusID = $('#StatusId').val();
            var BemsOrig = $('#BemsOrig').val();
            var home_loc_to = $('#' + rowID + '_HOME_LOC_TO').val();
            var work_dept_to = $('#' + rowID + '_WORK_DEPT_TO').val();
            var work_loc_to = $('#' + rowID + '_WORK_LOC_TO').val();
            var work_pool_to = $('#' + rowID + '_WORK_POOL_TO').val();
            var home_pool_to = $('#' + rowID + '_HOME_POOL_TO').val();
            var class_cd_to = $('#' + rowID + '_CLASS_CD_TO').val();
            var global_rsc_to = $('#' + rowID + '_RSC_TO').attr('value');
            var rsc_to = $('#' + rowID + '_RSC_TO').val();
            var global_class_cd_to = $('#' + rowID + '_CLASS_CD_TO').attr('value')
            var home_dept_to = $('#' + rowID + '_HOME_DEPT_TO').val();
            var global_home_dept_to = $('#' + rowID + '_HOME_DEPT_TO').attr('value');
            //var AFFILIATE_TO = $('#' + rowID + 'AFFILIATE_TO').val();
            var proj_trans_type_from = $('#' + rowID + '_PROJ_TRANS_TYPE_FROM ').val();
            var proj_trans_type_to = $('#' + rowID + '_PROJ_TRANS_TYPE_TO ').val();
            var proj_trans_code_from = $('#' + rowID + '_PROJ_TRANS_CODE_FROM ').val();
            var proj_trans_code_to = $('#' + rowID + '_PROJ_TRANS_CODE_TO ').val();
            var fiscal_year = parseInt($('#fyear').val());
            var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
            var activity_id_to = $('#' + rowID + '_ACTIVITY_ID_TO').val();
            var account_from = $('#' + rowID + '_ACCOUNT_FROM').val();
            var amount_to = $('#' + rowID + '_AMOUNT_TO').val();
            var amount_from = $('#' + rowID + '_AMOUNT_FROM').val();
            var account_to = $('#' + rowID + '_ACCOUNT_TO').val();
            var home_bugl_from = $('#' + rowID + '_HOME_BUGL_FROM').val();
            var home_bugl_to = $('#' + rowID + '_HOME_BUGL_TO').val();;
            var project_id_from = $('#' + rowID + '_PROJECT_ID_FROM').val();
            var project_id_to = $('#' + rowID + '_PROJECT_ID_TO').val();
            var labor_rate_cd7_to = $('#' + rowID + '_LABOR_RATE_CD7_TO').val();
            var labor_rate_cd7_from = $('#' + rowID + '_LABOR_RATE_CD7_FROM').val();
            var quantity_to = $('#' + rowID + '_QUANTITY_TO').val();
            var quantity_from = $('#' + rowID + '_QUANTITY_FROM').val();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var OrignatorStatusID = ['OA', 'OR'];
            var AccountantStatusID = ['AA', 'OR'];
            var StatusID = $('#StatusId').val();
            var bems_cost_acct = $('#BemsCostAcct').val();
            var period_to = $('#PeriodTo').val();
            var period_from = $('#PeriodFrom').val();
            var global_period_from = $('#PeriodFrom').attr('value');
            var global_period_to = $('#PeriodTo').attr('value');
            var BemsAcct = $('#BemsOrig').val();
            var bems_cost_acct = $('#BemsCostAcct').val();
            var v_value_chosen = true;
            var v_setid = "";
            var v_count = 0;
            var v_countEAS = 0;
            var v_countLOV = 0;
            var dept_red_flg_to = 0;
            var dept_status = 0;
            var work_dept_red_flg_to = 0;
            var global_rsc_from = '';
            var global_set_id = $('#' + rowID + '_HOME_BUGL_FROM').attr('value');
            var param = [];
            var validate = true;
            if ((home_dept_to != global_home_dept_to) || (home_dept_to != '' && home_loc_to == '') || (home_dept_to != '' && global_home_dept_to == '') || (home_dept_to == '' && global_home_dept_to != '') || ($('#' + rowID + '_HOME_DEPT_TO').attr('class') == "red")) {
                if (((jQuery.inArray(statusID, OrignatorStatusID) == 0) && BemsOrig == SessionBems) || ((jQuery.inArray(statusID, AccountantStatusID) == 0) && BemsAcct == SessionBems) || (StatusID == 'CA' && bems_cost_acct == SessionBems) && (proj_trans_code_from != 'FRG' || proj_trans_code_from == '')) {
                    if (activity_id_from == '' || period_to == '' || activity_id_from == 'REQUIRED') {
                        $('#' + rowID + '_HOME_DEPT_TO').val(global_home_dept_to);
                        mctrObj.showDialog($('#dialog-box'), 'Please Enter The Activity Id (From) First.', 'error');
                        validate = false;
                    } else if (validate && (project_id_from == '' || project_id_from == 'REQUIRED')) {
                        $('#' + rowID + '_HOME_DEPT_TO').val(global_home_dept_to);
                        mctrObj.showDialog($('#dialog-box'), 'Please Enter The Project Id (From) First.', 'error');
                        validate = false;
                    } else if (validate && account_from == '') {
                        $('#' + rowID + '_HOME_DEPT_TO').val(global_home_dept_to);
                        mctrObj.showDialog($('#dialog-box'), 'Please enter the account (from) first.', 'error');
                        validate = false;
                    } else if (validate && (proj_trans_type_from == '' || proj_trans_type_from == 'REQ')) {
                        $('#' + rowID + '_HOME_DEPT_TO').val(global_home_dept_to);
                        mctrObj.showDialog($('#dialog-box'), 'project trans type (from) value must be entered first.', 'error');
                        validate = false;
                    } else if (validate && (activity_id_to == '' || activity_id_to == 'REQUIRED')) {
                        $('#' + rowID + '_HOME_DEPT_TO').val(global_home_dept_to);
                        mctrObj.showDialog($('#dialog-box'), 'Please enter the activity id (to) first.', 'error');
                        validate = false;
                    } else if (validate && (project_id_to == '' || project_id_to == 'REQUIRED')) {
                        $('#' + rowID + '_HOME_DEPT_TO').val(global_home_dept_to);
                        mctrObj.showDialog($('#dialog-box'), 'Please enter the project id (to) first.', 'error');
                        validate = false;
                    } else if (validate && (account_to == '' && proj_trans_type_to == 'LBR')) {
                        $('#' + rowID + '_HOME_DEPT_TO').val(global_home_dept_to);
                        mctrObj.showDialog($('#dialog-box'), 'Please enter the account (to) first.', 'error')
                        validate = false;;
                    } else if (validate && (home_dept_to != '' && home_loc_to != '' && home_dept_to == global_home_dept_to && $('#' + rowID + '_HOME_POOL_TO').val() != '' && $('#' + rowID + '_HOME_DEPT_TO').attr('class') == "red")) {
                        $('#' + rowID + '_HOME_LOC_TO').removeClass().addClass('red');
                        $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass('white');
                        $('#' + rowID + '_HOME_DEPT_TO').attr("red-flag", "N");
                    } else {
                        if (py_cy_status == 'CY') {
                            if (period_from == global_period_from && period_to != global_period_to) {
                                $('#PeriodTo').val(global_period_to);
                            }
                        }
                        if (home_bugl_to == '') {
                            $('#' + rowID + '_HOME_BUGL_TO').val($('#OrigBu').val());
                        }

                        if (py_cy_status == 'PY' || fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_FROM').val() != '') {
                            v_setid = $('#' + rowID + '_AFFILIATE_TO').val();
                        } else {
                            v_setid = $('#' + rowID + '_HOME_BUGL_TO').val();
                        }
                        //v_setid = $('#' + rowID + '_HOME_BUGL_FROM').val();


                        var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                        var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                        var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                        var mctrLineItem = $.extend(grid1, grid2, grid3);

                        mctrLineItem.SETID = v_setid;
                        param.push(mctrLineItem);
                        var mctrCreateFormq = $('#form').serialize();
                        var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                        var mctrCreateForm = $.extend({
                            mctrLineItem: param
                        }, mctrCreateFromJson);
                        mctrCreateForm.PeriodTo = $('#PeriodTo').val();
                        mctrCreateForm.LineNo = $('#' + rowID + '_LINE_NO').val();

                        $.ajax({
                            url: getBaseUrl('/MctrCreateForm/mctrLineItemhomeDeptToPostTextItemOpenLOV'),
                            type: 'POST',
                            data: mctrCreateForm,
                            success: function (data) {
                                if (data != '') {

                                    v_count = data.V_Count['HomeDept'];
                                    //v_countLOV = data.V_Count['HomeDeptLOV'];

                                    if ($('#' + rowID + '_HOME_DEPT_TO').val() != '') {
                                        if (v_count == 0 || v_count != 0) {

                                            var succesFn = function (data) {
                                                if ($('.bootbox').length == 0) {

                                                    if (data) {
                                                        var box = bootbox.dialog({
                                                            title: " Home Department (To) List",
                                                            onEscape: true,
                                                            message: data
                                                        });
                                                        box.on("shown.bs.modal", function () {
                                                            if (v_count == 0) {
                                                                mctrObj.showDialog($('#warning-msg'), 'Warning - Value entered was not found. List of valid values provided.', 'warning');
                                                            }
                                                        });
                                                        //  box.modal('show');
                                                    } else {
                                                        $('#' + rowID + '_HOME_DEPT_TO').val(global_home_dept_to);
                                                    }
                                                }
                                            };


                                            var errorFn = function (jqXHR, textStatus, errorThrown) {
                                                v_value_chosen = true;
                                                $('#' + rowID + '_HOME_DEPT_TO').val(global_home_dept_to);
                                            };
                                            v_value_chosen = false;
                                            mctrObj.ajaxOptions('/MctrCreateForm/getRgListHomeDeptToLOV', 'GET', {
                                                rowId: rowID
                                            }, succesFn, errorFn);
                                        }
                                    }

                                    if (v_value_chosen == true || (home_dept_to == '' && global_home_dept_to != '')) {
                                        $('#' + rowID + '_HOME_DEPT_TO').attr('red-flag', 'N');
                                        $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass("white");
                                        $('#' + rowID + '_HOME_DEPT_TO').attr("red-flag", "N");
                                        $('#' + rowID + '_HOME_LOC_TO').removeClass().addClass("white");

                                        if (home_dept_to != '') {
                                            // if (rowObject.EFF_STATUS == 'I') {
                                            // dept_red_flg_to = 'Y';
                                            // $('#' + rowId + '_HOME_DEPT_TO').removeClass().addClass("orange");
                                            // mctrObj.showDialog($('#dialog-box'), 'warning: inactive department/location combination selected.', 'warning');

                                            // }
                                            if (proj_trans_type_to == 'LBR') {
                                                if (proj_trans_code_to == 'PRM') {
                                                    $('#' + rowID + '_LABOR_RATE_CD7_TO').val('00');
                                                    $('#' + rowID + '_QUANTITY_TO').val('.00');
                                                    $('#' + rowID + '_QUANTITY_FROM').val('.00');
                                                    if (amount_to != 0) {
                                                        $('#' + rowID + '_AMOUNT_TO').removeClass().addClass('red');
                                                    } else {
                                                        if (amount_from != 0) {
                                                            $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass('red');

                                                        }
                                                    }
                                                }
                                                if (class_cd_to != '' && global_class_cd_to != '' && global_class_cd_to != class_cd_to) {
                                                    $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass('red');
                                                } else {
                                                    $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass('white');
                                                }
                                                if (rsc_to != '' && global_rsc_to != '' && global_rsc_to != rsc_to) {
                                                    $('#' + rowID + '_RSC_TO').removeClass().addClass('red');
                                                } else {
                                                    $('#' + rowID + '_RSC_TO').removeClass().addClass('white');
                                                }
                                                //} 
                                            }
                                            else {
                                                $('#' + rowID + '_LABOR_RATE_CD7_TO').val('');
                                                $('#' + rowID + '_CLASS_CD_TO').val(global_class_cd_to);
                                                $('#' + rowID + '_RSC_TO').val(global_rsc_to);
                                            }
                                            if ((work_dept_to == '' && work_loc_to == '') || (work_dept_to == home_dept_to && work_loc_to == '')) {
                                                $('#' + rowID + '_WORK_DEPT_TO').val($('#' + rowID + '_HOME_DEPT_TO'));
                                                $('#' + rowID + '_WORK_LOC_TO').val($('#' + rowID + '_HOME_LOC_TO'));
                                                $('#' + rowID + '_WORK_POOL_TO').val($('#' + rowID + '_HOME_POOL_TO'));

                                                //if (rowObject.EFF_STATUS == 'I') {
                                                //    $('#' + rowId + '_WORK_DEPT_TO').attr('red-flag', 'Y');
                                                //    $('#' + rowId + '_WORK_DEPT_TO').removeClass().addClass('orange');
                                                //} else {
                                                //    $('#' + rowId + '_WORK_DEPT_TO').attr('red-flag', 'N');
                                                //    $('#' + rowId + '_WORK_DEPT_TO').removeClass().addClass('white');

                                                //}
                                                $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass('white');
                                            }
                                            else if (home_loc_to != '' && (work_dept_to == '' || work_loc_to == '' || work_pool_to == '' || work_dept_to != home_dept_to || work_loc_to != home_loc_to || work_pool_to != home_pool_to)) {
                                                bootbox.confirm("Do you want to override Work Department/Location using Home Department/Location selection? Click OK button to accept.", function (result) {
                                                    if (result) {
                                                        $('#' + rowID + '_WORK_DEPT_TO').val(work_dept_to);
                                                        // $('#' + rowId + '_WORK_LOC_TO ').val(ACCTG_LOC_CD7);
                                                        //$('#' + rowId + '_WORK_POOL_TO ').val(rowObject.ALLOW_POOL_CD7);

                                                    }
                                                    //if (rowObject.EFF_STATUS == 'I') {
                                                    // work_dept_red_flg_to = 'Y';
                                                    //$('#' + rowId + '_WORK_DEPT_TO').removeClass().addClass('orange');
                                                    //} else {
                                                    //   work_dept_red_flg_to = 'N';
                                                    // $('#' + rowId + '_WORK_DEPT_TO').removeClass().addClass('white');
                                                    //}
                                                    $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass('white');

                                                });
                                            }


                                                // }
                                                // }
                                            else {
                                                if (home_dept_to != '' && home_dept_to == work_dept_to && home_loc_to != '' && home_loc_to == work_loc_to) {
                                                    //if (rowObject.EFF_STATUS == 'I') {
                                                    //    $('#' + rowId + '_WORK_DEPT_TO').attr('red-flag', 'Y');
                                                    //    $('#' + rowId + '_WORK_DEPT_TO').removeClass().addClass('orange');
                                                    //}
                                                    //else {
                                                    //    $('#' + rowId + '_WORK_DEPT_TO').attr('red-flag', 'N');
                                                    //    $('#' + rowId + '_WORK_DEPT_TO').removeClass().addClass('white');
                                                    //}
                                                }
                                                $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass('white');
                                            }
                                        }
                                        else {
                                            $('#' + rowID + '_HOME_DEPT_TO').attr('value', $('#' + rowID + '_HOME_DEPT_TO').val());
                                            $('#' + rowID + '_HOME_POOL_TO').val("");
                                            $('#' + rowID + '_LABOR_RATE_CD7_TO').val("");
                                            if ($('#' + rowID + '_HOME_LOC_TO').val() != '') {
                                                $('#' + rowID + '_HOME_LOC_TO').removeClass().addClass('red');
                                            }
                                            if ($('#' + rowID + '_CLASS_CD_TO').val() != '') {
                                                $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass('red');
                                            }
                                            if ($('#' + rowID + '_RSC_TO').val() != '') {
                                                $('#' + rowID + '_RSC_TO').removeClass().addClass('red');
                                            }
                                            if (proj_trans_type_to == 'LBR') {
                                                mctrObj.showDialog($('#dialog-box'), 'warning: home department/location to selection is normally required when ptt = lbr.', 'warning');

                                            }
                                        }
                                        //dept_status = '';
                                        if (proj_trans_type_to == 'LBR') {
                                            // needs to be verified
                                            $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass('white');
                                            $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass('white');
                                        } else if ($('#' + rowID + '_QUANTITY_FROM').val() == 0 && $('#' + rowID + '_AMOUNT_FROM').val() == 0) {
                                            $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass('white');
                                            $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass('white');
                                        }
                                        if (labor_rate_cd7_to == 'NR' && (labor_rate_cd7_from != 'NR' || labor_rate_cd7_from == '')) {
                                            $('#' + rowID + '_LABOR_RATE_CD7_TO').removeClass().addClass('yellow');
                                            $('#' + rowID + '_AMOUNT_TO').removeClass().addClass('yellow');
                                        }
                                        else {
                                            $('#' + rowID + '_LABOR_RATE_CD7_TO').removeClass();//field_black_on_gray
                                            $('#' + rowID + '_AMOUNT_TO').removeClass();//field_black_on_white
                                        }

                                        // }
                                    }
                                }
                            }
                        });
                    }
                } else {
                    $('#' + rowID + '_HOME_DEPT_TO').val(global_home_dept_to);
                    mctrObj.showDialog($('#dialog-box'), 'You either do not have the proper role or proper status setting to change this field.', 'error');

                }
            }
        });

        $('input[id*=HOME_DEPT_FROM]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            // var rowId = e.target.id.slice(0, 1);
            var mctrno = $('#MctrNo').val();
            var SessionBems = $('#SessionBems').val();
            var statusID = $('#StatusId').val();
            var BemsOrig = $('#BemsOrig').val();
            var home_loc_from = $('#' + rowID + '_HOME_LOC_FROM').val();
            var work_dept_from = $('#' + rowID + '_WORK_DEPT_FROM').val();
            var work_loc_from = $('#' + rowID + '_WORK_LOC_FROM').val();
            var work_pool_from = $('#' + rowID + '_WORK_POOL_FROM').val();
            var home_pool_from = $('#' + rowID + '_HOME_POOL_FROM').val();
            var class_cd_from = $('#' + rowID + '_CLASS_CD_FROM').val();
            var global_rsc_from = $('#' + rowID + '_RSC_FROM').attr('value');
            var rsc_from = $('#' + rowID + '_RSC_TO').val();
            var global_class_cd_from = $('#' + rowID + '_CLASS_CD_FROM').attr('value')
            var home_dept_from = $('#' + rowID + '_HOME_DEPT_FROM').val();
            var global_home_dept_from = $('#' + rowID + '_HOME_DEPT_FROM').attr('value');
            //var AFFILIATE_TO = $('#' + rowID + 'AFFILIATE_TO').val();
            var proj_trans_type_from = $('#' + rowID + '_PROJ_TRANS_TYPE_FROM ').val();
            var proj_trans_type_to = $('#' + rowID + '_PROJ_TRANS_TYPE_TO ').val();
            var proj_trans_code_from = $('#' + rowID + '_PROJ_TRANS_CODE_FROM ').val();
            var proj_trans_code_to = $('#' + rowID + '_PROJ_TRANS_CODE_TO ').val();
            var fiscal_year = parseInt($('#fyear').val());
            var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
            var activity_id_to = $('#' + rowID + '_ACTIVITY_ID_TO').val();
            var account_from = $('#' + rowID + '_ACCOUNT_FROM').val();
            var amount_to = $('#' + rowID + '_AMOUNT_TO').val();
            var amount_from = $('#' + rowID + '_AMOUNT_FROM').val();
            var account_to = $('#' + rowID + '_ACCOUNT_TO').val();
            var home_bugl_from = $('#' + rowID + '_HOME_BUGL_FROM').val();
            var home_bugl_to = $('#' + rowID + '_HOME_BUGL_TO').val();;
            var project_id_from = $('#' + rowID + '_PROJECT_ID_FROM').val();
            var project_id_to = $('#' + rowID + '_PROJECT_ID_TO').val();
            var labor_rate_cd7_from = $('#' + rowID + '_LABOR_RATE_CD7_FROM').val();
            var labor_rate_cd7_to = $('#' + rowID + '_LABOR_RATE_CD7_to').val();
            var quantity_to = $('#' + rowID + '_QUANTITY_TO').val();
            var quantity_from = $('#' + rowID + '_QUANTITY_FROM').val();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var OrignatorStatusID = ['OA', 'OR'];
            var AccountantStatusID = ['AA', 'OR'];
            var StatusID = $('#StatusId').val();
            var bems_cost_acct = $('#BemsCostAcct').val();
            var period_to = $('#PeriodTo').val();
            var period_from = $('#PeriodFrom').val();
            var global_period_from = $('#PeriodFrom').attr('value');
            var global_period_to = $('#PeriodTo').attr('value');
            var BemsAcct = $('#BemsOrig').val();
            var bems_cost_acct = $('#BemsCostAcct').val();
            var v_value_chosen = true;
            var v_setid = "";
            var v_count = 0;
            var v_countEAS = 0;
            var v_countLOV = 0;
            var dept_red_flg_to = 0;
            var dept_status = 0;
            var work_dept_red_flg_to = 0;
            var global_rsc_from = '';
            var global_set_id = $('#' + rowID + '_HOME_BUGL_FROM').attr('value');
            var param = [];

            if ((home_dept_from != global_home_dept_from) || (home_dept_from != '' && home_loc_from == '') || (home_dept_from != '' && global_home_dept_from == '') || (home_dept_from == '' && global_home_dept_from != '') || ($('#' + rowID + '_HOME_DEPT_FROM').attr('class') == 'red')) {
                if (((jQuery.inArray(statusID, OrignatorStatusID) == 0) && BemsOrig == SessionBems) || ((jQuery.inArray(statusID, AccountantStatusID) == 0) && BemsAcct == SessionBems) || (StatusID == 'CA' && bems_cost_acct == SessionBems) && (proj_trans_code_from != 'FRG' || proj_trans_code_from == '')) {
                    if (activity_id_from == '' || period_to == '' || activity_id_from == 'REQUIRED') {
                        $('#' + rowID + '_HOME_DEPT_FROM').val(global_home_dept_from);
                        mctrObj.showDialog($('#dialog-box'), 'Please Enter The Activity Id (From) First.', 'error');
                    } else if (project_id_from == '' || project_id_from == 'REQUIRED') {
                        $('#' + rowID + '_HOME_DEPT_FROM').val(global_home_dept_from);
                        mctrObj.showDialog($('#dialog-box'), 'Please Enter The Project Id (From) First.', 'error');
                    } else if (account_from == '') {
                        $('#' + rowID + '_HOME_DEPT_FROM').val(global_home_dept_from);
                        mctrObj.showDialog($('#dialog-box'), 'Please enter the account (from) first.', 'error');
                    } else if (proj_trans_type_from == '' || proj_trans_type_from == 'REQ') {
                        $('#' + rowID + '_HOME_DEPT_FROM').val(global_home_dept_from);
                        mctrObj.showDialog($('#dialog-box'), 'project trans type (from) value must be entered first.', 'error');
                    } else if (home_dept_from != '' && home_loc_from != '' && home_dept_from == global_home_dept_from && $('#' + rowID + '_HOME_POOL_FROM').val() != '' && $('#' + rowID + '_HOME_DEPT_FROM').attr('class') == "red") {
                        $('#' + rowID + '_HOME_LOC_FROM').removeClass().addClass('red');
                        $('#' + rowID + '_HOME_DEPT_FROM').removeClass().addClass('white');
                        $('#' + rowID + '_HOME_DEPT_FROM').attr("red-flag", "N");
                    } else {
                        if (py_cy_status == 'CY') {
                            if (period_from == global_period_from && period_to != global_period_to) {
                                $('#PeriodTo').val(global_period_to);
                            }
                        }
                        if (home_bugl_from == '') {
                            $('#' + rowID + '_HOME_BUGL_FROM').val($('#OrigBu').val());
                        }
                        // affiliate used only on prior year transactions effective 2008 ||  greater.
                        if (py_cy_status == 'PY' || fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_FROM').val() != '') {
                            v_setid = $('#' + rowID + '_AFFILIATE_FROM').val();
                        } else {
                            v_setid = $('#' + rowID + '_HOME_BUGL_FROM').val();
                        }
                        //v_setid = $('#' + rowID + '_HOME_BUGL_FROM').val();


                        var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                        var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                        var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                        var mctrLineItem = $.extend(grid1, grid2, grid3);

                        mctrLineItem.SETID = v_setid;
                        param.push(mctrLineItem);
                        var mctrCreateFormq = $('#form').serialize();
                        var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                        var mctrCreateForm = $.extend({
                            mctrLineItem: param
                        }, mctrCreateFromJson);
                        mctrLineItem.Period_To = $('#PeriodTo').val();
                        mctrCreateForm.LineNo = $('#' + rowID + '_LINE_NO').val();


                        $.ajax({
                            url: getBaseUrl('/MctrCreateForm/mctrLineItemhomeDeptFromPostTextItemOpenLOV'),
                            type: 'POST',
                            data: mctrCreateForm,
                            success: function (data) {
                                if (data != '') {

                                    v_count = data.V_Count['HomeDept'];
                                    if ($('#' + rowID + '_HOME_DEPT_FROM').val() != '') {

                                        var succesFn = function (data) {

                                            if (data) {
                                                if ($('.bootbox').length == 0) {
                                                    var box = bootbox.dialog({
                                                        title: "Home Department (From) List",
                                                        onEscape: true,
                                                        message: data
                                                    });
                                                    box.on("shown.bs.modal", function () {
                                                        if (v_count == 0) {
                                                            mctrObj.showDialog($('#warning-msg'), 'Warning - Value entered was not found. List of valid values provided.', 'warning');
                                                        }
                                                    });
                                                    box.modal('show');

                                                }
                                            }
                                            else {
                                                $('#' + rowID + '_HOME_DEPT_FROM').val(global_home_dept_from);
                                            }

                                        };

                                        var errorFn = function (jqXHR, textStatus, errorThrown) {
                                            v_value_chosen = true;
                                            $('#' + rowID + '_HOME_DEPT_FROM').val(global_home_dept_from);
                                        };
                                        v_value_chosen = false;
                                        mctrObj.ajaxOptions('/MctrCreateForm/getRgListHomeDeptFromLOV', 'GET', {
                                            rowId: rowID
                                        }, succesFn, errorFn);

                                    }
                                    if (v_value_chosen == true && (home_dept_from == '' && global_home_dept_from != '')) {

                                        $('#' + rowID + '_ttdValue').addClass("white");
                                        $('#' + rowID + '_yearValue').addClass("white");

                                        $('#' + rowID + '_HOME_DEPT_FROM').removeClass().addClass("white");
                                        $('#' + rowID + '_HOME_DEPT_FROM').attr("red-flag", "N");
                                        $('#' + rowID + '_HOME_LOC_FROM').removeClass().addClass("white");

                                        if ($('#' + rowID + '_HOME_DEPT_FROM').val() != '') {
                                            //if (rowObject.EFF_STATUS == 'I') {
                                            //    $('#' + rowId + '_HOME_DEPT_FROM').attr('red-flag', 'Y');
                                            //    $('#' + rowId + '_HOME_DEPT_FROM').removeClass().addClass("orange");
                                            //    mctrObj.showDialog($('#dialog-box'), 'warning: inactive department/location combination selected.', 'error');

                                            //}
                                            if (proj_trans_type_from == 'LBR') {
                                                if (proj_trans_code_from == 'PRM') {
                                                    $('#' + rowID + '_LABOR_RATE_CD7_FROM').val('');
                                                    $('#' + rowID + '_QUANTITY_TO').val('.00');
                                                    $('#' + rowID + '_QUANTITY_FROM').val('.00');
                                                    if (parseFloat($('#' + rowID + '_AMOUNT_FROM').val() != 0)) {
                                                        $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass('red');
                                                    }
                                                    else if (parseFloat($('#' + rowID + '_AMOUNT_TO').val() != 0)) {
                                                        $('#' + rowID + '_AMOUNT_TO').removeClass().addClass('red');

                                                    }
                                                }
                                                // rsc and class pulled in when department is selected.
                                                if ((class_cd_from != '') && (global_class_cd_from != '') && (global_class_cd_from != class_cd_from)) {
                                                    // reset class code in case selected using inquire set button feature.
                                                    $('#' + rowID + '_CLASS_CD_FROM').val(global_class_cd_from);
                                                    $('#' + rowID + '_CLASS_CD_FROM').removeClass().addClass('red');
                                                } else {
                                                    $('#' + rowID + '_CLASS_CD_FROM').removeClass().addClass('white');
                                                }
                                                if ((rsc_from != '') && (global_rsc_from != '') && (global_rsc_from != rsc_from)) {
                                                    $('#' + rowID + '_RSC_FROM').removeClass().addClass('red');
                                                } else {
                                                    $('#' + rowID + '_RSC_FROM').removeClass().addClass('white');
                                                }
                                            } else {
                                                $('#' + rowID + '_LABOR_RATE_CD7_FROM').val('');
                                                $('#' + rowID + '_CLASS_CD_FROM').val(global_class_cd_from);
                                                $('#' + rowID + '_CLASS_CD_FROM').attr('value', global_class_cd_from);
                                                $('#' + rowID + '_RSC_FROM').val(global_rsc_from);
                                                $('#' + rowID + '_RSC_FROM').attr('value', global_rsc_from);
                                            }
                                            if (($('#' + rowID + '_WORK_DEPT_FROM').val() == '' && work_loc_from == '') || ($('#' + rowID + '_WORK_DEPT_FROM').val() == home_dept_from && work_loc_from == '')) {
                                                $('#' + rowID + '_WORK_DEPT_FROM').val($('#' + rowID + '_HOME_DEPT_FROM'));
                                                $('#' + rowID + '_WORK_DEPT_FROM').attr('value', $('#' + rowID + '_HOME_DEPT_FROM'));
                                                $('#' + rowID + '_WORK_LOC_FROM').val($('#' + rowID + '_HOME_LOC_FROM'));
                                                $('#' + rowID + '_WORK_LOC_FROM').attr('value', $('#' + rowID + '_HOME_LOC_FROM'));
                                                $('#' + rowID + '_WORK_POOL_FROM').val($('#' + rowID + '_HOME_POOL_FROM'));
                                                $('#' + rowID + '_WORK_POOL_FROM').attr('value', $('#' + rowID + '_HOME_POOL_FROM'));

                                                //if (rowObject.EFF_STATUS == 'I') {
                                                //    $('#' + rowId + '_WORK_DEPT_FROM').attr('red-flag', 'Y');
                                                //    $('#' + rowId + '_WORK_DEPT_FROM').removeClass().addClass('orange');
                                                //} else {
                                                //    work_dept_red_flg_from = 'N';
                                                //    $('#' + rowId + '_WORK_DEPT_FROM').removeClass().addClass('white');
                                                //  $('#' + rowID + '_HOME_DEPT_FROM').attr("red-flag", "N");
                                                //}
                                                $('#' + rowID + '_WORK_LOC_FROM').removeClass().addClass('white');
                                            }
                                            else if ($('#' + rowID + '_HOME_LOC_FROM').val() != '' && $('#' + rowID + '_WORK_DEPT_FROM').val() == '' || work_loc_from == '' || work_pool_from == '' || $('#' + rowID + '_WORK_DEPT_FROM').val() != home_dept_from || work_loc_from != home_loc_from || work_pool_from != home_pool_from) {
                                                bootbox.confirm("Do you want to override Work Department/Location using Home Department/Location selection? Click OK button to accept.", function (result) {
                                                    if (result) {


                                                        //  $('#' + rowId + '_WORK_DEPT_FROM').val(rowObject.DEPTID);
                                                        //$('#' + rowId + '_WORK_LOC_FROM ').val(rowObject.ACCTG_LOC_CD7);
                                                        //$('#' + rowId + '_WORK_POOL_FROM ').val(rowObject.ALLOW_POOL_CD7);

                                                        //if (dept_status == 'I') {
                                                        //    work_dept_red_flg_from = 'Y';
                                                        //    $('#' + rowId + '_WORK_DEPT_FROM').removeClass().addClass('orange');
                                                        //} else {
                                                        //    $('#' + rowId + '_WORK_DEPT_FROM').attr('red-flag', 'N');
                                                        //    $('#' + rowId + '_WORK_DEPT_FROM').removeClass().addClass('white');
                                                        //}

                                                        $('#' + rowID + '_WORK_LOC_FROM').removeClass().addClass('white');

                                                    }
                                                });
                                                //}
                                                //if (home_dept_from != '' && home_dept_from == work_dept_from && home_loc_from != '' && home_loc_from == work_loc_from) {
                                                //    dept_status = 'I';
                                                //    $('#' + rowId + '_WORK_DEPT_FROM').removeClass().addClass('orange');
                                                //} else {
                                                //    work_dept_red_flg_from = 'N';
                                                //    $('#' + rowId + '_WORK_DEPT_FROM').removeClass().addClass('white');
                                                //}
                                                //$('#' + rowId + '_WORK_LOC_FROM').removeClass().addClass('white');
                                            }
                                            // }
                                        }// close of home dept from not null
                                        else {
                                            $('#' + rowID + '_HOME_DEPT_FROM').attr('value', $('#' + rowID + '_HOME_DEPT_FROM').val());
                                            $('#' + rowID + '_HOME_POOL_FROM').val("");
                                            $('#' + rowID + '_LABOR_RATE_CD7_FROM').val("");
                                            if ($('#' + rowID + '_HOME_LOC_FROM').val() != '') {
                                                $('#' + rowID + '_HOME_LOC_FROM').removeClass().addClass('red');
                                            }
                                            if ($('#' + rowID + '_CLASS_CD_FROM').val() != '') {
                                                $('#' + rowID + '_CLASS_CD_FROM').removeClass().addClass('red');
                                            }
                                            if ($('#' + rowID + '_RSC_FROM').val() != '') {
                                                $('#' + rowID + '_RSC_FROM').removeClass().addClass('red');
                                            }
                                            if (proj_trans_type_from == 'LBR') {
                                                mctrObj.showDialog($('#dialog-box'), 'warning: home department/location to selection is normally required when ptt = lbr.', 'warning');

                                            }

                                        }
                                        //dept_status = '';
                                        if (proj_trans_type_from == 'LBR') {
                                            // needs to be verified 
                                            $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass('red');
                                            $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass('white');
                                        } else if (parseFloat($('#' + rowID + '_QUANTITY_FROM').val()) == 0 && parseFloat($('#' + rowID + '_AMOUNT_FROM').val()) == 0) {
                                            $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass('white');
                                            $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass('white');
                                        }
                                        if ($('#' + rowID + '_LABOR_RATE_CD7_TO').val() == 'NR' && ($('#' + rowID + '_LABOR_RATE_CD7_FROM').val() != 'NR' || $('#' + rowID + '_LABOR_RATE_CD7_FROM').val() == '')) {
                                            $('#' + rowID + '_LABOR_RATE_CD7_TO').removeClass().addClass('yellow');
                                            $('#' + rowID + '_AMOUNT_TO').removeClass().addClass('yellow');
                                        }
                                        else {
                                            $('#' + rowID + '_LABOR_RATE_CD7_TO').removeClass();//field_black_on_gray
                                            $('#' + rowID + '_AMOUNT_TO').removeClass();//field_black_on_white
                                        }


                                    }
                                }
                            }
                        });

                    }
                } else {
                    $('#' + rowID + '_HOME_DEPT_FROM').val(global_home_dept_from);
                    mctrObj.showDialog($('#dialog-box'), 'You either do not have the proper role or proper status setting to change this field.', 'error');

                }
            }
        });

        $('input[id*=WORK_DEPT_FROM]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var mctrno = $('#MctrNo').val();
            var SessionBems = $('#SessionBems').val();
            var statusID = $('#StatusId').val();
            var BemsOrig = $('#BemsOrig').val();
            var home_loc_from = $('#' + rowID + '_HOME_LOC_FROM').val();
            var work_dept_from = $('#' + rowID + '_WORK_DEPT_FROM').val();
            var work_loc_from = $('#' + rowID + '_WORK_LOC_FROM').val();
            var work_pool_from = $('#' + rowID + '_WORK_POOL_FROM').val();
            var home_pool_from = $('#' + rowID + '_HOME_POOL_FROM').val();
            var class_cd_from = $('#' + rowID + '_CLASS_CD_FROM').val();
            var global_rsc_from = $('#' + rowID + '_RSC_FROM').attr('value');
            var rsc_from = $('#' + rowID + '_RSC_TO').val();
            var global_class_cd_from = $('#' + rowID + '_CLASS_CD_FROM').attr('value')
            var home_dept_from = $('#' + rowID + '_HOME_DEPT_FROM').val();
            var global_home_dept_from = $('#' + rowID + '_HOME_DEPT_FROM').attr('value');
            var global_work_dept_from = $('#' + rowID + '_WORK_DEPT_FROM').attr('value');
            //var AFFILIATE_TO = $('#' + rowID + 'AFFILIATE_TO').val();
            var proj_trans_type_from = $('#' + rowID + '_PROJ_TRANS_TYPE_FROM ').val();
            var proj_trans_type_to = $('#' + rowID + '_PROJ_TRANS_TYPE_TO ').val();
            var proj_trans_code_from = $('#' + rowID + '_PROJ_TRANS_CODE_FROM ').val();
            var proj_trans_code_to = $('#' + rowID + '_PROJ_TRANS_CODE_TO ').val();
            var fiscal_year = parseInt($('#fyear').val());
            var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
            var activity_id_to = $('#' + rowID + '_ACTIVITY_ID_TO').val();
            var account_from = $('#' + rowID + '_ACCOUNT_FROM').val();
            var amount_to = $('#' + rowID + '_AMOUNT_TO').val();
            var amount_from = $('#' + rowID + '_AMOUNT_FROM').val();
            var account_to = $('#' + rowID + '_ACCOUNT_TO').val();
            var home_bugl_from = $('#' + rowID + '_HOME_BUGL_FROM').val();
            var home_bugl_to = $('#' + rowID + '_HOME_BUGL_TO').val();;
            var project_id_from = $('#' + rowID + '_PROJECT_ID_FROM').val();
            var project_id_to = $('#' + rowID + '_PROJECT_ID_TO').val();
            var labor_rate_cd7_from = $('#' + rowID + '_LABOR_RATE_CD7_FROM').val();
            var labor_rate_cd7_to = $('#' + rowID + '_LABOR_RATE_CD7_to').val();
            var quantity_to = $('#' + rowID + '_QUANTITY_TO').val();
            var quantity_from = $('#' + rowID + '_QUANTITY_FROM').val();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var OrignatorStatusID = ['OA', 'OR'];
            var AccountantStatusID = ['AA', 'OR'];
            var StatusID = $('#StatusId').val();
            var bems_cost_acct = $('#BemsCostAcct').val();
            var period_to = $('#PeriodTo').val();
            var period_from = $('#PeriodFrom').val();
            var global_period_from = $('#PeriodFrom').attr('value');
            var global_period_to = $('#PeriodTo').attr('value');
            var BemsAcct = $('#BemsOrig').val();
            var bems_cost_acct = $('#BemsCostAcct').val();
            var v_value_chosen = true;
            var v_setid = "";
            var v_count = 0;
            var v_countEAS = 0;
            var v_countLOV = 0;
            var dept_red_flg_to = 0;
            var dept_status = 0;
            var work_dept_red_flg_to = 0;
            var global_set_id = $('#' + rowID + '_HOME_BUGL_FROM').attr('value');
            var param = [];
            if ((work_dept_from != global_work_dept_from) || (work_dept_from != '' && work_loc_from == '') || (work_dept_from != '' && global_work_dept_from == '') || (work_dept_from == '' && global_home_dept_from != '') || ($('#' + rowID + '_WORK_DEPT_FROM').attr('class') == 'red')) {
                if (((jQuery.inArray(statusID, OrignatorStatusID) == 0) && BemsOrig == SessionBems) || ((jQuery.inArray(statusID, AccountantStatusID) == 0) && BemsAcct == SessionBems) || (StatusID == 'CA' && bems_cost_acct == SessionBems) && (proj_trans_code_from != 'FRG' || proj_trans_code_from == '')) {
                    if (activity_id_from == '' || period_to == '' || activity_id_from == 'REQUIRED') {
                        $('#' + rowID + '_WORK_DEPT_FROM').val(global_work_dept_from);
                        mctrObj.showDialog($('#dialog-box'), 'Please Enter The Activity Id (From) First.', 'error');
                    } else if (project_id_from == '' || project_id_from == 'REQUIRED') {
                        $('#' + rowID + '_WORK_DEPT_FROM').val(global_work_dept_from);
                        mctrObj.showDialog($('#dialog-box'), 'Please Enter The Project Id (From) First.', 'error');
                    } else if (account_from == '') {
                        $('#' + rowID + '_WORK_DEPT_FROM').val(global_work_dept_from);
                        mctrObj.showDialog($('#dialog-box'), 'Please enter the account (from) first.', 'error');
                    } else if (proj_trans_type_from == '' || proj_trans_type_from == 'REQ') {
                        $('#' + rowID + '_WORK_DEPT_FROM').val(global_work_dept_from);
                        mctrObj.showDialog($('#dialog-box'), 'project trans type (from) value must be entered first.', 'error');
                    } else if (work_dept_from != '' && work_loc_from != '' && work_dept_from == global_work_dept_from && $('#' + rowID + '_WORK_POOL_FROM').val() != '' && $('#' + rowID + '_WORK_DEPT_FROM').attr('class') == "red") {
                        $('#' + rowID + '_WORK_LOC_FROM').removeClass().addClass('red');
                        $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass('white');
                        $('#' + rowID + '_WORK_DEPT_FROM').attr("red-flag", "N");
                    } else {
                        if (py_cy_status == 'CY') {
                            if (period_from == global_period_from && period_to != global_period_to) {
                                $('#PeriodTo').val(global_period_to);
                            }
                        }
                        if (home_bugl_from == '' || home_bugl_from == undefined) {
                            $('#' + rowID + '_HOME_BUGL_FROM').val($('#' + rowID + 'OrigBu').val());
                        }
                        // affiliate used only on prior year transactions effective 2008 ||  greater.
                        if (py_cy_status == 'PY' || fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_FROM').val() != '') {
                            v_setid = $('#' + rowID + '_AFFILIATE_FROM').val();
                        } else {
                            v_setid = $('#' + rowID + '_HOME_BUGL_FROM').val();
                        }
                        //v_setid = $('#' + rowID + '_HOME_BUGL_FROM').val();


                        var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                        var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                        var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                        var mctrLineItem = $.extend(grid1, grid2, grid3);

                        mctrLineItem["SETID"] = v_setid;
                        param.push(mctrLineItem);
                        var mctrCreateFormq = $('#form').serialize();
                        var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                        var mctrCreateForm = $.extend({
                            mctrLineItem: param
                        }, mctrCreateFromJson);
                        mctrCreateForm.PeriodTo = $('#PeriodTo').val();
                        mctrCreateForm.LineNo = $('#' + rowID + '_LINE_NO').val();
                        //mctrLineItemclassCdFromPostTextItemOpenLOV

                        $.ajax({
                            url: getBaseUrl('/MctrCreateForm/mctrLineItemworkDeptFromPostTextItemOpenLOV'),
                            type: 'POST',
                            data: mctrCreateForm,
                            success: function (data) {
                                if (data != '') {

                                    v_count = data.V_Count['WorkDept'];

                                    // if (v_count == 0 || v_count != 0) {
                                    //if (v_count == 0) {
                                    //    mctrObj.showDialog($('#dialog-box'), 'Warning - Value entered was not found. List of valid values provided.', 'warning');
                                    //}
                                    if ($('#' + rowID + '_WORK_DEPT_FROM').val() != '') {
                                        var succesFn = function (data) {
                                            if ($('.bootbox').length == 0) {
                                                if (data) {
                                                    var box = bootbox.dialog({
                                                        title: " Work Dept From Lov",
                                                        onEscape: true,
                                                        message: data
                                                    });
                                                    box.on("shown.bs.modal", function () {
                                                        if (v_count == 0) {
                                                            mctrObj.showDialog($('#warning-msg'), 'Warning - Value entered was not found. List of valid values provided.', 'warning');
                                                        }

                                                    });

                                                    box.modal('show');
                                                }

                                            }

                                        };

                                        var errorFn = function (jqXHR, textStatus, errorThrown) {
                                            v_value_chosen = true;
                                            $('#' + rowID + '_WORK_DEPT_FROM').val(global_work_dept_from);
                                        };
                                        v_value_chosen = false;
                                        mctrObj.ajaxOptions('/MctrCreateForm/getRgListWorkDeptFromLOV', 'GET', { rowId: rowID }, succesFn, errorFn);
                                    }
                                    if ((v_value_chosen) && (work_dept_from == '' && global_work_dept_from != '')) {
                                        $('#' + rowID + '_WORK_DEPT_FROM').attr('red-flag', 'N');
                                        $('#' + rowID + '_ttdValue').addClass("white");
                                        $('#' + rowID + '_yearValue').addClass("white");

                                        $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass("white");
                                        $('#' + rowID + '_WORK_DEPT_FROM').attr("red-flag", "N");
                                        $('#' + rowID + '_WORK_LOC_FROM').removeClass().addClass("white");

                                        if ($('#' + rowID + '_WORK_DEPT_FROM').val() != '') {



                                            // lov selection overrides the rsc value if already entered by non-labor class code logic.
                                            if (proj_trans_type_from != 'LBR') {
                                                $('#' + rowID + '_RSC_FROM').val(global_rsc_from);
                                            }
                                            else {
                                                if (global_rsc_from != '') {
                                                    if (global_rsc_from != rsc_from || rsc_from == '') {
                                                        bootbox.confirm("Do you want to accept LBR Work Dept RSC overriding LBR Home Dept RSC? Click YES button to accept.", function (result) {
                                                            if (result) {
                                                                $('#' + rowID + '_RSC_FROM').val(global_rsc_from);
                                                            }
                                                            else {
                                                                $('#' + rowID + '_RSC_FROM').removeClass().addClass("white");
                                                            }
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            $('#' + rowID + '_WORK_DEPT_FROM').attr('value', $('#' + rowID + '_WORK_DEPT_FROM').val());
                                            $('#' + rowID + '_WORK_POOL_FROM').val("");
                                            if ($('#' + rowID + '_WORK_LOC_FROM').val() != '') {
                                                $('#' + rowID + '_WORK_LOC_FROM').removeClass().addClass("red");
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    }
                } else {
                    $('#' + rowID + '_WORK_DEPT_FROM').val(global_work_dept_from);

                    mctrObj.showDialog($('#dialog-box'), 'You either do not have the proper role or proper status setting to change this field.', 'error');

                }
            }
        });

        $('input[id*=WORK_DEPT_TO]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var mctrno = $('#MctrNo').val();
            var SessionBems = $('#SessionBems').val();
            var statusID = $('#StatusId').val();
            var BemsOrig = $('#BemsOrig').val();
            var home_loc_from = $('#' + rowID + '_HOME_LOC_FROM').val();
            var work_dept_from = $('#' + rowID + '_WORK_DEPT_FROM').val();
            var work_dept_to = $('#' + rowID + '_WORK_DEPT_TO').val();
            var work_loc_from = $('#' + rowID + '_WORK_LOC_FROM').val();
            var work_loc_to = $('#' + rowID + '_WORK_LOC_TO').val();
            var work_pool_from = $('#' + rowID + '_WORK_POOL_FROM').val();
            var home_pool_from = $('#' + rowID + '_HOME_POOL_FROM').val();
            var class_cd_from = $('#' + rowID + '_CLASS_CD_FROM').val();
            var global_rsc_from = $('#' + rowID + '_RSC_FROM').attr('value');
            var global_rsc_to = $('#' + rowID + '_RSC_TO').attr('value');
            var rsc_to = $('#' + rowID + '_RSC_TO').val();
            var global_class_cd_from = $('#' + rowID + '_CLASS_CD_FROM').attr('value')
            var home_dept_from = $('#' + rowID + '_HOME_DEPT_FROM').val();
            var global_home_dept_from = $('#' + rowID + '_HOME_DEPT_FROM').attr('value');
            var global_work_dept_from = $('#' + rowID + '_WORK_DEPT_FROM').attr('value');
            var global_work_dept_to = $('#' + rowID + '_WORK_DEPT_TO').attr('value');
            //var AFFILIATE_TO = $('#' + rowID + 'AFFILIATE_TO').val();
            var proj_trans_type_from = $('#' + rowID + '_PROJ_TRANS_TYPE_FROM ').val();
            var proj_trans_type_to = $('#' + rowID + '_PROJ_TRANS_TYPE_TO ').val();
            var proj_trans_code_from = $('#' + rowID + '_PROJ_TRANS_CODE_FROM ').val();
            var proj_trans_code_to = $('#' + rowID + '_PROJ_TRANS_CODE_TO ').val();
            var fiscal_year = parseInt($('#fyear').val());
            var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
            var activity_id_to = $('#' + rowID + '_ACTIVITY_ID_TO').val();
            var account_from = $('#' + rowID + '_ACCOUNT_FROM').val();
            var amount_to = $('#' + rowID + '_AMOUNT_TO').val();
            var amount_from = $('#' + rowID + '_AMOUNT_FROM').val();
            var account_to = $('#' + rowID + '_ACCOUNT_TO').val();
            var home_bugl_from = $('#' + rowID + '_HOME_BUGL_FROM').val();
            var home_bugl_to = $('#' + rowID + '_HOME_BUGL_TO').val();;
            var project_id_from = $('#' + rowID + '_PROJECT_ID_FROM').val();
            var project_id_to = $('#' + rowID + '_PROJECT_ID_TO').val();
            var labor_rate_cd7_from = $('#' + rowID + '_LABOR_RATE_CD7_FROM').val();
            var labor_rate_cd7_to = $('#' + rowID + '_LABOR_RATE_CD7_to').val();
            var quantity_to = $('#' + rowID + '_QUANTITY_TO').val();
            var quantity_from = $('#' + rowID + '_QUANTITY_FROM').val();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var OrignatorStatusID = ['OA', 'OR'];
            var AccountantStatusID = ['AA', 'OR'];
            var StatusID = $('#StatusId').val();
            var bems_cost_acct = $('#BemsCostAcct').val();
            var period_to = $('#PeriodTo').val();
            var period_from = $('#PeriodFrom').val();
            var global_period_from = $('#PeriodFrom').attr('value');
            var global_period_to = $('#PeriodTo').attr('value');
            var BemsAcct = $('#BemsOrig').val();
            var bems_cost_acct = $('#BemsCostAcct').val();
            var v_value_chosen = true;
            var v_setid = "";
            var v_count = 0;
            var v_countEAS = 0;
            var v_countLOV = 0;
            var dept_red_flg_to = 0;
            var dept_status = 0;
            var work_dept_red_flg_to = 0;
            var global_rsc_from = '';
            var global_set_id = $('#' + rowID + '_HOME_BUGL_FROM').attr('value');
            var param = [];
            if ((work_dept_to != global_work_dept_to) || (work_dept_to != '' && work_loc_to == '') || (work_dept_to != '' && global_work_dept_to == '') || (work_dept_to == '' && global_work_dept_to != '') || ($('#' + rowID + '_WORK_DEPT_TO').attr('class') == "red")) {
                if (((jQuery.inArray(statusID, OrignatorStatusID) == 0) && BemsOrig == SessionBems) || ((jQuery.inArray(statusID, AccountantStatusID) == 0) && BemsAcct == SessionBems) || (StatusID == "CA" && bems_cost_acct == SessionBems) && (proj_trans_code_from != "FRG" || proj_trans_code_from == '')) {
                    if (activity_id_from == '' || period_to == '' || activity_id_from == "REQUIRED") {
                        $('#' + rowID + '_WORK_DEPT_TO').val(global_work_dept_to);
                        mctrObj.showDialog($('#dialog-box'), 'Please Enter The Activity Id (From) First.', 'error');
                    } else if (project_id_from == '' || project_id_from == "REQUIRED") {
                        $('#' + rowID + '_WORK_DEPT_TO').val(global_work_dept_to);
                        mctrObj.showDialog($('#dialog-box'), 'Please Enter The Project Id (From) First.', 'error');
                    } else if (account_from == '') {
                        $('#' + rowID + '_WORK_DEPT_TO').val(global_work_dept_to);
                        mctrObj.showDialog($('#dialog-box'), 'Please enter the account (from) first.', 'error');
                    } else if (proj_trans_type_from == '' || proj_trans_type_from == "REQUIRED") {
                        $('#' + rowID + '_WORK_DEPT_TO').val(global_work_dept_to);
                        mctrObj.showDialog($('#dialog-box'), 'project trans type (from) value must be entered first.', 'error');
                    } else if (activity_id_to == '' || activity_id_to == "REQUIRED") {
                        $('#' + rowID + '_WORK_DEPT_TO').val(global_work_dept_to);
                        mctrObj.showDialog($('#dialog-box'), 'Please enter the activity id (to) first.', 'error');
                    } else if (project_id_to == '' || project_id_to == "REQUIRED") {
                        $('#' + rowID + '_WORK_DEPT_TO').val(global_work_dept_to);
                        mctrObj.showDialog($('#dialog-box'), 'Please enter the project id (to) first.', 'error');
                    } else if (account_to == '' && proj_trans_type_to == "LBR") {
                        $('#' + rowID + '_WORK_DEPT_TO').val(global_work_dept_to);
                        mctrObj.showDialog($('#dialog-box'), 'Please enter the account (to) first.', 'error');
                    } else if (work_dept_to != '' && work_loc_to != '' && work_dept_to == global_work_dept_to && $('#' + rowID + '_WORK_POOL_TO').val() != '' && $('#' + rowID + '_WORK_DEPT_TO').attr('class') == "red") {
                        $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass('red');
                        $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass('white');
                        $('#' + rowID + '_WORK_DEPT_TO').attr("red-flag", "N");
                    } else {
                        if (py_cy_status == "CY") {
                            if (period_from == global_period_from && period_to != global_period_to) {
                                $('#PeriodTo').val(global_period_to);
                            }
                        }
                        if (home_bugl_to == '') {
                            $('#' + rowID + '_HOME_BUGL_TO').val($('#OrigBu').val());
                        }
                        // affiliate used only on prior year transactions effective 2008 ||  greater.
                        if (py_cy_status == "PY" || fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_TO').val() != '') {
                            v_setid = $('#' + rowID + '_AFFILIATE_TO').val();
                        } else {
                            v_setid = $('#' + rowID + '_HOME_BUGL_TO').val();
                        }
                        //v_setid = $('#' + rowID + '_HOME_BUGL_FROM').val();


                        var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                        var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                        var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                        var mctrLineItem = $.extend(grid1, grid2, grid3);

                        mctrLineItem.SETID = v_setid;
                        param.push(mctrLineItem);
                        var mctrCreateFormq = $('#form').serialize();
                        var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                        var mctrCreateForm = $.extend({
                            mctrLineItem: param
                        }, mctrCreateFromJson);
                        mctrCreateForm.PeriodTo = $('#PeriodTo').val();
                        mctrCreateForm.LineNo = $('#' + rowID + '_LINE_NO').val();
                        //mctrLineItemclassCdFromPostTextItemOpenLOV

                        $.ajax({
                            url: getBaseUrl('/MctrCreateForm/mctrLineItemworkDeptToPostTextItemOpenLOV'),
                            type: 'POST',
                            data: mctrCreateForm,
                            success: function (data) {
                                if (data != '') {
                                    v_count = data.V_Count['WorkDept'];
                                    if ($('#' + rowID + '_WORK_DEPT_TO').val() != '') {
                                        if (v_count == 0 || v_count != 0) {
                                            if (v_count == 0) {
                                                mctrObj.showDialog($('#dialog-box'), 'Warning - Value entered was not found. List of valid values provided.', 'warning');
                                            }

                                            var succesFn = function (data) {
                                                if ($('.bootbox').length == 0) {
                                                    if (data) {
                                                        var box = bootbox.dialog({
                                                            title: " Work Dept To Lov",
                                                            onEscape: true,
                                                            message: data
                                                        });

                                                        box.modal('show');
                                                    }
                                                } else {
                                                    $('#' + rowID + '_WORK_DEPT_TO').val(global_work_dept_to);
                                                }
                                            };

                                            var errorFn = function (jqXHR, textStatus, errorThrown) {
                                                v_value_chosen = true;
                                                $('#' + rowID + '_WORK_DEPT_TO').val(global_work_dept_to);
                                            };
                                            v_value_chosen = false;
                                            mctrObj.ajaxOptions('/MctrCreateForm/getRgListWorkDeptToLOV', 'GET', {
                                                rowId: rowID
                                            }, succesFn, errorFn);
                                        }
                                    }
                                    if ((v_value_chosen) && (work_dept_to == '' && global_work_dept_to != '')) {
                                        $('#' + rowID + '_WORK_DEPT_TO').attr('red-flag', 'N');
                                        $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("white");

                                        if ($('#' + rowID + '_WORK_DEPT_TO').val() != '') {
                                            $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("white");
                                            //if (dept_status == 'I' && work_dept_to != '') {
                                            //   $('#' + rowId + '_WORK_DEPT_TO').attr('red-flag', 'Y');
                                            //  $('#' + rowId + '_WORK_DEPT_TO').removeClass().addClass("orange");
                                            //}

                                            if (proj_trans_type_from != 'LBR') {

                                                $('#' + rowID + '_RSC_TO').val(global_rsc_to);
                                            }
                                            else {
                                                if (global_rsc_to != '') {
                                                    if (global_rsc_to != rsc_to || rsc_to == '') {
                                                        bootbox.confirm("Do you want to accept LBR Work Dept RSC overriding LBR Home Dept RSC? Click YES button to accept.", function (result) {
                                                            if (result) {
                                                                $('#' + rowID + '_RSC_TO').val(global_rsc_to);
                                                            }
                                                        });
                                                    }
                                                }
                                            }
                                        }

                                        else {
                                            $('#' + rowID + '_WORK_DEPT_TO').attr('value', $('#' + rowID + '_WORK_DEPT_TO').val());
                                            if ($('#' + rowID + '_WORK_DEPT_TO').val() == '' && global_work_dept_to != '') {
                                                $('#' + rowID + '_WORK_POOL_TO').val("");
                                            }

                                            if ($('#' + rowID + '_WORK_LOC_TO').val() != '') {
                                                $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("red");
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    }
                } else {
                    $('#' + rowID + '_WORK_DEPT_TO').val(global_work_dept_to);
                    mctrObj.showDialog($('#dialog-box'), 'You either do not have the proper role or proper status setting to change this field.', 'error');

                }
            }
        });

        $('input[id*=RSC_FROM]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var v_value_chosen;
            var v_alert_choice;
            var v_count = 0;
            var param = [];
            var v_cow_date = $('#PeriodTo').val();
            var v_setid = '';
            var fiscal_year = $('#fyear').val();
            var py_cy_status = $('#fyear').val().trim() == (new Date).getFullYear() ? 'CY' : 'PY';
            var statusID = $('#StatusId').val();
            var bems_orig = $('#BemsOrig').val();
            var bems_acct = $('#BemsAcct').val();
            var OrignatorStatusID = ['OA', 'OR'];
            var OrigStatusID = ['AA', 'OR'];
            var period_from = $('#PeriodFrom').val();
            var global_period_from = $('#PeriodFrom').attr('value');
            var proj_trans_type_from = $('#' + rowID + '_PROJ_TRANS_TYPE_FROM ').val();
            var work_loc_from;
            var rsc_from = $('#' + rowID + '_RSC_FROM').val();
            // var OrigrscFrom = $('#' + rowID + '_RSC_FROM').attr('value') == "" ? $('#' + rowID + '_RSC_FROM').val() : $('#' + rowID + '_RSC_FROM').attr('value');
            var OrigrscFrom = $('#' + rowID + '_RSC_FROM').attr('value');

            if (($('#' + rowID + '_RSC_FROM').val() != OrigrscFrom) || ($('#' + rowID + '_RSC_FROM').val() != "" && ($('#' + rowID + '_RSC_FROM').attr('val') == "") || ($('#' + rowID + '_RSC_FROM').val() != "" && OrigrscFrom == "") || ($('#' + rowID + '_RSC_FROM').val() == "" && OrigrscFrom != "") || $('#' + rowID + '_RSC_FROM').attr('class') == "red")) {
                if (((jQuery.inArray(statusID, OrignatorStatusID) == 0 && bems_orig == $('#SessionBems').val()) || (jQuery.inArray(statusID, OrigStatusID) == 0 && bems_acct == $('#SessionBems').val()) || (statusID == "CA" && bems_cost_acct == $('#SessionBems').val())) && ($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() != "FRG" || $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == "")) {
                    if ($('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || period_from == "" || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == "REQUIRED") {
                        $('#' + rowID + '_RSC_FROM').val(OrigrscFrom);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the activity id (from) first.", "error");
                    }
                    else if ($('#' + rowID + '_PROJECT_ID_FROM').val() == "" || $('#' + rowID + '_PROJECT_ID_FROM').val() == "REQUIRED") {
                        $('#' + rowID + '_RSC_FROM').val(OrigrscFrom);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the project id (from) first.", "error");
                    }
                    else if ($('#' + rowID + '_ACCOUNT_FROM').val() == "") {
                        $('#' + rowID + '_RSC_FROM').val(OrigrscFrom);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the account (from)  first.", "error");
                    }
                    else if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "" || $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "REQ") {
                        $('#' + rowID + '_RSC_FROM').val(OrigrscFrom);
                        mctrObj.showDialog($("#dialog-box"), "Project Transtype (From) value must be entered first.", "error");
                    }

                    else {
                        if (rsc_from != '') {
                            if (py_cy_status == "CY") {
                                // if ($('#' + rowID + '_PERIOD_FROM').val() == global_period_from && $('#' + rowID + '_PERIOD_FROM').val() != global_period_from) {
                                //      $('#' + rowID + '_PERIOD_TO').val();
                                //  }
                            }
                            if ($('#' + rowID + '_HOME_BUGL_FROM').val() == "") {
                                $('#' + rowID + '_HOME_BUGL_FROM').val(bems_orig);
                            }

                            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                            var mctrLineItem = $.extend(grid1, grid2, grid3);

                            mctrLineItem.SETID = v_setid;
                            param.push(mctrLineItem);
                            var mctrCreateFormq = $('#form').serialize();
                            var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                            var mctrCreateForm = $.extend({
                                mctrLineItem: param
                            }, mctrCreateFromJson);
                            mctrCreateForm.PeriodTo = $('#PeriodTo').val();

                            $.ajax({
                                url: getBaseUrl('/MctrCreateForm/mctrLineItemrscFromPostTextItemOpenLOV'),
                                type: 'POST',
                                data: mctrCreateForm,
                                success: function (data) {
                                    var v_countrsc = data.V_Count['RSC'];
                                    var v_countrsceas = data.V_Count['RSCEAS'];

                                    if (proj_trans_type_from == 'LBR' && (!rsc_from.match('^6'))) {
                                        v_count = 0;
                                    }
                                    else {
                                        v_count = v_countrsc;
                                    }

                                    if (v_count == 0) {
                                        v_count = v_countrsceas;
                                        if (v_count > 0) {
                                            mctrObj.showDialog($("#dialog-box"), "Accepted - RP Master Accounting found using rsc_from value entered.", "success");

                                        }
                                        else {
                                            if (proj_trans_type_from == 'LBR') {

                                                mctrObj.showDialog($("#dialog-box"), "The RSC (FROM) value cannot be changed when PTT = LBR.", "error");

                                            }
                                            else {
                                                mctrObj.showDialog($("#dialog-box"), "Warning - Unable to validate the rsc from value [' || " + rsc_from + "|| '] entered.", "warning");
                                            }
                                            $('#' + rowID + '_RSC_FROM').val(OrigrscFrom);

                                        }
                                        $('#' + rowID + '_RSC_FROM').removeClass().addClass("white");
                                    }


                                    else if (($('#' + rowID + '_RSC_FROM').val() != "" && ($('#' + rowID + '_RSC_FROM').attr('val') == "")) || ($('#' + rowID + '_RSC_FROM').val() != "" && OrigrscFrom == "")) {
                                        var errorFn = function (data) {

                                        };

                                        var succesFn = function (data) {
                                            if ($('.bootbox').length == 0) {
                                                if (data) {
                                                    var box = bootbox.dialog({
                                                        title: "Rsc From Lov",
                                                        onEscape: true,
                                                        message: data

                                                    });
                                                    box.on("shown.bs.modal", function () {

                                                    });
                                                    box.modal('show');
                                                }
                                            }
                                        };

                                        mctrObj.ajaxOptions('/MctrCreateForm/getRgRscFromLOV', 'GET', { rowID: rowID }, succesFn, errorFn);
                                    }
                                    else {
                                        $('#' + rowID + '_RSC_FROM').removeClass().addClass("white");
                                    }
                                }
                            });

                        }
                        else {
                            $('#' + rowID + '_RSC_FROM').removeClass().addClass("white");
                            if (proj_trans_type_from == 'LBR') {
                                if (($('#' + rowID + '_RSC_FROM').val() != "" && ($('#' + rowID + '_RSC_FROM').attr('val') == "")) || ($('#' + rowID + '_RSC_FROM').val() == "" && OrigrscFrom != "") || ($('#' + rowID + '_RSC_FROM').val() != OrigrscFrom)) {

                                    $('#' + rowID + '_RSC_FROM').val(OrigrscFrom);
                                    mctrObj.showDialog($("#dialog-box"), "The RSC (FROM) value cannot be changed when PTT = LBR.", "warning");

                                }
                            }
                        }
                        if (($('#' + rowID + '_RSC_FROM').val() != "" && ($('#' + rowID + '_RSC_FROM').attr('val') == "")) || ($('#' + rowID + '_RSC_FROM').val() == "" && OrigrscFrom != "") || ($('#' + rowID + '_RSC_FROM').val() != OrigrscFrom)) {
                            $('#' + rowID + '_ttdValue').addClass("white");
                            $('#' + rowID + '_yearValue').addClass("white");
                        }
                    }
                }
                else {
                    $('#' + rowID + '_RSC_FROM').val(OrigrscFrom);
                    mctrObj.showDialog($("#dialog-box"), "you either do not have the proper role or proper status setting to change this field.", "error");
                }
            }
        });

        $('input[id*=RSC_TO').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var param = [];
            var v_count = 0;
            var v_setid = "";
            var v_cow_date = $('#COW').val();
            var OrigrscTo = $('#' + rowID + '_RSC_TO').attr('value');
            var glb = $('#' + rowID + '_RSC_TO').attr('value') == "" ? $('#' + rowID + '_RSC_TO').val() : $('#' + rowID + '_RSC_TO').attr('value');
            var period_to = $('#PeriodTo').val();
            var rsc_to = $('#' + rowID + '_RSC_TO').val();
            var mctrno = $('#MctrNo').val();
            var SessionBems = $('#SessionBems').val();
            var statusID = $('#StatusId').val();
            var BemsOrig = $('#BemsOrig').val();
            var period_from = $('#PeriodFrom').val();
            var Global_AFFILIATE_FROM = $('#' + rowID + '_AFFILIATE_FROM').attr('value');
            var global_period_from = $('#PeriodFrom').attr('value');
            var global_rsc_to = $('#' + rowID + '_RSC_TO').attr('value');
            var fiscal_year = $('#fyear').val().trim();
            var v_value_chosen = false;
            var OrignatorStatusID = ['OA', 'OR'];
            var AccountantStatusID = ['AA', 'OR'];
            var BemsAcct = $('#BemsAcct').val();
            var py_cy_status = $('#fyear').val().trim() == (new Date).getFullYear() ? 'CY' : 'PY';
            var bems_cost_acct = $('#BemsCostAcct').val();
            if ((rsc_to != OrigrscTo) || (rsc_to != "" && OrigrscTo == "") || (rsc_to == "" && global_rsc_to != "") || $('#' + rowID + '_RSC_TO').attr('class') == "red") {
                if ((((jQuery.inArray(statusID, OrignatorStatusID) == 0 && BemsOrig == SessionBems)) || (jQuery.inArray(statusID, AccountantStatusID) == 0 && BemsAcct == SessionBems) || (statusID == "CA" && bems_cost_acct == SessionBems)) && ($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() != "FRG" || $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == "")) {
                    if (($('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || period_to == "" || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == ("REQUIRED"))) {
                        $('#' + rowID + '_RSC_TO').val(OrigrscTo);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the activity id (from) first.", "error");
                    }
                    else if (($('#' + rowID + '_PROJECT_ID_FROM').val() == "" || $('#' + rowID + '_PROJECT_ID_FROM').val() == "REQUIRED")) {
                        $('#' + rowID + '_RSC_TO').val(OrigrscTo);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the project id (from) first.", "error");
                    }
                    else if (($('#' + rowID + '_ACCOUNT_FROM').val() == "")) {
                        $('#' + rowID + '_RSC_TO').val(OrigrscTo);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the account (from) first.", "error");
                    }
                    else if (($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "" || $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "REQ")) {
                        $('#' + rowID + '_RSC_TO').val(OrigrscTo);
                        mctrObj.showDialog($("#dialog-box"), "Please enter the project trans type (from) first.", "error");
                    }
                    else if (($('#' + rowID + '_ACTIVITY_ID_TO').val() == "" || ($('#' + rowID + '_ACTIVITY_ID_TO').val() == "REQUIRED"))) {
                        $('#' + rowID + '_RSC_TO').val(OrigrscTo);
                        mctrObj.showDialog($("#dialog-box"), "Please enter activity (To) first.", "error");
                    }
                    else if (($('#' + rowID + '_PROJECT_ID_TO').val() == "" || $('#' + rowID + '_PROJECT_ID_TO').val() == "REQUIRED")) {
                        $('#' + rowID + '_RSC_TO').val(OrigrscTo);
                        mctrObj.showDialog($("#dialog-box"), "Please enter project id (To) first.", "error");
                    }
                    else if ($('#' + rowID + '_ACCOUNT_TO').val() == "" && ($('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == "LBR")) {
                        $('#' + rowID + '_RSC_TO').val(OrigrscTo);
                        mctrObj.showDialog($("#dialog-box"), "Please enter account (To) first.", "error");
                    }

                    else if ($('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == "LBR" && (rsc_to != "" || ((!rsc_to.match('^6')) && !rsc_to.match('^091')))) {
                        if (($('#' + rowID + '_HOME_BUGL_TO').val() == "")) {

                            $('#' + rowID + '_HOME_BUGL_TO').val($('#OrigBu').val());
                        }

                        if ((py_cy_status == "PY" && fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_TO').val() != "")) {
                            v_setid = $('#' + rowID + '_AFFILIATE_TO').val();
                        }
                        else {

                            v_setid = $('#' + rowID + '_HOME_BUGL_TO').val();
                        }
                        var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                        var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                        var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                        var mctrLineItem = $.extend(grid1, grid2, grid3);

                        mctrLineItem.SETID = v_setid;
                        mctrLineItem.COW = v_cow_date;
                        mctrLineItem.PERIOD_TO = period_to;
                        param.push(mctrLineItem);
                        var mctrCreateFormq = $('#form').serialize();
                        var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                        var mctrCreateForm = $.extend({
                            mctrLineItem: param
                        }, mctrCreateFromJson);

                        mctrCreateForm.LineNo = $('#' + rowID + '_LINE_NO').val();

                        $.ajax({
                            type: "POST",
                            url: getBaseUrl("/MctrCreateForm/mctrLineItemrscToPostTextItemOpenLOV"),
                            data: mctrCreateForm,
                            success: function (data) {
                                if (data != '') {
                                    v_countrsc = data.V_Count['RSC'];
                                    v_countrsccount = data.V_Count['RSCcount'];
                                    if (global_rsc_to != "") {
                                        if ($('#' + rowID + '_HOME_DEPT_TO').val() != "") {
                                            v_count = v_countrsc;
                                        }
                                        if (v_count == 0 && $('#' + rowID + '_HOME_DEPT_TO').val() != "") {
                                            v_count = v_countrsccount;
                                        }

                                    }
                                    if (v_count == 0) {
                                        if ((rsc_to != OrigrscTo) || (rsc_to != "" && OrigrscTo == "") || ((rsc_to == "" && OrigrscTo != "" && !($('#' + rowID + '__ACTIVITY_ID_TO').val() == "OVERHEAD" || $('#' + rowID + '__ACTIVITY_ID_TO').val() == "NON-PROJ")))) {

                                            $('#' + rowID + '_RSC_TO').val(OrigrscTo);
                                            mctrObj.showDialog($("#dialog-box"), "The rsc (to) value cannot be changed when ptt = lbr.", "error");

                                        }
                                    }
                                    $('#' + rowID + '_RSC_TO').removeClass().addClass("white");
                                }

                            },
                            error: function (data) {
                                var exmsg = data.responseText;
                                var ms = exmsg.ExceptionMessage;
                                mctrObj.showDialog($("#dialog-box"), ms, "error");
                            }

                        });

                    }
                    else {
                        if (rsc_to != "") {
                            if (py_cy_status == "CY") {
                                //    if (period_from == global_period_from && (period_to != global_period_from)) {
                                //       $('#' + rowID + '_PERIOD_TO').val(global_period_from);
                                //    }

                            }
                            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                            var mctrLineItem = $.extend(grid1, grid2, grid3);

                            mctrLineItem.SETID = v_setid;
                            mctrLineItem.COW = v_cow_date;
                            mctrLineItem.PERIOD_TO = period_to;
                            param.push(mctrLineItem);
                            var mctrCreateFormq = $('#form').serialize();
                            var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                            var mctrCreateForm = $.extend({
                                mctrLineItem: param
                            }, mctrCreateFromJson);

                            mctrCreateForm.LineNo = $('#' + rowID + '_LINE_NO').val();

                            $.ajax({
                                type: "POST",
                                url: getBaseUrl("/MctrCreateForm/mctrLineItemrscToPostTextItemOpenLOV"),
                                data: mctrCreateForm,

                                success: function (data) {

                                    if (data != '') {
                                        v_count = data.V_Count['RSCLOV'];


                                        if (v_count > 0) {
                                            if ((rsc_to != OrigrscTo) || (rsc_to != "" && OrigrscTo == "")) {
                                                var errorFn = function (jqXHR, textStatus, errorThrown) {

                                                };

                                                var succesFn = function (data) {
                                                    if ($('.bootbox').length == 0) {
                                                        if (data) {
                                                            bootbox.dialog({
                                                                title: "Rsc To Lov",
                                                                onEscape: true,
                                                                message: data
                                                            })
                                                        }
                                                    }
                                                };
                                                mctrObj.ajaxOptions('/MctrCreateForm/getRgRscToLOV', 'GET', {
                                                    rowId: rowID
                                                }, succesFn, errorFn);

                                            }
                                            else {
                                                $('#' + rowID + '_RSC_TO').removeClass().addClass("white");
                                            }

                                        }
                                        else {
                                            mctrObj.showDialog($("#dialog-box"), "Unable to validate the rsc to value [' || " + rsc_to + "|| '] entered.", "error");
                                        }
                                    }
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
                else {
                    $('#' + rowID + '_RSC_TO').val(OrigrscTo);
                    mctrObj.showDialog($("#dialog-box"), "you either do not have the proper role or proper status setting to change this field.", "error");
                }
            }
            //  $('#' + rowID + '_RSC_TO').attr('value', $('#' + rowID + 'RSC_TO').val());
        });

        $('input[id*=HOME_LOC_TO]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var status_id = $('#StatusId').val();
            var bems_orig = $('#BemsOrig').val();
            var bems_acct = $('#BemsAcct').val();
            var SessionBems = $('#SessionBems').val();
            var v_setid = "";
            var period_to = $('#PeriodTo').val();
            var AccountantStatusID = ['AA', 'OR'];
            var OrignatorStatusID = ['OA', 'OR'];
            var BemsAcct = $('#BemsOrig').val();
            var bems_cost_acct = $('#BemsCostAcct').val();
            var home_loc_from = $('#' + rowID + '_HOME_LOC_FROM').val();
            var work_dept_to = $('#' + rowID + '_WORK_DEPT_TO').val();
            var work_loc_to = $('#' + rowID + '_WORK_LOC_TO').val();
            var work_pool_to = $('#' + rowID + '_WORK_POOL_TO').val();
            var home_dept_to = $('#' + rowID + '_HOME_DEPT_TO').val();
            var home_loc_to = $('#' + rowID + '_HOME_LOC_TO').val();
            var home_pool_to = $('#' + rowID + '_HOME_POOL_TO').val();
            var global_home_loc_to = $('#' + rowID + '_HOME_LOC_TO').attr('value');
            var global_class_cd_to = $('#' + rowID + '_CLASS_CD_TO').attr('value');
            var global_rsc_to = $('#' + rowID + '_RSC_TO').attr('value');
            var global_period_to = $('#PeriodTo').attr('value');
            var global_period_from = $('#PeriodFrom').attr('value');
            var param = [];
            var v_value_chosen = true;
            var period_from = $('#PeriodFrom').val();
            if (($('#' + rowID + '_HOME_LOC_TO').val() != $('#' + rowID + '_HOME_LOC_TO').attr('value')) || ($('#' + rowID + '_HOME_LOC_TO').val() != "" && $('#' + rowID + '_HOME_LOC_TO').attr('value') == "") || ($('#' + rowID + '_HOME_LOC_TO').val() == "" && $('#' + rowID + '_HOME_LOC_TO').attr('value') != "") || $('#' + rowID + '_HOME_LOC_TO').attr('class') == "red") {
                if (((jQuery.inArray(status_id, OrignatorStatusID) == 0 && bems_orig == SessionBems) || (jQuery.inArray(status_id, AccountantStatusID) == 0 && bems_acct == SessionBems) || (status_id == "CA" && bems_cost_acct == SessionBems)) && ($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() != "FRG" || $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == "")) {
                    if (($('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || period_to == "" || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == ("REQUIRED"))) {
                        $('#' + rowID + '_HOME_LOC_TO').val(global_home_loc_to);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the activity id (from) first.", "error");
                    }
                    else if (($('#' + rowID + '_PROJECT_ID_FROM').val() == "" || $('#' + rowID + '_PROJECT_ID_FROM').val() == ("REQUIRED"))) {
                        $('#' + rowID + '_HOME_LOC_TO').val(global_home_loc_to);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the project id (from) first.", "error");
                    }
                    else if (($('#' + rowID + '_ACCOUNT_FROM').val() == "")) {
                        $('#' + rowID + '_HOME_LOC_TO').val(global_home_loc_to);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the account(from) first.", "error");
                    }
                    else if (($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "" || $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == ("REQ"))) {
                        $('#' + rowID + '_HOME_LOC_TO').val(global_home_loc_to);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the proj trans type (from) first.", "error");
                    }
                    else if (($('#' + rowID + '_ACTIVITY_ID_TO').val() == "" || $('#' + rowID + '_ACTIVITY_ID_TO').val() == ("REQUIRED"))) {
                        $('#' + rowID + '_HOME_LOC_TO').val(global_home_loc_to);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the activity (to) first.", "error");
                    }
                    else if (($('#' + rowID + '_PROJECT_ID_TO').val() == "" || $('#' + rowID + '_PROJECT_ID_TO').val() == ("REQUIRED"))) {
                        $('#' + rowID + '_HOME_LOC_TO').val(global_home_loc_to);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the project id(to) first.", "error");
                    }
                    else if (($('#' + rowID + '_ACCOUNT_TO').val() == "" && $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == ("LBR"))) {
                        $('#' + rowID + '_HOME_LOC_TO').val(global_home_loc_to);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the account(to) first.", "error");
                    }
                    else {
                        if ((py_cy_status == ("CY"))) {
                            if (period_from == global_period_from && (period_to != global_period_to)) {
                                $('#PeriodTo').val(global_period_to);
                            }
                        }
                        if (($('#' + rowID + '_HOME_BUGL_TO').val() == "")) {
                            $('#' + rowID + '_HOME_BUGL_TO').val($('#OrigBu').val());
                        }
                        if ((py_cy_status == ("PY") && fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_TO').val() != null)) {
                            v_setid = $('#' + rowID + '_AFFILIATE_TO').val();
                        }

                        else {
                            v_setid = $('#' + rowID + '_HOME_BUGL_TO').val();
                        }

                        var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                        var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                        var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                        var mctrLineItem = $.extend(grid1, grid2, grid3);

                        param.push(mctrLineItem);
                        mctrLineItem.SETID = v_setid;
                        mctrLineItem.PERIOD_TO = new Date($('#PeriodTo').val());
                        mctrLineItem.COW = new Date($('#COW').val());
                        var mctrCreateFormq = $('#form').serialize();
                        var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                        var mctrCreateForm = $.extend({
                            mctrLineItem: param
                        }, mctrCreateFromJson);
                        mctrCreateForm.LineNo = $('#' + rowID + '_LINE_NO').val();
                        mctrCreateForm.COW = $('#COW').val();
                        mctrCreateForm.PeriodTo = $('#PeriodTo').val();

                        $.ajax({
                            url: getBaseUrl('/MctrCreateForm/mctrLineItemhomeLocToPostTextItemOpenLOV'),
                            type: 'POST',
                            data: mctrCreateForm,
                            success: function (data) {
                                if (data != '') {
                                    v_countEAS = data.V_Count['homeLocEAS'];
                                    v_count = data.V_Count['HomeLocTo'];
                                    v_countLOV = data.V_Count['HomeLocToLOV'];

                                    if (($('#' + rowID + '_HOME_DEPT_TO').val() != "")) {
                                        if ($('#' + rowID + '_HOME_LOC_TO').val() != "" || v_countEAS > 0) {
                                            var errorFn = function (jqXHR, textStatus, errorThrown) {

                                                v_value_chosen = true;
                                            };
                                            var succesFn = function (data) {
                                                if (data) {

                                                    if ($('.bootbox').length == 0) {
                                                        var box = bootbox.dialog({
                                                            title: "Home Department/Location (To) List",
                                                            onEscape: true,
                                                            message: data
                                                        });
                                                        box.modal('show');
                                                    }
                                                }
                                            };
                                            if (v_countEAS > 0) {
                                                v_value_chosen = false;
                                                mctrObj.ajaxOptions('/MctrCreateForm/HomeDeptLocToLOV', 'GET', { rowId: rowID }, succesFn, errorFn);
                                            }
                                        }
                                        if ($('#' + rowID + '_HOME_LOC_TO').val() == "" || v_countEAS == 0) {

                                            var errorFn = function (jqXHR, textStatus, errorThrown) {
                                                v_value_chosen = true;
                                            };
                                            var succesFn = function (data) {
                                                if (data) {
                                                    if ($('.bootbox').length == 0) {

                                                        var box = bootbox.dialog({
                                                            title: "Home Department/Location (To) List",
                                                            onEscape: true,
                                                            message: data
                                                        });
                                                        box.modal('show');
                                                    }
                                                }
                                            };
                                            if (v_count == 0) {
                                                mctrObj.showDialog($('#dialog-box'), "value entered was not found.", "warning");
                                                v_value_chosen = false;
                                                mctrObj.ajaxOptions('/MctrCreateForm/HomeDeptLocToLOV', 'GET', {
                                                    rowId: rowID
                                                }, succesFn, errorFn);
                                            }
                                            else {
                                                v_value_chosen = false;
                                                mctrObj.ajaxOptions('/MctrCreateForm/HomeDeptLocToLOV', 'GET', { rowId: rowID }, succesFn, errorFn);
                                            }
                                        }
                                    }
                                    else if ($('#' + rowID + '_HOME_LOC_TO').val() != "") {//|| v_countLOV == 0
                                        var errorFn = function (jqXHR, textStatus, errorThrown) {
                                            v_value_chosen = true;
                                        };
                                        var succesFn = function (data) {
                                            if (data) {
                                                if ($('.bootbox').length == 0) {
                                                    var box = bootbox.dialog({
                                                        title: "Home Accounting Location (To) List",
                                                        onEscape: true,
                                                        message: data
                                                    });
                                                    box.modal('show');
                                                }
                                            }
                                        };
                                        if (v_countLOV == 0) {
                                            mctrObj.showDialog($('#dialog-box'), "value entered was not found.", "warning");
                                            v_value_chosen = false;
                                            mctrObj.ajaxOptions('/MctrCreateForm/getRgListHomeLocToLOV', 'GET', {
                                                rowId: rowID
                                            }, succesFn, errorFn);
                                        }
                                        else {
                                            var vchoosen = false;
                                            if ($('#' + rowID + '_HOME_LOC_TO').attr('class') == "red") {
                                                vchoosen = true;
                                            }
                                            else {
                                                v_value_chosen = false;
                                                mctrObj.ajaxOptions('/MctrCreateForm/getRgListHomeLocToLOV', 'GET', {
                                                    rowId: rowID
                                                }, succesFn, errorFn);
                                            }
                                        }
                                    }

                                    if ((v_value_chosen) && (vchoosen || $('#' + rowID + '_HOME_LOC_TO').val() == "" && global_home_loc_to != "")) {

                                        $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass("white");
                                        $('#' + rowID + '_HOME_DEPT_TO').attr("red-flag", "N");
                                        $('#' + rowID + '_HOME_LOC_TO').removeClass().addClass("white");
                                        if ($('#' + rowID + '_HOME_DEPT_TO').val() != "") {
                                            //if (rowObject.EFF_STATUS == "i") {
                                            //    $('#' + rowID + '_HOME_DEPT_TO').attr('red-flag', 'Y');
                                            //    $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass("orange");
                                            //    mctrObj.showDialog($("#dialog-box"), "warning: inactive department/location combination selected.", "warning");
                                            //}

                                            if ($('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == ("LBR")) {
                                                if ($('#' + rowID + '_PROJ_TRANS_CODE_TO').val() == ("PRM")) {
                                                    $('#' + rowID + '_LABOR_RATE_CD7_TO').val("00");

                                                    $('#' + rowID + '_QUANTITY_TO').val('.0');
                                                    $('#' + rowID + '_QUANTITY_FROM').val('.0');

                                                    if (($('#' + rowID + '_AMOUNT_TO').val() != 0)) {
                                                        $('#' + rowID + '_AMOUNT_TO').removeClass().addClass("red");

                                                    }

                                                    else if (($('#' + rowID + '_AMOUNT_FROM').val() != 0)) {
                                                        $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass("red");
                                                    }
                                                }

                                                if (($('#' + rowID + '_CLASS_CD_TO').val() != null && global_class_cd_to != "" && global_class_cd_to != $('#' + rowID + '_CLASS_CD_TO').val())) {
                                                    $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass("red");
                                                }

                                                else {
                                                    $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass("white");
                                                }

                                                if (($('#' + rowID + '_RSC_TO').val() != null && global_rsc_to != null && global_rsc_to != $('#' + rowID + '_RSC_TO').val())) {
                                                    $('#' + rowID + '_RSC_TO').removeClass().addClass("red");
                                                }

                                                else {
                                                    $('#' + rowID + '_RSC_TO').removeClass().addClass("white");
                                                }
                                            }

                                            else {
                                                $('#' + rowID + '_LABOR_RATE_CD7_TO').val("");
                                                $('#' + rowID + '_CLASS_CD_TO').val(global_class_cd_to);
                                                $('#' + rowID + '_RSC_TO').val(global_rsc_to);
                                            }

                                            if (($('#' + rowID + '_WORK_DEPT_TO').val() == "" && $('#' + rowID + '_WORK_LOC_TO').val() == "") || ($('#' + rowID + '_WORK_DEPT_TO').val() == $('#' + rowID + '_HOME_DEPT_TO').val() && $('#' + rowID + '_WORK_LOC_TO').val() == "")) {
                                                $('#' + rowID + '_WORK_DEPT_TO').val($('#' + rowID + '_HOME_DEPT_TO').val());
                                                $('#' + rowID + '_WORK_LOC_TO').val($('#' + rowID + '_HOME_LOC_TO').val());
                                                $('#' + rowID + '_WORK_POOL_TO').val($('#' + rowID + '_HOME_POOL_TO').val());

                                                //if (rowObject.EFF_STATUS == "I") {
                                                //    $('#' + rowID + '_WORK_DEPT_TO').attr('red-flag', 'Y');
                                                //    $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("orange");

                                                //}

                                                //else {
                                                //    $('#' + rowID + '_WORK_DEPT_TO').attr('red-flag', 'N');
                                                //    $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("white");
                                                //}

                                                $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("white");
                                            }

                                            else if (home_loc_to != "" && ((work_dept_to == "" || work_loc_to == "" || work_pool_to == "") || (work_dept_to != home_dept_to) || (work_loc_to != home_loc_to) || (work_pool_to != home_pool_to))) {
                                                // v_alert_choice = show_alert('alert_work_dept');

                                                bootbox.confirm("Do you want to override Work Department/Location using Home Department/Location selection? Click OK button to accept.", function (result) {
                                                    if (result) {

                                                        $('#' + rowID + '_WORK_DEPT_TO').val($('#' + rowID + '_HOME_DEPT_TO').val());
                                                        $('#' + rowID + '_WORK_LOC_TO').val($('#' + rowID + '_HOME_LOC_TO').val());
                                                        $('#' + rowID + '_WORK_POOL_TO').val($('#' + rowID + '_HOME_POOL_TO').val());

                                                        //if (rowObject.EFF_STATUS == "I") {
                                                        //    $('#' + rowID + '_WORK_DEPT_TO').attr('red-flag', 'Y');
                                                        //    $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("orange");
                                                        //}

                                                        //else {
                                                        //    $('#' + rowID + '_WORK_DEPT_TO').attr('red-flag', 'N');
                                                        //    $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("white");

                                                        //}

                                                        $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("white");

                                                    }
                                                });

                                            }

                                            else {
                                                if ($('#' + rowID + '_HOME_DEPT_TO').val() != "" && $('#' + rowID + '_HOME_DEPT_TO').val() == $('#' + rowID + '_WORK_DEPT_TO').val() && $('#' + rowID + '_HOME_LOC_TO').val() != "" && $('#' + rowID + '_HOME_LOC_TO').val() == $('#' + rowID + '_WORK_LOC_TO').val()) {
                                                    //if (rowObject.EFF_STATUS == "I") {
                                                    //    $('#' + rowID + '_WORK_DEPT_TO').attr('red-flag', 'Y');
                                                    //    $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("orange");

                                                    //}

                                                    //else {
                                                    //    $('#' + rowID + '_WORK_DEPT_TO').attr('red-flag', 'N');
                                                    //    $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("white");

                                                    //}
                                                    $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("white");

                                                }
                                            }
                                        }

                                        else {
                                            $('#' + rowID + '_HOME_LOC_TO').attr('value', $('#' + rowID + '_HOME_LOC_TO').val());
                                            $('#' + rowID + '_HOME_POOL_TO').val("");
                                            $('#' + rowID + '_LABOR_RATE_CD7_TO').val("");

                                            if ($('#' + rowID + '_WORK_LOC_TO').val() == "") {
                                                $('#' + rowID + '_WORK_LOC_TO').val($('#' + rowID + '_HOME_LOC_TO').val());
                                                $('#' + rowID + '_WORK_POOL_TO').val($('#' + rowID + '_HOME_POOL_TO').val());
                                                $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("white");
                                                $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("white");
                                                $('#' + rowID + '_WORK_DEPT_TO').attr("red-flag", "N");

                                            }

                                            if ($('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == ("LBR")) {
                                                mctrObj.showDialog($("#dialog-box"), "warning: home department/location to selection is normally required when ptt = lbr.", "warning");

                                            } else if ($('#' + rowID + '_QUANTITY_FROM').val() == 0 && $('#' + rowID + '_AMOUNT_FROM').val() == 0) {
                                                $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass('white');
                                                $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass('white');
                                            }
                                            if ($('#' + rowID + '_LABOR_RATE_CD7_TO').val() == 'NR' && ($('#' + rowID + '_LABOR_RATE_CD7_FROM').val() != 'NR' || $('#' + rowID + '_LABOR_RATE_CD7_FROM').val() == '')) {
                                                $('#' + rowID + '_LABOR_RATE_CD7_TO').removeClass().addClass('yellow');
                                                $('#' + rowID + '_AMOUNT_TO').removeClass().addClass('yellow');
                                            }
                                            else {
                                                $('#' + rowID + '_LABOR_RATE_CD7_TO').removeClass();//field_black_on_gray
                                                $('#' + rowID + '_AMOUNT_TO').removeClass();//field_black_on_white
                                            }
                                        }
                                    }
                                }
                            }

                        });


                        //}
                    }

                }
                else {
                    $('#' + rowID + '_HOME_LOC_TO').val(global_home_loc_to);

                    mctrObj.showDialog($('#dialog-box'), "You either do not have the proper role or proper status setting to change this field.", "error");

                }
            }
        });

        $('input[id*=HOME_LOC_FROM]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var status_id = $('#StatusId').val();
            var bems_orig = $('#BemsOrig').val();
            var bems_acct = $('#BemsAcct').val();
            var SessionBems = $('#SessionBems').val();
            var v_setid = "";
            var period_from = $('#PeriodTo').val();
            var AccountantStatusID = ['AA', 'OR'];
            var OrignatorStatusID = ['OA', 'OR'];
            var BemsAcct = $('#BemsOrig').val();
            var bems_cost_acct = $('#BemsCostAcct').val();
            var global_home_loc_from = $('#' + rowID + '_HOME_LOC_FROM').attr('value');
            var global_class_cd_from = $('#' + rowID + '_CLASS_CD_FROM').attr('value');
            var global_rsc_from = $('#' + rowID + '_RSC_FROM').attr('value');
            var global_period_from = $('#PeriodTo').attr('value');
            var global_period_from = $('#PeriodFrom').attr('value');
            var work_dept_from = $('#' + rowID + '_WORK_DEPT_FROM').val();
            var home_dept_from = $('#' + rowID + '_HOME_DEPT_FROM').val();
            var work_loc_from = $('#' + rowID + '_WORK_LOC_FROM').val();
            var home_loc_from = $('#' + rowID + '_HOME_LOC_FROM').val();
            var work_pool_from = $('#' + rowID + '_WORK_POOL_FROM').val();
            var home_pool_from = $('#' + rowID + '_HOME_POOL_FROM').val();
            var labor_rate_cd7_from = $('#' + rowID + 'LABOR_RATE_CD7_FROM').val();
            var param = [];
            var v_value_chosen = true;
            var period_from = $('#PeriodFrom').val();
            if (($('#' + rowID + '_HOME_LOC_FROM').val() != $('#' + rowID + '_HOME_LOC_FROM').attr('value')) || ($('#' + rowID + '_HOME_LOC_FROM').val() != "" && $('#' + rowID + '_HOME_LOC_FROM').attr('value') == "") || ($('#' + rowID + '_HOME_LOC_FROM').val() == "" && $('#' + rowID + '_HOME_LOC_FROM').attr('value') != "") || $('#' + rowID + '_HOME_LOC_FROM').attr('class') == "red") {
                if (((jQuery.inArray(status_id, OrignatorStatusID) == 0 && bems_orig == SessionBems) || (jQuery.inArray(status_id, AccountantStatusID) == 0 && bems_acct == SessionBems) || (status_id == "CA" && bems_cost_acct == SessionBems)) && ($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() != "FRG" || $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == "")) {
                    if (($('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || period_from == "" || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == ("REQUIRED"))) {
                        $('#' + rowID + '_HOME_LOC_FROM').val(global_home_loc_from);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the activity id (from) first.", "error");
                    }
                    else if (($('#' + rowID + '_PROJECT_ID_FROM').val() == "" || $('#' + rowID + '_PROJECT_ID_FROM').val() == ("REQUIRED"))) {
                        $('#' + rowID + '_HOME_LOC_FROM').val(global_home_loc_from);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the project id (from) first.", "error");
                    }
                    else if (($('#' + rowID + '_ACCOUNT_FROM').val() == "")) {
                        $('#' + rowID + '_HOME_LOC_FROM').val(global_home_loc_from);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the account(from) first.", "error");
                    }
                    else if (($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "" || $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == ("REQ"))) {
                        $('#' + rowID + '_HOME_LOC_FROM').val(global_home_loc_from);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the proj trans type (from) first.", "error");
                    }
                    else if (($('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == ("REQUIRED"))) {
                        $('#' + rowID + '_HOME_LOC_FROM').val(global_home_loc_from);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the activity (to) first.", "error");
                    }
                    else if (($('#' + rowID + '_PROJECT_ID_FROM').val() == "" || $('#' + rowID + '_PROJECT_ID_FROM').val() == ("REQUIRED"))) {
                        $('#' + rowID + '_HOME_LOC_FROM').val(global_home_loc_from);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the project id(to) first.", "error");
                    }
                    else if (($('#' + rowID + '_ACCOUNT_FROM').val() == "" && $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == ("LBR"))) {
                        $('#' + rowID + '_HOME_LOC_FROM').val(global_home_loc_from);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the account(to) first.", "error");
                    }
                    else {
                        if ((py_cy_status == ("CY"))) {
                            if (period_from == global_period_from && (period_from != global_period_from)) {
                                //  $('#PeriodTo').val(global_period_from);
                            }
                        }
                        if (($('#' + rowID + '_HOME_BUGL_FROM').val() == "")) {
                            $('#' + rowID + '_HOME_BUGL_FROM').val($('#OrigBu').val());
                        }
                        if ((py_cy_status == ("PY") && fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_FROM').val() != null)) {
                            v_setid = $('#' + rowID + '_AFFILIATE_FROM').val();
                        }

                        else {
                            v_setid = $('#' + rowID + '_HOME_BUGL_FROM').val();
                        }
                        //if (($('#' + rowID + '_HOME_DEPT_FROM').val() != "")) {
                        var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                        var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                        var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                        var mctrLineItem = $.extend(grid1, grid2, grid3);


                        param.push(mctrLineItem);
                        mctrLineItem.SETID = v_setid;
                        mctrLineItem.PERIOD_TO = new Date($('#PeriodTo').val());
                        mctrLineItem.COW = new Date($('#COW').val());
                        var mctrCreateFormq = $('#form').serialize();
                        var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                        var mctrCreateForm = $.extend({
                            mctrLineItem: param
                        }, mctrCreateFromJson);
                        mctrCreateForm.LineNo = $('#' + rowID + '_LINE_NO').val();
                        mctrCreateForm.COW = $('#COW').val();
                        mctrCreateForm.PeriodTo = $('#PeriodTo').val();

                        $.ajax({
                            url: getBaseUrl('/MctrCreateForm/mctrLineItemhomeLocFromPostTextItemOpenLOV'),
                            type: 'POST',
                            data: mctrCreateForm,
                            success: function (data) {
                                if (data != '') {
                                    //v_count = data.V_Count['HomeLocFrom'];
                                    //v_countLOV = data.V_Count['HomeLocFromLOV'];

                                    v_HomeLoc = data.V_Count['HomeLoc'];
                                    v_HomeLocFrom = data.V_Count['HomeLocFrom'];
                                    v_HomeLocFromLOV = data.V_Count['HomeLocFromLOV'];

                                    if (($('#' + rowID + '_HOME_DEPT_FROM').val() != "")) {

                                        if ($('#' + rowID + '_HOME_LOC_FROM').val() != "") {
                                            v_count = v_HomeLoc;
                                            var successFn = function (data) {
                                                if (data) {
                                                    if ($('.bootbox').length == 0) {
                                                        var box = bootbox.dialog({
                                                            title: "Home Department/Location (From) List ",
                                                            onEscape: true,
                                                            message: data
                                                        });
                                                        box.modal('show');
                                                    }
                                                }
                                            };
                                            var errorsFn = function (jqXHR, textStatus, errorThrown) {
                                                v_value_chosen = true;
                                                //$('#' + rowID + '_WORK_DEPT_FROM').val(global_work_dept_from);
                                            };
                                            if (v_count > 0) {
                                                v_value_chosen = false;
                                                mctrObj.ajaxOptions('/MctrCreateForm/HomeDeptLocFromLOV', 'GET', {
                                                    rowId: rowID
                                                }, successFn, errorsFn);

                                            }
                                        }
                                        if ($('#' + rowID + '_HOME_LOC_FROM').val() == '' || v_count == 0) {
                                            v_count = v_HomeLocFrom;


                                            var succcesFn = function (data) {
                                                if ($('.bootbox').length == 0) {
                                                    if (data) {
                                                        var box = bootbox.dialog({
                                                            title: "Home Department/Location (From) List",
                                                            onEscape: true,
                                                            message: data
                                                        });
                                                        box.modal('show');
                                                    }
                                                }
                                            };
                                            var errrorFn = function (jqXHR, textStatus, errorThrown) {
                                                v_value_chosen = true;
                                                //$('#' + rowID + '_WORK_DEPT_FROM').val(global_work_dept_from);
                                            };
                                            v_value_chosen = false;
                                            mctrObj.ajaxOptions('/MctrCreateForm/HomeDeptLocFromLOV', 'GET', { rowId: rowID }, succcesFn, errrorFn);

                                            //var errorFn = function (jqXHR, textStatus, errorThrown) {
                                            //};
                                            //var succesFn = function (data) {
                                            //    if (data) {
                                            //        var box = bootbox.dialog({
                                            //            title: " Home Dept From Lov",
                                            //            message: data
                                            //        });
                                            //        box.modal('show');
                                            //    }
                                            //};
                                            //if (v_count == 0)
                                            //{
                                            //    mctrObj.showDialog($('#dialog-box'), "value entered was not found. list of valid values provided.", "warning");
                                            //    mctrObj.ajaxOptions('/MctrCreateForm/getRgListHomeDeptFromLOV?rowId=' + rowID, 'GET', {}, succesFn, errorFn);
                                            //}
                                            //else {
                                            //    var succesFn = function (data) {
                                            //        if (data) {
                                            //            var box = bootbox.dialog({
                                            //                title: " Home Dept From Lov",
                                            //                message: data
                                            //            });
                                            //            box.modal('show');
                                            //        }
                                            //    };
                                            //    var errorFn = function (jqXHR, textStatus, errorThrown) {
                                            //        //$('#' + rowID + '_WORK_DEPT_FROM').val(global_work_dept_from);
                                            //    };
                                            //    if (v_count > 0) {
                                            //        mctrObj.ajaxOptions('/MctrCreateForm/getRgListWorkDeptFromLOV', 'GET', { rowId: rowID }, succesFn, errorFn);
                                            //    }
                                            //}
                                        }
                                    }

                                    else if ($('#' + rowID + '_HOME_LOC_FROM').val() != '') {
                                        var errorFn = function (jqXHR, textStatus, errorThrown) {
                                            v_value_chosen = true;
                                        };
                                        var succesFn = function (data) {
                                            if (data) {
                                                if ($('.bootbox').length == 0) {
                                                    var box = bootbox.dialog({
                                                        title: "Home Accounting Location (From) L ist",
                                                        onEscape: true,
                                                        message: data
                                                    });
                                                    box.modal('show');
                                                }
                                            }
                                        };
                                        if (v_HomeLocFromLOV == 0) {
                                            mctrObj.showDialog($('#dialog-box'), "warning - value entered was not found. list of valid values provided.", "warning");
                                            //v_value_chosen = false;
                                            mctrObj.ajaxOptions('/MctrCreateForm/getRgListHomeLocFromLOV', 'GET', {
                                                rowId: rowID
                                            }, succesFn, errorFn);
                                        }
                                        else {
                                            var vchosen = false;
                                            if ($('#' + rowID + '_HOME_LOC_FROM').attr('class') == "red") {
                                                vchosen = true;
                                            }
                                            else {
                                                //v_value_chosen = false;
                                                mctrObj.ajaxOptions('/MctrCreateForm/getRgListHomeLocFromLOV', 'GET', {
                                                    rowId: rowID
                                                }, succesFn, errorFn);
                                            }
                                        }
                                        ///*v_count = v_HomeLocFromLOV;
                                        //if (v_count == 0) {
                                        //    mctrObj.showDialog($('#dialog-box'), "warning - value entered was not found. list of valid values provided.", "warning");

                                        //    var errorFn = function (jqXHR, textStatus, errorThrown) {
                                        //        v_value_chosen = true;
                                        //    };
                                        //    var succesFn = function (data) {
                                        //        if ($('.bootbox').length == 0) {
                                        //            if (data) {
                                        //                bootbox.dialog({
                                        //                    title: "Home Accounting Location (From) List",
                                        //                    onEscape: true,
                                        //                    message: data
                                        //                });

                                        //            }
                                        //        }
                                        //    };

                                        ////v_value_chosen = true;
                                        //mctrObj.ajaxOptions('/MctrCreateForm/getRgListHomeLocFromLOV', 'GET', { rowId: rowID }, succesFn, errorFn);
                                        //}*/
                                        //var vchosen = false;
                                        //if ($('#' + rowID + '_HOME_LOC_FROM').attr('class') == "red") {
                                        //    vchosen = true;
                                        //}

                                    }
                                    if ((v_value_chosen == true) && ((vchosen) || ($('#' + rowID + '_HOME_LOC_FROM').val() == "" && global_home_loc_from != ""))) {

                                        $('#' + rowID + '_ttdValue').addClass("white");
                                        $('#' + rowID + '_yearValue').addClass("white");
                                        $('#' + rowID + '_HOME_DEPT_FROM').removeClass().addClass("white");
                                        $('#' + rowID + '_HOME_DEPT_FROM').attr("red-flag", "N");
                                        $('#' + rowID + '_HOME_LOC_FROM').removeClass().addClass("white");

                                        if ($('#' + rowID + '_HOME_DEPT_FROM').val() != "") {
                                            //if (rowObject.EFF_STATUS == "I") {
                                            //    $('#' + rowID + '_HOME_DEPT_TO').attr('red-flag', 'Y');
                                            //    $('#' + rowID + '_HOME_DEPT_FROM').removeClass().addClass("orange");
                                            //    mctrObj.showDialog($("#dialog-box"), "warning: inactive department/location combination selected.", "warning");
                                            //}

                                            if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "LBR") {
                                                if ($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == "PRM") {
                                                    $('#' + rowID + '_LABOR_RATE_CD7_FROM').val("00");

                                                    $('#' + rowID + '_QUANTITY_FROM').val('.0');
                                                    $('#' + rowID + '_QUANTITY_FROM').val('.0');

                                                    if (($('#' + rowID + '_AMOUNT_FROM').val() != 0)) {
                                                        $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass("red");

                                                    }

                                                    else if (($('#' + rowID + '_AMOUNT_TO').val() != 0)) {
                                                        $('#' + rowID + '_AMOUNT_TO').removeClass().addClass("red");
                                                    }
                                                }

                                                if (($('#' + rowID + '_CLASS_CD_FROM').val() != null && global_class_cd_from != "" && global_class_cd_from != $('#' + rowID + '_CLASS_CD_FROM').val())) {
                                                    $('#' + rowID + '_CLASS_CD_FROM').val(global_class_cd_from);
                                                    $('#' + rowID + '_CLASS_CD_FROM').removeClass().addClass("red");
                                                }

                                                else {
                                                    $('#' + rowID + '_CLASS_CD_FROM').removeClass().addClass("white");
                                                }

                                                if (($('#' + rowID + '_RSC_FROM').val() != null && global_rsc_from != null && global_rsc_from != $('#' + rowID + '_RSC_FROM').val())) {
                                                    $('#' + rowID + '_RSC_FROM').removeClass().addClass("red");
                                                }

                                                else {
                                                    $('#' + rowID + '_RSC_FROM').removeClass().addClass("white");
                                                }
                                            }

                                            else {
                                                $('#' + rowID + '_LABOR_RATE_CD7_FROM').val("");
                                                $('#' + rowID + '_CLASS_CD_FROM').val(global_class_cd_from);
                                                $('#' + rowID + '_RSC_FROM').val(global_rsc_from);
                                            }

                                            if (($('#' + rowID + '_WORK_DEPT_FROM').val() == "" && $('#' + rowID + '_WORK_LOC_FROM').val() == "") || ($('#' + rowID + '_WORK_DEPT_FROM').val() == $('#' + rowID + '_HOME_DEPT_FROM').val() && $('#' + rowID + '_WORK_LOC_FROM').val() == "")) {
                                                $('#' + rowID + '_WORK_DEPT_FROM').val($('#' + rowID + '_HOME_DEPT_FROM').val());
                                                $('#' + rowID + '_WORK_LOC_FROM').val($('#' + rowID + '_HOME_LOC_FROM').val());
                                                $('#' + rowID + '_WORK_POOL_FROM').val($('#' + rowID + '_HOME_POOL_FROM').val());

                                                //if (rowObject.EFF_STATUS == "I") {
                                                //    $('#' + rowID + '_WORK_DEPT_FROM').attr('red-flag', 'Y');
                                                //    $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass("orange");

                                                //}

                                                //else {
                                                //    $('#' + rowID + '_WORK_DEPT_FROM').attr('red-flag', 'N');
                                                //    $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass("white");
                                                //}

                                                $('#' + rowID + '_WORK_LOC_FROM').removeClass().addClass("white");
                                            }

                                            else if (home_loc_from != "" && ((work_dept_from == "" || work_loc_from == "" || work_pool_from == "") || (work_dept_from != home_dept_from) || (work_loc_from != home_loc_from) || (work_pool_from != home_pool_from))) {
                                                // v_alert_choice = show_alert('alert_work_dept');

                                                bootbox.confirm("Do you want from override Work Department/Location using Home Department/Location selection? Click OK butfromn from accept.", function (result) {
                                                    if (result) {

                                                        $('#' + rowID + '_WORK_DEPT_FROM').val($('#' + rowID + '_HOME_DEPT_FROM').val());
                                                        $('#' + rowID + '_WORK_LOC_FROM').val($('#' + rowID + '_HOME_LOC_FROM').val());
                                                        $('#' + rowID + '_WORK_POOL_FROM').val($('#' + rowID + '_HOME_POOL_FROM').val());

                                                        //if (rowObject.EFF_STATUS == "I") {
                                                        //    $('#' + rowID + '_WORK_DEPT_FROM').attr('red-flag', 'Y');
                                                        //    $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass("orange");
                                                        //}

                                                        //else {
                                                        //    $('#' + rowID + '_WORK_DEPT_FROM').attr('red-flag', 'N');
                                                        //    $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass("white");
                                                        //}

                                                        $('#' + rowID + '_WORK_LOC_FROM').removeClass().addClass("white");
                                                    }
                                                });

                                            }

                                            else {
                                                if ($('#' + rowID + '_HOME_DEPT_FROM').val() != "" && $('#' + rowID + '_HOME_DEPT_FROM').val() == $('#' + rowID + '_WORK_DEPT_FROM').val() && $('#' + rowID + '_HOME_LOC_FROM').val() != "" && $('#' + rowID + '_HOME_LOC_FROM').val() == $('#' + rowID + '_WORK_LOC_FROM').val()) {
                                                    //if (rowObject.EFF_STATUS == "i") {
                                                    //    $('#' + rowID + '_WORK_DEPT_FROM').attr('red-flag', 'Y');
                                                    //    $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass("orange");

                                                    //}

                                                    //else {
                                                    //    $('#' + rowID + '_WORK_DEPT_FROM').attr('red-flag', 'N');
                                                    //    $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass("white");

                                                    //}
                                                    $('#' + rowID + '_WORK_LOC_FROM').removeClass().addClass("white");

                                                }
                                            }
                                        }

                                        else {
                                            $('#' + rowID + '_HOME_LOC_FROM').attr('value', $('#' + rowID + '_HOME_LOC_FROM').val());
                                            $('#' + rowID + '_HOME_POOL_FROM').val("");
                                            $('#' + rowID + '_LABOR_RATE_CD7_FROM').val("");

                                            if ($('#' + rowID + '_WORK_LOC_FROM').val() == "") {
                                                $('#' + rowID + '_WORK_LOC_FROM').val($('#' + rowID + '_HOME_LOC_FROM').val());
                                                $('#' + rowID + '_WORK_POOL_FROM').val($('#' + rowID + '_HOME_POOL_FROM').val());
                                                $('#' + rowID + '_WORK_LOC_FROM').removeClass().addClass("white");
                                                $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass("white");
                                                $('#' + rowID + '_WORK_DEPT_FROM').attr("red-flag", "N");

                                            }

                                            if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "LBR") {
                                                mctrObj.showDialog($("#dialog-box"), "warning: home department/location from selection is normally required when ptt = lbr.", "warning");

                                            }
                                        }
                                        if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == 'LBR') {
                                            // needs to be verified 
                                            $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass('white');
                                            $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass('white');
                                        } else if ($('#' + rowID + '_QUANTITY_FROM').val() == 0 && $('#' + rowID + '_AMOUNT_FROM').val() == 0) {
                                            $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass('white');
                                            $('#' + rowID + '_AMOUNT_FROM').removeClass().addClass('white');
                                        }
                                        if ($('#' + rowID + '_LABOR_RATE_CD7_TO').val() == 'NR' && ($('#' + rowID + '_LABOR_RATE_CD7_FROM').val() != 'NR' || $('#' + rowID + '_LABOR_RATE_CD7_FROM').val() == '')) {
                                            $('#' + rowID + '_LABOR_RATE_CD7_TO').removeClass().addClass('yellow');
                                            $('#' + rowID + '_AMOUNT_TO').removeClass().addClass('yellow');
                                        }
                                        else {
                                            $('#' + rowID + '_LABOR_RATE_CD7_TO').removeClass();//field_black_on_gray
                                            $('#' + rowID + '_AMOUNT_TO').removeClass();//field_black_on_white
                                        }
                                    }
                                }
                            }
                        });

                        //}
                    }
                }
                else {
                    $('#' + rowID + '_HOME_LOC_FROM').val(global_home_loc_from);

                    mctrObj.showDialog($('#dialog-box'), "You either do not have the proper role or proper status setting to change this field.", "error");

                }
            }

        });

        $('input[id*=BULK_FROM]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var mctrno = $('#MctrNo').val();
            var SessionBems = $('#SessionBems').val();
            var statusID = $('#StatusId').val();
            var BemsOrig = $('#BemsOrig').val();
            var bulk_from = $('#' + rowID + '_BULK_FROM').val();
            var global_bulk_from = $('#' + rowID + '_BULK_FROM').attr('value');
            //var AFFILIATE_TO = $('#' + rowID + 'AFFILIATE_TO').val();
            var proj_trans_type_from = $('#' + rowID + '_PROJ_TRANS_TYPE_FROM ').val();
            var proj_trans_code_from = $('#' + rowID + '_PROJ_TRANS_CODE_FROM ').val();
            var fiscal_year = $('#fyear').val().trim();
            var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
            var account_from = $('#' + rowID + '_ACCOUNT_FROM').val();
            var home_bugl_from = $('#' + rowID + '_HOME_BUGL_FROM').val();;
            var project_id_from = $('#' + rowID + '_PROJECT_ID_FROM').val();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var StatusID = $('#StatusId').val();
            var bems_cost_acct = $('#SessionBems').val();
            var period_to = $('#PeriodTo').val();
            var BemsAcct = $('#BemsOrig').val();
            var bems_cost_acct = $('#BemsCostAcct').val();
            var v_value_chosen = false;
            var v_setid = "";
            var v_count = '';
            var global_rsc_from = '';
            var global_set_id = $('#' + rowID + '_HOME_BUGL_FROM').attr('value');

            if ((bulk_from != global_bulk_from) || (bulk_from == '' && global_bulk_from != '') || (bulk_from != '' && global_bulk_from == '') || ($('#' + rowID + '_BULK_FROM').attr('class') == "red")) {
                if ((((StatusID == "OA" || StatusID == "OR") && BemsOrig == $('#SessionBems').val()) || (((StatusID == "AA" || StatusID == "OR") && BemsAcct == $('#SessionBems').val()) || (StatusID == 'CA' && bems_cost_acct == $('#SessionBems').val())) && proj_trans_code_from != 'FRG' || proj_trans_code_from == '')) {
                    if (activity_id_from == '' || period_to == '' || activity_id_from == 'REQUIRED') {
                        $('#' + rowID + '_BULK_FROM').val(global_bulk_from);
                        mctrObj.showDialog($('#dialog-box'), 'Please Enter The Activity Id (From) First.', 'error');
                    }
                    else if (project_id_from == '' || project_id_from == 'REQUIRED') {
                        $('#' + rowID + '_BULK_FROM').val(global_bulk_from);
                        mctrObj.showDialog($('#dialog-box'), 'Please Enter The Project Id (From) First.', 'error');
                    }
                    else if (account_from == '') {
                        $('#' + rowID + '_BULK_FROM').val(global_bulk_from);
                        mctrObj.showDialog($('#dialog-box'), 'please enter the account (from) first.', 'error');
                    }
                    else if (proj_trans_type_from == '' || proj_trans_type_from == 'REQ') {
                        $('#' + rowID + '_BULK_FROM').val(global_bulk_from);
                        mctrObj.showDialog($('#dialog-box'), 'project trans type (from) value must be entered first.', 'error');
                    }
                    else {//inside keep bracket
                        if ($('#' + rowID + '_BULK_FROM').val() != '') {

                            if (($('#' + rowID + '_HOME_BUGL_FROM').val() == "")) {
                                $('#' + rowID + '_HOME_BUGL_FROM').val($('#OrigBu').val());
                            }

                            var param = [];
                            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                            var mctrItem = $.extend(grid1, grid2, grid3);
                            mctrItem.FYEAR = $('#fyear').val().trim();
                            if (py_cy_status == 'PY' || fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_FROM').val() != '') {
                                mctrItem.SETID = $('#' + rowID + '_AFFILIATE_FROM').val()
                            }
                            else {
                                mctrItem.SETID = $('#' + rowID + '_HOME_BUGL_FROM').val()
                            }

                            param.push(mctrItem);

                            var mctrCreateFormq = $('#form').serialize();
                            var lineitem = JSON.stringify(mctrCreateFormq);
                            var mctrCreateForm = $.extend({
                                mctrLineItem: param
                            }, lineitem);

                            // affiliate used only on prior year transactions effective 2008 ||  greater.
                            var buprofile = {
                                Business_Unit: $('#OrigBu').val()
                            }

                            $.ajax({
                                url: getBaseUrl('/MctrCreateForm/mctrLineItembulkFromPostTextItemOpenLOVBulkFlag'),
                                type: 'POST',
                                data: buprofile,
                                success: function (data) {
                                    v_bulk_flg = data.Bulk_Flg;

                                    if (v_bulk_flg == 'N') {
                                        mctrObj.showDialog($('#dialog-box'), 'originating business unit does not move bulk allocation detail.', 'success');

                                    }
                                    else {
                                        $.ajax({
                                            url: getBaseUrl('/MctrCreateForm/mctrLineItembulkFromPostTextItemOpenLOV'),
                                            type: 'POST',
                                            data: mctrCreateForm,
                                            success: function (data) {
                                                v_count = data.V_Count['BulkCOUNT'];
                                                if (v_count == 0) {
                                                    v_count = data.V_Count['BulkEAS'];

                                                    if (v_count == 0) {
                                                        var message = "invalid bulk from value [ ||" + $('#' + rowID + '_BULK_FROM').val() + "|| ] set to blank. please enter again.";
                                                        mctrObj.showDialog($('#dialog-box'), message, 'error');
                                                        $('#' + rowID + '_BULK_FROM').val("");
                                                        $('#' + rowID + '_BULK_FROM').removeClass().addClass('white');
                                                    }
                                                    else {
                                                        mctrObj.showDialog($('#dialog-box'), 'accepted - rp master accounting found using bulk from value entered.', 'success');
                                                        $('#' + rowID + '_BULK_FROM').removeClass().addClass('white');
                                                    }
                                                }
                                                else if ($('#' + rowID + '_BULK_FROM').val() != global_bulk_from || $('#' + rowID + '_BULK_FROM').val() != '' && global_bulk_from == '') {
                                                    //v_value_chosen = show_lov('lov_bulk_from');

                                                    var id = $(this).attr('row-id');
                                                    rowID = id;
                                                    var errorFn = function (jqXHR, textStatus, errorThrown) {
                                                    };

                                                    var succesFn = function (data) {
                                                        if ($('.bootbox').length == 0) {
                                                            if (data) {
                                                                bootbox.dialog({
                                                                    title: "BULK FROM",
                                                                    message: data,
                                                                    onEscape: true
                                                                })
                                                            }
                                                        }
                                                    };
                                                    mctrObj.ajaxOptions('/MctrCreateForm/getRgBulkFromLOV', 'GET', {
                                                        rowId: rowID
                                                    }, succesFn, errorFn);

                                                }

                                                else {
                                                    $('#' + rowID + '_BULK_FROM').removeClass().addClass('white');
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                        else {

                            $('#' + rowID + '_BULK_FROM').removeClass().addClass('white');
                        }

                        // needs to be verified
                        if (bulk_from != global_bulk_from || bulk_from == '' && global_bulk_from != '' || bulk_from != '' && global_bulk_from == '') {
                            $('#' + rowID + '_ttdValue').addClass("white");
                            $('#' + rowID + '_yearValue').addClass("white");
                        }
                    }


                }
                else {

                    $('#' + rowID + '_BULK_FROM').val(global_bulk_from);
                    mctrObj.showDialog($('#dialog-box'), 'you either do not have the proper role  or  proper status setting to change this field.', 'error');
                }
            }

        });
        $('input[id*=AFFILIATE_FROM]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var mctrno = $('#MctrNo').val();
            var SessionBems = $('#SessionBems').val();
            var statusID = $('#StatusId').val();
            var BemsOrig = $('#BemsOrig').val();
            var AFFILIATE_FROM = $('#' + rowID + '_AFFILIATE_FROM').val();
            var Global_AFFILIATE_FROM = $('#' + rowID + '_AFFILIATE_FROM').attr('value');
            var AFFILIATE_TO = $('#' + rowID + '_AFFILIATE_TO').val();
            var proj_trans_type_from = $('#' + rowID + '_PROJ_TRANS_TYPE_FROM ').val();
            var proj_trans_code_to = $('#' + rowID + '_PROJ_TRANS_CODE_TO ').val();
            var fiscal_year = $('#fyear').val().trim();
            var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
            var account_from = $('#' + rowID + '_ACCOUNT_FROM').val();
            var project_id_from = $('#' + rowID + '_PROJECT_ID_FROM').val();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var OrignatorStatusID = ['OA', 'OR'];
            var bemsID = $('#SessionBems').val();
            var period_to = $('#PeriodTo').val();
            var v_value_chosen = false;
            var v_count;

            if ((AFFILIATE_FROM != Global_AFFILIATE_FROM) || (AFFILIATE_FROM != '' && Global_AFFILIATE_FROM == '') || (AFFILIATE_FROM == '' && Global_AFFILIATE_FROM != '') || ($('#' + rowID + '_AFFILIATE_FROM').attr('class') == "red") || (py_cy_status == 'py' && fiscal_year > 2007 && AFFILIATE_FROM == '')) {
                if ((statusID == "OA" || statusID == "OR") && bemsID == $('#BemsOrig').val()) {
                    if (activity_id_from == '' || period_to == '' || activity_id_from == 'REQUIRED') {
                        $('#' + rowID + '_AFFILIATE_FROM').val(Global_AFFILIATE_FROM);
                        mctrObj.showDialog($('#dialog-box'), 'Please Enter The Activity Id (From) First.', 'error');
                    } else if (project_id_from == '' || project_id_from == 'REQUIRED') {
                        $('#' + rowID + '_AFFILIATE_FROM').val(Global_AFFILIATE_FROM);
                        mctrObj.showDialog($('#dialog-box'), 'Please Enter The Project Id (From) First.', 'error');
                    } else if (account_from == '') {
                        $('#' + rowID + '_AFFILIATE_FROM').val(Global_AFFILIATE_FROM);
                        mctrObj.showDialog($('#dialog-box'), 'please enter the account (from) first.', 'error');
                    } else if (proj_trans_type_from == '' || proj_trans_type_from == 'REQ') {
                        $('#' + rowID + '_AFFILIATE_FROM').val(Global_AFFILIATE_FROM);
                        mctrObj.showDialog($('#dialog-box'), 'project trans type (from) value must be entered first.', 'error');
                    }

                    else {

                        if ($('#' + rowID + '_HOME_BUGL_FROM').val() == '') {
                            $('#' + rowID + 'HOME_BUGL_FROM').val($('#OrigBu').val());

                        }
                        // affiliate used only on prior year transactions effective 2008 ||  greater.
                        if (py_cy_status == 'CY' || fiscal_year < 2008) {
                            $('#' + rowID + '_AFFILIATE_FROM').val('');
                            $('#' + rowID + '_AFFILIATE_TO').val('');
                            $('#' + rowID + '_AFFILIATE_FROM').removeClass().addClass('white');
                            $('#' + rowID + '_AFFILIATE_TO').val($('#' + rowID + '_AFFILIATE_FROM').val());
                            if (py_cy_status == 'CY') {
                                mctrObj.showDialog($('#dialog-box'), 'affiliate is set to blank for current year entries.', 'error');
                            } else {
                                mctrObj.showDialog($('#dialog-box'), 'affiliate is set to blank for prior year entries when fiscal year < 2008.', 'error');
                            }
                        }
                        else if ($('#' + rowID + '_AFFILIATE_FROM').val() == '' || $('#' + rowID + '_AFFILIATE_FROM').val() == $('#OrigBu').val()) {
                            $('#' + rowID + '_AFFILIATE_FROM').val($('#OrigBu').val());
                            $('#' + rowID + '_AFFILIATE_FROM').removeClass().addClass('white');
                            if (py_cy_status == 'PY') {
                                $('#' + rowID + '_AFFILIATE_TO').val($('#' + rowID + '_AFFILIATE_FROM').val());
                            }
                        } else {

                            // see if eas contains labor accounting for affiliate entered.
                            var param = [];
                            var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                            var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                            var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                            var mctrItem = $.extend(grid1, grid2, grid3);
                            mctrItem.FYEAR = $('#fyear').val().trim();
                            param.push(mctrItem);

                            var mctrCreateFormq = $('#form').serialize();
                            var lineitem = JSON.stringify(mctrCreateFormq);
                            var mctrCreateForm = $.extend({
                                mctrLineItem: param
                            }, lineitem);
                            $.ajax({
                                url: getBaseUrl('/MctrCreateForm/mctrLineItemaffiliateFromPostTextItemOpenLOV'),
                                type: 'POST',
                                data: mctrCreateForm,
                                success: function (data) {
                                    if (data != '') {

                                        v_affiliate = data.V_Count['affiliate'];
                                        v_affiliateValid = data.V_Count['affiliateValid'];
                                        v_affiliateValidation = data.V_Count['affiliateValidation'];
                                        v_count = v_affiliate;
                                        if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == ("LBR") && v_affiliate == 0) {
                                            v_count = v_affiliateValid;
                                        }
                                        else if (v_count == 0) {
                                            v_count = v_affiliateValidation;
                                        }

                                        if (v_count == 0) {


                                            var errorFn = function (jqXHR, textStatus, errorThrown) {
                                            };

                                            var succesFn = function (data) {
                                                if ($('.bootbox').length == 0) {
                                                    if (data) {
                                                        var dialog = bootbox.dialog({
                                                            title: "Affiliate From Lov",
                                                            size: 'small',
                                                            onEscape: true,
                                                            message: data
                                                        });
                                                        dialog.on("shown.bs.modal", function () {
                                                            if (v_count == 0) {
                                                                mctrObj.showDialog($('#info-msg'), 'Warning - Value entered was not found. List of valid values provided.', 'warning');
                                                            }
                                                        });
                                                    }
                                                }
                                            };
                                            mctrObj.ajaxOptions('/MctrCreateForm/getRgAffiliateFromLOV', 'GET', {
                                                rowId: rowID
                                            }, succesFn, errorFn);
                                            // v_value_chosen = show_lov('lov_affiliate_from');

                                            // if (!v_value_chosen) {
                                            if ($('#' + rowID + '_AFFILIATE_FROM').val() == "") {
                                                $('#' + rowID + '_AFFILIATE_FROM').val(Global_AFFILIATE_FROM);
                                            }

                                        }
                                        else {
                                            $('#' + rowID + '_AFFILIATE_FROM').val(String($('#' + rowID + '_AFFILIATE_FROM').val()).toUpperCase());
                                            $('#' + rowID + '_AFFILIATE_FROM').attr('value', String($('#' + rowID + '_AFFILIATE_FROM').val()).toUpperCase());
                                            mctrObj.showDialog($('#dialog-box'), 'the affiliate from value entered was successfully validated.', 'success');
                                        }
                                        // if (v_value_chosen || data.v_Count("affiliate") > 0) {

                                        if (data.V_Count['affiliate'] > 0) {
                                            $('#' + rowID + '_AFFILIATE_FROM').removeClass().addClass('white');
                                            $('#' + rowID + '_AFFILIATE_TO').val($('#' + rowID + '_AFFILIATE_FROM').val());
                                        }

                                        if (py_cy_status == 'PY' && fiscal_year > 2007 && (($('#' + rowID + '_AFFILIATE_FROM').val() != Global_AFFILIATE_FROM && Global_AFFILIATE_FROM != '') || (Global_AFFILIATE_FROM == '' && $('#' + rowID + '_AFFILIATE_FROM').val() != $('#' + rowID + '_HOME_BUGL_FROM').val()))) {
                                            if ($('#' + rowID + '_HOME_DEPT_FROM').val() != '') {
                                                $('#' + rowID + '_HOME_DEPT_FROM').removeClass().addClass('red');
                                            }
                                            if ($('#' + rowID + '_HOME_LOC_FROM').val() != '') {
                                                $('#' + rowID + '_HOME_LOC_FROM').removeClass().addClass('red');
                                            }
                                            if ($('#' + rowID + '_WORK_DEPT_FROM').val() != '') {
                                                $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass('red');
                                            }
                                            if ($('#' + rowID + '_WORK_LOC_FROM').val() != '') {
                                                $('#' + rowID + '_WORK_LOC_FROM').removeClass().addClass('red');
                                            }
                                            if ($('#' + rowID + '_CLASS_CD_FROM').val() != '') {
                                                $('#' + rowID + '_CLASS_CD_FROM').removeClass().addClass('red');
                                            }
                                            if ($('#' + rowID + '_WPD_FROM').val() != '') {
                                                $('#' + rowID + '_WPD_FROM').removeClass().addClass('red');
                                            }
                                            if ($('#' + rowID + '_BULK_FROM').val() != '') {
                                                $('#' + rowID + '_BULK_FROM').removeClass().addClass('red');
                                            }
                                            if ($('#' + rowID + '_ESTMTG_PRICG_CD_FROM').val() != '') {
                                                $('#' + rowID + '_ESTMTG_PRICG_CD_FROM').removeClass().addClass('red');
                                            }
                                            if ($('#' + rowID + '_HOME_DEPT_TO').val() != '') {
                                                $('#' + rowID + '_HOME_DEPT_TO').removeClass().addClass('red');
                                            }
                                            if ($('#' + rowID + '_HOME_LOC_TO').val() != '') {
                                                $('#' + rowID + '_HOME_LOC_TO').removeClass().addClass('red');
                                            }
                                            if ($('#' + rowID + '_WORK_DEPT_TO').val() != '') {
                                                $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass('red');
                                            }
                                            if ($('#' + rowID + '_WORK_LOC_TO').val() != '') {
                                                $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass('red');
                                            }
                                            if ($('#' + rowID + '_CLASS_CD_TO').val() != '') {
                                                $('#' + rowID + '_CLASS_CD_TO').removeClass().addClass('red');
                                            }
                                            if ($('#' + rowID + '_WPD_TO').val() != '') {
                                                $('#' + rowID + '_WPD_TO').removeClass().addClass('red');
                                            }
                                            if ($('#' + rowID + '_BULK_TO').val() != '') {
                                                $('#' + rowID + '_BULK_TO').removeClass().addClass('red');
                                            }
                                            if ($('#' + rowID + '_ESTMTG_PRICG_CD_TO').val() != '') {
                                                $('#' + rowID + '_ESTMTG_PRICG_CD_TO').removeClass().addClass('red');
                                            }
                                            if ($('#' + rowID + '_QUANTITY_FROM').val() != 0) {
                                                $('#' + rowID + '_QUANTITY_FROM').removeClass().addClass('red');
                                            }
                                        }
                                    }
                                }

                            });


                        }

                    }
                }
                else {
                    $('#' + rowID + '_AFFILIATE_FROM').val(Global_AFFILIATE_FROM);
                    mctrObj.showDialog($('#dialog-box'), 'you either do not have the proper role  or  proper status setting to change this field.', 'error');
                }
            }


        });
        $('input[id*=WPD_FROM]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var mctrno = $('#MctrNo').val();
            var SessionBems = $('#SessionBems').val();
            var StatusID = $('#StatusId').val();
            var BemsOrig = $('#BemsOrig').val();
            var wpd_from = $('#' + rowID + '_WPD_FROM').val();
            var global_wpd_from = $('#' + rowID + '_WPD_FROM').attr('value');
            //var AFFILIATE_TO = $('#' + rowID + 'AFFILIATE_TO').val();
            var proj_trans_type_from = $('#' + rowID + '_PROJ_TRANS_TYPE_FROM ').val();
            var proj_trans_code_from = $('#' + rowID + '_PROJ_TRANS_CODE_FROM ').val();
            var fiscal_year = $('#fyear').val().trim();
            var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
            var account_from = $('#' + rowID + '_ACCOUNT_FROM').val();
            var project_id_from = $('#' + rowID + '_PROJECT_ID_FROM').val();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var period_to = $('#PeriodTo').val();
            var BemsAcct = $('#BemsOrig').val();
            var bems_cost_acct = $('#BemsCostAcct').val();
            var v_value_chosen = false;
            var v_setid = "";
            var v_count = '';
            var global_set_id = $('#' + rowID + '_HOME_BUGL_FROM').attr('value');

            if ((wpd_from != global_wpd_from) || (wpd_from != '' && global_wpd_from == '') || (wpd_from == '' && global_wpd_from != '') || ($('#' + rowID + '_WPD_FROM').attr('class') == 'red')) {
                if (((((StatusID == "OA" || StatusID == "OR") && BemsOrig == $('#SessionBems').val()) || ((StatusID == "AA" || StatusID == "OR") && BemsAcct == $('#SessionBems').val()) || (StatusID == 'CA' && bems_cost_acct == $('#SessionBems').val())) && (proj_trans_code_from != 'FRG' || proj_trans_code_from == ''))) {
                    if (activity_id_from == '' || period_to == '' || activity_id_from == 'REQUIRED') {
                        $('#' + rowID + '_WPD_FROM').val(global_wpd_from);
                        mctrObj.showDialog($('#dialog-box'), 'Please Enter The Activity Id (From) First.', 'error');
                    } else if (project_id_from == '' || project_id_from == 'REQUIRED') {
                        $('#' + rowID + '_WPD_FROM').val(global_wpd_from);
                        mctrObj.showDialog($('#dialog-box'), 'Please Enter The Project Id (From) First.', 'error');
                    } else if (account_from == '') {
                        $('#' + rowID + '_WPD_FROM').val(global_wpd_from);
                        mctrObj.showDialog($('#dialog-box'), 'please enter the account (from) first.', 'error');
                    } else if (proj_trans_type_from == '' || proj_trans_type_from == 'REQ') {
                        $('#' + rowID + '_WPD_FROM').val(global_wpd_from);
                        mctrObj.showDialog($('#dialog-box'), 'project trans type (from) value must be entered first.', 'error');
                    }
                    else {

                        var param = [];
                        var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                        var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                        var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                        var mctrItem = $.extend(grid1, grid2, grid3);
                        mctrItem.FYEAR = $('#fyear').val().trim();
                        param.push(mctrItem);

                        var mctrCreateFormq = $('#form').serialize();
                        var lineitem = JSON.stringify(mctrCreateFormq);
                        var mctrCreateForm = $.extend({
                            mctrLineItem: param
                        }, lineitem);
                        if ($('#' + rowID + '_WPD_FROM').val() != '') {
                            $.ajax({
                                url: getBaseUrl('/MctrCreateForm/mctrLineItemwpdFromPostTextItemOpenLOV'),
                                type: 'POST',
                                data: mctrCreateForm,
                                success: function (data) {
                                    v_count = data.V_Count['WPD'];
                                    v_countEAS = data.V_Count['WPDEAS'];
                                    v_countEAS1 = data.V_Count['WPDEAS1'];

                                    if (v_count == 0) {
                                        if (($('#' + rowID + '_HOME_BUGL_FROM').val() == "")) {
                                            $('#' + rowID + '_HOME_BUGL_FROM').val($('#OrigBu').val());
                                        }

                                        if ($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == 'LBR') {
                                            v_count = v_countEAS;
                                        }
                                        else {
                                            v_count = v_countEAS1;
                                        }
                                        if (v_count == 0) {
                                            var message = "unable to validate the wpd id from value [ ||" + $('#' + rowID + '_WPD_FROM').val() + "|| ] entered";
                                            mctrObj.showDialog($('#dialog-box'), message, 'error');
                                            $('#' + rowID + '_WPD_FROM').val(global_wpd_from);
                                        }
                                        else {
                                            mctrObj.showDialog($('#dialog-box'), 'accepted - rp master accounting found using wpd from value entered.', 'success');
                                            $('#' + rowID + '_WPD_FROM').removeClass().addClass('white');
                                        }
                                    }
                                    else if ($('#' + rowID + '_WPD_FROM').val() != global_wpd_from || $('#' + rowID + '_WPD_FROM').val() != '' && global_wpd_from == '') {

                                        var errorFn = function (jqXHR, textStatus, errorThrown) {
                                        };

                                        var succesFn = function (data) {
                                            if ($('.bootbox').length == 0) {
                                                if (data) {
                                                    bootbox.dialog({
                                                        title: "WPD From",
                                                        onEscape: true,
                                                        message: data
                                                    })
                                                }
                                            }
                                        };
                                        mctrObj.ajaxOptions('/MctrCreateForm/getRgWpdFromLOV', 'GET', {
                                            rowId: rowID
                                        }, succesFn, errorFn);
                                    }

                                    else {
                                        $('#' + rowID + '_WPD_FROM').removeClass().addClass('white');
                                    }
                                }

                            });

                        }

                        else {

                            $('#' + rowID + '_WPD_FROM').removeClass().addClass('white');
                        }

                        if ($('#' + rowID + '_WPD_FROM').val() != global_wpd_from || $('#' + rowID + '_WPD_FROM').val() == '' && global_wpd_from != '' || $('#' + rowID + '_WPD_FROM').val() != '' && global_wpd_from == '') {

                            if (proj_trans_type_from == "LBR") {
                                $('#' + rowID + '_ttdValue').addClass("white");
                                $('#' + rowID + '_yearValue').addClass("white");
                            }
                            $('#' + rowID + '_WPD_FROM').removeClass().addClass("white");
                        }
                    }
                }
                else {
                    $('#' + rowID + '_WPD_FROM').val(global_wpd_from);
                    mctrObj.showDialog($('#dialog-box'), 'you either do not have the proper role  or  proper status setting to change this field.', 'error');
                }
            }

        });

        $('input[id*=WORK_LOC_FROM]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var status_id = $('#StatusId').val();
            var bems_orig = $('#BemsOrig').val();
            var bems_acct = $('#BemsAcct').val();
            var SessionBems = $('#SessionBems').val();
            var v_setid = "";
            var fiscal_year = $('#fyear').val().trim();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var period_to = $('#PeriodTo').val();
            var AccountantStatusID = ['AA', 'OR'];
            var OrignatorStatusID = ['OA', 'OR'];
            var BemsAcct = $('#BemsOrig').val();
            var bems_cost_acct = $('#BemsCostAcct').val();
            var work_loc_from = $('#' + rowID + '_WORK_LOC_FROM').val();
            var global_work_loc_from = $('#' + rowID + '_WORK_LOC_FROM').attr('value');
            var global_home_loc_from = $('#' + rowID + '_HOME_LOC_FROM').attr('value');
            var global_class_cd_from = $('#' + rowID + '_CLASS_CD_FROM').attr('value');
            var global_rsc_from = $('#' + rowID + '_RSC_FROM').attr('value');
            var global_period_to = $('#PeriodTo').attr('value');
            var global_period_from = $('#PeriodFrom').attr('value');
            var param = [];
            var v_value_chosen = true;
            var period_from = $('#PeriodFrom').val();
            if (($('#' + rowID + '_WORK_LOC_FROM').val() != $('#' + rowID + '_WORK_LOC_FROM').attr('value')) || ($('#' + rowID + '_WORK_LOC_FROM').val() != "" && $('#' + rowID + '_WORK_LOC_FROM').attr('value') == "") || ($('#' + rowID + '_WORK_LOC_FROM').val() == "" && $('#' + rowID + '_WORK_LOC_FROM').attr('value') != "") || $('#' + rowID + '_WORK_LOC_FROM').attr('class') == "red") {
                if (((jQuery.inArray(status_id, OrignatorStatusID) == 0 && bems_orig == SessionBems) || (jQuery.inArray(status_id, AccountantStatusID) == 0 && bems_acct == SessionBems) || (status_id == "CA" && bems_cost_acct == SessionBems)) && ($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() != "FRG" || $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == "")) {
                    if (($('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || period_to == "" || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == ("REQUIRED"))) {
                        $('#' + rowID + '_WORK_LOC_FROM').val(global_work_loc_from);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the activity id (from) first.", "error");
                    }
                    else if (($('#' + rowID + '_PROJECT_ID_FROM').val() == "" || $('#' + rowID + '_PROJECT_ID_FROM').val() == ("REQUIRED"))) {
                        $('#' + rowID + '_WORK_LOC_FROM').val(global_work_loc_from);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the project id (from) first.", "error");
                    }
                    else if (($('#' + rowID + '_ACCOUNT_FROM').val() == "")) {
                        $('#' + rowID + '_WORK_LOC_FROM').val(global_work_loc_from);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the account(from) first.", "error");
                    }
                    else if (($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "" || $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == ("REQ"))) {
                        $('#' + rowID + '_WORK_LOC_FROM').val(global_work_loc_from);
                        mctrObj.showDialog($('#dialog-box'), "project trans type (from) value must be entered first.", "error");
                    }
                    else {
                        if ((py_cy_status == ("CY"))) {
                            if (period_from == global_period_from && (period_from != global_period_from)) {
                                $('#PeriodTo').val(global_period_to);
                            }
                        }
                        if (($('#' + rowID + '_HOME_BUGL_FROM').val() == "")) {
                            $('#' + rowID + '_HOME_BUGL_FROM').val($('#OrigBu').val());
                        }
                        if ((py_cy_status == ("PY") && fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_FROM').val() != '')) {
                            v_setid = $('#' + rowID + '_AFFILIATE_FROM').val();
                        }

                        else {
                            v_setid = $('#' + rowID + '_HOME_BUGL_FROM').val();
                        }

                        var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                        var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                        var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));

                        var mctrLineItem = $.extend(grid1, grid2, grid3);

                        param.push(mctrLineItem);
                        mctrLineItem.SETID = v_setid;
                        mctrLineItem.PERIOD_TO = new Date($('#PeriodTo').val());
                        mctrLineItem.COW = new Date($('#COW').val());
                        var mctrCreateFormq = $('#form').serialize();
                        var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                        var mctrCreateForm = $.extend({
                            mctrLineItem: param
                        }, mctrCreateFromJson);
                        mctrCreateForm.LineNo = $('#' + rowID + '_LINE_NO').val();
                        mctrCreateForm.COW = $('#COW').val();
                        mctrCreateForm.PeriodTo = $('#PeriodTo').val();
                        $.ajax({
                            url: getBaseUrl('/MctrCreateForm/mctrLineItemworkLocFromPostTextItemOpenLOV'),
                            type: 'POST',
                            data: mctrCreateForm,
                            success: function (data) {
                                if (data != '') {
                                    v_countWorkLoc = data.V_Count['WorkLoc'];
                                    v_count = data.V_Count['WorkLocFrom'];
                                    v_countLOV = data.V_Count['WorkLocFromLOV'];
                                    if (($('#' + rowID + '_WORK_DEPT_FROM').val() != "")) {

                                        if ($('#' + rowID + '_WORK_DEPT_FROM').val() != "") {
                                            var succesFn = function (data) {
                                                if ($('.bootbox').length == 0) {
                                                    if (data) {
                                                        var box = bootbox.dialog({
                                                            title: "Work Department (From) List",
                                                            onEscape: true,
                                                            message: data
                                                        });
                                                        box.modal('show');
                                                    }
                                                }
                                            };
                                            var errorFn = function (jqXHR, textStatus, errorThrown) {
                                                v_value_chosen = true;
                                                //$('#' + rowID + '_WORK_DEPT_FROM').val(global_work_dept_from);
                                            };
                                            if (v_countWorkLoc > 0) {
                                                v_value_chosen = false;
                                                mctrObj.ajaxOptions('/MctrCreateForm/WorkDeptLocFromLOV', 'GET', {
                                                    rowId: rowID
                                                }, succesFn, errorFn);

                                            }
                                        }

                                        if ($('#' + rowID + '_WORK_LOC_FROM').val() == '' || v_countWorkLoc == 0) {

                                            var errorFn = function (jqXHR, textStatus, errorThrown) {
                                                v_value_chosen = true;
                                            };
                                            var succesFn = function (data) {
                                                if ($('.bootbox').length == 0) {
                                                    if (data) {
                                                        var box = bootbox.dialog({
                                                            title: "Work Accounting Location (From) List",
                                                            onEscape: true,
                                                            message: data
                                                        });
                                                        box.modal('show');
                                                    }
                                                }
                                            };
                                            if (v_count == 0) {
                                                v_value_chosen = false;
                                                mctrObj.showDialog($('#dialog-box'), "warning - value entered was not found. list of valid values provided.", "warning");
                                                mctrObj.ajaxOptions('/MctrCreateForm/WorkDeptLocFromLOV', 'GET', {
                                                    rowId: rowID
                                                }, succesFn, errorFn);
                                            }
                                            else {
                                                var succesFn = function (data) {
                                                    if ($('.bootbox').length == 0) {
                                                        if (data) {
                                                            var box = bootbox.dialog({
                                                                title: "Work Department (From) List",
                                                                onEscape: true,
                                                                message: data
                                                            });
                                                            box.modal('show');
                                                        }
                                                    }
                                                };
                                                var errorFn = function (jqXHR, textStatus, errorThrown) {
                                                    //$('#' + rowID + '_WORK_DEPT_FROM').val(global_work_dept_from);
                                                };
                                                if (v_count > 0) {
                                                    v_value_chosen = false;
                                                    mctrObj.ajaxOptions('/MctrCreateForm/WorkDeptLocFromLOV', 'GET', {
                                                        rowId: rowID
                                                    }, succesFn, errorFn);
                                                }
                                            }
                                        }
                                    }

                                    else if ($('#' + rowID + '_WORK_LOC_FROM').val() != '') {

                                        var succesFn = function (data) {
                                            if ($('.bootbox').length == 0) {
                                                if (data) {
                                                    var box = bootbox.dialog({
                                                        title: "Work Locations (From) Listing",
                                                        onEscape: true,
                                                        message: data

                                                    });

                                                    box.modal('show');
                                                }
                                            }
                                        };
                                        var errorFn = function (jqXHR, textStatus, errorThrown) {
                                            v_value_chosen = true;
                                            //$('#' + rowID + '_WORK_DEPT_FROM').val(global_work_dept_from);
                                        };

                                        if (v_countLOV == 0) {
                                            v_value_chosen = false;
                                            mctrObj.showDialog($('#dialog-box'), "value entered was not found. list of valid values provided.", "warning");
                                            mctrObj.ajaxOptions('/MctrCreateForm/getRgListWorkLocFromLOV', 'GET', {
                                                rowId: rowID
                                            }, succesFn, errorFn);
                                        }
                                        else {
                                            var vchoosen = false;
                                            if ($('#' + rowID + '_WORK_LOC_FROM').attr('class') == "red") {
                                                vchoosen = true;
                                            }
                                            else {
                                                v_value_chosen = false;
                                                mctrObj.ajaxOptions('/MctrCreateForm/getRgListWorkLocFromLOV', 'GET', {
                                                    rowId: rowID
                                                }, succesFn, errorFn);
                                            }
                                        }
                                    }

                                    if ((v_value_chosen) && (vchoosen || work_loc_from == '' && global_work_loc_from != '')) {
                                        $('#' + rowID + '_ttdValue').addClass("white");
                                        $('#' + rowID + '_yearValue').addClass("white");
                                        $('#' + rowID + '_WORK_LOC_FROM').removeClass().addClass("white");
                                        if ($('#' + rowID + '_WORK_DEPT_FROM').val() != '' && $('#' + rowID + '_WORK_LOC_FROM').val() != '') {
                                            //if (rowObject.EFF_STATUS == 'I' && work_dept_from != '') {
                                            //    $('#' + rowId + '_WORK_DEPT_FROM').attr('red-flag', ' Y');
                                            //    $('#' + rowId + '_WORK_DEPT_FROM').removeClass().addClass("orange");
                                            //}
                                            //else {
                                            //    $('#' + rowId + '_WORK_DEPT_FROM').attr('red-flag', ' N');
                                            //    $('#' + rowId + '_WORK_DEPT_FROM').removeClass().addClass("white");
                                            //}
                                            //}
                                            if (proj_trans_type_from != 'LBR') {
                                                // rsc_from == global_rsc_from;
                                                $('#' + rowID + '_RSC_FROM').val(global_rsc_from);
                                            }
                                            else {
                                                if (global_rsc_from != '') {
                                                    if (global_rsc_from != $('#' + rowID + '_RSC_FROM').val() || $('#' + rowID + '_RSC_FROM').val() == '') {
                                                        bootbox.confirm("Do you want to accept LBR Work Dept RSC overriding LBR Home Dept RSC? Click YES button to accept.", function (result) {
                                                            if (result) {
                                                                $('#' + rowID + '_RSC_FROM').val(global_rsc_from);
                                                            }
                                                            else {
                                                                $('#' + rowID + '_RSC_FROM').removeClass().addClass("white");
                                                            }
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            $('#' + rowID + '_WORK_LOC_FROM').attr('value', $('#' + rowID + '_WORK_LOC_FROM').val());
                                            $('#' + rowID + '_WORK_DEPT_FROM').attr('red-flag', ' N');
                                            $('#' + rowID + '_WORK_DEPT_FROM').removeClass().addClass("white");
                                            $('#' + rowID + '_WORK_POOL_FROM').val('');
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
                else {
                    $('#' + rowID + '_WORK_LOC_FROM').val(global_work_loc_from);
                    mctrObj.showDialog($('#dialog-box'), "You either do not have the proper role or proper status setting to change this field.", "error");
                }
            }
        });

        $('input[id*=WORK_LOC_TO]').on('change', function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            var status_id = $('#StatusId').val();
            var bems_orig = $('#BemsOrig').val();
            var bems_acct = $('#BemsAcct').val();
            var SessionBems = $('#SessionBems').val();
            var v_setid = "";
            var period_to = $('#PeriodTo').val();
            var AccountantStatusID = ['AA', 'OR'];
            var OrignatorStatusID = ['OA', 'OR'];
            var BemsAcct = $('#BemsOrig').val();
            var bems_cost_acct = $('#BemsCostAcct').val();
            var global_home_loc_to = $('#' + rowID + '_HOME_LOC_TO').attr('value');
            var global_work_loc_to = $('#' + rowID + '_WORK_LOC_TO').attr('value');
            var work_loc_to = $('#' + rowID + '_WORK_LOC_TO').val();
            var global_class_cd_to = $('#' + rowID + '_CLASS_CD_TO').attr('value');
            var global_rsc_to = $('#' + rowID + '_RSC_TO').attr('value');
            var global_period_to = $('#PeriodTo').attr('value');
            var global_period_from = $('#PeriodFrom').attr('value');
            var param = [];
            var v_value_chosen = true;
            var period_from = $('#PeriodFrom').val();
            var period_to = $('#PeriodTo').val();
            if (($('#' + rowID + '_WORK_LOC_TO').val() != $('#' + rowID + '_WORK_LOC_TO').attr('value')) || ($('#' + rowID + '_WORK_LOC_TO').val() != "" && $('#' + rowID + '_WORK_LOC_TO').attr('value') == "") || ($('#' + rowID + '_WORK_LOC_TO').val() == "" && $('#' + rowID + '_WORK_LOC_TO').attr('value') != "") || $('#' + rowID + '_WORK_LOC_TO').attr('class') == "red") {
                if (((jQuery.inArray(status_id, OrignatorStatusID) == 0 && bems_orig == SessionBems) || (jQuery.inArray(status_id, AccountantStatusID) == 0 && bems_acct == SessionBems) || (status_id == "CA" && bems_cost_acct == SessionBems)) && ($('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() != "FRG" || $('#' + rowID + '_PROJ_TRANS_CODE_FROM').val() == "")) {
                    if (($('#' + rowID + '_ACTIVITY_ID_FROM').val() == "" || period_to == "" || $('#' + rowID + '_ACTIVITY_ID_FROM').val() == ("REQUIRED"))) {
                        $('#' + rowID + '_WORK_LOC_TO').val(global_work_loc_to);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the activity id (from) first.", "error");
                    }
                    else if (($('#' + rowID + '_PROJECT_ID_FROM').val() == "" || $('#' + rowID + '_PROJECT_ID_FROM').val() == ("REQUIRED"))) {
                        $('#' + rowID + '_WORK_LOC_TO').val(global_work_loc_to);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the project id (from) first.", "error");
                    }
                    else if (($('#' + rowID + '_ACCOUNT_FROM').val() == "")) {
                        $('#' + rowID + '_WORK_LOC_TO').val(global_work_loc_to);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the account(from) first.", "error");
                    }
                    else if (($('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == "" || $('#' + rowID + '_PROJ_TRANS_TYPE_FROM').val() == ("REQ"))) {
                        $('#' + rowID + '_WORK_LOC_TO').val(global_work_loc_to);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the proj trans type (from) first.", "error");
                    }
                    else if (($('#' + rowID + '_ACTIVITY_ID_TO').val() == "" || $('#' + rowID + '_ACTIVITY_ID_TO').val() == ("REQUIRED"))) {
                        $('#' + rowID + '_WORK_LOC_TO').val(global_work_loc_to);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the activity (to) first.", "error");
                    }
                    else if (($('#' + rowID + '_PROJECT_ID_TO').val() == "" || $('#' + rowID + '_PROJECT_ID_TO').val() == ("REQUIRED"))) {
                        $('#' + rowID + '_WORK_LOC_TO').val(global_work_loc_to);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the project id(to) first.", "error");
                    }
                    else if (($('#' + rowID + '_ACCOUNT_TO').val() == "" && $('#' + rowID + '_PROJ_TRANS_TYPE_TO').val() == ("LBR"))) {
                        $('#' + rowID + '_WORK_LOC_TO').val(global_work_loc_to);
                        mctrObj.showDialog($('#dialog-box'), "Please enter the account(to) first.", "error");
                    }
                    else {
                        if ((py_cy_status == ("CY"))) {
                            if (period_from == global_period_from && (period_to != global_period_to)) {
                                $('#PeriodTo').val(global_period_to);
                            }
                        }
                        if (($('#' + rowID + '_HOME_BUGL_TO').val() == "")) {
                            $('#' + rowID + '_HOME_BUGL_TO').val($('#OrigBu').val());
                        }
                        if ((py_cy_status == ("PY") && fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_TO').val() != '')) {
                            v_setid = $('#' + rowID + '_AFFILIATE_TO').val();
                        }

                        else {
                            v_setid = $('#' + rowID + '_HOME_BUGL_TO').val();
                        }

                        var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(rowID));
                        var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(rowID));
                        var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(rowID));
                        var mctrLineItem = $.extend(grid1, grid2, grid3);
                        mctrLineItem.SETID = v_setid;
                        param.push(mctrLineItem);
                        mctrLineItem.SETID = v_setid;
                        mctrLineItem.PERIOD_TO = new Date($('#PeriodTo').val());
                        mctrLineItem.COW = new Date($('#COW').val());
                        var mctrCreateFormq = $('#form').serialize();
                        var mctrCreateFromJson = JSON.stringify(mctrCreateFormq);
                        var mctrCreateForm = $.extend({
                            mctrLineItem: param
                        }, mctrCreateFromJson);
                        mctrCreateForm.LineNo = $('#' + rowID + '_LINE_NO').val();
                        mctrCreateForm.COW = $('#COW').val();
                        mctrCreateForm.PeriodTo = $('#PeriodTo').val();
                        $.ajax({
                            url: getBaseUrl('/MctrCreateForm/mctrLineItemworkLocToPostTextItemOpenLOV'),
                            type: 'POST',
                            data: mctrCreateForm,
                            success: function (data) {
                                if (data != '') {
                                    v_countWorkLoc = data.V_Count['WorkLoc'];
                                    v_count = data.V_Count['WorkLocTo'];
                                    v_countLOV = data.V_Count['WorkLocToLOV'];
                                    if (($('#' + rowID + '_WORK_DEPT_TO').val() != "")) {

                                        if ($('#' + rowID + '_WORK_DEPT_TO').val() != "") {
                                            var succesFn = function (data) {
                                                if ($('.bootbox').length == 0) {
                                                    if (data) {
                                                        var box = bootbox.dialog({
                                                            title: "Work Department/Location (To) List",
                                                            onEscape: true,
                                                            message: data
                                                        });
                                                        box.modal('show');
                                                    }
                                                }
                                            };
                                            var errorFn = function (jqXHR, textStatus, errorThrown) {
                                                v_value_chosen = true;
                                                //$('#' + rowID + '_WORK_DEPT_FROM').val(global_work_dept_from);
                                            };
                                            if (v_countWorkLoc > 0) {
                                                v_value_chosen = false;
                                                mctrObj.ajaxOptions('/MctrCreateForm/WorkDeptLocToLOV', 'GET', {
                                                    rowId: rowID
                                                }, succesFn, errorFn);
                                            }
                                        }

                                        if ($('#' + rowID + '_WORK_LOC_TO').val() == '' || v_countWorkLoc == 0) {

                                            var errorFn = function (jqXHR, textStatus, errorThrown) {
                                                v_value_chosen = true;
                                            };
                                            var succesFn = function (data) {
                                                if ($('.bootbox').length == 0) {
                                                    if (data) {
                                                        var box = bootbox.dialog({
                                                            title: "Work Department/Location (To) List",
                                                            onEscape: true,
                                                            message: data
                                                        });
                                                        box.modal('show');
                                                    }
                                                }
                                            };
                                            if (v_count == 0) {
                                                v_value_chosen = false;
                                                mctrObj.ajaxOptions('/MctrCreateForm/WorkDeptLocToLOV', 'GET', {
                                                    rowId: rowID
                                                }, succesFn, errorFn);
                                            }
                                            else {
                                                var succesFn = function (data) {
                                                    if ($('.bootbox').length == 0) {
                                                        if (data) {
                                                            var box = bootbox.dialog({
                                                                title: " Work Dept From Lov",
                                                                onEscape: true,
                                                                message: data
                                                            });
                                                            box.modal('show');
                                                        }
                                                    }
                                                };
                                                var errorFn = function (jqXHR, textStatus, errorThrown) {
                                                    v_value_chosen = true;
                                                    //$('#' + rowID + '_WORK_DEPT_FROM').val(global_work_dept_from);
                                                };
                                                if (v_count > 0) {
                                                    v_value_chosen = false;
                                                    mctrObj.ajaxOptions('/MctrCreateForm/WorkDeptLocToLOV', 'GET', {
                                                        rowId: rowID
                                                    }, succesFn, errorFn);
                                                }
                                            }
                                        }

                                    }
                                    else if ($('#' + rowID + '_WORK_LOC_TO').val() != '') {
                                        v_count = v_countLOV;
                                        var succesFn = function (data) {
                                            if ($('.bootbox').length == 0) {
                                                if (data) {
                                                    var box = bootbox.dialog({
                                                        title: "Work Accounting Location (To) List",
                                                        onEscape: true,
                                                        message: data
                                                    });
                                                    box.modal('show');
                                                }
                                            }
                                        };
                                        var errorFn = function (jqXHR, textStatus, errorThrown) {
                                            v_value_chosen = true;
                                            //$('#' + rowID + '_WORK_DEPT_FROM').val(global_work_dept_from);
                                        };
                                        if (v_count == 0) {
                                            v_value_chosen = false;
                                            mctrObj.showDialog($('#dialog-box'), "value entered was not found. list of valid values provided.", "warning");
                                            mctrObj.ajaxOptions('/MctrCreateForm/getRgListWorkLocToLOV', 'GET', {
                                                rowId: rowID
                                            }, succesFn, errorFn);
                                        }
                                        else {
                                            var vchoosen = false;
                                            if ($('#' + rowID + '_WORK_LOC_TO').attr('class') == "red") {
                                                vchoosen = true;
                                            }
                                            else {
                                                v_value_chosen = false;
                                                mctrObj.ajaxOptions('/MctrCreateForm/getRgListWorkLocToLOV', 'GET', {
                                                    rowId: rowID
                                                }, succesFn, errorFn);
                                            }
                                        }

                                    }

                                    if ((v_value_chosen) && (vchoosen || work_loc_to == '' && global_work_loc_to != '')) {
                                        $('#' + rowID + '_WORK_LOC_TO').removeClass().addClass("white");
                                        if ($('#' + rowID + '_WORK_DEPT_TO').val() != '') {
                                            if (proj_trans_type_from != 'LBR') {
                                                $('#' + rowID + '_RSC_TO').val(global_rsc_to);
                                            }
                                            else {
                                                if (global_rsc_to != '') {
                                                    if (global_rsc_to != $('#' + rowID + '_RSC_TO').val() || $('#' + rowID + '_RSC_TO').val() == '') {
                                                        bootbox.confirm("Do you want to accept LBR Work Dept RSC overriding LBR Home Dept RSC? Click YES button to accept.", function (result) {
                                                            if (result) {
                                                                $('#' + rowID + '_RSC_TO').val(global_rsc_to);
                                                            }
                                                            else {
                                                                $('#' + rowID + '_WORK_POOL_TO').val("");
                                                                $('#' + rowID + '_WORK_DEPT_TO').attr('red-flag', ' N');
                                                                $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("white");
                                                            }
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            $('#' + rowID + '_WORK_LOC_TO').attr('value', $('#' + rowID + '_WORK_LOC_TO').val());
                                            $('#' + rowID + '_WORK_DEPT_TO').attr('red-flag', ' N');
                                            $('#' + rowID + '_WORK_DEPT_TO').removeClass().addClass("white");
                                            $('#' + rowID + '_WORK_POOL_TO').val('');
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
                else {
                    $('#' + rowID + '_WORK_LOC_TO').val(global_work_loc_to);
                    mctrObj.showDialog($('#dialog-box'), "You either do not have the proper role or proper status setting to change this field.", "error");
                }
            }
        });


        $('a[id*=_bumOrigpopUpFrombtn]').click(function (e, obj) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var rowID = $(this).attr('row-id');
            // var rowID = $(this).attr('row-id');
            var mctrno = $('#MctrNo').val();
            var SessionBems = $('#SessionBems').val();
            var statusID = $('#StatusId').val();
            var BemsOrig = $('#BemsOrig').val();
            var proj_trans_type_from = $('#' + rowID + '_PROJ_TRANS_TYPE_FROM ').val();
            var proj_trans_code_from = $('#' + rowID + '_PROJ_TRANS_CODE_FROM ').val();
            var proj_trans_type_to = $('#' + rowID + '_PROJ_TRANS_TYPE_TO ').val();
            var proj_trans_code_to = $('#' + rowID + '_PROJ_TRANS_CODE_TO ').val();
            var fiscal_year = $('#fyear').val().trim();
            var activity_id_from = $('#' + rowID + '_ACTIVITY_ID_FROM').val();
            var project_id_from = $('#' + rowID + '_PROJECT_ID_FROM').val();
            var py_cy_status = fiscal_year == (new Date).getFullYear() ? 'CY' : 'PY';
            var period_to = $('PeriodTo').val();

            if ((mctrno != '' && statusID == 'OA' && BemsOrig == SessionBems) && (proj_trans_type_from != 'FRG' || proj_trans_code_from == '')) {
                if (activity_id_from == '' || period_to == '' || activity_id_from == 'REQUIRED') {
                    mctrObj.showDialog($("#dialog-box"), 'please enter the activity id (from) first.', 'error');
                    //go_item('mctr_line_item.activity_id_from');
                }
                else if (project_id_from == '' || project_id_from == 'REQUIRED') {
                    mctrObj.showDialog($("#dialog-box"), 'please enter the project id (from) first.', 'error');
                    //go_item('but_proj_from');
                }
                else {
                    var v_hold_ptt_from = proj_trans_type_from;
                    var v_hold_ptc_from = proj_trans_code_from;
                    if ($('#' + rowID + '_HOME_BUGL_FROM').val() == '') {
                        $('#' + rowID + '_HOME_BUGL_FROM').val($('#OrigBu').val());
                    }
                    if (py_cy_status == 'PY' && fiscal_year > 2007 && $('#' + rowID + '_AFFILIATE_FROM').val() == '') {
                        $('#' + rowID + '_AFFILIATE_FROM').val($('#' + rowID + '_HOME_BUGL_FROM').val());
                        $('#' + rowID + '_AFFILIATE_FROM').attr('value', $('#' + rowID + '_HOME_BUGL_FROM').val());
                        $('#' + rowID + '_AFFILIATE_TO').val($('#' + rowID + '_AFFILIATE_FROM').val());
                        $('#' + rowID + '_AFFILIATE_TO').attr('value', $('#' + rowID + '_AFFILIATE_FROM').val());
                    }
                    var errorFn = function (jqXHR, textStatus, errorThrown) {

                    };
                    var succesFn = function (data) {
                        if ($('.bootbox').length == 0) {
                            if (data) {
                                var box = bootbox.dialog({
                                    title: "Project Trans Type/ Code Combinations",
                                    onEscape: true,
                                    message: data
                                });
                                box.modal('show');
                            }
                        }
                    };
                    mctrObj.ajaxOptions('/MctrCreateForm/getRgTransFromLOV', 'GET', {
                        rowId: rowID
                    }, succesFn, errorFn);
                    //go_block ('mctr_line_item');
                    if (py_cy_status == 'PY' && fiscal_year > 2007) {
                        $('#' + rowID + '_AFFILIATE_FROM').focus();
                    }
                    else {
                        $('#' + rowID + '_HOME_DEPT_FROM').focus();
                    }
                }
            }
            else {
                if (mctrno != '') {
                    mctrObj.showDialog($("#dialog-box"), 'You either do not have the proper role or proper status setting to change this field.', 'error');
                }
            }
        });

    }

    var columnNames2 = ['', 'BUGL', 'Project ID', 'Contract Number', 'Account', 'BUM CD ', 'CT CD', 'BUM Orig', 'Trn TYP', 'Trn CD', 'Stat Cd', 'UOM Cd', 'AFF Cd', 'Home Dept', 'Hm LOC', 'BU Fr', 'Hm OH', 'Lbr Cd', 'Cls Cd', 'Work Dept', 'Wrk LOC', 'Wrk OH', 'RSC Cd', '', 'WPD (BTU)', '', 'Bulk Alctn', 'Base Year', 'Causl Cd', 'CEC Cd', 'PO Num', 'PO Line', 'Part Num', 'Epacs CTT', 'Shop Order', 'Matl Qty'];
    var colModel2 = [
    {
        name: 'popUpBtn', index: 'popUpBtn', resizable: false, search: false, align: 'center', sortable: false, formatter: firstColumnFormatter
    },
            {
                key: false, name: 'BUSINESS_UNIT_GL', index: 'BUSINESS_UNIT_GL', editable: false, sortable: false, formatter: projectinputFormatter("WORK_BUGL", "readonly", "readonly", 5)
            },
                {
                    key: false, name: 'PROJECT_ID', index: 'PROJECT_ID', editable: false, sortable: false, search: true, formatter: projectinputFormatter("PROJECT_ID", "readonly", "readonly", 15)
                },
                    {
                        key: false, name: 'CONTRACT_NUM', index: 'CONTRACT_NUM', editable: false, sortable: false, search: false, formatter: projectinputFormatter("CONTRACT_NUM", "readonly", "readonly")
                    },
                    {
                        key: false, name: 'ACCOUNT', index: 'ACCOUNT', sortable: false, editable: false, formatter: projectinputFormatter("ACCOUNT", '', '', 10)
                    },
                        {
                            key: false, name: 'BUS_UNIT_MGMT_CD7', index: 'BUS_UNIT_MGMT_CD7', sortable: false, editable: false, search: true, formatter: projectinputFormatter("BUM_CD7", "readonly", '')
                        },
    {
        key: false, name: 'CUSTOMER_TYPE_CD7', index: 'CUSTOMER_TYPE_CD7', sortable: false, editable: false, search: false, formatter: projectinputFormatter("CUST_TYPE_CD7", "readonly", "readonly")
    },
    {
        key: false, name: 'VOUCHER_ID', index: 'Offset_Project', search: false, width: 120, align: 'right', sortable: false, formatter: bumOrigFormatter
    },
                                    {
                                        key: false, name: 'PROJ_TRANS_TYPE', index: 'PROJ_TRANS_TYPE', sortable: false, editable: false, formatter: projectinputFormatter("PROJ_TRANS_TYPE", "readonly", "readonly", 5)
                                    },
                                            {
                                                key: false, name: 'PROJ_TRANS_CODE', index: 'PROJ_TRANS_CODE', sortable: false, editable: false, search: true, formatter: projectinputFormatter("PROJ_TRANS_CODE", "readonly", "readonly")
                                            },
                                            {
                                                key: false, name: 'STATISTICS_CODE', index: 'STATISTICS_CODE', sortable: false, editable: false, search: false, formatter: projectinputFormatter("STAT_CODE", "readonly", "readonly")
                                            },
                                                    {
                                                        key: false, name: 'UNIT_OF_MEASURE', index: 'UNIT_OF_MEASURE', sortable: false, editable: false, formatter: projectinputFormatter("UOM", "readonly", "readonly")
                                                    },
                                                            {
                                                                key: false, name: 'AFFILIATE', index: 'AFFILIATE', editable: false, sortable: false, search: true, formatter: projectinputFormatter("AFFILIATE", '', "readonly")
                                                            },
    {
        key: false, name: 'HOME_DEPT', index: 'DEPTID', editable: false, sortable: false, search: false, formatter: projectinputFormatter("HOME_DEPT", '', '', 10)
    },
    {
        key: false, name: 'ACCTG_LOC_CD7', index: 'ACCTG_LOC_CD7', sortable: false, editable: false, search: true, formatter: projectinputFormatter("HOME_LOC", '', '', 2)
    },
                                                                                {
                                                                                    key: false, name: 'HOME_BUGL', index: 'HOME_BUGL', sortable: false, editable: false, search: true, formatter: projectinputFormatter("HOME_BUGL", "readonly", '')
                                                                                },
    {
        key: false, name: 'ALLOW_POOL_CD7', index: 'ALLOW_POOL_CD7', sortable: false, editable: false, formatter: projectinputFormatter("HOME_POOL", "readonly", "readonly")
    },
                                                                                                    {
                                                                                                        key: false, name: 'LABOR_RATE_CD7', index: 'LABOR_RATE_CD7', sortable: false, editable: false, search: true, formatter: projectinputFormatter("LABOR_RATE_CD7", "readonly", "readonly")
                                                                                                    },
                                                                                                            {
                                                                                                                key: false, name: 'CLASS_CD', index: 'CLASS_CD', sortable: false, editable: false, search: false, formatter: projectinputFormatter("CLASS_CD", '', '', 2)
                                                                                                            },
                                                                                                                {
                                                                                                                    key: false, name: 'WORK_DEPT', index: 'WORK_DEPT', sortable: false, editable: false, formatter: projectinputFormatter("WORK_DEPT", '', '', 4)
                                                                                                                },
                                                                                                                    {
                                                                                                                        key: false, name: 'WORK_LOC', index: 'WORK_LOC', sortable: false, editable: false, search: true, formatter: projectinputFormatter("WORK_LOC", '', '', 2)
                                                                                                                    },
    {
        key: false, name: 'WORK_POOL', index: 'WORK_POOL', sortable: false, editable: false, search: false, formatter: projectinputFormatter("WORK_POOL", "readonly", "readonly")
    },
                                                                                                                                        {
                                                                                                                                            key: false, name: 'RSC', index: 'RSC', sortable: false, editable: false, search: true, formatter: projectinputFormatter("RSC", '', '', 3)
                                                                                                                                        },
    {
        name: 'wpdpopUpBtn', index: 'popUpBtn', resizable: false, sortable: false, search: false, width: 70, align: 'center', sortable: false, formatter: wpdBtnFormatter
    },
                                                                                                                                                {
                                                                                                                                                    key: false, name: 'WPD', index: 'WPD', editable: false, search: false, sortable: false, formatter: projectinputFormatter("WPD", '', "readonly", 15)
                                                                                                                                                },
    {
        name: 'BulkpopUpBtn', index: 'BulkpopUpBtn', resizable: false, search: false, align: 'center', width: 70, sortable: false, formatter: BulkBtnFormatter
    },
                        {
                            key: false, name: 'BULK', index: 'BULK', editable: false, search: false, sortable: false, formatter: projectinputFormatter("BULK", '', "readonly", 3)
                        },
                        {
                            key: false, name: 'OH_BASE_YR', index: 'OH_BASE_YR', editable: false, search: false, sortable: false, formatter: projectinputFormatter("OH_BASE_YR", "readonly", "readonly")
                        },
                    {
                        key: false, name: 'CAUSAL_ID', index: 'CAUSAL_ID', editable: false, search: false, sortable: false, formatter: projectinputFormatter("CAUSAL_ID", '', '', 4)
                    },
    {
        key: false, name: 'ESTMTG_PRICG_CD', index: 'ESTMTG_PRICG_CD', editable: false, search: false, sortable: false, formatter: projectinputFormatter("ESTMTG_PRICG_CD", '', '', 4)
    },
    {
        key: false, name: 'PO_ID', index: 'PO_ID', editable: false, search: false, sortable: false, formatter: projectinputFormatter("PO_ID", '', '', 16)
    },
                                            {
                                                key: false, name: 'PO_LINE', index: 'PO_LINE', editable: false, search: false, sortable: false, formatter: projectinputFormatter("PO_LINE", '', '', 10)
                                            },
    {
        key: false, name: 'PART_NO', index: 'PART_NO', editable: false, search: false, sortable: false, formatter: projectinputFormatter("PART_NO", '', '', 23)
    },
                                                        {
                                                            key: false, name: 'EPACS_CTT', index: 'EPACS_CTT', editable: false, search: false, sortable: false, formatter: projectinputFormatter("EPACS_CTT", '', '', 10)
                                                        },
                                                                    {
                                                                        key: false, name: 'SHOP_ORDER', index: 'SHOP_ORDER', editable: false, search: false, sortable: false, formatter: projectinputFormatter("SHOP_ORDER", '', '', 10)
                                                                    },
    {
        key: false, name: 'MATERIAL_QUANTITY', index: 'MATERIAL_QUANTITY', editable: false, search: false, sortable: false, formatter: projectinputFormatter("MATERIAL_QUANTITY", '', "readonly", 10)
    }];
    mctrObj.CreateJqGrid('tblJQGridCover', '/MctrCreateForm/mctrLineItemOnLoad', 'POST', {
        mctrNo: $('#MctrNo').val()
    }, columnNames2, colModel2, false, 'SETID', [], 1000, '100%', 'desc', onSelRowFn, gridCompleteFn, null, afterInsertRow);//

    //First Grid Components
    var btnFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue ? cellvalue : "";
        return '<a  title="Copy" row-id="' + options.rowId + '" href="#" id=' + options.rowId + '_selectbtn class="btn btn-default btn-xs">CPY</a></br><a title="Delete" href="#" class="glyphicon glyphicon-trash" row-id="' + options.rowId + '"  id=' + options.rowId + '_lineItemDeleteBtn></a>';
    }

    var firstGridFormatter = function (cellvalue, options, rowObject) {
        var insertedRow = false;
        var tValue = rowObject.MTL_JRNL == "Y" ? "checked:\"checked\"": "";
        if (!rowObject.MCTR_NO) {
            insertedRow = true;
            cellvalue = options.rowId;
        }
        if (rowObject.MTL_JRNL == "Y") {
            return '<input class="black" row-id="' + options.rowId + '" row-insert="' + insertedRow + '" row-id="' + options.rowId + '" id="' + options.rowId + '_LINE_NO" value="' + cellvalue + '" readonly></br><input type="checkbox" row-id="' + options.rowId + '" id ="' + options.rowId + '_MTL_JRNL" value="' + rowObject.MTL_JRNL + '" offval="no" checked="checked">';//checked="checked"
        }
        else
        {
            return '<input row-id="' + options.rowId + '" row-insert="' + insertedRow + '" row-id="' + options.rowId + '" id="' + options.rowId + '_LINE_NO" value="' + cellvalue + '" readonly></br><input type="checkbox" row-id="' + options.rowId + '" id ="' + options.rowId + '_MTL_JRNL" value="' + rowObject.MTL_JRNL + '" offval="no">';//checked="checked"

        }
        }


    var activityFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue != null ? cellvalue : "";
        rowObject.ACTIVITY_ID_TO = rowObject.ACTIVITY_ID_TO != null ? rowObject.ACTIVITY_ID_TO : '';
        var redflag;
        var redflagto;
        var classcol;
        var classcolto;
        switch (rowObject.ACTY_RED_FLG_FROM) {
            case ('Y'): redflag = 'Y'; classcol = 'orange'; break;
            case ('N'): redflag = 'N'; classcol = 'white'; break;
            default: redflag = 'N';
        }
        switch (rowObject.ACTY_RED_FLG_TO) {
            case ('Y'): redflagto = 'Y'; classcolto = 'orange'; break;
            case ('N'): redflagto = 'N'; classcolto = 'white'; break;
            default: redflagto = 'N';

        }

        return '<label id="' + options.rowId + '_activityFromLbl">Fr </label><input row-id="' + options.rowId + '" red-flag="' + redflag + '" class="' + classcol + '" id="' + options.rowId + '_ACTIVITY_ID_FROM" maxlength="15" value="' + cellvalue + '" row-edit="false"></br><label id="' + options.rowId + '_activityToLbl" >To</label><input row-id="' + options.rowId + '" red-flag="' + redflagto + '" class="' + classcolto + '" id="' + options.rowId + '_ACTIVITY_ID_TO" maxlength="15" value="' + rowObject.ACTIVITY_ID_TO + '"/>';
        //return '<label id="' + options.rowId + '_activityFromLbl">Fr </label><input id="' + options.rowId + '_ACTIVITY_ID_FROM" value="' + rowObject.ACTIVITY_ID_FROM + '" /></br><label> id="' + options.rowId + '_activityToLbl">To</label><input id="' + options.rowId + '_ACTIVITY_ID_TO" value="' + rowObject.ACTIVITY_ID_FROM + '"/>';
    }

    var columnNames3 = ['', 'Line Alt Jrnl', 'Activity ID'];
    var colModel3 = [{
        name: 'GoTo', index: 'GoTo', sortable: false, resizable: false, width: 200, search: false, align: 'center', title: false, sortable: false, formatter: btnFormatter
    },
        {
            key: false, name: 'LINE_NO', index: 'LINE_NO', sortable: false, editable: false, formatter: firstGridFormatter
        },
            {
                key: false, name: 'ACTIVITY_ID_FROM', index: 'ACTIVITY_ID_FROM', sortable: false, editable: false, width: 300, formatter: activityFormatter
            }
    ];
    mctrObj.CreateJqGrid('tblJQGridFirst', '/MctrCreateForm/mctrLineItemOnLoad', 'POST', {
        mctrNo: $('#MctrNo').val()
    }, columnNames3, colModel3, false, 'SETID', [], 1000, '100%', 'desc', onSelRowFn, gridCompleteFnFirstGrid, null, afterInsertRow);

    $("input[id*='activity']").on("click", function (e, obj) {
        $('#batchLoad').hide();
    })
    function postDelete(id) {

        var param = [];
        var param1 = [];
        var param2 = [];

        var statusid = $('#StatusId').val();

        var mctrCreateFormq = $('#form').serialize();
        var postdelete = JSON.stringify(mctrCreateFormq);
        var mctrCreateForm = $.extend({
            mctrLineItem: param
        }, postdelete);
        mctrCreateForm.MctrNo = $('#MctrNo').val();
        mctrCreateForm.LineNo = $('#LineNo').val();
        mctrCreateForm.OrigBu = $('#OrigBu').val();
        //$.each($('#tblJQGridCover').getGridParam('data'), function (key, value) {
        //    var rowID = value['_id_'];
        var rowID = id;
        mctrCreateForm.LineNo = id;
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
                mctrObj.showDialog($("#dialog-box"), "Line Item has been Deleted Successfully", "success");
                if ($('#totaloffset').val() == "") {
                    $('#totaloffset').removeClass().addClass("yellow");
                }
                else {
                    $('#totaloffset').removeClass().addClass("gray");
                }

                var i = 1;
                $.each($('#tblJQGridCover').getGridParam('data'), function (key, value) {
                    var grid1 = mctrObj.getRowDatawithFormatter('tblJQGridFirst', $('#tblJQGridFirst').getRowData(i));
                    var grid2 = mctrObj.getRowDatawithFormatter('tblJQGridCover', $('#tblJQGridCover').getRowData(i));
                    var grid3 = mctrObj.getRowDatawithFormatter('tblJQGridInner', $('#tblJQGridInner').getRowData(i));

                    var mctrLineItem1 = $.extend(grid1, grid2, grid3);
                    mctrLineItem1.MCTR_NO = $('#MctrNo').val();


                    if (grid1.LINE_NO == undefined || grid1.LINE_NO == "0" || grid1.LINE_NO == "" || grid1.LINE_NO == mctrLineItem.LINE_NO) {
                        i++;
                    }
                    else {

                        mctrLineItem1.TTD_FLAG = $('#' + grid1.LINE_NO + '_ttdValue').text();
                        mctrLineItem1.PER_FLAG = $('#' + grid1.LINE_NO + '_yearValue').text();
                        mctrLineItem1.ACTY_RED_FLG_FROM = $('#' + grid1.LINE_NO + '_ACTIVITY_ID_FROM').attr('red-flag');
                        mctrLineItem1.ACTY_RED_FLG_TO = $('#' + grid1.LINE_NO + '_ACTIVITY_ID_TO').attr('red-flag');
                        mctrLineItem1.DEPT_RED_FLG_FROM = $('#' + grid1.LINE_NO + '_HOME_DEPT_FROM').attr('red-flag');
                        mctrLineItem1.DEPT_RED_FLG_TO = $('#' + grid1.LINE_NO + '_HOME_DEPT_TO').attr('red-flag');
                        mctrLineItem1.WORK_DEPT_RED_FLG_FROM = $('#' + grid1.LINE_NO + '_WORK_DEPT_FROM').attr('red-flag');
                        mctrLineItem1.WORK_DEPT_RED_FLG_TO = $('#' + grid1.LINE_NO + '_WORK_DEPT_FROM').attr('red-flag');
                        mctrLineItem1.LINE_NO = i;
                        param1.push(mctrLineItem1)
                        i++;
                    }
                })
                $('#tblJQGridCover').jqGrid('delRowData', mctrLineItem.LINE_NO);
                var x = $.grep($('#tblJQGridCover').getGridParam('userData'), function (obj) {
                    return obj.LINE_NO == mctrLineItem.LINE_NO;
                });
                $('#tblJQGridInner').jqGrid('delRowData', mctrLineItem.LINE_NO);
                $('#tblJQGridFirst').jqGrid('delRowData', mctrLineItem.LINE_NO);

            }
        });


    }

});
