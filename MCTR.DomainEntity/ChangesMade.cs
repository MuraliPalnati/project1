using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
    public class ChangesMade
    {
        public string EMPL_NAME { get; set; }
        public string EMPL_BEMS { get; set; }
       public string DATE_CHANGE_MADE { get; set; }
   

        public string ACTION { get; set; }

        public string FIELD_CHANGED { get; set; }

        public string VALUE_OLD { get; set; }

        public string VALUE_NEW { get; set; }

        public string CHGD_BY_BEMS { get; set; }

        public string CHGD_BY_LNAME { get; set; }


    }
}
