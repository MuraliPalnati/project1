using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
    class MctrMAJOR_ACCT_V
    {
        public string SETID { get; set; }
        public string MAJOR_ACCOUNT_NBR7 { get; set; }
        public System.DateTime EFFDT { get; set; }
        public string EFF_STATUS { get; set; }
        public string DESCR { get; set; }
        public string DESCRSHORT { get; set; }
        public string BILLABLE_FLG7 { get; set; }
        public string ACCOUNT_SE_GRP_CD7 { get; set; }
        public string INTERUNIT_FLG { get; set; }
        public string STATISTICS_ACCOUNT { get; set; }
        public string WPD_INDIRECT_FLG7 { get; set; }
    }
}
