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

using log4net;
using MCTR.DomainEntity;
using MCTR.Web.Handlers;
using MCTR.Web.Security;
using System;
using System.Web.Mvc;
using System.Linq;
using System.Collections.Generic;

namespace MCTR.Web.Controllers
{
    ///*********************************************************************
    ///<summary>
    ///RoleBuController is a web controller implementation for the 
    ///RoleBu screen.
    ///</summary>
    [CustomAuthorize]
    public class RoleBuController : Controller
    {
         private readonly ILog logger;
        public RoleBuController()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        }
        [HttpGet]
        public ActionResult GetAllRoleBUs()
        {
            try
            {


                return  PartialView("_RoleModalDialog");
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        [HttpGet]
        public ActionResult GetAllBUs(string rowId)
        {
            try
            {
                ViewData["rowId"] = rowId;
                return PartialView("BUGroupDialog", rowId);
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public JsonResult rolebuonload(string BEMS)
        {
            try
            {
                RoleBu roleBu = new RoleBu();
                roleBu.BEMS = BEMS;
                roleBu.sessionBems = SessionPerister.BEMSID;
                logger.Info("Executing MCTR.Web.RoleBuController.rolebuonload : " + roleBu);
                if (roleBu != null)
                {
                    RoleBuHandler roleBuHandler = new RoleBuHandler();
                    logger.Debug("Executing roleBuHandler.rolebuonload.");
                    var roleBuResp = roleBuHandler.rolebuonload(roleBu);
                    logger.Info("Response Received from MCTR.Web.RoleBuController.rolebuonload() : " + roleBuResp);
                    var jsonData = new
                    {
                        total = 1,
                        page = 1,
                        records = roleBuResp.Count(),
                        rows = roleBuResp,
                    };
                    return Json(jsonData, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return null;
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
        ///Method Name : roleBuopenLOV
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>ActionResult</returns>
        [HttpGet]
        public JsonResult roleBuopenLOV()
        {
            try
            {
                    logger.Info("Executing MCTR.Web.RoleBuController.roleBuopenLOV" );
                    RoleBuHandler roleBuHandler = new RoleBuHandler();
                    logger.Debug("Executing roleBuHandler.roleBuopenLOV().");
                    var roleBuResp = roleBuHandler.roleBuopenLOV().ToList<MctrBusUnit>();
                    logger.Info("Response Received from MCTR.Web.RoleBuController.roleBuopenLOV() : " + roleBuResp);
                    var jsonData = new
                    {
                        total = 1,
                        page = 1,
                        records = roleBuResp.Count(),
                        rows = roleBuResp,
                        userdata = roleBuResp
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
        ///Method Name : roleBuPostQuery
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>ActionResult</returns>
        [HttpPost]
        public ActionResult roleBuPostQuery(RoleBu roleBu)
        {
            try
            {
                logger.Info("Executing MCTR.Web.RoleBuController.roleBuPostQuery() : " + roleBu);
                if (roleBu != null)
                {
                    RoleBuHandler roleBuHandler = new RoleBuHandler();
                    logger.Debug("Executing roleBuHandler.roleBuPostQuery().");
                    var roleBuResp = roleBuHandler.roleBuPostQuery(roleBu);
                    logger.Info("Response Received from MCTR.Web.RoleBuController.roleBuPostQuery: " + roleBuResp);
                    return View("RoleBu", roleBuResp);
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
        ///Method Name : roleBuPreRecord
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>ActionResult</returns>
        [HttpPost]
        public ActionResult roleBuPreRecord(RoleBu roleBu)
        {
            try
            {
                logger.Info("Executing MCTR.Web.RoleBuController.roleBuPreRecord() : " + roleBu);
                if (roleBu != null)
                {
                    RoleBuHandler roleBuHandler = new RoleBuHandler();
                    logger.Debug("Executing roleBuHandler.roleBuPreRecord().");
                    var roleBuResp = roleBuHandler.roleBuPreRecord(roleBu);
                    logger.Info("Response Received from MCTR.Web.RoleBuController.roleBuPreRecord: " + roleBuResp);
                    return View("RoleBu", roleBuResp);
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
        ///Method Name : roleBuPostDelete
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>ActionResult</returns>
        [HttpPost]
        public JsonResult roleBuPostDelete(RoleBu roleBu)
        {
            try
            {
                roleBu.sessionBems = SessionPerister.BEMSID;
                logger.Info("Executing MCTR.Web.RoleBuController.roleBuPostDelete() : " + roleBu);
                if (roleBu != null)
                {
                    RoleBuHandler roleBuHandler = new RoleBuHandler();
                    logger.Debug("Executing roleBuHandler.roleBuPostDelete().");
                    var roleBuResp = roleBuHandler.roleBuPostDelete(roleBu);
                    logger.Info("Response Received from MCTR.Web.RoleBuController.roleBuPostDelete: " + roleBuResp);
                    var jsonData = new
                    {
                        total = 1,
                        page = 1,
                        records = roleBuResp.Count(),
                        rows = roleBuResp,
                    };
                    return Json(jsonData, JsonRequestBehavior.AllowGet);
                    
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return Json("", JsonRequestBehavior.AllowGet);
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
        ///Method Name : roleBuPostInsert
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>ActionResult</returns>
        [HttpPost]
        public ActionResult roleBuPostInsert(RoleBu roleBu)
        {
            try
            {
                roleBu.sessionBems = SessionPerister.BEMSID;
                logger.Info("Executing MCTR.Web.RoleBuController.roleBuPostInsert() : " + roleBu);
                if (roleBu != null)
                {
                    RoleBuHandler roleBuHandler = new RoleBuHandler();
                    logger.Debug("Executing roleBuHandler.roleBuPostInsert().");
                    var roleBuResp = roleBuHandler.roleBuPostInsert(roleBu);
                    logger.Info("Response Received from MCTR.Web.RoleBuController.roleBuPostInsert: " + roleBuResp);
                    return View("RoleBu", roleBuResp);
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
        ///Method Name : roleBuPostUpdate
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>ActionResult</returns>
        [HttpPost]
        public JsonResult roleBuPostUpdate(IEnumerable<RoleBu> roleBu)
        {
            try
            {
                roleBu.First().sessionBems = SessionPerister.BEMSID; 
                logger.Info("Executing MCTR.Web.RoleBuController.roleBuPostUpdate() : " + roleBu);
                if (roleBu != null)
                {
                    RoleBuHandler roleBuHandler = new RoleBuHandler();
                    logger.Debug("Executing roleBuHandler.roleBuPostUpdate().");
                    var roleBuResp = roleBuHandler.roleBuPostUpdate(roleBu);
                    logger.Info("Response Received from MCTR.Web.RoleBuController.roleBuPostUpdate: " + roleBuResp);
                    return Json(roleBuResp, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return Json(null, JsonRequestBehavior.AllowGet);
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
        ///Method Name : roleBuWhenNewFormInstance
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>ActionResult</returns>
        [HttpPost]
        public ActionResult roleBuWhenNewFormInstance(RoleBu roleBu)
        {
            try
            {
                logger.Info("Executing MCTR.Web.RoleBuController.roleBuWhenNewFormInstance() : " + roleBu);
                if (roleBu != null)
                {
                    RoleBuHandler roleBuHandler = new RoleBuHandler();
                    logger.Debug("Executing roleBuHandler.roleBuWhenNewFormInstance().");
                    var roleBuResp = roleBuHandler.roleBuWhenNewFormInstance(roleBu);
                    logger.Info("Response Received from MCTR.Web.RoleBuController.roleBuWhenNewFormInstance: " + roleBuResp);
                    return View("RoleBu", roleBuResp);
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
        ///Method Name : roleBuWhenWindowClosed
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>ActionResult</returns>
        [HttpPost]
        public ActionResult roleBuWhenWindowClosed(RoleBu roleBu)
        {
            try
            {
                logger.Info("Executing MCTR.Web.RoleBuController.roleBuWhenWindowClosed() : " + roleBu);
                if (roleBu != null)
                {
                    RoleBuHandler roleBuHandler = new RoleBuHandler();
                    logger.Debug("Executing roleBuHandler.roleBuWhenWindowClosed().");
                    var roleBuResp = roleBuHandler.roleBuWhenWindowClosed(roleBu);
                    logger.Info("Response Received from MCTR.Web.RoleBuController.roleBuWhenWindowClosed: " + roleBuResp);
                    return View("RoleBu", roleBuResp);
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