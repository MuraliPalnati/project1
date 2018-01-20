using MCTR.Web.Models;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Routing;


namespace MCTR.Web.Security
{
    public class CustomAuthorizeAttribute : AuthorizeAttribute
    {
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            if (string.IsNullOrEmpty(SessionPerister.BEMSID))
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { Controller = "Account", Action = "Logout" }));
            else
            {
                RoleModel rm = new RoleModel();
                CustomPrincipal mp = new CustomPrincipal(rm.find(SessionPerister.BEMSID));
                if (!mp.Identity.IsAuthenticated)
                {
                    filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { Controller = "Home", Action = "Home" }));
                }
            }
        }
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                filterContext.HttpContext.Response.StatusCode = 401;
                filterContext.HttpContext.Response.End();
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { Controller = "Account", Action = "Logout" }));
            }

            base.HandleUnauthorizedRequest(filterContext);
        }
    }
}