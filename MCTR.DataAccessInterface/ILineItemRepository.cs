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
    ///ILineItemRepository is an data access interface for the LineItemRepository   
    ///which facilitates the dependency injection.
    ///</summary>
    public interface ILineItemRepository //: IDataRepository
    {


        ///*************************************************************
        ///<summary>
        ///Method Name : mctrLineItemMctrLineItemOnLoad
        ///</summary>
        ///<param name = "LineItem"></param>
        ///<returns>IEnumerable<LineItem> </returns>
        IEnumerable<LineItem> mctrLineItemMctrLineItemOnLoad(IEnumerable<LineItem> lineItem);


        ///*************************************************************
        ///<summary>
        ///Method Name : mctrLineItembutOpenMctrWhenButtonPressed
        ///</summary>
        ///<param name = "LineItem"></param>
        ///<returns>IEnumerable<LineItem> </returns>
        IEnumerable<LineItem> mctrLineItembutOpenMctrWhenButtonPressed(IEnumerable<LineItem> lineItem);


        ///*************************************************************
        ///<summary>
        ///Method Name : mctrLineItemPostQuery
        ///</summary>
        ///<param name = "LineItem"></param>
        ///<returns>IEnumerable<LineItemDomainAdded> </returns>
        IEnumerable<LineItemDomainAdded> mctrLineItemPostQuery(IEnumerable<LineItem> lineItem);


        ///*************************************************************
        ///<summary>
        ///Method Name : getRgBems1LOV()
        ///</summary>
        ///<param name = "LineItem"></param>
        ///<returns>IEnumerable<MCTREmployeev> </returns>
        IEnumerable<MCTREmployeev> getRgBems1LOV();


        ///*************************************************************
        ///<summary>
        ///Method Name : getRgBems2LOV()
        ///</summary>
 
        ///<returns>IEnumerable<MCTREmployeev> </returns>
        IEnumerable<MCTREmployeev> getRgBems2LOV();


        ///*************************************************************
        ///<summary>
        ///Method Name : getRgBems3LOV()
        ///</summary>

        ///<returns>IEnumerable<MCTREmployeev> </returns>
        IEnumerable<MCTREmployeev> getRgBems3LOV();


        ///*************************************************************
        ///<summary>
        ///Method Name : lineItemOnError
        ///</summary>
        ///<param name = "LineItem"></param>
        ///<returns>IEnumerable<MCTREmployeev> </returns>
        IEnumerable<LineItem> lineItemOnError(IEnumerable<LineItem> lineItem);


        ///*************************************************************
        ///<summary>
        ///Method Name : lineItemWhenWindowClosed
        ///</summary>
        ///<param name = "LineItem"></param>
        ///<returns>IEnumerable<LineItem> </returns>
        IEnumerable<LineItem> lineItemWhenWindowClosed(IEnumerable<LineItem> lineItem);



        ///*************************************************************
        ///<summary>
        ///Method Name : Get
        ///</summary>
    
        ///<returns>IEnumerable<LineItem> </returns>
        IEnumerable<LineItem> Get();


    }

}

