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
using MCTR.Business;
using MCTR.BusinessInterface;
using MCTR.DomainEntity;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MCTR.RESTService.Controllers
{
    ///*********************************************************************
    ///<summary>
    ///RoleBuServiceController is a Rest controller implementation  
    ///which acts as a wrapper to the RoleListBusiness implementation and
    /// provides api path for each methods exposed.
    ///</summary>
    public class RoleBuServiceController : ApiController
    {

         private readonly ILog logger;
        public RoleBuServiceController()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : rolebuonload
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>HttpResponseMessage</returns>
        [HttpPost]
        [ActionName("rolebuonload")]
        public HttpResponseMessage rolebuonload(IEnumerable<RoleBu> roleBu)
        {
            try
            {
                logger.Info("Executing MCTR.RESTService.RoleBuServiceController.rolebuonload() with input:" + roleBu);
                IRoleBuBusiness roleBuBusiness = new RoleBuBusiness();
                logger.Info("Executing Rest API : rolebuonload() with request : " + roleBu);
                var response = roleBuBusiness.rolebuonload(roleBu);
                logger.Info("Response received from MCTR.RESTService.RoleBuServiceController.rolebuonload() : " + response);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : roleBuopenLOV
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>HttpResponseMessage</returns>
        [HttpGet]
        [ActionName("roleBuopenLOV")]
        public HttpResponseMessage roleBuopenLOV()
        {
            try
            {
                logger.Info("Executing MCTR.RESTService.RoleBuServiceController.roleBuopenLOV");
                IRoleBuBusiness roleBuBusiness = new RoleBuBusiness();
                var response = roleBuBusiness.roleBuopenLOV();
                logger.Info("Response received from MCTR.RESTService.RoleBuServiceController.roleBuopenLOV: " + response);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : roleBuPostQuery
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>HttpResponseMessage</returns>
        [HttpPost]
        [ActionName("roleBuPostQuery")]
        public HttpResponseMessage roleBuPostQuery([FromBody]IEnumerable<RoleBu> roleBu)
        {
            try
            {
                logger.Info("Executing MCTR.RESTService.RoleBuServiceController.roleBuPostQuery() with input:" + roleBu);
                if (roleBu != null)
                {
                    IRoleBuBusiness roleBuBusiness = new RoleBuBusiness();
                    var response = roleBuBusiness.roleBuPostQuery(roleBu);
                    logger.Info("Response received from MCTR.RESTService.RoleBuServiceController.roleBuPostQuery() : " + response);
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }
                return null;
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : roleBuPreRecord
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>HttpResponseMessage</returns>
        [HttpPost]
        [ActionName("roleBuPreRecord")]
        public HttpResponseMessage roleBuPreRecord([FromBody]IEnumerable<RoleBu> roleBu)
        {
            try
            {
                logger.Info("Executing MCTR.RESTService.RoleBuServiceController.roleBuPreRecord() with input:" + roleBu);
                if (roleBu != null)
                {
                    IRoleBuBusiness roleBuBusiness = new RoleBuBusiness();
                    var response = roleBuBusiness.roleBuPreRecord(roleBu);
                    logger.Info("Response received from MCTR.RESTService.RoleBuServiceController.roleBuPreRecord() : " + response);
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }
                return null;
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : roleBuPostDelete
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>HttpResponseMessage</returns>
        [HttpPost]
        [ActionName("roleBuPostDelete")]
        public HttpResponseMessage roleBuPostDelete([FromBody]IEnumerable<RoleBu> roleBu)
        {
            try
            {
                if (roleBu != null)
                {
                    logger.Info("Executing MCTR.RESTService.RoleBuServiceController.roleBuPostDelete() with input:" + roleBu);
                    IRoleBuBusiness roleBuBusiness = new RoleBuBusiness();
                    var response = roleBuBusiness.roleBuPostDelete(roleBu);
                    logger.Info("Response received from MCTR.RESTService.RoleBuServiceController.roleBuPostDelete() : " + response);
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }
                return null;
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : roleBuPostInsert
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>HttpResponseMessage</returns>
        [HttpPost]
        [ActionName("roleBuPostInsert")]
        public HttpResponseMessage roleBuPostInsert([FromBody]IEnumerable<RoleBu> roleBu)
        {
            try
            {
                logger.Info("Executing MCTR.RESTService.RoleBuServiceController.roleBuPostInsert() with input:" + roleBu);
                if (roleBu != null)
                {
                    IRoleBuBusiness roleBuBusiness = new RoleBuBusiness();
                    var response = roleBuBusiness.roleBuPostInsert(roleBu);
                    logger.Info("Response received from MCTR.RESTService.RoleBuServiceController.roleBuPostInsert() : " + response);
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }
                return null;
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : roleBuPostUpdate
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>HttpResponseMessage</returns>
        [HttpPost]
        [ActionName("roleBuPostUpdate")]
        public HttpResponseMessage roleBuPostUpdate([FromBody]IEnumerable<RoleBu> roleBu)
        {
            try
            {
                logger.Info("Executing MCTR.RESTService.RoleBuServiceController.roleBuPostUpdate() with input:" + roleBu);
                if (roleBu != null)
                {
                    IRoleBuBusiness roleBuBusiness = new RoleBuBusiness();
                    var response = roleBuBusiness.roleBuPostUpdate(roleBu);
                    logger.Info("Response received from MCTR.RESTService.RoleBuServiceController.roleBuPostUpdate() : " + response);
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }
                return null;
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : roleBuWhenNewFormInstance
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>HttpResponseMessage</returns>
        [HttpPost]
        [ActionName("roleBuWhenNewFormInstance")]
        public HttpResponseMessage roleBuWhenNewFormInstance([FromBody]IEnumerable<RoleBu> roleBu)
        {
            try
            {
                logger.Info("Executing MCTR.RESTService.RoleBuServiceController.roleBuWhenNewFormInstance() with input:" + roleBu);
                if (roleBu != null)
                {
                    IRoleBuBusiness roleBuBusiness = new RoleBuBusiness();
                    var response = roleBuBusiness.roleBuWhenNewFormInstance(roleBu);
                    logger.Info("Response received from MCTR.RESTService.RoleBuServiceController.roleBuWhenNewFormInstance() : " + response);
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }
                return null;
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
        }
    }
}

