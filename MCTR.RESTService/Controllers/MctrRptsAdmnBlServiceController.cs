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
    public class MctrRptsAdmnBlServiceController : ApiController
    {
         private readonly ILog logger;
        public MctrRptsAdmnBlServiceController()
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
        [ActionName("getRgBuLOV")]
        public HttpResponseMessage getRgBuLOV([FromBody]IEnumerable<MctrRptsAdmnBl> mctrOpenReportsBl)
        {
            logger.Info("Executing Rest API : selectionoriginatorWhenButtonPressed() with request : " + mctrOpenReportsBl);
            try
            {
                IMctrRptsAdmnBlBusiness mctrOpenReportsBlBusiness = new MctrRptsAdmnBlBusiness();
                var response = mctrOpenReportsBlBusiness.getRgBuLOV(mctrOpenReportsBl);
                mctrOpenReportsBl.First().BUGroups = response;
                logger.Info("Response received from mctrOpenReportsBlBusiness.selectionoriginatorWhenButtonPressed() : " + response);
                return Request.CreateResponse(HttpStatusCode.OK, mctrOpenReportsBl);
            }
            catch (Exception e)
            {

                logger.Error("Error from MCTR.RESTService.Controllers.MctrIncrRatesService.mctrIncrRatescmponCdPostTextItem()" + e.Message);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : getRgBuLOV
        ///</summary>
        ///<param name = "MctrOpenReportsBl"></param>
        ///<returns>IEnumerable<MctrOpenReportsBl> </returns>

        [HttpGet]
        [ActionName("selectionbutToDateWhenButtonPressedOpenLOV")]
        public HttpResponseMessage selectionbutToDateWhenButtonPressedOpenLOV()
        {
            logger.Info("Executing Rest API : getRgBuLOV() with request : " );

                IMctrRptsAdmnBlBusiness mctrAdminReportsBlBusiness = new MctrRptsAdmnBlBusiness();
                var response = mctrAdminReportsBlBusiness.selectionbutToDateWhenButtonPressedOpenLOV();
                logger.Info("Response received from mctrOpenReportsBlBusiness.getRgBuLOV(): " + response);
                return Request.CreateResponse(HttpStatusCode.OK, response);


        }
    }
}