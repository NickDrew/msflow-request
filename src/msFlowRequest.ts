
import * as request from "request"

interface MSFlowResponse{
    requestID: string;
    requestDateTime: Date;
}
interface MSFlowErrorResponse extends MSFlowResponse{
    errorCode: string;
    errorMessage: string;
}

interface MSFlowSuccessResponse extends MSFlowResponse{
    workflowRunID: string;
    correlationID: string;
    clientTrackingID: string;
    triggerHistoryName: string;
    executionLocation: string;
    workflowID: string;
    workflowVersion: string;
    workflowName: string;
    workflowSystemID: string;
    trackingID: string;
    remainingWorkflowWrites?: number;
    remainingWorkflowReads?: number;
    remainingWorkflowDLSize: number;
    remainingWorkflowULSize?: number;
    remainingAPIReuqests: number;
    data?: object;
}

interface MSFlowOptions{
    triggerURL: string;
    triggerType: string;
    data?: string;
}

class MSFlowRequest{
    private _triggerURL: string
    private _triggerType: string
    private _triggerData: string

    public constructor(options: MSFlowOptions){
        //toDo: Validate incoming data
        this._triggerURL= options.triggerURL
        this._triggerType = options.triggerType
        if(options.data) this._triggerData = options.data
    }

    public async trigger(): Promise<void|MSFlowSuccessResponse|MSFlowErrorResponse>
    {

        // var options = {
        //     method: this._triggerType,
        //     body: this._triggerData,
        //     json: true,
        //     url: this._triggerURL
        // }
        // return new Promise<MSFlowReturn>((resolve,reject)=>{
        //     request(options, function (error, response, body) {
        //         if(error)
        //         {
        //             console.log(error)
        //             reject(`response:${error.code} message:${error.code}`)
        //         }
        //         else
        //         {
        //             resolve({error:error,status:response.statusCode,body:body})
        //         }

        //     });
        // })
    }
}