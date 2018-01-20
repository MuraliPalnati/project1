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
    public interface IRoleBusiness
  {
        IEnumerable<RoleList> roleOnLoad(IEnumerable<RoleList> role);
        IEnumerable<Role> rolePostQuery(IEnumerable<Role> role);
        IEnumerable<RoleList> Save(IEnumerable<RoleList> roleList);
        IEnumerable<Role> roleWhenNewFormInstance(IEnumerable<Role> role);
  }
}

