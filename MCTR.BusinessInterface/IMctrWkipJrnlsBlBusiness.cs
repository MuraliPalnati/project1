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
    ///IMctrWkipJrnlsBlBusiness is an interface for the MctrWkipJrnlsBlBusiness   
    ///which facilitates the dependency injection.
    ///</summary>
    public interface IMctrWkipJrnlsBlBusiness
  { 
     

    ///*************************************************************
    ///<summary>
    ///Method Name : jrnlWeekJrnlWeekOnLoad
    ///</summary>
    ///<param name = "MctrWkipJrnlsBl"></param>
    ///<returns>IEnumerable<MctrWkipJrnlsBl> </returns>
    IEnumerable<MctrWkipJrnlsBl> jrnlWeekJrnlWeekOnLoad(IEnumerable<MctrWkipJrnlsBl> mctrWkipJrnlsBl);
       

    ///*************************************************************
    ///<summary>
    ///Method Name : mctrWkipJrnlsBlWhenNewFormInstance
    ///</summary>
    ///<param name = "MctrWkipJrnlsBl"></param>
    ///<returns>IEnumerable<MctrWkipJrnlsBl> </returns>
    IEnumerable<MctrWkipJrnlsBl> mctrWkipJrnlsBlWhenNewFormInstance(IEnumerable<MctrWkipJrnlsBl> mctrWkipJrnlsBl);
       

    ///*************************************************************
    ///<summary>
    ///Method Name : mctrWkipJrnlsBlWhenWindowClosed
    ///</summary>
    ///<param name = "MctrWkipJrnlsBl"></param>
    ///<returns>IEnumerable<MctrWkipJrnlsBl> </returns>
    IEnumerable<MctrWkipJrnlsBl> mctrWkipJrnlsBlWhenWindowClosed(IEnumerable<MctrWkipJrnlsBl> mctrWkipJrnlsBl);
       
    
  }

}

