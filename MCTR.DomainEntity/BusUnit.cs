using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
   public class BusUnit
    {
     
        public string business_unit { set; get; }

        public string group_cd7 { set; get; }
    
        public string descr { set; get; }

        public DateTime? effdt { set; get; }
        public string eff_status { set; get; }


    }
}
