using MCTR.DomainEntity;
using MCTR.Web.Handlers;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Web;
using log4net;
using System.Web.Mail;

namespace MCTR.Web.Util
{
    public class EmailNotification
    {
        private readonly ILog logger;

        public EmailNotification()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        }

        public string SendEmail(int MctrNo, string BemsOrig, string ApvrBems, string StatusId, string StatusDescription, string title)
        {
            string retVal = "Mail NOT sent";
            string smtpServer = ConfigurationManager.AppSettings["SMTPHost"].ToString();
            string DBServer = string.Empty;
            string DBEnv = string.Empty;
            string currentEnvironment = string.Empty;


            //logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

            string MCTRWebUrl = HttpContext.Current.Request.Url.ToString();

            try
            {
#if DEBUG
                MCTRWebUrl = "https://mctr-dev.web.boeing.com/MCTRRESTService/api/";
#endif
                logger.Info("MCTRWebUrl : " + MCTRWebUrl);

                string[] MCTRURLSplitArray = MCTRWebUrl.Split('-');

                if (MCTRURLSplitArray.Count() > 0)
                {
                    string[] MCTREnvironmentSplitArray = MCTRURLSplitArray[1].Split('.');
                    if (MCTREnvironmentSplitArray.Count() > 0)
                    {
                        currentEnvironment = MCTREnvironmentSplitArray[0].ToString();
                    }
                }

                switch (currentEnvironment)
                {
                    case "dev":
                        {
                            DBServer = "DB0124D1";
                            DBEnv = "development";
                            break;
                        }
                    case "pre":
                        {
                            DBServer = "DB0124T1";
                            DBEnv = "Test";
                            break;
                        }
                    case "prod":
                        {
                            DBServer = "DB0124D1";
                            DBEnv = "Production";
                            break;
                        }
                    default:
                        {
                            DBServer = ConfigurationManager.AppSettings["URL_DEV"].ToString();
                            break;
                        }
                }

                // Don't attempt an email if there is no smtp server
                if (!string.IsNullOrEmpty(smtpServer))
                {
                    try
                    {
                        // Create Mail object
                        using (System.Net.Mail.MailMessage sendMail = new System.Net.Mail.MailMessage())
                        {
                            // Set properties needed for the email

                            AccountHandler accountHandler = new AccountHandler();

                            MCTREmployeev BemsOrigDetails = accountHandler.UserDeatils(BemsOrig).First();
                            MCTREmployeev ApvrBemsDetails = accountHandler.UserDeatils(ApvrBems).First();

                            MailAddress fromAdd = new MailAddress(BemsOrigDetails.STABLE_EMAIL);
                            sendMail.From = fromAdd;
                            sendMail.To.Add(ApvrBemsDetails.STABLE_EMAIL);

                            //Subject        
                            if (StatusId == "IP")
                            {
                                sendMail.Subject = "MCTR " + MctrNo + " - Journal Notification  (" + title + ")";
                                sendMail.Body = @"Notification from Miscellaneous Cost Transfer Request system  (MCTR) <br /><br />  MCTR " + MctrNo + " requires your action <br /><br /> " + StatusId + " " + StatusDescription + " <br/><br /> MCTR Accountant: " + BemsOrigDetails.LAST_NAME + " " + BemsOrigDetails.FIRST_NAME + "<br /><br /> MCTR link:<br /><br /> http://mctr-dev.web.boeing.com/MCTRWeb <br /><br />***This is a test using MCTRD " + DBEnv + " program.  ***<br /><br />Mail sent from Oracle(" + DBServer + ")";
                            }
                            else if (StatusId == "OR")
                            {
                                sendMail.Subject = "MCTR " + MctrNo + " - Rejection Notification  (" + title + ")";
                                sendMail.Body = @"Notification from Miscellaneous Cost Transfer Request system  (MCTR) <br /><br />  MCTR " + MctrNo + " requires your action <br /><br /> " + StatusId + " " + StatusDescription + " <br/><br /> MCTR Originator: " + BemsOrigDetails.LAST_NAME + " " + BemsOrigDetails.FIRST_NAME + "<br /><br /> MCTR link:<br /><br /> http://mctr-dev.web.boeing.com/MCTRWeb <br /><br />***This is a test using MCTRD " + DBEnv + " program.  ***<br /><br />Mail sent from Oracle(" + DBServer + ")";
                            }
                            else
                            {
                                sendMail.Subject = "MCTR " + MctrNo + " - Approval Notification  (" + title + ")";
                                sendMail.Body = @"Notification from Miscellaneous Cost Transfer Request system  (MCTR) <br /><br />  MCTR " + MctrNo + " requires your action <br /><br /> " + StatusId + " " + StatusDescription + " <br/><br /> MCTR Originator: " + BemsOrigDetails.LAST_NAME + " " + BemsOrigDetails.FIRST_NAME + "<br /><br /> MCTR link:<br /><br /> http://mctr-dev.web.boeing.com/MCTRWeb <br /><br />***This is a test using MCTRD " + DBEnv + " program.  ***<br /><br />Mail sent from Oracle(" + DBServer + ")";
                            }

                            //Body
                            sendMail.IsBodyHtml = true;

                            using (SmtpClient smtpClient = new SmtpClient(smtpServer))
                            {
                                smtpClient.Send(sendMail);
                                retVal = "Mail sent successfully";
                            }
                        }
                    }
                    catch (ConfigurationErrorsException configExp)
                    {
                        retVal = configExp.Message;
                    }
                    catch (FormatException formatExp)
                    {
                        retVal = formatExp.Message;
                    }
                    catch (ArgumentException argExp)
                    {
                        retVal = argExp.Message;
                    }
                    catch (InvalidOperationException invalidExp)
                    {
                        retVal = invalidExp.Message;
                    }
                    catch (System.Net.Mail.SmtpException smtpExp)
                    {
                        retVal = smtpExp.Message;
                    }
                }
            }
            catch (Exception e)
            {

            }
            return retVal;
        }
    }
}