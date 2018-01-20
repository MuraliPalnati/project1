using MCTR.DomainEntity;
using System.Collections.Generic;
using System.Linq;
using MCTR.Web.Handlers;
using MCTR.Web.Security;

namespace MCTR.Web.Models
{
    public class RoleModel
    {
        private readonly List<RoleList> listAccounts = new List<RoleList>();
        public RoleModel()
        {
          
        }

        public RoleList find(string BEMSID)
        {
            RoleList roleList = new RoleList();
            roleList.bems = SessionPerister.BEMSID;
            listAccounts.Add(login(roleList));
            return listAccounts.FirstOrDefault(ac => ac.bems.Equals(BEMSID, System.StringComparison.CurrentCulture));
        }
        public RoleList login(RoleList rolelist)
        {
            if (!string.IsNullOrEmpty(rolelist.bems))
            {
                AccountHandler accountHandler = new AccountHandler();
                var response = accountHandler.AccountDeatils(rolelist).ToList<RoleList>();
                return response.First();
            }
            else
                return null;
        }
    }
}