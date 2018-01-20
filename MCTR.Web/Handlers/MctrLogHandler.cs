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
using System;
using System.Collections.Generic;
namespace MCTR.Web.Handlers
{
    ///*********************************************************************
    ///<summary>
    ///MctrLogHandler is a Rest controller implementation  
    ///which acts as a wrapper to the MctrLogOrigBusiness implementation and
    /// provides api path for each methods exposed.
    ///</summary>

    public class MctrLogHandler
  {
     private readonly ILog logger;
     

        public MctrLogHandler()
    {
      logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
    }
        ///*************************************************************
        ///<summary>
        ///Method Name : mctrLogOnInsert
        ///</summary>
        ///<param name = "mctrLogOrig"></param>
        ///<returns>IEnumerable<MctrLog> </returns>

        public IEnumerable<MctrLog> mctrLogOnInsert(MctrLog mctrLogOrig){

            try {
                logger.Debug("Executing MCTR.Web.Handlers.MctrLogHandler.mctrLogOnInsert rest service handler.");
                string restApiPath = "MctrLogService/mctrLogOnInsert";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + mctrLogOrig);
                var response = HandlerUtil<MctrLog>.RestPostProcessor(restApiPath, mctrLogOrig);
                logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
                return response;
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Handlers.MctrLogHandler.buProfilebusinessUnitOnLoad :" + e.Message);
                throw;
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : mctrLogWhenNewRecordInstance
        ///</summary>
        ///<param name = "mctrLogOrig"></param>
        ///<returns>IEnumerable<MctrLog> </returns>

        public IEnumerable<MctrLog> mctrLogWhenNewRecordInstance(MctrLog mctrLogOrig){
            try {
                logger.Debug("Executing MCTR.Web.Handlers.MctrLogHandler.mctrLogWhenNewRecordInstance rest service handler.");
                string restApiPath = "MctrLogService/mctrLogWhenNewRecordInstance";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + mctrLogOrig);
                var response = HandlerUtil<MctrLog>.RestPostProcessor(restApiPath, mctrLogOrig);
                logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
                return response;
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Handlers.MctrLogHandler.mctrLogWhenNewRecordInstance :" + e.Message);
                throw;
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : mctrLogOrigWhenWindowClosed
        ///</summary>
        ///<param name = "mctrLogOrig"></param>
        ///<returns>IEnumerable<MctrLog> </returns>

        public IEnumerable<MctrLog> mctrLogOrigWhenWindowClosed(MctrLog mctrLogOrig){
            try {
                logger.Debug("Executing MCTR.Web.Handlers.MctrLogHandler.mctrLogOrigWhenWindowClosed rest service handler.");
                string restApiPath = "MctrLogService/mctrLogOrigWhenWindowClosed";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + mctrLogOrig);
                var response = HandlerUtil<MctrLog>.RestPostProcessor(restApiPath, mctrLogOrig);
                logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
                return response;
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Business.BuprofileBusiness.mctrLogOrigWhenWindowClosed :" + e.Message);
                throw;
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : Get
        ///</summary>
        ///<param></param>
        ///<returns>IEnumerable<MctrLog> </returns>
        public IEnumerable<MctrLog> Get()
        {
            try {

                logger.Debug("Executing MCTR.Web.Handlers.MctrLogHandler.Get rest service handler.");
                string restApiPath = "MctrLogService/Get";
                logger.Info("Invoking Rest API : " + restApiPath);
                var response = HandlerUtil<MctrLog>.RestPostProcessor(restApiPath, null);
                logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
                return response;
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Handlers.MctrLogHandler.Get :" + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : validateBemsJson
        ///</summary>
        ///<param></param>
        ///<returns>IEnumerable<MctrLog> </returns>
        public IEnumerable<MctrLog> validateBemsJson(MctrLog mctrLogOrigmctr)
        {
            try
            {

                logger.Debug("Executing MCTR.Web.Handlers.MctrLogHandler.Get rest service handler.");
                string restApiPath = "MctrLogService/validateBemsJson";
                logger.Info("Invoking Rest API : " + restApiPath);
                var response = HandlerUtil<MctrLog>.RestPostProcessor(restApiPath, mctrLogOrigmctr);
                logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
                return response;
            }
            catch (Exception e)
            {
                logger.Error("Exception thrown from MCTR.Web.Handlers.MctrLogHandler.Get :" + e.Message);
                throw;
            }
        }


    }

}
