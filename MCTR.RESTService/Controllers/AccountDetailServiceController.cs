using MCTR.Business;
using MCTR.BusinessInterface;
using MCTR.DomainEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MCTR.RESTService.Controllers
{
    public class AccountDetailServiceController : ApiController
    {
        [HttpPost]
        [ActionName("AccountDetail")]
        public HttpResponseMessage AccountDetail([FromBody]IEnumerable<RoleList> roleList)
        {
            try
            {
                if (roleList != null)
                {
                    IAccountBusiness accountBusiness = new AccountBusiness();
                    var response = accountBusiness.AccountDetail(roleList);
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                }
            }
            catch (Exception e)
            {

                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
            return null;
        }
        [HttpPost]
        [ActionName("UserDetail")]
        public HttpResponseMessage UserDetail([FromBody]IEnumerable<string> BEMS)
        {
            try
            {

                IAccountBusiness accountBusiness = new AccountBusiness();
                var response = accountBusiness.UserDetail(BEMS);
                return Request.CreateResponse(HttpStatusCode.OK, response);

            }
            catch (Exception e)
            {

                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
        }
    }
}

