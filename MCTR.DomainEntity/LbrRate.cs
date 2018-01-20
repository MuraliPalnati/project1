using System;
using System.Data.Entity;

using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace MCTR.DomainEntity
{
  public class LbrRate  : Global {
        

        public string SETID { get; set; }
        public short FISCAL_YEAR { get; set; }
        public string LABOR_RATE_CD7 { get; set; }
        public string PROJ_TRANS_CODE { get; set; }
        public Nullable<decimal> RATE { get; set; }
        public string RespMsg { get; set; }
        public string CASCADE_FLG { get; set; }
        public IDictionary<string, int> lbrCount { get; set; }
        public int v_count { get; set; }

        public int count { get; set; }

        [Range(2000, 2099, ErrorMessage = "year must be between 2000 and 2099")]
        public int? f_year { get; set; }
        public double? sumrates { get; set; }
    }
}
