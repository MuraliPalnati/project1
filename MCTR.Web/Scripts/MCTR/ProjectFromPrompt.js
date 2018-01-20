$(document).ready(function () {

    var mctrObj = new MCTR();
    var rowId = $('#rowId').val();
 
    var Project_From = $('#OrigBu').val() + 'P' + $('#' + rowId + '_ACTIVITY_ID_FROM').val().toUpperCase();
    $('#ProjectFromPrompt').val(Project_From);
   

    $('#getListBtn').click(function (e, obj, options) {
        
        var rowId = $('#rowId').val();
        var cowVal = $('#COW').val();
        var pyVal = $('#py_cy_status').val()
        var projFromPromptVal = $('#ProjectFromPrompt').val().toUpperCase();
        var activityVal = $('#' + rowId + '_ACTIVITY_ID_FROM').val().toUpperCase();
        var projectVal = $('#PeriodTo').val();
        var createmctrlov = {
            cow: cowVal,
            py_cy_status: pyVal,
            project_from_prompt: projFromPromptVal == '_' ? '%' : projFromPromptVal,
            activity_id_from: activityVal,
            period_to: projectVal
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

                mctrObj.ajaxOptions('/MctrCreateForm/ProjFromPromptLOV', 'GET', { rowId: rowId }, succesFn);
            }
            else {
                bootbox.alert("List of Values contains no entries.", function () { $(this).parents().find('.bootbox').modal('hide'); });
            }
        };
        mctrObj.ajaxOptions('/MctrCreateForm/getRgProjFromPromptLOV', 'GET', createmctrlov, succesFn);



    });

});

