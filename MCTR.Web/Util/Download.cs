using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Windows.Forms;

namespace MCTR.Web.Util
{
    public class Download 
    {
        public System.Data.DataTable ToDataTable<T>(List<T> items)
        {
            System.Data.DataTable dataTable = new System.Data.DataTable(typeof(T).Name);

            //Get all the properties
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Setting column names as Property names
                dataTable.Columns.Add(prop.Name);

            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int iCount = 0; iCount < Props.Length; iCount++)
                {
                    //inserting property values to datatable rows
                    values[iCount] = Props[iCount].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            //put a breakpoint here and check datatable
            dataTable.Rows.Add();
            return dataTable;
        }

        public void ExportDataTableToExcel(DataSet dtObjects, string filname)
        {
            // create the DataGrid and perform the databinding
            System.Web.UI.WebControls.DataGrid grid =
                        new System.Web.UI.WebControls.DataGrid();
            grid.HeaderStyle.Font.Bold = true;
            grid.DataSource = dtObjects;

            grid.DataBind();

            // render the DataGrid control to a file
            using (StreamWriter sw = new StreamWriter("d:\\" + filname + "Report.xls"))
            {
                using (HtmlTextWriter hw = new HtmlTextWriter(sw))
                {
                    grid.RenderControl(hw);
                }
            }
            grid.Dispose();

        } 

        public string ExportExcelData(System.Data.DataTable[] dts, string filename)
        {
            string file = filename;
            System.Data.DataTable[] d = dts;
            System.Web.UI.WebControls.DataGrid grid = new System.Web.UI.WebControls.DataGrid();
            System.Data.DataTable dobj = new System.Data.DataTable();
            int iCol = 0, iRow = 0, i = 0;
            List<string> arr = new List<string>();
            string[] header;
            foreach (System.Data.DataTable de in d)
            {
                i++;
                iCol = 0;
                arr.Clear();
                dobj.Columns.Add();

                foreach (DataColumn c in de.Columns)
                {
                    iCol++;
                    dobj.Columns.Add();
                    arr.Add(c.ColumnName);
                }
                header = arr.ToArray();
                dobj.Rows.Add(header);
                foreach (DataRow f in de.Rows)
                {
                    dobj.Rows.Add(f.ItemArray);
                    iRow++;
                }
            }

            grid.DataSource = dobj;
            grid.ShowHeader = false;
            grid.DataBind();
            dobj.Dispose();
            var response = "";
            using (StringWriter sw = new StringWriter() )
            {
                using (HtmlTextWriter hw = new HtmlTextWriter(sw))
                {
                    grid.RenderControl(hw);
                }
                response = sw.ToString();
            }
           return response;
        }

        public string ToCsv(DataTable[] dts, bool addHeaders)
        {
            var sb = new StringBuilder();
            foreach (var dt in dts)
            {

                //Add Header Header
                if (addHeaders)
                {
                    for (var x = 0; x < dt.Columns.Count; x++)
                    {
                        if (x != 0)
                            sb.Append(",");
                        sb.Append(dt.Columns[x].ColumnName);
                    }
                    sb.AppendLine();
                }
                //Add Rows
                foreach (DataRow row in dt.Rows)
                {
                    for (var x = 0; x < dt.Columns.Count; x++)
                    {
                        if (x != 0)
                            sb.Append(",");
                        sb.Append(row[dt.Columns[x]]);
                    }
                    sb.AppendLine();
                }

                sb.AppendLine();

            }
            return sb.ToString();
        }

    }


}