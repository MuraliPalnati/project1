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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MCTR.DomainEntity;

namespace MCTR.DataAccessInterface
{
    ///*********************************************************************
    ///<summary>
    ///ILbrRateCyRepository is an data access interface for the LbrRateCyRepository   
    ///which facilitates the dependency injection.
    ///</summary>
    public interface ILbrRateCyRepository
    {

     
        ///*************************************************************
        ///<summary>
        ///Method Name : lbrRateCyWhenNewFormInstance
        ///</summary>
        ///<param name = "lbrRateCy"></param>
        ///<returns>IEnumerable<LbrRateCy> </returns>

        IEnumerable<LbrRateCy> lbrRateCyWhenNewFormInstance(IEnumerable<LbrRateCy> lbrRateCy);
        ///*************************************************************
        ///<summary>
        ///Method Name : lbrRateCyWhenWindowClosed
        ///</summary>
        ///<param name = "lbrRateCy"></param>

        IEnumerable<LbrRateCy> lbrRateCyWhenWindowClosed(IEnumerable<LbrRateCy> lbrRateCy);


        IEnumerable<LbrRateCy> LbrRateOnLoad(IEnumerable<LbrRateCy> lbrRateCy);

    }
}
