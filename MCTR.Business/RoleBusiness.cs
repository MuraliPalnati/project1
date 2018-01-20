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
using MCTR.BusinessInterface;
using MCTR.DataAccess;
using MCTR.DataAccessInterface;
using MCTR.DataEntity;
using MCTR.DomainEntity;
using System;
using System.Collections.Generic;

namespace MCTR.Business
{
    ///*********************************************************************
    ///<summary>
    ///RoleBusiness is the business logic implementation class which holds all
    ///business logic in it.
    ///</summary>
    public class RoleBusiness : BaseBusiness, IRoleBusiness
    {
        private readonly ILog logger = null;
        public RoleBusiness()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        }

        public void initialize()
        {
           
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : rolePostQuery
        ///</summary>
        ///<param name = "role"></param>
        ///<returns>IEnumerable<Role></returns>
        public IEnumerable<RoleList> roleOnLoad(IEnumerable<RoleList> roleList)
        {
            try
            {
                logger.Debug("Executing MCTR.Business.RoleBusiness.roleOnLoad() with input" + roleList);
                IRoleRepository roleRep = new RoleRepository();
                var result = roleRep.roleOnLoad(roleList);
                logger.Debug("Response received from MCTR.Business.RoleBusiness.roleOnLoad() : " + roleList);
                return result;
            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.Business.RoleBusiness.roleOnLoad():" + e.Message);
                throw;
            }
        }

         public IEnumerable<RoleList> Save(IEnumerable<RoleList> roleList)
        {
            try
            {
                logger.Debug("Executing MCTR.Business.RoleBusiness.roleOnLoad() with input" + roleList);
                IRoleRepository roleRep = new RoleRepository();
                var result = roleRep.roleUpdate(roleList);
                logger.Debug("Response received from MCTR.Business.RoleBusiness.roleOnLoad() : " + roleList);
                return result;
            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.Business.RoleBusiness.roleOnLoad():" + e.Message);
                throw;
            }
        }


        ///*************************************************************
        ///<summary>
        ///Method Name : rolePostQuery
        ///</summary>
        ///<param name = "role"></param>
        ///<returns>IEnumerable<Role></returns>
        public IEnumerable<Role> rolePostQuery(IEnumerable<Role> role)
        {
            try
            {
                logger.Debug("Executing MCTR.Business.RoleBusiness.rolePostQuery() with input" + role);
                IRoleRepository roleRep = new RoleRepository();
                var result = roleRep.rolePostQuery(role);
                logger.Debug("Response received from MCTR.Business.RoleBusiness.rolePostQuery() : " + role);
                return result;
            }
            catch (Exception e )
            {
                logger.Error("Error from MCTR.Business.RoleBusiness.rolePostQuery():" + e.Message);
                throw;
            }
        }

        

       

        
        ///*************************************************************
        ///<summary>
        ///Method Name : roleWhenNewFormInstance
        ///</summary>
        ///<param name = "role"></param>
        ///<returns>IEnumerable<Role></returns>
        public IEnumerable<Role> roleWhenNewFormInstance(IEnumerable<Role> role)
        {
            try
            {
                logger.Debug("Executing MCTR.Business.RoleBusiness.roleWhenNewFormInstance() with input" + role);
                IRoleRepository roleRep = new RoleRepository();
                var response = roleRep.roleWhenNewFormInstance(role);
                logger.Debug("Response received from MCTR.Business.RoleBusiness.roleWhenNewFormInstance() : " + response);
                return response;
            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.Business.RoleBusiness.roleWhenNewFormInstance():" + e.Message);
                throw;
            }
        }
    }
}