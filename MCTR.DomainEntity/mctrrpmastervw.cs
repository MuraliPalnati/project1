using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
    public class mctrrpmastervw
    {
        public decimal FISCAL_YEAR { get; set; }
        public decimal ACCOUNTING_PERIOD { get; set; }
        public string OVRHD_BASE_YR_CD7 { get; set; }
        public string ANALYSIS_TYPE { get; set; }
        public string ACCOUNT { get; set; }
        public string PROJECT_ID { get; set; }
        public string ACTIVITY_ID { get; set; }
        public string RESOURCE_SUB_CAT { get; set; }
        public string WPD_ID7 { get; set; }
        public string PROJ_TRANS_TYPE { get; set; }
        public string PROJ_TRANS_CODE { get; set; }
        public string DEPTID { get; set; }
        public string DEPTID_FROM { get; set; }
        public string WORK_LOCATION_CD7 { get; set; }
        public string HOME_LOCATION_CD7 { get; set; }
        public string BUS_UNIT_GL_FROM { get; set; }
        public string BUSINESS_UNIT_GL { get; set; }
        public string BULK_ALCTN_CD7 { get; set; }
        public string CLASS_CD7 { get; set; }
        public string AFFILIATE { get; set; }
        public Nullable<decimal> YTD_QUANTITY7 { get; set; }
        public Nullable<decimal> YTD_DOMESTIC_AMT7 { get; set; }
        public Nullable<decimal> TTD_QUANTITY7 { get; set; }
        public Nullable<decimal> TTD_DOMESTIC_AMT7 { get; set; }
    }
}
