using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
    public class MctrRptsAdmnBl
    {
        public string OrigBu { set; get; }
        public string SessionBems { get; set; }
        public IEnumerable<BusUnit> BUGroups { get; set; }
    }
}
