$(document).ready(function() {
    function mctrheadertitlepretextitem()
    {
        this.defaultValue=this.value;      
        //or  this.oldValue=title.value; This can be taken care in View input tag  
    }
    
    function mctrheadertitleposttextitem()
    {
        var title=document.getElementById('title');
        var status_id=document.getElementById('statsuid').val;
        if ((title.value !=title.defaultValue || title.value == null) || (title.value == null && title.defaultValue != null) || (title.defaultValue == null && title.value != null))
        {
            if (((status_id=="oa" || status_id == null) && bems_orig == global.session_bems))
            {
                title.value = title.defaultValue;
                //message("you must be the originator in the oa or or status to change title.")throw new Exception();
            }

            else if ((title.value == null && title.defaultValue != null))
            {
                title.value = title.defaultValue;
            }
        }
    }
    function mctrHeaderbutApplWhenButtonPressedOpenLOV()
    {
        var statusId=document.getElementById("");

        if((statusId=="oa" ||statusId=="aa"||statusId=="ja")||(statusId==null))
        {
            $.ajax({
                type: "POST",
                url: getBaseUrl("/MctrCreateForm/mctrHeaderbutApplWhenButtonPressedOpenLOV"),
                data: null, 
                success: function(result) {
                    
                },                
                error : function(req, status, error) {
                    
                }
            });
            var v_role_count;

            if(v_role_count>0)
            {              
                //open Lov (new window)lov_appl

                //in window if value not chosen message=a value was not selected from list
            }
            else
            {
                //must have the accountant role to enter this value.
            }
        }
        else
        {
            //status must be set to oa, aa, or ja to change this field.
        }
    }


    function mctrHeaderbutReasonWhenButtonPressedOpenLOV()
    {
        var status_id=document.getElementById("");

        if((statusId=="oa" ||statusId=="aa"||statusId=="ja") || (status_id==null))
        {
            //set_item_property("reason_code",update_allowed,property_true)
            // v_value_chosen = show_lov('lov_reason');open Lov (new window)

            set_item_property("reason_code",update_allowed,property_false)

            var v_value_chosen;
            if(!v_value_chosen)
            {
                // message("a value was not selected from list.")
            }
        }

        else
        {
            //  message("status ("+status_id+") must be set to oa, aa, or ja to change this field.")
           
        }
    }


    function mctrHeaderjvItemCdPostTextItem()
    {
      
        var jv_item_cd=document.getElementById("");
    

        if((jv_item_cd!=jv_item_cd.defaultValue) || (jv_item_cd.defaultValue!= null && jv_item_cd==null) || (jv_item_cd.defaultValue==null && jv_item_cd!= null))
        {
            if((statusId=="oa" ||statusId=="aa"||statusId=="ja") || (status_id==null))
            {
                
                $.ajax({
                    type: "POST",
                    url: getBaseUrl("/MctrCreateForm/mctrHeaderjvItemCdPostTextItem"),
                    data: null, 
                    success: function(result) {
                        
                    },                
                    error : function(req, status, error) {
                        
                    }
                });


                   
                if(v_role_count==0)
                {
                    //jv_item_cd = global.hold_jv_item_cd;
                    //message("you must have the accountant role to enter this value.")
                    //throw new Exception();
                }

                else if((status_id=="ja") && (jv_item_cd==null))
                {
                    //message("warning - jv item is a required field in order to create the journals.")
                }
            }

            else
            {
                // jv_item_cd = global.hold_jv_item_cd;
                //  message("status must be set to oa, aa, ca or ja to change this field.")
                //throw new Exception();
            }
        }

    }
    function mctrheaderbutsuperwhenbuttonpressedopenlov()
    {
     
        if((status_id || status_id==null) && bems_orig==global.session_bems)
        {
            if((orig_bu!= null))
            {
                // v_value_chosen = show_lov('lov_super');

                if(v_value_chosen)
                {
                    // message("a value was not selected from list.")
                }
            }

            else
            {
                // message("Please select the Business Unit and Group first.")
               
            }
        }

        else
        {
            //  message("status must be oa/or with originator role authority to set approver.")
        }
    }





    function mctrheaderbutappracctwhenbuttonpressedopenlov()
    {
      

        if((status_id=="aa") && (bems_acct==global.session_bems))
        {
            //v_value_chosen = show_lov('lov_appr_acct');

            if(!v_value_chosen)
            {
                // message("a value was not selected from list.")
                // throw new Exception();
            }

            else
            {
                if(appr_cd_acct.equals("y") && (bems_cost_acct==null))
                {
                    //message("the cost accountant approver entry is missing and needs to be assigned before approving.")message("the cost accountant approver entry is missing and needs to be assigned before approving.")appr_cd_acct = ;
                    // throw new Exception();
                }

                if(appr_cd_acct==null)  
                {
                    date_appr_acct ="" ;
                }

                else
                {
                    date_appr_acct = sysdate;
                }

                // message("use the save button to process your selection.")
            }
        }

        else if(appr_cd_acct!= null)
        {
            //message("accountant can use recall button if approval needs to be reset.")
        }

        else
        {
            //message("status must be aa with accountant role authority to set this field.")
        }

        if(appr_cd_acct.equals("n"))
        {
            //set_item_property("mctr_header.appr_cd_acct",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.bems_acct",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.acct_name",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.date_appr_acct",foreground_color,"r500g0b0")
        }

        else
        {
            //set_item_property("mctr_header.appr_cd_acct",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.bems_acct",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.acct_name",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.date_appr_acct",foreground_color,"r25g25b25")
        }
    }


    function  mctrHeaderbutViewJrnlsWhenButtonPressed()
    {
        if (StatusId== "ip")
        {
            if (BEMS_ACCT== global.session_bems || bems_lbr_acct == global.session_bems || bems_matl_acct == global.session_bems || bems_cost_acct == global.session_bems || bems_sr_acct == global.session_bems)
            {
                v_role_count = 1;
            }

            else
            {
                $.ajax({
                    type: "POST",
                    url: getBaseUrl("/MctrCreateForm/mctrHeaderbutAcctWhenButtonPressedOpenLOV"),
                    data: null, 
                    success: function(result) {
                        
                    },                
                    error : function(req, status, error) {
                        
                    }
                });
            }
        }
        else
        {
            //alert("the status must be set to ip to view the journal line items.");
        }

    }



    function mctrheaderpostupdate()
    {
        var v_role_count = 0;

        if(status_id=="xs" ||status_id=="xx" )
        {
            // set_item_property("but_reopen",displayed,property_true)
            // set_item_property("but_reopen",enabled,property_true)
            // set_item_property("but_reopen",navigable,property_true)
        }

        else
        {
            // set_item_property("but_reopen",enabled,property_false)
            //  set_item_property("but_reopen",displayed,property_false)
        }

        if((status_id=="oa" ||status_id=="or" ) && bems_orig==global.session_bems && parameter.p_mctr_no!=0)
        {
            // set_item_property("but_cancel",displayed,property_true)
            //  set_item_property("but_cancel",enabled,property_true)
            // set_item_property("but_cancel",navigable,property_true)
        }

        else
        {
            //  set_item_property("but_cancel",enabled,property_false)s
            // et_item_property("but_cancel",displayed,property_false)
        }

        if((status_id=="xs" ||status_id=="xx" ) && bems_orig==global.session_bems && parameter.p_mctr_no!=0)
        {
            // set_item_property("but_submit",displayed,property_true)
            // set_item_property("but_submit",enabled,property_true)
            // set_item_property("but_submit",navigable,property_true)
        }

        else
        {
            //set_item_property("but_submit",enabled,property_false)s
            // et_item_property("but_submit",displayed,property_false)
        }

        if(status_id=="or" && bems_orig==global.session_bems && parameter.p_mctr_no!=0)
        {
            // set_item_property("but_reset",displayed,property_true)
            // set_item_property("but_reset",enabled,property_true)
            // set_item_property("but_reset",navigable,property_true)
        }

        else
        {
            //set_item_property("but_reset",enabled,property_false)
            //set_item_property("but_reset",displayed,property_false)
        }

        if(((status_id=="sa" ||status_id=="fa" ) && bems_orig==global.session_bems) || (status_id && bems_acct==global.session_bems) && parameter.p_mctr_no!=0)
        {
            // set_item_property("but_recall",displayed,property_true)
            // set_item_property("but_recall",enabled,property_true)
            // set_item_property("but_recall",navigable,property_true)
        }

        else
        {
            // set_item_property("but_recall",enabled,property_false)
            //  set_item_property("but_recall",displayed,property_false)
        }

        if(status_id=="ja" && parameter.p_mctr_no!=0)
        {
            // set_item_property("but_jrnl",displayed,property_true)
            // set_item_property("but_jrnl",enabled,property_true)
            // set_item_property("but_jrnl",navigable,property_true)
        }

        else
        {
            // set_item_property("but_jrnl",enabled,property_false)
            // set_item_property("but_jrnl",displayed,property_false)
        }

        if(status_id=="ip" && parameter.p_mctr_no!=0)
        {
            //  set_item_property("but_unjrnl",displayed,property_true)
            //  set_item_property("but_unjrnl",enabled,property_true)s
            //  et_item_property("but_unjrnl",navigable,property_true)
            //  set_item_property("but_view_jrnls",displayed,property_true)
            //  set_item_property("but_view_jrnls",enabled,property_true)
        }

        else
        {
            //set_item_property("but_unjrnl",enabled,property_false)
            //set_item_property("but_unjrnl",displayed,property_false)
            //set_item_property("but_view_jrnls",enabled,property_false)
            //set_item_property("but_view_jrnls",displayed,property_false)
        }

        if(parameter.p_mctr_no>0 && text_query_mode==null)
        {
            'oa','aa','ca','ja'
            if((status_id=="oa" ||status_id=="aa" ||status_id=="ca" ||status_id=="ja")|| _status_id==null)
            {

                //set_item_property("but_reason",enabled,property_true)
                // set_item_property("but_appl",enabled,property_true)
                // set_item_property("jv_item_cd",enabled,property_true)
                // set_item_property("jv_item_cd",navigable,property_true)
                if((!get_item_property("jv_item_cd",update_allowed).equals("true")))
                {
                    s//et_item_property("jv_item_cd",update_allowed,property_true)
                }
            }

            else
            {
                // set_item_property("but_reason",enabled,property_false)s
                // et_item_property("but_appl",enabled,property_false)
                // set_item_property("jv_item_cd",enabled,property_false)
            }

            if((status_id || status_id==null) && bems_orig==global.session_bems)
            {
                // set_item_property("but_bu",enabled,property_true)
                // set_item_property("but_fiscal_year",enabled,property_true)
                // set_item_property("but_super",enabled,property_true)
                // set_item_property("but_fin_ctl",enabled,property_true)
                // set_item_property("but_super",navigable,property_true)
                // set_item_property("but_fin_ctl",navigable,property_true)
            }

            else
            {
                // set_item_property("but_bu",enabled,property_false)
                // set_item_property("but_fiscal_year",enabled,property_false)
                // set_item_property("but_super",enabled,property_false)
                //  set_item_property("but_fin_ctl",enabled,property_false)
            }

            if(status_id=="sa" && bems_super==global.session_bems)
            {
                //set_item_property("but_appr_super",enabled,property_true)
                //set_item_property("but_appr_super",navigable,property_true)
            }

            else
            {
                /// set_item_property("but_appr_super",enabled,property_false)
            }

            if(status_id=="fa" && bems_fin_ctl==global.session_bems)
            {
                //set_item_property("but_appr_fin_ctl",enabled,property_true)
                //set_item_property("but_appr_fin_ctl",navigable,property_true)
            }

            else
            {
                //set_item_property("but_appr_fin_ctl",enabled,property_false)
            }  //starting of block

          

            $.ajax({
                type: "POST",
                url: getBaseUrl("/MctrCreateForm/mctrHeaderbutAcctWhenButtonPressedOpenLOV"),
                data: null, 
                success: function(result) {
                    
                },                
                error : function(req, status, error) {
                    
                }
            });



            if(status_id && ( bems_orig==global.session_bems || v_role_count!=0 || bems_acct==global.session_bems ))

            {
                //set_item_property("but_acct",enabled,property_true)
                //set_item_property("but_lbr_acct",enabled,property_true)
                //set_item_property("but_matl_acct",enabled,property_true)
                //set_item_property("but_cost_acct",enabled,property_true)
                //set_item_property("but_sr_mgr",enabled,property_true)
                //set_item_property("but_acct",navigable,property_true)
                // set_item_property("but_lbr_acct",navigable,property_true)
                // set_item_property("but_matl_acct",navigable,property_true)
                //set_item_property("but_cost_acct",navigable,property_true)
                // set_item_property("but_sr_mgr",navigable,property_true)
            }

            else
            {
                // set_item_property("but_acct",enabled,property_false)
                // set_item_property("but_lbr_acct",enabled,property_false)
                //set_item_property("but_matl_acct",enabled,property_false)
                // set_item_property("but_cost_acct",enabled,property_false)
                // set_item_property("but_sr_mgr",enabled,property_false)
            }

            if(status_id.equals("aa") && bems_acct==global.session_bems)
            {
                //set_item_property("but_appr_acct",enabled,property_true)
                //set_item_property("but_appr_acct",navigable,property_true)
            }

            else
            {
                //set_item_property("but_appr_acct",enabled,property_false)
            }

            if(status_id && bems_lbr_acct==global.session_bems)
            {
                //set_item_property("but_appr_lbr_acct",enabled,property_true)
                //set_item_property("but_appr_lbr_acct",navigable,property_true)
            }

            else
            {
                //set_item_property("but_appr_lbr_acct",enabled,property_false)
            }

            if(status_id && bems_matl_acct==global.session_bems)
            {
                //set_item_property("but_appr_matl_acct",enabled,property_true)
                // set_item_property("but_appr_matl_acct",navigable,property_true)
            }

            else
            {
                //set_item_property("but_appr_matl_acct",enabled,property_false)
            }

            if(status_id.equals("ca") && bems_cost_acct==global.session_bems)
            {
                //set_item_property("but_appr_cost_acct",enabled,property_true)
                // set_item_property("but_appr_cost_acct",navigable,property_true)
            }

            else
            {
                //set_item_property("but_appr_cost_acct",enabled,property_false)
            }

            if(status_id.equals("sr") && bems_sr_acct==global.session_bems)
            {
                // set_item_property("but_appr_sr_acct",enabled,property_true)
                // set_item_property("but_appr_sr_acct",navigable,property_true)
            }

            else
            {
                //  set_item_property("but_appr_sr_acct",enabled,property_false)
            }
        }

        else
        {
            // set_item_property("but_bu",enabled,property_false)
            // set_item_property("but_fiscal_year",enabled,property_false)
            //  set_item_property("but_reason",enabled,property_false)
            // set_item_property("but_appl",enabled,property_false)
            // set_item_property("but_super",enabled,property_false)
            //  set_item_property("but_appr_super",enabled,property_false)
            // set_item_property("but_fin_ctl",enabled,property_false)
            //            set_item_property("but_appr_fin_ctl",enabled,property_false)
            //            set_item_property("but_acct",enabled,property_false)
            //            set_item_property("but_appr_acct",enabled,property_false)
            //            set_item_property("but_lbr_acct",enabled,property_false)
            //            set_item_property("but_appr_lbr_acct",enabled,property_false)
            //            set_item_property("but_matl_acct",enabled,property_false)
            //            set_item_property("but_appr_matl_acct",enabled,property_false)
            //            set_item_property("but_cost_acct",enabled,property_false)
            //            set_item_property("but_appr_cost_acct",enabled,property_false)
            //            set_item_property("but_sr_mgr",enabled,property_false)
            //            set_item_property("but_appr_sr_acct",enabled,property_false)
            //            set_item_property("jv_item_cd",enabled,property_false)
            //}

            if((status_id && bems_orig==global.session_bems) && (parameter.p_mctr_no>0 && text_query_mode==null))
            {
                if((!get_item_property("justification",insert_allowed).equals("true")))
                {
                    // set_item_property("justification",insert_allowed,property_true)
                }

                if((!get_item_property("justification",update_allowed).equals("true")))
                {
                    // set_item_property("justification",update_allowed,property_true)
                }

                if((!get_item_property("preventative",insert_allowed).equals("true")))
                {
                    //set_item_property("preventative",insert_allowed,property_true)
                }

                if((!get_item_property("preventative",update_allowed).equals("true")))
                {
                    // set_item_property("preventative",update_allowed,property_true)
                }
            }

            else
            {
                if((!get_item_property("justification",insert_allowed).equals("false")))
                {
                    // set_item_property("justification",insert_allowed,property_false)
                }

                if((!get_item_property("justification",update_allowed).equals("false")))
                {
                    // set_item_property("justification",update_allowed,property_false)
                }

                if((!get_item_property("preventative",insert_allowed).equals("false")))
                {
                    // set_item_property("preventative",insert_allowed,property_false)
                }

                if((!get_item_property("preventative",update_allowed).equals("false")))
                {
                    //set_item_property("preventative",update_allowed,property_false)
                }
            }
        }



        function mctrHeaderPostRecord()
        {
            var v_count_a;
            var v_count_c;

            $.ajax({
                type: "POST",
                url: getBaseUrl("/MctrCreateForm/mctrHeaderPostRecord"),
                data: null, 
                success: function(result) {
                    
                },                
                error : function(req, status, error) {
                    
                }
            });
            
            // result[0].v_count["v_count_a"].value;

            if (v_count_a = 0) 
            {
                // set_item_property('but_attachment',visual_attribute,'button_off');
            }
            else
            {
                //   set_item_property('but_attachment',visual_attribute,'button_off_populated');
            }


            if(v_count_c==0)
            {
                // set_item_property("but_comment",visual_attribute,"button_off")
            }

            else
            {
                // set_item_property("but_comment",visual_attribute,"button_off_populated")
            }

            //set_item_property("but_bu",visual_attribute,"button_off")
            //set_item_property("but_fiscal_year",visual_attribute,"button_off")
            //set_item_property("but_reason",visual_attribute,"button_off")
            //set_item_property("but_appl",visual_attribute,"button_off")
            //set_item_property("but_super",visual_attribute,"button_off")
            //set_item_property("but_appr_super",visual_attribute,"button_off")
            //set_item_property("but_fin_ctl",visual_attribute,"button_off")
            //set_item_property("but_appr_fin_ctl",visual_attribute,"button_off")
            //set_item_property("but_acct",visual_attribute,"button_off")
            //set_item_property("but_appr_acct",visual_attribute,"button_off")
            //set_item_property("but_lbr_acct",visual_attribute,"button_off")
            //set_item_property("but_appr_lbr_acct",visual_attribute,"button_off")
            //set_item_property("but_matl_acct",visual_attribute,"button_off")
            //set_item_property("but_appr_matl_acct",visual_attribute,"button_off")
            //set_item_property("but_cost_acct",visual_attribute,"button_off")
            //set_item_property("but_appr_cost_acct",visual_attribute,"button_off")
            //set_item_property("but_sr_mgr",visual_attribute,"button_off")
            //set_item_property("but_appr_sr_acct",visual_attribute,"button_off")
            //set_item_property("but_mctr_overhead",visual_attribute,"button_off")
            //set_item_property("but_mctr_offset",visual_attribute,"button_off")
            //set_item_property("but_reset",visual_attribute,"button_off")
            //set_item_property("but_submit",visual_attribute,"button_off")
            //set_item_property("but_cancel",visual_attribute,"button_off")
            //set_item_property("but_reopen",visual_attribute,"button_off")
            //set_item_property("but_recall",visual_attribute,"button_off")
            //set_item_property("but_jrnl",visual_attribute,"button_off")
            //set_item_property("but_unjrnl",visual_attribute,"button_off")
            //set_item_property("but_view_jrnls",visual_attribute,"button_off")
            //set_item_property("but_print",visual_attribute,"button_off")
            //set_item_property("but_to_xls",visual_attribute,"button_off")
            //set_item_property("but_batchload",visual_attribute,"button_off")
            //set_item_property("but_stat_hist",visual_attribute,"button_off")

            if(status_id!= null)
            {
                if((!get_item_property("but_comment",enabled).equals("true")))
                {
                    //   set_item_property("but_comment",enabled,property_true)
                }

                if((!get_item_property("but_attachment",enabled).equals("true")))
                {
                    //  set_item_property("but_attachment",enabled,property_true)
                }

                if((!get_item_property("but_stat_hist",enabled).equals("true")))
                {
                    //  set_item_property("but_stat_hist",enabled,property_true)
                }

                if((!get_item_property("but_comment",navigable).equals("true")))
                {
                    //  set_item_property("but_comment",navigable,property_true)
                }

                if((!get_item_property("but_attachment",navigable).equals("true")))
                {
                    //  set_item_property("but_attachment",navigable,property_true)
                }

                if((!get_item_property("but_stat_hist",navigable).equals("true")))
                {
                    // set_item_property("but_stat_hist",navigable,property_true)
                }
            }

            else
            {
                if((!get_item_property("but_comment",enabled).equals("false")))
                {
                    //  set_item_property("but_comment",enabled,property_false)
                }

                if((!get_item_property("but_attachment",enabled).equals("false")))
                {
                    //  set_item_property("but_attachment",enabled,property_false)
                }

                if((!get_item_property("but_stat_hist",enabled).equals("false")))
                {
                    // set_item_property("but_stat_hist",enabled,property_false)
                }
            }

            if(justification==null)
            {
                //set_item_property("but_justification",visual_attribute,"button_off_required")
            }

            else
            {
                //set_item_property("but_justification",visual_attribute,"button_off_populated")
            }

            if((status_id && bems_orig==global.session_bems) && (parameter.p_mctr_no>0 && text_query_mode==null))
            {
                if((!get_item_property("justification",insert_allowed).equals("true")))
                {
                    // set_item_property("justification",insert_allowed,property_true)
                }

                if((!get_item_property("justification",update_allowed).equals("true")))
                {
                    // set_item_property("justification",update_allowed,property_true)
                }

                if((!get_item_property("preventative",insert_allowed).equals("true")))
                {
                    //set_item_property("preventative",insert_allowed,property_true)
                }

                if((!get_item_property("preventative",update_allowed).equals("true")))
                {
                    //set_item_property("preventative",update_allowed,property_true)
                }
            }

            else
            {
                if((!get_item_property("justification",insert_allowed).equals("false")))
                {
                    //  set_item_property("justification",insert_allowed,property_false)
                }

                if((!get_item_property("justification",update_allowed).equals("false")))
                {
                    //  set_item_property("justification",update_allowed,property_false)
                }

                if((!get_item_property("preventative",insert_allowed).equals("false")))
                {
                    //  set_item_property("preventative",insert_allowed,property_false)
                }

                if((!get_item_property("preventative",update_allowed).equals("false")))
                {
                    // set_item_property("preventative",update_allowed,property_false)
                }
            }
        }



        function mctrHeaderbutLbrAcctWhenButtonPressedOpenLOV()
        {
            var v_role_count = 0;
            var v_value_chosen;

            if(appr_cd_lbr_acct==null)
            {
                $.ajax({
                    type: "POST",
                    url: getBaseUrl("/MctrCreateForm/mctrHeaderPostRecord"),
                    data: null, 
                    success: function(result) {
                        
                    },                
                    error : function(req, status, error) {
                        
                    }
                });
               
                if(v_role_count>0)
                {
                    if(status_id=="aa" ||status_id=="lm" ||status_id=="lb")
                    {
                        // v_value_chosen = show_lov('lov_lbr_acct');

                        if(v_value_chosen)
                        {
                            // message("a value was not selected from list.")
                        }
                    }

                    else
                    {
                        // message("status must be aa/lm/lb in order to assign an approver.")
                    }
                }

                else
                {
                    //message("you must have the accountant role authority to set the approver.")
                }
            }

            else
            {
                //message("approval action has been performed.")
            }
        }

        function mctrheaderbutapprlbracctwhenbuttonpressedopenlov()//example
        {
            var v_value_chosen ;

            if((status_id=="lb" || status_id=="lm") && bems_lbr_acct==global.session_bems)
            {
                // v_value_chosen = show_lov('lov_appr_lbr_acct');

                if(v_value_chosen)
                {
                    //message("a value was not selected from list.")throw new Exception();
                }

                else
                {
                    if(appr_cd_lbr_acct==null)
                    {
                        //  date_appr_lbr_acct = ;
                    }

                    else
                    {
                        //  date_appr_lbr_acct = sysdate;
                    }

                    // message("use the save button to process your selection.")
                }
            }

            else if(appr_cd_lbr_acct!= null)
            {
                //message("please check with accountant for help to recall.")
            }

            else
            {
                // message("status must be lb/lm with accountant role authority to set this field.")
            }

            if(appr_cd_lbr_acct.equals("n"))
            {
                //set_item_property("mctr_header.appr_cd_lbr_acct",foreground_color,"r500g0b0")
                //set_item_property("mctr_header.bems_lbr_acct",foreground_color,"r500g0b0")
                //set_item_property("mctr_header.lbr_acct_name",foreground_color,"r500g0b0")
                //set_item_property("mctr_header.date_appr_lbr_acct",foreground_color,"r500g0b0")
            }

            else
            {
                //set_item_property("mctr_header.appr_cd_lbr_acct",foreground_color,"r25g25b25")
                // set_item_property("mctr_header.bems_lbr_acct",foreground_color,"r25g25b25")
                // set_item_property("mctr_header.lbr_acct_name",foreground_color,"r25g25b25")
                // set_item_property("mctr_header.date_appr_lbr_acct",foreground_color,"r25g25b25")
            }
        }
        function mctrHeaderbutMatlAcctWhenButtonPressedOpenLOV()
        {
            var v_role_count = 0;
            var v_value_chosen ;

            if(appr_cd_matl_acct==null)
            {
                $.ajax({
                    type: "POST",
                    url: getBaseUrl("/MctrCreateForm/mctrHeaderbutMatlAcctWhenButtonPressedOpenLOV"),
                    data: null, 
                    success: function(result) {
                        
                    },                
                    error : function(req, status, error) {
                        
                    }
                });
                   
                if(v_role_count>0)
                {
                    if(status_id=="aa"||status_id=="lm"||status_id=="ma")
                    {
                        //   v_value_chosen = show_lov('lov_matl_acct');

                        if(v_value_chosen)
                        {
                            // message("a value was not selected from list.")
                        }
                    }

                    else
                    {
                        //message("status must be aa/lm/ma in order to assign an approver.")
                    }
                }

                else
                {
                    //message("you must have the accountant role authority to set the approver.")
                }
            }

            else
            {
                //message("approval action has been performed.")
            }
        }
        function mctrheaderbutapprmatlacctwhenbuttonpressedopenlov()
        {
            var v_value_chosen;

            if((status_id=="ma" ||status_id=="lm") && bems_matl_acct==global.session_bems)
            {
                // v_value_chosen = show_lov('lov_appr_matl_acct');

                if(v_value_chosen)
                {
                    // message("a value was not selected from list.")throw new Exception();
                }

                else
                {
                    if(appr_cd_matl_acct==null)
                    {
                        // date_appr_matl_acct = ;
                    }

                    else
                    {
                        //date_appr_matl_acct = sysdate;
                    }

                    // message("use the save button to process your selection.")
                }
            }

            else if(appr_cd_matl_acct!= null)
            {
                // message("please check with accountant for help to recall.")
            }

            else
            {
                //message("status must be ma/lm with accountant role authority to set this field.")
            }

            if(appr_cd_matl_acct=="n")
            {
                // set_item_property("mctr_header.appr_cd_matl_acct",foreground_color,"r500g0b0")
                //set_item_property("mctr_header.bems_matl_acct",foreground_color,"r500g0b0")
                //set_item_property("mctr_header.matl_acct_name",foreground_color,"r500g0b0")
                //set_item_property("mctr_header.date_appr_matl_acct",foreground_color,"r500g0b0")
            }

            else
            {
                //set_item_property("mctr_header.appr_cd_matl_acct",foreground_color,"r25g25b25")
                //set_item_property("mctr_header.bems_matl_acct",foreground_color,"r25g25b25")
                //set_item_property("mctr_header.matl_acct_name",foreground_color,"r25g25b25")
                //set_item_property("mctr_header.date_appr_matl_acct",foreground_color,"r25g25b25")
            }
        }
        function mctrHeaderbutCostAcctWhenButtonPressedOpenLOV()
        {
            var v_role_count = 0;
            var v_value_chosen ;

            if(appr_cd_cost_acct==null)
            {
                $.ajax({
                    type: "POST",
                    url: getBaseUrl("/MctrCreateForm/mctrHeaderbutCostAcctWhenButtonPressedOpenLOV"),
                    data: null, 
                    success: function(result) {
                        
                    },                
                    error : function(req, status, error) {
                        
                    }
                });

           
                if(v_role_count>0)
                {
                    if(status_id=="la" ||status_id=="lm" ||status_id=="lb" ||status_id=="ma" ||status_id=="ca" )
                    {
                        // v_value_chosen = show_lov('lov_cost_acct');

                        if(v_value_chosen)
                        {
                            // message("a value was not selected from list.")
                        }
                    }

                    else
                    {
                        // message("status must be aa/lm/lb/ma/ca in order to assign an approver.")
                    }
                }

                else
                {
                    //message("you must have the accountant role authority to set the approver.")
                }
            }

            else
            {
                message("approval action has been performed.")
            }
        }
        function mctrheaderbutapprcostacctwhenbuttonpressedopenlov()
        {
            var v_value_chosen ;

            if(status_id=="ca" && bems_cost_acct==global.session_bems)
            {
                // v_value_chosen = show_lov('lov_appr_cost_acct');

                if(v_value_chosen)
                {
                    // message("a value was not selected from list.")throw new Exception();
                }

                else
                {
                    if(appr_cd_cost_acct==null)
                    {
                        //date_appr_cost_acct = ;
                    }

                    else
                    {
                        // date_appr_cost_acct = sysdate;
                    }

                    // message("use the save button to process your selection.")
                }
            }

            else if(appr_cd_cost_acct!= null)
            {
                // message("please check with accountant for help to recall.")
            }

            else
            {
                // message("status must be ca with accountant role authority to set this field.")
            }

            if(appr_cd_cost_acct.equals("n"))
            {
                //set_item_property("mctr_header.appr_cd_cost_acct",foreground_color,"r500g0b0")
                //set_item_property("mctr_header.bems_cost_acct",foreground_color,"r500g0b0")
                // set_item_property("mctr_header.cost_acct_name",foreground_color,"r500g0b0")
                //set_item_property("mctr_header.date_appr_cost_acct",foreground_color,"r500g0b0")
            }

            else
            {
                //et_item_property("mctr_header.appr_cd_cost_acct",foreground_color,"r25g25b25")
                //set_item_property("mctr_header.bems_cost_acct",foreground_color,"r25g25b25")
                //set_item_property("mctr_header.cost_acct_name",foreground_color,"r25g25b25")
                //set_item_property("mctr_header.date_appr_cost_acct",foreground_color,"r25g25b25")
            }
        }
        function mctrHeaderbutSrMgrWhenButtonPressedOpenLOV()
        {
            var v_role_count = 0;
            var v_value_chosen;

            if(appr_cd_sr_acct==null)
            {
                $.ajax({
                    type: "POST",
                    url: getBaseUrl("/MctrCreateForm/mctrHeaderbutCostAcctWhenButtonPressedOpenLOV"),
                    data: null, 
                    success: function(result) {
                        
                    },                
                    error : function(req, status, error) {
                        
                    }
                });
                  
                if(v_role_count>0)
                {
                    if(status_id=="aa"||status_id=="lm"||status_id=="lb"||status_id=="ma"||status_id=="a"||status_id=="sr")
                    {
                        //  v_value_chosen = show_lov('lov_sr_acct');

                        if(v_value_chosen)
                        {
                            //   message("a value was not selected from list.")
                        }
                    }

                    else
                    {
                        //  message("status must be aa/lm/lb/ma/ca/sr in order to assign an approver.")
                    }
                }

                else
                {
                    // message("you must have the accountant role authority to set the approver.")
                }
            }

            else
            {
                // message("approval action has been performed.")
            }
        }
        function mctrheaderbutapprsracctwhenbuttonpressedopenlov()
        {
            var v_value_chosen ;

            if(status_id=="sr" && bems_sr_acct==global.session_bems)
            {
                // v_value_chosen = show_lov('lov_appr_sr_acct');

                if(v_value_chosen)
                {
                    // message("a value was not selected from list.")
                    // throw new Exception();
                }

                else
                {
                    if(appr_cd_sr_acct==null)
                    {
                       // date_appr_sr_acct = ;
                    }

                    else
                    {
                        date_appr_sr_acct = Date.now;
                    }

                    //   message("use the save button to process your selection.")
                }
            }

            else if(appr_cd_sr_acct!= null)
            {
                message("please check with accountant for help to recall.")
            }

            else
            {
                message("status must be sr with accountant role authority to set this field.")
            }

            if(appr_cd_sr_acct.equals("n"))
            {
                // set_item_property("mctr_header.appr_cd_sr_acct",foreground_color,"r500g0b0")
                // set_item_property("mctr_header.bems_sr_acct",foreground_color,"r500g0b0")
                // set_item_property("mctr_header.sr_acct_name",foreground_color,"r500g0b0")
                // set_item_property("mctr_header.date_appr_sr_acct",foreground_color,"r500g0b0")
            }

            else
            {
                // set_item_property("mctr_header.appr_cd_sr_acct",foreground_color,"r25g25b25")
                //set_item_property("mctr_header.bems_sr_acct",foreground_color,"r25g25b25")
                //set_item_property("mctr_header.sr_acct_name",foreground_color,"r25g25b25")
                //set_item_property("mctr_header.date_appr_sr_acct",foreground_color,"r25g25b25")
            }
        }
        function mctrheaderbutstathistwhenbuttonpressed()
        {
            // string[] list_id = new string[100];
            // list_id = get_parameter_list('stat_hist_params');

            if(id_null(list_id))
            {
                // destroy_parameter_list(list_id)
            }

            // list_id = create_parameter_list('stat_hist_params');
            // add_parameter(list_id,"p_mctr",text_parameter,mctr_header.mctr_no)
            // add_parameter(list_id,"p_orig_date",text_parameter,mctr_header.date_enter)
            // open_form("stat_hist_bl",activate,no_session,list_id)
        }




        function mctrHeaderbutJustificationWhenButtonPressed()
        {
            var v_count = 0;
            //mctr.header.orig_bu
            if(system.mode=="normal")
            {
                if(orig_bu!= null)
            {
                if(justification==null)
                {


                    $.ajax({
                        type: "POST",
                        url: getBaseUrl("/MctrCreateForm/mctrHeaderbutJustificationWhenButtonPressed"),
                        data: null, 
                        success: function(result) {
                            
                        },                
                        error : function(req, status, error) {
                            
                        }
                    });
                
                    if(v_count>0)
                    {
                        justification = "- what happened? " ;//  +chr(10);
                        justification = justification+"- how/why it happened? ";//+chr(10);
                        justification = justification+"- effects of the mischarging: ";//+chr(10);
                        justification = justification+"- timeframe of mischarge: ";//chr(10);
                        justification = justification+"- when/how error was discovered? ";
                    }
                

                    //  go_item("mctr_header.justification")
                }

                else
                {
                    // message("please select the originating business unit first before adding justification information.")
                    //message("please select the originating business unit first before adding justification information.")
                }
            }
        }
        function mctrheaderclosebuttonwhenbuttonpressed()
        {
            // if((get_item_property("but_attachment",enabled).equals("true")))
            {
                //  go_item("but_attachment")
            }

            // else
            {
                // go_item("but_justification")
            }
        }


        function mctrheaderwhennewiteminstance()
        {
            var v_count = 0;
            
            $.ajax({
                type: "POST",
                url: getBaseUrl("/MctrCreateForm/mctrHeaderWhenNewItemInstance"),
                data: null, 
                success: function(result) {
                    
                },                
                error : function(req, status, error) {
                    
                }
            });
                

            if(v_count_a==0)
            {
                //set_item_property("but_attachment",visual_attribute,"button_off")
            }

            else
            {
                // set_item_property("but_attachment",visual_attribute,"button_off_populated")
            }

        
            
            if(v_count_c==0)
            {
                // set_item_property("but_comment",visual_attribute,"button_off")
            }

            else
            {
                // set_item_property("but_comment",visual_attribute,"button_off_populated")
            }

            if(justification==null)
            {
                //set_item_property("but_justification",visual_attribute,"button_off_required")
            }

            else
            {
                //set_item_property("but_justification",visual_attribute,"button_off_populated")
            }

            //set_item_property("but_bu",visual_attribute,"button_off")
            //set_item_property("but_fiscal_year",visual_attribute,"button_off")
            //set_item_property("but_reason",visual_attribute,"button_off")
            // set_item_property("but_appl",visual_attribute,"button_off")
            // set_item_property("but_super",visual_attribute,"button_off")
            // set_item_property("but_appr_super",visual_attribute,"button_off")
            // set_item_property("but_fin_ctl",visual_attribute,"button_off")
            // set_item_property("but_appr_fin_ctl",visual_attribute,"button_off")
            // set_item_property("but_acct",visual_attribute,"button_off")
            // set_item_property("but_appr_acct",visual_attribute,"button_off")
            // set_item_property("but_lbr_acct",visual_attribute,"button_off")
            // set_item_property("but_appr_lbr_acct",visual_attribute,"button_off")
            // set_item_property("but_matl_acct",visual_attribute,"button_off")
            // set_item_property("but_appr_matl_acct",visual_attribute,"button_off")
            // set_item_property("but_cost_acct",visual_attribute,"button_off")
            // set_item_property("but_appr_cost_acct",visual_attribute,"button_off")
            //  set_item_property("but_sr_mgr",visual_attribute,"button_off")
            // set_item_property("but_appr_sr_acct",visual_attribute,"button_off")
            // set_item_property("but_mctr_overhead",visual_attribute,"button_off")
            // set_item_property("but_mctr_offset",visual_attribute,"button_off")
            // set_item_property("but_reset",visual_attribute,"button_off")
            // set_item_property("but_submit",visual_attribute,"button_off")
            // set_item_property("but_cancel",visual_attribute,"button_off")
            //  set_item_property("but_reopen",visual_attribute,"button_off")
            // set_item_property("but_recall",visual_attribute,"button_off")
            //  set_item_property("but_jrnl",visual_attribute,"button_off")
            //  set_item_property("but_unjrnl",visual_attribute,"button_off")
            //  set_item_property("but_view_jrnls",visual_attribute,"button_off")
            //  set_item_property("but_print",visual_attribute,"button_off")
            //  set_item_property("but_to_xls",visual_attribute,"button_off")
            // set_item_property("but_batchload",visual_attribute,"button_off")
            //  set_item_property("but_stat_hist",visual_attribute,"button_off")

            //  if(system.current_item.indexOf("but")!=-1)
            {
                // set_item_property(system.current_item,visual_attribute,"button_highlight")
            }

            if(status_id!= null)
            {
                //      if((!get_item_property("but_comment",enabled).equals("true")))
                {
                    //         set_item_property("but_comment",enabled,property_true)
                }

                if((!get_item_property("but_attachment",enabled).equals("true")))
                {
                    //      set_item_property("but_attachment",enabled,property_true)
                }

                if((!get_item_property("but_stat_hist",enabled).equals("true")))
                {
                    //   set_item_property("but_stat_hist",enabled,property_true)
                }

                if((!get_item_property("but_comment",navigable).equals("true")))
                {
                    //   set_item_property("but_comment",navigable,property_true)
                }

                if((!get_item_property("but_attachment",navigable).equals("true")))
                {
                    //   set_item_property("but_attachment",navigable,property_true)
                }

                if((!get_item_property("but_stat_hist",navigable).equals("true")))
                {
                    //  set_item_property("but_stat_hist",navigable,property_true)
                }
            }

            else
            {
                if((!get_item_property("but_comment",enabled).equals("false")))
                {
                    //  set_item_property("but_comment",enabled,property_false)
                }

                if((!get_item_property("but_attachment",enabled).equals("false")))
                {
                    // set_item_property("but_attachment",enabled,property_false)
                }

                if((!get_item_property("but_stat_hist",enabled).equals("false")))
                {
                    // set_item_property("but_stat_hist",enabled,property_false)
                }
            }
        }

        function mctrHeaderWhenNewRecordInstance()
        {
            var v_count = 0;
            // global.process_type
          

            if(status_id!= null)
            {
                if((!get_item_property("but_comment",enabled).equals("true")))
                {
                    //set_item_property("but_comment",enabled,property_true)
                    // set_item_property("but_comment",navigable,property_true)
                }

                if((!get_item_property("but_attachment",enabled).equals("true")))
                {
                    //set_item_property("but_attachment",enabled,property_true)
                    //set_item_property("but_attachment",navigable,property_true)
                }

                if((!get_item_property("but_stat_hist",enabled).equals("true")))
                {
                    //  set_item_property("but_stat_hist",enabled,property_true)
                    //set_item_property("but_stat_hist",navigable,property_true)
                }
            }

            else
            {
                if((!get_item_property("but_comment",enabled).equals("false")))
                {
                    //set_item_property("but_comment",enabled,property_false)
                }

                if((!get_item_property("but_attachment",enabled).equals("false")))
                {
                    //set_item_property("but_attachment",enabled,property_false)
                }

                if((!get_item_property("but_stat_hist",enabled).equals("false")))
                {
                    //set_item_property("but_stat_hist",enabled,property_false)
                }
            }

            if(status_id!= null)
            {
                if((!get_item_property("but_print",enabled).equals("true")))
                {
                    //set_item_property("but_print",enabled,property_true)
                    //set_item_property("but_print",navigable,property_true)
                }

                if((!get_item_property("but_to_xls",enabled).equals("true")))
                {
                    // set_item_property("but_to_xls",enabled,property_true)
                    //set_item_property("but_to_xls",navigable,property_true)
                }
            }

            else
            {
                //set_item_property("but_print",enabled,property_false)
                //set_item_property("but_to_xls",enabled,property_false)
            }

            if(status_id)
            {
                if((!get_item_property("but_reopen",displayed).equals("true")))
                {
                    //set_item_property("but_reopen",displayed,property_true)
                }

                if((!get_item_property("but_reopen",enabled).equals("true")))
                {
                    //set_item_property("but_reopen",enabled,property_true)
                    //set_item_property("but_reopen",navigable,property_true)
                }
            }

            else
            {
                // set_item_property("but_reopen",enabled,property_false)
                //set_item_property("but_reopen",displayed,property_false)
            }

            if(status_id && bems_orig==global.session_bems && parameter.p_mctr_no!=0)
            {
                if((!get_item_property("but_cancel",displayed).equals("true")))
                {
                    //set_item_property("but_cancel",displayed,property_true)
                }

                if((!get_item_property("but_cancel",enabled).equals("true")))
                {
                    // set_item_property("but_cancel",enabled,property_true)
                    //set_item_property("but_cancel",navigable,property_true)
                }
            }

            else
            {
                //set_item_property("but_cancel",enabled,property_false)
                //set_item_property("but_cancel",displayed,property_false)
            }

            if(status_id && bems_orig==global.session_bems && parameter.p_mctr_no!=0)
            {
                if((!get_item_property("but_submit",displayed).equals("true")))
                {
                    // set_item_property("but_submit",displayed,property_true)
                }

                if((!get_item_property("but_submit",enabled).equals("true")))
                {
                    //set_item_property("but_submit",enabled,property_true)
                    //set_item_property("but_submit",navigable,property_true)
                }
            }

            else
            {
                //set_item_property("but_submit",enabled,property_false)
                //set_item_property("but_submit",displayed,property_false)
            }

            if(status_id=="or" && bems_orig==global.session_bems && parameter.p_mctr_no!=0)
            {
                if((!get_item_property("but_reset",displayed).equals("true")))
                {
                    //set_item_property("but_reset",displayed,property_true)
                }

                if((!get_item_property("but_reset",enabled).equals("true")))
                {
                    //set_item_property("but_reset",enabled,property_true)
                    //set_item_property("but_reset",navigable,property_true)
                }
            }

        else
        {
            //set_item_property("but_reset",enabled,property_false)
            //set_item_property("but_reset",displayed,property_false)
            }

        if(((status_id && bems_orig==global.session_bems) || (status_id && bems_acct==global.session_bems)) && parameter.p_mctr_no!=0)
        {
            if((!get_item_property("but_recall",displayed).equals("true")))
            {
                // set_item_property("but_recall",displayed,property_true)
            }

            if((!get_item_property("but_recall",enabled).equals("true")))
            {
                //set_item_property("but_recall",enabled,property_true)
                //set_item_property("but_recall",navigable,property_true)
            }
        }

        else
        {
            //set_item_property("but_recall",enabled,property_false)
            //set_item_property("but_recall",displayed,property_false)
        }

        if(status_id.equals("ja") && parameter.p_mctr_no!=0)
        {
            if((!get_item_property("but_jrnl",displayed).equals("true")))
            {
                //set_item_property("but_jrnl",displayed,property_true)
            }

            if((!get_item_property("but_jrnl",enabled).equals("true")))
            {
                //set_item_property("but_jrnl",enabled,property_true)
                set_item_property("but_jrnl",navigable,property_true)
            }
        }

        else
        {
            //set_item_property("but_jrnl",enabled,property_false)
            //set_item_property("but_jrnl",displayed,property_false)
        }

        if(status_id.equals("ip") && parameter.p_mctr_no!=0)
        {
            if((!get_item_property("but_unjrnl",displayed).equals("true")))
            {
                //set_item_property("but_unjrnl",displayed,property_true)
                //set_item_property("but_view_jrnls",displayed,property_true)
            }

            if((!get_item_property("but_unjrnl",enabled).equals("true")))
            {
                //set_item_property("but_unjrnl",enabled,property_true)
                //set_item_property("but_unjrnl",navigable,property_true)
                //set_item_property("but_view_jrnls",enabled,property_true)
            }
        }

        else
        {
            //set_item_property("but_unjrnl",enabled,property_false)
            //set_item_property("but_unjrnl",displayed,property_false)
            //set_item_property("but_view_jrnls",enabled,property_false)
            //set_item_property("but_view_jrnls",displayed,property_false)
        }

        if(appr_cd_super.equals("n"))
        {
            //set_item_property("mctr_header.appr_cd_super",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.bems_super",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.supervisor_name",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.date_appr_super",foreground_color,"r500g0b0")
        }

        else
        {
            //set_item_property("mctr_header.appr_cd_super",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.bems_super",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.supervisor_name",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.date_appr_super",foreground_color,"r25g25b25")
        }

        if(appr_cd_fin_ctl.equals("n"))
        {
            //set_item_property("mctr_header.appr_cd_fin_ctl",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.bems_fin_ctl",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.fin_cntl_name",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.date_appr_fin_ctl",foreground_color,"r500g0b0")
        }

        else
        {
            //set_item_property("mctr_header.appr_cd_fin_ctl",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.bems_fin_ctl",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.fin_cntl_name",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.date_appr_fin_ctl",foreground_color,"r25g25b25")
        }

        if(appr_cd_acct.equals("n"))
        {
            //set_item_property("mctr_header.appr_cd_acct",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.bems_acct",foreground_color,"r500g0b0")
                
            //set_item_property("mctr_header.acct_name",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.date_appr_acct",foreground_color,"r500g0b0")
        }

        else
        {
            //set_item_property("mctr_header.appr_cd_acct",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.bems_acct",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.acct_name",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.date_appr_acct",foreground_color,"r25g25b25")
        }

        if(appr_cd_lbr_acct.equals("n"))
        {
            //set_item_property("mctr_header.appr_cd_lbr_acct",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.bems_lbr_acct",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.lbr_acct_name",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.date_appr_lbr_acct",foreground_color,"r500g0b0")
        }

        else
        {
            //set_item_property("mctr_header.appr_cd_lbr_acct",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.bems_lbr_acct",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.lbr_acct_name",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.date_appr_lbr_acct",foreground_color,"r25g25b25")
        }

        if(appr_cd_matl_acct.equals("n"))
        {
            //set_item_property("mctr_header.appr_cd_matl_acct",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.bems_matl_acct",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.matl_acct_name",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.date_appr_matl_acct",foreground_color,"r500g0b0")
        }

        else
        {
            //set_item_property("mctr_header.appr_cd_matl_acct",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.bems_matl_acct",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.matl_acct_name",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.date_appr_matl_acct",foreground_color,"r25g25b25")
        }

        if(appr_cd_cost_acct.equals("n"))
        {
            //set_item_property("mctr_header.appr_cd_cost_acct",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.bems_cost_acct",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.cost_acct_name",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.date_appr_cost_acct",foreground_color,"r500g0b0")
        }

        else
        {
            //set_item_property("mctr_header.appr_cd_cost_acct",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.bems_cost_acct",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.cost_acct_name",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.date_appr_cost_acct",foreground_color,"r25g25b25")
        }

        if(appr_cd_sr_acct.equals("n"))
        {
            //set_item_property("mctr_header.appr_cd_sr_acct",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.bems_sr_acct",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.sr_acct_name",foreground_color,"r500g0b0"
            //)set_item_property("mctr_header.date_appr_sr_acct",foreground_color,"r500g0b0")
        }

        else
        {
            //set_item_property("mctr_header.appr_cd_sr_acct",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.bems_sr_acct",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.sr_acct_name",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.date_appr_sr_acct",foreground_color,"r25g25b25")
        }

        if((status_id || status_id==null) && (bems_orig==global.session_bems || bems_orig==null))
        {
            //set_item_property("justification",insert_allowed,property_true)
            //set_item_property("justification",update_allowed,property_true)
            //set_item_property("preventative",insert_allowed,property_true)
            //set_item_property("preventative",update_allowed,property_true)
        }

        else
        {
            // set_item_property("justification",insert_allowed,property_false)
            //set_item_property("justification",update_allowed,property_false)
            //set_item_property("preventative",insert_allowed,property_false)
            //set_item_property("preventative",update_allowed,property_false)
        }

        if((status_id.equals("99") || (parameter.p_mctr_no==0 && !status_id.equals("xx") && !status_id.equals("xs"))))
        {
            // set_block_property("mctr_header",update_allowed,property_false)
            //set_block_property("mctr_line_item",update_allowed,property_false)
        }

        else
        {
            // set_block_property("mctr_header",update_allowed,property_true)
            //set_block_property("mctr_line_item",update_allowed,property_true)
        }

        if(status_id=="oa" && bems_orig==global.session_bems && parameter.p_mctr_no!=0)
        {
                 
            $.ajax({
                type: "POST",
                url: getBaseUrl("/MctrCreateForm/mctrHeaderWhenNewRecordInstance"),
                data: null, 
                success: function(result) {
                    
                },                
                error : function(req, status, error) {
                    
                }
            });
                
    
            if(v_count==0)
            {

                // go_block("mctr_line_item")go_record(1)for(;;)
                {
                    if(!system.record_status.equals("new"))
                    {
                        v_count = v_count+1;
                    }

                    if(system.last_record.equals("true"))
                    {
                        //  break;
                    }

                    // next_record
                }

                if(v_count==0)
                {
                    // set_item_property("but_batchload",displayed,property_true)
                    //set_item_property("but_batchload",enabled,property_true)
                    //go_block("mctr_header")
                }
            }

            else
            {
                // set_item_property("but_batchload",enabled,property_false)
                //set_item_property("but_batchload",displayed,property_false)
            }
        }

        else
        {
            //set_item_property("but_batchload",enabled,property_false)
            //set_item_property("but_batchload",displayed,property_false)
        }

        if(mctr_header.mctr_no==null || (global.g_inq_mctrno!=mctr_header.mctr_no))
        {
            // hide_window("ttd_inq")
        }
    }



    function  mctrHeaderjvItemCdPreTextItem()
    {
        var jv=document.getElementById("");
        jv.defaultValue=jv.Value;
    }



    function mctrheaderbutapprsuperwhenbuttonpressedopenlov()
    {
        var v_value_chosen ;

        if(status_id=="sa" && bems_super==global.session_bems)
        {
            //v_value_chosen = show_lov('lov_appr_super');

            if(v_value_chosen)
            {
                //message("a value was not selected from list.")throw new Exception();
            }

            else
            {
                if(appr_cd_super==null)
                {
                   // date_appr_super = ;
                }

                else
                {
                   // date_appr_super = sysdate;
                }

                //message("use the save button to process your selection.")
            }
        }

        else if(appr_cd_super!= null)
        {
            //message("please check with originator for help to reset.")
        }

        else
        {
           // message("status must be sa with originator role authority to set this field.")
        }

        if(appr_cd_super=="n")
        {
            //set_item_property("mctr_header.appr_cd_super",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.bems_super",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.supervisor_name",foreground_color,"r500g0b0")
            //set_item_property("mctr_header.date_appr_super",foreground_color,"r500g0b0")
        }

        else
        {
            // set_item_property("mctr_header.appr_cd_super",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.bems_super",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.supervisor_name",foreground_color,"r25g25b25")
            //set_item_property("mctr_header.date_appr_super",foreground_color,"r25g25b25")
        }
    }













    $("bubutton").click(function()
    {
        var statusId= $('StatusId');
        var origbu=$('OrigBu');
        var Session_bems=document.getElementById("").DefaultValue;
       
        if(statusId=="oa" && statusId=="or" && origbu!=null)
        {
            //alert("please save or cancel outstanding changes before using bu grp button.");
        }

        else
        {
            if($('bemsOrig')==Session_bems)

            {
                $.ajax({
                    url: "/MctrCreateForm/SampleMethod",
                    type: "POST",
                    data: y,
                    contentType: 'application/json',
                    processData: false,
                    success: function (msg) {
                        
                    },
                });

            }



        }
    });



    //$('#ALERT_BU_CHG').on('shown.bs.modal', function () {

    //    var lineItemCount = $('#Linesfrom').val();
    //    var BemsOrig = $('#BemsOrig').val();
    //    var oldValOrigbu = $('#BemsOrig').attr('value');
    //    //sessionbems 
    //    var statusId = $('#StatusId').val();
    //    if(statusId =="" || statusId=="OA")
    //    {
    //        if (lineItemCount > 0)
    //            //proceed changing line items home bu when chosen = true
    //        {
    //            $('#ALERT_BU_CHGcontinueBtn').unbind('click').click(function (e) {
    //                $('#ALERT_BU_CHG').modal('hide');
    //                if ($('#bubtn').attr('data-target') == '#ALERT_BU_CHG') {
    //                    $('#bubtn').attr('data-target', '#mctrModal')
    //                }

    //                $.ajax({
    //                    type: "POST",
    //                    url: "/MctrCreateForm/mctrheaderbutbuwhenbuttonpressedopenlov",
    //                    data: { mctrLineItem: param },
    //                    success: function (result) {

    //                    },
    //                    error: function (jqXHR, textStatus, errorThrown) {


    //                        mctrObj.showDialog($("#dialog-box"), JSON.parse(jqXHR.responseText).Message, "error");
    //                    }
    //                });

    //                $('#bubtn').attr('href', '/MctrCreateForm/BUGroupPopUp');
    //                $('#bubtn').click();
    //            });
    //            $('#ALERT_BU_CHGstopBtn').click(function (e) {
    //                $('#bubtn').attr('href', '')
    //                $('#ALERT_BU_CHG').modal('hide');

    //            });
    //        }

    //    }
    //    else
    //    {
    //        mctrObj.showDialog($("#dialog-box"), "the bu grp value can only be changed by originator when status is oa or blank for new entry.", "error");
    //        $('#bubtn').attr('href', '')
    //        $('#ALERT_BU_CHG').modal('hide');

    //    }
    //    //$('#ALERT_BU_CHGstopBtn').click(function (e) {
    //    //    $('#bubtn').attr('href', '')
    //    //    $('#ALERT_BU_CHG').modal('hide');
    //    //});
    //    //$('#ALERT_BU_CHGcontinueBtn').unbind('click').click(function (e) {
    //    //    $('#ALERT_BU_CHG').modal('hide');
    //    //    if ($('#bubtn').attr('data-target') == '#ALERT_BU_CHG') {
    //    //        $('#bubtn').attr('data-target', '#mctrModal')
    //    //    }
    //    //    $('#bubtn').attr('href', '/MctrCreateForm/BUGroupPopUp');
    //    //    $('#bubtn').click();
    //    //});
    //});

    //$('#ALERT_BU_CHG').on('hidden.bs.modal', function () {
    //    if ($('#bubtn').attr('data-target') == '#mctrModal') {
    //        $('#bubtn').attr('data-target', '#ALERT_BU_CHG');
    //    };
    //});





