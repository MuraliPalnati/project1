using MCTR.DomainEntity;
using System.Linq;
using System.Security.Principal;

namespace MCTR.Web.Security
{
    public class CustomPrincipal:IPrincipal
    {
        private readonly RoleList rolelist;
        public CustomPrincipal(RoleList rolelist)
        {
            this.rolelist = rolelist;
           this.Identity = new GenericIdentity(rolelist.bems);
        }
        public IIdentity Identity { get; set; }

        public bool IsInRole(string role)
        {
            var roles = role.Split(new char[] { ',' });
            return roles.Any(r => this.rolelist.bems_admin=="Y");
        }
    }
}