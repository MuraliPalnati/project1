using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

using System.IO;
using log4net;

namespace MCTR.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
           
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
         
            log4net.Config.XmlConfigurator.Configure(new FileInfo(Server.MapPath("~/Web.config")));
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            Exception GlobalException = Server.GetLastError();
            ILog logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
            logger.Fatal("Gloabl Error Handler --" + GlobalException.Message);
            Server.ClearError();

            HttpException httpException = GlobalException as HttpException;
            if (httpException != null)
            {
                Response.StatusCode = httpException.GetHttpCode();
                Response.Write(httpException.Message);
            }
            else
            {
                Response.Write("Application Level Error ");
            }
        }
    }
}
