using log4net;
using MCTR.DomainEntity;
using System;
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

namespace MCTR.Web.Handlers
{
    public class RoleHandler
  {
     private readonly ILog logger;
    
    public RoleHandler()
    {
      logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
    }
        ///*************************************************************
        ///<summary>
        ///Method Name : roleOnLoad
        ///</summary>
        ///<param name = "role"></param>
        ///<returns>IEnumerable<role> </returns>
        public IEnumerable<RoleList> roleOnLoad(RoleList role)
        {
            try {
                logger.Debug("Executing roleroleOnLoad rest service handler.");
                string restApiPath = "RoleService/roleOnLoad";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + role);
                var response = HandlerUtil<RoleList>.RestPostProcessor(restApiPath, role);
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
        ///Method Name : Save
        ///</summary>
        ///<param name = "role"></param>
        ///<returns>IEnumerable<role> </returns>
        public IEnumerable<RoleList> Save(RoleList role)
        {
            try
            {
                logger.Debug("Executing roleroleOnLoad rest service handler.");
                string restApiPath = "RoleService/Save";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + role);
                var response = HandlerUtil<RoleList>.RestPostProcessor(restApiPath, role);
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
        ///Method Name : rolebutGrpBuWhenButtonPressed
        ///</summary>
        ///<param name = "role"></param>
        ///<returns>IEnumerable<role> </returns>
        public IEnumerable<Role> rolebutGrpBuWhenButtonPressed(Role role)
        {
            try {
                logger.Debug("Executing rolebutGrpBuWhenButtonPressed rest service handler.");
                string restApiPath = "RoleService/rolebutGrpBuWhenButtonPressed";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + role);
                var response = HandlerUtil<Role>.RestPostProcessor(restApiPath, role);
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
        ///Method Name : rolebutResetBudgetWhenButtonPressed
        ///</summary>
        ///<param name = "role"></param>
        ///<returns>IEnumerable<role> </returns> 
        public IEnumerable<Role> rolebutResetBudgetWhenButtonPressed(Role role)
        {
            try {

                logger.Debug("Executing rolebutResetBudgetWhenButtonPressed rest service handler.");
                string restApiPath = "RoleService/rolebutResetBudgetWhenButtonPressed";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + role);
                var response = HandlerUtil<Role>.RestPostProcessor(restApiPath, role);
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
        ///Method Name : rolePostQuery
        ///</summary>
        ///<param name = "role"></param>
        ///<returns>IEnumerable<role> </returns>
        public IEnumerable<Role> rolePostQuery(Role role)
        {
            try {
                logger.Debug("Executing rolePostQuery rest service handler.");
                string restApiPath = "RoleService/rolePostQuery";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + role);
                var response = HandlerUtil<Role>.RestPostProcessor(restApiPath, role);
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
        ///Method Name : rolePreRecord
        ///</summary>
        ///<param name = "role"></param>
        ///<returns>IEnumerable<role> </returns>
        public IEnumerable<Role> rolePreRecord(Role role)
        {
            try {

                logger.Debug("Executing rolePreRecord rest service handler.");
                string restApiPath = "RoleService/rolePreRecord";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + role);
                var response = HandlerUtil<Role>.RestPostProcessor(restApiPath, role);
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
        ///Method Name : rolePreInsert
        ///</summary>
        ///<param name = "role"></param>
        ///<returns>IEnumerable<role> </returns>
        public IEnumerable<Role> rolePreInsert(Role role)
        {
            try
            {
                logger.Debug("Executing rolePreInsert rest service handler.");
                string restApiPath = "RoleService/rolePreInsert";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + role);
                var response = HandlerUtil<Role>.RestPostProcessor(restApiPath, role);
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
        ///Method Name : rolePreUpdate
        ///</summary>
        ///<param name = "role"></param>
        ///<returns>IEnumerable<role> </returns>
        public IEnumerable<Role> rolePreUpdate(Role role)
        {
            try {
                logger.Debug("Executing rolePreUpdate rest service handler.");
                string restApiPath = "RoleService/rolePreUpdate";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + role);
                var response = HandlerUtil<Role>.RestPostProcessor(restApiPath, role);
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
        ///Method Name : roleOnError
        ///</summary>
        ///<param name = "role"></param>
        ///<returns>IEnumerable<role> </returns>
        public IEnumerable<Role> roleOnError(Role role)
        {
            try
            {
                logger.Debug("Executing roleOnError rest service handler.");
                string restApiPath = "RoleService/roleOnError";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + role);
                var response = HandlerUtil<Role>.RestPostProcessor(restApiPath, role);
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
        ///Method Name : rolePostInsert
        ///</summary>
        ///<param name = "role"></param>
        ///<returns>IEnumerable<role> </returns> 
        public IEnumerable<Role> rolePostInsert(Role role)
        {
            try
            {

                logger.Debug("Executing rolePostInsert rest service handler.");
                string restApiPath = "RoleService/rolePostInsert";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + role);
                var response = HandlerUtil<Role>.RestPostProcessor(restApiPath, role);
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
        ///Method Name : rolePostDelete
        ///</summary>
        ///<param name = "role"></param>
        ///<returns>IEnumerable<role> </returns>
        public IEnumerable<Role> rolePostDelete(Role role)
        {
            try {
                logger.Debug("Executing rolePostDelete rest service handler.");
                string restApiPath = "RoleService/rolePostDelete";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + role);
                var response = HandlerUtil<Role>.RestPostProcessor(restApiPath, role);
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
        ///Method Name : rolePostUpdate
        ///</summary>
        ///<param name = "role"></param>
        ///<returns>IEnumerable<role> </returns>
        public IEnumerable<Role> rolePostUpdate(Role role)
        {
            try
            {
                logger.Debug("Executing rolePostUpdate rest service handler.");
                string restApiPath = "RoleService/rolePostUpdate";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + role);
                var response = HandlerUtil<Role>.RestPostProcessor(restApiPath, role);
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
        ///Method Name : roleWhenNewFormInstance
        ///</summary>
        ///<param name = "role"></param>
        ///<returns>IEnumerable<role> </returns> 
        public IEnumerable<Role> roleWhenNewFormInstance(Role role)
        {
            try
            {
                logger.Debug("Executing roleWhenNewFormInstance rest service handler.");
                string restApiPath = "RoleService/roleWhenNewFormInstance";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + role);
                var response = HandlerUtil<Role>.RestPostProcessor(restApiPath, role);
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
        ///Method Name : rolePostForm
        ///</summary>
        ///<param name = "role"></param>
        ///<returns>IEnumerable<role> </returns>
        public IEnumerable<Role> rolePostForm(Role role)
        {
            try {
                logger.Debug("Executing rolePostForm rest service handler.");
                string restApiPath = "RoleService/rolePostForm";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + role);
                var response = HandlerUtil<Role>.RestPostProcessor(restApiPath, role);
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
        ///Method Name : roleWhenWindowActivated
        ///</summary>
        ///<param name = "role"></param>
        ///<returns>IEnumerable<role> </returns> 
        public IEnumerable<Role> roleWhenWindowActivated(Role role)
        {
            try
            {
                logger.Debug("Executing roleWhenWindowActivated rest service handler.");
                string restApiPath = "RoleService/roleWhenWindowActivated";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + role);
                var response = HandlerUtil<Role>.RestPostProcessor(restApiPath, role);
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
        ///Method Name : roleWhenWindowClosed
        ///</summary>
        ///<param name = "role"></param>
        ///<returns>IEnumerable<role> </returns>
        public IEnumerable<Role> roleWhenWindowClosed(Role role)
        {
            try
            {
                logger.Debug("Executing roleWhenWindowClosed rest service handler.");
                string restApiPath = "RoleService/roleWhenWindowClosed";
                logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + role);
                var response = HandlerUtil<Role>.RestPostProcessor(restApiPath, role);
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

