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
    ///MctrAttachBlRepository is a data access implementation which holds all 
    ///the data access logic in it.
    ///</summary>
    public class MctrAttachBlRepository : BaseRepository, IMctrAttachBlRepository //  BaseRepository,
    {

        private readonly ILog logger = null;
        List<MctrAttachBl> response;
        MctrAttachBl mctrAttach;

        public MctrAttachBlRepository()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
            response = new List<MctrAttachBl>();
            mctrAttach = new MctrAttachBl();

        }


        ///*************************************************************
        ///<summary>
        ///Method Name : summaryattachCloseButtonWhenButtonPressed
        ///</summary>
        ///<param name = "MctrAttachBl"></param>
        ///<returns>IEnumerable<MctrAttachBl> </returns>

        public IEnumerable<MctrAttachBl> summaryattachCloseButtonWhenButtonPressed(IEnumerable<MctrAttachBl> mctrAttachBl)
        {
            OracleParameter[] parameters = new OracleParameter[10];
            logger.Debug("Executing MCTR.DataAccess.MctrAttachBlRepository.summaryattachCloseButtonWhenButtonPressed with input : " + mctrAttachBl);
            try
            {
                logger.Error("Recieved Response from  MCTR.DataAccess.MctrAttachBlRepository.summaryattachCloseButtonWhenButtonPressed :");
                return response;
            }

            catch (Exception ex)
            {
                logger.Error("Exception Occured at  MCTR.DataAccess.MctrAttachBlRepository.summaryattachCloseButtonWhenButtonPressed :" + ex);
                throw;

            }
                      
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : mctrAttachattachDescrOnError
        ///</summary>
        ///<param name = "MctrAttachBl"></param>
        ///<returns>IEnumerable<MctrAttachBl> </returns>

        public IEnumerable<MctrAttachBl> mctrAttachattachDescrOnError(IEnumerable<MctrAttachBl> mctrAttachBl)
        {
            OracleParameter[] parameters = new OracleParameter[10];
            logger.Debug("Executing MCTR.DataAccess.MctrAttachBlRepository.mctrAttachattachDescrOnError with input : " + mctrAttachBl);
            try
            {
                logger.Error("Recieved Response from  MCTR.DataAccess.MctrAttachBlRepository.mctrAttachattachDescrOnError :");
                return response;
            }

            catch (Exception ex)
            {
                logger.Error("Exception Occured at  MCTR.DataAccess.MctrAttachBlRepository.mctrAttachattachDescrOnError :" + ex);
                throw;

            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : mctrAttachattachInsertFileWhenButtonPressed
        ///</summary>
        ///<param name = "MctrAttachBl"></param>
        ///<returns>IEnumerable<MctrAttachBl> </returns>

        public IEnumerable<MctrAttachBl> mctrAttachattachInsertFileWhenButtonPressed(IEnumerable<MctrAttachBl> mctrAttachBl)
        {
            OracleParameter[] parameters = new OracleParameter[10];
            logger.Debug("Executing MCTR.DataAccess.MctrAttachBlRepository.mctrAttachattachInsertFileWhenButtonPressed with input : " + mctrAttachBl);
            try
            {
                logger.Error("Recieved Response from  MCTR.DataAccess.MctrAttachBlRepository.mctrAttachattachInsertFileWhenButtonPressed :");
                return response;
            }

            catch (Exception ex)
            {
                logger.Error("Exception Occured at  MCTR.DataAccess.MctrAttachBlRepository.mctrAttachattachInsertFileWhenButtonPressed :" + ex);
                throw;

            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : mctrAttachattachViewFileWhenButtonPressed
        ///</summary>
        ///<param name = "MctrAttachBl"></param>
        ///<returns>IEnumerable<MctrAttachBl> </returns>

        public IEnumerable<MctrAttachBl> mctrAttachattachViewFileWhenButtonPressed(IEnumerable<MctrAttachBl> mctrAttachBl)
        {
            OracleParameter[] parameters = new OracleParameter[2];
            logger.Debug("Executing MCTR.DataAccess.MctrAttachBlRepository. mctrAttachattachViewFileWhenButtonPressed with input : " + mctrAttachBl);
            try
            { 
                StringBuilder query = new StringBuilder("SELECT ATTACH_BLOB,ATTACH_FILENAME  FROM MCTR_ATTACH where MCTR_NO=:0 AND ATTACH_NO=:1");
                parameters[0] = new OracleParameter(":MCTR_NO", OracleDbType.Int32, mctrAttachBl.First().MCTR_NO, ParameterDirection.Input);
                parameters[1] = new OracleParameter(":ATTACH_NO", OracleDbType.Int32, mctrAttachBl.First().ATTACH_NO, ParameterDirection.Input);
                var response = entities.Database.SqlQuery<MctrAttachBl>(query.ToString(), parameters).ToList<MctrAttachBl>();

                logger.Debug("Recieved Response from  MCTR.DataAccess.MctrAttachBlRepository.mctrAttachMctrAttachOnLoad :" + response);
                return response;
            }

            catch (Exception ex)
            {
                logger.Error("Exception Occured at  MCTR.DataAccess.MctrAttachBlRepository.mctrAttachattachViewFileWhenButtonPressed :" + ex);
                throw;

            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : mctrAttachPreInsert
        ///</summary>
        ///<param name = "MctrAttachBl"></param>
        ///<returns>IEnumerable<MctrAttachBl> </returns>

        public int? mctrAttachPreInsert(IEnumerable<MctrAttachBl> mctrAttachBl)
        {
            OracleParameter[] parameters = new OracleParameter[1];
            logger.Debug("Executing MCTR.DataAccess.MctrAttachBlRepository.mctrAttachPreInsert with input : " + mctrAttachBl);
            try
            {
                logger.Error("Recieved Response from  MCTR.DataAccess.MctrAttachBlRepository.mctrAttachPreInsert :");
                
                StringBuilder query = new StringBuilder("SELECT MAX(ATTACH_NO) FROM MCTR_ATTACH where MCTR_NO=:0");
                parameters[0] = new OracleParameter(":MCTR_NO", OracleDbType.Int32, mctrAttachBl.First().MCTR_NO, ParameterDirection.Input);
                var response = entities.Database.SqlQuery<int?>(query.ToString(), parameters).ToList<int?>();

                return response.First() == null ? 1: response.First() + 1;
            }

            catch (Exception ex)
            {
                logger.Error("Exception Occured at  MCTR.DataAccess.MctrAttachBlRepository.mctrAttachPreInsert :" + ex);
                throw;

            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : webutildummyWhenButtonPressed
        ///</summary>
        ///<param name = "MctrAttachBl"></param>
        ///<returns>IEnumerable<MctrAttachBl> </returns>

        public IEnumerable<MctrAttachBl> webutildummyWhenButtonPressed(IEnumerable<MctrAttachBl> mctrAttachBl)
        {
            OracleParameter[] parameters = new OracleParameter[10];
            logger.Debug("Executing MCTR.DataAccess.MctrAttachBlRepository.webutildummyWhenButtonPressed with input : " + mctrAttachBl);
            try
            {
                logger.Error("Recieved Response from  MCTR.DataAccess.MctrAttachBlRepository.webutildummyWhenButtonPressed :");
                return response;
            }

            catch (Exception ex)
            {
                logger.Error("Exception Occured at  MCTR.DataAccess.MctrAttachBlRepository.webutildummyWhenButtonPressed :" + ex);
                throw;

            }
        }

        ///*************************************************************
        ///<summary>
        ///Method Name : mctrAttachBlWhenNewFormInstance
        ///</summary>
        ///<param name = "MctrAttachBl"></param>
        ///<returns>IEnumerable<MctrAttachBl> </returns>

        public IEnumerable<MctrAttachBl> mctrAttachBlWhenNewFormInstance(IEnumerable<MctrAttachBl> mctrAttachBl)
        {
            OracleParameter[] parameters = new OracleParameter[10];
            logger.Debug("Executing MCTR.DataAccess.MctrAttachBlRepository.mctrAttachBlWhenNewFormInstance with input : " + mctrAttachBl);
            try
            {
                logger.Error("Recieved Response from  MCTR.DataAccess.MctrAttachBlRepository.mctrAttachBlWhenNewFormInstance :");
                return response;
            }

            catch (Exception ex)
            {
                logger.Error("Exception Occured at  MCTR.DataAccess.MctrAttachBlRepository.mctrAttachBlWhenNewFormInstance :" + ex);
                throw;

            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : mctrAttachMctrAttachOnLoad
        ///</summary>
        ///<param name = "MctrAttachBl"></param>
        ///<returns>IEnumerable<MctrAttachBl> </returns>

        public IEnumerable<MctrAttachBl> mctrAttachMctrAttachOnLoad(IEnumerable<MctrAttachBl> mctrAttachBl)
        {
            OracleParameter[] parameters = new OracleParameter[1];
            MctrAttachBl mctrAttach = mctrAttachBl.First();
            logger.Debug("Executing MCTR.DataAccess.MctrAttachBlRepository.mctrAttachMctrAttachOnLoad with input : " + mctrAttachBl);
            try
            {

                
                StringBuilder query = new StringBuilder("SELECT MCTR_NO,ATTACH_NO,ATTACH_FILENAME,BEMS,DATE_ENTERED,ATTACH_DESCR FROM MCTR_ATTACH where MCTR_NO=:0");
                parameters[0] = new OracleParameter(":MCTR_NO", OracleDbType.Int32, mctrAttach.MCTR_NO, ParameterDirection.Input); 
                var response = entities.Database.SqlQuery<MctrAttachBl>(query.ToString(), parameters).ToList<MctrAttachBl>();

                logger.Debug("Recieved Response from  MCTR.DataAccess.MctrAttachBlRepository.mctrAttachMctrAttachOnLoad :"+response);
                return response;
            }

            catch (Exception ex)
            {
                logger.Error("Exception Occured at  MCTR.DataAccess.MctrAttachBlRepository.mctrAttachMctrAttachOnLoad :" + ex);
                throw;

            }
        }
        ///*************************************************************
        ///<summary>
        ///Method Name : mctrAttachBlInsert
        ///</summary>
        ///<param name = "MctrAttachBl"></param>
        ///<returns>IEnumerable<MctrAttachBl> </returns>

        public IEnumerable<MctrAttachBl> mctrAttachBlInsert(IEnumerable<MctrAttachBl> mctrAttachBl)
        {
            OracleParameter[] parameters = new OracleParameter[6];
            MctrAttachBl mctrAttach = mctrAttachBl.First();
            

            StringBuilder query;

            logger.Debug("Executing MCTR.DataAccess.MctrAttachBlRepository.mctrAttachBlInsert with input : " + mctrAttachBl);
            try
            {
                var attachments = mctrAttachattachViewFileWhenButtonPressed(mctrAttachBl) as List<MctrAttachBl>;
                
                if (attachments.Any())
                {
                    mctrAttach.ATTACH_FILENAME = mctrAttach.MCTR_NO + "_" + mctrAttach.ATTACH_NO + "_" + mctrAttach.BEMS + "." + (mctrAttach.ATTACH_FILENAME.Split('.')[1]);

                    query = new StringBuilder("UPDATE  MCTR_ATTACH SET ATTACH_FILENAME = :0 ,BEMS= :1, DATE_ENTERED=current_timestamp , ATTACH_BLOB=:2 , ATTACH_DESCR =:3 WHERE MCTR_NO = :4 AND ATTACH_NO = :5;");
                    
                    parameters[0] = new OracleParameter(":ATTACH_FILENAME", OracleDbType.Varchar2, mctrAttach.ATTACH_FILENAME, ParameterDirection.Input);
                    parameters[1] = new OracleParameter(":BEMS", OracleDbType.Varchar2, mctrAttach.BEMS, ParameterDirection.Input);
                    parameters[2] = new OracleParameter(":ATTACH_BLOB", OracleDbType.Blob, mctrAttach.ATTACH_BLOB, ParameterDirection.Input);
                    parameters[3] = new OracleParameter(":ATTACH_DESCR", OracleDbType.Varchar2, mctrAttach.ATTACH_DESCR, ParameterDirection.Input);
                    parameters[4] = new OracleParameter(":MCTR_NO", OracleDbType.Int32, mctrAttach.MCTR_NO, ParameterDirection.Input);
                    parameters[5] = new OracleParameter(":ATTACH_NO", OracleDbType.Int16, 1, ParameterDirection.Input);
                }
                else
                {
                    var attachNo = mctrAttachPreInsert(mctrAttachBl);
                    mctrAttach.ATTACH_FILENAME = mctrAttach.MCTR_NO + "_" + attachNo + "_" + mctrAttach.BEMS + "." + (mctrAttach.ATTACH_FILENAME.Split('.')[1]);
                    query = new StringBuilder("INSERT INTO MCTR_ATTACH(MCTR_NO, ATTACH_NO, ATTACH_FILENAME, BEMS, DATE_ENTERED, ATTACH_DESCR, ATTACH_BLOB)  VALUES(:0,:1,:2,:3,current_timestamp,:4,:5);");
                    
                    parameters[0] = new OracleParameter(":MCTR_NO", OracleDbType.Int32, mctrAttach.MCTR_NO, ParameterDirection.Input);
                    parameters[1] = new OracleParameter(":ATTACH_NO", OracleDbType.Int16, attachNo, ParameterDirection.Input);
                    parameters[2] = new OracleParameter(":ATTACH_FILENAME", OracleDbType.Varchar2, mctrAttach.ATTACH_FILENAME, ParameterDirection.Input);
                    parameters[3] = new OracleParameter(":BEMS", OracleDbType.Varchar2, mctrAttach.BEMS, ParameterDirection.Input);
                    parameters[4] = new OracleParameter(":ATTACH_DESCR", OracleDbType.Varchar2, mctrAttach.ATTACH_DESCR, ParameterDirection.Input);
                    parameters[5] = new OracleParameter(":ATTACH_BLOB", OracleDbType.Blob, mctrAttach.ATTACH_BLOB, ParameterDirection.Input);
                    
                }
                var result = entities.Database.ExecuteSqlCommand("BEGIN " + query.ToString() + " END;", parameters);
                mctrAttach.ATTACH_BLOB = null;
                response.Add(mctrAttach);
                logger.Debug("Recieved Response from  MCTR.DataAccess.MctrAttachBlRepository.mctrAttachBlInsert :");
                return response;
            }

            catch (Exception ex)
            {
                logger.Error("Exception Occured at  MCTR.DataAccess.MctrAttachBlRepository.mctrAttachBlInsert :" + ex);
                throw;

            }
        }
    }
}