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

    public interface IBuProfileBusiness
    {

        IEnumerable<BuProfile> buProfileBuProfileOnLoad();

        IEnumerable<BuProfile> buProfilebusinessUnitPostTextItem(IEnumerable<BuProfile> buProfile);

        IEnumerable<BuProfile> buProfileoffsetActivityPreTextItem(IEnumerable<BuProfile> buProfile);

        IEnumerable<BuProfile> buProfileoffsetActivityPostTextItem(IEnumerable<BuProfile> buProfile);

        IEnumerable<BuProfile> buProfileoffsetProjectPreTextItem(IEnumerable<BuProfile> buProfile);

        IEnumerable<BuProfile> buProfileoffsetProjectPostTextItem(IEnumerable<BuProfile> buProfile);

        IEnumerable<BuProfile> buProfileoffsetAccountPreTextItem(IEnumerable<BuProfile> buProfile);

        IEnumerable<BuProfile> buProfileoffsetAccountPostTextItem(IEnumerable<BuProfile> buProfile);

        IEnumerable<BuProfile> buProfileopenLOV(IEnumerable<BuProfile> buProfile);

        IEnumerable<BuProfile> buProfilebemsAdminPostTextItem(IEnumerable<BuProfile> buProfile);

        IEnumerable<BuProfile> buProfilePostQuery(IEnumerable<BuProfile> buProfile);

        IEnumerable<BuProfile> buProfilePreInsert(IEnumerable<BuProfile> buProfile);

        IEnumerable<BuProfile> buProfilePreUpdate(IEnumerable<BuProfile> buProfile);

        IEnumerable<BuProfile> buProfileWhenNewFormInstance(IEnumerable<BuProfile> buProfile);

        IEnumerable<BuProfile> buProfileWhenWindowClosed(IEnumerable<BuProfile> buProfile);
        IEnumerable<BuProfile> buProfilePostInsert(IEnumerable<BuProfile> buProfile);
        IEnumerable<BuProfile> buProfilePostUpdate(IEnumerable<BuProfile> buProfile);
        IEnumerable<MctrEmployee> GetAdmin(IEnumerable<MctrEmployee> list);
        IEnumerable<BuProfile> buProfileDelete(IEnumerable<BuProfile> buProfile);


    }

}

