using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using Oracle.ManagedDataAccess.Client;
using MCTR.Web.Util;

namespace MCTR.Web.Reports
{
    public partial class PrintMCTR : System.Web.UI.Page
    {
        private ReportMCTR reportDataSet = null;
        private static string conString = ReportsUtil.getConstring();
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                ReportViewer1.Visible = true;
                if (!IsPostBack)
                {

                    BindReportViewer(Request.QueryString["mctrNo"], Request.QueryString["attachments"], Request.QueryString["commnets"], Request.QueryString["satusHist"], Request.QueryString["YTD"], Request.QueryString["TTD"], Request.QueryString["OvrHd"], Request.QueryString["OffSetCk"], Request.QueryString["matrlListing"], Request.QueryString["justChk"], Request.QueryString["prevChk"]);
                    BindReportViewer(Request.QueryString["mctrNo"], Request.QueryString["attachments"], Request.QueryString["commnets"], Request.QueryString["satusHist"], Request.QueryString["YTD"], Request.QueryString["TTD"], Request.QueryString["OvrHd"], Request.QueryString["OffSetCk"], Request.QueryString["matrlListing"], Request.QueryString["justChk"], Request.QueryString["prevChk"]);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private void BindReportViewer(string selectedMCTR_NO, string attachments, string commnets, string statusHist, string ytd, string ttd, string ovrHd, string offset, string matrlList, string justChk, string preChk)
        {
            //selectedMCTR_NO = "55905";
            ReportViewer1.Visible = true;
            reportDataSet = new ReportMCTR();
            ReportParameter[] param = new ReportParameter[2];
            param[0] = new ReportParameter("rptParamMCTR_NO", selectedMCTR_NO);
            param[1] = new ReportParameter("rptParamID0", selectedMCTR_NO);
            ReportViewer1.LocalReport.SetParameters(param);

            this.ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportFiles/PrintMCTR.rdlc");
            ReportViewer1.ProcessingMode = ProcessingMode.Local;

            //string selectedMCTR_NO = "55905";

            reportDataSet = getReportDataset(selectedMCTR_NO, attachments, commnets, statusHist, ytd, ttd, ovrHd, offset, matrlList, justChk, preChk);
            ReportViewer1.LocalReport.DataSources.Clear();

            ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("dsMctrLineItem", reportDataSet.dtMctrLineItem.ToList()));
            //ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("dsMctrOvrhd", reportDataSet.dtMctrOvrhd.ToList()));
            ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("dsStatusHistory", reportDataSet.dtStatusHistory.ToList()));
            ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("dsMctrComment", reportDataSet.dtMctrComment.ToList()));
            ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("dsMctrAttach", reportDataSet.dtMctrAttach.ToList()));
            ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("dsMctrHeader", reportDataSet.dtMctrHeader.ToList()));
            ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("dsMctrOffset", reportDataSet.dtMctrOffset.ToList()));
            ReportViewer1.LocalReport.Refresh();
        }
        
        private ReportMCTR getReportDataset(string selectedMCTR_NO, string attachments, string commnets, string statusHist, string ytd, string ttd, string ovrHd, string offset, string matrlList, string justChk, string preChk)
        {
            reportDataSet = new ReportMCTR();
            getMctrLineItemDataset(reportDataSet, selectedMCTR_NO, ytd, ttd, ovrHd);
            getMctrHeaderData(reportDataSet, selectedMCTR_NO);
            if (attachments == "true ")
            {
                getMctrAttachData(reportDataSet, selectedMCTR_NO);
            }
            //if (ovrHd == "true ")
            //{
            //    getMctrOvrhdData(reportDataSet, selectedMCTR_NO);
            //}
            if (statusHist == "true ")
            {
                getStatusHistoryData(reportDataSet, selectedMCTR_NO);
            }
            if (commnets == "true ")
            {
                getMctrCommentData(reportDataSet, selectedMCTR_NO);
            }
            if (offset == "true ")
            {
                getMctrOffsetData(reportDataSet, selectedMCTR_NO);
            }
            return reportDataSet;
        }

        private void getMctrHeaderData(ReportMCTR reportDataSet, string selectedMCTR_NO)
        {
            string sql = "";

            #region SQL STATEMENT
            sql = @"SELECT H.TITLE as OTITLE, H.ORIG_BU as OORIGBU, H.FISCAL_YEAR as OFISCALYEAR, H.DATE_ENTER as ODATEENTER , H.DATE_JOURNAL as ODATEJOURNAL,
             H.REASON_CODE as OREASONCODE, R.REASON_DESCR as OREASONDESCR, H.STATUS_ID as OSTATUSID, S.STATUS_DESCR as OSTATUSDESCR,
             H.APPL_JRNL_ID as OAPPLJRNLID, H.JV_ITEM_CD as OJVITEMCD,  H.BEMS_ORIG as OBEMSORIG,
             DECODE(RTRIM(RTRIM(ORG.LAST_NAME) || ', ' || RTRIM(ORG.FIRST_NAME) || ' ' || RTRIM(ORG.MIDDLE_INT)),
             ',',' ',(RTRIM(ORG.LAST_NAME) || ', ' || RTRIM(ORG.FIRST_NAME) || ' ' || RTRIM(ORG.MIDDLE_INT)))
             AS BEMSORIGNAME, H.ORIG_GROUP as OORIGGROUP, ABU.DESCR as ORIGBUNAME, H.justification as OJUSTIFICATION,H.preventative_measures as PREVENTATIVEMEASURES,H.MCTR_NO as MCTRNO,
             LI.LINENOMAX as MXLINENO,LI.LINENOMIN as MILINENO, LI.AMONUTAJUFROM as AMONUTAJUFR, LI.AMOUNTAJUTO as AMONUTAJUTO, LI.HoursFr as HOURSFR, HoursTo as HOURSTO,
             OVH.LINENOFROM as LINEFR,OVH.LINENOTO as LINETO,OVH.AMOUNT_FROM as AMOUNTFR,OVH.AMOUNT_TO as AMOUNTTO,
			   H.BEMS_SUPER as BEMSSUPER,
             H.BEMS_FIN_CTL as BEMSFINCTL,
             H.BEMS_ACCT as BEMSACCT,
             H.BEMS_COST_ACCT as BEMSCOSTACCT,
             H.BEMS_MATL_ACCT as BEMSMATLACCT,
             H.BEMS_SR_ACCT as BEMSSRACCT,
             H.BEMS_LBR_ACCT as BEMSLBRACCT,
             H.APPR_CD_SUPER as APPRCDSUPER,
             H.APPR_CD_FIN_CTL as APPRCDFINCTL,
             H.APPR_CD_ACCT as APPRCDACCT,
             H.APPR_CD_COST_ACCT as APPRCDCOSTACCT,
             H.APPR_CD_MATL_ACCT as APPRCDMATLACCT,
             H.APPR_CD_SR_ACCT as APPRCDSRACCT,
             H.APPR_CD_LBR_ACCT as APPRCDLBRACCT,
             H.DATE_APPR_LBR_ACCT as DATEAPPRLBRACCT,
             H.DATE_APPR_SUPER as DATEAPPRSUPER,
             H.DATE_APPR_FIN_CTL as DATEAPPRFINCTL,
             H.DATE_APPR_ACCT as DATEAPPRACCT,
             H.DATE_APPR_COST_ACCT as DATEAPPRCOSTACCT,
             H.DATE_APPR_MATL_ACCT as DATEAPPRMATLACCT,
             H.DATE_APPR_SR_ACCT as DATEAPPRSRACCT,
             emp.BEMSSUPERNAME  	as BEMSSUPERNAME,
             emp1.BEMSFINCTRLNAME as BEMSFINCTRLNAME,
             emp2.BEMSACCTNAME   as BEMSACCTNAME,
             emp3.BEMSCOSTACCTNAME as BEMSCOSTACCTNAME,
             emp4.BEMSMATLACCTNAME as BEMSMATLACCTNAME,
             emp5.BEMSSRACCTNAME  as BEMSSRACCTNAME,
             emp6.BEMSLBRACCTNAME as BEMSLBRACCTNAME,
             OFS.OFFSET
             FROM MCTR_HEADER H,
             MCTR_STATUS S,
             MCTR_REASON_CODE R,
             MCTR_BUS_UNIT_V ABU,
             MCTR_EMPLOYEE_V ORG,
             (select MAX(MCTR_NO) as MCTR_NO, max(LINE_NO) as LINENOMAX, min(LINE_NO) as LINENOMIN, sum(AMOUNT_FROM+ADJUSTMENT_FROM) as AMONUTAJUFROM ,sum(AMOUNT_TO+ADJUSTMENT_TO) as AMOUNTAJUTO, sum(QUANTITY_FROM) as HoursFr ,sum(QUANTITY_TO) as HoursTo from MCTR_LINE_ITEM  where MCTR_NO={0}) LI,
             (select  a.MCTR_NO as MCTRNO, a.LINE_NO as LINENOFROM,b.LINE_NO as LINENOTO,a.AMOUNT_FROM as AMOUNT_FROM,b.AMOUNT_FROM as AMOUNT_TO from (select MCTR_NO,MAX(LINE_NO) as LINE_NO,SUM(AMOUNT_FROM)  as AMOUNT_FROM from MCTR_OVRHD where MCTR_NO={0} and FROM_TO='F' GROUP by MCTR_NO) a, (select MCTR_NO,MAX(LINE_NO) as LINE_NO, SUM(AMOUNT_FROM) as AMOUNT_FROM from MCTR_OVRHD where MCTR_NO={0} and  FROM_TO='T' GROUP by MCTR_NO) b where a.MCTR_NO=b.MCTR_NO ) OVH,
             (select DECODE(RTRIM(RTRIM(ORG.LAST_NAME) || ', ' || RTRIM(ORG.FIRST_NAME) || ' ' || RTRIM(ORG.MIDDLE_INT)),',',' ',(RTRIM(ORG.LAST_NAME) || ', ' || RTRIM(ORG.FIRST_NAME) || ' ' || RTRIM(ORG.MIDDLE_INT))) AS BEMSSUPERNAME from MCTR_HEADER a Left join MCTR_EMPLOYEE_V ORG on ORG.BEMS_ID=a.BEMS_SUPER where a.MCTR_NO={0}) Emp,
             (select DECODE(RTRIM(RTRIM(ORG.LAST_NAME) || ', ' || RTRIM(ORG.FIRST_NAME) || ' ' || RTRIM(ORG.MIDDLE_INT)),',',' ',(RTRIM(ORG.LAST_NAME) || ', ' || RTRIM(ORG.FIRST_NAME) || ' ' || RTRIM(ORG.MIDDLE_INT))) AS BEMSFINCTRLNAME from MCTR_HEADER a Left join MCTR_EMPLOYEE_V ORG on ORG.BEMS_ID=a.BEMS_FIN_CTL  where a.MCTR_NO={0}) Emp1,
             (select DECODE(RTRIM(RTRIM(ORG.LAST_NAME) || ', ' || RTRIM(ORG.FIRST_NAME) || ' ' || RTRIM(ORG.MIDDLE_INT)),',',' ',(RTRIM(ORG.LAST_NAME) || ', ' || RTRIM(ORG.FIRST_NAME) || ' ' || RTRIM(ORG.MIDDLE_INT))) AS BEMSACCTNAME from MCTR_HEADER a Left join MCTR_EMPLOYEE_V ORG on ORG.BEMS_ID=a.BEMS_ACCT where a.MCTR_NO={0}) Emp2,
             (select DECODE(RTRIM(RTRIM(ORG.LAST_NAME) || ', ' || RTRIM(ORG.FIRST_NAME) || ' ' || RTRIM(ORG.MIDDLE_INT)),',',' ',(RTRIM(ORG.LAST_NAME) || ', ' || RTRIM(ORG.FIRST_NAME) || ' ' || RTRIM(ORG.MIDDLE_INT))) AS BEMSCOSTACCTNAME from MCTR_HEADER a Left join MCTR_EMPLOYEE_V ORG on ORG.BEMS_ID=a.BEMS_COST_ACCT where a.MCTR_NO={0}) Emp3,
             (select DECODE(RTRIM(RTRIM(ORG.LAST_NAME) || ', ' || RTRIM(ORG.FIRST_NAME) || ' ' || RTRIM(ORG.MIDDLE_INT)),',',' ',(RTRIM(ORG.LAST_NAME) || ', ' || RTRIM(ORG.FIRST_NAME) || ' ' || RTRIM(ORG.MIDDLE_INT))) AS BEMSMATLACCTNAME from MCTR_HEADER a Left join MCTR_EMPLOYEE_V ORG on ORG.BEMS_ID=a.BEMS_MATL_ACCT where a.MCTR_NO={0}) Emp4,
             (select DECODE(RTRIM(RTRIM(ORG.LAST_NAME) || ', ' || RTRIM(ORG.FIRST_NAME) || ' ' || RTRIM(ORG.MIDDLE_INT)),',',' ',(RTRIM(ORG.LAST_NAME) || ', ' || RTRIM(ORG.FIRST_NAME) || ' ' || RTRIM(ORG.MIDDLE_INT))) AS BEMSSRACCTNAME from MCTR_HEADER a Left join MCTR_EMPLOYEE_V ORG on ORG.BEMS_ID=a.BEMS_SR_ACCT where a.MCTR_NO={0}) Emp5,
             (select DECODE(RTRIM(RTRIM(ORG.LAST_NAME) || ', ' || RTRIM(ORG.FIRST_NAME) || ' ' || RTRIM(ORG.MIDDLE_INT)),',',' ',(RTRIM(ORG.LAST_NAME) || ', ' || RTRIM(ORG.FIRST_NAME) || ' ' || RTRIM(ORG.MIDDLE_INT))) AS BEMSLBRACCTNAME from MCTR_HEADER a Left join MCTR_EMPLOYEE_V ORG on ORG.BEMS_ID=a.BEMS_LBR_ACCT   where a.MCTR_NO={0}) Emp6, (SELECT SUM(OS.AMOUNT_FROM) AS OFFSET FROM MCTR_OFFSET OS WHERE OS.MCTR_NO={0}) OFS
             WHERE H.MCTR_NO = {0}
             AND H.STATUS_ID = S.STATUS_ID(+)
             AND H.REASON_CODE = R.REASON_CODE(+)
             AND H.ORIG_BU = ABU.BUSINESS_UNIT(+)
             AND H.BEMS_ORIG = ORG.BEMS_ID(+)
             AND H.MCTR_NO=LI.MCTR_NO(+)
             AND H.MCTR_NO=OVH.MCTRNO(+)
             ";
            #endregion

            sql = string.Format(sql, "'" + selectedMCTR_NO + "'");
            //creating object of DataSet dsEmployee and filling the DataSet using SQLDataAdapter  
            OracleConnection cn = new OracleConnection(conString);
            OracleCommand cmd = new OracleCommand(sql, cn);
            cmd.CommandType = System.Data.CommandType.Text;
            OracleDataAdapter da = new OracleDataAdapter(cmd);
            da.Fill(reportDataSet, reportDataSet.dtMctrHeader.TableName);
            cn.Close();
            cn.Dispose();
            cn.Dispose();
            cmd.Dispose();
            da.Dispose();
            reportDataSet.Dispose();
        }

        private void getMctrLineItemDataset(ReportMCTR reportDataSet, string selectedMCTR_NO, string ytd, string ttd, string ovrHd)
        {
            string sql = "";

            #region SQL STATEMENT
            sql = @"select LI.LINE_NO,
         LI.TTD_FLAG,
         LI.PER_FLAG,
         LI.PERIOD_FROM,
         LI.PERIOD_TO,
         LI.ACTIVITY_ID_FROM,
         LI.PROJECT_ID_FROM,
         LI.ACCOUNT_FROM,
         LI.BUM_CD7_FROM,
         LI.AFFILIATE_FROM,
         LI.HOME_DEPT_FROM,
         LI.HOME_LOC_FROM,
         LI.HOME_BUGL_FROM,
         LI.HOME_POOL_FROM,
         LI.LABOR_RATE_CD7_FROM,
         LI.CLASS_CD_FROM,
         LI.CUST_TYPE_CD7_FROM,
         LI.WORK_DEPT_FROM,
         LI.WORK_LOC_FROM,
         LI.WORK_BUGL_FROM,
         LI.WORK_POOL_FROM,
         LI.RSC_FROM,
         LI.PROJ_TRANS_TYPE_FROM,
         LI.PROJ_TRANS_CODE_FROM,
         LI.STAT_CODE_FROM,
         LI.UOM_FROM,
         LI.OH_BASE_YR_FROM,
         LI.QUANTITY_FROM,
         LI.AMOUNT_FROM,
         LI.ADJUSTMENT_FROM,
         LI.CONTRACT_NUM_FROM,
         LI.WPD_FROM,
         LI.BULK_FROM,
         LI.CAUSAL_ID_FROM,
         LI.ESTMTG_PRICG_CD_FROM,
         LI.PO_ID_FROM,
         LI.PART_NO_FROM,
         LI.EPACS_CTT_FROM,
         LI.SHOP_ORDER_FROM,
         LI.PO_LINE_FROM,
         LI.MATERIAL_QUANTITY_FROM,
         LI.ACTIVITY_ID_TO,
         LI.PROJECT_ID_TO,
         LI.ACCOUNT_TO,
         LI.BUM_CD7_TO,
         LI.AFFILIATE_TO,
         LI.HOME_DEPT_TO,
         LI.HOME_LOC_TO,
         LI.HOME_BUGL_TO, 
         LI.HOME_POOL_TO,
         LI.LABOR_RATE_CD7_TO,
         LI.CLASS_CD_TO,
         LI.CUST_TYPE_CD7_TO,
         LI.WORK_DEPT_TO,
         LI.WORK_LOC_TO,
         LI.WORK_BUGL_TO,
         LI.WORK_POOL_TO,
         LI.RSC_TO,
         LI.PROJ_TRANS_TYPE_TO,
         LI.PROJ_TRANS_CODE_TO,
         LI.STAT_CODE_TO,
         LI.UOM_TO,
         LI.OH_BASE_YR_TO,
         LI.QUANTITY_TO,
         LI.AMOUNT_TO,
         LI.ADJUSTMENT_TO,
         LI.CONTRACT_NUM_TO,
         LI.WPD_TO,
         LI.BULK_TO,
         LI.CAUSAL_ID_TO,
         LI.ESTMTG_PRICG_CD_TO,
         LI.PO_ID_TO,
         LI.PART_NO_TO,
         LI.EPACS_CTT_TO,
         LI.SHOP_ORDER_TO,
         LI.PO_LINE_TO,
         LI.MATERIAL_QUANTITY_TO,
         LI.BUM_CD7_TO_ORIG,
         LI.MTL_JRNL,
         LI.APPR_CD_3,LI.DATE_APPR_3,LI.BEMS_3, FIRST_NAME,LAST_NAME";
      if (ytd == "true ")
            {
                sql += @",YTD.MCTR_NO			    as YTDMCTRNO,
                        YTD.LINE_NO             as YTDLINENO,
                        YTD.SEQ_NO              as YTDSEQNO,
                        YTD.FISCAL_YEAR         as YTDFISCALYEAR,
                        YTD.ACCOUNTING_PERIOD   as YTDACCOUNTINGPERIOD,
                        YTD.ANALYSIS_TYPE       as YTDANALYSISTYPE,
                        YTD.ACTIVITY_ID         as YTDACTIVITYID,
                        YTD.PROJECT_ID          as YTDPROJECTID,
                        YTD.ACCOUNT             as YTDACCOUNT,
                        YTD.HOME_DEPT           as YTDHOMEDEPT,
                        YTD.HOME_LOC            as YTDHOMELOC,
                        YTD.HOME_BUGL           as YTDHOMEBUGL,
                        YTD.HOME_POOL           as YTDHOMEPOOL,
                        YTD.WORK_DEPT           as YTDWORKDEPT,
                        YTD.WORK_LOC            as YTDWORKLOC,
                        YTD.WORK_BUGL           as YTDWORKBUGL,
                        YTD.WORK_POOL           as YTDWORKPOOL,
		                YTD.RSC                 as YTDRSC,
		                YTD.PROJ_TRANS_TYPE     as YTDPROJTRANSTYPE,
		                YTD.PROJ_TRANS_CODE     as YTDPROJTRANSCODE,
		                YTD.QUANTITY_YTD        as YTDQUANTITYYTD,
		                YTD.AMOUNT_YTD          as YTDAMOUNTYTD,
		                YTD.WPD                 as YTDWPD,
		                YTD.BULK_ALCTN_CD7      as YTDBULKALCTNCD7,
		                YTD.CLASS_CD            as YTDCLASSCD,
		                YTD.AFFILIATE			as YTDAFFILIATE";
            }
            if (ttd == "true ")
            {
                sql += @",TTD.MCTR_NO             as TTDMCTRNO,
		                TTD.LINE_NO             as TTDLINENO,
		                TTD.SEQ_NO              as TTDSEQNO,
		                TTD.FISCAL_YEAR         as TTDFISCALYEAR,
		                TTD.ACCOUNTING_PERIOD   as TTDACCOUNTINGPERIOD,
		                TTD.ANALYSIS_TYPE       as TTDANALYSISTYPE,
		                TTD.ACTIVITY_ID         as TTDACTIVITYID,
		                TTD.PROJECT_ID          as TTDPROJECTID,
		                TTD.ACCOUNT             as TTDACCOUNT,
		                TTD.HOME_DEPT           as TTDHOMEDEPT,
		                TTD.HOME_LOC            as TTDHOMELOC,
		                TTD.HOME_BUGL           as TTDHOMEBUGL,
		                TTD.HOME_POOL           as TTDHOMEPOOL,
		                TTD.WORK_DEPT           as TTDWORKDEPT,
		                TTD.WORK_LOC            as TTDWORKLOC,
		                TTD.WORK_BUGL           as TTDWORKBUGL,
		                TTD.WORK_POOL           as TTDWORKPOOL,
		                TTD.RSC                 as TTDRSC,
		                TTD.PROJ_TRANS_TYPE     as TTDPROJTRANSTYPE,
		                TTD.PROJ_TRANS_CODE     as TTDPROJTRANSCODE,
		                TTD.QUANTITY_TTD        as TTDQUANTITYTTD,
		                TTD.AMOUNT_TTD          as TTDAMOUNTTTD,
		                TTD.WPD                 as TTDWPD,
		                TTD.BULK_ALCTN_CD7      as TTDBULKALCTNCD7,
		                TTD.CLASS_CD            as TTDCLASSCD,
		                TTD.AFFILIATE			as TTDAFFILIATE";
            }

            if (ovrHd == "true ")
            {
                sql += @",OVH.MCTR_NO_OVHFROM	,		  
                        OVH.LINE_NO_OVHFROM,
                        OVH.FROM_TO_OVHFROM ,           
                        OVH.LINE_NO_OH_OVHFROM,        
                        OVH.ACTIVITY_ID_FROM_OVHFROM,   
                        OVH.PROJECT_ID_FROM_OVHFROM,
                        OVH.ACCOUNT_FROM_OVHFROM,      
                        OVH.BUM_CD7_FROM_OVHFROM,     
                        OVH.CUS_TYPE_CD7_FROM_OVHFROM,    
                        OVH.HOME_DEPT_FROM_OVHFROM,       
                        OVH.HOME_LOC_FROM_OVHFROM,        
                        OVH.HOME_BUGL_FROM_OVHFROM,     
                        OVH.HOME_POOL_FROM_OVHFROM,    
                        OVH.LABOR_RATE_CD7_FROM_OVHFROM,  
                        OVH.CLASS_CD_FROM_OVHFROM,
                        OVH.WORK_DEPT_FROM_OVHFROM,      
                        OVH.WORK_LOC_FROM_OVHFROM,
                        OVH.WORK_BUGL_FROM_OVHFROM,
                        OVH.WORK_POOL_FROM_OVHFROM,      
                        OVH.RSC_FROM_OVHFROM,          
                        OVH.PROJ_TRANS_TYPE_FROM_OVHFROM, 
                        OVH.PROJ_TRANS_CODE_FROM_OVHFROM, 
                        OVH.STAT_CODE_FROM_OVHFROM,      
                        OVH.UOM_FROM_OVHFROM,            
                        OVH.OH_BASE_YR_FROM_OVHFROM,     
                        OVH.QUANTITY_FROM_OVHFROM,         
                        OVH.AMOUNT_FROM_OVHFROM,           
                        OVH.WPD_FROM_OVHFROM,           
                        OVH.BULK_ALCTN_CD7_OVHFROM,       
                        OVH.AFFILIATE_FROM_OVHFROM,
                        OVH.MCTR_NO_OVHTO,			  
                        OVH.LINE_NO_OVHTO,           
                        OVH.FROM_TO_OVHTO,            
                        OVH.LINE_NO_OH_OVHTO,        
                        OVH.ACTIVITY_ID_FROM_OVHTO,   
                        OVH.PROJECT_ID_FROM_OVHTO,
                        OVH.ACCOUNT_FROM_OVHTO,      
                        OVH.BUM_CD7_FROM_OVHTO,     
                        OVH.CUS_TYPE_CD7_FROM_OVHTO,    
                        OVH.HOME_DEPT_FROM_OVHTO,       
                        OVH.HOME_LOC_FROM_OVHTO,        
                        OVH.HOME_BUGL_FROM_OVHTO,     
                        OVH.HOME_POOL_FROM_OVHTO,    
                        OVH.LABOR_RATE_CD7_FROM_OVHTO,  
                        OVH.CLASS_CD_FROM_OVHTO,
                        OVH.WORK_DEPT_FROM_OVHTO,      
                        OVH.WORK_LOC_FROM_OVHTO,
                        OVH.WORK_BUGL_FROM_OVHTO,
                        OVH.WORK_POOL_FROM_OVHTO,      
                        OVH.RSC_FROM_OVHTO,          
                        OVH.PROJ_TRANS_TYPE_FROM_OVHTO, 
                        OVH.PROJ_TRANS_CODE_FROM_OVHTO, 
                        OVH.STAT_CODE_FROM_OVHTO,      
                        OVH.UOM_FROM_OVHTO,            
                        OVH.OH_BASE_YR_FROM_OVHTO,     
                        OVH.QUANTITY_FROM_OVHTO,         
                        OVH.AMOUNT_FROM_OVHTO,           
                        OVH.WPD_FROM_OVHTO,           
                        OVH.BULK_ALCTN_CD7_OVHTO,       
                        OVH.AFFILIATE_FROM_OVHTO ";
            }

                sql += @" from MCTR_LINE_ITEM LI  left join MCTR_TTD_BACKUP TTD on LI.MCTR_NO=ttd.MCTR_NO and LI.LINE_NO=ttd.LINE_NO 
            left join MCTR_PER_BACKUP YTD on  LI.MCTR_NO=YTD.MCTR_NO and LI.LINE_NO=YTD.LINE_NO 
            left join MCTR_EMPLOYEE_V EMP on EMP.BEMS_ID=LI.BEMS_3
            left join  (SELECT * FROM (select 
                            MCTR_NO				  as MCTR_NO_OVHFROM	,			  
                            LINE_NO               as LINE_NO_OVHFROM   ,           
                            FROM_TO               as FROM_TO_OVHFROM   ,            
                            LINE_NO_OH            as LINE_NO_OH_OVHFROM    ,        
                            ACTIVITY_ID_FROM      as ACTIVITY_ID_FROM_OVHFROM   ,   
                            PROJECT_ID_FROM       as PROJECT_ID_FROM_OVHFROM,
                            ACCOUNT_FROM          as ACCOUNT_FROM_OVHFROM    ,      
                            BUM_CD7_FROM          as BUM_CD7_FROM_OVHFROM     ,     
                            CUS_TYPE_CD7_FROM     as CUS_TYPE_CD7_FROM_OVHFROM ,    
                            HOME_DEPT_FROM        as HOME_DEPT_FROM_OVHFROM,       
                            HOME_LOC_FROM         as HOME_LOC_FROM_OVHFROM ,        
                            HOME_BUGL_FROM        as HOME_BUGL_FROM_OVHFROM   ,     
                            HOME_POOL_FROM        as HOME_POOL_FROM_OVHFROM    ,    
                            LABOR_RATE_CD7_FROM   as LABOR_RATE_CD7_FROM_OVHFROM ,  
                            CLASS_CD_FROM         as CLASS_CD_FROM_OVHFROM,
                            WORK_DEPT_FROM        as WORK_DEPT_FROM_OVHFROM  ,      
                            WORK_LOC_FROM         as WORK_LOC_FROM_OVHFROM,
                            WORK_BUGL_FROM        as WORK_BUGL_FROM_OVHFROM,
                            WORK_POOL_FROM        as WORK_POOL_FROM_OVHFROM  ,      
                            RSC_FROM              as RSC_FROM_OVHFROM    ,          
                            PROJ_TRANS_TYPE_FROM  as PROJ_TRANS_TYPE_FROM_OVHFROM , 
                            PROJ_TRANS_CODE_FROM  as PROJ_TRANS_CODE_FROM_OVHFROM , 
                            STAT_CODE_FROM        as STAT_CODE_FROM_OVHFROM  ,      
                            UOM_FROM              as UOM_FROM_OVHFROM  ,            
                            OH_BASE_YR_FROM       as OH_BASE_YR_FROM_OVHFROM  ,     
                            QUANTITY_FROM         as QUANTITY_FROM_OVHFROM,         
                            AMOUNT_FROM           as AMOUNT_FROM_OVHFROM,           
                            WPD_FROM              as WPD_FROM_OVHFROM   ,           
                            BULK_ALCTN_CD7        as BULK_ALCTN_CD7_OVHFROM ,       
                            AFFILIATE_FROM        as AFFILIATE_FROM_OVHFROM        
                            from MCTR_OVRHD where MCTR_NO={0} and FROM_TO='F') OVF, (select 
                            MCTR_NO				  as MCTR_NO_OVHTO	,			  
                            LINE_NO               as LINE_NO_OVHTO   ,           
                            FROM_TO               as FROM_TO_OVHTO   ,            
                            LINE_NO_OH            as LINE_NO_OH_OVHTO    ,        
                            ACTIVITY_ID_FROM      as ACTIVITY_ID_FROM_OVHTO   ,   
                            PROJECT_ID_FROM       as PROJECT_ID_FROM_OVHTO,
                            ACCOUNT_FROM          as ACCOUNT_FROM_OVHTO    ,      
                            BUM_CD7_FROM          as BUM_CD7_FROM_OVHTO     ,     
                            CUS_TYPE_CD7_FROM     as CUS_TYPE_CD7_FROM_OVHTO ,    
                            HOME_DEPT_FROM        as HOME_DEPT_FROM_OVHTO,       
                            HOME_LOC_FROM         as HOME_LOC_FROM_OVHTO ,        
                            HOME_BUGL_FROM        as HOME_BUGL_FROM_OVHTO   ,     
                            HOME_POOL_FROM        as HOME_POOL_FROM_OVHTO    ,    
                            LABOR_RATE_CD7_FROM   as LABOR_RATE_CD7_FROM_OVHTO ,  
                            CLASS_CD_FROM         as CLASS_CD_FROM_OVHTO,
                            WORK_DEPT_FROM        as WORK_DEPT_FROM_OVHTO  ,      
                            WORK_LOC_FROM         as WORK_LOC_FROM_OVHTO,
                            WORK_BUGL_FROM        as WORK_BUGL_FROM_OVHTO,
                            WORK_POOL_FROM        as WORK_POOL_FROM_OVHTO  ,      
                            RSC_FROM              as RSC_FROM_OVHTO    ,          
                            PROJ_TRANS_TYPE_FROM  as PROJ_TRANS_TYPE_FROM_OVHTO , 
                            PROJ_TRANS_CODE_FROM  as PROJ_TRANS_CODE_FROM_OVHTO , 
                            STAT_CODE_FROM        as STAT_CODE_FROM_OVHTO  ,      
                            UOM_FROM              as UOM_FROM_OVHTO  ,            
                            OH_BASE_YR_FROM       as OH_BASE_YR_FROM_OVHTO  ,     
                            QUANTITY_FROM         as QUANTITY_FROM_OVHTO,         
                            AMOUNT_FROM           as AMOUNT_FROM_OVHTO,           
                            WPD_FROM              as WPD_FROM_OVHTO   ,           
                            BULK_ALCTN_CD7        as BULK_ALCTN_CD7_OVHTO ,       
                            AFFILIATE_FROM        as AFFILIATE_FROM_OVHTO        
                            from MCTR_OVRHD where MCTR_NO={0} and FROM_TO='T') OVT WHERE OVF.MCTR_NO_OVHFROM=OVT.MCTR_NO_OVHTO AND OVF.LINE_NO_OVHFROM=OVT.LINE_NO_OVHTO ) OVH ON LI.MCTR_NO= OVH.MCTR_NO_OVHFROM AND LI.LINE_NO=OVH.LINE_NO_OVHTO
            WHERE LI.MCTR_NO ={0} order by LI.LINE_NO";
            #endregion

            sql = string.Format(sql, "'" + selectedMCTR_NO + "'");

            //creating object of DataSet dsEmployee and filling the DataSet using SQLDataAdapter  
            OracleConnection cn = new OracleConnection(conString); // System.Configuration.ConfigurationManager.ConnectionStrings["OracleConnectionString"].ToString());
            OracleCommand cmd = new OracleCommand(sql, cn);
            cmd.CommandType = System.Data.CommandType.Text;
            OracleDataAdapter da = new OracleDataAdapter(cmd);

            da.Fill(reportDataSet, reportDataSet.dtMctrLineItem.TableName);
            cn.Close();
            cn.Dispose();
            cmd.Dispose();
            da.Dispose();
            reportDataSet.Dispose();
        }

        private void getMctrCommentData(ReportMCTR reportDataSet, string selectedMCTR_NO)
        {
            string sql = "";

            #region SQL STATEMENT
            sql = @" select 
                    c.MCTR_NO      as MCTR_NO,
                    c.LINE_ITEM    as LINE_ITEM,
                    c.BEMS         as BEMS,
                    c.DATE_ENTERED as DATE_ENTERED,
                    c.COMMENTS     as COMMENTS,
                    E.FIRST_NAME    as  FIRST_NAME ,
                    E.LAST_NAME     as  LAST_NAME,
                    E.MIDDLE_INT    as  MIDDLE_INT,
                    E.BEMS_ID       as  BEMS_ID
                    from MCTR_COMMENT C, MCTR_EMPLOYEE_V E where MCTR_NO={0} and C.BEMS=E.BEMS_ID(+) order by c.Line_item";
            #endregion

            sql = string.Format(sql, "'" + selectedMCTR_NO + "'");

            //creating object of DataSet dsEmployee and filling the DataSet using SQLDataAdapter  
            OracleConnection cn = new OracleConnection(conString);
            OracleCommand cmd = new OracleCommand(sql, cn);
            cmd.CommandType = System.Data.CommandType.Text;
            OracleDataAdapter da = new OracleDataAdapter(cmd);

            da.Fill(reportDataSet, reportDataSet.dtMctrComment.TableName);
            cn.Close();
            cn.Dispose();
            cmd.Dispose();
            da.Dispose();
            reportDataSet.Dispose();
        }

        private void getMctrAttachData(ReportMCTR reportDataSet, string selectedMCTR_NO)
        {
            string sql = "";

            #region SQL STATEMENT
            sql = @"select 
                    A.MCTR_NO          as  MCTR_NO ,
                    A.ATTACH_NO        as  ATTACH_NO,
                    A.ATTACH_FILENAME  as  ATTACH_FILENAME,
                    A.BEMS             as  BEMS,
                    A.DATE_ENTERED     as  DATE_ENTERED,
                    A.ATTACH_DESCR     as  ATTACH_DESCR,
                    E.BEMS_ID          as  BEMS_ID,
                    E.FIRST_NAME       as  FIRST_NAME,
                    E.FIRST_NAME       as  FIRST_NAME,
                    E.MIDDLE_INT       as  MIDDLE_INT,
                    E.LAST_NAME        as  LAST_NAME
        from MCTR_ATTACH A, MCTR_EMPLOYEE_V E where MCTR_NO={0} and A.BEMS=E.BEMS_ID(+) order by ATTACH_NO";
            #endregion

            sql = string.Format(sql, "'" + selectedMCTR_NO + "'");

            //creating object of DataSet dsEmployee and filling the DataSet using SQLDataAdapter  
            OracleConnection cn = new OracleConnection(conString);
            OracleCommand cmd = new OracleCommand(sql, cn);
            cmd.CommandType = System.Data.CommandType.Text;
            OracleDataAdapter da = new OracleDataAdapter(cmd);

            da.Fill(reportDataSet, reportDataSet.dtMctrAttach.TableName);
            cn.Close();
            cn.Dispose();
            cmd.Dispose();
            da.Dispose();
            reportDataSet.Dispose();
        }

        private void getStatusHistoryData(ReportMCTR reportDataSet, string selectedMCTR_NO)
        {
            string sql = "";

            #region SQL STATEMENT
            sql = @"SELECT a.DATE_TIME_ENTERED as DATEENTERED ,a.DATE_TIME_LEFT as DATETIMELEFT,a.PRIOR_STATUS as PRIORSTATUS,a.NEXT_STATUS as NEXTSTATUS,b.STATUS_DESCR as STATUS_DESCR  from MCTR_STATUS_HIST a,MCTR_STATUS b where MCTR_NO={0} and a.NEXT_STATUS=b.STATUS_ID
order by a.DATE_TIME_ENTERED ASC";
            #endregion

            sql = string.Format(sql, "'" + selectedMCTR_NO + "'");

            //creating object of DataSet dsEmployee and filling the DataSet using SQLDataAdapter  
            OracleConnection cn = new OracleConnection(conString);
            OracleCommand cmd = new OracleCommand(sql, cn);
            cmd.CommandType = System.Data.CommandType.Text;
            OracleDataAdapter da = new OracleDataAdapter(cmd);
            da.Fill(reportDataSet, reportDataSet.dtStatusHistory.TableName);
            cn.Close();
            cn.Dispose();
            cmd.Dispose();
            da.Dispose();
            reportDataSet.Dispose();
        }

       

        private void getMctrOffsetData(ReportMCTR reportDataSet, string selectedMCTR_NO)
        {
            string sql = "";

            #region SQL STATEMENT
            sql = @"select * from MCTR_OFFSET where MCTR_NO={0}";
            #endregion

            sql = string.Format(sql, "'" + selectedMCTR_NO + "'");

            //creating object of DataSet dsEmployee and filling the DataSet using SQLDataAdapter  
            OracleConnection cn = new OracleConnection(conString);// System.Configuration.ConfigurationManager.ConnectionStrings["OracleConnectionString"].ToString());
            OracleCommand cmd = new OracleCommand(sql, cn);
            cmd.CommandType = System.Data.CommandType.Text;
            OracleDataAdapter da = new OracleDataAdapter(cmd);

            da.Fill(reportDataSet, reportDataSet.dtMctrOffset.TableName);
            cn.Close();
            cn.Dispose();
            cmd.Dispose();
            da.Dispose();
            reportDataSet.Dispose();
        }

        public new void Dispose()
        {
            reportDataSet.Dispose();
        }
    }
}