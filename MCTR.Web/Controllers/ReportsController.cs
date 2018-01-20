﻿///*************************************************************************
/// 
/// BOEING CONFIDENTIAL
/// ___________________
/// 
///  BOEING is a trademark of Boeing Management Company.
///
///  Copyright © 2016 Boeing. All rights reserved.
/// 
/// NOTICE:  All information contained herein is, and remains
/// the property of Boeing and its suppliers, if any.  
/// The intellectual and technical concepts contained
/// herein are proprietary to Boeing and its suppliers and may be 
/// covered by U.S. and Foreign Patents, patents in process, 
/// and are protected by trade secret or copyright law.
/// Dissemination of this information or reproduction of this material
/// is strictly forbidden unless prior written permission is obtained
/// from Boeing. 
///

///************************************************************************
/// Author           : Generated by ATMA ®
/// Revision History :  
using MCTR.Web.Handlers;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Text;
using log4net;
using MCTR.DomainEntity;
using MCTR.Web.Security;
using System.Data;
namespace MCTR.Web.Controllers
{
    [CustomAuthorize]
    public class ReportsController : Controller
    {
         private readonly ILog logger;

        public ReportsController()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        }

        public FileResult selectionbutactiverolebulistwhenbuttonpressed(string BusinessGroup, string BusinessUnit)
        {

            var admintables = new AdminTables();
         
            admintables.BusinessGroup = BusinessGroup;
            admintables.BusinessUnit = BusinessUnit;
            ReportHandler reporthandlerHandler = new ReportHandler();
            logger.Debug("Executing mctrCreateFormHandler.selectionbutexceleotwhenbuttonpressed()");
            try
            {
                admintables.SessionBems = SessionPerister.BEMSID;
                var ReportResp = reporthandlerHandler.selectionbutactiverolebulistwhenbuttonpressed(admintables).ToList();
                string fileName = "xtrt-MCTR-ROLE-BU-ACTIVE-USERS-" + admintables.BusinessGroup +"-"+ admintables.BusinessUnit+"_"+DateTime.Now.ToString("yyyyMMddTHHmmss");
                var firstRow = @"MCTR ROLE AUTHORIZED BUSINESS UNITS ACTIVE USER LISTING";
                string secondRow = "\"" +@"Authorized GROUP CODE and BUSINESS UNIT Selection made:"+ "\"" ;
                string thirdRow = @"All active MCTR ROLE BU table entries listed based on business unit selected.";
                string fourthRow = @"NOTE: When no LAST_LOGON Date then DAYS_SINCE_LAST_LOGON means DAYS since MCTR ROLE table entry was last updated.";
                string lastRow = "\""+ @"SELECT DISTINCT MGR_LAST_NAME, MGR_FIRST_NAME, TO_NUMBER(SUBSTR(MGR_EMAIL,2, 7)) AS MGR_BEMS, LAST_NAME, FIRST_NAME, MIDDLE_INT, TO_NUMBER(SUBSTR(EMP_EMAIL,2, 7)) AS EMP_BEMS, EMPL_BU, EMPL_LOC, EMPL_DEPT, CHR(39) || BEMS AS EMPL_BEMS_ID, EMP_STATUS, ACTIVE, LAST_LOGON, DAYS_SINCE_LAST_LOGON, FIN_CONTROL_ROLE, ACCOUNTANT_ROLE, LBR_ACCT_ROLE, MATL_ACCT_ROLE, COST_ACCT_ROLE, SR_ACCT_ROLE, ADMIN_ROLE, DATE_INIT_ADD, DATE_UPDATE, BEMS_ADMIN AS ADMIN_BEMS_ID, AUTH_BU_GRP, AUTH_BU, AUTH_BU_DESC, AUTH_BU_ADMIN_LAST_NAME, AUTH_BU_ADMIN_FIRST_NAME, AUTH_BU_ADMIN_BEMS, MGR_EMAIL, EMP_EMAIL, DECODE(TRIM(LAST_NAME), NULL, NULL, RTRIM(TRIM(LAST_NAME) || ', ' || TRIM(FIRST_NAME) || ' ' || TRIM(MIDDLE_INT)) || ';') AS EMAIL_EMPL_NAME FROM MCTR_RPTNG_ROLE_BU_LIST_V WHERE ACTIVE = 'Y' AND AUTH_BU_GRP =" +"'"+ admintables.BusinessGroup +"'"+ " AND AUTH_BU LIKE " +"'"+ admintables.BusinessUnit +"'"+ " ORDER BY MGR_LAST_NAME, MGR_BEMS, LAST_NAME, EMP_BEMS;" + "\"";
                var result = HandlerUtil<AuthBuExcel>.AuthorizedBuData(ReportResp.First().AuthBureports.ToList(), firstRow, secondRow, thirdRow, fourthRow, lastRow,  BusinessGroup, BusinessUnit);
                return GetAdminReport(result, fileName);
            }
            catch (Exception e)
            {
                logger.Error("Error  " + e.Message);    
                throw;

            }
        }

