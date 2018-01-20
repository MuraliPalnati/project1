using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
    public class HeaderExcel
    {
        [DisplayName("MCTR No")]
        public int MCTR_NO { get; set; }
        [DisplayName("Title")]
        public string TITLE { get; set; }
        [DisplayName("BU")]
        public string ORIG_BU { get; set; }
        [DisplayName("Grp")]
        public string ORIG_GROUP { get; set; }
        [DisplayName("OH Base Year")]
        public Nullable<short> FISCAL_YEAR { get; set; }
        [DisplayName("Rs Cd")]
        public string REASON_CODE { get; set; }
        [DisplayName("Rs Desc")]
        public string REASON_DESCR { get; set; }
        [DisplayName("Current Status")]

        public string STATUS_ID { get; set; }
        [DisplayName("Current Status Desc")]

        public string STATUS_DESCR { get; set; }
        [DisplayName("Date Enter")]

        public string DATE_ENTER { get; set; }
        [DisplayName("Date Journal")]

        public string DATE_JOURNAL { get; set; }
        [DisplayName("Appl Jrnl Id")]

        public string APPL_JRNL_ID { get; set; }
        [DisplayName("JV Item Cd")]
        public string JV_ITEM_CD { get; set; }
        [DisplayName("Originator Bems")]
        public string BEMS_ORIG { get; set; }
        [DisplayName("Originator Name")]

        public string bems_orig_name { get; set; }

        public string FIRST_NAME { get; set; }

        public string LAST_NAME { get; set; }

        public string MIDDLE_INT { get; set; }
        [DisplayName("Lines Fr")]

        public Nullable<int> Lines_Fr { get; set; }
        [DisplayName("Lines Hours Fr")]

        public Nullable<decimal> Lines_Hours_Fr { get; set; }
        [DisplayName("Lines Amount Fr")]

        public Nullable<decimal> Lines_Amount_Fr { get; set; }
        [DisplayName("Lines To")]

        public Nullable<int> Lines_To { get; set; }
        [DisplayName("Lines Hours To")]

        public Nullable<decimal> Lines_Hours_To { get; set; }
        [DisplayName("Lines Amount To")]

        public Nullable<decimal> Lines_Amount_To { get; set; }
        [DisplayName("Lines Total Amount")]

        public Nullable<decimal> Lines_Total_Amount { get; set; }
        [DisplayName("Offset Smry Amt")]

        public string offset_smry_amt { get; set; }
        [DisplayName("Overhead Smry Amt")]

        public string Overhead_Smry_Amt { get; set; }
        [DisplayName("Overhead Lines (Fr)")]

        public string Overhead_Lines_Fr { get; set; }
        [DisplayName("Overhead Lines (To)")]

        public string Overhead_Lines_To { get; set; }
        [DisplayName("Overhead Amount (Fr)")]

        public string Overhead_Amount_Fr { get; set; }
        [DisplayName("Overhead Amount (To)")]

        public string Overhead_Amount_To { get; set; }
        [DisplayName("BU Name")]

        public string BU_NAME { get; set; }

        public List<MctrLineItemASIS> mctrLineItemList { get; set; }

        public List<OvrhdOffsetExcel> ovrhdOffsetExcelList { get; set; }



    }
}
