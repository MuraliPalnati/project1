$(document).ready(function () {
    
    var mctrObj = new MCTR();
    var rowId = $('#rowId').val();
  
    var Project_To = $('#OrigBu').val() + 'P' + $('#' + rowId + '_ACTIVITY_ID_TO').val();
    $('#ProjectToPrompt').val(Project_To);  
    $('#getListBtnTo').click(function (e, obj, options) {
        var rowId = $('#rowId').val();
        cowVal = $('#COW').val();
        pyVal = $('#py_cy_status').val();
        projFromPromptVal =  $('#ProjectToPrompt').val();
        activityVal = $('#' + rowId + '_ACTIVITY_ID_TO').val();
        projectVal = $('#PeriodTo').val();
        var createmctrlov2 = {
            cow: cowVal,
            py_cy_status: pyVal,
            PROJECT_ID: projFromPromptVal=='_'?'%':projFromPromptVal,
            ACTIVITY_ID: activityVal,
            EFFDT: projectVal
        };
        var succesFn = function (data) {
            if (data) {
                var succesFn = function (data) {
                    if (data) {
                        bootbox.dialog({
                            title: "Active Projects From",
                            message: data,
                            size: "large"
                        })
                    }
                };

                mctrObj.ajaxOptions('/MctrCreateForm/ProjToPromptLOV', 'GET', { rowId: rowId }, succesFn);
            }
            else {
                bootbox.alert("List of Values contains no entries.", function () { $(this).parents().find('.bootbox').modal('hide'); });
            }
        };
        mctrObj.ajaxOptions('/MctrCreateForm/getRgProjToPromptLOV', 'GET', createmctrlov2, succesFn);

        
    });
    
});
