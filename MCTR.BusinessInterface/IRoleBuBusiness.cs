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

namespace MCTR.BusinessInterface
{

    public interface IRoleBuBusiness
  {
        ///*************************************************************
        ///<summary>
        ///Method Name : rolebuonload
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>IEnumerable<roleBu> </returns>
        IEnumerable<RoleBu> rolebuonload(IEnumerable<RoleBu> roleBu);

        ///*************************************************************
        ///<summary>
        ///Method Name : roleBuopenLOV
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>IEnumerable<roleBu> </returns>
        IEnumerable<MctrBusUnit> roleBuopenLOV();

        ///*************************************************************
        ///<summary>
        ///Method Name : roleBuPostQuery
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>IEnumerable<roleBu> </returns>
        IEnumerable<RoleBu> roleBuPostQuery(IEnumerable<RoleBu> roleBu);

        ///*************************************************************
        ///<summary>
        ///Method Name : roleBuPreRecord
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>IEnumerable<roleBu> </returns>
        IEnumerable<RoleBu> roleBuPreRecord(IEnumerable<RoleBu> roleBu);

        ///*************************************************************
        ///<summary>
        ///Method Name : roleBuPostDelete
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>IEnumerable<roleBu> </returns>
        IEnumerable<RoleBu> roleBuPostDelete(IEnumerable<RoleBu> roleBu);

        ///*************************************************************
        ///<summary>
        ///Method Name : roleBuPostInsert
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>IEnumerable<roleBu> </returns>
        IEnumerable<RoleBu> roleBuPostInsert(IEnumerable<RoleBu> roleBu);

        ///*************************************************************
        ///<summary>
        ///Method Name : roleBuPostUpdate
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>IEnumerable<roleBu> </returns>
        IEnumerable<RoleBu> roleBuPostUpdate(IEnumerable<RoleBu> roleBu);

        ///*************************************************************
        ///<summary>
        ///Method Name : roleBuWhenNewFormInstance
        ///</summary>
        ///<param name = "roleBu"></param>
        ///<returns>IEnumerable<roleBu> </returns>
        IEnumerable<RoleBu> roleBuWhenNewFormInstance(IEnumerable<RoleBu> roleBu);
   
  }

}

