using MCTR.DomainEntity;
using System.Collections.Generic;

namespace MCTR.BusinessInterface
{
    public interface IAccountBusiness
    {
        IEnumerable<RoleList> AccountDetail(IEnumerable<RoleList> role);
        IEnumerable<MCTREmployeev> UserDetail(IEnumerable<string> BEMS);
    }
}
