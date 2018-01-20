using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCTR.DomainEntity
{
    public class RptJrnlbyDate
    {
        public string ORIGGRP { get; set; }
        public string ORIGBU { get; set; }
        public short JRNLYEAR { get; set; }
        public string DATEJRNLD { get; set; }
        public string APPLJRNLID { get; set; }
        public string JVITEMCD { get; set; }
        public string DATEENTER { get; set; }
        public string STATUSID { get; set; }
        public short OHBASEYR { get; set; }
        public Nullable<int> MCTRNO { get; set; }
        public Nullable<int> LICNTED { get; set; }
        public Nullable<int> LASTLINO { get; set; }
        public string ABSOLUTEQTY { get; set; }
        public string ABSOLUTEAMT { get; set; }
        public string BALANCE { get; set; }
        public string LIFROMQTY { get; set; }
        public string LIFROMAMT { get; set; }
        public string OHFROMAMT { get; set; }
        public string LITOQTY { get; set; }
        public string LITOAMT { get; set; }
        public string OHTOAMT { get; set; }
        public string OFFSETAMT { get; set; }
        public string BEMS_ORIG { get; set; }
        public string ORIG_LNAME { get; set; }
        public string ORIG_FNAME { get; set; }
        public string BEMSFINCTL { get; set; }        
        public string FINCTLLNAME { get; set; }
        public string FINCTLFNAME { get; set; }
        public Nullable<int> PROGDAYSHIST { get; set; }
        public Nullable<int> ACCTDAYSHIST { get; set; }
        public Nullable<int> TOTALDAYS { get; set; }       
        public string REASONCODE { get; set; }
        public string REASONDESCR { get; set; }
        public string TITLE { get; set; }



        //public string BEMSFINCTL_1 { get; set; }
        //public string ORIGLNAME { get; set; }
        //public string ORIGFNAME { get; set; }
       // public string BEMSORIG { get; set; }
        //public Nullable<DateTime> DATEJRNLDFROM { get; set; }
        //public Nullable<DateTime> DATEJRNLDTO { get; set; }
    }
}
