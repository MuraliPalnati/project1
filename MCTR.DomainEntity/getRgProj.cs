using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
   public class getRgProj
    {
        public string BUSINESS_UNIT_GL { get; set; }
        public string ACTIVITY_ID { get; set; }
        public string PROJECT_ID { get; set; }
        public System.DateTime ACC_EFF_DT { get; set; }
        public System.DateTime PROJ_EFF_DT { get; set; }

        public string DIRECT_CHRG_FLG7 { get; set; }



        public string ACCOUNT { get; set; }
        public string ACTIVITY_STATUS { get; set; }

        public string PROJECT_STATUS { get; set; }

        public string BUS_UNIT_MGMT_CD7 { get; set; }
        public string CUSTOMER_TYPE_CD7 { get; set; }
        public string CONTRACT_NUM { get; set; }

        //From Params
        public string WORK_BUGL_FROM { get; set; }
        public string ACTIVITY_ID_FROM { get; set; }
        public string PROJECT_ID_FROM { get; set; }
        public string ACCOUNT_FROM { get; set; }
        public string BUM_CD7_FROM { get; set; }
        public string CUST_TYPE_CD7_FROM { get; set; }
        public string CONTRACT_NUM_FROM { get; set; }

        //To Params
        public string WORK_BUGL_TO { get; set; }
        public string ACTIVITY_ID_TO { get; set; }
        public string PROJECT_ID_TO { get; set; }
        public string ACCOUNT_TO { get; set; }
        public string BUM_CD7_TO { get; set; }
        public string CUST_TYPE_CD7_TO { get; set; }
        public string CONTRACT_NUM_TO { get; set; }

    }
}
