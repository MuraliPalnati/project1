using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
    public class TransType : Global
    {         
       

        [Required]
        [DisplayName("Bus Unit")]
        [StringLength(2)]
        ///Accepts input only in upper case.
        public string CMPON_CD { get; set; }


        [Required]
        [DisplayName("Proj Trans Type")]
        [StringLength(3)]
        ///Accepts input only in upper case.
        public string PROJ_TRANS_TYPE { get; set; }


        [Required]
        [DisplayName("Proj Trans Code")]
        [StringLength(3)]
        ///Accepts input only in upper case.
        public string PROJ_TRANS_CODE { get; set; }


        [Required]
        [DisplayName("Stat Code")]
        [StringLength(3)]
        ///Accepts input only in upper case.
        public string STATISTICS_CODE { get; set; }


        [Required]
        [DisplayName("Unit Of Measure")]
        [StringLength(3)]
        ///Accepts input only in upper case.
        public string UNIT_OF_MEASURE { get; set; }




        public bool role { get; set; }
        public int v_count { get; set; }
        //public string ResponseMessage { get; set; }
        //public bool IsEnabled { get; set; }
        //public string BemsID { get; set; }

        public IDictionary<string, int> TransCount { get; set; }




    }
}
