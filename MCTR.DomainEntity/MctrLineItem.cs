using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MCTR.DomainEntity;

namespace MCTR.DomainEntity
{
    public class MctrLineItem
    {
        public MctrLineItem()
        {
            this.MctrOverhd = new HashSet<MctrOverhd>();
            this.MctrPerBackup = new HashSet<MctrPerBackup>();
            this.MctrTtdBackup = new HashSet<MctrTtdBackup>();
        }
       
        public int MCTR_NO { get; set; }
        public short LINE_NO { get; set; }
        public Nullable<System.DateTime> PERIOD_FROM { get; set; }
        public Nullable<System.DateTime> PERIOD_TO { get; set; }
        public string TTD_FLAG { get; set; }
        public string PER_FLAG { get; set; }
        public string BEMS_1 { get; set; }
        public string APPR_CD_1 { get; set; }
        public Nullable<System.DateTime> DATE_APPR_1 { get; set; }
        public string BEMS_2 { get; set; }
        public string APPR_CD_2 { get; set; }
        public Nullable<System.DateTime> DATE_APPR_2 { get; set; }
        public string BEMS_3 { get; set; }
        public string APPR_CD_3 { get; set; }
        public Nullable<System.DateTime> DATE_APPR_3 { get; set; }
        public string ACTIVITY_ID_FROM { get; set; }
        public string PROJECT_ID_FROM { get; set; }
        public string ACCOUNT_FROM { get; set; }
        public string BUM_CD7_FROM { get; set; }
        public string HOME_DEPT_FROM { get; set; }
        public string HOME_LOC_FROM { get; set; }
        public string HOME_BUGL_FROM { get; set; }
        public string HOME_POOL_FROM { get; set; }
        public string LABOR_RATE_CD7_FROM { get; set; }
        public string CLASS_CD_FROM { get; set; }
        public string CUST_TYPE_CD7_FROM { get; set; }
        public string WORK_DEPT_FROM { get; set; }
        public string WORK_LOC_FROM { get; set; }
        public string WORK_BUGL_FROM { get; set; }
        public string WORK_POOL_FROM { get; set; }
        public string RSC_FROM { get; set; }
        public string PROJ_TRANS_TYPE_FROM { get; set; }
        public string PROJ_TRANS_CODE_FROM { get; set; }
        public string STAT_CODE_FROM { get; set; }
        public string UOM_FROM { get; set; }
        public string OH_BASE_YR_FROM { get; set; }

        public string BULK_ALCTN_CD7_FROM { get; set; }
        public string WPD_ID7_FROM { get; set; }
        public Nullable<decimal> QUANTITY_FROM { get; set; }
        public Nullable<decimal> AMOUNT_FROM { get; set; }
        public Nullable<decimal> ADJUSTMENT_FROM { get; set; }
        public string ACTIVITY_ID_TO { get; set; }
        public string PROJECT_ID_TO { get; set; }
        public string ACCOUNT_TO { get; set; }
        public string BUM_CD7_TO { get; set; }
        public string HOME_DEPT_TO { get; set; }
        public string HOME_LOC_TO { get; set; }
        public string HOME_BUGL_TO { get; set; }
        public string HOME_POOL_TO { get; set; }
        public string LABOR_RATE_CD7_TO { get; set; }
        public string CLASS_CD_TO { get; set; }
        public string CUST_TYPE_CD7_TO { get; set; }
        public string WORK_DEPT_TO { get; set; }
        public string WORK_LOC_TO { get; set; }
        public string WORK_BUGL_TO { get; set; }
        public string WORK_POOL_TO { get; set; }
        public string RSC_TO { get; set; }
        public string PROJ_TRANS_TYPE_TO { get; set; }
        public string PROJ_TRANS_CODE_TO { get; set; }
        public string STAT_CODE_TO { get; set; }
        public string UOM_TO { get; set; }
        public Nullable<short> OH_BASE_YR_TO { get; set; }
        public Nullable<decimal> QUANTITY_TO { get; set; }
        public Nullable<decimal> AMOUNT_TO { get; set; }
        public Nullable<decimal> ADJUSTMENT_TO { get; set; }
        public string MTL_JRNL { get; set; }
        public string CONTRACT_NUM_FROM { get; set; }
        public string CONTRACT_NUM_TO { get; set; }
        public string BUM_CD7_TO_ORIG { get; set; }
        public string WPD_FROM { get; set; }
        public string WPD_TO { get; set; }
        public string BULK_FROM { get; set; }
        public string BULK_TO { get; set; }
        public string CAUSAL_ID_FROM { get; set; }
        public string CAUSAL_ID_TO { get; set; }
        public string ESTMTG_PRICG_CD_FROM { get; set; }
        public string ESTMTG_PRICG_CD_TO { get; set; }
        public string PO_ID_FROM { get; set; }
        public string PO_ID_TO { get; set; }
        public string PART_NO_FROM { get; set; }
        public string PART_NO_TO { get; set; }
        public string EPACS_CTT_FROM { get; set; }
        public string EPACS_CTT_TO { get; set; }
        public string SHOP_ORDER_FROM { get; set; }
        public string SHOP_ORDER_TO { get; set; }
        public string PO_LINE_FROM { get; set; }
        public string PO_LINE_TO { get; set; }
        public string ACTY_RED_FLG_FROM { get; set; }
        public string ACTY_RED_FLG_TO { get; set; }
        public string DEPT_RED_FLG_FROM { get; set; }
        public string DEPT_RED_FLG_TO { get; set; }
        public string WORK_DEPT_RED_FLG_FROM { get; set; }
        public string WORK_DEPT_RED_FLG_TO { get; set; }
        public Nullable<decimal> MATERIAL_QUANTITY_FROM { get; set; }
        public Nullable<decimal> MATERIAL_QUANTITY_TO { get; set; }
        public string AFFILIATE_FROM { get; set; }
        public string AFFILIATE_TO { get; set; }
        public string tag { get; set; }
        public string FYEAR { get; set; }

        //public virtual MctrHeader MCTR_HEADER { get; set; }
        public virtual Role MCTR_ROLE { get; set; }
        public virtual Role MCTR_ROLE1 { get; set; }
        public virtual Role MCTR_ROLE2 { get; set; }
        public virtual ICollection<MctrOverhd> MctrOverhd { get; set; }
        public virtual ICollection<MctrPerBackup> MctrPerBackup { get; set; }
        public virtual ICollection<MctrTtdBackup> MctrTtdBackup { get; set; }
        //MctrRpMasterV
        //public decimal FISCAL_YEAR { get; set; }
        //public decimal ACCOUNTING_PERIOD { get; set; }
        public string OVRHD_BASE_YR_CD7 { get; set; }
        //public string ANALYSIS_TYPE { get; set; }
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
        //public string AFFILIATE { get; set; }
        public Nullable<decimal> YTD_QUANTITY7 { get; set; }
        public Nullable<decimal> YTD_DOMESTIC_AMT7 { get; set; }
        //public Nullable<decimal> TTD_QUANTITY7 { get; set; }
        //public Nullable<decimal> TTD_DOMESTIC_AMT7 { get; set; 
        public string  SETID { get; set; }
        public DateTime COW { set; get; }
        public decimal OH_AMT_FROM {set;get;}
        public decimal OH_AMT_TO {set;get; }
        public string activityStatus { get; set; }
        public IDictionary<string, string> flagValidations { get; set; }
        public string projectStatus { get; set; }
        public string deptStatus { get; set; }

    }
}
