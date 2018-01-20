using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.Business
{
    public abstract class BaseBusiness 
    {
         private readonly ILog logger;
        public BaseBusiness()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        }
        #region IDisposable Support

        #endregion
    }
}
