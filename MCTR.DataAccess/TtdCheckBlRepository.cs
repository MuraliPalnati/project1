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

using System;
using System.Collections.Generic;
using System.Linq;
using MCTR.DataEntity;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using System.Data;
using log4net;
using Oracle.ManagedDataAccess.Client;
using MCTR.DataAccess;

using MCTR.DomainEntity;

using MCTR.DataAccessInterface;


namespace MCTR.DataAccess
{
    ///*********************************************************************
    ///<summary>
    ///TtdCheckBlRepository is a data access implementation which holds all 
    ///the data access logic in it.
    ///</summary>

    public class TtdCheckBlRepository : BaseRepository, ITtdCheckBlRepository
    {
    
    private readonly ILog logger = null;
    
    public TtdCheckBlRepository()
    {
      logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
    }
        ///*************************************************************
        ///<summary>
        ///Method Name : ttdCheckPostQuery
        ///</summary>
        ///<param name = "TtdCheckBl"></param>
        ///<returns>IEnumerable<TtdCheckBl> </returns>
        //Method contains query to be excecuted on load
        public IEnumerable<TtdCheckBl> ttdCheckTtdCheckOnLoad(IEnumerable<TtdCheckBl> ttdCheckBl)
        {
            logger.Debug("Executing ttdCheckTtdCheckOnLoad with input : " + ttdCheckBl);
 

            IEnumerable<MCTR_TTD_BACKUP> retrievedTtd = new List<MCTR_TTD_BACKUP>();
            TtdCheckBl obj = ttdCheckBl.First();
                  

            List<OracleParameter> paramters = new List<OracleParameter>();

            OracleParameter[] parameter1 = new OracleParameter[2];
            parameter1[0] = new OracleParameter(":mctrno", OracleDbType.Int32, obj.MCTR_NO, ParameterDirection.Input);
            parameter1[1] = new OracleParameter(":lineno", OracleDbType.Int32, obj.LINE_NO, ParameterDirection.Input);
            var resultlist = entities.MCTR_TTD_BACKUP.SqlQuery("select * from mctr_ttd_backup where MCTR_NO= :0 and LINE_NO= :1",parameter1).ToList<MCTR_TTD_BACKUP>();
            var targetTtd = Mapper.DynamicMap<IEnumerable<MCTR_TTD_BACKUP>, IEnumerable<TtdCheckBl>>(resultlist);
            return targetTtd;
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : ttdCheckBlWhenNewFormInstance
        ///</summary>
        ///<param name = "TtdCheckBl"></param>
        ///<returns>IEnumerable<TtdCheckBl> </returns>
        //Method contains query to be excecuted on post query
        public IEnumerable<TtdCheckBl> ttdCheckPostQuery(IEnumerable<TtdCheckBl> ttdCheckBl)
        {
            
            OracleParameter[] parameters = new OracleParameter[10];
            logger.Debug("Executing ttdCheckPostQuery with input : " + ttdCheckBl);
            //TODO: Move the Data Access logic from the Business implementation class to here.
            return null;
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : ttdCheckBlWhenNewFormInstance
        ///</summary>
        ///<param name = "TtdCheckBl"></param>
        ///<returns>IEnumerable<TtdCheckBl> </returns>
        //Method contains query to be excecuted on new form instance
        public IEnumerable<TtdCheckBl> ttdCheckBlWhenNewFormInstance(IEnumerable<TtdCheckBl> ttdCheckBl)
        {
            OracleParameter[] parameters = new OracleParameter[10];
            logger.Debug("Executing ttdCheckBlWhenNewFormInstance with input : " + ttdCheckBl);
            //TODO: Move the Data Access logic from the Business implementation class to here.
            //go_block("ttd_check")
            //execute_query
            return null;
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : ttdCheckBlWhenWindowClosed
        ///</summary>
        ///<param name = "TtdCheckBl"></param>
        ///<returns>IEnumerable<TtdCheckBl> </returns>
        //Method contains query to be excecuted on window closed.
        public IEnumerable<TtdCheckBl> ttdCheckBlWhenWindowClosed(IEnumerable<TtdCheckBl> ttdCheckBl)
        {
            OracleParameter[] parameters = new OracleParameter[10];
            logger.Debug("Executing ttdCheckBlWhenWindowClosed with input : " + ttdCheckBl);
            //TODO: Move the Data Access logic from the Business implementation class to here.
            return null;
        }


    }

}

