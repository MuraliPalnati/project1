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
using Newtonsoft.Json.Linq;
using System.Resources;
using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MCTR.Web.Security;

namespace MCTR.Web.Controllers
{

    ///*********************************************************************
    ///<summary>
    ///CustTypeController is a web controller implementation for the 
    ///CustType screen.
    ///</summary>
    [CustomAuthorize]
    public class CustTypeController : Controller, IDisposable
    {
         private readonly ILog logger;


        public CustTypeController()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : custTypeWhenNewFormInstance
        ///</summary>
        ///<param name = "CustType"></param>
        ///<returns>IEnumerable<CustType> </returns>
        [HttpPost]
        public ActionResult custTypeWhenNewFormInstance(CustType custType)
        {
            try
            {
                logger.Info("Executing custTypeWhenNewFormInstance() : " + custType);
                if (custType != null)
                {
                    CustTypeHandler custTypeHandler = new CustTypeHandler();
                    logger.Debug("Executing custTypeHandler.custTypeWhenNewFormInstance().");
                    var custTypeResp = custTypeHandler.custTypeWhenNewFormInstance(custType);
                    logger.Info("Response Received : " + custTypeResp);
                    return View("custtypeGetAll");
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch(Exception e)
            {
                logger.Info("Error from custTypeHandler.custTypeWhenNewFormInstance()" + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : custTypeWhenWindowClosed
        ///</summary>
        ///<param name = "CustType"></param>
        ///<returns>IEnumerable<CustType> </returns>
        [HttpPost]
        public ActionResult custTypeWhenWindowClosed(CustType custType)
        {
            try
            {
                logger.Info("Executing custTypeWhenWindowClosed() : " + custType);
                if (custType != null)
                {
                    CustTypeHandler custTypeHandler = new CustTypeHandler();
                    logger.Debug("Executing custTypeHandler.custTypeWhenWindowClosed().");
                    var custTypeResp = custTypeHandler.custTypeWhenWindowClosed(custType);
                    logger.Info("Response Received : " + custTypeResp);
                    return View("CustType", custTypeResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch (Exception e)
            {
                logger.Info("Error from custTypeHandler.custTypeWhenWindowClosed():" + e.Message);
                throw;
            }

        }

        ///*************************************************************
        ///<summary>
        ///Method Name : custtypeGetAll
        ///</summary>
        ///<returns>View</returns>
        [HttpGet]
        public ActionResult custtypeGetAll() {
                
                return View();
        }

        public JsonResult custTypeLists()
        {
            try
            {
                logger.Info("Executing custTypeLists()");
                CustTypeHandler custTypeHandler = new CustTypeHandler();
                var custTypeResp = custTypeHandler.custtypeGetAll();
                logger.Info("Response Received : " + custTypeResp);
                var jsonData = new
                {
                    total = 1,
                    page = 1,
                    records = custTypeResp.Count(),
                    rows = custTypeResp,
                };
                return Json(jsonData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                logger.Info("Error from custTypeHandler.custTypeLists():" + e.Message);
                throw e;
            }
        }


        ///*************************************************************
        ///<summary>
        ///Method Name : EditCustType
        ///</summary>
        ///<returns>custType</returns>
        [HttpPost]
        [ActionName("EditCustType")]
        public ActionResult EditCustType(CustType custType)
        {
            logger.Info("Executing EditCustType : " + custType);
            if (custType != null)
            {
                CustTypeHandler custTypeHandler = new CustTypeHandler();
                logger.Debug("Executing custTypeHandler.EditCustType()");
                var custTypeResp = custTypeHandler.EditCustType(custType);
                logger.Info("Response Received : " + custTypeResp); 
                return View("custtypeGetAll");

            }
            else
            {
                logger.Info("Request object is null or doesn't contain any value.");
                return View();
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : DeleteCustType
        ///</summary>
        ///<param name = "CustType"></param>
        ///<returns>IEnumerable<CustType> </returns>

        [HttpPost]
        [ActionName("DeleteCustType")]
        public ActionResult DeleteCustType(CustType custType)
        {
            try
            {
                logger.Info("Executing DeleteCustType : " + custType);
                if (custType != null)
                {
                    CustTypeHandler custTypeHandler = new CustTypeHandler();
                    logger.Debug("Executing custTypeHandler.DeleteCustType()");
                    var custTypeResp = custTypeHandler.DeleteCustType(custType);
                    logger.Info("Response Received : " + custTypeResp);
                    return View("CustType", custTypeResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch (Exception e)
            {
                logger.Info("Error from custTypeHandler.DeleteCustType():" + e.Message);
                throw;
            }
        }
    }
}