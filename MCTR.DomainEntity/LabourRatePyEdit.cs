using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
    public class LabourRatePyEdit
    {
        public LbrRate Row { get;set; }
        public LbrRate EditedRow { get; set; }
        public IDictionary<string, int> LbrCount { get; set; }
    }
}
