
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


using MCTR.DomainEntity;
using MCTR.Web.Handlers;
using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using log4net;
using System.IO;
using MCTR.Web.Security;

namespace MCTR.Web.Controllers
{
    ///*********************************************************************
    ///<summary>
    ///MctrAttachBlController is a web controller implementation for the 
    ///MctrAttachBl screen.
    ///</summary>
    ///
    [CustomAuthorize]
    public class MctrAttachBlController : Controller
  {
     private readonly ILog logger;

    public MctrAttachBlController(){
      logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
          
    }
     

    ///*************************************************************
    ///<summary>
    ///Method Name : summaryattachCloseButtonWhenButtonPressed
    ///</summary>
    ///<param name = "MctrAttachBl"></param>
    ///<returns>IEnumerable<MctrAttachBl> </returns>

    [HttpPost]
    public ActionResult summaryattachCloseButtonWhenButtonPressed(MctrAttachBl mctrAttachBl){
      logger.Info("Executing summaryattachCloseButtonWhenButtonPressed() : " + mctrAttachBl);
      if(mctrAttachBl != null){
        MctrAttachBlHandler mctrAttachBlHandler = new MctrAttachBlHandler();
        logger.Debug("Executing mctrAttachBlHandler.summaryattachCloseButtonWhenButtonPressed().");
        var mctrAttachBlResp = mctrAttachBlHandler.summaryattachCloseButtonWhenButtonPressed(mctrAttachBl);
        logger.Info("Response Received : " + mctrAttachBlResp);
        return View("MctrAttachBl",mctrAttachBlResp);
      }
      else{
            logger.Info("Request object is null or doesn't contain any value.");
            return View();
           }
     }   

    ///*************************************************************
    ///<summary>
    ///Method Name : mctrAttachMctrAttachOnLoad
    ///</summary>
    ///<param name = "MctrAttachBl"></param>
    ///<returns>IEnumerable<MctrAttachBl> </returns>


    public ActionResult mctrAttachMctrAttachOnLoad(int mctrNo){
      logger.Info("Executing mctrAttachMctrAttachOnLoad() " );
      var mctrAttachBl = new MctrAttachBl();
      mctrAttachBl.MCTR_NO = mctrNo;

        return PartialView("MctrAttachBl",mctrAttachBl);
      }


