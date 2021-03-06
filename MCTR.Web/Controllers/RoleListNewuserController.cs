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

using log4net;
using MCTR.DomainEntity;
using MCTR.Web.Handlers;
using System;
using System.Linq;
using System.Web.Mvc;
using MCTR.Web.Security;

namespace MCTR.Web.Controllers
{
    ///*********************************************************************
    ///<summary>
    ///RoleListNewuserController is a web controller implementation for the 
    ///RoleListNewuser screen.
    ///</summary>
    [CustomAuthorize]
    public class RoleListNewuserController : Controller
    {
         private readonly ILog logger;
        public RoleListNewuserController()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        }
        //*************************************************************
        ///<summary>
        ///Method Name : RoleNewUser
        ///</summary>
        ///<returns>ActionResult</returns>
        [HttpGet]
        public ActionResult RoleNewUser()
        {
            return View();
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : RoleNewUserList
        ///</summary>
        ///<returns>JsonResult</returns>
        public JsonResult RoleNewUserList()
        {
            try
            {
                var emplist =new RoleListNewuser();
                emplist.session_bems = SessionPerister.BEMSID;
                logger.Info("Executing MCTR.Web.RoleListNewuserController.RoleNewUserList()");
                RoleListNewuserHandler roleListNewuserHandler = new RoleListNewuserHandler();
                var roleListNewuserResp = roleListNewuserHandler.empllistonload(emplist);
                logger.Info("Response Received from MCTR.Web.RoleListNewuserController.RoleNewUserList() " + roleListNewuserResp);
                var jsonData = new
                {
                    total = 1,
                    page = 1,
                    records = roleListNewuserResp.Count(),
                    rows = roleListNewuserResp,
                    userdata= roleListNewuserResp

                };
                return Json(jsonData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                logger.Info("Response received from JrnlWeekRepository.jrnlWeekJrnlWeekOnLoad() : " + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : emplListbutFindWhenButtonPressed
        ///</summary>
        ///<param name = "roleList"></param>
        ///<returns>JsonResult</returns>
        [HttpGet]
        public JsonResult emplListbutFindWhenButtonPressed(string lastName, string bemsId, string deprtId, string buUnit)
        {
            try
            {
                RoleListNewuserHandler roleListNewuserHandler = new RoleListNewuserHandler();
                var roleListNewuser = new RoleListNewuser();
                roleListNewuser.BEMS_ID = bemsId;
                roleListNewuser.LAST_NAME = lastName;
                roleListNewuser.DEPTNO = deprtId;
                roleListNewuser.COMPONENT = buUnit;
                roleListNewuser.session_bems = SessionPerister.BEMSID;
                logger.Info("Executing MCTR.Web.RoleListNewuserController.emplListbutFindWhenButtonPressed() : " + roleListNewuser);
                if (roleListNewuser != null)
                {
                    logger.Debug("Executing roleListNewuserHandler.emplListbutFindWhenButtonPressed().");
                    var roleListNewuserResp = roleListNewuserHandler.emplListbutFindWhenButtonPressed(roleListNewuser);
                    logger.Info("Response Received from MCTR.Web.RoleListNewuserController.emplListbutFindWhenButtonPressed() " + roleListNewuserResp);
                    var jsonData = new
                    {
                        total = 1,
                        page = 1,
                        records = roleListNewuserResp.Count(),
                        rows = roleListNewuserResp,

                    };
                    return Json(jsonData, JsonRequestBehavior.AllowGet);
                }
                return null;
            }
            catch (Exception e)
            {
                logger.Info("Response received from JrnlWeekRepository.jrnlWeekJrnlWeekOnLoad() : " + e.Message);

                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : roleListNewuserWhenNewFormInstance
        ///</summary>
        ///<param name = "roleList"></param>
        ///<returns>ActionResult</returns>
        [HttpPost]
        public ActionResult roleListNewuserWhenNewFormInstance(RoleListNewuser roleListNewuser)
        {
            try
            {
                logger.Info("Executing MCTR.Web.RoleListNewuserController.roleListNewuserWhenNewFormInstance() : " + roleListNewuser);
                if (roleListNewuser != null)
                {
                    RoleListNewuserHandler roleListNewuserHandler = new RoleListNewuserHandler();
                    var roleListNewuserResp = roleListNewuserHandler.roleListNewuserWhenNewFormInstance(roleListNewuser);
                    logger.Info("Response Received from MCTR.Web.RoleListNewuserController.roleListNewuserWhenNewFormInstance() " + roleListNewuserResp);
                    return View("RoleListNewuser", roleListNewuserResp);
                }
                else
                {
                    logger.Info("Request object is null or doesn't contain any value.");
                    return View();
                }
            }
            catch (Exception e)
            {
                logger.Info("Response received from JrnlWeekRepository.jrnlWeekJrnlWeekOnLoad() : " + e.Message);

                throw;
            }
        }
    }
}
