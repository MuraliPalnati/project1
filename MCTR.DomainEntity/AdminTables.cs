using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
   public class AdminTables : Global
    {
        public string mctrselect { get; set; }
        public string BusinessGroup { get; set; }
        public string BusinessUnit { get; set; }
        public string roleaccess { get; set; }
        public string useraccess { get; set; }

        public string JournalDate { get; set; }
        public string SessionBems { get; set; }
        public Nullable<int> f_days { get; set; }
        public IEnumerable<Notification2> notification2 { get; set; }
        public IEnumerable<CurrentStateExcel> currentstate { get; set; }
        public IEnumerable<AdminReportsExcel> AdminReports { get; set; }
        public IEnumerable<Inactivations> inactivations { get; set; }
        public IEnumerable<WeeklyReportsExcel> Weeklyreports { get; set; }
        public IEnumerable<AuthBuExcel> AuthBureports { get; set; }
        public IEnumerable<ChangesMade> changesmade { get; set; }
        public IEnumerable<ActiveState> Activestate { get; set; }
        public IEnumerable<RoleModification> Rolemodification { get; set; }
        public IEnumerable<Activeuser> activeuser { get; set; }
    }
}
