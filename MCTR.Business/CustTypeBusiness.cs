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
using MCTR.BusinessInterface;
using MCTR.DataAccess;
using MCTR.DomainEntity;
using MCTR.DataAccessInterface;
using System;
using log4net;

namespace MCTR.Business
{
    public class CustTypeBusiness : BaseBusiness, ICustTypeBusiness
    {
         public readonly ILog logger;
        ///<summary>
        ///CustTypeBusiness is the business logic implementation class which holds all
        ///business logic in it.
        ///</summary>
        public CustTypeBusiness()
        {
        }

        public void initialize()
        {
            //TODO: initialize input from controller
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : custTypeWhenNewFormInstance
        ///</summary>
        ///<param name = "custType"></param>
        ///<returns>IEnumerable<MctrIncrRates> </custType>

        public IEnumerable<CustType> custTypeWhenNewFormInstance(IEnumerable<CustType> custType)
        {
            try
            {
                ICustTypeRepository custTypeRepository = new CustTypeRepository();
                return custTypeRepository.custTypeWhenNewFormInstance(custType);
            }
            catch(Exception e)
            {
                logger.Error("Error from MCTR.Business.CustTypeBusiness.custTypeWhenNewFormInstance" + e.Message);
                throw;
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : custTypeWhenWindowClosed
        ///</summary>
        ///<param name = "custType"></param>
        ///<returns>IEnumerable<CustTypes> </returns>
        public IEnumerable<CustType> custTypeWhenWindowClosed(IEnumerable<CustType> custType)
        {
            try
            {
                ICustTypeRepository custTypeRepository = new CustTypeRepository();
                return custTypeRepository.custTypeWhenWindowClosed(custType);
            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.Business.CustTypeBusiness.custTypeWhenWindowClosed" + e.Message);
                throw;
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : custtypeGetAll
        ///</summary>
        public IEnumerable<CustType> custtypeGetAll()
        {
            try
            {
                ICustTypeRepository custTypeRepository = new CustTypeRepository();
                return custTypeRepository.custtypeGetAll();
            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.Business.CustTypeBusiness.custtypeGetAll" + e.Message);
                throw;
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : EditCustType
        ///</summary>
        ///<param name = "CustTypes"></param>
        ///<returns>IEnumerable<CustTypes> </returns>

        public IEnumerable<CustType> EditCustType(IEnumerable<CustType> CustTypes)

        {
            try {
                ICustTypeRepository custTypeRepository = new CustTypeRepository();
                return custTypeRepository.EditCustType(CustTypes);
            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.Business.CustTypeBusiness.EditCustType" + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : DeleteCustType
        ///</summary>
        ///<param name = "CustTypes"></param>
        ///<returns>IEnumerable<CustTypes> </returns>
        public IEnumerable<CustType> DeleteCustType(IEnumerable<CustType> CustTypes)

        {
            try
            {
                ICustTypeRepository custTypeRepository = new CustTypeRepository();
                return custTypeRepository.DeleteCustType(CustTypes);

            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.Business.CustTypeBusiness.DeleteCustType" + e.Message);
                throw;
            }
        }
        }
   }