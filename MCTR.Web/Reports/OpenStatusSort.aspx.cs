using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using System.Data.OracleClient;
using MCTR.Web.Util;

namespace MCTR.Web.Reports
{
    public partial class OpenStatusSort : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                ReportViewer1.Visible = true;
                if (!IsPostBack)
                {
                    BindReportViewer(Request.QueryString["busUnit"]);
                    BindReportViewer(Request.QueryString["busUnit"]);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private void BindReportViewer(string selectedORIG_BU)
        {
            ReportViewer1.Visible = true;

            ReportParameter[] param = new ReportParameter[1];
            param[0] = new ReportParameter("rptParamP_BU", selectedORIG_BU);
            ReportViewer1.LocalReport.SetParameters(param);

            this.ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportFiles/OpenStatusSort.rdlc");
            ReportViewer1.ProcessingMode = ProcessingMode.Local;
            ReportMCTR reportDataSet = new ReportMCTR();
            reportDataSet = getOpenStatusSortData(selectedORIG_BU);

            ReportDataSource rds = new ReportDataSource("dsOpenStatusSort", reportDataSet.Tables[reportDataSet.dtOpenStatusSort.TableName]);
            reportDataSet.Dispose();
            ReportViewer1.LocalReport.DataSources.Clear();
            ReportViewer1.LocalReport.DataSources.Add(rds);
            ReportViewer1.LocalReport.Refresh();
        }
        private ReportMCTR getOpenStatusSortData(string selectedORIG_BU)
        {
            #region SQL STATEMENT
            string sql = @"SELECT
                    TBL.STATUS_ID || '  ' || TBL.STATUS_DESCR AS CURRENT_STATUS,
                    TBL.FULL_NAME AS ORIGINATOR,
                    TBL.WORK_PHONE AS ORIG_PHONE,
                    TBL.MCTR_NO AS MCTR,
                    TBL.TITLE,
                    TBL.ORIG_DATE,
                    TBL.STATUS_DATE,
                    DECODE(RTRIM(TBL.INTRAY_FULL_NAME),',',' ',TBL.INTRAY_FULL_NAME) AS INTRAY_NAME,
                    TBL.INTRAY_PHONE AS INTRAY_PHONE,
                    TBL.DAYS,
                    DECODE(L.PROJ_TRANS_TYPE_FROM,NULL,'???',L.PROJ_TRANS_TYPE_FROM) AS PTT,
                    DECODE(COUNT(DISTINCT L.LINE_NO),NULL,0,COUNT(DISTINCT L.LINE_NO)) AS LINES,
                    DECODE(ABS(SUM(L.AMOUNT_FROM + L.ADJUSTMENT_FROM)),NULL,0,ABS(SUM(L.AMOUNT_FROM + L.ADJUSTMENT_FROM))) AS AMOUNT
                    FROM
                    (SELECT
                    H.MCTR_NO,
                    TRUNC(H.DATE_ENTER) AS ORIG_DATE,
                    H.STATUS_ID,
                    S.STATUS_DESCR,
                    H.TITLE,
                    (O.LAST_NAME || ', ' || O.FIRST_NAME) AS FULL_NAME,
                    O.WORK_PHONE,
                    DECODE(H.Status_Id,'SA',(SA.LAST_NAME || ', ' || SA.FIRST_NAME),
                                        'FA',(FA.LAST_NAME || ', ' || FA.FIRST_NAME),
                                        'AA',(AA.LAST_NAME || ', ' || AA.FIRST_NAME),
                                        'LB',(LB.LAST_NAME || ', ' || LB.FIRST_NAME),
                                        'LM',(LB.LAST_NAME || ', ' || LB.FIRST_NAME),
                                        'MA',(MA.LAST_NAME || ', ' || MA.FIRST_NAME),
                                        'CA',(CA.LAST_NAME || ', ' || CA.FIRST_NAME),
                                        'JA',(AA.LAST_NAME || ', ' || AA.FIRST_NAME),
                                        'SR',(SR.LAST_NAME || ', ' || SR.FIRST_NAME),
                                        ' ') as INTRAY_FULL_NAME,
                    DECODE(H.Status_Id,'SA',SA.WORK_PHONE,
                                        'FA',FA.WORK_PHONE,
                                        'AA',AA.WORK_PHONE,
                                        'LB',LB.WORK_PHONE,
                                        'LM',LB.WORK_PHONE,
                                        'MA',MA.WORK_PHONE,
                                        'CA',CA.WORK_PHONE,
                                        'JA',AA.WORK_PHONE,
                                        'SR',SR.WORK_PHONE,
                                        ' ') as INTRAY_PHONE,
                    MAX(TRUNC(SH.DATE_TIME_ENTERED)) AS STATUS_DATE,
                    MIN(TRUNC(SYSDATE) - TRUNC(SH.DATE_TIME_ENTERED)) AS DAYS
                    FROM
                    MCTR_HEADER H,
                    MCTR_EMPLOYEE_V O,
                    MCTR_EMPLOYEE_V SA,
                    MCTR_EMPLOYEE_V FA,
                    MCTR_EMPLOYEE_V AA,
                    MCTR_EMPLOYEE_V LB,
                    MCTR_EMPLOYEE_V MA,
                    MCTR_EMPLOYEE_V CA,
                    MCTR_EMPLOYEE_V SR,
                    MCTR_STATUS S,
                    MCTR_STATUS_HIST SH
                    WHERE
                    H.ORIG_BU = {0} and
                    H.STATUS_ID in ('OA','OR','SA','LA','FA','AA','LB','LM','MA','CA','SR','JA','IP') and
                    H.BEMS_ORIG = O.BEMS_ID(+) and
                    H.BEMS_SUPER = SA.BEMS_ID(+) and
                    H.BEMS_FIN_CTL = FA.BEMS_ID(+) and
                    H.BEMS_ACCT = AA.BEMS_ID(+) and
                    H.BEMS_LBR_ACCT = LB.BEMS_ID(+) and
                    H.BEMS_MATL_ACCT = MA.BEMS_ID(+) and
                    H.BEMS_COST_ACCT = CA.BEMS_ID(+) and
                    H.BEMS_SR_ACCT = SR.BEMS_ID(+) and
                    H.STATUS_ID = S.STATUS_ID(+) and
                    H.MCTR_NO = SH.MCTR_NO(+) 
                    GROUP BY
                    H.MCTR_NO,
                    TRUNC(H.DATE_ENTER),
                    H.STATUS_ID,
                    S.STATUS_DESCR,
                    H.TITLE,
                    O.LAST_NAME,
                    O.FIRST_NAME,
                    O.WORK_PHONE,
                    DECODE(H.Status_Id,'SA',(SA.LAST_NAME || ', ' || SA.FIRST_NAME),
                                        'FA',(FA.LAST_NAME || ', ' || FA.FIRST_NAME),
                                        'AA',(AA.LAST_NAME || ', ' || AA.FIRST_NAME),
                                        'LB',(LB.LAST_NAME || ', ' || LB.FIRST_NAME),
                                        'LM',(LB.LAST_NAME || ', ' || LB.FIRST_NAME),
                                        'MA',(MA.LAST_NAME || ', ' || MA.FIRST_NAME),
                                        'CA',(CA.LAST_NAME || ', ' || CA.FIRST_NAME),
                                        'JA',(AA.LAST_NAME || ', ' || AA.FIRST_NAME),
                                        'SR',(SR.LAST_NAME || ', ' || SR.FIRST_NAME),
                                        ' ') ,
                    DECODE(H.Status_Id,'SA',SA.WORK_PHONE,
                                        'FA',FA.WORK_PHONE,
                                        'AA',AA.WORK_PHONE,
                                        'LB',LB.WORK_PHONE,
                                        'LM',LB.WORK_PHONE,
                                        'MA',MA.WORK_PHONE,
                                        'CA',CA.WORK_PHONE,
                                        'JA',AA.WORK_PHONE,
                                        'SR',SR.WORK_PHONE,
                                        ' ')) TBL,
                    MCTR_LINE_ITEM L
                    WHERE TBL.MCTR_NO = L.MCTR_NO(+)
                    GROUP BY
                    TBL.STATUS_ID,
                    TBL.STATUS_DESCR,
                    TBL.STATUS_DATE,
                    TBL.FULL_NAME,
                    TBL.WORK_PHONE,
                    TBL.MCTR_NO,
                    TBL.TITLE,
                    TBL.ORIG_DATE,
                    DECODE(RTRIM(TBL.INTRAY_FULL_NAME),',',' ',TBL.INTRAY_FULL_NAME),
                    TBL.INTRAY_PHONE,
                    TBL.DAYS,
                    DECODE(L.PROJ_TRANS_TYPE_FROM,NULL,'???',L.PROJ_TRANS_TYPE_FROM)
                    ORDER BY
                    TBL.STATUS_ID,
                    TBL.FULL_NAME,
                    TBL.MCTR_NO,
                    DECODE(L.PROJ_TRANS_TYPE_FROM,NULL,'???',L.PROJ_TRANS_TYPE_FROM)";
            #endregion

            sql = string.Format(sql, "'" + selectedORIG_BU +"'");
            ReportMCTR reportDataSet = new ReportMCTR();  
            ReportsUtil reportsUtil = new ReportsUtil();
            try
            {
                return reportsUtil.GenerateReportsData(sql, reportDataSet, reportDataSet.dtOpenStatusSort.TableName);

            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                reportDataSet.Dispose();
            }
        }
    }
}