using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Reflection;
using System.Web.Mvc;
using System.IO;
using MCTR.DomainEntity;
using System.Web.Hosting;
using log4net;

namespace MCTR.Web.Util
{
    public class DocumentsUtil
    {
        private readonly ILog logger;
        public DocumentsUtil()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        }
        public Documents GetDownloadFile(string path) {
            DirectoryInfo di = new DirectoryInfo(path);
            logger.Info("path" + di);
            FileInfo[] files = di.GetFiles();
            var document = new Documents();
            document.DocumentName = files[0].Name;
            if (Directory.Exists(path))
            {
                using (var stream = new FileStream(path + files[0].Name, FileMode.Open))
                {
                    using (var binaryReader = new BinaryReader(stream))
                    {
                        document.DocumentBlob = binaryReader.ReadBytes(Convert.ToInt32(stream.Length));
                    }
                }
                return document;
            }
            else {
                throw new Exception("File Directory not found");
            }
        } 
    }
}