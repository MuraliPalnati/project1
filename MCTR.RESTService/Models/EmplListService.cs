using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using log4net;

using MCTR.DomainEntites;
using MCTR.BusinessInterface;
using MCTR.Business;

namespace MCTR.RESTService.Controllers
{

  public class EmplListController : ApiController
  {
   	
    private ILog logger = null;
    
    public EmplListController()
    {
      logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
    }  
    
     
    [HttpPost]
    [ActionName("emplListbutRoleWhenButtonPressed")]
    public HttpResponseMessage emplListbutRoleWhenButtonPressed([FromBody]IEnumerable<RoleListNewuser> roleListNewuser){
      logger.info("Executing Rest API : emplListbutRoleWhenButtonPressed() with request : " + roleListNewuser);
      if(roleListNewuser != null{
        IRoleListNewuserBusiness roleListNewuserBusiness = new RoleListNewuserBusiness();
        var response = roleListNewuserBusiness.emplListbutRoleWhenButtonPressed(roleListNewuser);
        logger.info("Response received from roleListNewuserBusiness.emplListbutRoleWhenButtonPressed() : " + response);
        return response;
      }
      return null;
    }
        
    [HttpPost]
    [ActionName("emplListbutFindWhenButtonPressed")]
    public HttpResponseMessage emplListbutFindWhenButtonPressed([FromBody]IEnumerable<RoleListNewuser> roleListNewuser){
      logger.info("Executing Rest API : emplListbutFindWhenButtonPressed() with request : " + roleListNewuser);
      if(roleListNewuser != null{
        IRoleListNewuserBusiness roleListNewuserBusiness = new RoleListNewuserBusiness();
        var response = roleListNewuserBusiness.emplListbutFindWhenButtonPressed(roleListNewuser);
        logger.info("Response received from roleListNewuserBusiness.emplListbutFindWhenButtonPressed() : " + response);
        return response;
      }
      return null;
    }
        
    [HttpPost]
    [ActionName("roleListNewuserWhenNewFormInstance")]
    public HttpResponseMessage roleListNewuserWhenNewFormInstance([FromBody]IEnumerable<RoleListNewuser> roleListNewuser){
      logger.info("Executing Rest API : roleListNewuserWhenNewFormInstance() with request : " + roleListNewuser);
      if(roleListNewuser != null{
        IRoleListNewuserBusiness roleListNewuserBusiness = new RoleListNewuserBusiness();
        var response = roleListNewuserBusiness.roleListNewuserWhenNewFormInstance(roleListNewuser);
        logger.info("Response received from roleListNewuserBusiness.roleListNewuserWhenNewFormInstance() : " + response);
        return response;
      }
      return null;
    }
        
    [HttpPost]
    [ActionName("roleListNewuserWhenWindowClosed")]
    public HttpResponseMessage roleListNewuserWhenWindowClosed([FromBody]IEnumerable<RoleListNewuser> roleListNewuser){
      logger.info("Executing Rest API : roleListNewuserWhenWindowClosed() with request : " + roleListNewuser);
      if(roleListNewuser != null{
        IRoleListNewuserBusiness roleListNewuserBusiness = new RoleListNewuserBusiness();
        var response = roleListNewuserBusiness.roleListNewuserWhenWindowClosed(roleListNewuser);
        logger.info("Response received from roleListNewuserBusiness.roleListNewuserWhenWindowClosed() : " + response);
        return response;
      }
      return null;
    }
        
    
	}

}

