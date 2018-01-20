using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
   public class WeeklyReportsExcel
    {
      public string FROM_TO { get; set; }
        public string GROUP_TAG { get; set; }
        public string STATUS_TAG { get; set; }
        public Nullable<int> MCTR_NO { get; set; }
        public string WK_NO_PRCSD { get; set; }
        public string WK_NO_CREATED { get; set; }
        public string WK_NO_ENTERED { get; set; }
        public Nullable<DateTime> DATE_TIME_HS_PRCSD { get; set; }
        public Nullable<DateTime> DATE_HS_PRCSD { get; set; }
        public Nullable<DateTime> DATE_HS_CREATED { get; set; }
        public Nullable<DateTime> DATE_ENTERED { get; set; }
        public Nullable<DateTime> DATE_JOURNAL { get; set; }
        public string STATUS_ID { get; set; }
        public string ORIG_BU { get; set; }
        public string ORIG_GROUP { get; set; }
        public string BEMS_ORIG { get; set; }
        public string NAME_BEMS_ORIG { get; set; }
        public string BEMS_SUPER { get; set; }
        public string APPR_CD_SUPER { get; set; }
        public string DATE_APPR_SUPER { get; set; }
        public string WK_NO_APPR_SUPER { get; set; }
        public string NAME_BEMS_SUPER { get; set; }
        public string BEMS_FIN_CTL { get; set; }
        public string APPR_CD_FIN_CTL { get; set; }
        public string DATE_APPR_FIN_CTL { get; set; }
        public string WK_NO_APPR_FIN_CTL { get; set; }
        public string NAME_BEMS_FIN_CTL { get; set; }
        public string BEMS_ACCT { get; set; }
        public string APPR_CD_ACCT { get; set; }
        public string DATE_APPR_ACCT { get; set; }
        public string WK_NO_APPR_ACCT { get; set; }
        public string NAME_BEMS_ACCT { get; set; }
        public string BEMS_COST_ACCT { get; set; }
        public string APPR_CD_COST_ACCT { get; set; }
        public string DATE_APPR_COST_ACCT { get; set; }
        public string WK_NO_APPR_COST_ACCT { get; set; }
        public string NAME_BEMS_COST_ACCT { get; set; }
        public string BEMS_MATL_ACCT { get; set; }
        public string APPR_CD_MATL_ACCT { get; set; }
        public string DATE_APPR_MATL_ACCT { get; set; }
        public string WK_NO_APPR_MATL_ACCT { get; set; }
        public string NAME_BEMS_MATL_ACCT { get; set; }
        public string BEMS_SR_ACCT { get; set; }
        public string APPR_CD_SR_ACCT { get; set; }
        public string DATE_APPR_SR_ACCT { get; set; }
        public string WK_NO_APPR_SR_ACCT { get; set; }
        public string NAME_BEMS_SR_ACCT { get; set; }
        public Nullable<int> OH_BASE_YEAR { get; set; }
        public string APPL_JRNL_ID { get; set; }
        public string JV_ITEM_CD { get; set; }
        public string REASON_CODE { get; set; }
        public string REASON_DESC { get; set; }
        public string TITLE { get; set; }
        public string REJECT_CODE { get; set; }
        public string REJECT_REASON { get; set; }
        public Nullable<int> LINE_NO { get; set; }
        public string PERIOD_FROM { get; set; }
        public string PERIOD_TO { get; set; }
        public string TTD_FLAG { get; set; }
        public string PER_FLAG { get; set; }
        public string BEMS_1 { get; set; }
        public string APPR_CD_1 { get; set; }
        public Nullable<DateTime> DATE_APPR_1 { get; set; }
        public string WK_NO_DATE_APPR_1 { get; set; }
        public string NAME_BEMS_1 { get; set; }
        public string BEMS_2 { get; set; }
        public string APPR_CD_2 { get; set; }
        public Nullable<DateTime> DATE_APPR_2 { get; set; }
        public string WK_NO_DATE_APPR_2 { get; set; }
        public string NAME_BEMS_2 { get; set; }
        public string BEMS_3 { get; set; }
        public string APPR_CD_3 { get; set; }
        public Nullable<DateTime> DATE_APPR_3 { get; set; }
        public string WK_NO_DATE_APPR_3 { get; set; }
        public string NAME_BEMS_3 { get; set; }
        public string ACTIVITY_ID_FROM { get; set; }
        public string PROJECT_ID_FROM { get; set; }
        public string ACCOUNT_FROM { get; set; }
        public string BUM_CD_FROM { get; set; }
        public string HOME_DEPT_FROM { get; set; }
        public string HOME_LOC_FROM { get; set; }
        public string HOME_BUGL_FROM { get; set; }
        public string HOME_POOL_FROM { get; set; }
        public string LABOR_RATE_CD_FROM { get; set; }
        public string CLASS_CD_FROM { get; set; }
        public string CUST_TYPE_CD_FROM { get; set; }
        public string WORK_DEPT_FROM { get; set; }
        public string WORK_LOC_FROM { get; set; }
        public string WORK_BUGL_FROM { get; set; }
        public string WORK_POOL_FROM { get; set; }
        public string RSC_FROM { get; set; }
        public string PROJ_TRANS_TYPE_FROM { get; set; }
        public string PROJ_TRANS_CODE_FROM { get; set; }
        public string STAT_CODE_FROM { get; set; }
        public string UOM_FROM { get; set; }
        public Nullable<int> OH_BASE_YR_FROM { get; set; }
        public Nullable<int> QUANTITY_FROM { get; set; }
        public Nullable<int> AMOUNT_FROM { get; set; }
        public Nullable<int> ADJUSTMENT_FROM { get; set; }
        public Nullable<int> AMT_PLUS_ADJ_FROM { get; set; }
        public string CONTRACT_NUM_FROM { get; set; }
        public string WPD_FROM { get; set; }
        public string BULK_FROM { get; set; }
        public string CAUSAL_ID_FROM { get; set; }
        public string ESTMTG_PRICG_CD_FROM { get; set; }
        public string PO_ID_FROM { get; set; }
        public string PART_NO_FROM { get; set; }
        public string EPACS_CTT_FROM { get; set; }
        public string SHOP_ORDER_FROM { get; set; }
        public string PO_LINE_FROM { get; set; }
        public Nullable<int> MATERIAL_QUANTITY_FROM { get; set; }
        public string ACTY_RED_FLG_FROM { get; set; }
        public string DEPT_RED_FLG_FROM { get; set; }
        public string WORK_DEPT_RED_FLG_FROM { get; set; }
        public string MTL_JRNL { get; set; }
        public string JUSTIFICATION { get; set; }
}
}
