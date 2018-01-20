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
    public partial class JrnlByDate : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                ReportViewer1.Visible = true;
                if (!IsPostBack)
                {
                    BindReportViewer(Request.QueryString["busUnit"], Request.QueryString["fromDate"], Request.QueryString["toDate"], Request.QueryString["bemsFinCntrl"], Request.QueryString["bemsOrig"]);
                    BindReportViewer(Request.QueryString["busUnit"], Request.QueryString["fromDate"], Request.QueryString["toDate"], Request.QueryString["bemsFinCntrl"], Request.QueryString["bemsOrig"]);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private void BindReportViewer(string busUnit,string fromDate, string toDate, string bemsFinCntrl, string bemsOrig)
        {
            ReportViewer1.Visible = true;
            if (bemsFinCntrl == "")
            {
                bemsFinCntrl = "%";
            }
            if (bemsOrig == "")
            {
                bemsOrig = "%";
            }
            ReportParameter[] param = new ReportParameter[5];
            param[0] = new ReportParameter("rptParamF_BU", busUnit);
            param[1] = new ReportParameter("rptParamF_FROM_DATE", fromDate);
            param[2] = new ReportParameter("rptParamF_TO_DATE", toDate);
            param[3] = new ReportParameter("rptParamF_BEMS_ORIG", bemsOrig);
            param[4] = new ReportParameter("rptParamF_BEMS_FIN_CTL", bemsFinCntrl);

            ReportViewer1.LocalReport.SetParameters(param);
            this.ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/ReportFiles/JrnlbyDate.rdlc");
            ReportViewer1.ProcessingMode = ProcessingMode.Local;
            ReportMCTR reportDataSet = new ReportMCTR();
            reportDataSet = getOpenStatusSortData(busUnit, fromDate, toDate, bemsFinCntrl, bemsOrig);
           
            ReportDataSource rds = new ReportDataSource("dsJrnlByDate", reportDataSet.Tables[reportDataSet.dtJrnlByDate.TableName]);
            reportDataSet.Dispose();
            ReportViewer1.LocalReport.DataSources.Clear();
            ReportViewer1.LocalReport.DataSources.Add(rds);
            ReportViewer1.LocalReport.Refresh();
        }
        private ReportMCTR getOpenStatusSortData(string selectedORIG_BU,string FromDate, string ToDate,string BEMSORIG,string BESMFINCTL )
        {
            string sql = "";
            #region SQL STATEMENT
            sql = @"SELECT fx109 AS ORIG_GRP,
                  fx108 AS ORIG_BU,
                  fx111 AS JRNL_YEAR,
                  TRUNC(fx105) AS DATE_JRNLD,
                  fx103 AS APPL_JRNL_ID,
                  fx107 AS JV_ITEM_CD,
                  TRUNC(fx104) AS DATE_ENTER,
                  fx110 AS STATUS_ID,
                  fx106 AS OH_BASE_YR,
                  fx100 AS MCTR_NO,
                  fx102 AS LI_CNTED,
                  fx101 AS LAST_LI_NO,
                  fx116 AS ABSOLUTE_QTY,
                  fx115 AS ABSOLUTE_AMT,
                  fx121+fx120+fx119+fx118+fx117 AS BALANCE,
                  fx114 AS LI_FROM_QTY,
                  fx121 AS LI_FROM_AMT,
                  fx118 AS OH_FROM_AMT,
                  fx113 AS LI_TO_QTY,
                  fx120 AS LI_TO_AMT,
                  fx117 AS OH_TO_AMT,
                  fx119 AS OFFSET_AMT,
                  fx150 AS BEMS_ORIG, ORIG_LNAME, ORIG_FNAME, fx151 AS BEMS_FIN_CTL,
                  DECODE(EMPLVW.LAST_NAME,NULL,' ',EMPLVW.LAST_NAME) AS FIN_CTL_LNAME,
                  DECODE(EMPLVW.FIRST_NAME,NULL,' ',EMPLVW.FIRST_NAME)AS FIN_CTL_FNAME,
                  TITLE,
                  DECODE(fx155,NULL,' ',fx155) AS REASON_CODE,
                  DECODE(REASON_DESCR,NULL,' ',REASON_DESCR) AS REASON_DESCR,
                  DECODE(PROG_DAYS_HIST,NULL,' ',PROG_DAYS_HIST) AS PROG_DAYS_HIST,
                  DECODE(ACCT_DAYS_HIST,NULL,' ',ACCT_DAYS_HIST) AS ACCT_DAYS_HIST,
                  DECODE(TOTAL_DAYS,NULL,' ',TOTAL_DAYS) AS TOTAL_DAYS
             FROM (SELECT o104607.MCTR_NO AS fx112,
                     (SUM(o104643.LI_TO_QTY)) AS fx113,
                     (SUM(o104643.LI_FROM_QTY)) AS fx114,
                     (SUM(o104643.ABSOLUTE_AMT)) AS fx115,
                     (SUM(o104643.ABSOLUTE_QTY)) AS fx116,
                     (SUM(o104643.OH_TO_AMT)) AS fx117,
                     (SUM(o104643.OH_FROM_AMT)) AS fx118,
                     (SUM(o104643.OFFSET_AMT)) AS fx119,
                     (SUM(o104643.LI_TO_AMT)) AS fx120,
                     (SUM(o104643.LI_FROM_AMT)) AS fx121
                     FROM MCTR_OWNER.MCTR_HEADER o104607,
                          MCTR_OWNER.MCTR_AMOUNT_V o104643
                    WHERE o104607.MCTR_NO = o104643.MCTR_NO(+)
                    GROUP BY o104607.MCTR_NO),
                 (SELECT o104607.MCTR_NO AS fx100,
                        (MAX(o104642.LINE_NO)) AS fx101,
                        (COUNT(o104642.LINE_NO)) AS fx102,
                         o104607.APPL_JRNL_ID AS fx103,
                         o104607.DATE_ENTER AS fx104,
                         o104607.DATE_JOURNAL AS fx105,
                         o104607.FISCAL_YEAR AS fx106,
                         o104607.JV_ITEM_CD AS fx107,
                         o104607.ORIG_BU AS fx108,
                         o104607.ORIG_GROUP AS fx109,
                         o104607.STATUS_ID AS fx110,
                        (TO_CHAR(TRUNC(o104607.DATE_JOURNAL,'YYYY'),'YYYY')) AS fx111,
                         o104607.TITLE,
                         o104607.BEMS_ORIG AS fx150, o104607.BEMS_FIN_CTL AS fx151,
                         DECODE(EMPLTBL.LAST_NAME,NULL,' ',EMPLTBL.LAST_NAME) AS ORIG_LNAME,
                         DECODE(EMPLTBL.FIRST_NAME,NULL,' ',EMPLTBL.FIRST_NAME)AS ORIG_FNAME,
                         o104607.REASON_CODE AS fx155
                    FROM MCTR_OWNER.MCTR_HEADER o104607,
                         MCTR_OWNER.MCTR_LINE_ITEM o104642,
                         MCTR_EMPLOYEE_V EMPLTBL
                   WHERE o104607.MCTR_NO = o104642.MCTR_NO(+)
                     AND o104607.ORIG_BU = {0}
                     AND o104607.STATUS_ID = '99'
                     AND o104607.DATE_JOURNAL IS NOT NULL
                     AND TRUNC(o104607.DATE_JOURNAL) >= {1}
                     AND TRUNC(o104607.DATE_JOURNAL) >= {2}
                     AND o104607.BEMS_ORIG LIKE {3}
                     AND o104607.BEMS_FIN_CTL LIKE {4}
                     AND (o104642.MTL_JRNL(+) = 'N')
                     AND o104607.BEMS_ORIG = EMPLTBL.BEMS_ID(+)
                   GROUP
                      BY (TO_CHAR(TRUNC(o104607.DATE_JOURNAL,'YYYY'),'YYYY')),
                         o104607.TITLE, o104607.BEMS_ORIG, o104607.BEMS_FIN_CTL,
                         o104607.STATUS_ID, o104607.REASON_CODE,
                         o104607.ORIG_GROUP, o104607.ORIG_BU,
                         o104607.JV_ITEM_CD, o104607.FISCAL_YEAR,
                         o104607.DATE_JOURNAL,o104607.DATE_ENTER,
                         o104607.APPL_JRNL_ID, o104607.MCTR_NO,
                         DECODE(EMPLTBL.LAST_NAME,NULL,' ',EMPLTBL.LAST_NAME),
                         DECODE(EMPLTBL.FIRST_NAME,NULL,' ',EMPLTBL.FIRST_NAME)),
                  MCTR_EMPLOYEE_V EMPLVW,
                  MCTR_REASON_CODE RC,
                  MCTR_RPTNG_CYCLE_TIME_V CT
            WHERE fx100 = fx112
              AND fx100 = CT.MCTR_NO
              AND fx151 = EMPLVW.BEMS_ID(+)
              AND fx155 = RC.REASON_CODE(+)
            ORDER
               BY fx111 ASC, fx105 ASC, fx103 ASC, fx107 ASC, fx106 ASC, fx100 ASC";
            #endregion

            sql = string.Format(sql, "'"+selectedORIG_BU+"'", "'"+ FromDate + "'", "'" + ToDate + "'", "'"+BEMSORIG+"'", "'"+BESMFINCTL+"'");
            ReportMCTR reportDataSet = new ReportMCTR();
            ReportsUtil reportsUtil = new ReportsUtil();
            
            try
            {
                return reportsUtil.GenerateReportsData(sql, reportDataSet, reportDataSet.dtJrnlByDate.TableName);
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