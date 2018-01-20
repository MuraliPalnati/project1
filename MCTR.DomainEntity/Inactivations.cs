using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
   public class Inactivations
    {
        public string ADMIN_FOCAL_LNAME { get; set; }
        public string ACTION_TYPE { get; set; }
        public string MGR_NAME { get; set; }
        public string MGR_EMAIL_BEMS { get; set; }
        public string EMP_NAME { get; set; }

        public string EMPL_BU { get; set; }
        public string EMPL_LOC { get; set; }
        public string EMPL_DEPT { get; set; }
        public string EMP_EMAIL_BEMS { get; set; }
        public string FIN_CONTROL_ROLE { get; set; }
        public string ACCOUNTANT_ROLE { get; set; }
        public string LBR_ACCT_ROLE { get; set; }
        public string MATL_ACCT_ROLE { get; set; }
        public string COST_ACCT_ROLE { get; set; }
        public string JRNL_APVR_ROLE { get; set; }
        public string ADMIN_ROLE { get; set; }
        public Nullable<DateTime> LAST_LOGON { get; set; }
        public Nullable<DateTime> DATE_INIT_ADD { get; set; }
        public Nullable<DateTime> DATE_UPDATE { get; set; }
        public string ADMIN_BEMS_ID { get; set; }
        public string EMPL_STATUS { get; set; }
     



    }
}
