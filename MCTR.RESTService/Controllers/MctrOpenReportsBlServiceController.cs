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
    ///MctrOpenReportsBlServiceController is a Rest controller implementation  
    ///which acts as a wrapper to the MctrOpenReportsBlBusiness implementation and
    /// provides api path for each methods exposed.
    ///</summary>

    public class MctrOpenReportsBlServiceController : ApiController
    {

         private readonly ILog logger;

        public MctrOpenReportsBlServiceController()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        }



        ///*************************************************************
        ///<summary>
        ///Method Name : selectionoriginatorWhenButtonPressed
        ///</summary>
        ///<param name = "MctrOpenReportsBl"></param>
        ///<returns>IEnumerable<MctrOpenReportsBl> </returns>

        [HttpPost]
        [ActionName("selectionoriginatorWhenButtonPressed")]
        public HttpResponseMessage selectionoriginatorWhenButtonPressed([FromBody]IEnumerable<MctrOpenReportsBl> mctrOpenReportsBl)
        {
            logger.Info("Executing Rest API : selectionoriginatorWhenButtonPressed() with request : " + mctrOpenReportsBl);
            if (mctrOpenReportsBl != null)
            {
                IMctrOpenReportsBlBusiness mctrOpenReportsBlBusiness = new MctrOpenReportsBlBusiness();
                var response = mctrOpenReportsBlBusiness.selectionoriginatorWhenButtonPressed(mctrOpenReportsBl);
                logger.Info("Response received from mctrOpenReportsBlBusiness.selectionoriginatorWhenButtonPressed() : " + response);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            return null;
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : selectionstatusWhenButtonPressed
        ///</summary>
        ///<param name = "MctrOpenReportsBl"></param>
        ///<returns>IEnumerable<MctrOpenReportsBl> </returns>

        [HttpPost]
        [ActionName("selectionstatusWhenButtonPressed")]
        public HttpResponseMessage selectionstatusWhenButtonPressed([FromBody]IEnumerable<MctrOpenReportsBl> mctrOpenReportsBl)
        {
            logger.Info("Executing Rest API : selectionstatusWhenButtonPressed() with request : " + mctrOpenReportsBl);
            if (mctrOpenReportsBl != null)
            {
                IMctrOpenReportsBlBusiness mctrOpenReportsBlBusiness = new MctrOpenReportsBlBusiness();
                var response = mctrOpenReportsBlBusiness.selectionstatusWhenButtonPressed(mctrOpenReportsBl);
                logger.Info("Response received from mctrOpenReportsBlBusiness.selectionstatusWhenButtonPressed() : " + response);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            return null;
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : selectionfinancialControlWhenButtonPressed
        ///</summary>
        ///<param name = "MctrOpenReportsBl"></param>
        ///<returns>IEnumerable<MctrOpenReportsBl> </returns>

        [HttpPost]
        [ActionName("selectionfinancialControlWhenButtonPressed")]
        public HttpResponseMessage selectionfinancialControlWhenButtonPressed([FromBody]IEnumerable<MctrOpenReportsBl> mctrOpenReportsBl)
        {
            logger.Info("Executing Rest API : selectionfinancialControlWhenButtonPressed() with request : " + mctrOpenReportsBl);
            if (mctrOpenReportsBl != null)
            {
                IMctrOpenReportsBlBusiness mctrOpenReportsBlBusiness = new MctrOpenReportsBlBusiness();
                var response = mctrOpenReportsBlBusiness.selectionfinancialControlWhenButtonPressed(mctrOpenReportsBl);
                logger.Info("Response received from mctrOpenReportsBlBusiness.selectionfinancialControlWhenButtonPressed() : " + response);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            return null;
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : selectionbutExcelWhenButtonPressed
        ///</summary>
        ///<param name = "MctrOpenReportsBl"></param>
        ///<returns>IEnumerable<MctrOpenReportsBl> </returns>

        [HttpPost]
        [ActionName("selectionbutExcelWhenButtonPressed")]
        public HttpResponseMessage selectionbutExcelWhenButtonPressed([FromBody]IEnumerable<MctrOpenReportsBl> mctrOpenReportsBl)
        {
            logger.Info("Executing Rest API : selectionbutExcelWhenButtonPressed() with request : " + mctrOpenReportsBl);
            if (mctrOpenReportsBl != null)
            {
                IMctrOpenReportsBlBusiness mctrOpenReportsBlBusiness = new MctrOpenReportsBlBusiness();
                var response = mctrOpenReportsBlBusiness.selectionbutExcelWhenButtonPressed(mctrOpenReportsBl);
                logger.Info("Response received from mctrOpenReportsBlBusiness.selectionbutExcelWhenButtonPressed() : " + response);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            return null;
        }



        ///*************************************************************
        ///<summary>
        ///Method Name : getRgBuLOV
        ///</summary>
        ///<param name = "MctrOpenReportsBl"></param>
        ///<returns>IEnumerable<MctrOpenReportsBl> </returns>

        [HttpPost]
        [ActionName("getRgBuLOV")]
        public HttpResponseMessage getRgBuLOV([FromBody]IEnumerable<MctrBusUnit> mctrOpenReportsBl)
        {
            logger.Info("Executing Rest API : getRgBuLOV() with request : " + mctrOpenReportsBl);
            if (mctrOpenReportsBl != null)
            {
                IMctrOpenReportsBlBusiness mctrOpenReportsBlBusiness = new MctrOpenReportsBlBusiness();
                var response = mctrOpenReportsBlBusiness.getRgBuLOV(mctrOpenReportsBl);
                logger.Info("Response received from mctrOpenReportsBlBusiness.getRgBuLOV(): " + response);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            return null;

        }
    }
}


