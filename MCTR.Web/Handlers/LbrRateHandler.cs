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
using log4net;
using MCTR.DomainEntity;

namespace MCTR.Web.Handlers
{
    ///*********************************************************************
    ///<summary>
    ///LbrRateHandler provides a level of abstraction for consuming the REST api.
    ///</summary>
    public class LbrRateHandler
  {
     private readonly ILog logger;
    
    public LbrRateHandler()
    {
      logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
    }
        ///*************************************************************
        ///<summary>
        ///Method Name : LbrRatesWhenNewFormInstance
        ///</summary>

        ///<returns>IEnumerable<MctrIncrRates> </returns>

        public IEnumerable<LbrRate> LbrRatesWhenNewFormInstance()
        {

            logger.Debug("Executing mctrIncrRatesWhenNewFormInstance rest service handler.");
            string restApiPath = "LbrRateService/LbrRatesWhenNewFormInstance";
            logger.Info("Invoking Rest API : " + restApiPath + " with Request : ");
            var response = HandlerUtil<LbrRate>.RestGetProcessor(restApiPath);
            logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
            return response;
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : selectionfYearOnError
        ///</summary>
        ///<param name = "lbrRate"></param>
        ///<returns>IEnumerable<LbrRate></returns>
        public IEnumerable<LbrRate> selectionfYearOnError(LbrRate lbrRate)
         {
            try
            {
                logger.Debug("Executing MCTR.Web.Handlers.LbrRateHandler.selectionfYearOnError rest service handler.");
                string restApiPath = "LbrRateService/selectionfYearOnError";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + lbrRate);
                var response = HandlerUtil<LbrRate>.RestPostProcessor(restApiPath, lbrRate);
                logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
                return response;
            }
            catch(Exception e)
            {
                logger.Error("Error from MCTR.Web.Handlers.LbrRateHandler.selectionfYearOnError rest service handler." + e.Message);
                throw;
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : EditHandlerPost
        ///</summary>
        ///<param name = "MctrIncrRates"></param>
        ///<returns>IEnumerable<MctrIncrRates> </returns>
        public IEnumerable<LabourRatePyEdit> EditHandlerPost(LabourRatePyEdit lbrRate)
        {
            try
            {
                logger.Debug("Executing statusWhenNewFormInstance rest service handler.");
                string APIAction = "LbrRateService/Edit";
                var Response = HandlerUtil<LabourRatePyEdit>.RestPostProcessor(APIAction, lbrRate);
                return Response;
            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.Web.MctrIncrRatesHandler.EditHandlerPost():" + e.Message);
                throw;
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : selectionbutRatesListWhenButtonPressed
        ///</summary>
        ///<param name = "lbrRate"></param>
        ///<returns>IEnumerable<LbrRate></returns>
        public IEnumerable<LbrRate> selectionbutRatesListWhenButtonPressed(LbrRate lbrRate)
        {
            try
            {
                logger.Debug("Executing  MCTR.Web.Handlers.LbrRateHandler.selectionbutRatesListWhenButtonPressed rest service handler.");
                string restApiPath = "LbrRateService/selectionbutRatesListWhenButtonPressed";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + lbrRate);
                var response = HandlerUtil<LbrRate>.RestPostProcessor(restApiPath, lbrRate);
                logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
                return response;
            }
            catch(Exception e)
            {
                logger.Error("Error from MCTR.Web.Handlers.LbrRateHandler.selectionbutRatesListWhenButtonPressed rest service handler." + e.Message);
                throw;
            }
      }
        ///*************************************************************
        ///<summary>
        ///Method Name : LbrRateOnLoad
        ///</summary>
        ///<param name = "lbrRate"></param>
        ///<returns>IEnumerable<LbrRate></returns>

        public IEnumerable<LbrRate> LbrRateOnLoad(LbrRate lbrRate)
        {
            try
            {
                logger.Debug("Executing MCTR.Web.Handlers.LbrRateHandler.LbrRateOnLoad rest service handler.");
                string restApiPath = "LbrRateService/LbrRateOnLoad";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + lbrRate);
                var response = HandlerUtil<LbrRate>.RestPostProcessor(restApiPath, lbrRate);
                logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
                return response;
            }
            catch(Exception e)
            {
                logger.Error("Error from MCTR.Web.Handlers.LbrRateHandler.LbrRateOnLoad rest service handler." + e.Message);
                throw;
            }
            }

        ///*************************************************************
        ///<summary>
        ///Method Name : DeleteHandlerPost
        ///</summary>
        ///<param name = "Status"></param>
        ///<returns>IEnumerable<Status> </returns>
        public bool DeleteHandlerPost(LbrRate lbrRate)
        {
            try
            {
                logger.Debug("Executing statusWhenNewFormInstance rest service handler.");
                string APIAction = "LbrRateService/Delete";
                HandlerUtil<LbrRate>.RestPostProcessor(APIAction, lbrRate);
                return true;
            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.Web.Handlers.LbrRateHandler.DeleteHandlerPost rest service handler " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : CreateHandlerPost
        ///</summary>
        ///<param name = "Status"></param>
        ///<returns>IEnumerable<Status> </returns>
        public IEnumerable<LbrRate> CreateHandlerPost(LbrRate lbrRate)
        {
            try
            {
                logger.Debug("Executing statusWhenNewFormInstance rest service handler.");
                string APIAction = "LbrRateService/Create";
                var Response = HandlerUtil<LbrRate>.RestPostProcessor(APIAction, lbrRate);
                return Response;
            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.Web.Handlers.LbrRateHandler.CreateHandlerPost rest service handler " + e.Message);
                throw;
            }

        }
        ///*************************************************************
        ///<summary>
        ///Method Name : lbrRatesetidPostChange
        ///</summary>
        ///<param name = "lbrRate"></param>
        ///<returns>IEnumerable<LbrRate></returns>
        public IEnumerable<LbrRate> lbrRatesetidPostChange(LbrRate lbrRate)
                        {
            try
            {

                logger.Debug("Executing MCTR.Web.Handlers.LbrRateHandler.lbrRatesetidPostChange rest service handler");
                string restApiPath = "LbrRateService/lbrRatesetidPostChange";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + lbrRate);
                var response = HandlerUtil<LbrRate>.RestPostProcessor(restApiPath, lbrRate);
                logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
                return response;
            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.Web.Handlers.LbrRateHandler.lbrRatesetidPostChange rest service handler " + e.Message);
                throw;
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : Get
        ///</summary>
        ///<param name = "lbrRate"></param>
        ///<returns>IEnumerable<LbrRate></returns>
        public IEnumerable<LbrRate> Get()
        {
            try
            {
                logger.Debug("Executing MCTR.Web.Handlers.LbrRateHandler.Get rest service handler");
                string restApiPath = "LbrRateService/Get";
                logger.Info("Invoking Rest API : " + restApiPath);
                var response = HandlerUtil< LbrRate>.RestGetProcessor(restApiPath);
                logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
                return response;
            }
            catch (Exception e)
            {
                logger.Error("Error fromMCTR.Web.Handlers.LbrRateHandler.Get rest service handler " + e.Message);
                throw;
            }
        }

      
    }

}

