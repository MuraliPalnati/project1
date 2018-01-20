using System;
using System.Collections.Generic;

namespace MCTR.DomainEntity
{
  public class MctrCompRates : Global
    {

        public string CMPON_CD { get; set; }
        public short FISCAL_YEAR { get; set; }
        public string RSC_INPUT { get; set; }
        public string CUST_TYPE_INPUT { get; set; }
        public string BUM_INPUT { get; set; }
        public string RSC_OUTPUT { get; set; }
        public string POOL_OUTPUT { get; set; }
        public short COMP_SEQ { get; set; }
        public Nullable<decimal> RATE_OUTPUT { get; set; }
        public string RATE_I_RSC_POOL { get; set; }
        public Nullable<decimal> RATE_I { get; set; }
        public string INCL_BASE { get; set; }
        public Nullable<short> BASE_AMT { get; set; }
        public string RATE_1_RSC_POOL { get; set; }
        public Nullable<decimal> RATE_1 { get; set; }
        public string RATE_2_RSC_POOL { get; set; }
        public Nullable<decimal> RATE_2 { get; set; }
        public string RATE_3_RSC_POOL { get; set; }
        public Nullable<decimal> RATE_3 { get; set; }
        public string RATE_4_RSC_POOL { get; set; }
        public Nullable<decimal> RATE_4 { get; set; }
        public string RATE_5_RSC_POOL { get; set; }
        public Nullable<decimal> RATE_5 { get; set; }
        public string RATE_6_RSC_POOL { get; set; }
        public Nullable<decimal> RATE_6 { get; set; }
        public string RATE_7_RSC_POOL { get; set; }
        public Nullable<decimal> RATE_7 { get; set; }
        public string RATE_8_RSC_POOL { get; set; }
        public Nullable<decimal> RATE_8 { get; set; }
        public string RATE_9_RSC_POOL { get; set; }
        public Nullable<decimal> RATE_9 { get; set; }
        public string CASCADE_FLG { get; set; }
        public Nullable<decimal> RATE_OVERRIDE { get; set; }



        // added domain entities.
        public Nullable<int> fyear { get; set; }

        public string copy_from_bu { get; set; }
        public int copy_from_yr { get; set; }
        public string copy_from_pl_rsc { get; set; }
        public string copy_to_bu { get; set; }
        public int copy_to_yr { get; set; }
        public string copy_to_pl_rsc { get; set; }

        public int v_lbr_from_flg { get; set; }


        // added to get the count 

        public int v_count_circular { get; set; }

        public string v_check_circular { get; set; }


        public int v_count { get; set; }
        public string v_same { get; set; }

        public int? f_year { get; set; }

        public IDictionary<string, int?> Count { get; set; }
    }
}
