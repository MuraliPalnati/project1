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

using System.Collections.Generic;
using log4net;
using MCTR.DomainEntity;
using System;

namespace MCTR.Web.Handlers
{
    public class TransTypeHandler
    {
         private readonly ILog logger;
        public TransTypeHandler()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : transTypeWhenNewFormInstance
        ///</summary>
        ///<param name = "transType"></param>
        ///<returns>IEnumerable<transType></returns>
        public IEnumerable<TransType> transTypeWhenNewFormInstance(TransType transType)
        {
            try
            {
                logger.Debug("Executing custTypeWhenNewFormInstance rest service handler.");
                string restApiPath = "TransTypeService/transTypeWhenNewFormInstance";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + transType);
                var response = HandlerUtil<TransType>.RestPostProcessor(restApiPath, transType);
                logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
                return response;
            }
            catch (Exception e)
            {
                logger.Error("Error fromMCTR.Web.Handlers.TransTypeHandler.transTypeWhenNewFormInstance rest service handler " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : transTypecmponCdPostTextItem
        ///</summary>
        ///<param name = "transType"></param>
        ///<returns>IEnumerable<transType></returns>
        public IEnumerable<TransType> transTypecmponCdPostTextItem(TransType transType)
        {
            try
            {
                logger.Debug("Executing custTypeWhenNewFormInstance rest service handler.");
                string restApiPath = "TransTypeService/transTypecmponCdPostTextItem";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + transType);
                var response = HandlerUtil<TransType>.RestPostProcessor(restApiPath, transType);
                logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
                return response;
            }
            catch (Exception e)
            {
                logger.Error("Error fromMCTR.Web.Handlers.TransTypeHandler.transTypeWhenNewFormInstance rest service handler " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : transTypeWhenWindowClosed
        ///</summary>
        ///<param name = "transType"></param>
        ///<returns>IEnumerable<transType></returns>
        public IEnumerable<TransType> transTypeWhenWindowClosed(TransType transType)
        {
            try
            {
                logger.Debug("Executing transTypeWhenWindowClosed rest service handler.");
                string restApiPath = "CustType/transTypeWhenWindowClosed";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + transType);
                var response = HandlerUtil<TransType>.RestPostProcessor(restApiPath, transType);
                logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
                return response;
            }
            catch (Exception e)
            {
                logger.Error("Error fromMCTR.Web.Handlers.TransTypeHandler.transTypeWhenNewFormInstance rest service handler " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : transtypeonload
        ///</summary>
        ///<param name = "transType"></param>
        ///<returns>IEnumerable<transType></returns>
        public IEnumerable<TransType> transtypeonload(TransType transType)
        {
            try {
                string restApiPath = "transtypeservice/transtypeonload";
                logger.Info("Invoking Rest API : " + restApiPath);
                var response = HandlerUtil<TransType>.RestPostProcessor(restApiPath, transType);
                logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
                return response;
            }
            catch (Exception e)
            {
                logger.Error("Error fromMCTR.Web.Handlers.TransTypeHandler.transTypeWhenNewFormInstance rest service handler " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : transTypeEdit
        ///</summary>
        ///<param name = "transType"></param>
        ///<returns>IEnumerable<transType></returns>
        public IEnumerable<TransTypeEdit> transTypeEdit(TransTypeEdit transType)
        {
            try
            {
                logger.Debug("Executing DeleteCustType rest service handler.");
                string restApiPath = "TransTypeService/EditTransTypes";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + transType);
                var response = HandlerUtil<TransTypeEdit>.RestPostProcessor(restApiPath, transType);
                logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
                return response;
            }
            catch (Exception e)
            {
                logger.Error("Error fromMCTR.Web.Handlers.TransTypeHandler.transTypeWhenNewFormInstance rest service handler " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : transTypeDelete
        ///</summary>
        ///<param name = "transType"></param>
        ///<returns>IEnumerable<transType></returns>
        public IEnumerable<TransType> transTypeDelete(TransType transType)
        {
            try
            {
                logger.Debug("Executing DeleteCustType rest service handler.");
                string restApiPath = "TransTypeService/DeleteTransTypes";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + transType);
                var response = HandlerUtil<TransType>.RestPostProcessor(restApiPath, transType);
                logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
                return response;
            }
            catch (Exception e)
            {
                logger.Error("Error fromMCTR.Web.Handlers.TransTypeHandler.transTypeWhenNewFormInstance rest service handler " + e.Message);
                throw;
            }
        }
    }

}