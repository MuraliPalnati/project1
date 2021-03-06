///*************************************************************************
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

using System.Collections.Generic;
using log4net;
using MCTR.DomainEntity;
using MCTR.BusinessInterface;
using MCTR.DataAccess;
using MCTR.DataAccessInterface;
using System;
using System.Linq;

namespace MCTR.Business
{
    public class CreateMctrLovBusiness : BaseBusiness, ICreateMctrLovBusiness
    {
         private readonly ILog logger= LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        private List<CreateMctrLov> resultList = new List<CreateMctrLov>();
        private readonly ICreateMctrLovRepository createMctrLovRepository = new CreateMctrLovRepository();

        public IEnumerable<CreateMctrLov> getRgYearLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgYearLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgYearLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgYearLOV() : " + resultList);
            return resultList;
        }

        public IEnumerable<CreateMctrLov> getRgReasonLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgReasonLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgReasonLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.MctrLineItemOnload() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgApplLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgApplLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgApplLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgApplLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgSuperLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgSuperLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgSuperLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgSuperLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgApprSuperLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgSuperLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgApprSuperLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgSuperLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgFinCtlLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgSuperLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgFinCtlLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgSuperLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgApprFinCtlLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgSuperLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgApprFinCtlLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgSuperLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgAcctLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgSuperLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgAcctLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgSuperLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgApprAcctLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgSuperLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgApprAcctLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgSuperLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgLbrAcctLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgSuperLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgLbrAcctLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgSuperLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgApprLbrAcctLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgSuperLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgApprLbrAcctLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgSuperLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgMatlAcctLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgSuperLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgMatlAcctLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgSuperLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgApprMatlAcctLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgSuperLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgApprMatlAcctLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgSuperLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgCostAcctLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgSuperLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgCostAcctLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgSuperLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgApprCostAcctLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgSuperLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgApprCostAcctLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgSuperLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgSrAcctLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgSrAcctLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgSrAcctLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgSrAcctLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgApprSrAcctLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgApprSrAcctLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgApprSrAcctLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgApprSrAcctLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgLiBemsLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgLiBemsLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgLiBemsLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgLiBemsLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgRejectLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgRejectLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgRejectLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgRejectLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgProjFromLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgProjFromLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgProjFromLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgProjFromLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgProjFromPromptLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgProjFromPromptLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgProjFromPromptLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgProjFromPromptLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgTransFromLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgTransFromLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgTransFromLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgTransFromLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgHomeDeptFromLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgHomeDeptFromLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgHomeDeptFromLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgHomeDeptFromLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgHomeDeptLocFromLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgHomeDeptLocFromLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgHomeDeptLocFromLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgHomeDeptLocFromLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgListHomeDeptFromLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgListHomeDeptFromLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgListHomeDeptFromLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgListHomeDeptFromLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgHomeLocFromLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgHomeLocFromLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgHomeLocFromLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgHomeLocFromLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgListHomeLocFromLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgListHomeLocFromLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgListHomeLocFromLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgHomeLocFromLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgClassCodeFromLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgClassCodeFromLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgClassCodeFromLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgClassCodeFromLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgListClassCodeFromLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgListClassCodeFromLOV() with request : " + createMctrLov);
            resultList = createMctrLovRepository.getRgListClassCodeFromLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgListClassCodeFromLOV() : " + resultList);
            return resultList;

        }
        public IEnumerable<CreateMctrLov> getRgWorkDeptFromLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgWorkDeptFromLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgWorkDeptFromLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgWorkDeptFromLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgWorkDeptLocFromLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgWorkDeptLocFromLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgWorkDeptLocFromLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgWorkDeptLocFromLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgListWorkDeptFromLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgListWorkDeptFromLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgListWorkDeptFromLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgListWorkDeptFromLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgWorkLocFromLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgWorkLocFromLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgWorkLocFromLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgWorkLocFromLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgListWorkLocFromLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgListWorkLocFromLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgListWorkLocFromLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgListWorkLocFromLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgRscFromLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgRscFromLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgRscFromLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgRscFromLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgWpdFromLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgWpdFromLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgWpdFromLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgWpdFromLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgBulkFromLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgBulkFromLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgBulkFromLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgBulkFromLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgCecEpFromLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgCecEpFromLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgCecEpFromLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgCecEpFromLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgListCecEpFromLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgListCecEpFromLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgListCecEpFromLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgListCecEpFromLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgProjToLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgProjToLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgProjToLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgProjToLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgProjToPromptLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgProjToPromptLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgProjToPromptLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgProjToPromptLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgHomeDeptToLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgHomeDeptToLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgHomeDeptToLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgHomeDeptToLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgHomeDeptLocToLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgHomeDeptLocToLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgHomeDeptLocToLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgHomeDeptLocToLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgListHomeDeptToLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgListHomeDeptToLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgListHomeDeptToLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgListHomeDeptToLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgHomeLocToLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgHomeLocToLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgHomeLocToLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgHomeLocToLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgListHomeLocToLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgListHomeLocToLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgListHomeLocToLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgListHomeLocToLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgClassCodeToLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgClassCodeToLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgClassCodeToLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgClassCodeToLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgListClassCodeToLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgListClassCodeToLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgListClassCodeToLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgListClassCodeToLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgWorkDeptToLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgWorkDeptToLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgWorkDeptToLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgWorkDeptToLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgWorkDeptLocToLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgWorkDeptLocToLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgWorkDeptLocToLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgWorkDeptLocToLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgListWorkDeptToLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgListWorkDeptToLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgListWorkDeptToLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgListWorkDeptToLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgWorkLocToLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgWorkLocToLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgWorkLocToLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgWorkLocToLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgListWorkLocToLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgListWorkLocToLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgListWorkLocToLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgListWorkLocToLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgRscToLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgRscToLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgRscToLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgRscToLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgWpdToLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgWpdToLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgWpdToLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgRscToLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgBulkToLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgBulkToLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgBulkToLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgBulkToLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgCecEpToLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgCecEpToLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgCecEpToLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgCecEpToLOV() : " + resultList);
            return resultList;

        }

        public IEnumerable<CreateMctrLov> getRgListCecEpToLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgListCecEpToLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgListCecEpToLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgListCecEpToLOV() : " + resultList);
            return resultList;

        }
        public IEnumerable<CreateMctrLov> getRgAffiliateFromLOV(IEnumerable<CreateMctrLov> createMctrLov)
        {
            logger.Info("Executing DataAccess : getRgAffiliateFromLOV() with request : " + createMctrLov);

            resultList = createMctrLovRepository.getRgAffiliateFromLOV(createMctrLov).ToList();
            logger.Info("Response received from MctrCreateFormRepository.getRgAffiliateFromLOV() : " + resultList);
            return resultList;

        }



    }
}
