using System.Collections.Generic;
using MCTR.DomainEntity;

namespace MCTR.BusinessInterface
{

    public interface IMctrCreateFormBusiness
    {
        /// <summary>
        /// 338
        /// </summary>
        /// <param name="mctrCreateForm"></param>
        /// <returns></returns>


        ///*************************************************************
        ///<summary>
        ///Method Name : mctrLineItemactivityIdFromPreTextItem
        ///</summary>
        ///<param name = "MctrCreateForm"></param>
        ///<returns>IEnumerable<MctrCreateForm> </returns>
        IEnumerable<MctrCreateForm> mctrLineItemactivityIdFromPreTextItem(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> manRatedFlag(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrLineItem> mctrLineItemPreDelete(IEnumerable<MctrLineItem> mctrCreateForm);
        IEnumerable<HeaderExcel> mctrheaderbuttoxlswhenbuttonpressed(IEnumerable<HeaderExcel> mctrCreateForm);
        IEnumerable<MctrCreateForm> mctrLineItemclassCdToPostTextItemOpenLOV(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> mctrLineItemestmtgPricgCdToPostTextItemOpenLOV(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> mctrLineItemrscToPostTextItemOpenLOV(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> submitBtnmctrLineItemquantityFromPostTextItem(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> mctrLineItemworkLocToPostTextItemOpenLOV(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> mctrLineItemworkDeptToPostTextItemOpenLOV(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrRejectCode> getRgLOVReject(IEnumerable<MctrRejectCode> mctrRejectCode);
        IEnumerable<MctrCreateForm> mctrLineItemhomeBuglToPostTextItem(IEnumerable<MctrCreateForm> mctrCreateForm);

        IEnumerable<MctrCreateForm> mctrLineItemaccountToPostTextItem(IEnumerable<MctrCreateForm> mctrCreateForm);

        IEnumerable<MctrCreateForm> mctrLineItemestmtgPricgCdFromPostTextItemOpenLOV(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> mctrLineItemquantityFromPostTextItem(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> mctrLineItemhomeDeptToPostTextItemOpenLOV(IEnumerable<MctrCreateForm> mctrCreateForm);

        IEnumerable<MctrCreateForm> mctrLineItemhomeLocToPostTextItemOpenLOV(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> mctrLineItembutCopyWhenButtonPressed(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> mctrHeaderbutJustificationWhenButtonPressed(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrLineItem> mctrLineItemInsert(IEnumerable<MctrLineItem> mctrLineItem);
        IEnumerable<MctrLineItem> mctrLineItemDelete(IEnumerable<MctrLineItem> mctrCreateForm);
        IEnumerable<MctrCreateForm> justificationsave(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrLineiteminquiry> ttdInqCyrTtdInqCyrOnLoad(IEnumerable<MctrLineiteminquiry> mctrlineitem);

        IEnumerable<MctrLineiteminquiry> ttdInqPyrTtdInqPyrOnLoad(IEnumerable<MctrLineiteminquiry> mctrlineitem);

        IEnumerable<MctrLineiteminquiry> ttdInqFilter(IEnumerable<MctrLineiteminquiry> mctrlineitem);
        IEnumerable<MctrCreateForm> mctrHeaderbutUnjrnlWhenButtonPressed(IEnumerable<MctrCreateForm> mctrCreateForm);

        IEnumerable<MctrCreateForm> mctrHeaderonLoad(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> mctrHeaderbutJrnlWhenButtonPressed(IEnumerable<MctrCreateForm> mctrCreateForm);

        ///*************************************************************
        ///<summary>
        ///Method Name : mctrLineItemperiodFromOnError
        ///</summary>
        ///<param name = "MctrCreateForm"></param>
        ///<returns>IEnumerable<MctrCreateForm> </returns>
        IEnumerable<MctrCreateForm> mctrLineItemperiodFromOnError(IEnumerable<MctrCreateForm> mctrCreateForm);

        IEnumerable<MctrLineItem> mctrLineItemOnLoad(IEnumerable<MctrLineItem> LineItem);
        ///*************************************************************
        ///<summary>
        ///Method Name : mctrLineItemperiodToOnError
        ///</summary>
        ///<param name = "MctrCreateForm"></param>
        ///<returns>IEnumerable<MctrCreateForm> </returns>
        IEnumerable<MctrCreateForm> mctrLineItemperiodToOnError(IEnumerable<MctrCreateForm> mctrCreateForm);


        ///*************************************************************
        ///<summary>
        ///Method Name : mctrLineItemhomeDeptFromPreTextItem
        ///</summary>
        ///<param name = "MctrCreateForm"></param>
        ///<returns>IEnumerable<MctrCreateForm> </returns>
        IEnumerable<MctrCreateForm> mctrLineItemhomeDeptFromPreTextItem(IEnumerable<MctrCreateForm> mctrCreateForm);


        ///*************************************************************
        ///<summary>
        ///Method Name : mctrLineItemhomeLocFromPreTextItem()
        ///</summary>
        ///<param name = "MctrCreateForm"></param>
        ///<returns>IEnumerable<MctrCreateForm> </returns>
        IEnumerable<MctrCreateForm> mctrLineItemhomeLocFromPreTextItem(IEnumerable<MctrCreateForm> mctrCreateForm);



        IEnumerable<MctrCreateForm> mctrHeaderPreUpdate(IEnumerable<MctrCreateForm> mctrCreateForm);


        ///*************************************************************
        ///<summary>
        ///Method Name : getRgBuGrpLOV()
        ///</summary>
        ///<param name = "MctrCreateForm"></param>
        ///<returns>IEnumerable<MctrCreateForm> </returns>
        IEnumerable<BusUnit> getRgBuGrpLOV(IEnumerable<MctrCreateForm> mctrCreateForm);


        ///*************************************************************
        ///<summary>
        ///Method Name : getRgYearLOV()
        ///</summary>
        ///<param name = "MctrCreateForm"></param>
        ///<returns>IEnumerable<MctrCreateForm> </returns>
        IEnumerable<MctrCreateForm> getRgYearLOV(IEnumerable<MctrCreateForm> mctrCreateForm);


        ///*************************************************************
        ///<summary>
        ///Method Name : getRgReasonLOV()
        ///</summary>
        ///<param name = "MctrCreateForm"></param>
        ///<returns>IEnumerable<MctrCreateForm> </returns>
        IEnumerable<MctrCreateForm> getRgReasonLOV(IEnumerable<MctrCreateForm> mctrCreateForm);


        ///*************************************************************
        ///<summary>
        ///Method Name : getRgApplLOV()
        ///</summary>
        ///<param name = "MctrCreateForm"></param>
        ///<returns>IEnumerable<MctrCreateForm> </returns>
        IEnumerable<MctrCreateForm> getRgApplLOV(IEnumerable<MctrCreateForm> mctrCreateForm);


        ///*************************************************************
        ///<summary>
        ///Method Name : getRgSuperLOV()
        ///</summary>
        ///<param name = "MctrCreateForm"></param>
        ///<returns>IEnumerable<MctrCreateForm> </returns>
        IEnumerable<MctrCreateForm> getRgSuperLOV(IEnumerable<MctrCreateForm> mctrCreateForm);

        IEnumerable<MctrCreateForm> mctrHeaderPreInsert(IEnumerable<MctrCreateForm> mctrCreateForm);


        IEnumerable<MctrCreateForm> MctrHeaderOnLoad(IEnumerable<MctrCreateForm> mctrCreateForm);


        IEnumerable<MctrCreateForm> mctrHeaderbutSubmitWhenButtonPressed(IEnumerable<MctrCreateForm> mctrCreateForm);

        IEnumerable<MctrCreateForm> mctrLineItemamountToPostTextItem(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> mctrLineItemPostUpdate(IEnumerable<MctrCreateForm> mctrCreateForm);

        IEnumerable<MctrCreateForm> mctrLineItemPostDelete(IEnumerable<MctrCreateForm> mctrCreateForm);

        IEnumerable<MctrCreateForm> mctrLineItemPreUpdate(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> mctrLineItemPostInsert(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> mctrLineItemPreInsert(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> mctrLineItemPostQuery(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> pycystatuscheckbubut(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> fyearperiodvalidation(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> validApprover(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> mctrLineItemaccountFromPostTextItem(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> mctrLineItemaffiliateFromPostTextItemOpenLOV(IEnumerable<MctrCreateForm> mctrCreateForm);

        IEnumerable<MctrCreateForm> mctrLineItemClassCditemOpenLOV(IEnumerable<MctrCreateForm> mctrCreateForm);

        IEnumerable<MctrCreateForm> mctrLineItemhomeLocFromPostTextItemOpenLOV(IEnumerable<MctrCreateForm> mctrCreateForm);

        IEnumerable<MctrCreateForm> mctrLineItemhomeDeptFromPostTextItemOpenLOV(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> mctrLineItemwpdFromPostTextItemOpenLOV(IEnumerable<MctrCreateForm> MctrCreateForm);

        IEnumerable<MctrCreateForm> mctrLineItemrscFromPostTextItemOpenLOV(IEnumerable<MctrCreateForm> MctrCreateForm);

        IEnumerable<MctrCreateForm> mctrLineItemworkLocFromPostTextItemOpenLOV(IEnumerable<MctrCreateForm> MctrCreateForm);

        IEnumerable<MctrCreateForm> mctrLineItemworkDeptFromPostTextItemOpenLOV(IEnumerable<MctrCreateForm> MctrCreateForm);
        IEnumerable<BuProfile> mctrLineItembulkFromPostTextItemOpenLOVBulkFlag(IEnumerable<BuProfile> BuProfile);
        IEnumerable<MctrCreateForm> mctrLineItembulkFromPostTextItemOpenLOV(IEnumerable<MctrCreateForm> MctrCreateForm);

        IEnumerable<MctrCreateForm> mctrLineItembutBulkWhenButtonPressedOpenLOV(IEnumerable<MctrCreateForm> MctrCreateForm);

        IEnumerable<MctrCreateForm> mctrLineItembutWpdWhenButtonPressedOpenLOV(IEnumerable<MctrCreateForm> MctrCreateForm);

        IEnumerable<MctrCreateForm> mctrLineItemamountfromPostTextItemOpenLOV(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> mctrHeaderbutBuWhenButtonPressedOpenLOV(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> buButPressPTTValidation(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> mctrHeaderbutFiscalYearWhenButtonPressedOpenLOV(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrLineItem> mctrLineItembutTransFromWhenButtonPressedOpenLOV(IEnumerable<MctrLineItem> mctrLineItem);
        IEnumerable<MctrCreateForm> ValidateActivityID(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MctrCreateForm> mctrLineItembutProjToWhenButtonPressedOpenLOV(IEnumerable<MctrCreateForm> mctrCreateForm);

        IEnumerable<MctrLineItem> overheadOnLoad(IEnumerable<MctrLineItem> mctrCreateForm);
        IEnumerable<MctrCreateForm> querymodecheck(IEnumerable<MctrCreateForm> mctrCreateForm);
        IEnumerable<MCTRComments> mctrcommentonload(IEnumerable<MCTRComments> mctrComments);
        IEnumerable<MCTRComments> mctrCommentPostQuery(IEnumerable<MCTRComments> mctrComments);
        IEnumerable<MCTRComments> mctrCommentOnMessage(IEnumerable<MCTRComments> mctrComments);
        IEnumerable<MCTRComments> mctrCommentPreInsert(IEnumerable<MCTRComments> mctrComments);
        IEnumerable<MCTRComments> mctrCommentOnInsert(IEnumerable<MCTRComments> mctrComments);
        IEnumerable<MCTRComments> mctrCommentviewStatementWhenButtonPressed(IEnumerable<MCTRComments> mctrComments);
        IEnumerable<MCTRComments> mctrCommentbutSaveWhenButtonPressed(IEnumerable<MCTRComments> mctrComments);
        IEnumerable<MctrCreateForm> batchModeCheck(IEnumerable<MctrCreateForm> mctrCreateForm);
    }
}