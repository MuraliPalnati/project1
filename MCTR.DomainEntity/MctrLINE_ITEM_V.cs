using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
   public class MctrLINE_ITEM_V
    {
        public string HOME_BUGL { get; set; }
        public string MyProperty { get; set; }
        public string HOME_DEPT { get; set; }
        public string HOME_LOC { get; set; }
        public string HOME_POOL { get; set; }
        public string WORK_BUGL { get; set; }
        public string WORK_DEPT { get; set; }
        public string WORK_LOC { get; set; }

        public string WORK_POOL { get; set; }
        public string PROJ_TRANS_CODE { get; set; }
        public string PROJ_TRANS_TYPE { get; set; }
        public string RSC { get; set; }
        public string AFFILIATE { get; set; }
       

        public int OH_BASE_YEAR { get; set; }
        public int LI_AMOUNT { get; set; }
        public int MCTR_NO { get; set; }
        public char FROM_TO { get; set; }
        public Decimal SUM_LI_AMOUNT { get; set; }

    }
}
