using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
    public class MctrCompRatesExcel
    {
        public string CMPON_CD { get; set; }
        public short FISCAL_YEAR { get; set; }
        public string RSC_INPUT { get; set; }
      //  public string CUST_TYPE_INPUT { get; set; }
        public string BUM_INPUT { get; set; }
        public string RSC_OUTPUT { get; set; }
        public string POOL_OUTPUT { get; set; }
        public short COMP_SEQ { get; set; }
       // public Nullable<decimal> RATE_OUTPUT { get; set; }
        public string RATE_I_RSC_POOL { get; set; }
        public Nullable<decimal> RATE { get; set; }
     
    }
}
