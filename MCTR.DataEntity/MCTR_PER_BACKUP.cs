//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MCTR.DataEntity
{
    using System;
    using System.Collections.Generic;
    
    public partial class MCTR_PER_BACKUP
    {
        public int MCTR_NO { get; set; }
        public short LINE_NO { get; set; }
        public short SEQ_NO { get; set; }
        public Nullable<short> FISCAL_YEAR { get; set; }
        public Nullable<byte> ACCOUNTING_PERIOD { get; set; }
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
    
        public virtual MCTR_LINE_ITEM MCTR_LINE_ITEM { get; set; }
    }
}
