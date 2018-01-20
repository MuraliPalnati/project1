using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
    public class MctrMainMenu : Global
    {
       
        public string orig_bu { get; set; }
        public string FIRST_NAME { get; set; }
        public string MIDDLE_INT { get; set; }
        public string LAST_NAME { get; set; }
        public int MCTR_NO { get; set; }
        public string title { get; set; }
        public string STATUS_ID { get; set; }
        public string full_name { get; set; }
        public string fmtamt { get; set; }
        public int count { get; set; }



        // added for the check box
        public bool cbox_accountant { get; set; }
        public bool cbox_openonly { get; set; }



        // added to get the admin roles

        public string BEMS_ID { get; set; }

        public string accountant_role { get; set; }

        public string matl_acct_role { get; set; }

        public string cost_acct_role { get; set; }

        public string sr_acct_role { get; set; }

        public string admin_role { get; set; }

        public string logon_bems { get; set; }




        //added for MCTRMAINMENUTIMER
        public string v_message_status { get; set; }
        public string v_message_text { get; set; }
        public string v_last_name { get; set; }
        public string v_first_name { get; set; }

        public string v_full_name { get; set; }

        public int v_role_count { get; set; }
        public string v_login_admin { get; set; }

        public DateTime v_table_time { get; set; }

        public string v_table_bems { get; set; }



        public bool pendingApprovals { get; set; }
        public string messageadmin { get; set; }
    }
}
