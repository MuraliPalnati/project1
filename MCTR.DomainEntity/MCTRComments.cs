using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{

    public partial class MCTRComments
    {
        public int MCTR_NO { get; set; }
        public short LINE_ITEM { get; set; }
        public string BEMS { get; set; }
        public Nullable<System.DateTime> DATE_ENTERED { get; set; }
        public string COMMENTS { get; set; }

        public string LAST_NAME { get; set; }
        public string FIRST_NAME { get; set; }
    }
}
