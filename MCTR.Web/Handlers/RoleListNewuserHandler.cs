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
using System.Linq;
using log4net;
using MCTR.DomainEntity;

namespace MCTR.Web.Handlers
{
    public class RoleListNewuserHandler
    {
         private readonly ILog logger;
        public RoleListNewuserHandler()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        }
        public IEnumerable<RoleListNewuser> empllistonload(RoleListNewuser emplist)
        {
           logger.Debug("Executing emplListbutRoleWhenButtonPressed rest service handler.");
           string restApiPath = "RoleListNewuserService/empllistonload";
           logger.Info("Invoking Rest API : " + restApiPath);
           var response = HandlerUtil<RoleListNewuser>.RestPostProcessor(restApiPath, emplist).ToList<RoleListNewuser>();
           logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
           return response;
        }
        public IEnumerable<RoleListNewuser> emplListbutFindWhenButtonPressed(RoleListNewuser roleListNewuser)
        {

          logger.Debug("Executing emplListbutFindWhenButtonPressed rest service handler.");
          string restApiPath = "RoleListNewuserService/emplListbutFindWhenButtonPressed";
          logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + roleListNewuser);
          var response = HandlerUtil<RoleListNewuser>.RestPostProcessor(restApiPath, roleListNewuser);
          logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
          return response; 
        }
        
        public IEnumerable<RoleListNewuser> roleListNewuserWhenNewFormInstance(RoleListNewuser roleListNewuser)
        {
          logger.Debug("Executing roleListNewuserWhenNewFormInstance rest service handler.");
          string restApiPath = "RoleListNewuser/roleListNewuserWhenNewFormInstance";
          logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + roleListNewuser);
          var response = HandlerUtil<RoleListNewuser>.RestPostProcessor(restApiPath, roleListNewuser);
          logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
          return response; 
        }
  }

}
