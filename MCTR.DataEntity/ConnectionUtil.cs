using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Configuration;

namespace MCTR.DataEntity
{
    public static class ConnectionUtil
    {
        public static string GetConnectionString()
        {
            string connString = string.Empty;
            string currentEnvironment = string.Empty;
            string MCTRRestUrl = HttpContext.Current.Request.Url.ToString();
            try
            {
#if DEBUG
                MCTRRestUrl = "https://mctr-dev.web.boeing.com/MCTRRESTService/api/";
#endif

                string[] MCTRURLSplitArray = MCTRRestUrl.Split('-');

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
                            connString = ConfigurationManager.ConnectionStrings["MCTRDbEntities_Dev"].ConnectionString;
                            break;
                        }
                    case "pre":
                        {
                            connString = ConfigurationManager.ConnectionStrings["MCTRDbEntities_Pre"].ConnectionString;
                            break;
                        }
                    case "prod":
                        {
                            connString = ConfigurationManager.ConnectionStrings["MCTRDbEntities_Prod"].ConnectionString;
                            break;
                        }
                    default:
                        connString = ConfigurationManager.ConnectionStrings["MCTRDbEntities_Dev"].ConnectionString;
                        break;
                }
            }
            catch (Exception e)
            {
                //return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
            return connString;
        }
    }
}
