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
using System.Collections.Generic;
using MCTR.DomainEntity;

namespace MCTR.DataAccessInterface
{

    ///*********************************************************************
    ///<summary>
    ///ICustTypeRepository is an data access interface for the LbrRateCyRepository   
    ///which facilitates the dependency injection.
    ///</summary>
    public interface ICustTypeRepository
    {

        ///*************************************************************
        ///<summary>
        ///Method Name : DeleteCustType
        ///</summary>
        ///<param name = "CustTypes"></param>
        ///<returns>IEnumerable<CustTypes> </returns>
        IEnumerable<CustType> DeleteCustType(IEnumerable<CustType> CustTypes);
        ///*************************************************************
        ///<summary>
        ///Method Name : EditCustType
        ///</summary>
        ///<param name = "CustTypes"></param>
        ///<returns>IEnumerable<CustTypes> </returns>
        IEnumerable<CustType> EditCustType(IEnumerable<CustType> CustTypes);
        ///*************************************************************
        ///<summary>
        ///Method Name : custtypeGetAll
        ///</summary>
        ///<param name = "CustTypes"></param>
        ///<returns>IEnumerable<CustTypes> </returns>
        IEnumerable<CustType> custtypeGetAll();
        ///*************************************************************
        ///<summary>
        ///Method Name : custTypeWhenNewFormInstance
        ///</summary>
        ///<param name = "CustTypes"></param>
        ///<returns>IEnumerable<CustTypes> </returns>
        IEnumerable<CustType> custTypeWhenNewFormInstance(IEnumerable<CustType> CustTypes);
        ///*************************************************************
        ///<summary>
        ///Method Name : custTypeWhenWindowClosed
        ///</summary>
        ///<param name = "CustTypes"></param>
        ///<returns>IEnumerable<CustTypes> </returns>
        IEnumerable<CustType> custTypeWhenWindowClosed(IEnumerable<CustType> CustTypes);
    }
}