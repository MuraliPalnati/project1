$(document).ready(function () {
    var mctrObj = new MCTR();
    var fileObject = {};


    $('#downloadFrame').remove(); // This shouldn't fail if frame doesn't exist
    $('.attachment-modal-body').append('<iframe id="downloadFrame" style="display:none"></iframe>');

  

    var descriptionFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue ? cellvalue : "";
        rowObject.ATTACH_DESCR = rowObject.ATTACH_DESCR ? rowObject.ATTACH_DESCR : '';
        rowObject.ATTACH_NO = rowObject.ATTACH_NO ? rowObject.ATTACH_NO : '';
        rowObject.ATTACH_FILENAME = rowObject.ATTACH_FILENAME ? rowObject.ATTACH_FILENAME : '';
        return '<input class = "form-control" id="' + options.rowId + '_ATTACH_DESCR" value="' + rowObject.ATTACH_DESCR + '" ></br><input id="' + options.rowId + '_ATTACH_NO" class = "form-control" value="' + rowObject.ATTACH_NO + '" readonly/><input id="' + options.rowId + '_ATTACH_FILENAME" class = "form-control" value="' + rowObject.ATTACH_FILENAME + '" readonly/>';
    }

    var bemsFormatter = function (cellvalue, options, rowObject) {
        cellvalue = cellvalue ? cellvalue : "";
        rowObject.BEMS = rowObject.BEMS ? rowObject.BEMS : '';
        var dateEntered = rowObject.DATE_ENTERED ? new Date(parseInt(rowObject.DATE_ENTERED.substr(6))) : "";

        rowObject.DATE_ENTERED = rowObject.ATTACH_NO ? dateEntered.getDate() + '-' + dateEntered.toDateString().slice(4, 7).toUpperCase() + '-' + dateEntered.getFullYear() + ' ' + dateEntered.toTimeString().slice(0, 5) : '';
        return '<input class = "form-control" id="' + options.rowId + '_BEMS" value="' + rowObject.BEMS + '" readonly></br><input id="' + options.rowId + '_DATE_ENTERED" class = "form-control" value="' + rowObject.DATE_ENTERED + '" readonly/>';
    }

    var btnFormatter = function (cellvalue, options, rowObject) {
        return '<input type = "file" class = "form-control" rowID="' + options.rowId + '" id="' + options.rowId + '_ATTACH_BLOB" value="' + rowObject.ATTACH_BLOB + '" ></br><a rowID="' + options.rowId + '"  id=' + options.rowId + '_viewFilebtn class="btn btn-primary btn-xs">View File</a>'
    }

    var gridCompleteFn = function () {
        $('#gbox_mctrAttachmentsGrid').find('.ui-jqgrid-labels').find('div').height('30px');
        setJqGridWidth();
        $('input[type=file]').click(function (event) {
            var rowID = $(event.target).attr('rowID');
            if ($('#' + rowID + '_ATTACH_DESCR').val() == '') {
                mctrObj.showDialog($("#popUp-dialog-box"), "Please Enter Attachment Description", "error");
                $(event.target).attr('disable', true);
                event.preventDefault();
                event.stopPropagation();
            }
            else {
                $(event.target).removeAttr('disable');
            }
        });
        $('input[type=file]').change(function (event) {
            var rowID = $(event.target).attr('rowID');
            if ($('#' + rowID + '_ATTACH_DESCR').val() != '') {
                //formData.append('descr',$('#' + $(event.target).attr('rowID') + '_ATTACH_DESCR').val());
                var fileExists = $('#' + rowID + '_ATTACH_NO').val() == $('#' + rowID + '_ATTACH_FILENAME').val().split('_')[1];
                var replaceOrCreate = true;
                var array = ['txt', 'pdf', 'msg', 'rtf', 'xps', 'ifm', 'jpg', 'tif', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
                if (fileExists) {
                    bootbox.dialog({
                        message: "What do you want to do?",
                        title: "Attachments",
                        buttons: {
                            success: {
                                label: "Replace Current File",
                                className: "btn-success",
                                callback: function () {
            var formData = new FormData(event.target.files[0]);
            formData.append('file', event.target.files[0]);
                                    if (jQuery.inArray(event.target.files[0].name.split('.')[1], array) != -1) {
                                        $.ajax({
                                            url: getBaseUrl('/MctrAttachBl/mctrAttachBlInsert') + '?descr=' + $('#' + $(event.target).attr('rowID') + '_ATTACH_DESCR').val() + '&mctrNo=' + $('#MCTR_NO').val() + '&attachNo=' + $('#' + $(event.target).attr('rowID') + '_ATTACH_NO').val(),
                                            type: 'POST',
                                            data: formData,
                                            processData: false,  // tell jQuery not to process the data
                                            contentType: false,  // tell jQuery not to set contentType
                                            success: function (data) {
                                                    mctrObj.showDialog($("#popUp-dialog-box"), data[0].ATTACH_FILENAME + " was uploaded.", "success");
                                                    $("#mctrAttachmentsGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                                            }
                                        });
                                    }
                                    else {
                                        mctrObj.showDialog($("#popUp-dialog-box"), "Sorry, The file is invalid, allowed extensions are: " + array.join(", "), "error");
                                    }
                                }
                            },
                            danger: {
                                label: "Insert New File",
                                className: "btn-danger",
                                callback: function () {
                                    replaceOrCreate = false;
                                    $('#attachmentAddBtn').trigger('click');
                                }
                            },
                            main: {
                                label: "Cancel",
                                className: "btn-primary",
                                callback: function () {
                                    replaceOrCreate = false;
                                }
                            }
                        }
                    });

                }
                else {
                    var formData = new FormData(event.target.files[0]);
                    formData.append('file', event.target.files[0]);
                    if (jQuery.inArray(event.target.files[0].name.split('.')[1], array) != -1) {
                $.ajax({
                            url: getBaseUrl('/MctrAttachBl/mctrAttachBlInsert') + '?descr=' + $('#' + $(event.target).attr('rowID') + '_ATTACH_DESCR').val() + '&mctrNo=' + $('#MCTR_NO').val(),
                    type: 'POST',
                    data: formData,
                    processData: false,  // tell jQuery not to process the data
                    contentType: false,  // tell jQuery not to set contentType
                    success: function (data) {
                        $('#attachBtn').css('color', '#55E655');
                                mctrObj.showDialog($("#popUp-dialog-box"), data[0].ATTACH_FILENAME+" was uploaded.", "success");
                        $("#mctrAttachmentsGrid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                    }
                });
            }
            else {
                mctrObj.showDialog($("#popUp-dialog-box"), "Sorry, The file is invalid, allowed extensions are: " + array.join(", "), "error");
            }
                }

            } else {
                mctrObj.showDialog($("#popUp-dialog-box"), "Please Enter Attachment Description", "error");
            }
        });
        $('a[id*=_viewFilebtn]').click(function (event) {

            $('#downloadFrame').attr('src', getBaseUrl('/MctrAttachBl/mctrAttachattachViewFileWhenButtonPressed') + '?mctrNo=' + $('#MCTR_NO').val() + '&attachNo=' + $('#' + $(event.target).attr('rowID') + '_ATTACH_NO').val() + '&fileName=' + $('#' + $(event.target).attr('rowID') + '_ATTACH_FILENAME').val());
        })
        if ($('#queryFlag').val() == "True") {
            $('input[id*=_ATTACH_BLOB').attr("disabled", "disabled");
            $('#attachmentAddBtn').attr("disabled", "disabled");

        }
    }
    var afterInsertRow = function (rowid, rowdata, rowelem) {
        $("#" + rowid + '_ATTACH_DESCR').focus();
       
    };

    var selectRowFn = function (rowid, status, obj) {
        var rowData = $('#mctrAttachmentsGrid').jqGrid('getRowData', rowid);
        rowObject = rowData;
    };
    var columnNames = ['Description</br>Attach # File Name', 'BEMS</br>Date Time In', ''];
    var colModel = [{ key: false, name: 'ATTACH_DESCR', index: 'ATTACH_DESCR', editable: true, width: 400, formatter: descriptionFormatter },
        { key: false, name: 'PROJECT_ID', index: 'group_cd7', editable: true, width: 200, formatter: bemsFormatter },
        { key: false, name: 'ACTIVITY_ID', index: 'descr', editable: true, width: 200, formatter: btnFormatter }];
    mctrObj.CreateJqGrid('mctrAttachmentsGrid', '/MctrAttachBl/mctrAttachOnLoad', 'GET', { mctrNo: $('#MCTR_NO').val() }, columnNames, colModel, false, '', [], 10, '100%', 'desc', selectRowFn, gridCompleteFn ,null, afterInsertRow);

    $('#attachmentokBtn').click(function (e) {
        $('#mctrModalLarge').modal("hide");
    })

    $('#attachmentAddBtn').click(function (e) {
        var parameters =
    {
        initdata: {},
        position: "last",
        useDefValues: false,
        useFormatter: true,
        addRowParams: { extraparam: {} }
    };
        $('#mctrAttachmentsGrid').addRow(parameters);
    })
});