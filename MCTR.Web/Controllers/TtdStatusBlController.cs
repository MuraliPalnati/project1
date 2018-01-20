
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
    ///TtdStatusBlController is a web controller implementation for the 
    ///TtdStatusBl screen.
    ///</summary>
    ///
    [CustomAuthorize]
    public class TtdStatusBlController : Controller
  {
     private readonly ILog logger;


    public TtdStatusBlController(){
      logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
          
    }
     

    ///*************************************************************
    ///<summary>
    ///Method Name : lineItemLineItemOnLoad
    ///</summary>
    ///<param name = "TtdStatusBl"></param>
    ///<returns>IEnumerable<TtdStatusBl> </returns>

    [HttpPost]
    public ActionResult lineItemLineItemOnLoad(TtdStatusBl ttdStatusBl)
        {
            try
            {
                if (ttdStatusBl != null)
                {
                    logger.Info("Executing  MCTR.Web.Controllers.TtdStatusBlController.lineItemLineItemOnLoad()  " + ttdStatusBl);
                    TtdStatusBlHandler ttdStatusBlHandler = new TtdStatusBlHandler();
                    logger.Debug("Executing MCTR.Web.Controllers.TtdStatusBlController.lineItemLineItemOnLoad()");
                    var ttdStatusBlResp = ttdStatusBlHandler.lineItemLineItemOnLoad(ttdStatusBl);
                    logger.Info("Response Received from MCTR.Web.Controllers.TtdStatusBlController.lineItemLineItemOnLoad() : " + ttdStatusBlResp);
                    return View("TtdStatusBl", ttdStatusBlResp);
                }
                else {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch(Exception e)
            {
                logger.Error("Error from MCTR.Web.Controllers.TtdStatusBlController.lineItemLineItemOnLoad()"+ e.Message);
                throw;
            }
     }   

    ///*************************************************************
    ///<summary>
    ///Method Name : ttdStatusBlWhenWindowClosed
    ///</summary>
    ///<param name = "TtdStatusBl"></param>
    ///<returns>IEnumerable<TtdStatusBl> </returns>

    [HttpPost]
    public ActionResult ttdStatusBlWhenWindowClosed(TtdStatusBl ttdStatusBl)
        {
            try
            {
                if (ttdStatusBl != null)
                {
                    logger.Info("Executing MCTR.Web.Controllers.TtdStatusBlController.lineItemLineItemOnLoad() " + ttdStatusBl);
                    TtdStatusBlHandler ttdStatusBlHandler = new TtdStatusBlHandler();
                    logger.Debug("Executing MCTR.Web.Controllers.TtdStatusBlController.lineItemLineItemOnLoad()");
                    var ttdStatusBlResp = ttdStatusBlHandler.ttdStatusBlWhenWindowClosed(ttdStatusBl);
                    logger.Info("Response Received from MCTR.Web.Controllers.TtdStatusBlController.lineItemLineItemOnLoad()  : " + ttdStatusBlResp);
                    return View("TtdStatusBl", ttdStatusBlResp);
                }
                else {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch(Exception e)
            {
                logger.Error("Error from MCTR.Web.Controllers.TtdStatusBlController.lineItemLineItemOnLoad()" + e.Message);
                throw;
            }
     }      
  } 
}
