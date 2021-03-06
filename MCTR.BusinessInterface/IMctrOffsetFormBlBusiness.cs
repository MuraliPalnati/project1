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

using System.Collections.Generic;
using MCTR.DomainEntity;

namespace MCTR.BusinessInterface
{

    ///*********************************************************************
    ///<summary>
    ///IMctrOffsetFormBlBusiness is an interface for the MctrOffsetFormBlBusiness   
    ///which facilitates the dependency injection.
    ///</summary>
    public interface IMctrOffsetFormBlBusiness
  { 
     

    ///*************************************************************
    ///<summary>
    ///Method Name : mctrOffsetMctrOffsetOnLoad
    ///</summary>
    ///<param name = "MctrOffsetFormBl"></param>
    ///<returns>IEnumerable<MctrOffsetFormBl> </returns>
    IEnumerable<MctrOffsetFormBl> mctrOffsetMctrOffsetOnLoad(IEnumerable<MctrOffsetFormBl> mctrOffsetFormBl);
       
    ///*************************************************************
    ///<summary>
    ///Method Name : mctrOffsetFormBlWhenNewFormInstance
    ///</summary>
    ///<param name = "MctrOffsetFormBl"></param>
    ///<returns>IEnumerable<MctrOffsetFormBl> </returns>
    IEnumerable<MctrOffsetFormBl> mctrOffsetFormBlWhenNewFormInstance(IEnumerable<MctrOffsetFormBl> mctrOffsetFormBl);
       

    ///*************************************************************
    ///<summary>
    ///Method Name : mctrOffsetFormBlWhenWindowClosed
    ///</summary>
    ///<param name = "MctrOffsetFormBl"></param>
    ///<returns>IEnumerable<MctrOffsetFormBl> </returns>
    IEnumerable<MctrOffsetFormBl> mctrOffsetFormBlWhenWindowClosed(IEnumerable<MctrOffsetFormBl> mctrOffsetFormBl);
  }

}

