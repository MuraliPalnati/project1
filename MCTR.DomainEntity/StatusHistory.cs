using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
   public class StatusHistory
    {
       public IEnumerable<StatusHistHeader> SHHeader { get; set; }
        public IEnumerable<StatHistBl> SHBody{ get; set; }

        public int MCTRNO;
    }
}
