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
using System.Web;

using System.Threading.Tasks;
using System.Web.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;

using log4net;

using MCTR.DomainEntity;

namespace MCTR.Web.Handlers
{
///*********************************************************************
///<summary>
///JrnlHistHandler provides a level of abstraction for consuming the REST api.
///</summary>
  public class JrnlHistHandler
  {
     private readonly ILog logger;
    
    public JrnlHistHandler()
    {
      logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
    }
        
     
    ///*************************************************************
    ///<summary>
    ///Method Name : selectionselectionOnLoad
    ///</summary>
    ///<param name = "JrnlHist"></param>
    ///<returns>IEnumerable<JrnlHist> </returns>

    public IEnumerable<JrnlHist> selectionselectionOnLoad(JrnlHist jrnlHist){

      logger.Debug("Executing selectionselectionOnLoad rest service handler.");
      string restApiPath = "JrnlHist/selectionselectionOnLoad";
      logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + jrnlHist);
      var response = HandlerUtil<JrnlHist>.RestPostProcessor(restApiPath, jrnlHist);
      logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
      return response; 
    }
        
    ///*************************************************************
    ///<summary>
    ///Method Name : selectionbutJhistDateWhenButtonPressedOpenLOV()
    ///</summary>
    ///<param name = "JrnlHist"></param>
    ///<returns>IEnumerable<JrnlHist> </returns>

    public IEnumerable<JrnlHist> selectionbutJhistDateWhenButtonPressedOpenLOV(JrnlHist jrnlHist){

      logger.Debug("Executing selectionbutJhistDateWhenButtonPressedOpenLOV() rest service handler.");
      string restApiPath = "JrnlHist/selectionbutJhistDateWhenButtonPressedOpenLOV()";
      logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + jrnlHist);
      var response = HandlerUtil<JrnlHist>.RestPostProcessor(restApiPath, jrnlHist);
      logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
      return response; 
    }
        
    ///*************************************************************
    ///<summary>
    ///Method Name : jrnlHistOnLoad
    ///</summary>
    ///<param name = "JrnlHist"></param>
    ///<returns>IEnumerable<JrnlHist> </returns>

    public IEnumerable<JrnlHist> jrnlHistOnLoad(JrnlHist jrnlHist){

      logger.Debug("Executing jrnlHistOnLoad rest service handler.");
      string restApiPath = "JrnlHistService/jrnlHistOnLoad";
      logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + jrnlHist);
      var response = HandlerUtil<JrnlHist>.RestPostProcessor(restApiPath, jrnlHist);
      logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
      return response; 
    }
        
    ///*************************************************************
    ///<summary>
    ///Method Name : getRgJhistDateLOV()
    ///</summary>
    ///<param name = "JrnlHist"></param>
    ///<returns>IEnumerable<JrnlHist> </returns>

    public IEnumerable<JrnlHist> getRgJhistDateLOV(){

      logger.Debug("Executing getRgJhistDateLOV() rest service handler.");
      string restApiPath = "JrnlHistService/getRgJhistDateLOV";
      logger.Info("Invoking Rest API : " + restApiPath + " with Request : ");
      var response = HandlerUtil<JrnlHist>.RestGetProcessor(restApiPath);
      logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
      return response; 
    }
        
    ///*************************************************************
    ///<summary>
    ///Method Name : jrnlHistWhenNewFormInstance
    ///</summary>
    ///<param name = "JrnlHist"></param>
    ///<returns>IEnumerable<JrnlHist> </returns>

    public IEnumerable<JrnlHist> jrnlHistWhenNewFormInstance(JrnlHist jrnlHist){

      logger.Debug("Executing jrnlHistWhenNewFormInstance rest service handler.");
      string restApiPath = "JrnlHist/jrnlHistWhenNewFormInstance";
      logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + jrnlHist);
      var response = HandlerUtil<JrnlHist>.RestPostProcessor(restApiPath, jrnlHist);
      logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
      return response; 
    }
        
    ///*************************************************************
    ///<summary>
    ///Method Name : jrnlHistWhenWindowClosed
    ///</summary>
    ///<param name = "JrnlHist"></param>
    ///<returns>IEnumerable<JrnlHist> </returns>

    public IEnumerable<JrnlHist> jrnlHistWhenWindowClosed(JrnlHist jrnlHist){

      logger.Debug("Executing jrnlHistWhenWindowClosed rest service handler.");
      string restApiPath = "JrnlHist/jrnlHistWhenWindowClosed";
      logger.Info("Invoking Rest API : " + restApiPath + " with Request : " + jrnlHist);
      var response = HandlerUtil<JrnlHist>.RestPostProcessor(restApiPath, jrnlHist);
      logger.Info("Response received form Rest API : " + restApiPath + " : " + response);
      return response; 
    }
        
    
  }

}

