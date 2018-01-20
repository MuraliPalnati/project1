using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
    public class AuthBuExcel
    {
        public string MGR_LAST_NAME { get; set; }
        public string MGR_FIrst_NAME { get; set; }
        public Nullable<decimal> MGR_BEMS { get; set; }
        public string LAST_NAME { get; set; }
        public string FIRST_NAME { get; set; }
        public string MIDDLE_INT { get; set; }
        public Nullable<decimal> EMP_BEMS { get; set; }
       
      
        public string EMPL_BU { get; set; }
        public string EMPL_LOC { get; set; }
        public string EMPL_DEPT { get; set; }
        public string EMPL_BEMS_ID { get; set; }
        public string EMPL_STATUS { get; set; }
        public string ACTIVE { get; set; }
        public string LAST_LOGON { get; set; }
        public Nullable<decimal> DAYS_SINCE_LAST_LOGON { get; set; }
        public string FIN_CONTROL_ROLE { get; set; }
        public string ACCOUNTANT_ROLE { get; set; }
        public string LBR_ACCT_ROLE { get; set; }
        public string MATL_ACCT_ROLE { get; set; }
        public string COST_ACCT_ROLE { get; set; }
        public string JRNL_APRV_ROLE { get; set; }
        public string ADMIN_ROLE { get; set; }
        public string DATE_INIT_ADD { get; set; }
        public string DATE_UPDATE { get; set; }
        public string ADMIN_BEMS_ID { get; set; }
        public string AUTH_BU_GRP { get; set; }
        public string AUTH_BU { get; set; }
        public string AUTH_BU_DESC { get; set; }
        public string AUTH_BU_ADMIN_LAST_NAME { get; set; }
        public string AUTH_BU_ADMIN_FIRST_NAME { get; set; }
        public string AUTH_BU_ADMIN_BEMS { get; set; }
        public string MGR_EMAIL { get; set; }
        public string EMP_EMAIL { get; set; }
        public string EMAIL_EMPL_NAME { get; set; }
    }
}
