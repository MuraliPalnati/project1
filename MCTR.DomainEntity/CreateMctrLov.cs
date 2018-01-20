using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
   public  class CreateMctrLov
    {
        public int? fiscal_year { get; set; }

        public List<int> fiscalYears { get; set; }
        public string Orig_Bu { get; set; }

        public string py_cy_status { get; set; }

        public string orig_group { get; set; }

        public Nullable<System.DateTime> EFFDT { get; set; }
        public string ACCTG_LOC_CD7 { get; set; }

        public string CLASS_CD7 { get; set; }

        public string PROJ_TRANS_TYPE { get; set; }

        
        public string DEPTID { get; set; }
        

        public string bems { get; set; }

        public string CODE { get; set; }
        public string APPROVE { get; set; }

        public string status_id { get; set; }

        public string REJECT_CODE { get; set; }
        public string REJECT_REASON { get; set; }

        public string activity_id_from { get; set; }

        public string activity_id_to { get; set; }

        public string ACTIVITY_ID { get; set; }
        public string PROJECT_ID { get; set; }

        public string project_from_prompt { get; set; }

        public string setid { get; set; }

        public string home_dept_from { get; set; }

        public string home_bugl_from { get; set; }
        public string home_bugl_to { get; set; }

        public string home_loc_from { get; set; }

        public Nullable<DateTime> cow { get; set; }

        public Nullable<DateTime> period_to { get; set; }

        public string class_cd_from { get; set; }

        public string proj_trans_type_from { get; set; }
        public string proj_trans_type_to { get; set; }

        public string work_dept_from { get; set; }
        public string work_dept_to { get; set; }

        public string work_loc_from { get; set; }

        public string RESOURCE_SUB_CAT { get; set; }

        public string WPD_ID7 { get; set; }

        public string BULK_ALCTN_CD7 { get; set; }
        public string ESTMTG_PRICG_CD7 { get; set; }

        public string BUS_UNIT_GL_FROM { get; set; }

        public string ACCOUNT { get; set; }

        public string BUSINESS_UNIT_GL { get; set; }

        public List<ReasonCode> ReasonCodes { get; set; }

        public List<MctrApplIdV> MctrApplIdV { get; set; }

        public List<getRgSuper> getRgSuper { get; set; }

        public List<getRgProj> getRgProj { get; set; }

        public List<TransType> transtype { get; set; }

        public List<mctrlocndeptmv> mctrlocndeptmv { get; set; }

        public List<mctrlocnmv> mctrlocnmv { get; set; }

        public List<mctrclasscodev> mctrclasscodev { get; set; }

        public List<mctrrscmv> mctrrscmv { get; set; }

        public List<mctrwpmasterv> mctrwpmasterv { get; set; }

        public List<mctrbulkalctnv> mctrbulkalctnv { get; set; }

        public List<mctrestmtgpricgv> mctrestmtgpricgv { get; set; }

       public List<mctrwplocdeptv> mctrwplocdeptv { get; set; }

        public List<mctrrpmastervw> mctrrpmastervw { get; set; }




    }
}
