using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
    public class TransTypeEdit
    {
        public TransType Row { get;set; }
        public TransType EditedRow { get; set; }

        public IDictionary<string, int> TransCount { get; set; }
    }
}
