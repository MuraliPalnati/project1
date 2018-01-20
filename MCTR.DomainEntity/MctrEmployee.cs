using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
   public  class MctrEmployee
    {
        [DisplayName("Bems ID")]
        public string BEMS_ID { get; set; }
        [DisplayName("Frist Name")]
        public string FIRST_NAME { get; set; }
        [DisplayName("Middle Name")]
        public string MIDDLE_INT { get; set; }
        [DisplayName("Last Name")]
        public string LAST_NAME { get; set; }
        [DisplayName("Component")]
        public string COMPONENT { get; set; }
        [DisplayName("Busines Unit")]
        public string BUS_UNIT { get; set; }
        [DisplayName("Division")]
        public string DIVISION { get; set; }
        [DisplayName("Dept No")]
        public string DEPTNO { get; set; }
        [DisplayName("Employee Status")]
        public string EMP_STATUS { get; set; }
        [DisplayName("Contract Vendor Code")]
        public string CONTRACT_VENDOR_CODE { get; set; }
        [DisplayName("Location")]
        public string LOCATION { get; set; }
        [DisplayName("Manager ID")]
        public string MGR_ID { get; set; }
        [DisplayName("HR Manager Last Name")]
        public string HR_MGR_LAST_NAME { get; set; }
        [DisplayName("HR Manager Frist Name")]
        public string HR_MGR_FIRST_NAME { get; set; }
        [DisplayName("Accounting BU NM")]
        public string ACCTG_BUS_UNIT_NM { get; set; }
        [DisplayName("Accounting Dept NM")]
        public string ACCT_DEPT_NM { get; set; }
        [DisplayName("Stable Email")]
        public string STABLE_EMAIL { get; set; }
        [DisplayName("Dept NMW")]
        public string DEPT_NMW { get; set; }
        [DisplayName("Accounting Location CDM")]
        public string ACCTG_LOC_CDM { get; set; }
        [DisplayName("LA Manager ID Bems")]
        public string LA_MGR_ID_BEMS { get; set; }
        [DisplayName("LA Manager last Name")]
        public string LA_MGR_LAST_NAME { get; set; }
        [DisplayName("LA Manager Frist Name")]
        public string LA_MGR_FIRST_NAME { get; set; }
        [DisplayName("Work Phone ")]
        public string WORK_PHONE { get; set; }
        [DisplayName(" Mail Code")]
        public string MAIL_CODE { get; set; }
    }
}
