using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MCTR.Web.Security
{
    public static class SessionPerister
    {
        static string UserIdSessionvar = "BEMSID";
        static string UserNameSessionvar = "UserName";
        static string ActiveSessionvar = "ACTIVE";
        static string AdminRoleSessionvar = "ADMINROLE";
        static string AccountantRoleSessionvar = "ACCOUNTANTROLE";
        static string LbrAcctRoleSessionvar = "LBRACCTROLE";
        static string CostAcctRoleSessionvar = "COSTACCTROLE";
        static string FinCtrlRoleSessionvar = "FINCTRLROLE";
        static string SrAcctRoleSessionvar = "SRACCTROLE";
        static string matlAcctRoleSessionvar = "MATLACCTROLE";
        static string messageAdminBems = "MESSAGEADMINBEMS";
        static string mctrEnvironment = "MCTRENVIRONMENT";
        static string ipAdress = "IP";

        public static string IP
        {
            get
            {
                if (HttpContext.Current == null)
                    return string.Empty;

                var sessionvar = HttpContext.Current.Session[ipAdress];
                if (sessionvar != null)
                    return sessionvar as string;
                return null;
            }
            set
            {
                HttpContext.Current.Session[ipAdress] = value;
            }
        }

        public static string MCTRENVIRONMENT
        {
            get
            {
                if (HttpContext.Current == null)
                    return string.Empty;

                var sessionvar = HttpContext.Current.Session[mctrEnvironment];
                if (sessionvar != null)
                    return sessionvar as string;
                return null;
            }
            set
            {
                HttpContext.Current.Session[mctrEnvironment] = value;
            }
        }


        public static string MESSAGEADMINBEMS
        {
            get
            {
                if (HttpContext.Current == null)
                    return string.Empty;

                var sessionvar = HttpContext.Current.Session[messageAdminBems];
                if (sessionvar != null)
                    return sessionvar as string;
                return null;
            }
            set
            {
                HttpContext.Current.Session[messageAdminBems] = value;
            }
        }

        public static string BEMSID
        {
            get
            {
                if (HttpContext.Current == null)
                    return string.Empty;

                var sessionvar = HttpContext.Current.Session[UserIdSessionvar];
                if (sessionvar != null)
                    return sessionvar as string;
                return null;
            }
            set
            {
                HttpContext.Current.Session[UserIdSessionvar] = value;
            }
        }
        public static string UserName
        {
            get
            {
                if (HttpContext.Current == null)
                    return string.Empty;

                var sessionvar = HttpContext.Current.Session[UserNameSessionvar];
                if (sessionvar != null)
                    return sessionvar as string;
                return null;
            }
            set
            {
                HttpContext.Current.Session[UserNameSessionvar] = value;
            }
        }

        public static string ADMINROLE
        {
            get
            {
                if (HttpContext.Current == null)
                    return string.Empty;

                var sessionvar = HttpContext.Current.Session[AdminRoleSessionvar];
                if (sessionvar != null)
                    return sessionvar as string;
                return null;
            }
            set
            {
                HttpContext.Current.Session[AdminRoleSessionvar] = value;
            }
        }
        public static string ACCOUNTANTROLE
        {
            get
            {
                if (HttpContext.Current == null)
                    return string.Empty;

                var sessionvar = HttpContext.Current.Session[AccountantRoleSessionvar];
                if (sessionvar != null)
                    return sessionvar as string;
                return null;
            }
            set
            {
                HttpContext.Current.Session[AccountantRoleSessionvar] = value;
            }
        }
        public static string LBRACCTROLE
        {
            get
            {
                if (HttpContext.Current == null)
                    return string.Empty;

                var sessionvar = HttpContext.Current.Session[LbrAcctRoleSessionvar];
                if (sessionvar != null)
                    return sessionvar as string;
                return null;
            }
            set
            {
                HttpContext.Current.Session[LbrAcctRoleSessionvar] = value;
            }
        }
        public static string COSTACCTROLE
        {
            get
            {
                if (HttpContext.Current == null)
                    return string.Empty;

                var sessionvar = HttpContext.Current.Session[CostAcctRoleSessionvar];
                if (sessionvar != null)
                    return sessionvar as string;
                return null;
            }
            set
            {
                HttpContext.Current.Session[CostAcctRoleSessionvar] = value;
            }
        }
        public static string FINCTRLROLE
        {
            get
            {
                if (HttpContext.Current == null)
                    return string.Empty;

                var sessionvar = HttpContext.Current.Session[FinCtrlRoleSessionvar];
                if (sessionvar != null)
                    return sessionvar as string;
                return null;
            }
            set
            {
                HttpContext.Current.Session[FinCtrlRoleSessionvar] = value;
            }
        }
        public static string SRACCTROLE
        {
            get
            {
                if (HttpContext.Current == null)
                    return string.Empty;

                var sessionvar = HttpContext.Current.Session[SrAcctRoleSessionvar];
                if (sessionvar != null)
                    return sessionvar as string;
                return null;
            }
            set
            {
                HttpContext.Current.Session[SrAcctRoleSessionvar] = value;
            }
        }

        public static string ACTIVE
        {
            get
            {
                if (HttpContext.Current == null)
                    return string.Empty;

                var sessionvar = HttpContext.Current.Session[ActiveSessionvar];
                if (sessionvar != null)
                    return sessionvar as string;
                return null;
            }
            set
            {
                HttpContext.Current.Session[ActiveSessionvar] = value;
            }
        }


        public static string MATLACCTROLE
        {
            get
            {
                if (HttpContext.Current == null)
                    return string.Empty;

                var sessionvar = HttpContext.Current.Session[matlAcctRoleSessionvar];
                if (sessionvar != null)
                    return sessionvar as string;
                return null;
            }
            set
            {
                HttpContext.Current.Session[matlAcctRoleSessionvar] = value;
            }
        }


       
    }
}