using log4net;
using MCTR.DataAccessInterface;
using MCTR.DataEntity;
using MCTR.DomainEntity;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AutoMapper;
using System.Net;
using System.Diagnostics;
using System.Text;
using System.Web;

namespace MCTR.DataAccess
{
    public class AccountRepository : BaseRepository, IAccountRepository
    {
        private readonly List<RoleList> responseList = new List<RoleList>();
        private readonly ILog logger;
        public AccountRepository()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        }
        public IEnumerable<RoleList> AccountDetails(IEnumerable<RoleList> roleList)
        {
            RoleList roleObj = new RoleList();
            string ipAdress = string.Empty;
            string idBems = string.Empty;
            idBems = roleList.First().bems;
            if (roleList.First().bems[0]=='0')
            {
               idBems = roleList.First().bems[1].ToString() + roleList.First().bems[2].ToString() + roleList.First().bems[3].ToString() + roleList.First().bems[4].ToString() + roleList.First().bems[5].ToString() + roleList.First().bems[6].ToString();
            }
            if (roleList.First().bems[0] == '0' && roleList.First().bems[1] == '0')
            {
                idBems = roleList.First().bems[2].ToString() + roleList.First().bems[3].ToString() + roleList.First().bems[4].ToString() + roleList.First().bems[5].ToString() + roleList.First().bems[6].ToString();
            }
            if (roleList.First().bems[0] == '0' && roleList.First().bems[1] == '0' && roleList.First().bems[2]=='0')
            {
                idBems = roleList.First().bems[3].ToString() + roleList.First().bems[4].ToString() + roleList.First().bems[5].ToString() + roleList.First().bems[6].ToString();
            }


            roleObj.messageEnv = new Dictionary<string, string>();
            roleObj.messageEnv.Clear();

            OracleParameter[] parameterDel = new OracleParameter[1];
            //string hostName = Dns.GetHostName();          
            //string ip = Dns.GetHostByName(hostName).AddressList[0].ToString();
            try
            {
                StringBuilder ipquery = new StringBuilder("select TOKEN from MCTR_TOKEN where bems=:0 and DATE_TIME_EXPIRES=(select  MAX(DATE_TIME_EXPIRES) from MCTR_TOKEN where bems=:0) and rownum = 1");
                parameterDel[0] = new OracleParameter(":0", OracleDbType.Varchar2, idBems, ParameterDirection.Input);
                string ipToken = entities.Database.SqlQuery<string>(ipquery.ToString(), parameterDel).SingleOrDefault();
                ipAdress = ipToken;
                OracleParameter[] parameterDelete = new OracleParameter[2];
                StringBuilder queryDel = new StringBuilder("delete from mctr_token mt where bems = ltrim(:0, '0') and token <> :ip and date_time_expires < (sysdate - 100) and date_time_expires <> (select max(date_time_expires) from mctr_token where bems = mt.bems and token <> :ip)");
                parameterDelete[0] = new OracleParameter(":0", OracleDbType.Varchar2, idBems, ParameterDirection.Input);
                parameterDelete[1] = new OracleParameter(":ip", OracleDbType.Varchar2, ipToken, ParameterDirection.Input);
                var resultip = entities.Database.ExecuteSqlCommand(queryDel.ToString(), parameterDelete);
            }
            catch (Exception e)
            {
               
            }
            try
            {
                StringBuilder query3 = new StringBuilder("select count(*) as v_role_count from mctr_role where bems = :0 and active = 'Y'");
                parameterDel[0] = new OracleParameter(":0", OracleDbType.Varchar2, roleList.First().bems, ParameterDirection.Input);
                int v_role_count = entities.Database.SqlQuery<int>(query3.ToString(), parameterDel).SingleOrDefault();
                roleObj.messageEnv.Add("rolecount", Convert.ToString(v_role_count));
                if (v_role_count == 0)
                {
                    string connString = string.Empty;
                    string currentEnvironment = string.Empty;
                    string MCTRRestUrl = HttpContext.Current.Request.Url.ToString();
//#if DEBUG
                   // MCTRRestUrl = "https://mctr-dev.web.boeing.com/MCTRRESTService/api/";
//#endif
                    string[] MCTRURLSplitArray = MCTRRestUrl.Split('-');

                    if (MCTRURLSplitArray.Count() > 0)
                    {
                        string[] MCTREnvironmentSplitArray = MCTRURLSplitArray[1].Split('.');
                        if (MCTREnvironmentSplitArray.Count() > 0)
                        {
                            currentEnvironment = MCTREnvironmentSplitArray[0].ToString();
                        }
                    }

                    if (currentEnvironment == "dev")
                    {
                        //roleObj.messageEnv.Add("dev", "you are not an active registered mctr development user. please see your mctr accounting admin focal.");
                        roleObj.accountvalid = "you are not an active registered mctr development user. please see your mctr accounting admin focal.";
                        responseList.Add(roleObj);


                    }
                    else if (currentEnvironment == "pre")
                    {
                        //roleObj.messageEnv.Add("pre", "you are not an active registered mctr integrated test user. please see your mctr accounting admin focal.");
                        roleObj.accountvalid = "you are not an active registered mctr integrated test user. please see your mctr accounting admin focal.";
                        responseList.Add(roleObj);

                    }
                    else if (currentEnvironment == "prod")
                    {
                        //roleObj.messageEnv.Add("prod", "you are not an active registered mctr production user. please see your mctr accounting admin focal.");
                        roleObj.accountvalid = "you are not an active registered mctr production user. please see your mctr accounting admin focal.";
                        responseList.Add(roleObj);

                    }
                    var result = entities.MCTR_EMPLOYEE_V.SqlQuery("select * from MCTR_OWNER.MCTR_EMPLOYEE_V where bems_id = " + roleList.First().bems + " order by bems_id").ToList();
                    foreach (var employee in result)
                    {
                        roleObj.last_name = employee.LAST_NAME;
                        roleObj.first_name = employee.FIRST_NAME;
                        responseList.Add(roleObj);
                    }
                        return responseList;

                }

                else
                {
                    var response = entities.MCTR_ROLE.SqlQuery("select * from mctr_role where bems = " + roleList.First().bems + " order by bems").ToList();
                    var resp2 = entities.Database.SqlQuery<MCTR_MESSAGE_ADMIN>("select BEMS_ID  from mctr_message_admin").ToList();
                    roleObj.msgadmin = null;
                    foreach (var e in resp2)

                    {
                        if (e.BEMS_ID == roleList.First().bems)
                        {
                            roleObj.msgadmin = e.BEMS_ID;
                        }

                    }

                    if (roleList != null)
                    {
                        if (response != null)
                        {
                            foreach (var emprole in response)
                            {

                                roleObj.accountant_role = emprole.ACCOUNTANT_ROLE;
                                roleObj.active = emprole.ACTIVE;
                                roleObj.admin_role = emprole.ADMIN_ROLE;
                                roleObj.bems_admin = emprole.BEMS_ADMIN;
                                roleObj.cost_acct_role = emprole.COST_ACCT_ROLE;
                                roleObj.fin_control_role = emprole.FIN_CONTROL_ROLE;
                                roleObj.lbr_acct_role = emprole.LBR_ACCT_ROLE;
                                roleObj.matl_acct_role = emprole.MATL_ACCT_ROLE;
                                roleObj.sr_acct_role = emprole.SR_ACCT_ROLE;
                                roleObj.bems = emprole.BEMS;
                                roleObj.date_init_add = emprole.DATE_INIT_ADD;
                                roleObj.date_update = emprole.DATE_UPDATE;
                                roleObj.last_bu = emprole.LAST_BU;
                                roleObj.last_dept = emprole.LAST_DEPT;
                                roleObj.last_loc = emprole.LAST_LOC;
                                roleObj.last_logon = emprole.LAST_LOGON;
                                roleObj.last_logon_days = Math.Round((DateTime.Now - (Convert.ToDateTime(emprole.LAST_LOGON))).TotalDays).ToString(System.Globalization.CultureInfo.CurrentCulture);
                                roleObj.ovrrd_grp_cd = emprole.OVRRD_GRP_CD;
                                roleObj.ip = ipAdress;
                                var result = entities.MCTR_EMPLOYEE_V.SqlQuery("select * from MCTR_OWNER.MCTR_EMPLOYEE_V where bems_id = " + roleList.First().bems + " order by bems_id").ToList();
                                foreach (var employee in result)
                                {
                                    roleObj.last_name = employee.LAST_NAME;
                                    roleObj.first_name = employee.FIRST_NAME;
                                    roleObj.bus_unit = employee.BUS_UNIT;
                                    roleObj.component = employee.COMPONENT;
                                    roleObj.acctg_bus_unit_nm = employee.ACCTG_BUS_UNIT_NM;
                                    roleObj.acctg_loc_cdm = employee.ACCTG_LOC_CDM;
                                    roleObj.acct_dept_nm = employee.ACCT_DEPT_NM;
                                    roleObj.contract_vendor_code = employee.CONTRACT_VENDOR_CODE;
                                    roleObj.deptno = employee.DEPTNO;
                                    roleObj.dept_nmw = employee.DEPT_NMW;
                                    roleObj.division = employee.DIVISION;
                                    roleObj.emp_status = employee.EMP_STATUS;
                                    roleObj.hr_mgr_first_name = employee.HR_MGR_FIRST_NAME;
                                    roleObj.hr_mgr_last_name = employee.HR_MGR_LAST_NAME;
                                    roleObj.la_mgr_first_name = employee.LA_MGR_FIRST_NAME;
                                    roleObj.la_mgr_id_bems = employee.LA_MGR_ID_BEMS;
                                    roleObj.la_mgr_last_name = employee.LA_MGR_LAST_NAME;
                                    roleObj.location = employee.LOCATION;
                                    roleObj.mail_code = employee.MAIL_CODE;
                                    roleObj.middle_int = employee.MIDDLE_INT;
                                    roleObj.mgr_id = employee.MGR_ID;
                                    roleObj.work_phone = employee.WORK_PHONE;
                                    roleObj.stable_email = employee.STABLE_EMAIL;

                                }

                                responseList.Add(roleObj);
                            }
                            if (responseList != null)
                            {
                                try
                                {
                                    OracleParameter[] parameter = new OracleParameter[1];
                                    string query = "UPDATE MCTR_ROLE SET LAST_LOGON = CURRENT_TIMESTAMP WHERE BEMS =:0;";
                                    parameter[0] = new OracleParameter(":BEMS", OracleDbType.Varchar2, roleList.First().bems, ParameterDirection.Input);
                                    entities.Database.ExecuteSqlCommand("BEGIN " + query + " END;", parameter);
                                }
                                catch (Exception e)
                                {
                                    logger.Error("Error from  Mctr.DataAccess.AccountRepository.AccountDetails():" + e.Message);
                                    throw;
                                }
                            }

                            return responseList;
                        }
                        else
                        {
                            return null;
                        }
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            catch (Exception e)
            {
                logger.Error("Error from MCTR.DataAccess.LineItemRepository.mctrLineItemPostQuery" + e.Message);
                throw;
            }
        }
        public IEnumerable<MCTREmployeev> UserDetails(IEnumerable<string> BEMS)
        {
            try
            {
                string query = "select * from MCTR_EMPLOYEE_V where BEMS_ID=" + BEMS.First() + "";
                var response = entities.MCTR_EMPLOYEE_V.SqlQuery(query).ToList<MCTR_EMPLOYEE_V>();
                var result = Mapper.DynamicMap<IEnumerable<MCTR_EMPLOYEE_V>, IEnumerable<MCTREmployeev>>(response);
                return result;
            }
            catch (Exception e)
            {
                logger.Error("Error from  Mctr.DataAccess.MctrLogAcctRepository.mctrHeaderMctrHeaderOnLoad():" + e.Message);
                throw;
            }
        }
    }
}
