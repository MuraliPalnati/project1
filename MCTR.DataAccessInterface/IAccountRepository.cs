using MCTR.DomainEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DataAccessInterface
{
    public interface IAccountRepository
    {
        IEnumerable<RoleList> AccountDetails(IEnumerable<RoleList> role);
        IEnumerable<MCTREmployeev> UserDetails(IEnumerable<string> BEMS);
    }
}
