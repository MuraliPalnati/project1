using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
    public class MctrOverhd
    {
        public int MCTR_NO { get; set; }
        public short LINE_NO { get; set; }
        public string FROM_TO { get; set; }
        public short LINE_NO_OH { get; set; }
        public string ACTIVITY_ID_FROM { get; set; }
        public string PROJECT_ID_FROM { get; set; }
        public string ACCOUNT_FROM { get; set; }
        public string BUM_CD7_FROM { get; set; }
        public string CUS_TYPE_CD7_FROM { get; set; }
        public string HOME_DEPT_FROM { get; set; }
        public string HOME_LOC_FROM { get; set; }
        public string HOME_BUGL_FROM { get; set; }
        public string HOME_POOL_FROM { get; set; }
        public string LABOR_RATE_CD7_FROM { get; set; }
        public string CLASS_CD_FROM { get; set; }
        public string WORK_DEPT_FROM { get; set; }
        public string WORK_LOC_FROM { get; set; }
        public string WORK_BUGL_FROM { get; set; }
        public string WORK_POOL_FROM { get; set; }
        public string RSC_FROM { get; set; }
        public string PROJ_TRANS_TYPE_FROM { get; set; }
        public string PROJ_TRANS_CODE_FROM { get; set; }
        public string STAT_CODE_FROM { get; set; }
        public string UOM_FROM { get; set; }
        public Nullable<short> OH_BASE_YR_FROM { get; set; }
        public Nullable<decimal> QUANTITY_FROM { get; set; }
        public Nullable<decimal> AMOUNT_FROM { get; set; }
        public string WPD_FROM { get; set; }
        public string BULK_ALCTN_CD7 { get; set; }
        public string AFFILIATE_FROM { get; set; }

        public virtual MctrLineItem MCTR_LINE_ITEM { get; set; }
    }
}
