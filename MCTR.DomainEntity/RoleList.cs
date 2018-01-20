using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MCTR.DomainEntity
{
  public class RoleList : Global
    {
        [DisplayName("BEMS")]
        public string bems   { set; get; }
        public string bems_admin { set; get; }
        public string active    { set; get; }
    	public string admin_role    { set; get; }
    	public string accountant_role    { set; get; }
    	public string lbr_acct_role    { set; get; }
    	public string matl_acct_role    { set; get; }
    	public string cost_acct_role   { set; get; }
        public string fin_control_role   { set; get; }
        public string sr_acct_role     { set; get; }
        public bool active1 { set; get; }
        public bool admin_role1 { set; get; }
        public bool accountant_role1 { set; get; }
        public bool lbr_acct_role1 { set; get; }
        public bool matl_acct_role1 { set; get; }
        public bool cost_acct_role1 { set; get; }
        public bool fin_control_role1 { set; get; }
        public bool sr_acct_role1 { set; get; }
        public string last_name     { set; get; }
    	public string first_name     { set; get; }
    	public string deptno     { set; get; }
        public string bus_unit { set; get; }
        public string component     { set; get; }
    	public string acctg_loc_cdm     { set; get; }

        [DisplayFormat(DataFormatString = "{0:dd-MMM-yyyy}")]
        public Nullable<System.DateTime> last_logon   { set; get; }
        [DisplayFormat(DataFormatString = "{0:dd-MMM-yy}")]
        public Nullable<System.DateTime> date_init_add { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd-MMM-yy}")]
        public Nullable<System.DateTime> date_update { get; set; }
        public string last_logon_days { set; get; }
        public string last_bu     { set; get; }
    	public string last_loc    { set; get; }
    	public string last_dept   { set; get; }
        public string ovrrd_grp_cd { get; set; }
        public string middle_int { get; set; }
        public string division { get; set; }
        public string emp_status { get; set; }
        public string contract_vendor_code { get; set; }
        public string location { get; set; }
        public string mgr_id { get; set; }
        public string hr_mgr_last_name { get; set; }
        public string hr_mgr_first_name { get; set; }
        public string acctg_bus_unit_nm { get; set; }
        public string acct_dept_nm { get; set; }
        public string stable_email { get; set; }
        public string dept_nmw { get; set; }
        public string la_mgr_id_bems { get; set; }
        public string la_mgr_last_name { get; set; }
        public string la_mgr_first_name { get; set; }
        public string work_phone { get; set; }
        public string mail_code { get; set; }
        public Nullable<System.DateTime> effdt { get; set; }
        public string eff_satus { get; set; }
        public string descr { get; set; }
        public string group_cd7 { get; set; }
        public string op_segment_7 { get; set; }
        public string SessionBems { get; set; }
        public string ip { get; set; }


        // public IEnumerable<MctrMessageAdmin> msgadmin { get; set; }

        public string msgadmin { get; set; }
        public bool NewRecordFlag { get; set; }

        public IDictionary<string, string> messageEnv { get; set; }

        public string accountvalid { get; set; }
    }
}
