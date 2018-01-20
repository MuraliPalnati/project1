using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace MCTR.DomainEntity
{
    public class MCTRJobStatus
    {
        [Required]
        public string Job_Status { set; get; }
        [Required]
        public DateTime Eff_Date_From { set; get; }
        [Required]
        public DateTime Eff_Date_Thru { set; get; }
        [Required]
        public string reason { set; get; }
        [Required]
        public string Bems_Admin { set; get; }

        public DateTime Date_Entered { set; get; }
        [Required]
        public string job_Id { set; get; }
       
        public string RespMsg { set; get; }
       


    }
}