using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
  public  class MctrHeader : Global
    {
        public int MCTR_NO { get; set; }
        public string TITLE { get; set; }
        public Nullable<System.DateTime> DATE_ENTER { get; set; }
        public Nullable<short> FISCAL_YEAR { get; set; }
        public Nullable<System.DateTime> DATE_JOURNAL { get; set; }
        
        public string APPL_JRNL_ID { get; set; }
        public string JV_ITEM_CD { get; set; }
        public string BEMS_ORIG { get; set; }
        public string STATUS_ID { get; set; }
        public string BEMS_SUPER { get; set; }
        public string BEMS_FIN_CTL { get; set; }
        public string BEMS_ACCT { get; set; }
        public string BEMS_COST_ACCT { get; set; }
        public string BEMS_MATL_ACCT { get; set; }
        public string BEMS_SR_ACCT { get; set; }
        public string APPR_CD_SUPER { get; set; }
        public string APPR_CD_FIN_CTL { get; set; }
        public string APPR_CD_ACCT { get; set; }
        public string APPR_CD_COST_ACCT { get; set; }
        public string APPR_CD_MATL_ACCT { get; set; }
        public string APPR_CD_SR_ACCT { get; set; }
        public Nullable<System.DateTime> DATE_APPR_SUPER { get; set; }
        public Nullable<System.DateTime> DATE_APPR_FIN_CTL { get; set; }
        public Nullable<System.DateTime> DATE_APPR_ACCT { get; set; }
        public Nullable<System.DateTime> DATE_APPR_COST_ACCT { get; set; }
        public Nullable<System.DateTime> DATE_APPR_MATL_ACCT { get; set; }
        public Nullable<System.DateTime> DATE_APPR_SR_ACCT { get; set; }
        public string JUSTIFICATION { get; set; }
        public string ORIG_BU { get; set; }
        public string ORIG_GROUP { get; set; }
        public string REASON_CODE { get; set; }
        public string PREVENTATIVE_MEASURES { get; set; }
        public string BEMS_LBR_ACCT { get; set; }
        public string APPR_CD_LBR_ACCT { get; set; }
        public Nullable<System.DateTime> DATE_APPR_LBR_ACCT { get; set; }

        public string AMOUNT_FROM { get; set; }

        public string AMOUNT_To { get; set; }

        public string LineFrom { get; set; }
        public string LineTo { get; set; }
        public string QUANTITY_FROM { get; set; }

        public int QUANTITY_TO { get; set; }



    }
}
