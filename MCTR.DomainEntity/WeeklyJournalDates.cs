using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
    public class WeeklyJournalDates
    {
        public DateTime date_journal { get; set; }
        public int mctr_ttl_count { get; set; }
        public int mctr_eot_count { get; set; }
    }
}
