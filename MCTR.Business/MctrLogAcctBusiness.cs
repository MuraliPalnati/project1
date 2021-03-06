///*************************************************************************
///
/// BOEING CONFIDENTIAL
/// ___________________
///
///  BOEING is a trademark of Boeing Management Company.
///
///  Copyright ? 2016 Boeing. All rights reserved.
///
/// NOTICE:  All information contained herein is, and remains
/// the property of Boeing and its suppliers, if any.
/// The intellectual and technical concepts contained
/// herein are proprietary to Boeing and its suppliers and may be
/// covered by U.S. and Foreign Patents, patents in process,
/// and are protected by trade secret or copyright law.
/// Dissemination of this information or reproduction of this material
/// is strictly forbidden unless prior written permission is obtained
/// from Boeing.
///

///************************************************************************
/// Author           : Generated by ATMA ?
/// Revision History :

using System;
using System.Collections.Generic;
using log4net;
using MCTR.DomainEntity;
using MCTR.BusinessInterface;
using MCTR.DataAccessInterface;
using MCTR.DataAccess;

namespace MCTR.Business
{

    ///*********************************************************************
    ///<summary>
    ///mctrlogacct_business is the business logic implementation class which holds all
    ///business logic in it.
    ///</summary>
    public class MctrLogAcctBusiness : BaseBusiness, IMctrLogAcctBusiness
    {
         private readonly ILog logger;
        private IMctrLogAcctRepository mctrlogAcct = new MctrLogAcctRepository();



        public MctrLogAcctBusiness()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        }


        ///*************************************************************
        ///<summary>
        ///Method Name : mctrHeaderMctrHeaderOnLoad
        ///</summary>
        ///<param name = "mctrLogAcct"></param>
        ///<returns>IEnumerable<MctrLogAcct> </returns>
        public IEnumerable<MctrLogAcct> mctrHeaderMctrHeaderOnLoad(IEnumerable<MctrLogAcct> mctrLogAcct)
        {
            try
            {
                logger.Debug("Executing MCTR.Business.MctrLogAcctBusiness.mctrHeaderMctrHeaderOnLoad with input : " + mctrLogAcct);
                var response = mctrlogAcct.mctrHeaderMctrHeaderOnLoad(mctrLogAcct);
                logger.Debug("Response recieved from MCTR.Business.MctrLogAcctBusiness.mctrHeaderMctrHeaderOnLoad :" + response);
                return response;
            }
            catch (Exception ex)
            {
                logger.Debug("Exception Occured at MCTR.Business.MctrLogAcctBusiness.mctrHeaderMctrHeaderOnLoad :" + ex.Message);
                throw;
            }

        }

        ///*************************************************************
        ///<summary>
        ///Method Name : validateBems
        ///</summary>
        ///<param name = "mctrLogAcct"></param>
        ///<returns>IEnumerable<MctrLogAcct> </returns>
        public IEnumerable<MctrLogAcct> validateBems(IEnumerable<MctrLogAcct> mctrLogAcct)
        {
            try
            {
                logger.Debug("Executing MCTR.Business.MctrLogAcctBusiness.validateBems with input : " + mctrLogAcct);
                var response = mctrlogAcct.validateBems(mctrLogAcct);
                logger.Debug("Response recieved from MCTR.Business.MctrLogAcctBusiness.validateBems :" + response);
                return response;
            }
            catch (Exception ex)
            {
                logger.Debug("Exception Occured at MCTR.Business.MctrLogAcctBusiness.validateBems :" + ex.Message);
                throw;
            }

        }
        ///*************************************************************
        ///<summary>
        ///Method Name : mctrLogMctrLogOnLoad
        ///</summary>
        ///<param name = "mctrLogAcct"></param>
        ///<returns>IEnumerable<MctrLogAcct> </returns>
        public IEnumerable<MctrLogAcct> mctrLogMctrLogOnLoad()
        {
            try
            {
                logger.Debug("Executing MCTR.Business.MctrLogAcctBusiness.mctrLogMctrLogOnLoad");
                var response = mctrlogAcct.mctrLogMctrLogOnLoad();
                logger.Debug("Response recieved from MCTR.Business.MctrLogAcctBusiness.mctrLogMctrLogOnLoad :" + response);
                return response;
            }
            catch (Exception ex)
            {
                logger.Debug("Exception Occured at MCTR.Business.MctrLogAcctBusiness.mctrLogMctrLogOnLoad :" + ex.Message);
                throw;
            }

        }
        ///*************************************************************
        ///<summary>
        ///Method Name : mctrLogOnInsert
        ///</summary>
        ///<param name = "mctrLogAcct"></param>
        ///<returns>IEnumerable<MctrLogAcct> </returns>
        public IEnumerable<MctrLogAcct> mctrLogOnInsert(IEnumerable<MctrLogAcct> mctrLogAcct)
        {
            try
            {
                logger.Debug("Executing MCTR.Business.MctrLogAcctBusiness.mctrLogOnInsert with input :" + mctrLogAcct);
                var response = mctrlogAcct.mctrLogOnInsert(mctrLogAcct);
                logger.Debug("Response recieved from MCTR.Business.MctrLogAcctBusiness.mctrLogOnInsert :" + response);
                return response;
            }
            catch (Exception ex)
            {
                logger.Debug("Exception Occured at MCTR.Business.MctrLogAcctBusiness.mctrLogOnInsert :" + ex.Message);
                throw;
            }
        }

        public IEnumerable<MctrLogAcct> mctrLogWhenNewRecordInstance(IEnumerable<MctrLogAcct> mctrLogAcct)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<MctrLogAcct> mctrLogAcctWhenWindowClosed(IEnumerable<MctrLogAcct> mctrLogAcct)
        {
            throw new NotImplementedException();
        }
    }
}