        public FileResult selectionbutactiveuserlistwhenbuttonpressed(string roleAccess , int fDays )
        {
            var adminTables = new AdminTables();
           
            adminTables.roleaccess = roleAccess;
            adminTables.f_days = fDays;

            logger.Debug("Executing mctrCreateFormHandler.selectionbutactiveuserlistwhenbuttonpressed()");

            try
            {
                ReportHandler reporthandlerHandler = new ReportHandler();
                adminTables.SessionBems = SessionPerister.BEMSID;
                var ReportResp = reporthandlerHandler.selectionbutactiveuserlistwhenbuttonpressed(adminTables).ToList();

                switch (adminTables.roleaccess)
                {
                    case "RAU":
                        string fileNameRAU = "xtrt-MCTR-ROLE-ACTIVE-USERS_" + DateTime.Now.ToString("yyyyMMddTHHmmss");
                        var firstRowRAU = @"MCTR ROLE ALL ACTIVE USER LISTING  (AS OF";         
                        string secondRowRAU = @"Active MCTR ROLE table entries were selected based on the criteria listed below.";          
                        string lastrowRAU = "\""+ @"select distinct mgr_last_name , mgr_first_name ,   substr ( mgr_email , 2 , 7 )  as mgr_bems , last_name , first_name , middle_int ,   substr ( emp_email , 2 , 7 ) as emp_bems , empl_bu , empl_loc , empl_dept , chr ( 39 ) || bems as empl_bems_id , emp_status , active , last_logon , days_since_last_logon , fin_control_role , accountant_role , lbr_acct_role , matl_acct_role , cost_acct_role , sr_acct_role , admin_role , date_init_add , date_update , bems_admin as admin_bems_id , mgr_email , emp_email from mctr_rptng_role_bu_list_v rr where active = 'Y' and ( exists ( select * from mctr_role where bems = " + "'" + SessionPerister.BEMSID + "'" + "and admin_role = 'Y' ) or exists ( select * from mctr_message_admin where bems_id = " + "'" + SessionPerister.BEMSID + "'" + " ) ) order by mgr_last_name , mgr_bems , last_name , emp_bems " + "\"";
                        var result = HandlerUtil<Activeuser>.ConvertActiveStatedata(ReportResp.First().activeuser.ToList(), firstRowRAU, secondRowRAU ,lastrowRAU);

                        return GetAdminReport(result, fileNameRAU);


                    case "RAS":
                        string fileName = "xtrt-MCTR-ROLE-ACTIVE-STATE_" + DateTime.Now.ToString("yyyyMMddTHHmmss");
                        var firstRow = @"MCTR ROLE ACTIVE STATE USER LISTING  (AS OF ";
                        string secondRow = @"Note: Selections are based on query criteria listed below.";
                        string lastRow = "\""+ @"select distinct decode ( rtrim ( last_name ) || ', ' || rtrim ( first_name ) , ', ' , '[not found]' , rtrim ( last_name ) || ', ' || rtrim ( first_name ) ) as empl_name , bems as empl_bems , active , fin_control_role , accountant_role , lbr_acct_role , matl_acct_role , cost_acct_role , sr_acct_role , admin_role , bems_admin , date_init_add , date_update , last_logon , auth_bu_grp , '**' as emp_bu_grp_tag , decode ( auth_bu , null , 'none' , auth_bu ) as auth_abu , decode ( rtrim ( auth_bu_admin_last_name ) || ', ' || rtrim ( auth_bu_admin_first_name || ' ' || auth_bu_admin_middle_int ) , ', ' , 'no assignment' , rtrim ( auth_bu_admin_last_name ) || ', ' || rtrim ( auth_bu_admin_first_name || ' ' || auth_bu_admin_middle_int ) ) as auth_bu_admin_name , auth_bu_admin_bems , decode ( rtrim ( mgr_last_name ) || ', ' || rtrim ( mgr_first_name ) , ', ' , '[not found]' , rtrim ( mgr_last_name ) || ', ' || rtrim ( mgr_first_name ) ) as mgr_name , mgr_id , to_number ( substr ( mgr_email , 2 , 7 ) ) as mgr_email_bems , mgr_email , last_name as emp_lname , first_name as emp_fname , middle_int as emp_int , to_number ( substr ( emp_email , 2 , 7 ) ) as emp_email_bems , emp_email , empl_bu , empl_loc , empl_dept , emp_status from mctr_rptng_role_bu_list_v where active = 'Y' and ( exists ( select * from mctr_message_admin where bems_id = " + "'" + SessionPerister.BEMSID + "'" + ") or ( not exists ( select * from mctr_message_admin where bems_id = " + "'" + SessionPerister.BEMSID + "'" + " ) and exists ( select admin_role from mctr_role where bems = " + "'" + SessionPerister.BEMSID + "'" + " and admin_role = 'Y' " + "\"";
                        var result1 = HandlerUtil<ActiveState>.ConvertActiveStatedata(ReportResp.First().Activestate.ToList(), firstRow, secondRow, lastRow);
                        return GetAdminReport(result1, fileName);

                    case "RCM":
                        string fileNameRCM = "xtrt-MCTR-ROLE-CHANGES-MADE_" + DateTime.Now.ToString("yyyyMMddTHHmmss");
                        var firstRowRCM = @"MCTR ROLE CHANGES MADE POPULATION LISTING  (AS OF ";
                        string secondRowRCM = @"Note: Selections are based on query criteria listed below.";
                        string lastRowRCM = "\""+ @"select distinct trim ( pdbs.last_name || ', ' || pdbs.first_name ) as emp_name , rlog.role_bems as emp_bems , rlog.log_date as chg_date , rlog.log_action , rlog.field_chgd , rlog.field_before as value_old , rlog.field_after as value_new , rlog.log_bems from mctr_owner.mctr_role_chg_log rlog , mctr_employee_v pdbs where rlog.log_date >= ? ( sysdate - : f_days ) and rlog.role_bems = pdbs.bems_id ( + ) and ( exists ( select * from mctr_message_admin where bems_id =" + "'" + SessionPerister.BEMSID + "'" + " ) or ( not exists ( select * from mctr_message_admin where bems_id =:0 ) and exists ( select admin_role from mctr_role where bems =" + "'" + SessionPerister.BEMSID + "'" + " and admin_role = 'Y' ) ) ) order by emp_name , emp_bems , chg_date , rlog.log_action , rlog.field_chgd" + "\"";
                        var result2 = HandlerUtil<ChangesMade>.ChangesMadedata(ReportResp.First().changesmade.ToList(), firstRowRCM, secondRowRCM,lastRowRCM);
                        return GetAdminReport(result2, fileNameRCM);



                    default: throw new Exception("Please select an option.");
                }

            }
            catch (Exception e)
            {
                logger.Error("Error  " + e.Message);
                throw;


            }

        }

 
        public FileResult selectionbutexceleotwhenbuttonpressed(string JournalDate)
        {
          
            var admintables = new AdminTables();
            admintables.JournalDate = JournalDate;
            ReportHandler reporthandlerHandler = new ReportHandler();
            logger.Debug("Executing mctrCreateFormHandler.selectionbutexceleotwhenbuttonpressed()");
            try
            {
                admintables.SessionBems = SessionPerister.BEMSID;
                var ReportResp = reporthandlerHandler.selectionbutexceleotwhenbuttonpressed(admintables).ToList();
                string fileName = "xtrt-MCTR-EOT-Y2016-" + DateTime.Now.ToString("yyyyMMddTHHmmss");
                var firstRow = @"MCTR EOT METRIC REPORT for Selected Journal Date:";
                string secondRow = @"Processing Week Selected:";
                string thirdRow = @"Note that the selected Processing Week is not the Accounting Week.";
                string fourthRow = @"Normally one week of data is selected starting on Saturday through Friday.";
                string lastRow = "\""+@"SELECT FROM_TO, GROUP_TAG, STATUS_TAG, MCTR_NO, WK_NO_PRCSD, WK_NO_CREATED, WK_NO_ENTERED, DATE_TIME_HS_PRCSD, DATE_HS_PRCSD, DATE_HS_CREATED, DATE_ENTERED, DATE_JOURNAL, STATUS_ID, ORIG_BU, ORIG_GROUP, BEMS_ORIG, NAME_BEMS_ORIG, BEMS_SUPER, APPR_CD_SUPER, DATE_APPR_SUPER, WK_NO_APPR_SUPER, NAME_BEMS_SUPER, BEMS_FIN_CTL, APPR_CD_FIN_CTL, DATE_APPR_FIN_CTL, WK_NO_APPR_FIN_CTL, NAME_BEMS_FIN_CTL, BEMS_ACCT, APPR_CD_ACCT, DATE_APPR_ACCT, WK_NO_APPR_ACCT, NAME_BEMS_ACCT, BEMS_COST_ACCT, APPR_CD_COST_ACCT, DATE_APPR_COST_ACCT, WK_NO_APPR_COST_ACCT, NAME_BEMS_COST_ACCT, BEMS_MATL_ACCT, APPR_CD_MATL_ACCT, DATE_APPR_MATL_ACCT, WK_NO_APPR_MATL_ACCT, NAME_BEMS_MATL_ACCT, BEMS_SR_ACCT, APPR_CD_SR_ACCT, DATE_APPR_SR_ACCT, WK_NO_APPR_SR_ACCT, NAME_BEMS_SR_ACCT, OH_BASE_YEAR, APPL_JRNL_ID, JV_ITEM_CD, REASON_CODE, REASON_DESC, TITLE, REJECT_CODE, REJECT_REASON, LINE_NO, PERIOD_FROM, PERIOD_TO, TTD_FLAG, PER_FLAG, BEMS_1, APPR_CD_1, DATE_APPR_1, WK_NO_DATE_APPR_1, NAME_BEMS_1, BEMS_2, APPR_CD_2, DATE_APPR_2, WK_NO_DATE_APPR_2, NAME_BEMS_2, BEMS_3, APPR_CD_3, DATE_APPR_3, WK_NO_DATE_APPR_3, NAME_BEMS_3, ACTIVITY_ID, PROJECT_ID, ACCOUNT, BUM_CD, HOME_DEPT, HOME_LOC, HOME_BUGL, HOME_POOL, LABOR_RATE_CD, CLASS_CD, CUST_TYPE_CD, WORK_DEPT, WORK_LOC, WORK_BUGL, WORK_POOL, RSC, PTT, PTC, STAT_CODE, UOM, OH_BASE_YR, QUANTITY, AMOUNT, ADJUSTMENT, AMT_PLUS_ADJ, CONTRACT_NUM, WPD, BULK, CAUSAL_ID, ESTMTG_PRICG_CD, PO_ID, PART_NO, EPACS_CTT, SHOP_ORDER, PO_LINE, MATERIAL_QUANTITY, ACTY_RED_FLG, DEPT_RED_FLG, WORK_DEPT_RED_FLG, MTL_JRNL, JUSTIFICATION FROM MCTR_RPTNG_METRIC_V WHERE TRUNC(DATE_TIME_HS_PRCSD) > TO_DATE('08-JAN-16') AND TRUNC(DATE_TIME_HS_PRCSD) <= TO_DATE('03-JUN-16') AND EXISTS (SELECT BUSINESS_UNIT FROM MCTR_BUS_UNIT_V WHERE BUSINESS_UNIT = MCTR_RPTNG_METRIC_V.ORIG_BU AND OP_SEGMENT_7 = 'BT') ORDER BY ORIG_BU, GROUP_TAG, STATUS_TAG, WK_NO_PRCSD DESC, MCTR_NO DESC, DATE_TIME_HS_PRCSD DESC, LINE_NO, FROM_TO;" + "\"";
                var result = HandlerUtil<WeeklyReportsExcel>.Metricdata(ReportResp.First().Weeklyreports.ToList(), firstRow, secondRow, thirdRow, fourthRow,lastRow);
                
                return GetAdminReport(result, fileName);

            }
            catch (Exception e)
            {
                logger.Error("Error  " + e.Message);
                throw;

            }

        }
        public FileResult selectionbutqtrlyrolelistwhenbuttonpressed(string userAccess)
        {
            var adminTables = new AdminTables();
            adminTables.useraccess = userAccess;
            logger.Debug("Executing mctrCreateFormHandler.selectionbutqtrlyrolelistwhenbuttonpressed()");
            try
            {
                ReportHandler reporthandlerHandler = new ReportHandler();
                adminTables.SessionBems = SessionPerister.BEMSID;
                var ReportResp = reporthandlerHandler.selectionbutqtrlyrolelistwhenbuttonpressed(adminTables).ToList();  
                switch (adminTables.useraccess)
                {
                    case "RNM":
                        string fileName = "xtrt-MCTR-ROLE-MASTER-LIST_" + DateTime.Now.ToString("yyyyMMddTHHmmss");
                        var firstRow = @"MCTR ROLE TABLES USER ACCESS REVIEW LISTING (NOTIFICATIONS LAST SENT OUT ON ";
                        string secondRow = @"RPT1 - MCTR ROLE BASELINE MASTER NOTIFICATIONS (PART 1 - DETAILS)";
                        var result = HandlerUtil<AdminReportsExcel>.RoleNotificationpart1Data(ReportResp.First().AdminReports.ToList(), firstRow, secondRow);
                        string firstRow1 = @"RPT1 - MCTR ROLE BASELINE MASTER NOTIFICATIONS (PART 2 - SUMMARY)";
                        string secondRow1 = @"Note: All listed MCTR ROLE user entries were active at the time the user access review notification job was run.";
                        string thirdRow1 = @"Note: Selections are based on query criteria listed below.";
                        string fourthRow1 = "\""+ @"SELECT DISTINCT ACCTG_FOCAL_LNAME,ACCTG_FOCAL_FNAME,ACCTG_FOCAL_MINT,ACCTG_FOCAL_BEMS,EMP_NAME,BEMS,ACTIVE, FIN_CONTROL_ROLE,ACCOUNTANT_ROLE,LBR_ACCT_ROLE,MATL_ACCT_ROLE,COST_ACCT_ROLE,SR_ACCT_ROLE, ADMIN_ROLE,BEMS_ADMIN,DATE_INIT_ADD,DATE_UPDATE,LAST_LOGON,AUTH_BU_GRP,EMP_BU_GRP_TAG, AUTH_BU,AUTH_BU_ADMIN_BEMS,AUTH_BU_ADMIN_NAME,MGR_ID,MGR_NAME,MGR_EMAIL_BEMS,MGR_EMAIL, LAST_NAME,FIRST_NAME,MIDDLE_INT,EMP_EMAIL_BEMS,EMP_EMAIL,EMPL_BU,EMPL_LOC,EMPL_DEPT,EMP_STATUS FROM MCTR_OWNER.MCTR_ROLE_QTRLY_RPT WHERE EXISTS (SELECT * FROM MCTR_MESSAGE_ADMIN WHERE BEMS_ID =  " + "'" + SessionPerister.BEMSID + "'" + ") OR (NOT EXISTS (SELECT * FROM MCTR_MESSAGE_ADMIN WHERE BEMS_ID =  " + "'" + SessionPerister.BEMSID + "'" + ")  AND EXISTS (SELECT ADMIN_ROLE FROM MCTR_ROLE WHERE BEMS =  " + "'" + SessionPerister.BEMSID + "'" + " AND ADMIN_ROLE = 'Y')) ORDER BY ACCTG_FOCAL_LNAME, EMP_NAME, BEMS, AUTH_BU_GRP, EMP_BU_GRP_TAG, AUTH_BU" + "\"";
                        string fifthRow1 = "\""+ @"SELECT DISTINCT ACCTG_FOCAL_LNAME, MGR_NAME, MCTR_OWNER.MCTR_ROLE_QTRLY_RPT.MGR_ID AS MGR_BEMS, DECODE(MCTR_OWNER.MCTR_ROLE_QTRLY_RPT.MGR_EMP_STATUS,'A',' ',MCTR_OWNER.MCTR_ROLE_QTRLY_RPT.EMP_STATUS) as MGR_STATUS, EMP_NAME, BEMS AS EMP_BEMS, DECODE(MCTR_OWNER.MCTR_ROLE_QTRLY_RPT.EMP_STATUS,'A',' ',MCTR_OWNER.MCTR_ROLE_QTRLY_RPT.EMP_STATUS) as EMP_STATUS, DECODE(CONTRACT_VENDOR_CODE,'Y','Y',' ') AS CONTRACT_ITEM, DECODE(TRIM(DEPT_NMW),NULL,' ',(DECODE(LENGTH(TRIM(WORK_PHONE)),12,' ',TRIM(DEPT_NMW)))) AS DEPT_ITEM FROM MCTR_OWNER.MCTR_ROLE_QTRLY_RPT, MCTR_EMPLOYEE_V WHERE BEMS = BEMS_ID (+) AND (EXISTS (SELECT * FROM MCTR_MESSAGE_ADMIN WHERE BEMS_ID =  " + "'" + SessionPerister.BEMSID + "'" + ") OR (NOT EXISTS (SELECT * FROM MCTR_MESSAGE_ADMIN WHERE BEMS_ID =  " + "'" + SessionPerister.BEMSID + "'" + ") AND EXISTS (SELECT ADMIN_ROLE FROM MCTR_ROLE WHERE BEMS =  " + "'" + SessionPerister.BEMSID + "'" + "AND ADMIN_ROLE = 'Y'))) ORDER BY ACCTG_FOCAL_LNAME, MCTR_OWNER.MCTR_ROLE_QTRLY_RPT.MGR_ID, BEMS" + "\"";
                        var resultRNM = HandlerUtil<Notification2>.RoleNotificationpart2Data(ReportResp.First().notification2.ToList(), result, firstRow1, secondRow1, thirdRow1, fourthRow1, fifthRow1);

                        return GetAdminReport(resultRNM, fileName);
                    case "RM":
                        string fileNameRM = "xtrt-MCTR-ROLE-CHANGE-LIST_" + DateTime.Now.ToString("yyyyMMddTHHmmss");
                        var firstRowRM = @"MCTR ROLE TABLES USER ACCESS REVIEW LISTING (NOTIFICATIONS LAST SENT OUT ON ";
                        string secondRowRM = @"RPT2 - MCTR ROLE CHANGES MADE SINCE LAST NOTIFICATION";
                        string thirdRowRM = @"Note: All listed MCTR ROLE user entries were active at the time the user access review notification job was run.";
                        string fourthRowRM = @"Note: Selections are based on query criteria listed below.";
                        string lastRowRM = "\""+ @"select distinct qrpt.acctg_focal_lname , qrpt.emp_name , qrpt.bems , to_char ( rlog.log_date , 'mm/dd/yyyy hh:mi:ss am' ) as chg_date , rlog.log_action , rlog.field_chgd , rlog.field_before as value_old , rlog.field_after as value_new , rlog.log_bems from mctr_owner.mctr_role_chg_log rlog , mctr_owner.mctr_role_qtrly_rpt qrpt where rlog.role_bems = qrpt.bems and qrpt.qtrly_rpt_run_dt <= rlog.log_date and ( exists ( select * from mctr_message_admin where bems_id = " + "'" + SessionPerister.BEMSID + "'" + " ) or ( not exists ( select * from mctr_message_admin where bems_id = " + "'" + SessionPerister.BEMSID + "'" + " ) and exists ( select admin_role from mctr_role where bems = " + "'" + SessionPerister.BEMSID + "'" + " and admin_role = 'Y') " + "\"";
                        var result1 = HandlerUtil<RoleModification>.ConvertAdminTableData(ReportResp.First().Rolemodification.ToList(), firstRowRM, secondRowRM, thirdRowRM, fourthRowRM, lastRowRM);
                        return GetAdminReport(result1, fileNameRM);

                    case "RI":
                        string fileNameRI = "xtrt-MCTR-ROLE-INACTIVATION-LIST_" + DateTime.Now.ToString("yyyyMMddTHHmmss");
                        var firstRowRI = @"MCTR ROLE TABLES USER ACCESS REVIEW LISTING (NOTIFICATIONS LAST SENT OUT ON ";
                        string secondRowRI = @"RPT3 - MCTR ROLE INACTIVATIONS MADE SINCE LAST NOTIFICATION";
                        string thirdRowRI = @"Note: Listing of inactivated users that were active MCTR ROLE entries at time the user access review notification job was run.";
                        string fourthRowRI = @"Note: Selections are based on query criteria listed below.";
                        string lastRowRI = "\""+ @"select distinct qrpt.acctg_focal_lname , 'inactivated' as action_type , vrol.mgr_last_name || ', ' || vrol.mgr_first_name as mgr_name , vrol.mgr_id , vrol.last_name || ', ' || vrol.first_name as emp_name , vrol.empl_bu , vrol.empl_loc , vrol.empl_dept , vrol.bems as emp_bems , vrol.fin_control_role , vrol.accountant_role , vrol.lbr_acct_role , vrol.matl_acct_role , vrol.cost_acct_role , vrol.sr_acct_role , vrol.admin_role , vrol.last_logon , vrol.date_init_add , vrol.date_update , vrol.bems_admin , vrol.emp_status from mctr_owner.mctr_rptng_role_bu_list_v vrol , mctr_owner.mctr_role_qtrly_rpt qrpt where vrol.active = 'Y' and vrol.bems = qrpt.bems and ( exists ( select * from mctr_message_admin where bems_id = " + "'" + SessionPerister.BEMSID + "'" + " ) or ( not exists ( select * from mctr_message_admin where bems_id = " + "'" + SessionPerister.BEMSID + "'" + " ) and exists ( select admin_role from mctr_role where bems = " + "'" + SessionPerister.BEMSID + "'" + " and admin_role = 'Y' ) ) ) union select distinct acctg_focal_lname , 'deleted' as action_type , mgr_name , mgr_id , emp_name , empl_bu , empl_loc , empl_dept , bems as emp_bems , fin_control_role , accountant_role , lbr_acct_role , matl_acct_role , cost_acct_role , sr_acct_role , admin_role , last_logon , date_init_add , date_update , bems_admin , emp_status from mctr_owner.mctr_role_qtrly_rpt where not exists ( select * from mctr_owner.mctr_role where bems = mctr_owner.mctr_role_qtrly_rpt null.bems ) and ( exists ( select * from mctr_message_admin where bems_id =" + "'" + SessionPerister.BEMSID + "'" + " ) or ( not exists ( select * from mctr_message_admin where bems_id = " + "'" + SessionPerister.BEMSID + "'" + " ) and exists ( select admin_role from mctr_role where bems = " + "'" + SessionPerister.BEMSID + "'" + "and admin_role = 'Y' " + "\"";
                        var result3 = HandlerUtil<Inactivations>.ConvertAdminTableData(ReportResp.First().inactivations.ToList(), firstRowRI, secondRowRI, thirdRowRI, fourthRowRI, lastRowRI);
                        return GetAdminReport(result3, fileNameRI);

                    case "RCS":
                        string fileNameRCS = "xtrt-MCTR-ROLE-CURRENT-STATE-LIST_" + DateTime.Now.ToString("yyyyMMddTHHmmss");
                        var firstRowRCS = @"MCTR ROLE TABLES USER ACCESS REVIEW LISTING (NOTIFICATIONS LAST SENT OUT ON ";
                        string secondRowRCS = @"RPT4 - MCTR ROLE CURRENT STATE REFLECTING REVISIONS SINCE LAST NOTIFICATION";
                        string thirdRowRCS = @"Note: All listed MCTR ROLE user entries were active at the time the user access review notification job was run.";
                        string fourthRowRCS = @"Note: Selections are based on query criteria listed below.";
                        string lastRowRCS = "\""+ @"SELECT DISTINCT QRPT.ACCTG_FOCAL_LNAME AS ADMIN_FOCAL_LNAME, QRPT.ACCTG_FOCAL_FNAME AS ADMIN_FOCAL_FNAME, QRPT.ACCTG_FOCAL_MINT AS ADMIN_FOCAL_MINT, QRPT.ACCTG_FOCAL_BEMS AS ADMIN_FOCAL_BEMS, DECODE(RTRIM(VROL.LAST_NAME) || ', ' || RTRIM(VROL.FIRST_NAME), ', ', '[Not Found]', RTRIM(VROL.LAST_NAME) || ', ' || RTRIM(VROL.FIRST_NAME)) AS EMPL_NAME, QRPT.BEMS AS EMPL_BEMS, VROL.ACTIVE, VROL.FIN_CONTROL_ROLE, VROL.ACCOUNTANT_ROLE, VROL.LBR_ACCT_ROLE, VROL.MATL_ACCT_ROLE, VROL.COST_ACCT_ROLE, VROL.SR_ACCT_ROLE, VROL.ADMIN_ROLE, VROL.BEMS_ADMIN, VROL.DATE_INIT_ADD, VROL.DATE_UPDATE, VROL.LAST_LOGON, VROL.AUTH_BU_GRP, DECODE((SELECT BUSINESS_UNIT FROM MCTR_ROLE_BU WHERE BEMS = VROL.BEMS AND GROUP_CD7 = VROL.AUTH_BU_GRP AND BUSINESS_UNIT = '**'),NULL,' ','**') AS EMP_BU_GRP_TAG, DECODE(VROL.AUTH_BU, NULL, 'None', VROL.AUTH_BU) AS AUTH_ABU, DECODE(RTRIM(VROL.AUTH_BU_ADMIN_LAST_NAME) || ', ' || RTRIM(VROL.AUTH_BU_ADMIN_FIRST_NAME || ' ' || VROL.AUTH_BU_ADMIN_MIDDLE_INT), ', ', 'No Assignment', RTRIM(AUTH_BU_ADMIN_LAST_NAME) || ', ' || RTRIM(VROL.AUTH_BU_ADMIN_FIRST_NAME || ' ' || VROL.AUTH_BU_ADMIN_MIDDLE_INT)) AS AUTH_BU_ADMIN_NAME, VROL.AUTH_BU_ADMIN_BEMS, DECODE(RTRIM(VROL.MGR_LAST_NAME) || ', ' || RTRIM(VROL.MGR_FIRST_NAME), ', ', '[Not Found]', RTRIM(VROL.MGR_LAST_NAME) || ', ' || RTRIM(VROL.MGR_FIRST_NAME)) AS MGR_NAME, VROL.MGR_ID, TO_NUMBER(SUBSTR(VROL.MGR_EMAIL,2,7)) AS MGR_EMAIL_BEMS, VROL.MGR_EMAIL, VROL.LAST_NAME AS EMP_LNAME, VROL.FIRST_NAME AS EMP_FNAME, VROL.MIDDLE_INT AS EMP_INT, TO_NUMBER(SUBSTR(VROL.EMP_EMAIL,2,7)) AS EMP_EMAIL_BEMS, VROL.EMP_EMAIL, VROL.EMPL_BU, VROL.EMPL_LOC, VROL.EMPL_DEPT, VROL.EMP_STATUS FROM MCTR_RPTNG_ROLE_BU_LIST_V VROL, MCTR_ROLE_QTRLY_RPT QRPT WHERE QRPT.BEMS = VROL.BEMS (+) AND (EXISTS (SELECT * FROM MCTR_MESSAGE_ADMIN WHERE BEMS_ID = " + "'" + SessionPerister.BEMSID + "'" + ") OR (NOT EXISTS (SELECT * FROM MCTR_MESSAGE_ADMIN WHERE BEMS_ID = " + "'" + SessionPerister.BEMSID + "'" + ") AND EXISTS (SELECT ADMIN_ROLE FROM MCTR_ROLE WHERE BEMS = " + "'" + SessionPerister.BEMSID + "'" + " AND ADMIN_ROLE = 'Y'))) ORDER BY ADMIN_FOCAL_LNAME, EMPL_NAME, EMPL_BEMS, VROL.AUTH_BU_GRP, AUTH_ABU;" + "\"";
                        var result2 = HandlerUtil<CurrentStateExcel>.ConvertAdminTableData(ReportResp.First().currentstate.ToList(), firstRowRCS, secondRowRCS, thirdRowRCS, fourthRowRCS,lastRowRCS);
                        return GetAdminReport(result2, fileNameRCS);

                    default: throw new Exception("Please select an option.");
                }
            }

            catch (Exception e)
            {
                logger.Error("Error  " + e.Message);
                throw;
            }

        }
        private string ToCsv(List<DataTable> dts, bool addHeaders)
        {
            var sb = new StringBuilder();
            foreach (var dt in dts)
            {

                //Add Header Header
                if (addHeaders)
                {
                    for (var x = 0; x < dt.Columns.Count; x++)
                    {
                        if (x != 0)
                            sb.Append(",");
                        sb.Append(dt.Columns[x].ColumnName);
                    }
                    sb.AppendLine();
                }
                //Add Rows
                foreach (DataRow row in dt.Rows)
                {
                    for (var x = 0; x < dt.Columns.Count; x++)
                    {
                        if (x != 0)
                            sb.Append(",");
                        sb.Append(row[dt.Columns[x]]);
                    }
                    sb.AppendLine();
                }

                sb.AppendLine();

            }
            return sb.ToString();
        }
        private FileResult GetAdminReport(List<DataTable> resultTable, string fileName)
        {

            var result = ToCsv(resultTable, true);
            byte[] fileBytes = Encoding.ASCII.GetBytes(result);

            var cd = new System.Net.Mime.ContentDisposition
            {
                FileName = fileName + ".csv",
                Inline = false,
            };
            Response.ContentType = "application/vnd.ms-excel";
            Response.AppendHeader("Content-Disposition", cd.ToString());

            return File(fileBytes, fileName);
        }

       
        public FileResult mctrJrnlbyDatedwldExcel(string busUnit,string fromDate,string toDate, string bemsFinCntrl,string bemsOrig)
        {
            var rptJrnlbyDate = new RptJrnlbyDate();
            bemsFinCntrl = bemsFinCntrl == "" ? "%" : bemsFinCntrl;
            bemsOrig = bemsOrig == "" ? "%" : bemsOrig;

            rptJrnlbyDate.ORIGBU = busUnit;
            rptJrnlbyDate.DATEJRNLD = fromDate;
            rptJrnlbyDate.DATEENTER = toDate;
            rptJrnlbyDate.BEMSFINCTL = bemsFinCntrl;
            rptJrnlbyDate.BEMS_ORIG =bemsOrig;
            ReportHandler reporthandlerHandler = new ReportHandler();
            logger.Debug("Executing mctrCreateFormHandler.mctrJrnlbyDatedwldExcel()");
            try
            {
                var ReportResp = reporthandlerHandler.mctrJrnlbyDatedwldExcel(rptJrnlbyDate).ToList();
                string fileName ="xtrt-MCTR-JRNL- with-"+busUnit +DateTime.Now.ToString("yyyyMMddTHHmmss");
                var firstRow = @"MCTR JOURNAL GLPC RECONCILIATION REPORT for selected Business Unit: "+ busUnit;
                string secondRow = @"Date Range Selection From: "+ fromDate +" TO: "+ toDate;
                string thirdRow = @"BEMS ORIG Prompt [" +bemsOrig+ "] and BEMS FIN CTL Prompt [" + bemsFinCntrl+"]";
                var result = HandlerUtil<RptJrnlbyDate>.MetricdataJrnl(ReportResp,firstRow, secondRow, thirdRow);
                return GetAdminReport(result, fileName);
            }
            catch (Exception e)
            {
                logger.Error("Error  " + e.Message);
                throw;

            }

        }

    }
}