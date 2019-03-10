
import * as request from "request"
export interface MSFlowResponse{
    requestID: string;
    requestDateTime: string;
}
export interface MSFlowErrorResponse extends MSFlowResponse{
    errorCode: string;
    errorMessage: string;
}

export interface MSFlowSuccessResponse extends MSFlowResponse{
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
    remainingAPIRequests: number;
    data?: object;
}

export interface MSFlowRequestOptions{
    triggerURL: string;
    triggerType: string;
    data?: object;
}

export class FlowSuccess implements MSFlowSuccessResponse{
    public requestID: string
    public requestDateTime: string
    public workflowRunID: string
    public correlationID: string
    public clientTrackingID: string
    public triggerHistoryName: string
    public executionLocation: string
    public workflowID: string
    public workflowVersion: string
    public workflowName: string
    public workflowSystemID: string
    public trackingID: string
    public remainingWorkflowWrites?: number
    public remainingWorkflowReads?: number
    public remainingWorkflowDLSize: number
    public remainingWorkflowULSize?: number
    public remainingAPIRequests: number
    public data?: object
}
export class FlowOptions implements MSFlowRequestOptions{
    public constructor(triggerURL: string, triggerType: string, data?: object)
    {
        this.triggerURL = triggerURL
        this.triggerType = triggerType
        this.data = data
    }
    public triggerURL: string
    public triggerType: string
    public data?: object
}
export class FlowTrigger{
    private _triggerURL: string
    private _triggerType: string
    private _triggerData: object

    public constructor(options: MSFlowRequestOptions){
        //toDo: Validate incoming data
        this._triggerURL= options.triggerURL
        this._triggerType = options.triggerType
        if(options.data) this._triggerData = options.data
    }

    public async trigger(): Promise<MSFlowSuccessResponse>
    {

        var options = {
            method: this._triggerType,
            body: this._triggerData,
            json: true,
            url: this._triggerURL
        }
        return new Promise<MSFlowSuccessResponse>((resolve,reject)=>{
            request(options, function (error, response, body) {
                if(error)
                {
                    reject(`response:${error.code} message:${error.code}`)
                }
                else
                {
                    const success = new FlowSuccess()

                    // public remainingWorkflowWrites?: number
                    // public remainingWorkflowULSize?: number

                    success.requestID = response.headers["x-ms-request-id"] as string
                    success.requestDateTime = response.headers["date"] as string
                    success.workflowRunID = response.headers["x-ms-workflow-run-id"] as string
                    success.correlationID = response.headers["x-ms-correlation-id"] as string
                    success.clientTrackingID = response.headers["x-ms-client-tracking-id"] as string
                    success.triggerHistoryName = response.headers["x-ms-trigger-history-name"] as string
                    success.executionLocation = response.headers["x-ms-execution-location"] as string
                    success.workflowID = response.headers["x-ms-workflow-id"] as string
                    success.workflowVersion = response.headers["x-ms-workflow-version"] as string
                    success.workflowName = response.headers["x-ms-workflow-name"] as string
                    success.workflowSystemID = response.headers["x-ms-workflow-system-id"] as string
                    success.trackingID = response.headers["x-ms-tracking-id"] as string
                    success.requestID = response.headers["x-ms-request-id"] as string
                    if(response.headers["x-ms-ratelimit-burst-remaining-workflow-reads"]) success.remainingWorkflowReads = Number.parseInt(response.headers["x-ms-ratelimit-burst-remaining-workflow-reads"] as string)
                    if(response.headers["x-ms-ratelimit-remaining-workflow-download-contentsize"]) success.remainingWorkflowDLSize = Number.parseInt(response.headers["x-ms-ratelimit-remaining-workflow-download-contentsize"] as string)
                    success.requestID = response.headers["x-ms-request-id"] as string
                    success.remainingAPIRequests = Number.parseInt(response.headers["x-ms-ratelimit-time-remaining-directapirequests"] as string)
                    success.data = body
                    resolve(success)
                }

            });
        })
    }
}