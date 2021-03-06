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
    ///perstatusbl_business is the business logic implementation class which holds all
    ///business logic in it.
    ///</summary>
    public class PerStatusBIBusiness : BaseBusiness, IPerStatusBIBusiness
    {
         private readonly ILog logger;

        public PerStatusBIBusiness()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : LineItemOnLoad
        ///</summary>
        ///<param name = "lineitem"></param>
        ///<returns>IEnumerable<LbrRate></returns>
        public IEnumerable<LineItem> LineItemOnLoad(IEnumerable<LineItem> lineitem)
        {
            try
            {
                logger.Info(" Executing MCTR.Bussiness.PerStatusBIBusiness.LineItemOnLoad() with request " + lineitem);
                IPerStatusBlRepository PerStatusRepository = new PerStatusBIRepository();
                var response = PerStatusRepository.LineItemOnLoad(lineitem);
                logger.Info("Response received from MCTR.Bussiness.PerStatusBIBusiness.LineItemOnLoad() : " + response);
                return response;
            }
            catch(Exception e)
            {
                logger.Error("Error from MCTR.Bussiness.PerStatusBIBusiness.LineItemOnLoad():" + e.Message);
                throw;
            }

        }
        ///*************************************************************
        ///<summary>
        ///Method Name : perStatusBlWhenWindowClosed
        ///</summary>
        ///<param name = "lineitem"></param>
        ///<returns>IEnumerable<LbrRate></returns>
        public IEnumerable<LineItem> perStatusBlWhenWindowClosed(IEnumerable<LineItem> lineitem)
        {
            try
            {
                logger.Info(" Executing MCTR.Bussiness.PerStatusBIBusiness.perStatusBlWhenWindowCloseds() with request " + lineitem);
                IPerStatusBlRepository PerStatusRepository = new PerStatusBIRepository();
                var response = PerStatusRepository.perStatusBlWhenWindowClosed(lineitem);
                logger.Info("Response received from MCTR.Bussiness.PerStatusBIBusiness.perStatusBlWhenWindowClosed() : " + response);
                return response;
            }
            catch(Exception e)
            {
                logger.Error("Error from MCTR.Bussiness.PerStatusBIBusiness.perStatusBlWhenWindowCloseds():" + e.Message);
                throw;

            }
           
        }


    }
}