        public ActionResult mctrAttachOnLoad(int mctrNo)
        {
            logger.Info("Executing mctrAttachMctrAttachOnLoad() ");
            var mctrAttachBl = new MctrAttachBl();
            mctrAttachBl.MCTR_NO = mctrNo;
            if (mctrAttachBl != null)
            {
                MctrAttachBlHandler mctrAttachBlHandler = new MctrAttachBlHandler();
                logger.Debug("Executing mctrAttachBlHandler.mctrAttachMctrAttachOnLoad().");
                var mctrAttachBlResp = mctrAttachBlHandler.mctrAttachMctrAttachOnLoad(mctrAttachBl);
                logger.Info("Response Received : " + mctrAttachBlResp);
                var jsonData = new
                {
                    total = 1,
                    page = 1,
                    records = mctrAttachBlResp.Count(),
                    rows = mctrAttachBlResp,
                    userdata = mctrAttachBlResp
                };
                return Json(jsonData, JsonRequestBehavior.AllowGet);
            }
            else
            {
                logger.Info("Request object is null or doesn't contain any value.");
                return View("MctrAttachBl");
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : mctrAttachInsert
        ///</summary>
        ///<param name = "MctrAttachBl"></param>
        ///<returns>IEnumerable<MctrAttachBl> </returns>

        [HttpPost]
        public JsonResult mctrAttachBlInsert(string descr, int mctrNo, string attachNo )
        {
            var mctrAttachBl = new MctrAttachBl();
            var fileContent = Request.Files[0];
            byte[] fileData = null;
            using (var binaryReader = new BinaryReader(fileContent.InputStream))
            {
                fileData = binaryReader.ReadBytes(fileContent.ContentLength);
            }

            mctrAttachBl.ATTACH_BLOB = fileData;
            mctrAttachBl.ATTACH_DESCR = descr;

            mctrAttachBl.ATTACH_FILENAME = Path.GetFileName(fileContent.FileName);
            mctrAttachBl.BEMS = SessionPerister.BEMSID;
            mctrAttachBl.DATE_ENTERED = DateTime.Now;
            mctrAttachBl.MCTR_NO = mctrNo;
            mctrAttachBl.ATTACH_NO = Convert.ToInt16(attachNo);

            logger.Info("Executing mctrAttachInsert() : " + mctrAttachBl);
            if (mctrAttachBl != null)
            {
                MctrAttachBlHandler mctrAttachBlHandler = new MctrAttachBlHandler();
                logger.Debug("Executing mctrAttachBlHandler.mctrAttachPreInsert().");
                var mctrAttachBlResp = mctrAttachBlHandler.mctrAttachBlInsert(mctrAttachBl);
                logger.Info("Response Received : " + mctrAttachBlResp);
                return Json(mctrAttachBlResp, JsonRequestBehavior.AllowGet);
            }
            else
            {
                logger.Info("Request object is null or doesn't contain any value.");
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : mctrAttachattachDescrOnError
        ///</summary>
        ///<param name = "MctrAttachBl"></param>
        ///<returns>IEnumerable<MctrAttachBl> </returns>

        [HttpPost]
    public ActionResult mctrAttachattachDescrOnError(MctrAttachBl mctrAttachBl){
      logger.Info("Executing mctrAttachattachDescrOnError() : " + mctrAttachBl);
      if(mctrAttachBl != null){
        MctrAttachBlHandler mctrAttachBlHandler = new MctrAttachBlHandler();
        logger.Debug("Executing mctrAttachBlHandler.mctrAttachattachDescrOnError().");
        var mctrAttachBlResp = mctrAttachBlHandler.mctrAttachattachDescrOnError(mctrAttachBl);
        logger.Info("Response Received : " + mctrAttachBlResp);
        return View("MctrAttachBl",mctrAttachBlResp);
      }
      else{
            logger.Info("Request object is null or doesn't contain any value.");
            return View();
           }
     }   

    ///*************************************************************
    ///<summary>
    ///Method Name : mctrAttachattachInsertFileWhenButtonPressed
    ///</summary>
    ///<param name = "MctrAttachBl"></param>
    ///<returns>IEnumerable<MctrAttachBl> </returns>

    [HttpPost]
    public ActionResult mctrAttachattachInsertFileWhenButtonPressed(MctrAttachBl mctrAttachBl){
      logger.Info("Executing mctrAttachattachInsertFileWhenButtonPressed() : " + mctrAttachBl);
      if(mctrAttachBl != null){
        MctrAttachBlHandler mctrAttachBlHandler = new MctrAttachBlHandler();
        logger.Debug("Executing mctrAttachBlHandler.mctrAttachattachInsertFileWhenButtonPressed().");
        var mctrAttachBlResp = mctrAttachBlHandler.mctrAttachattachInsertFileWhenButtonPressed(mctrAttachBl);
        logger.Info("Response Received : " + mctrAttachBlResp);
        return View("MctrAttachBl",mctrAttachBlResp);
      }
      else{
            logger.Info("Request object is null or doesn't contain any value.");
            return View();
           }
     }   

    ///*************************************************************
    ///<summary>
    ///Method Name : mctrAttachattachViewFileWhenButtonPressed
    ///</summary>
    ///<param name = "MctrAttachBl"></param>
    ///<returns>IEnumerable<MctrAttachBl> </returns>


    public FileResult mctrAttachattachViewFileWhenButtonPressed(int mctrNo, int attachNo,string fileName){
       var mctrAttachBl = new MctrAttachBl();
            mctrAttachBl.MCTR_NO = mctrNo;
            mctrAttachBl.ATTACH_FILENAME = fileName;
            mctrAttachBl.ATTACH_NO = (Int16)(attachNo);
        logger.Info("Executing mctrAttachattachViewFileWhenButtonPressed() : " + mctrAttachBl);
        if(mctrAttachBl != null){
            MctrAttachBlHandler mctrAttachBlHandler = new MctrAttachBlHandler();
            logger.Debug("Executing mctrAttachBlHandler.mctrAttachattachViewFileWhenButtonPressed().");
                var mctrAttachBlResp = mctrAttachBlHandler.mctrAttachattachViewFileWhenButtonPressed(mctrAttachBl);
                mctrAttachBl = mctrAttachBlResp != null ? mctrAttachBlResp : mctrAttachBl;
                logger.Info("Response Received : " + mctrAttachBlResp);
                string contentType = MimeMapping.GetMimeMapping(mctrAttachBl.ATTACH_FILENAME);
                var cd = new System.Net.Mime.ContentDisposition
                {
                    FileName = mctrAttachBl.ATTACH_FILENAME,
                    // always prompt the user for downloading, set to true if you want 
                    // the browser to try to show the file inline
                    Inline = false, 
                };
                Response.AppendHeader("Content-Disposition", cd.ToString());
                return File(mctrAttachBl.ATTACH_BLOB, contentType);
            }
      else{
            logger.Info("Request object is null or doesn't contain any value.");
            return null;
           }
     }

        ///*************************************************************
        ///<summary>
        ///Method Name : mctrAttachPreInsert
        ///</summary>
        ///<param name = "MctrAttachBl"></param>
        ///<returns>IEnumerable<MctrAttachBl> </returns>

        [HttpPost]
    public ActionResult mctrAttachPreInsert(MctrAttachBl mctrAttachBl){
      logger.Info("Executing mctrAttachPreInsert() : " + mctrAttachBl);
      if(mctrAttachBl != null){
        MctrAttachBlHandler mctrAttachBlHandler = new MctrAttachBlHandler();
        logger.Debug("Executing mctrAttachBlHandler.mctrAttachPreInsert().");
        var mctrAttachBlResp = mctrAttachBlHandler.mctrAttachPreInsert(mctrAttachBl);
        logger.Info("Response Received : " + mctrAttachBlResp);
        return View("MctrAttachBl",mctrAttachBlResp);
      }
      else{
            logger.Info("Request object is null or doesn't contain any value.");
            return View();
           }
     }   

    ///*************************************************************
    ///<summary>
    ///Method Name : webutildummyWhenButtonPressed
    ///</summary>
    ///<param name = "MctrAttachBl"></param>
    ///<returns>IEnumerable<MctrAttachBl> </returns>

    [HttpPost]
    public ActionResult webutildummyWhenButtonPressed(MctrAttachBl mctrAttachBl){
      logger.Info("Executing webutildummyWhenButtonPressed() : " + mctrAttachBl);
      if(mctrAttachBl != null){
        MctrAttachBlHandler mctrAttachBlHandler = new MctrAttachBlHandler();
        logger.Debug("Executing mctrAttachBlHandler.webutildummyWhenButtonPressed().");
        var mctrAttachBlResp = mctrAttachBlHandler.webutildummyWhenButtonPressed(mctrAttachBl);
        logger.Info("Response Received : " + mctrAttachBlResp);
        return View("MctrAttachBl",mctrAttachBlResp);
      }
      else{
            logger.Info("Request object is null or doesn't contain any value.");
            return View();
           }
     }   

    ///*************************************************************
    ///<summary>
    ///Method Name : mctrAttachBlWhenNewFormInstance
    ///</summary>
    ///<param name = "MctrAttachBl"></param>
    ///<returns>IEnumerable<MctrAttachBl> </returns>

    [HttpPost]
    public ActionResult mctrAttachBlWhenNewFormInstance(MctrAttachBl mctrAttachBl){
      logger.Info("Executing mctrAttachBlWhenNewFormInstance() : " + mctrAttachBl);
      if(mctrAttachBl != null){
        MctrAttachBlHandler mctrAttachBlHandler = new MctrAttachBlHandler();
        logger.Debug("Executing mctrAttachBlHandler.mctrAttachBlWhenNewFormInstance().");
        var mctrAttachBlResp = mctrAttachBlHandler.mctrAttachBlWhenNewFormInstance(mctrAttachBl);
        logger.Info("Response Received : " + mctrAttachBlResp);
        return View("MctrAttachBl",mctrAttachBlResp);
      }
      else{
            logger.Info("Request object is null or doesn't contain any value.");
            return View();
           }
     }      
  } 
}
