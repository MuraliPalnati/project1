///*************************************************************************
///
/// BOEING CONFIDENTIAL
/// ___________________
///
///  BOEING is a trademark of Boeing Management Company.
///
///  Copyright � 2016 Boeing. All rights reserved.
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
/// Author           : Generated by ATMA �
/// Revision History :

using System.Collections.Generic;
using MCTR.DomainEntity;
using MCTR.BusinessInterface;
using MCTR.DataAccessInterface;
using MCTR.DataAccess;
using log4net;
using System;

namespace MCTR.Business
///*********************************************************************
///<summary>
///ttdcheckbl_business is the business logic implementation class which holds all
///business logic in it.
///</summary>
{
    public class TtdcheckblBusiness : BaseBusiness, ITtdCheckBlBusiness
    {
         private readonly ILog logger;

        public TtdcheckblBusiness()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : ttdCheckTtdCheckOnLoad
        ///</summary>
        ///<param name = "TtdCheckBl"></param>
        ///<returns>IEnumerable<PerCheckBl> </returns>
        public IEnumerable<TtdCheckBl> ttdCheckTtdCheckOnLoad(IEnumerable<TtdCheckBl> ttdCheckBl)
        {
            try
            {
                logger.Info("Executing Business: ttdCheckTtdCheckOnLoad() with request : " + ttdCheckBl);
                ITtdCheckBlRepository TtdCheckBlRepository = new TtdCheckBlRepository();
                var response = TtdCheckBlRepository.ttdCheckTtdCheckOnLoad(ttdCheckBl);
                logger.Info("Response received from TtdCheckBlRepository.ttdCheckTtdCheckOnLoad() : " + response);
                return response;
            }
            catch (Exception e)
            {
                logger.Info("Response received from JrnlWeekRepository.jrnlWeekJrnlWeekOnLoad() : " + e.Message);

                throw;
            }
        }


        ///*************************************************************
        ///<summary>
        ///Method Name : ttdCheckPostQuery
        ///</summary>
        ///<param name = "TtdCheckBl"></param>
        ///<returns>IEnumerable<PerCheckBl> </returns>
        public IEnumerable<TtdCheckBl> ttdCheckPostQuery(IEnumerable<TtdCheckBl> ttdCheckBl)
        {
            try
            {
                logger.Info("Executing Business: ttdCheckPostQuery() with request : " + ttdCheckBl);
                ITtdCheckBlRepository TtdCheckBlRepository = new TtdCheckBlRepository();
                var response = TtdCheckBlRepository.ttdCheckPostQuery(ttdCheckBl);
                logger.Info("Response received from TtdCheckBlRepository.ttdCheckPostQuery() : " + response);
                return response;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        ///**************************************************************
        ///<summary>
        ///Method Name : ttdCheckBlWhenNewFormInstance
        ///</summary>
        ///<param name = "TtdCheckBl"></param>
        ///<returns>IEnumerable<PerCheckBl> </returns>
        public IEnumerable<TtdCheckBl> ttdCheckBlWhenNewFormInstance(IEnumerable<TtdCheckBl> ttdCheckBl)
        {
            try
            {
                logger.Info("Executing Business: ttdCheckBlWhenNewFormInstance() with request : " + ttdCheckBl);
                ITtdCheckBlRepository TtdCheckBlRepository = new TtdCheckBlRepository();
                var response = TtdCheckBlRepository.ttdCheckBlWhenNewFormInstance(ttdCheckBl);
                logger.Info("Response received from TtdCheckBlRepository.ttdCheckPostQuery() : " + response);
                return response;
            }
            catch (Exception e)
            {
                logger.Info("Response received from JrnlWeekRepository.jrnlWeekJrnlWeekOnLoad() : " + e.Message);

                throw;
            }
        }
        ///***************************************************************
        ///<summary>
        ///Method Name : ttdCheckBlWhenWindowClosed
        ///</summary>
        ///<param name = "TtdCheckBl"></param>
        ///<returns>IEnumerable<PerCheckBl> </returns>
        public IEnumerable<TtdCheckBl> ttdCheckBlWhenWindowClosed(IEnumerable<TtdCheckBl> ttdCheckBl)
        {
            try
            {
                logger.Info("Executing Business: ttdCheckBlWhenWindowClosed() with request : " + ttdCheckBl);
                ITtdCheckBlRepository TtdCheckBlRepository = new TtdCheckBlRepository();
                var response = TtdCheckBlRepository.ttdCheckBlWhenWindowClosed(ttdCheckBl);
                logger.Info("Response received from TtdCheckBlRepository.ttdCheckBlWhenWindowClosed() : " + response);
                return response;
            }
            catch (Exception e)
            {
                logger.Info("Response received from JrnlWeekRepository.jrnlWeekJrnlWeekOnLoad() : " + e.Message);

                throw;
            }
        }
    }
}