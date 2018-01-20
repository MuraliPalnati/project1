using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
    public class IncrRateEdit
    {
        public MctrIncrRates Row { get;set; }
        public MctrIncrRates EditedRow { get; set; }
        public IDictionary<string, int> IncrCount { get; set; }
    }
}
