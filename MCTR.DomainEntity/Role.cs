using System;

namespace MCTR.DomainEntity
{
    public class Role
    {
        public string BEMS { get; set; }
        public string ACTIVE { get; set; }
        public string ACCOUNTANT_ROLE { get; set; }
        public string MATL_ACCT_ROLE { get; set; }
        public string COST_ACCT_ROLE { get; set; }
        public string FIN_CONTROL_ROLE { get; set; }
        public string SR_ACCT_ROLE { get; set; }
        public Nullable<System.DateTime> DATE_INIT_ADD { get; set; }
        public Nullable<System.DateTime> DATE_UPDATE { get; set; }
        public string BEMS_ADMIN { get; set; }
        public string LAST_BU { get; set; }
        public string LAST_LOC { get; set; }
        public string LAST_DEPT { get; set; }
        public string OVRRD_GRP_CD { get; set; }
        public Nullable<System.DateTime> LAST_LOGON { get; set; }
        public string ADMIN_ROLE { get; set; }
        public string LBR_ACCT_ROLE { get; set; }
    }
}