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
 
 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using log4net;

using MCTR.DomainEntity;
using MCTR.BusinessInterface;
using MCTR.Business;

namespace MCTR.RESTService.Controllers
{
///*********************************************************************
///<summary>
///MctrLogAcctServiceController is a Rest controller implementation  
///which acts as a wrapper to the MctrLogAcctBusiness implementation and
/// provides api path for each methods exposed.
///</summary>

  public class MctrLogAcctServiceController : ApiController
  {
   	
     private readonly ILog logger;
    
    public MctrLogAcctServiceController()
    {
      logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
    }  
    
     
    ///*************************************************************
    ///<summary>
    ///Method Name : mctrHeaderMctrHeaderOnLoad
    ///</summary>
    ///<param name = "MctrLogAcct"></param>
    ///<returns>IEnumerable<MctrLogAcct> </returns>

    [HttpPost]
    [ActionName("mctrHeaderMctrHeaderOnLoad")]
    public HttpResponseMessage mctrHeaderMctrHeaderOnLoad([FromBody]IEnumerable<MctrLogAcct> mctrLogAcct){
      logger.Info("ExecutingMCTR.RESTService.Controllers.MctrLogAcctServiceController..ctrHeaderMctrHeaderOnLoad() with request : " + mctrLogAcct);
            try {
                if (mctrLogAcct != null) {
                    IMctrLogAcctBusiness mctrLogAcctBusiness = new MctrLogAcctBusiness();
                    var response = mctrLogAcctBusiness.mctrHeaderMctrHeaderOnLoad(mctrLogAcct);
                    logger.Info("Response received from MCTR.RESTService.Controllers.MctrLogAcctServiceController.mctrHeaderMctrHeaderOnLoad() : " + response);
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }
                return null;
            }
            catch (Exception ex)
            {
                logger.Error("Excpetion occured at MCTR.RESTService.Controllers.MctrLogAcctServiceController.mctrHeaderMctrHeaderOnLoad()" + ex.Message);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        ///*************************************************************
        ///<summary>
        ///Method Name : validateBems
        ///</summary>
        ///<param name = "MctrLogAcct"></param>
        ///<returns>IEnumerable<MctrLogAcct> </returns>

        [HttpPost]
        [ActionName("validateBems")]
        public HttpResponseMessage validateBems([FromBody]IEnumerable<MctrLogAcct> mctrLogAcct)
        {
            logger.Info("ExecutingMCTR.RESTService.Controllers.MctrLogAcctServiceController..validateBems() with request : " + mctrLogAcct);
            try
            {
                if (mctrLogAcct != null)
                {
                    IMctrLogAcctBusiness mctrLogAcctBusiness = new MctrLogAcctBusiness();
                    var response = mctrLogAcctBusiness.validateBems(mctrLogAcct);
                    logger.Info("Response received from MCTR.RESTService.Controllers.MctrLogAcctServiceController.validateBems() : " + response);
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }
                return null;
            }
            catch (Exception ex)
            {
                logger.Error("Excpetion occured at MCTR.RESTService.Controllers.MctrLogAcctServiceController.validateBems()" + ex.Message);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        ///*************************************************************
        ///<summary>
        ///Method Name : mctrLogMctrLogOnLoad
        ///</summary>
        ///<param name = "MctrLogAcct"></param>
        ///<returns>IEnumerable<MctrLogAcct> </returns>

        [HttpGet]
    [ActionName("mctrLogAcct")]
    public HttpResponseMessage mctrLogMctrLogOnLoad(){
      logger.Info("Executing MCTR.RESTService.Controllers.MctrLogAcctServiceController.mctrLogMctrLogOnLoad() with request : ");
            try {
                IMctrLogAcctBusiness mctrLogAcctBusiness = new MctrLogAcctBusiness();
                var response = mctrLogAcctBusiness.mctrLogMctrLogOnLoad();
                logger.Info("Response received from MCTR.RESTService.Controllers.MctrLogAcctServiceController.mctrLogMctrLogOnLoad() : " + response);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                logger.Error("Excpetion occured at MCTR.RESTService.Controllers.MctrLogAcctServiceController.mctrLogMctrLogOnLoad()" + ex.Message);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        
    ///*************************************************************
    ///<summary>
    ///Method Name : mctrLogOnInsert
    ///</summary>
    ///<param name = "MctrLogAcct"></param>
    ///<returns>IEnumerable<MctrLogAcct> </returns>

    [HttpPost]
    [ActionName("mctrLogOnInsert")]
    public HttpResponseMessage mctrLogOnInsert([FromBody]IEnumerable<MctrLogAcct> mctrLogAcct){
      logger.Info("Executing MCTR.RESTService.Controllers.MctrLogAcctServiceController.mctrLogOnInsert() with request : " + mctrLogAcct);
            try {
                if (mctrLogAcct != null) {
                    IMctrLogAcctBusiness mctrLogAcctBusiness = new MctrLogAcctBusiness();
                    var response = mctrLogAcctBusiness.mctrLogOnInsert(mctrLogAcct);
                    logger.Info("Response received from MCTR.RESTService.Controllers.MctrLogAcctServiceController.mctrLogOnInsert() : " + response);
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }
                return null;
            }
            catch (Exception ex)
            {
                logger.Error("Excpetion occured at MCTR.RESTService.Controllers.MctrLogAcctServiceController.mctrLogOrigWhenWindowClosed()" + ex.Message);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        
    ///*************************************************************
    ///<summary>
    ///Method Name : mctrLogWhenNewRecordInstance
    ///</summary>
    ///<param name = "MctrLogAcct"></param>
    ///<returns>IEnumerable<MctrLogAcct> </returns>

    [HttpPost]
    [ActionName("mctrLogWhenNewRecordInstance")]
    public HttpResponseMessage mctrLogWhenNewRecordInstance([FromBody]IEnumerable<MctrLogAcct> mctrLogAcct){
      logger.Info("Executing MCTR.RESTService.Controllers.MctrLogAcctServiceController.mctrLogWhenNewRecordInstance() with request : " + mctrLogAcct);
            try {
                if (mctrLogAcct != null) {
                    IMctrLogAcctBusiness mctrLogAcctBusiness = new MctrLogAcctBusiness();
                    var response = mctrLogAcctBusiness.mctrLogWhenNewRecordInstance(mctrLogAcct);
                    logger.Info("Response received from MCTR.RESTService.Controllers.MctrLogAcctServiceController.mctrLogWhenNewRecordInstance() : " + response);
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }
                return null;
            }
            catch (Exception ex)
            {
                logger.Error("Excpetion occured at MCTR.RESTService.Controllers.MctrLogAcctServiceController.mctrLogOrigWhenWindowClosed()" + ex.Message);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        
    ///*************************************************************
    ///<summary>
    ///Method Name : mctrLogAcctWhenWindowClosed
    ///</summary>
    ///<param name = "MctrLogAcct"></param>
    ///<returns>IEnumerable<MctrLogAcct> </returns>

    [HttpPost]
    [ActionName("mctrLogAcctWhenWindowClosed")]
    public HttpResponseMessage mctrLogAcctWhenWindowClosed([FromBody]IEnumerable<MctrLogAcct> mctrLogAcct){
      logger.Info("ExecutingMCTR.RESTService.Controllers.MctrLogAcctServiceController.mctrLogAcctWhenWindowClosed() with request : " + mctrLogAcct);
            try {
                if (mctrLogAcct != null) {
                    IMctrLogAcctBusiness mctrLogAcctBusiness = new MctrLogAcctBusiness();
                    var response = mctrLogAcctBusiness.mctrLogAcctWhenWindowClosed(mctrLogAcct);
                    logger.Info("Response received from MCTR.RESTService.Controllers.MctrLogAcctServiceController.mctrLogAcctWhenWindowClosed() : " + response);
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }
                return null;
            }
            catch (Exception ex)
            {
                logger.Error("Excpetion occured at MCTR.RESTService.Controllers.MctrLogAcctServiceController.mctrLogOrigWhenWindowClosed()" + ex.Message);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        
    
	}

}

