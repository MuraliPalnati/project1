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
using System.Data;
using System.Web;

namespace MCTR.RESTService.Controllers
///*********************************************************************
///<summary>
///TtdCheckBlServiceController is a Rest controller implementation  
///which acts as a wrapper to the TtdCheckBlBusiness implementation and
/// provides api path for each methods exposed.
///</summary>
{

    public class TtdCheckBlServiceController : ApiController
    {
         private readonly ILog logger;

        public TtdCheckBlServiceController()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : ttdCheckTtdCheckOnLoad
        ///</summary>
        ///<param name = "TtdCheckBl"></param>
        ///<returns>IEnumerable<TtdCheckBl> </returns>
        //Api method that is to be called on load
        [HttpPost]
        [ActionName("ttdCheckTtdCheckOnLoad")]
        public HttpResponseMessage ttdCheckTtdCheckOnLoad([FromBody]IEnumerable<TtdCheckBl> ttdCheckBl)
        {
            try { 
            logger.Info("Executing Rest API : ttdCheckTtdCheckOnLoad() with request : ");            
            ITtdCheckBlBusiness ttdCheckBlBusiness = new TtdcheckblBusiness();
            var response = ttdCheckBlBusiness.ttdCheckTtdCheckOnLoad(ttdCheckBl);
            logger.Info("Response received from ttdCheckBlBusiness.ttdCheckTtdCheckOnLoad() : " + response);
            return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch(Exception e)
            {
                logger.Error("Error from MCTR.RESTService: " + e.Message);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }

        }
        ///*************************************************************
        ///<summary>
        ///Method Name : ttdCheckPostQuery
        ///</summary>
        ///<param name = "TtdCheckBl"></param>
        ///<returns>IEnumerable<TtdCheckBl> </returns>
        //Api method that is to be called on post query
        [HttpPost]
        [ActionName("ttdCheckPostQuery")]
        public HttpResponseMessage ttdCheckPostQuery([FromBody]IEnumerable<TtdCheckBl> ttdCheckBl)
        {
            try {
                logger.Info("Executing Rest API : ttdCheckPostQuery() with request : " + ttdCheckBl);
                if (ttdCheckBl != null)
                {
                    ITtdCheckBlBusiness ttdCheckBlBusiness = new TtdcheckblBusiness();
                    var response = ttdCheckBlBusiness.ttdCheckPostQuery(ttdCheckBl);
                    logger.Info("Response received from ttdCheckBlBusiness.ttdCheckPostQuery() : " + response);
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }
                return null;
            }
            catch(Exception e)
            {
                logger.Error("Error from MCTR.RESTService: " + e.Message);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }

        }
        ///*************************************************************
        ///<summary>
        ///Method Name : ttdCheckBlWhenNewFormInstance
        ///</summary>
        ///<param name = "TtdCheckBl"></param>
        ///<returns>IEnumerable<TtdCheckBl> </returns>
        //Api method that is to be called on new form instance
        [HttpPost]
        [ActionName("ttdCheckBlWhenNewFormInstance")]
        public HttpResponseMessage ttdCheckBlWhenNewFormInstance([FromBody]IEnumerable<TtdCheckBl> ttdCheckBl)
        {
            try {
                logger.Info("Executing Rest API : ttdCheckBlWhenNewFormInstance() with request : " + ttdCheckBl);
                if (ttdCheckBl != null)
                {
                    ITtdCheckBlBusiness ttdCheckBlBusiness = new TtdcheckblBusiness();
                    var response = ttdCheckBlBusiness.ttdCheckBlWhenNewFormInstance(ttdCheckBl);
                    logger.Info("Response received from ttdCheckBlBusiness.ttdCheckBlWhenNewFormInstance() : " + response);
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }
                return null;
            }
            catch(Exception e)
            {
                logger.Error("Error from MCTR.RESTService: " + e.Message);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : ttdCheckBlWhenWindowClosed
        ///</summary>
        ///<param name = "TtdCheckBl"></param>
        ///<returns>IEnumerable<TtdCheckBl> </returns>
        //Api method that is to be called on window closed.
        [HttpPost]
        [ActionName("ttdCheckBlWhenWindowClosed")]
        public HttpResponseMessage ttdCheckBlWhenWindowClosed([FromBody]IEnumerable<TtdCheckBl> ttdCheckBl)
        {
            try {
                logger.Info("Executing Rest API : ttdCheckBlWhenWindowClosed() with request : " + ttdCheckBl);
                if (ttdCheckBl != null)
                {
                    ITtdCheckBlBusiness ttdCheckBlBusiness = new TtdcheckblBusiness();
                    var response = ttdCheckBlBusiness.ttdCheckBlWhenWindowClosed(ttdCheckBl);
                    logger.Info("Response received from ttdCheckBlBusiness.ttdCheckBlWhenWindowClosed() : " + response);
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }
                return null;
            }
            catch(Exception e)
            {
                logger.Error("Error from MCTR.RESTService: " + e.Message);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
        }

        

    }



}



