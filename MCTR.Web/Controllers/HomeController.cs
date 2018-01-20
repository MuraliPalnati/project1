using log4net;
using MCTR.Web.Util;
using System;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;

namespace MCTR.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILog logger;
        public HomeController()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        }
        // GET: Home
        public ActionResult Home()
        {
            string MCTRWebUrl = Request.Url.ToString();
            try
            {
                string currentEnvironment = string.Empty;
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
                            TempData["Environment"] = "Finance Accounting Development";
                            break;
                        }
                    case "pre":
                        {
                            TempData["Environment"] = "Finance Accounting Test";
                            break;
                        }
                    case "prod":
                        {
                            TempData["Environment"] = "Finance Accounting Production";
                            break;
                        }
                    default:
                        {
                            TempData["Environment"] = "Finance Accounting Development";
                            break;
                        }
                }
            }
            catch (Exception e)
            {
                //return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
            //TempData["Environment"] = ConfigurationManager.AppSettings["Environment"].ToString();
            return View();
        }

        public FileResult GetUserGuide() {
            return GetFile("UserGuide");
        }

        public FileResult GetOverView()
        {
            return GetFile("Overview");
        }

        public FileResult GetEASRelatedFields()
        {
            return GetFile("Overview\\EASFields");
        }

        public FileResult GetWorkflow()
        {
            return GetFile("Overview\\WorkFlow");
        }

        public FileResult GetAccess()
        {
            return GetFile("Access");
        }
        public FileResult GetResourceTroubleShooting()
        {
            return GetFile("Resource\\Troubleshooting");
        }

        public FileResult GetResourceDesktopIcons()
        {
            return GetFile("Resource\\DesktopIcons");
        }
        public FileResult GetBatchLoadTemplate()
        {
            return GetFile("BatchLoad\\ExcelTemplate");
        }
        public FileResult GetBatchLoadTemplateInstrtns()
        {
            return GetFile("BatchLoad\\TemplateInstructions");
        }

        public FileResult GetFile(string folderName) {

            var docUtil = new DocumentsUtil();
            //var directoryArray = Request.Path.Split(('\').ToCharArray());
            //logger.Info("directoryArray: "+ directoryArray);
            var path = HostingEnvironment.ApplicationPhysicalPath + "\\Documents\\";
            logger.Info("path: " + path);
            var document = docUtil.GetDownloadFile(path + folderName+"\\");
            logger.Info("path: " + document);
            string contentType = MimeMapping.GetMimeMapping(document.DocumentName);
            var cd = new System.Net.Mime.ContentDisposition
            {
                FileName = document.DocumentName,
                Inline = false,
            };
            Response.AppendHeader("Content-Disposition", cd.ToString());
            return File(document.DocumentBlob, contentType);
            //throw new Exception(HostingEnvironment.ApplicationPhysicalPath);
        }
    }
}
