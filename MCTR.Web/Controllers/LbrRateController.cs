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
using MCTR.DomainEntity;
using MCTR.Web.Handlers;
using System.Collections.Generic;
using System.Web.Mvc;
using log4net;
using System.Data;
using System;
using MCTR.Web.Util;
using System.Linq;
using AutoMapper;
using MCTR.Web.Security;
using System.Text;

namespace MCTR.Web.Controllers
{
    ///*********************************************************************
    ///<summary>
    ///LbrRateController is a web controller implementation for the 
    ///LbrRate screen.
    ///</summary>
    [CustomAuthorize]
    public class LbrRateController : Controller, IDisposable
    {
        private readonly ILog logger = null;

        public LbrRateController()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        }
        [HttpGet]
        [ActionName("LaborRatesPY")]
        public ActionResult LaborRatesPY()

        {

            return View();
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : mctrIncrRatesWhenNewFormInstance
        ///</summary>

        ///<returns>IEnumerable<MctrIncrRates> </returns>

        [HttpGet]
        public JsonResult LbrRatesWhenNewFormInstance()
        {
            try
            {
                logger.Info("Executing MCTR.Web.Controllers.MctrIncrRates.mctrIncrRatesWhenNewFormInstance() : ");

                LbrRateHandler Lbrratehandler = new LbrRateHandler();
                logger.Debug("Executing MCTR.Web.Controllers.MctrIncrRates.mctrIncrRatesWhenNewFormInstance()");
                var LbrRatesResp = Lbrratehandler.LbrRatesWhenNewFormInstance();
                logger.Info("Response Received : " + LbrRatesResp);
                return Json(LbrRatesResp, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.Web.Controllers.MctrIncrRates.mctrIncrRatesWhenNewFormInstance() " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : Edits
        ///</summary>
        ///<param name = "Edits"></param>
        ///<returns>IEnumerable<MctrIncrRates> </returns>


        [HttpPost]
        public JsonResult Edits(LbrRate lbrRateRequest, LbrRate editRowData)
        {
            try
            {
                    var lbrRateEdit = new LabourRatePyEdit();
                    lbrRateEdit.EditedRow = lbrRateRequest;
                    lbrRateEdit.Row = editRowData;
                    LbrRateHandler Lbrratehandler = new LbrRateHandler();
                    var LaborRateResp = Lbrratehandler.EditHandlerPost(lbrRateEdit);
                    return Json(LaborRateResp, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                logger.Info("Response received from LbrRateController.Edits() : " + e.Message);

                throw;
            }

        }
        ///*************************************************************
        ///<summary>
        ///Method Name : selectionfYearOnError
        ///</summary>
        ///<returns>lbrRate</returns>
        [HttpPost]
        public ActionResult selectionfYearOnError(LbrRate lbrRate)
        {
            try
            {
                if (lbrRate != null)
                {
                    logger.Info("Executing MCTR.Web.Controllers.LbrRateController.selectionfYearOnError() with request " + lbrRate);
                    LbrRateHandler lbrRateHandler = new LbrRateHandler();
                    logger.Debug("Executing  MCTR.Web.Controllers.LbrRateController.selectionfYearOnError() with request ");
                    var lbrRateResp = lbrRateHandler.selectionfYearOnError(lbrRate);
                    logger.Info("Response Received MCTR.Web.Controllers.LbrRateController.selectionfYearOnError(): " + lbrRateResp);
                    return View("LbrRate", lbrRateResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch (Exception e)
            {
                logger.Error("Error from  MCTR.Web.Controllers.LbrRateController.selectionfYearOnError() " + e.Message);
                throw;
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : selectionbutRatesListWhenButtonPressed
        ///</summary>
        ///<returns>ActionResult</returns>
        //[HttpPost]
        public ActionResult selectionbutRatesListWhenButtonPressed(int f_year)
        {
            try
            {
                LbrRate lbrRate = new LbrRate();
                lbrRate.f_year = f_year;
                logger.Info("Executing MCTR.Web.Controllers.MctrIncrRates.selectionbutRatesListWhenButtonPressed(): " + lbrRate);

                LbrRateHandler LbrRateHandler = new LbrRateHandler();
                logger.Debug("Executing  MCTR.Web.Controllers.MctrIncrRates.selectionbutRatesListWhenButtonPressed().");
                var LbrRatesResp = LbrRateHandler.selectionbutRatesListWhenButtonPressed(lbrRate).ToList();
                var c = (lbrRate.f_year == null) ? "ALL" : lbrRate.f_year.ToString();
                var responseexcel = Mapper.DynamicMap<IEnumerable<LbrRate>, IEnumerable<LbrRateExcel>>(LbrRatesResp).ToList<LbrRateExcel>();

                Download obj = new Download();
                DataTable[] dt = new DataTable[6];

                DataTable d1 = new DataTable();
                string msg = @"MCTR PRIOR YEAR LABOR RATES LISTING   (AS OF " + DateTime.Now.ToString("MM/dd/yy hh:mm:ss tt") + ")";
                d1.Columns.Add(msg);
                dt[0] = d1;

                DataTable d2 = new DataTable();
                string msg1 = @"YEAR:" + c;
                d2.Columns.Add(msg1);
                d2.Rows.Add();
                dt[1] = d2;

                dt[2] = obj.ToDataTable<LbrRateExcel>(responseexcel);

                DataTable d3 = new DataTable();
                d3.Columns.Add("MCTR RATE TABLE selection was based on the criteria listed below.");
                dt[3] = d3;

                DataTable d4 = new DataTable();
                string msg4 = "\"" + @"SELECT SETID, FISCAL_YEAR, LABOR_RATE_CD7, PROJ_TRANS_CODE, RATE FROM MCTR_LBR_RATE WHERE FISCAL_YEAR = '" + c + "' ORDER BY SETID ASC, FISCAL_YEAR ASC, LABOR_RATE_CD7 ASC;" + "\"";
                d4.Columns.Add(msg4);
                dt[4] = d4;

                DataTable d5 = new DataTable();
                d5.Columns.Add("End of Listing");
                dt[5] = d5;

             
                d1.Dispose();
                d2.Dispose();
                d3.Dispose();
                d4.Dispose();
                d5.Dispose();
                string filename = "xtrt-MCTR-PYR-LBR-RATES";
                var result = obj.ToCsv(dt, true);
                byte[] fileBytes = Encoding.ASCII.GetBytes(result);

                var cd = new System.Net.Mime.ContentDisposition
                {
                    FileName = filename + ".csv",
                    Inline = false,
                };
                Response.ContentType = "application/vnd.ms-excel";
                Response.AppendHeader("Content-Disposition", cd.ToString());

                return File(fileBytes, filename);
            }
            catch (Exception e)
            {
                logger.Error("Error from  MCTR.Web.Controllers.MctrIncrRates.selectionbutRatesListWhenButtonPressed() " + e.Message);
                throw;
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : LbrRateOnLoad
        ///</summary>
        //  [HttpPost]
        public JsonResult LbrRateOnLoad()
        {
            try
            {
                LbrRate lbrRate = new LbrRate();
                lbrRate.session_bems = SessionPerister.BEMSID;
                logger.Info("Executing MCTR.Web.Controllers.LbrRateController.LbrRateOnLoad() with request : " + lbrRate);
                LbrRateHandler lbrRateHandler = new LbrRateHandler();
                logger.Debug("Executing MCTR.Web.Controllers.LbrRateController.LbrRateOnLoad() with request");
                var lbrRateResp = lbrRateHandler.LbrRateOnLoad(lbrRate);
                logger.Info("Response Received from MCTR.Web.Controllers.LbrRateController.selectionbutRatesListWhenButtonPressed(): " + lbrRateResp);
                var jsonData = new
                {
                    total = 1,
                    page = 1,
                    records = lbrRateResp.Count(),
                    rows = lbrRateResp,
                };
                return Json(jsonData, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                logger.Error(" Error From MCTR.Web.Controllers.LbrRateController.LbrRateOnLoad() with request" + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : Create
        ///</summary>
        ///<param name = "Status"></param>
        ///<returns>IEnumerable<Status> </returns>
        [HttpPost]
        public JsonResult Create(LbrRate lbrRate)
        {
            try
            {
                    LbrRateHandler LbrHandler = new LbrRateHandler();
                    var result = LbrHandler.CreateHandlerPost(lbrRate);
                    return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                throw;
            }

        }

        ///*************************************************************
        ///<summary>
        ///Method Name : Delete
        ///</summary>
        ///<param name = "lbrRate"></param>
        ///<returns>IEnumerable<Status> </returns>
        [HttpPost]
        public JsonResult Delete(LbrRate lbrRate)
        {
            try
            {
               
                    LbrRateHandler statusHandler = new LbrRateHandler();
                    var result = statusHandler.DeleteHandlerPost(lbrRate);
                    return Json(result, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : lbrRatesetidPostChange
        ///</summary>
        ///<params>lbrRate</params>

        [HttpPost]
        public JsonResult lbrRatesetidPostChange(LbrRate lbrRate)
        {
            try
            {
                    lbrRate.session_bems = SessionPerister.BEMSID;
                    logger.Info("Executing MCTR.Web.Controllers.LbrRateController.lbrRatesetidPostChange() with request" + lbrRate);
                    LbrRateHandler lbrRateHandler = new LbrRateHandler();
                    logger.Debug("Executing MCTR.Web.Controllers.LbrRateController.lbrRatesetidPostChange() with request");
                    var lbrRateResp = lbrRateHandler.lbrRatesetidPostChange(lbrRate);
                    logger.Info("Response Received from MCTR.Web.Controllers.LbrRateController.lbrRatesetidPostChange(): " + lbrRateResp);
                    return Json(lbrRateResp, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.Web.Controllers.LbrRateController.lbrRatesetidPostChange() with request" + e.Message);
                throw;
            }
        }

    }
}

