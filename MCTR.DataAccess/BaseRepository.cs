using log4net;
using MCTR.DataAccessInterface;
using MCTR.DataEntity;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace MCTR.DataAccess
{
    public abstract class BaseRepository :IBaseRepository, IDisposable
    {
        public static string MCTRConnectionString = ConnectionUtil.GetConnectionString();
        public MCTRDbEntities entities = new MCTRDbEntities(MCTRConnectionString);        
        private readonly ILog logger;
        public BaseRepository()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        }
        #region IDisposable Support
        private readonly bool disposedValue = false; // To detect redundant calls

        void IDisposable.Dispose()
        {
            entities.Dispose();
        }           
        #endregion
    }
}
