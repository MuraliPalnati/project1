using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
    public class MctrBusUnit :Global
    {
        public string business_unit { get; set; }
        public System.DateTime effdt { get; set; }
        public string eff_status { get; set; }
        public string descr { get; set; }
        public string group_cd7 { get; set; }
        public string op_segment_7 { get; set; }
    }
}
