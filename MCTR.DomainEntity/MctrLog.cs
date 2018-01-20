using System;
using System.ComponentModel;

namespace MCTR.DomainEntity
{
  public class MctrLog {

    	public string   Bems_Orig_New   { set; get; }

    	public string   reason          { set; get; }

    	public string   Bems_Admin      { set; get; }

    	public DateTime Date_Changed    { set; get; }

        
        public bool     IsEnabled       { get; set; }

        public int      Mctr_No         { get; set; }
        [DisplayName("Status")]
        public string   Status_Id       { get; set; }

        public string   Bems_Orig       { get; set; }

        public string   RespMsg         { get; set; }

    }
}
