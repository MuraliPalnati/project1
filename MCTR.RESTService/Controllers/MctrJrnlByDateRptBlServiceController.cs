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
///MctrJrnlByDateRptBlServiceController is a Rest controller implementation  
///which acts as a wrapper to the MctrJrnlByDateRptBlBusiness implementation and
/// provides api path for each methods exposed.
///</summary>

  public class MctrJrnlByDateRptBlServiceController : ApiController
  {
   	
     private readonly ILog logger;
    
    public MctrJrnlByDateRptBlServiceController()
    {
      logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
    }  
  
        
    ///*************************************************************
    ///<summary>
    ///Method Name : selectionbutRptWhenButtonPressed
    ///</summary>
    ///<param name = "MctrJrnlByDateRptBl"></param>
    ///<returns>IEnumerable<MctrJrnlByDateRptBl> </returns>

    [HttpPost]
    [ActionName("selectionbutRptWhenButtonPressed")]
    public HttpResponseMessage selectionbutRptWhenButtonPressed([FromBody]IEnumerable<MctrJrnlByDate> mctrJrnlByDateRptBl)
{
      logger.Info("Executing Rest API : selectionbutRptWhenButtonPressed() with request : " + mctrJrnlByDateRptBl);
      if(mctrJrnlByDateRptBl != null){
        IMctrJrnlByDateRptBlBusiness mctrJrnlByDateRptBlBusiness = new MctrJrnlByDateRptBlBusiness();
        var response = mctrJrnlByDateRptBlBusiness.selectionbutRptWhenButtonPressed(mctrJrnlByDateRptBl);
        logger.Info("Response received from mctrJrnlByDateRptBlBusiness.selectionbutRptWhenButtonPressed() : " + response);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
      return null;
    }
        
    ///*************************************************************
    ///<summary>
    ///Method Name : selectionbutExcelWhenButtonPressed
    ///</summary>
    ///<param name = "MctrJrnlByDateRptBl"></param>
    ///<returns>IEnumerable<MctrJrnlByDateRptBl> </returns>

    [HttpPost]
    [ActionName("selectionbutExcelWhenButtonPressed")]
    public HttpResponseMessage selectionbutExcelWhenButtonPressed([FromBody]IEnumerable<MctrJrnlByDate> mctrJrnlByDateRptBl){
      logger.Info("Executing Rest API : selectionbutExcelWhenButtonPressed() with request : " + mctrJrnlByDateRptBl);
      if(mctrJrnlByDateRptBl != null){
        IMctrJrnlByDateRptBlBusiness mctrJrnlByDateRptBlBusiness = new MctrJrnlByDateRptBlBusiness();
        var response = mctrJrnlByDateRptBlBusiness.selectionbutExcelWhenButtonPressed(mctrJrnlByDateRptBl);
        logger.Info("Response received from mctrJrnlByDateRptBlBusiness.selectionbutExcelWhenButtonPressed() : " + response);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
      return null;
    }
  
    ///*************************************************************
    ///<summary>
    ///Method Name : getRgBuLOV()
    ///</summary>
    ///<param name = "MctrJrnlByDateRptBl"></param>
    ///<returns>IEnumerable<MctrJrnlByDateRptBl> </returns>

    [HttpPost]
    [ActionName("getRgBuLOV()")]
    public HttpResponseMessage getRgBuLOV([FromBody]IEnumerable<MctrJrnlByDate> mctrJrnlByDateRptBl){
      logger.Info("Executing Rest API : getRgBuLOV()() with request : " + mctrJrnlByDateRptBl);
      if(mctrJrnlByDateRptBl != null){
        IMctrJrnlByDateRptBlBusiness mctrJrnlByDateRptBlBusiness = new MctrJrnlByDateRptBlBusiness();
        var response = mctrJrnlByDateRptBlBusiness.getRgBuLOV(mctrJrnlByDateRptBl);
        logger.Info("Response received from mctrJrnlByDateRptBlBusiness.getRgBuLOV()() : " + response);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
      return null;
    }
        
    ///*************************************************************
    ///<summary>
    ///Method Name : getRgFinCtlLOV()
    ///</summary>
    ///<param name = "MctrJrnlByDateRptBl"></param>
    ///<returns>IEnumerable<MctrJrnlByDateRptBl> </returns>

    [HttpPost]
    [ActionName("getRgFinCtlLOV()")]
    public HttpResponseMessage getRgFinCtlLOV([FromBody]IEnumerable<MctrJrnlByDate> mctrJrnlByDateRptBl){
      logger.Info("Executing Rest API : getRgFinCtlLOV()() with request : " + mctrJrnlByDateRptBl);
      if(mctrJrnlByDateRptBl != null){
        IMctrJrnlByDateRptBlBusiness mctrJrnlByDateRptBlBusiness = new MctrJrnlByDateRptBlBusiness();
        var response = mctrJrnlByDateRptBlBusiness.getRgFinCtlLOV(mctrJrnlByDateRptBl);
        logger.Info("Response received from mctrJrnlByDateRptBlBusiness.getRgFinCtlLOV()() : " + response);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
      return null;
    }
        
    ///*************************************************************
    ///<summary>
    ///Method Name : getRgOrigLOV()
    ///</summary>
    ///<param name = "MctrJrnlByDateRptBl"></param>
    ///<returns>IEnumerable<MctrJrnlByDateRptBl> </returns>

    [HttpPost]
    [ActionName("getRgOrigLOV()")]
    public HttpResponseMessage getRgOrigLOV([FromBody]IEnumerable<MctrJrnlByDate> mctrJrnlByDateRptBl){
      logger.Info("Executing Rest API : getRgOrigLOV()() with request : " + mctrJrnlByDateRptBl);
      if(mctrJrnlByDateRptBl != null){
        IMctrJrnlByDateRptBlBusiness mctrJrnlByDateRptBlBusiness = new MctrJrnlByDateRptBlBusiness();
        var response = mctrJrnlByDateRptBlBusiness.getRgOrigLOV(mctrJrnlByDateRptBl);
        logger.Info("Response received from mctrJrnlByDateRptBlBusiness.getRgOrigLOV()() : " + response);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
      return null;
    }
        
    ///*************************************************************
    ///<summary>
    ///Method Name : getRgFromDateLOV()
    ///</summary>
    ///<param name = "MctrJrnlByDateRptBl"></param>
    ///<returns>IEnumerable<MctrJrnlByDateRptBl> </returns>

    [HttpPost]
    [ActionName("getRgFromDateLOV()")]
    public HttpResponseMessage getRgFromDateLOV([FromBody]IEnumerable<MctrJrnlByDate> mctrJrnlByDateRptBl){
      logger.Info("Executing Rest API : getRgFromDateLOV()() with request : " + mctrJrnlByDateRptBl);
      if(mctrJrnlByDateRptBl != null){
        IMctrJrnlByDateRptBlBusiness mctrJrnlByDateRptBlBusiness = new MctrJrnlByDateRptBlBusiness();
        var response = mctrJrnlByDateRptBlBusiness.getRgFromDateLOV(mctrJrnlByDateRptBl);
        logger.Info("Response received from mctrJrnlByDateRptBlBusiness.getRgFromDateLOV()() : " + response);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
      return null;
    }
        
    ///*************************************************************
    ///<summary>
    ///Method Name : getRgToDateLOV()
    ///</summary>
    ///<param name = "MctrJrnlByDateRptBl"></param>
    ///<returns>IEnumerable<MctrJrnlByDateRptBl> </returns>

    [HttpPost]
    [ActionName("getRgToDateLOV()")]
    public HttpResponseMessage getRgToDateLOV([FromBody]IEnumerable<MctrJrnlByDate> mctrJrnlByDateRptBl){
      logger.Info("Executing Rest API : getRgToDateLOV()() with request : " + mctrJrnlByDateRptBl);
      if(mctrJrnlByDateRptBl != null){
        IMctrJrnlByDateRptBlBusiness mctrJrnlByDateRptBlBusiness = new MctrJrnlByDateRptBlBusiness();
        var response = mctrJrnlByDateRptBlBusiness.getRgToDateLOV(mctrJrnlByDateRptBl);
        logger.Info("Response received from mctrJrnlByDateRptBlBusiness.getRgToDateLOV()() : " + response);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
      return null;
    }
        
    ///*************************************************************
    ///<summary>
    ///Method Name : mctrJrnlByDateRptBlWhenWindowClosed
    ///</summary>
    ///<param name = "MctrJrnlByDateRptBl"></param>
    ///<returns>IEnumerable<MctrJrnlByDateRptBl> </returns>

    [HttpPost]
    [ActionName("mctrJrnlByDateRptBlWhenWindowClosed")]
    public HttpResponseMessage mctrJrnlByDateRptBlWhenWindowClosed([FromBody]IEnumerable<MctrJrnlByDate> mctrJrnlByDateRptBl){
      logger.Info("Executing Rest API : mctrJrnlByDateRptBlWhenWindowClosed() with request : " + mctrJrnlByDateRptBl);
      if(mctrJrnlByDateRptBl != null){
        IMctrJrnlByDateRptBlBusiness mctrJrnlByDateRptBlBusiness = new MctrJrnlByDateRptBlBusiness();
        var response = mctrJrnlByDateRptBlBusiness.mctrJrnlByDateRptBlWhenWindowClosed(mctrJrnlByDateRptBl);
        logger.Info("Response received from mctrJrnlByDateRptBlBusiness.mctrJrnlByDateRptBlWhenWindowClosed() : " + response);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
      return null;
    }
        
    
	}

}

