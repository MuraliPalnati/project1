///*************************************************************************
/// 
/// BOEING CONFIDENTIAL
/// ___________________
/// 
///  BOEING is a trademark of Boeing Management Company.
///
///  Copyright ? 2016 Boeing. All rights reserved.
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
/// Author           : Generated by ATMA ?
/// Revision History :  

using log4net;
using MCTR.DomainEntity;
using MCTR.Web.Handlers;
using MCTR.Web.Util;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Mvc;
using MCTR.Web.Security;
using System.Text;
using AutoMapper;

namespace MCTR.Web.Controllers
{
    ///*********************************************************************
    ///<summary>
    ///StatHistBlController is a web controller implementation for the 
    ///StatHistBl screen.
    ///</summary>
    ///
    [CustomAuthorize]
    public class StatHistBlController : Controller
    {
         private readonly ILog logger;
        public StatHistBlController()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        }

        public ActionResult mctrStatusHistOnLoad() {
            return PartialView("_StatHistBl");
        }

        public ActionResult mctrStatusHistOnLoadCreateForm(int mctrNo)
        {
            try
            {
                StatHistBlHandler statHistBlHandler = new StatHistBlHandler();

                StatusHistory stat = new StatusHistory();
                stat.MCTRNO = mctrNo;

                var statHistBl = stat;

                logger.Debug("Executing statHistBlHandler.mctrStatusHistMctrStatusHistOnLoad().");
                var statHistBlResp = statHistBlHandler.mctrStatusHistMctrStatusHistOnLoad(statHistBl);
                logger.Info("Response Received : " + statHistBlResp);
                var response = statHistBlResp.First().SHHeader.First();
                return PartialView("_StatHistBl", response);
            }
            catch(Exception e)
            {
                logger.Info("Response received from StatHistBlController.mctrStatusHistOnLoadCreateForm() : " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : mctrStatusHistMctrStatusHistOnLoad
        ///</summary>
        ///<param name = "mctrNo"></param>
        ///<returns>IEnumerable<StatHistBl> </returns>

        public JsonResult mctrStatusHistMctrStatusHistOnLoad(int mctrNo)
        {
            try
            {
                logger.Info("Executing mctrStatusHistMctrStatusHistOnLoad() : ");

                StatHistBlHandler statHistBlHandler = new StatHistBlHandler();
                //Remove static instialization of Objects
                var statHistBl = new StatusHistory();
                var statHistH = new StatusHistHeader() { Mctr_No = mctrNo };
                List<StatusHistHeader> statusHeader = new List<StatusHistHeader>();
                statusHeader.Add(statHistH);
                statHistBl.SHHeader = statusHeader;

                logger.Debug("Executing statHistBlHandler.mctrStatusHistMctrStatusHistOnLoad().");
                var statHistBlResp = statHistBlHandler.mctrStatusHistMctrStatusHistOnLoad(statHistBl);
                logger.Info("Response Received : " + statHistBlResp);
                var response = statHistBlResp.First();
                return Json(response.SHBody, JsonRequestBehavior.AllowGet);

            }
            catch(Exception e)
            {
                logger.Info("Response received from StatHistBlController.mctrStatusHistOnLoad() : " + e.Message);
                throw;
            }
        }
        public FileResult mctrDownload(int mctrNo)
        {
            var satushistory = new StatusHistory();
            satushistory.MCTRNO = mctrNo;
            StatHistBlHandler statHistBlHandler = new StatHistBlHandler();
            try
            {
                var ReportResp = statHistBlHandler.mctrStatusHistMctrStatusHistOnLoad(satushistory).ToList();
                string fileName = "xtrt-MCTR-STAT-HIST-LIST-" + DateTime.Now.ToString("yyyyMMddTHHmmss");
                var firstRow = @"MCTR-HEADER for " + satushistory.MCTRNO;
                var result = HandlerUtil<StatusHistHeader>.statusheader(ReportResp.First().SHHeader.ToList(), firstRow);
                var firstRow1 = @"MCTR-STATUS-HISTORY for " + satushistory.MCTRNO;
                var secondRow1 = @"End of Data Export Listing";
                var result1 = HandlerUtil<StatHistBl>.statusbody(ReportResp.First().SHBody.ToList(), result, firstRow1, secondRow1);
                return GetAdminReport(result1, fileName);
            }
            catch (Exception e)
            {
                logger.Info("Response received from StatHistBlController.mctrStatusHistOnLoad() : " + e.Message);
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
            try { 
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
            catch(Exception e)
            {
                logger.Info("Response received from StatHistBlController.mctrStatusHistOnLoad() : " + e.Message);
                throw;
            }
        }


        ///*************************************************************
        ///<summary>
        ///Method Name : mctrStatusHistMctrStatusHistOnLoad
        ///</summary>
        ///<param name = "StatHistBl"></param>
        ///<returns>IEnumerable<StatHistBl> </returns>

        [HttpPost]
        public ActionResult mctrStatusHistDownload(StatusHistory statHistBl)
        {
            try
            {
                logger.Info("Executing mctrStatusHistMctrStatusHistOnLoad() : " + statHistBl);
                if (statHistBl != null)
                {
                    StatHistBlHandler statHistBlHandler = new StatHistBlHandler();
                    logger.Debug("Executing statHistBlHandler.mctrStatusHistMctrStatusHistOnLoad().");
                    var statHistBlResp = statHistBlHandler.mctrStatusHistMctrStatusHistOnLoad(statHistBl);

                    logger.Info("Response Received : " + statHistBlResp);
                    return View("StatHistBl", statHistBlResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch(Exception e)
            {
                logger.Info("Response received from StatHistBlController.mctrStatusHistDownload() : " + e.Message);
                throw;
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : mctrStatusHisthistButtonCloseWhenButtonPressed
        ///</summary>
        ///<param name = "StatHistBl"></param>
        ///<returns>IEnumerable<StatHistBl> </returns>

        [HttpPost]
        public ActionResult mctrStatusHisthistButtonCloseWhenButtonPressed(StatHistBl statHistBl)
        {
            try
            {
                logger.Info("Executing mctrStatusHisthistButtonCloseWhenButtonPressed() : " + statHistBl);
                if (statHistBl != null)
                {
                    StatHistBlHandler statHistBlHandler = new StatHistBlHandler();
                    logger.Debug("Executing statHistBlHandler.mctrStatusHisthistButtonCloseWhenButtonPressed().");
                    var statHistBlResp = statHistBlHandler.mctrStatusHisthistButtonCloseWhenButtonPressed(statHistBl);
                    logger.Info("Response Received : " + statHistBlResp);
                    return View("StatHistBl", statHistBlResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch(Exception e)
            {
                logger.Info("Response received from StatHistBlController.mctrStatusHisthistButtonCloseWhenButtonPressed() : " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : mctrStatusHistPostQuery
        ///</summary>
        ///<param name = "StatHistBl"></param>
        ///<returns>IEnumerable<StatHistBl> </returns>

        [HttpPost]
        public ActionResult mctrStatusHistPostQuery(StatHistBl statHistBl)
        {
            try
            {
                logger.Info("Executing mctrStatusHistPostQuery() : " + statHistBl);
                if (statHistBl != null)
                {
                    StatHistBlHandler statHistBlHandler = new StatHistBlHandler();
                    logger.Debug("Executing statHistBlHandler.mctrStatusHistPostQuery().");
                    var statHistBlResp = statHistBlHandler.mctrStatusHistPostQuery(statHistBl);
                    logger.Info("Response Received : " + statHistBlResp);
                    return View("StatHistBl", statHistBlResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch(Exception e)
            {
                logger.Info("Response received from StatHistBlController.mctrStatusHistPostQuery() : " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : selectionrgrpSortWhenRadioChanged
        ///</summary>
        ///<param name = "StatHistBl"></param>
        ///<returns>IEnumerable<StatHistBl> </returns>

        [HttpPost]
        public ActionResult selectionrgrpSortWhenRadioChanged(StatHistBl statHistBl)
        {
            try
            {
                logger.Info("Executing selectionrgrpSortWhenRadioChanged() : " + statHistBl);
                if (statHistBl != null)
                {
                    StatHistBlHandler statHistBlHandler = new StatHistBlHandler();
                    logger.Debug("Executing statHistBlHandler.selectionrgrpSortWhenRadioChanged().");
                    var statHistBlResp = statHistBlHandler.selectionrgrpSortWhenRadioChanged(statHistBl);
                    logger.Info("Response Received : " + statHistBlResp);
                    return View("StatHistBl", statHistBlResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch(Exception e)
            {
                logger.Info("Response received from StatHistBlController.selectionrgrpSortWhenRadioChanged() : " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : selectionbutToXlsWhenButtonPressed
        ///</summary>
        ///<param name = "StatHistBl"></param>
        ///<returns>IEnumerable<StatHistBl> </returns>

        [HttpPost]
        public ActionResult selectionbutToXlsWhenButtonPressed(StatHistBl statHistBl)
        {
            try
            {
                logger.Info("Executing selectionbutToXlsWhenButtonPressed() : " + statHistBl);
                if (statHistBl != null)
                {
                    StatHistBlHandler statHistBlHandler = new StatHistBlHandler();
                    logger.Debug("Executing statHistBlHandler.selectionbutToXlsWhenButtonPressed().");
                    var statHistBlResp = statHistBlHandler.selectionbutToXlsWhenButtonPressed(statHistBl);
                    logger.Info("Response Received : " + statHistBlResp);
                    return View("StatHistBl", statHistBlResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch(Exception e)
            {
                logger.Info("Response received from StatHistBlController.selectionbutToXlsWhenButtonPressed() : " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : webutildummyWhenButtonPressed
        ///</summary>
        ///<param name = "StatHistBl"></param>
        ///<returns>IEnumerable<StatHistBl> </returns>

        [HttpPost]
        public ActionResult webutildummyWhenButtonPressed(StatHistBl statHistBl)
        {
            try
            {
                logger.Info("Executing webutildummyWhenButtonPressed() : " + statHistBl);
                if (statHistBl != null)
                {
                    StatHistBlHandler statHistBlHandler = new StatHistBlHandler();
                    logger.Debug("Executing statHistBlHandler.webutildummyWhenButtonPressed().");
                    var statHistBlResp = statHistBlHandler.webutildummyWhenButtonPressed(statHistBl);
                    logger.Info("Response Received : " + statHistBlResp);
                    return View("StatHistBl", statHistBlResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch(Exception e)
            {
                logger.Info("Response received from StatHistBlController.webutildummyWhenButtonPressed() : " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : webutilwebutilClientinfoFunctionsWhenCustomItemEvent
        ///</summary>
        ///<param name = "StatHistBl"></param>
        ///<returns>IEnumerable<StatHistBl> </returns>

        [HttpPost]
        public ActionResult webutilwebutilClientinfoFunctionsWhenCustomItemEvent(StatHistBl statHistBl)
        {
            try
            {
                logger.Info("Executing webutilwebutilClientinfoFunctionsWhenCustomItemEvent() : " + statHistBl);
                if (statHistBl != null)
                {
                    StatHistBlHandler statHistBlHandler = new StatHistBlHandler();
                    logger.Debug("Executing statHistBlHandler.webutilwebutilClientinfoFunctionsWhenCustomItemEvent().");
                    var statHistBlResp = statHistBlHandler.webutilwebutilClientinfoFunctionsWhenCustomItemEvent(statHistBl);
                    logger.Info("Response Received : " + statHistBlResp);
                    return View("StatHistBl", statHistBlResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch(Exception e)
            {
                logger.Info("Response received from StatHistBlController.webutilwebutilClientinfoFunctionsWhenCustomItemEvent() : " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : webutilwebutilFileFunctionsWhenCustomItemEvent
        ///</summary>
        ///<param name = "StatHistBl"></param>
        ///<returns>IEnumerable<StatHistBl> </returns>

        [HttpPost]
        public ActionResult webutilwebutilFileFunctionsWhenCustomItemEvent(StatHistBl statHistBl)
        {
            try
            {
                logger.Info("Executing webutilwebutilFileFunctionsWhenCustomItemEvent() : " + statHistBl);
                if (statHistBl != null)
                {
                    StatHistBlHandler statHistBlHandler = new StatHistBlHandler();
                    logger.Debug("Executing statHistBlHandler.webutilwebutilFileFunctionsWhenCustomItemEvent().");
                    var statHistBlResp = statHistBlHandler.webutilwebutilFileFunctionsWhenCustomItemEvent(statHistBl);
                    logger.Info("Response Received : " + statHistBlResp);
                    return View("StatHistBl", statHistBlResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch(Exception e)
            {
                logger.Info("Response received from StatHistBlController.webutilwebutilFileFunctionsWhenCustomItemEvent() : " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : webutilwebutilHostFunctionsWhenCustomItemEvent
        ///</summary>
        ///<param name = "StatHistBl"></param>
        ///<returns>IEnumerable<StatHistBl> </returns>
        [HttpPost]
        public ActionResult webutilwebutilHostFunctionsWhenCustomItemEvent(StatHistBl statHistBl)
        {
            try {
                logger.Info("Executing webutilwebutilHostFunctionsWhenCustomItemEvent() : " + statHistBl);
                if (statHistBl != null)
                {
                    StatHistBlHandler statHistBlHandler = new StatHistBlHandler();
                    logger.Debug("Executing statHistBlHandler.webutilwebutilHostFunctionsWhenCustomItemEvent().");
                    var statHistBlResp = statHistBlHandler.webutilwebutilHostFunctionsWhenCustomItemEvent(statHistBl);
                    logger.Info("Response Received : " + statHistBlResp);
                    return View("StatHistBl", statHistBlResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch(Exception e)
            {
                logger.Info("Response received from StatHistBlController.webutilwebutilHostFunctionsWhenCustomItemEvent() : " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : webutilwebutilSessionFunctionsWhenCustomItemEvent
        ///</summary>
        ///<param name = "StatHistBl"></param>
        ///<returns>IEnumerable<StatHistBl> </returns>

        [HttpPost]
        public ActionResult webutilwebutilSessionFunctionsWhenCustomItemEvent(StatHistBl statHistBl)
        {
            try
            {
                logger.Info("Executing webutilwebutilSessionFunctionsWhenCustomItemEvent() : " + statHistBl);
                if (statHistBl != null)
                {
                    StatHistBlHandler statHistBlHandler = new StatHistBlHandler();
                    logger.Debug("Executing statHistBlHandler.webutilwebutilSessionFunctionsWhenCustomItemEvent().");
                    var statHistBlResp = statHistBlHandler.webutilwebutilSessionFunctionsWhenCustomItemEvent(statHistBl);
                    logger.Info("Response Received : " + statHistBlResp);
                    return View("StatHistBl", statHistBlResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch(Exception e )
            {
                logger.Info("Response received from StatHistBlController.webutilwebutilHostFunctionsWhenCustomItemEvent() : " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : webutilwebutilFiletransferFunctionsWhenCustomItemEvent
        ///</summary>
        ///<param name = "StatHistBl"></param>
        ///<returns>IEnumerable<StatHistBl> </returns>

        [HttpPost]
        public ActionResult webutilwebutilFiletransferFunctionsWhenCustomItemEvent(StatHistBl statHistBl)
        {
            try
            {
                logger.Info("Executing webutilwebutilFiletransferFunctionsWhenCustomItemEvent() : " + statHistBl);
                if (statHistBl != null)
                {
                    StatHistBlHandler statHistBlHandler = new StatHistBlHandler();
                    logger.Debug("Executing statHistBlHandler.webutilwebutilFiletransferFunctionsWhenCustomItemEvent().");
                    var statHistBlResp = statHistBlHandler.webutilwebutilFiletransferFunctionsWhenCustomItemEvent(statHistBl);
                    logger.Info("Response Received : " + statHistBlResp);
                    return View("StatHistBl", statHistBlResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch(Exception e)
            {
                logger.Info("Response received from StatHistBlController.webutilwebutilFiletransferFunctionsWhenCustomItemEvent() : " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : webutilwebutilOleFunctionsWhenCustomItemEvent
        ///</summary>
        ///<param name = "StatHistBl"></param>
        ///<returns>IEnumerable<StatHistBl> </returns>

        [HttpPost]
        public ActionResult webutilwebutilOleFunctionsWhenCustomItemEvent(StatHistBl statHistBl)
        {
            try
            {
                logger.Info("Executing webutilwebutilOleFunctionsWhenCustomItemEvent() : " + statHistBl);
                if (statHistBl != null)
                {
                    StatHistBlHandler statHistBlHandler = new StatHistBlHandler();
                    logger.Debug("Executing statHistBlHandler.webutilwebutilOleFunctionsWhenCustomItemEvent().");
                    var statHistBlResp = statHistBlHandler.webutilwebutilOleFunctionsWhenCustomItemEvent(statHistBl);
                    logger.Info("Response Received : " + statHistBlResp);
                    return View("StatHistBl", statHistBlResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch(Exception e)
            {
                logger.Info("Response received from StatHistBlController.webutilwebutilOleFunctionsWhenCustomItemEvent() : " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : webutilwebutilCApiFunctionsWhenCustomItemEvent
        ///</summary>
        ///<param name = "StatHistBl"></param>
        ///<returns>IEnumerable<StatHistBl> </returns>

        [HttpPost]
        public ActionResult webutilwebutilCApiFunctionsWhenCustomItemEvent(StatHistBl statHistBl)
        {
            try {
                logger.Info("Executing webutilwebutilCApiFunctionsWhenCustomItemEvent() : " + statHistBl);
                if (statHistBl != null)
                {
                    StatHistBlHandler statHistBlHandler = new StatHistBlHandler();
                    logger.Debug("Executing statHistBlHandler.webutilwebutilCApiFunctionsWhenCustomItemEvent().");
                    var statHistBlResp = statHistBlHandler.webutilwebutilCApiFunctionsWhenCustomItemEvent(statHistBl);
                    logger.Info("Response Received : " + statHistBlResp);
                    return View("StatHistBl", statHistBlResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch(Exception e)
            {
                logger.Info("Response received from StatHistBlController.webutilwebutilOleFunctionsWhenCustomItemEvent() : " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : webutilwebutilBrowserFunctionsWhenCustomItemEvent
        ///</summary>
        ///<param name = "StatHistBl"></param>
        ///<returns>IEnumerable<StatHistBl> </returns>

        [HttpPost]
        public ActionResult webutilwebutilBrowserFunctionsWhenCustomItemEvent(StatHistBl statHistBl)
        {
            try
            {
                logger.Info("Executing webutilwebutilBrowserFunctionsWhenCustomItemEvent() : " + statHistBl);
                if (statHistBl != null)
                {
                    StatHistBlHandler statHistBlHandler = new StatHistBlHandler();
                    logger.Debug("Executing statHistBlHandler.webutilwebutilBrowserFunctionsWhenCustomItemEvent().");
                    var statHistBlResp = statHistBlHandler.webutilwebutilBrowserFunctionsWhenCustomItemEvent(statHistBl);
                    logger.Info("Response Received : " + statHistBlResp);
                    return View("StatHistBl", statHistBlResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch(Exception e)
            {
                logger.Info("Response received from StatHistBlController.webutilwebutilBrowserFunctionsWhenCustomItemEvent() : " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : statHistBlWhenNewFormInstance
        ///</summary>
        ///<param name = "StatHistBl"></param>
        ///<returns>IEnumerable<StatHistBl> </returns>

        [HttpPost]
        public ActionResult statHistBlWhenNewFormInstance(StatHistBl statHistBl)
        {
            try
            {
                logger.Info("Executing statHistBlWhenNewFormInstance() : " + statHistBl);
                if (statHistBl != null)
                {
                    StatHistBlHandler statHistBlHandler = new StatHistBlHandler();
                    logger.Debug("Executing statHistBlHandler.statHistBlWhenNewFormInstance().");
                    var statHistBlResp = statHistBlHandler.statHistBlWhenNewFormInstance(statHistBl);
                    logger.Info("Response Received : " + statHistBlResp);
                    return View("StatHistBl", statHistBlResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch(Exception e)
            {
                logger.Info("Response received from StatHistBlController.statHistBlWhenNewFormInstance() : " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : statHistBlWhenWindowClosed
        ///</summary>
        ///<param name = "StatHistBl"></param>
        ///<returns>IEnumerable<StatHistBl> </returns>

        [HttpPost]
        public ActionResult statHistBlWhenWindowClosed(StatHistBl statHistBl)
        {
            try
            {
                logger.Info("Executing statHistBlWhenWindowClosed() : " + statHistBl);
                if (statHistBl != null)
                {
                    StatHistBlHandler statHistBlHandler = new StatHistBlHandler();
                    logger.Debug("Executing statHistBlHandler.statHistBlWhenWindowClosed().");
                    var statHistBlResp = statHistBlHandler.statHistBlWhenWindowClosed(statHistBl);
                    logger.Info("Response Received : " + statHistBlResp);
                    return View("StatHistBl", statHistBlResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch(Exception e)
            {
                logger.Info("Response received from StatHistBlController.statHistBlWhenWindowClosed() : " + e.Message);
                throw;
            }
        }
    }
}
