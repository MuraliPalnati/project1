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

namespace MCTR.BusinessInterface
///*********************************************************************
///<summary>
///IStatusBusiness is an interface for the StatusBusiness   
///which facilitates the dependency injection.
///</summary>
{
    public interface IStatusBusiness
    {
        ///*************************************************************
        ///<summary>
        ///Method Name : statusWhenNewFormInstance
        ///</summary>   
        ///<returns>IEnumerable<Status> </returns>
        IEnumerable<Status> statusWhenNewFormInstance();
        ///*************************************************************
        ///<summary>
        ///Method Name : CreateStatus
        ///</summary>
        ///<param name = "Status"></param>
        ///<returns>IEnumerable<Status> </returns>
        IEnumerable<Status> CreateStatus(IEnumerable<Status> Status);
        ///*************************************************************
        ///<summary>
        ///Method Name : DeleteStatus
        ///</summary>
        ///<param name = "Status"></param>
        ///<returns>IEnumerable<Status> </returns>
        IEnumerable<Status> DeleteStatus(IEnumerable<Status> Status);
        ///*************************************************************
        ///<summary>
        ///Method Name : EditStatus
        ///</summary>
        ///<param name = "Status"></param>
        ///<returns>IEnumerable<Status> </returns>
        IEnumerable<Status> EditStatus(IEnumerable<Status> Status);
    }
}