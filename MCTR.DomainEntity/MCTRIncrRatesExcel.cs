using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
     public class MCTRIncrRatesExcel
    {
        public string CMPON_CD { get; set; }
        public int FISCAL_YEAR { get; set; }
        public string RSC_POOL { get; set; }
        public double RATE { get; set; }
    }
}
