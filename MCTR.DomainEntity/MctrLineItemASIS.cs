using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MCTR.DomainEntity;

namespace MCTR.DomainEntity
{
    public class MctrLineItemASIS
    {
       

        //public int MCTR_NO { get; set; }
        public Nullable<short> LINE_NO { get; set; }
        public string ALT_JRNL { get; set; }
        public string FROM_TO { get; set; }       
        public string ACTIVITY_ID { get; set; }
        public string WORK_BUGL { get; set; }
        public string PROJECT_ID { get; set; }
        public string CONTRACT_NUM { get; set; }
        public string ACCOUNT { get; set; }
        public string BUM_CD { get; set; }               
        public string CUST_TYPE_CD { get; set; }
        public string BUM_CD7_TO_ORIG { get; set; }
        public string PTT { get; set; }
        public string PTC { get; set; }
        public string STAT_CODE{ get; set; }
        public string UOM { get; set; }
        public string AFFILIATE { get; set; }
        public string HOME_DEPT { get; set; }
        public string HOME_LOC { get; set; }
        public string HOME_BUGL { get; set; }
        public string HOME_POOL { get; set; }
        public string LABOR_RATE_CD { get; set; }
        public string CLASS_CD { get; set; }       
        public string WORK_DEPT { get; set; }
        public string WORK_LOC { get; set; }
        public string WORK_POOL { get; set; }
        public string RSC { get; set; }
        public string WPD { get; set; }
        public string BULK_ALCTN_CD { get; set; }
        public Nullable<short> OH_BASE_YR { get; set; }
        public string CAUSAL_ID { get; set; }
        public string ESTMTG_PRICG_CD{ get; set; }
        public string PO_ID { get; set; }
        public string PO_LINE { get; set; }
        public string PART_NO { get; set; }               
        public string EPACS_CTT { get; set; }
        public string SHOP_ORDER { get; set; }
        public Nullable<decimal> mtl_qty { get; set; }
        public Nullable<decimal> QUANTITY { get; set; }
        public Nullable<decimal> AMOUNT { get; set; }
        public Nullable<decimal> ADJUSTMENT { get; set; }
        public string GLPC_Backup_TTD { get; set; }
        public string GLPC_Backup_Year { get; set; }

    }
}
