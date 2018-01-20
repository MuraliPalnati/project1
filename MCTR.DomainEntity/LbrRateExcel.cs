using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
  public  class LbrRateExcel
    {
        public string SETID { get; set; }
        public short FISCAL_YEAR { get; set; }
        public string LABOR_RATE_CD7 { get; set; }
        public string PROJ_TRANS_CODE { get; set; }
        public Nullable<decimal> RATE { get; set; }
    }
}
