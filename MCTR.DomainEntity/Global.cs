using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
    public class Global
    {
        public string Hold_Text { get; set; }
        public string AdminName { get; set; }
        public string session_bems { get; set; }
        public string Hold_Activity { get; set; }
        public string Hold_Project { get; set; }

        public string Hold_Account { get; set; }

        // added map the ip address of the user
        public string ip { get; set; }
    }
}
