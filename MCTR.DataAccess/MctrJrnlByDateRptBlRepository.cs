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
using log4net;
using Oracle.ManagedDataAccess.Client;

using MCTR.DomainEntity;
using MCTR.DataAccessInterface;
using System.Linq;
using System;
using System.Data;
using MCTR.DataEntity;

namespace MCTR.DataAccess
{
    ///*********************************************************************
    ///<summary>
    ///MctrJrnlByDateRptBlRepository is a data access implementation which holds all 
    ///the data access logic in it.
    ///</summary>
    public class MctrJrnlByDateRptBlRepository : BaseRepository, IMctrJrnlByDateRptBlRepository
  {
    
        private readonly ILog logger = null;
        private MctrJrnlByDate obj;

        public MctrJrnlByDateRptBlRepository()
    {
      logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
    }
        ///*************************************************************
        ///<summary>
        ///Method Name : getRgBuLOV
        ///</summary>
        ///<param name = "MctrJrnlByDateRptBl"></param>
        ///<returns>IEnumerable<MctrJrnlByDateRptBl> </returns>
        /// 

        public IEnumerable<MctrJrnlByDate> getRgBuLOV(IEnumerable<MctrJrnlByDate> mctrJrnlByDateRptBl)
        {
            logger.Debug("Executing MCTR.DataAccess.LineItem.getRgBems1LOV");
            try
            {
                obj = mctrJrnlByDateRptBl.First();
            
                OracleParameter[] parameter1 = new OracleParameter[4];

                string sqlstmt = "select b.business_unit , b.group_cd7 , b.descr , b.effdt , b.eff_status from mctr_bus_unit_v b where exists ( select rb.business_unit from MCTR_ROLE_BU rb where rb.bems = ? global.session_bems and ( rb.business_unit = b.business_unit or ( rb.group_cd7 = b.group_cd7 and rb.business_unit = ? ) ) ) and exists ( select h.orig_bu from mctr_header h where h.orig_bu = b.business_unit and h.status_id = ? and h.date_journal is not null ) order by b.business_unit "; 
                parameter1[0] = new OracleParameter(":h.date_journal", OracleDbType.Varchar2, obj.DATE_JOURNAL, ParameterDirection.Input);
                parameter1[1] = new OracleParameter("h.orig_bu", OracleDbType.Varchar2, obj.ORIG_BU, ParameterDirection.Input);
                parameter1[2] = new OracleParameter(" h.bems_fin_ctl", OracleDbType.Varchar2, obj.BEMS_FIN_CTL, ParameterDirection.Input);
                parameter1[3] = new OracleParameter("h.bems_orig", OracleDbType.Varchar2, obj.BEMS_ORIG, ParameterDirection.Input);
                var resultlist = entities.Database.SqlQuery<MctrJrnlByDate>(sqlstmt, parameter1).ToList<MctrJrnlByDate>();
               // var list = AutoMapper.Mapper.DynamicMap<IEnumerable<MCTR_HEADER>, IEnumerable<MctrJrnlByDate>>(resultlist);
                return resultlist;

            }
            catch (OracleException e)
            {
                logger.Error("Error from MCTR.DataAccess.LineItemRepository.getRgBems1LOV" + e.Message);

                throw;
            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.DataAccess.LineItemRepository.getRgBems1LOV" + e.Message);

                throw;
            }

        }
        ///*************************************************************
        ///<summary>
        ///Method Name : getRgFinCtlLOV
        ///</summary>
        ///<param name = "MctrJrnlByDateRptBl"></param>
        ///<returns>IEnumerable<MctrJrnlByDateRptBl> </returns>
        public IEnumerable<MctrJrnlByDate> getRgFinCtlLOV(IEnumerable<MctrJrnlByDate> mctrJrnlByDateRptBl)
        {
            logger.Debug("Executing Error from MCTR.DataAccess. MctrJrnlByDateRptBlRepository.getRgFinCtlLOV() with request");
            try
            {
                obj = mctrJrnlByDateRptBl.First();
              
                OracleParameter[] parameter1 = new OracleParameter[1];
                string sqlstmt = "select distinct e.last_name , e.first_name , e.bems_id from mctr_employee_v e, mctr_header h where e . bems_id = h . bems_fin_ctl and h . orig_bu = :0 and h . date_journal is not null";
                parameter1[0] = new OracleParameter(" :f_bu", OracleDbType.Varchar2, obj.ORIG_BU, ParameterDirection.Input);
                var resultlist = entities.Database.SqlQuery<MctrJrnlByDate>(sqlstmt, parameter1).ToList<MctrJrnlByDate>();
               // var list = AutoMapper.Mapper.DynamicMap<IEnumerable<MCTR_HEADER>,IEnumerable<MctrJrnlByDate>>(resultlist);

                return resultlist;
            }
            catch(Exception e)
            {
                logger.Error("Error from MCTR.DataAccess. MctrJrnlByDateRptBlRepository.getRgFinCtlLOV()" + e.Message);
                throw;
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : getRgOrigLOV
        ///</summary>
        ///<param name = "MctrJrnlByDateRptBl"></param>
        ///<returns>IEnumerable<MctrJrnlByDateRptBl> </returns>
        public IEnumerable<MctrJrnlByDate> getRgOrigLOV(IEnumerable<MctrJrnlByDate> mctrJrnlByDateRptBl)
        {
            logger.Debug("Executing Error from MCTR.DataAccess. MctrJrnlByDateRptBlRepository.getRgOrigLOV() with request");
            try
            {
                obj = mctrJrnlByDateRptBl.First<MctrJrnlByDate>();
              
                OracleParameter[] parameter1 = new OracleParameter[1];
                string sqlstmt = "  select distinct e.last_name , e.first_name , e.bems_id from mctr_employee_v e , mctr_header h where e.bems_id = h.bems_orig and h.orig_bu = :0 and h.date_journal is not null union select distinct ' ' last_name , ' ' first_name , '%' bems_id from dual ";
                parameter1[0] = new OracleParameter(" :f_bu", OracleDbType.Varchar2, obj.ORIG_BU, ParameterDirection.Input);
                var resultlist = entities.Database.SqlQuery<MctrJrnlByDate>(sqlstmt, parameter1).ToList<MctrJrnlByDate>();
                return resultlist;
            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.DataAccess. MctrJrnlByDateRptBlRepository.getRgOrigLOV()" + e.Message);
                throw;
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : getRgFromDateLOV
        ///</summary>
        ///<param name = "MctrJrnlByDateRptBl"></param>
        ///<returns>IEnumerable<MctrJrnlByDateRptBl> </returns>
        public IEnumerable<MctrJrnlByDate> getRgFromDateLOV(IEnumerable<MctrJrnlByDate> mctrJrnlByDateRptBl)
        {
            logger.Debug("Executing Error from MCTR.DataAccess. MctrJrnlByDateRptBlRepository.getRgOrigLOV() with request");
            try
            {
                obj = mctrJrnlByDateRptBl.First<MctrJrnlByDate>();
              
                OracleParameter[] parameter1 = new OracleParameter[3];
                string sqlstmt = @"select to_date ( h.date_journal , 'dd-mon-yy' ) date_journal , count ( * ) mctr_count from mctr_header h 
                                    where h.date_journal is not null and h.orig_bu = :0 and ( h.bems_fin_ctl = :1 or h.bems_orig = :2 or ( :1 is null and :2 is null ) 
                                    or ( :1 = '%' and:2 = '%')) group by to_date ( h.date_journal , 'dd-mon-yy' ) order by to_date ( h.date_journal , 'dd-mon-yy' ) desc ";
                parameter1[0] = new OracleParameter(":h.orig_bu", OracleDbType.Varchar2, obj.ORIG_BU, ParameterDirection.Input);
                parameter1[1] = new OracleParameter(":h.bems_fin_ctl", OracleDbType.Varchar2, obj.BEMS_FIN_CTL, ParameterDirection.Input);
                parameter1[2] = new OracleParameter(":h.bems_orig ", OracleDbType.Varchar2, obj.BEMS_ORIG, ParameterDirection.Input);
                var resultlist = entities.Database.SqlQuery<MctrJrnlByDate>(sqlstmt, parameter1).ToList<MctrJrnlByDate>();
                //  var list = AutoMapper.Mapper.DynamicMap<IEnumerable<MCTR_HEADER>,IEnumerable<MctrJrnlByDate>>(resultlist);

                return resultlist;

            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.DataAccess. MctrJrnlByDateRptBlRepository.getRgFromDateLOV()" + e.Message);
                throw;
            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : getRgToDateLOV
        ///</summary>
        ///<param name = "MctrJrnlByDateRptBl"></param>
        ///<returns>IEnumerable<MctrJrnlByDateRptBl> </returns>
        public IEnumerable<MctrJrnlByDate> getRgToDateLOV(IEnumerable<MctrJrnlByDate> mctrJrnlByDateRptBl)
        {
            logger.Debug("Executing MCTR.DataAccess. MctrJrnlByDateRptBlRepository.getRgToDateLOV()");
            try
            {
                obj = mctrJrnlByDateRptBl.First<MctrJrnlByDate>();
             
                OracleParameter[] parameter1 = new OracleParameter[4];

                string sqlstmt = @"Select to_date(h.date_journal, 'dd-mon-yy') date_journal,count(*) mctr_count from mctr_header h 
                                    where  (to_date(h.date_journal, 'dd-mon-yy') >= :0 or h.date_journal is not null  ) and h.orig_bu = :1 and(h.bems_fin_ctl = :2 or h.bems_orig = :3
                                    or( :2 is NULL and: 3 is null)  or( :2 = '%' and: 3 = '%'))
                                    group by to_date(h.date_journal, 'dd-mon-yy') order by to_date(h.date_journal, 'dd-mon-yy') desc";
                parameter1[0] = new OracleParameter(":h.date_journal", OracleDbType.Varchar2, obj.DATE_JOURNAL, ParameterDirection.Input);
                parameter1[1] = new OracleParameter("h.orig_bu", OracleDbType.Varchar2, obj.ORIG_BU, ParameterDirection.Input);
                parameter1[2] = new OracleParameter(" h.bems_fin_ctl", OracleDbType.Varchar2, obj.BEMS_FIN_CTL, ParameterDirection.Input);
                parameter1[3] = new OracleParameter("h.bems_orig", OracleDbType.Varchar2, obj.BEMS_ORIG, ParameterDirection.Input);
                var resultlist = entities.Database.SqlQuery<MctrJrnlByDate>(sqlstmt, parameter1).ToList<MctrJrnlByDate>();
                // var list = AutoMapper.Mapper.DynamicMap<IEnumerable<MCTR_HEADER>, IEnumerable<MctrJrnlByDate>>(resultlist);
                return resultlist;
            }
            catch(Exception e)
            {
                logger.Error("Error from MCTR.DataAccess. MctrJrnlByDateRptBlRepository.getRgToDateLOV()" + e.Message);
                throw;
            }

        }

        ///*************************************************************
        ///<summary>
        ///Method Name : selectionbutRptWhenButtonPressed
        ///</summary>
        ///<param name = "MctrJrnlByDateRptBl"></param>
        ///<returns>IEnumerable<MctrJrnlByDateRptBl> </returns>

        public IEnumerable<MctrJrnlByDate> selectionbutRptWhenButtonPressed(IEnumerable<MctrJrnlByDate> mctrJrnlByDateRptBl)
        {
            logger.Debug("Executing selectionbutRptWhenButtonPressed with input : " + mctrJrnlByDateRptBl);
            try {
                OracleParameter[] parameters = new OracleParameter[10];
              
                //TODO: Move the Data Access logic from the Business implementation class to here.
                return null;
            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.DataAccess. MctrJrnlByDateRptBlRepository.getRgToDateLOV()" + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : selectionbutExcelWhenButtonPressed
        ///</summary>
        ///<param name = "MctrJrnlByDateRptBl"></param>
        ///<returns>IEnumerable<MctrJrnlByDateRptBl> </returns>
        ///-- mctr report extraction query
        ///  -- download pulled data to excel file.
        public IEnumerable<MctrJrnlByDate> selectionbutExcelWhenButtonPressed(IEnumerable<MctrJrnlByDate> mctrJrnlByDateRptBl)
        {
            logger.Debug("Executing selectionbutExcelWhenButtonPressed with input : " + mctrJrnlByDateRptBl);
            try
            {
                OracleParameter[] parameters = new OracleParameter[10];
               
                //TODO: Move the Data Access logic from the Business implementation class to here.
                return null;
            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.DataAccess. MctrJrnlByDateRptBlRepository.getRgToDateLOV()" + e.Message);
                throw;
            }

        }

        ///*************************************************************
        ///<summary>
        ///Method Name : mctrJrnlByDateRptBlWhenWindowClosed
        ///</summary>
        ///<param name = "MctrJrnlByDateRptBl"></param>
        ///<returns>IEnumerable<MctrJrnlByDateRptBl> </returns>

        public IEnumerable<MctrJrnlByDate> mctrJrnlByDateRptBlWhenWindowClosed(IEnumerable<MctrJrnlByDate> mctrJrnlByDateRptBl)
        {
            logger.Debug("Executing mctrJrnlByDateRptBlWhenWindowClosed with input : " + mctrJrnlByDateRptBl);
            try
            {
                OracleParameter[] parameters = new OracleParameter[10];
              
                //TODO: Move the Data Access logic from the Business implementation class to here.
                return null;
            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.DataAccess. MctrJrnlByDateRptBlRepository.getRgToDateLOV()" + e.Message);
                throw;
            }
        }
       
    
  }

}
