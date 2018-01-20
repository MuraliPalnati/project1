
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
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace MCTR.Web.Controllers
{
    ///*********************************************************************
    ///<summary>
    ///BuProfileController is a web controller implementation for the 
    ///BuProfile screen.
    ///</summary>
    [CustomAuthorize]
    public class BuProfileController : Controller, IDisposable
    {

         private readonly ILog logger;
        
        public BuProfileController()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        }


        ///*************************************************************
        ///<summary>
        ///Method Name : buProfileBuProfileOnLoad
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>
        public ActionResult Buprof()
        {
            return PartialView("getRgAdminLOV");
        }

        public ActionResult buProfileBuProfileOnLoad()
        {
            return View("BUProfile");
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : GetAllBUProfiles
        ///</summary>
     
        ///<returns>IEnumerable<BuProfile> </returns>
        [HttpGet]
        public JsonResult GetAllBUProfiles() {
            try
            {
                logger.Info("Executing MCTR.Web.Controllers.BuProfileController.buProfileBuProfileOnLoad() : ");

                BuProfileHandler buProfileHandler = new BuProfileHandler();
                logger.Debug("Executing MCTR.Web.Controllers.BuProfileController.buProfileBuProfileOnLoad().");
                var buProfileResp = buProfileHandler.buProfileBuProfileOnLoad();
                logger.Info("Response Received : " + buProfileResp);
                var jsonData = new
                {
                    total = 1,
                    page = 1,
                    records = buProfileResp.Count(),
                    rows = buProfileResp,
                };
                return Json(jsonData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.buProfileBuProfileOnLoad :" + e.Message);
                throw;
            }

        }



        ///*************************************************************
        ///<summary>
        ///Method Name : buProfilebusinessUnitPreTextItem
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>

        [HttpPost]
        public ActionResult buProfilebusinessUnitPreTextItem(BuProfile buProfile)
        {
            try
            {
                logger.Info("Executing buProfilebusinessUnitPreTextItem() : " + buProfile);
                if (buProfile != null)
                {
                    BuProfileHandler buProfileHandler = new BuProfileHandler();
                    logger.Debug("Executing MCTR.Web.Controllers.BuProfileController.buProfilebusinessUnitPreTextItem().");
                    var buProfileResp = buProfileHandler.buProfilebusinessUnitPreTextItem(buProfile);
                    logger.Info("Response Received MCTR.Web.Controllers.BuProfileController.buProfilebusinessUnitPreTextItem : " + buProfileResp);
                    return View("BuProfile", buProfileResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.buProfilebusinessUnitPreTextItem :" + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : buProfilebusinessUnitPostTextItem
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>

        [HttpPost]
        public JsonResult buProfilebusinessUnitPostTextItem(BuProfile buProfile)
        {
            try { 

            logger.Info("Executing buProfilebusinessUnitPostTextItem() : " + buProfile);
                BuProfileHandler buProfileHandler = new BuProfileHandler();
                logger.Debug("Executing MCTR.Web.Controllers.BuProfileController.buProfilebusinessUnitPostTextItem().");
                var buProfileResp = buProfileHandler.buProfilebusinessUnitPostTextItem(buProfile);
                logger.Info("Response Received MCTR.Web.Controllers.BuProfileController.buProfilebusinessUnitPostTextItem : " + buProfileResp);
                return Json(buProfileResp, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.buProfilebusinessUnitPostTextItem :" + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : buProfileoffsetActivityPreTextItem
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>

        [HttpPost]
        public ActionResult buProfileoffsetActivityPreTextItem(BuProfile buProfile)
        {
            try { 
            logger.Info("Executing buProfileoffsetActivityPreTextItem() : " + buProfile);
            if (buProfile != null)
            {
                BuProfileHandler buProfileHandler = new BuProfileHandler();
                logger.Debug("Executing MCTR.Web.Controllers.BuProfileController.buProfileoffsetActivityPreTextItem ().");
                var buProfileResp = buProfileHandler.buProfileoffsetActivityPreTextItem(buProfile);
                logger.Info("Response Received MCTR.Web.Controllers.BuProfileController.buProfileoffsetActivityPreTextItem  : " + buProfileResp);
                return View("BuProfile", buProfileResp);
            }
            else
            {
                logger.Info("Request object is null or doesn't contain any value.");
                return View();
            }
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.buProfileoffsetActivityPreTextItem :" + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : buProfileoffsetActivityPostTextItem
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>

        [HttpPost]
        public JsonResult buProfileoffsetActivityPostTextItem(BuProfile buProfile)
        {
            try { 
            logger.Info("Executing buProfileoffsetActivityPostTextItem() : " + buProfile);

                BuProfileHandler buProfileHandler = new BuProfileHandler();
                logger.Debug("Executing MCTR.Web.Controllers.BuProfileController.buProfileBuProfileOnLoad ().");
                var buProfileResp = buProfileHandler.buProfileoffsetActivityPostTextItem(buProfile);
                logger.Info("Response Received MCTR.Web.Controllers.BuProfileController.buProfileBuProfileOnLoad : " + buProfileResp);
                return Json(buProfileResp, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.buProfileBuProfileOnLoad :" + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : buProfileoffsetProjectPreTextItem
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>

        [HttpPost]
        public ActionResult buProfileoffsetProjectPreTextItem(BuProfile buProfile)
        {
            try { 
            logger.Info("Executing buProfileoffsetProjectPreTextItem() : " + buProfile);
            if (buProfile != null)
            {
                BuProfileHandler buProfileHandler = new BuProfileHandler();
                logger.Debug("ExecutingMCTR.Web.Controllers.BuProfileController.buProfileoffsetProjectPreTextItem().");
                var buProfileResp = buProfileHandler.buProfileoffsetProjectPreTextItem(buProfile);
                logger.Info("Response Received MCTR.Web.Controllers.BuProfileController.buProfileoffsetProjectPreTextItem: " + buProfileResp);
                return View("BuProfile", buProfileResp);
            }
            else
            {
                logger.Info("Request object is null or doesn't contain any value.");
                return View();
            }
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.buProfileoffsetProjectPreTextItem :" + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : buProfileoffsetProjectPostTextItem
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>

        [HttpPost]
        public JsonResult buProfileoffsetProjectPostTextItem(BuProfile buProfile)
        {
            try { 
            logger.Info("Executing buProfileoffsetProjectPostTextItem() : " + buProfile);
                BuProfileHandler buProfileHandler = new BuProfileHandler();
                logger.Debug("Executing MCTR.Web.Controllers.BuProfileController.buProfileoffsetProjectPostTextItem().");
                var buProfileResp = buProfileHandler.buProfileoffsetProjectPostTextItem(buProfile);
                logger.Info("Response Received MCTR.Web.Controllers.BuProfileController.buProfileoffsetProjectPostTextItem : " + buProfileResp);
                return Json(buProfileResp, JsonRequestBehavior.AllowGet);
                }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.buProfileoffsetProjectPostTextItem :" + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : buProfileoffsetAccountPreTextItem
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>

        [HttpPost]
        public ActionResult buProfileoffsetAccountPreTextItem(BuProfile buProfile)
        {
            try { 
            logger.Info("Executing buProfileoffsetAccountPreTextItem() : " + buProfile);
            if (buProfile != null)
            {
                BuProfileHandler buProfileHandler = new BuProfileHandler();
                logger.Debug("Executing MCTR.Web.Controllers.BuProfileController.buProfileoffsetAccountPreTextItem().");
                var buProfileResp = buProfileHandler.buProfileoffsetAccountPreTextItem(buProfile);
                logger.Info("Response Received MCTR.Web.Controllers.BuProfileController.buProfileoffsetAccountPreTextItem : " + buProfileResp);
                return View("BuProfile", buProfileResp);
            }
            else
            {
                logger.Info("Request object is null or doesn't contain any value.");
                return View();
            }
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.buProfileoffsetAccountPreTextItem :" + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : buProfileoffsetAccountPostTextItem
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>

        [HttpPost]
        public JsonResult buProfileoffsetAccountPostTextItem(BuProfile buProfile)
        {
            try { 
            logger.Info("Executing buProfileoffsetAccountPostTextItem() : " + buProfile);

                BuProfileHandler buProfileHandler = new BuProfileHandler();
                logger.Debug("Executing MCTR.Web.Controllers.BuProfileController.buProfileoffsetAccountPostTextItem().");
                var buProfileResp = buProfileHandler.buProfileoffsetAccountPostTextItem(buProfile);
                logger.Info("Response Received MCTR.Web.Controllers.BuProfileController.buProfileoffsetAccountPostTextItem : " + buProfileResp);
                return Json(buProfileResp, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.buProfileoffsetAccountPostTextItem :" + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : buProfilebutAdminWhenButtonPressedOpenLOV()
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>

        [HttpPost]
        public ActionResult buProfilebutAdminWhenButtonPressedOpenLOV(BuProfile buProfile)
        {
            try { 
            logger.Info("Executing buProfilebutAdminWhenButtonPressedOpenLOV()() : " + buProfile);
            if (buProfile != null)
            {
                BuProfileHandler buProfileHandler = new BuProfileHandler();
                logger.Debug("Executing MCTR.Web.Controllers.BuProfileController.buProfilebutAdminWhenButtonPressedOpenLOV().");
                var buProfileResp = buProfileHandler.buProfileopenLOV(); 
                  logger.Info("Response Received MCTR.Web.Controllers.BuProfileController.buProfilebutAdminWhenButtonPressedOpenLOV : " + buProfileResp);
                return View("BuProfile", buProfileResp);
            }
            else
            {
                logger.Info("Request object is null or doesn't contain any value.");
                return View();
            }
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.buProfilebutAdminWhenButtonPressedOpenLOV :" + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : buProfilebemsAdminPostTextItem
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>

        [HttpPost]
        public ActionResult buProfilebemsAdminPostTextItem(BuProfile buProfile)
        {
            try { 
            logger.Info("Executing buProfilebemsAdminPostTextItem() : " + buProfile);
            if (buProfile != null)
            {
                BuProfileHandler buProfileHandler = new BuProfileHandler();
                logger.Debug("Executing MCTR.Web.Controllers.BuProfileController.buProfilebemsAdminPostTextItem ().");
                var buProfileResp = buProfileHandler.buProfilebemsAdminPostTextItem(buProfile);
                logger.Info("Response Received MCTR.Web.Controllers.BuProfileController.buProfilebemsAdminPostTextItem  : " + buProfileResp);
                return View("BuProfile", buProfileResp);
            }
            else
            {
                logger.Info("Request object is null or doesn't contain any value.");
                return View();
            }
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.buProfilebemsAdminPostTextItem :" + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : buProfilePostQuery
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>

        [HttpPost]
        public ActionResult buProfilePostQuery(BuProfile buProfile)
        {
            try { 
            logger.Info("Executing buProfilePostQuery() : " + buProfile);
            if (buProfile != null)
            {
                BuProfileHandler buProfileHandler = new BuProfileHandler();
                logger.Debug("Executing MCTR.Web.Controllers.BuProfileController.buProfilePostQuery().");
                var buProfileResp = buProfileHandler.buProfilePostQuery(buProfile);
                logger.Info("Response Received MCTR.Web.Controllers.BuProfileController.buProfilePostQuery : " + buProfileResp);
                return View("BuProfile", buProfileResp);
            }
            else
            {
                logger.Info("Request object is null or doesn't contain any value.");
                return View();
            }
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.buProfilePostQuery :" + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : buProfilePreInsert
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>

        [HttpPost]
        public ActionResult buProfilePreInsert(IEnumerable<BuProfile> buProfile)
        {
            try { 
            logger.Info("Executing buProfilePreInsert() : " + buProfile);
            if (buProfile != null)
            {
                BuProfileHandler buProfileHandler = new BuProfileHandler();
                logger.Debug("Executing MCTR.Web.Controllers.BuProfileController.buProfilePreInsert().");
                var buProfileResp = buProfileHandler.buProfilePreInsert(buProfile);
                logger.Info("Response Received MCTR.Web.Controllers.BuProfileController.buProfilePreInsert: " + buProfileResp);
                return View("BuProfile", buProfileResp);
            }
            else
            {
                logger.Info("Request object is null or doesn't contain any value.");
                return View();
            }
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.buProfilePreInsert :" + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : buProfilePreUpdate
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>

        [HttpPost]
        public ActionResult buProfilePreUpdate(IEnumerable<BuProfile> buProfile)
        {
            try
            { 
            logger.Info("Executing buProfilePreUpdate() : " + buProfile);
            if (buProfile != null)
            {
                BuProfileHandler buProfileHandler = new BuProfileHandler();
                logger.Debug("Executing MCTR.Web.Controllers.BuProfileController.buProfilePreUpdate().");
                var buProfileResp = buProfileHandler.buProfilePreUpdate(buProfile);
                logger.Info("Response Received MCTR.Web.Controllers.BuProfileController.buProfilePreUpdate : " + buProfileResp);
                return View("BuProfile", buProfileResp);
            }
            else
            {
                logger.Info("Request object is null or doesn't contain any value.");
                return View();
            }
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.buProfilePreUpdate :" + e.Message);
                throw;
            }
        }

        public ActionResult getRgAdminLOV(string Id,string rowId)
        {
            ViewData["BUNIT"] = Id;
            ViewData["rowID"] = rowId;
            return PartialView();
        }


        ///*************************************************************
        ///<summary>
        ///Method Name : getRgAdminLOVList()
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>

        [HttpGet]
        public JsonResult getRgAdminLOVList(string bUnit)
        {
            try { 
            logger.Info("Executing getRgAdminLOV()() : " + bUnit);
            if (bUnit != null)
            {
                BuProfileHandler buProfileHandler = new BuProfileHandler();
                logger.Debug("Executing MCTR.Web.Controllers.BuProfileController.getRgAdminLOV().");
                MctrEmployee mctrEmployee = new MctrEmployee();
                mctrEmployee.BUS_UNIT = bUnit;
                var buProfileResp = buProfileHandler.getRgAdminLOV(mctrEmployee);
                logger.Info("Response Received MCTR.Web.Controllers.BuProfileController.getRgAdminLOV: " + buProfileResp);
                    var jsonData = new
                    {
                        total = 1,
                        page = 1,
                        records = buProfileResp.Count(),
                        rows = buProfileResp,
                        userdata = buProfileResp
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
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.getRgAdminLOV :" + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : buProfileWhenNewFormInstance
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>

        [HttpPost]
        public ActionResult buProfileWhenNewFormInstance(BuProfile buProfile)
        {
            try
            { 
            logger.Info("Executing buProfileWhenNewFormInstance() : " + buProfile);
            if (buProfile != null)
            {
                BuProfileHandler buProfileHandler = new BuProfileHandler();
                logger.Debug("Executing MCTR.Web.Controllers.BuProfileController.buProfileWhenNewFormInstance ().");
                var buProfileResp = buProfileHandler.buProfileWhenNewFormInstance(buProfile);
                logger.Info("Response Received  MCTR.Web.Controllers.BuProfileController.buProfileWhenNewFormInstance : " + buProfileResp);
                return View("BuProfile", buProfileResp);
            }
            else
            {
                logger.Info("Request object is null or doesn't contain any value.");
                return View();
            }
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.buProfileWhenNewFormInstance :" + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : buProfileWhenWindowClosed
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>

        [HttpPost]
        public ActionResult buProfileWhenWindowClosed(BuProfile buProfile)
        {
            try { 
            logger.Info("Executing buProfileWhenWindowClosed() : " + buProfile);
            if (buProfile != null)
            {
                BuProfileHandler buProfileHandler = new BuProfileHandler();
                logger.Debug("Executing  MCTR.Web.Controllers.BuProfileController.buProfileWhenWindowClosed().");
                var buProfileResp = buProfileHandler.buProfileWhenWindowClosed(buProfile);
                logger.Info("Response Received  MCTR.Web.Controllers.BuProfileController.buProfileWhenWindowClosed : " + buProfileResp);
                return View("BuProfile", buProfileResp);
            }
            else
            {
                logger.Info("Request object is null or doesn't contain any value.");
                return View();
            }
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.buProfileWhenWindowClosed :" + e.Message);
                throw;
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : buProfileDelete
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>
        [HttpPost]
        public JsonResult buProfileDelete(BuProfile buProfile)
        {
            try { 
            logger.Info("Executing buProfileDelete() : " + buProfile);
            if (buProfile != null)
            {
                BuProfileHandler buProfileHandler = new BuProfileHandler();
                logger.Debug("Executing MCTR.Web.Controllers.BuProfileController.buProfileDelete().");
                var buProfileResp = buProfileHandler.buProfileDelete(buProfile);
                logger.Info("Response Received MCTR.Web.Controllers.BuProfileController.buProfileDelete: " + buProfileResp);
                return Json(buProfileResp,JsonRequestBehavior.AllowGet);
            }
            else
            {
                logger.Info("Request object is null or doesn't contain any value.");
                return Json(null, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.buProfileDelete :" + e.Message);
                throw;
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : buProfilePostUpdate
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>

        [HttpPost]
        public JsonResult buProfilePostUpdate(BuProfile buProfile)
        {
            try { 
            logger.Info("Executing buProfilePostUpdate() : " + buProfile);
            if (buProfile != null)
            {

                BuProfileHandler buProfileHandler = new BuProfileHandler();
                logger.Debug("Executing MCTR.Web.Controllers.BuProfileController.buProfilePostUpdate().");
                var buProfileResp = buProfileHandler.buProfilePostUpdate(buProfile);
                logger.Info("Response Received MCTR.Web.Controllers.BuProfileController.buProfilePostUpdate : " + buProfileResp);
                return Json(buProfileResp,JsonRequestBehavior.AllowGet);
            }
            else
            {
                logger.Info("Request object is null or doesn't contain any value.");
                return Json(null, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.buProfilePostUpdate :" + e.Message);
                throw;
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : buProfilePostInsert
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>

        [HttpPost]
        public JsonResult buProfilePostInsert(BuProfile buProfile)
        {
            try
            { 
                BuProfileHandler buProfileHandler = new BuProfileHandler();
                logger.Debug("Executing MCTR.Web.Controllers.BuProfileController.buProfilePostInsert().");
                var result = buProfileHandler.buProfilePostInsert(buProfile);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.buProfilePostInsert :" + e.Message);
                throw;
            }
        }

        public ActionResult BUProfile()
        {
            return View();
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : buProfileGetAdmin
        ///</summary>
        ///<param name = "BuProfile"></param>
        ///<returns>IEnumerable<BuProfile> </returns>

        [HttpPost]
        public ActionResult buProfileGetAdmin(BuProfile buProfile)
        {
            try
            {
                logger.Info("Executing buProfileGetAdmin() : ");
                BuProfileHandler buProfileHandler = new BuProfileHandler();
                logger.Debug("Executing MCTR.Web.Controllers.BuProfileController.buProfileGetAdmin().");
                MctrEmployee mctrEmployee = new MctrEmployee();
                mctrEmployee.BEMS_ID = buProfile.Bems_Admin;
                var buProfileResp = buProfileHandler.getRgAdminLOV(mctrEmployee);
                logger.Info("Response Received : " + buProfileResp);
                logger.Info("Request object is null or doesn't contain any value.");
                return View("buProfileGetAdmin", buProfileResp);
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Controllers.BuProfileController.buProfileGetAdmin :" + e.Message);
                throw;
            }

        }

    }
}
