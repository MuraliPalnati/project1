﻿///*************************************************************************
///
/// BOEING CONFIDENTIAL
/// ___________________
///
///  BOEING is a trademark of Boeing Management Company.
///
///  Copyright © 2016 Boeing. All rights reserved.
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
/// Author           : Generated by ATMA ®
/// Revision History :

using MCTR.BusinessInterface;
using System.Collections.Generic;
using MCTR.DomainEntity;
using MCTR.DataAccessInterface;
using HCL.ATMA.DataAccess;
using log4net;


namespace MCTR.Business
{
    public class MCTRJobStatusBusiness : BaseBusiness, IMCTRJobStatusBusiness
    {
         private readonly ILog logger= LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private List<MCTRJobStatus> resultList = new List<MCTRJobStatus>();
        public IEnumerable<MCTRJobStatus> MCTRJobStatusOnInsert(IEnumerable<MCTRJobStatus> MCTRJobStatus)
        {
            logger.Info("Executing DataAccess : MCTRJobStatusOnInsert() with request : " + MCTRJobStatus);
            IJobRepository jobStatusRepository = new JobStatusRepository();
            resultList = jobStatusRepository.MCTRJobStatusOnInsert(MCTRJobStatus) as List<MCTRJobStatus>;
            logger.Info("Response received from MCTRJobStatusBusiness.MCTRJobStatusOnInsert() : " + resultList);
            return resultList;
        }

        public IEnumerable<MCTRJobStatus> GetData()
        {
            logger.Info("Executing DataAccess : GetData() ");
            IJobRepository jobStatusRepository = new JobStatusRepository();
            resultList = jobStatusRepository.GetData() as List<MCTRJobStatus>;
            logger.Info("Response received from MCTRJobStatusBusiness.GetData() : " + resultList);
            return resultList;
        }


    }
}


