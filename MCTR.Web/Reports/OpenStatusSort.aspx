<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OpenStatusSort.aspx.cs" Inherits="MCTR.Web.Reports.OpenStatusSort" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=12.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager runat="server"></asp:ScriptManager>
        <br />
        <div class="center">
            <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" Font-Size="8pt" WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" DocumentMapWidth="100%"  Height="800px" Width="100%" RightToLeft="YES">
                <LocalReport ReportPath="ReportFiles\OpenStatusSort.rdlc">

                    <DataSources>
                        <rsweb:ReportDataSource />
                    </DataSources>
                </LocalReport>
            </rsweb:ReportViewer>
        </div>
    </form>
</body>
</html>
