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
using System.Linq;
using System;
using System.Web.Mvc;
using log4net;
using MCTR.Web.Security;

namespace MCTR.Web.Controllers
{
    ///*********************************************************************
    ///<summary>
    ///TtdCheckBlController is a web controller implementation for the 
    ///TtdCheckBl screen.
    ///</summary>
    [CustomAuthorize]
    public class TtdCheckBlController : Controller
    {
         private readonly ILog logger;


        public TtdCheckBlController()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        }

        public ActionResult ttdCheckLoad(string rowId) {
            ViewData["rowID"] = rowId;
            return PartialView();
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : ttdCheckTtdCheckOnLoad
        ///</summary>
        ///<param name = "TtdCheckBl"></param>
        ///<returns>IEnumerable<TtdCheckBl> </returns>
        public JsonResult ttdCheckTtdCheckOnLoad(int MctrNo,short LineNo)
        {
            try
            {
                TtdCheckBl ttdCheckBl = new TtdCheckBl();
                ttdCheckBl.MCTR_NO = MctrNo;
                ttdCheckBl.LINE_NO = LineNo;
                TtdCheckBlHandler TtdCheckHandler = new TtdCheckBlHandler();
                logger.Debug("Executing statusHandler.statusWhenNewFormInstance().");
                var ReturnedTtd = TtdCheckHandler.ttdCheckTtdCheckOnLoad(ttdCheckBl);
                logger.Info("Response Received : " + ReturnedTtd);
                var jsonData = new
                {
                    total = 1,
                    page = 1,
                    records = ReturnedTtd.Count(),
                    rows = ReturnedTtd,
                };
                return Json(jsonData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                logger.Info("Response received from JrnlWeekRepository.jrnlWeekJrnlWeekOnLoad() : " + e.Message);

                throw;
            }

        }
        ///*************************************************************
        ///<summary>
        ///Method Name : ttdCheckPostQuery
        ///</summary>
        ///<param name = "TtdCheckBl"></param>
        ///<returns>IEnumerable<TtdCheckBl> </returns>

        [HttpPost]
        public ActionResult ttdCheckPostQuery(TtdCheckBl ttdCheckBl)
        {
            try
            {
                logger.Info("Executing ttdCheckPostQuery() : " + ttdCheckBl);
                if (ttdCheckBl != null)
                {
                    TtdCheckBlHandler ttdCheckBlHandler = new TtdCheckBlHandler();
                    logger.Debug("Executing ttdCheckBlHandler.ttdCheckPostQuery().");
                    var ttdCheckBlResp = ttdCheckBlHandler.ttdCheckPostQuery(ttdCheckBl);
                    logger.Info("Response Received : " + ttdCheckBlResp);
                    return View("TtdCheckBl", ttdCheckBlResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch (Exception e)
            {
                logger.Info("Response received from JrnlWeekRepository.jrnlWeekJrnlWeekOnLoad() : " + e.Message);

                throw;
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : ttdCheckBlWhenNewFormInstance
        ///</summary>
        ///<param name = "TtdCheckBl"></param>
        ///<returns>IEnumerable<TtdCheckBl> </returns>

        [HttpPost]
        public ActionResult ttdCheckBlWhenNewFormInstance(TtdCheckBl ttdCheckBl)
        {
            try
            {


                logger.Info("Executing ttdCheckBlWhenNewFormInstance() : " + ttdCheckBl);
                if (ttdCheckBl != null)
                {
                    TtdCheckBlHandler ttdCheckBlHandler = new TtdCheckBlHandler();
                    logger.Debug("Executing ttdCheckBlHandler.ttdCheckBlWhenNewFormInstance().");
                    var ttdCheckBlResp = ttdCheckBlHandler.ttdCheckBlWhenNewFormInstance(ttdCheckBl);
                    logger.Info("Response Received : " + ttdCheckBlResp);
                    return View("TtdCheckBl", ttdCheckBlResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch (Exception e)
            {
                logger.Info("Response received from JrnlWeekRepository.jrnlWeekJrnlWeekOnLoad() : " + e.Message);

                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : ttdCheckBlWhenWindowClosed
        ///</summary>
        ///<param name = "TtdCheckBl"></param>
        ///<returns>IEnumerable<TtdCheckBl> </returns>
        [HttpPost]
        public ActionResult ttdCheckBlWhenWindowClosed(TtdCheckBl ttdCheckBl)
        {
            try
            {
                logger.Info("Executing ttdCheckBlWhenWindowClosed() : " + ttdCheckBl);
                if (ttdCheckBl != null)
                {
                    TtdCheckBlHandler ttdCheckBlHandler = new TtdCheckBlHandler();
                    logger.Debug("Executing ttdCheckBlHandler.ttdCheckBlWhenWindowClosed().");
                    var ttdCheckBlResp = ttdCheckBlHandler.ttdCheckBlWhenWindowClosed(ttdCheckBl);
                    logger.Info("Response Received : " + ttdCheckBlResp);
                    return View("TtdCheckBl", ttdCheckBlResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch (Exception e)
            {
                logger.Info("Response received from JrnlWeekRepository.jrnlWeekJrnlWeekOnLoad() : " + e.Message);

                throw;
            }
        }
    }
}
