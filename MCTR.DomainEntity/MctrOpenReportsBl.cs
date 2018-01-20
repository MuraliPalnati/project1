using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
    public class MctrOpenReportsBl : Global
    {
        //text box for business unit
        public string f_bu { get; set; }
        //server name 
        public string reportserver_name { get; set; }



        // domains added for download to excel.

        //header 
        public int MCTR_NO { get; set; }
        public string TITLE { get; set; }
        public Nullable<System.DateTime> DATE_ENTER { get; set; }
        public string BEMS_ORIG { get; set; }
        public string STATUS_ID { get; set; }
        public string BEMS_FIN_CTL { get; set; }

        //line item

        public Nullable<decimal> AMOUNT_FROM { get; set; } //o_amount

        public string PROJ_TRANS_TYPE_FROM { get; set; } //o_ptt




        public string fin_ctl_full_name { get; set; }

        public string fin_ctl_phone { get; set; }

        public string originator_full_name { get; set; }

        public string originator_phone { get; set; }

        public string status_descr { get; set; }

        public System.DateTime status_date { get; set; }
        public string intray_name { get; set; }
        public string intray_phone { get; set; }

        public int days { get; set; }

        public int lines { get; set; }
    }
}
