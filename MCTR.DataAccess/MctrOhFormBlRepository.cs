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
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using System.Data;
using log4net;
using Oracle.ManagedDataAccess.Client;

using MCTR.DomainEntity;
using MCTR.DataEntity;
using MCTR.DataAccessInterface;


namespace MCTR.DataAccess
{
    ///*********************************************************************
    ///<summary>
    ///MctrOhFormBlRepository is a data access implementation which holds all 
    ///the data access logic in it.
    ///</summary>
    public class MctrOhFormBlRepository : BaseRepository, IMctrOhFormBlRepository
    {

         private readonly ILog logger;

        public MctrOhFormBlRepository()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : mctrOhMctrOhOnLoad
        ///</summary>
        ///<param name = "MctrOhFormBl"></param>
        ///<returns>IEnumerable<MctrOhFormBl> </returns>

        public IEnumerable<MctrOhFormBl> mctrOhMctrOhOnLoad(IEnumerable<MctrOhFormBl> mctrOhFormBl)
        {
            logger.Debug("Executing mctrOhMctrohOnLoad with input : " + mctrOhFormBl);
            try
            {
                IEnumerable<MCTR_OVRHD> retrievedOh = new List<MCTR_OVRHD>();
                MctrOhFormBl obj = mctrOhFormBl.First();
                List<OracleParameter> paramters = new List<OracleParameter>();
                if (obj.LINE_NO == 0)
                {
                    OracleParameter[] parameter = new OracleParameter[1];
                    parameter[0] = new OracleParameter(":parametermctr_p", OracleDbType.Int32, obj.MCTR_NO, ParameterDirection.Input);


                    var resultlist = entities.MCTR_OVRHD.SqlQuery("select * from mctr_ovrhd where mctr_no = :parametermctr_p ", parameter).ToList<MCTR_OVRHD>();
                    var targetOh = Mapper.DynamicMap<IEnumerable<MCTR_OVRHD>, IEnumerable<MctrOhFormBl>>(resultlist);
                    return targetOh;

                }
                else
                {
                    OracleParameter[] parameter1 = new OracleParameter[5];
                    parameter1[0] = new OracleParameter(":parametermctr_p", OracleDbType.Int32, obj.MCTR_NO, ParameterDirection.Input);
                    parameter1[1] = new OracleParameter(":parameterline_p", OracleDbType.Int32, obj.LINE_NO, ParameterDirection.Input);
                    parameter1[2] = new OracleParameter(":parameterline_p", OracleDbType.Int32, obj.LINE_NO, ParameterDirection.Input);
                    parameter1[3] = new OracleParameter(":parameterfr_to_p", OracleDbType.Varchar2, obj.FROM_TO, ParameterDirection.Input);
                    parameter1[4] = new OracleParameter(":parameterfr_to_p", OracleDbType.Varchar2, obj.FROM_TO, ParameterDirection.Input);

                    var resultlist = entities.MCTR_OVRHD.SqlQuery("select * from mctr_ovrhd where mctr_no = :parametermctr_p and ( line_no = :parameterline_p or :parameterline_p = 0 ) and ( from_to = :parameterfr_to_p or :parameterfr_to_p = 'b' )", parameter1).ToList<MCTR_OVRHD>();
                    var targetOh = Mapper.DynamicMap<IEnumerable<MCTR_OVRHD>, IEnumerable<MctrOhFormBl>>(resultlist);
                    return targetOh;
                }
            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.DataAccess.MctrOffsetFormBlRepository.mctrOffsetMctrOffsetOnLoad():" + e.Message);
                throw;
            }

        }

        ///*************************************************************
        ///<summary>
        ///Method Name : mctrOhFormBlWhenNewFormInstance
        ///</summary>
        ///<param name = "MctrOhFormBl"></param>
        ///<returns>IEnumerable<MctrOhFormBl> </returns>

        public IEnumerable<MctrOhFormBl> mctrOhFormBlWhenNewFormInstance(IEnumerable<MctrOhFormBl> mctrOhFormBl)
        {
            logger.Debug("Executing mctrOhFormBlWhenNewFormInstance with input : " + mctrOhFormBl);
            try {
                OracleParameter[] parameters = new OracleParameter[10];
               
                //TODO: Move the Data Access logic from the Business implementation class to here.
                return null;
            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.DataAccess.MctrOffsetFormBlRepository.mctrOffsetMctrOffsetOnLoad():" + e.Message);
                throw;
            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : mctrOhFormBlWhenWindowClosed
        ///</summary>
        ///<param name = "MctrOhFormBl"></param>
        ///<returns>IEnumerable<MctrOhFormBl> </returns>

        public IEnumerable<MctrOhFormBl> mctrOhFormBlWhenWindowClosed(IEnumerable<MctrOhFormBl> mctrOhFormBl)
        {

            logger.Debug("Executing mctrOhFormBlWhenWindowClosed with input : " + mctrOhFormBl);
            try
            {
                OracleParameter[] parameters = new OracleParameter[10];
             
                //TODO: Move the Data Access logic from the Business implementation class to here.
                return null;
            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.DataAccess.MctrOffsetFormBlRepository.mctrOffsetMctrOffsetOnLoad():" + e.Message);
                throw;
            }
        }


    }

}
