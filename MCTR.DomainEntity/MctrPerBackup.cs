using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
    public class MctrPerBackup
    {
        public int MCTR_NO { get; set; }
        public short LINE_NO { get; set; }
        public short SEQ_NO { get; set; }
        public Nullable<short> FISCAL_YEAR { get; set; }
        public Nullable<short> ACCOUNTING_PERIOD { get; set; }
        public string ANALYSIS_TYPE { get; set; }
        public string ACTIVITY_ID { get; set; }
        public string PROJECT_ID { get; set; }
        public string ACCOUNT { get; set; }
        public string HOME_DEPT { get; set; }
        public string HOME_LOC { get; set; }
        public string HOME_BUGL { get; set; }
        public string HOME_POOL { get; set; }
        public string WORK_DEPT { get; set; }
        public string WORK_LOC { get; set; }
        public string WORK_BUGL { get; set; }
        public string WORK_POOL { get; set; }
        public string RSC { get; set; }
        public string PROJ_TRANS_TYPE { get; set; }
        public string PROJ_TRANS_CODE { get; set; }
        public Nullable<decimal> QUANTITY_YTD { get; set; }
        public Nullable<decimal> AMOUNT_YTD { get; set; }
        public string WPD { get; set; }
        public string BULK_ALCTN_CD7 { get; set; }
        public string CLASS_CD { get; set; }
        public string AFFILIATE { get; set; }
        public virtual MctrLineItem MCTR_LINE_ITEM { get; set; }
    }
}
