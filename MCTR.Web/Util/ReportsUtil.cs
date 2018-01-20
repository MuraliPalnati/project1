using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Configuration;

namespace MCTR.Web.Util
{
    public class ReportsUtil
    {
        public ReportMCTR GenerateReportsData(string sql, ReportMCTR reportDataSet , string tableName)
        {
            try
            {
                OracleConnection cn = new OracleConnection(getConstring());
                OracleCommand cmd = new OracleCommand(sql, cn);
                cmd.CommandType = System.Data.CommandType.Text;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                da.Fill(reportDataSet, tableName);
                da.Dispose();
                cmd.Dispose();
                cn.Close();
                cn.Dispose();
                return reportDataSet;

            }
            catch (DbEntityValidationException dbEx)
            {

                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        Trace.TraceInformation("Property: {0} Error: {1}",
                                                validationError.PropertyName,
                                                validationError.ErrorMessage);
                        throw;
                    }
                }

            }

            return reportDataSet;
        }

        public static string getConstring()
        {
            string URL = string.Empty;
            string currentEnvironment = string.Empty;
            string MCTRWebUrl = HttpContext.Current.Request.Url.ToString();
            try
            {
#if DEBUG
               MCTRWebUrl = "https://mctr-dev.web.boeing.com/MCTRRESTService/api/";
#endif

                string[] MCTRURLSplitArray = MCTRWebUrl.Split('-');

                if (MCTRURLSplitArray.Count() > 0)
                {
                    string[] MCTREnvironmentSplitArray = MCTRURLSplitArray[1].Split('.');
                    if (MCTREnvironmentSplitArray.Count() > 0)
                    {
                        currentEnvironment = MCTREnvironmentSplitArray[0].ToString();
                    }
                }

                switch (currentEnvironment)
                {
                    case "dev":
                        {
                            URL = ConfigurationManager.ConnectionStrings["MCTRDbEntities_Dev"].ConnectionString;
                            break;
                        }
                    case "pre":
                        {
                            URL = ConfigurationManager.ConnectionStrings["MCTRDbEntities_Pre"].ConnectionString;
                            break;
                        }
                    case "prod":
                        {
                            URL = ConfigurationManager.ConnectionStrings["MCTRDbEntities_Prod"].ConnectionString;
                            break;
                        }
                    default:
                        {
                            URL = ConfigurationManager.ConnectionStrings["MCTRDbEntities_Dev"].ConnectionString;
                            break;
                        }
                }
            }
            catch (Exception e)
            {
                //return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
//#if DEBUG
           //URL = "http://localhost:64772/api/";
//#endif

            return URL;
        }
    }
}