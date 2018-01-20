
///*************************************************************************
/// 
/// BOEING CONFIDENTIAL
/// ___________________
/// 
///  BOEING is a trademark of Boeing Management Company.
///
///  Copyright � 2016 Boeing. All rights reserved.
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
/// Author           : Generated by ATMA �
/// Revision History :  


using MCTR.DomainEntity;
using MCTR.Web.Handlers;
using System;
using System.Web.Mvc;
using log4net;
using MCTR.Web.Security;

namespace MCTR.Web.Controllers
{
    ///*********************************************************************
    ///<summary>
    ///MctrWkipJrnlsBlController is a web controller implementation for the 
    ///MctrWkipJrnlsBl screen.
    ///</summary>
    ///
    [CustomAuthorize]
    public class MctrWkipJrnlsBlController : Controller
    {
         private readonly ILog logger;


        public MctrWkipJrnlsBlController()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        }

        public ActionResult JournalsInProcessPopUp()
        {
            return PartialView("JournalsInProcessPopUp");
        }
        
        public JsonResult jrnlWeekJrnlWeekOnLoadJson(string mctrNo)
        {

            try
            {
                logger.Info("Executing jrnlWeekJrnlWeekOnLoad()");
                MctrWkipJrnlsBl mctrWkipJrnlsBl = new MctrWkipJrnlsBl();
                mctrWkipJrnlsBl.MCTR_NO = Convert.ToInt32(mctrNo);
                MctrWkipJrnlsBlHandler mctrWkipJrnlsBlHandler = new MctrWkipJrnlsBlHandler();
                logger.Debug("Executing jrnlWeekHandler.jrnlWeekJrnlWeekOnLoad().");
                var mctrWkipJrnlsBlResp = mctrWkipJrnlsBlHandler.jrnlWeekJrnlWeekOnLoad(mctrWkipJrnlsBl);
                logger.Info("Response Received : " + mctrWkipJrnlsBl);
                return Json(mctrWkipJrnlsBlResp, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                logger.Info("Response received from JrnlWeekRepository.jrnlWeekJrnlWeekOnLoad() : " + e.Message);

                throw;
            }
        }


        ///*************************************************************
        ///<summary>
        ///Method Name : jrnlWeekJrnlWeekOnLoad
        ///</summary>
        ///<param name = "MctrWkipJrnlsBl"></param>
        ///<returns>IEnumerable<MctrWkipJrnlsBl> </returns>

        [HttpGet]
        public ActionResult jrnlWeekJrnlWeekOnLoad(MctrWkipJrnlsBl mctrWkipJrnlsBl)
        {
            try
            {
                logger.Info("Executing jrnlWeekJrnlWeekOnLoad() : " + mctrWkipJrnlsBl);

                MctrWkipJrnlsBlHandler mctrWkipJrnlsBlHandler = new MctrWkipJrnlsBlHandler();
                logger.Debug("Executing mctrWkipJrnlsBlHandler.jrnlWeekJrnlWeekOnLoad().");
                var mctrWkipJrnlsBlResp = mctrWkipJrnlsBlHandler.jrnlWeekJrnlWeekOnLoad(mctrWkipJrnlsBl);
                logger.Info("Response Received : " + mctrWkipJrnlsBlResp);
                return Json(mctrWkipJrnlsBlResp, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                logger.Info("Response received from JrnlWeekRepository.jrnlWeekJrnlWeekOnLoad() : " + e.Message);

                throw;
            }
        }




        ///*************************************************************
        ///<summary>
        ///Method Name : mctrWkipJrnlsBlWhenNewFormInstance
        ///</summary>
        ///<param name = "MctrWkipJrnlsBl"></param>
        ///<returns>IEnumerable<MctrWkipJrnlsBl> </returns>

        [HttpPost]
        public ActionResult mctrWkipJrnlsBlWhenNewFormInstance(MctrWkipJrnlsBl mctrWkipJrnlsBl)
        {
            try
            {
                logger.Info("Executing mctrWkipJrnlsBlWhenNewFormInstance() : " + mctrWkipJrnlsBl);
                if (mctrWkipJrnlsBl != null)
                {
                    MctrWkipJrnlsBlHandler mctrWkipJrnlsBlHandler = new MctrWkipJrnlsBlHandler();
                    logger.Debug("Executing mctrWkipJrnlsBlHandler.mctrWkipJrnlsBlWhenNewFormInstance().");
                    var mctrWkipJrnlsBlResp = mctrWkipJrnlsBlHandler.mctrWkipJrnlsBlWhenNewFormInstance(mctrWkipJrnlsBl);
                    logger.Info("Response Received : " + mctrWkipJrnlsBlResp);
                    return View("MctrWkipJrnlsBl", mctrWkipJrnlsBlResp);
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
        ///Method Name : mctrWkipJrnlsBlWhenWindowClosed
        ///</summary>
        ///<param name = "MctrWkipJrnlsBl"></param>
        ///<returns>IEnumerable<MctrWkipJrnlsBl> </returns>

        [HttpPost]
        public ActionResult mctrWkipJrnlsBlWhenWindowClosed(MctrWkipJrnlsBl mctrWkipJrnlsBl)
        {
            try
            {
                logger.Info("Executing mctrWkipJrnlsBlWhenWindowClosed() : " + mctrWkipJrnlsBl);
                if (mctrWkipJrnlsBl != null)
                {
                    MctrWkipJrnlsBlHandler mctrWkipJrnlsBlHandler = new MctrWkipJrnlsBlHandler();
                    logger.Debug("Executing mctrWkipJrnlsBlHandler.mctrWkipJrnlsBlWhenWindowClosed().");
                    var mctrWkipJrnlsBlResp = mctrWkipJrnlsBlHandler.mctrWkipJrnlsBlWhenWindowClosed(mctrWkipJrnlsBl);
                    logger.Info("Response Received : " + mctrWkipJrnlsBlResp);
                    return View("MctrWkipJrnlsBl", mctrWkipJrnlsBlResp);
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
