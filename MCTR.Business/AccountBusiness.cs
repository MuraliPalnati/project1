using MCTR.BusinessInterface;
using MCTR.DataAccess;
using MCTR.DataAccessInterface;
using MCTR.DomainEntity;
using System;
using System.Collections.Generic;

namespace MCTR.Business
{
    public class AccountBusiness :  BaseBusiness, IAccountBusiness
    {
        public IEnumerable<RoleList> AccountDetail(IEnumerable<RoleList> roleList)
        {
            IAccountRepository accountrep = new AccountRepository();

            var response = accountrep.AccountDetails(roleList);
            return response;
        }

        public IEnumerable<MCTREmployeev> UserDetail(IEnumerable<string> BEMS)
        {
            IAccountRepository accountrep = new AccountRepository();
            var response = accountrep.UserDetails(BEMS);
            return response;
        }
    }
}
