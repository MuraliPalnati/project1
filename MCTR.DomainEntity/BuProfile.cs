using System.Collections.Generic;
using System.ComponentModel;

namespace MCTR.DomainEntity
{
  public class BuProfile : Global {

        [DisplayName("BusinessUnit")]
    	public string Business_Unit { set; get; }
        [DisplayName("BulkFlg")]
        public string Bulk_Flg { set; get; }
        [DisplayName("RscLbrFlg")]
        public string Rsc_Lbr_Flg { set; get; }
        [DisplayName("ClsVdtFlg")]
        public string Cls_Vdt_Flg { set; get; }
        [DisplayName("RejectFlg")]
        public string Reject_Flg { set; get; }
        [DisplayName("ManRatedFlg")]
        public string Man_Rated_Flg { set; get; }
        [DisplayName("PyrOnlyFlg")]
        public string Pyr_Only_Flg { set; get; }
        [DisplayName("OffsetActivity")]
        public string Offset_Activity { set; get; }
        [DisplayName("OffsetProject")]
        public string Offset_Project { set; get; }
        [DisplayName("OffsetAccount")]
        public string Offset_Account { set; get; }
        [DisplayName("BemsAdmin")]
        public string Bems_Admin { set; get; }
        [DisplayName("LastName")]
        public string LastName { set; get; }

        public IDictionary<string, int> V_Count { get; set; }
        public IDictionary<string, int> BuCount { get; set; }

    }
}
