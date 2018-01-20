using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
    public class MctrJrnlByDate
    {
        public string BEMS_ID { get; set; }
        public string FIRST_NAME { get; set; }

        public DateTime DATE_JOURNAL { get; set; }
        public string date { get; set; }
        public string ORIG_BU { get; set; }
        public string LAST_NAME { get; set; }
        public decimal MCTR_COUNT { get; set; }
        public string BEMS_FIN_CTL { get; set; }
        public string BEMS_ORIG { get; set; }
    }
}
