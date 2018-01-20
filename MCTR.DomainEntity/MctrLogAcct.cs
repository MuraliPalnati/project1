


using System;
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
namespace MCTR.DomainEntity
{
///*********************************************************************
///<summary>
///MctrLogAcct is a domain model which refelects the screen components.
///</summary>
  public class MctrLogAcct {

    	public int Mctr_No { set; get; }

    	public string Bems_Acct { set; get; }

    	public string Status_Id { set; get; }

    	public string Bems_Acct_New { set; get; }

    	public string reason { set; get; }

    	public string Bems_Admin { set; get; }

        public string RespMsg { set; get; }

        public Nullable<System.DateTime> Date_Changed { set; get; }

  }
}
