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

    ///*********************************************************************
    ///<summary>
    ///IMctrOpenReportsBlBusiness is an interface for the MctrOpenReportsBlBusiness   
    ///which facilitates the dependency injection.
    ///</summary>
    public interface IMctrOpenReportsBlBusiness
  { 
     
        ///*************************************************************
        ///<summary>
        ///Method Name : selectionoriginatorWhenButtonPressed
        ///</summary>
        ///<param name = "MctrOpenReportsBl"></param>
        ///<returns>IEnumerable<MctrOpenReportsBl> </returns>
        IEnumerable<MctrOpenReportsBl> selectionoriginatorWhenButtonPressed(IEnumerable<MctrOpenReportsBl> mctrOpenReportsBl);


        ///*************************************************************
        ///<summary>
        ///Method Name : selectionstatusWhenButtonPressed
        ///</summary>
        ///<param name = "MctrOpenReportsBl"></param>
        ///<returns>IEnumerable<MctrOpenReportsBl> </returns>
        IEnumerable<MctrOpenReportsBl> selectionstatusWhenButtonPressed(IEnumerable<MctrOpenReportsBl> mctrOpenReportsBl);


        ///*************************************************************
        ///<summary>
        ///Method Name : selectionfinancialControlWhenButtonPressed
        ///</summary>
        ///<param name = "MctrOpenReportsBl"></param>
        ///<returns>IEnumerable<MctrOpenReportsBl> </returns>
        IEnumerable<MctrOpenReportsBl> selectionfinancialControlWhenButtonPressed(IEnumerable<MctrOpenReportsBl> mctrOpenReportsBl);


        ///*************************************************************
        ///<summary>
        ///Method Name : selectionbutExcelWhenButtonPressed
        ///</summary>
        ///<param name = "MctrOpenReportsBl"></param>
        ///<returns>IEnumerable<MctrOpenReportsBl> </returns>
        IEnumerable<MctrOpenReportsBl> selectionbutExcelWhenButtonPressed(IEnumerable<MctrOpenReportsBl> mctrOpenReportsBl);



        ///*************************************************************
        ///<summary>
        ///Method Name : getRgBuLOV
        ///</summary>
        ///<param name = "MctrOpenReportsBl"></param>
        ///<returns>IEnumerable<MctrOpenReportsBl> </returns>
        IEnumerable<MctrBusUnit> getRgBuLOV(IEnumerable<MctrBusUnit> mctrOpenReportsBl);
    }

}

/*

///*************************************************************
    ///<summary>
    ///Method Name : webutildummyWhenButtonPressed
    ///</summary>
    ///<param name = "MctrOpenReportsBl"></param>
    ///<returns>IEnumerable<MctrOpenReportsBl> </returns>
    IEnumerable<MctrOpenReportsBl> webutildummyWhenButtonPressed(IEnumerable<MctrOpenReportsBl> mctrOpenReportsBl);
       

    ///*************************************************************
    ///<summary>
    ///Method Name : webutilwebutilClientinfoFunctionsWhenCustomItemEvent
    ///</summary>
    ///<param name = "MctrOpenReportsBl"></param>
    ///<returns>IEnumerable<MctrOpenReportsBl> </returns>
    IEnumerable<MctrOpenReportsBl> webutilwebutilClientinfoFunctionsWhenCustomItemEvent(IEnumerable<MctrOpenReportsBl> mctrOpenReportsBl);
       

    ///*************************************************************
    ///<summary>
    ///Method Name : webutilwebutilFileFunctionsWhenCustomItemEvent
    ///</summary>
    ///<param name = "MctrOpenReportsBl"></param>
    ///<returns>IEnumerable<MctrOpenReportsBl> </returns>
    IEnumerable<MctrOpenReportsBl> webutilwebutilFileFunctionsWhenCustomItemEvent(IEnumerable<MctrOpenReportsBl> mctrOpenReportsBl);
       

    ///*************************************************************
    ///<summary>
    ///Method Name : webutilwebutilHostFunctionsWhenCustomItemEvent
    ///</summary>
    ///<param name = "MctrOpenReportsBl"></param>
    ///<returns>IEnumerable<MctrOpenReportsBl> </returns>
    IEnumerable<MctrOpenReportsBl> webutilwebutilHostFunctionsWhenCustomItemEvent(IEnumerable<MctrOpenReportsBl> mctrOpenReportsBl);
       

    ///*************************************************************
    ///<summary>
    ///Method Name : webutilwebutilSessionFunctionsWhenCustomItemEvent
    ///</summary>
    ///<param name = "MctrOpenReportsBl"></param>
    ///<returns>IEnumerable<MctrOpenReportsBl> </returns>
    IEnumerable<MctrOpenReportsBl> webutilwebutilSessionFunctionsWhenCustomItemEvent(IEnumerable<MctrOpenReportsBl> mctrOpenReportsBl);
       

    ///*************************************************************
    ///<summary>
    ///Method Name : webutilwebutilFiletransferFunctionsWhenCustomItemEvent
    ///</summary>
    ///<param name = "MctrOpenReportsBl"></param>
    ///<returns>IEnumerable<MctrOpenReportsBl> </returns>
    IEnumerable<MctrOpenReportsBl> webutilwebutilFiletransferFunctionsWhenCustomItemEvent(IEnumerable<MctrOpenReportsBl> mctrOpenReportsBl);
       

    ///*************************************************************
    ///<summary>
    ///Method Name : webutilwebutilOleFunctionsWhenCustomItemEvent
    ///</summary>
    ///<param name = "MctrOpenReportsBl"></param>
    ///<returns>IEnumerable<MctrOpenReportsBl> </returns>
    IEnumerable<MctrOpenReportsBl> webutilwebutilOleFunctionsWhenCustomItemEvent(IEnumerable<MctrOpenReportsBl> mctrOpenReportsBl);
       

    ///*************************************************************
    ///<summary>
    ///Method Name : webutilwebutilCApiFunctionsWhenCustomItemEvent
    ///</summary>
    ///<param name = "MctrOpenReportsBl"></param>
    ///<returns>IEnumerable<MctrOpenReportsBl> </returns>
    IEnumerable<MctrOpenReportsBl> webutilwebutilCApiFunctionsWhenCustomItemEvent(IEnumerable<MctrOpenReportsBl> mctrOpenReportsBl);
       

    ///*************************************************************
    ///<summary>
    ///Method Name : webutilwebutilBrowserFunctionsWhenCustomItemEvent
    ///</summary>
    ///<param name = "MctrOpenReportsBl"></param>
    ///<returns>IEnumerable<MctrOpenReportsBl> </returns>
    IEnumerable<MctrOpenReportsBl> webutilwebutilBrowserFunctionsWhenCustomItemEvent(IEnumerable<MctrOpenReportsBl> mctrOpenReportsBl);
              

    ///*************************************************************
    ///<summary>
    ///Method Name : mctrOpenReportsBlWhenWindowClosed
    ///</summary>
    ///<param name = "MctrOpenReportsBl"></param>
    ///<returns>IEnumerable<MctrOpenReportsBl> </returns>
    IEnumerable<MctrOpenReportsBl> mctrOpenReportsBlWhenWindowClosed(IEnumerable<MctrOpenReportsBl> mctrOpenReportsBl);

*/
