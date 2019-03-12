
import * as request from "request"
export interface MSFlowResponse{
    requestID: string;
    requestDateTime: string;
    statusCode: string;
}
export interface MSFlowErrorResponse extends MSFlowResponse{
    error: string;
    message: string;
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
    rawHead?: object;
}

export interface MSFlowRequestOptions{
    triggerURL: string;
    triggerType: string;
    data?: object;
    proxy?: string;
    timeout?: number;
}

export class FlowSuccess implements MSFlowSuccessResponse{
    public requestID: string
    public requestDateTime: string
    public statusCode: string
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
    public rawHead?: object
}

export class FlowError implements MSFlowErrorResponse{
    public requestID: string
    public requestDateTime: string
    public statusCode: string
    public error: string
    public message: string
}

export class FlowTrigger{
    private _triggerURL: string
    private _triggerType: string
    private _triggerData: object
    private _proxy: string
    private _timeout: number

    public constructor(options: MSFlowRequestOptions){
        //TODO: Validate incoming data
        this._triggerURL= options.triggerURL
        this._triggerType = options.triggerType
        if(options.data) this._triggerData = options.data
        if(options.proxy) this._proxy=options.proxy
        this._timeout = (options.timeout)? options.timeout:2000
    }

    public async trigger(): Promise<MSFlowSuccessResponse>
    {

        var options = {
            method: this._triggerType,
            body: this._triggerData,
            json: true,
            url: this._triggerURL,
            timeout: this._timeout,
            proxy: this._proxy
        }

        return new Promise<MSFlowSuccessResponse>((resolve,reject)=>{
            //TODO: refactor some of the below into sub-functions
            request(options, function (error, response, body) {
                if(error)//We assume some sort of network error preventing the trigger payload reaching the flow
                {
                    const errorResponse = new FlowError()
                    if(error.code)
                    {
                        errorResponse.statusCode = error.code,
                        errorResponse.error=error.code,
                        errorResponse.message=`A network error of type ${error.code} has occured.`
                    }
                    else{
                        errorResponse.statusCode = "Unknown",
                        errorResponse.error="Unknown",
                        errorResponse.message=error.toString()
                    }
                    reject(errorResponse)
                }
                else if(body && body["error"]) //We assume the flow recieved the trigger payload, but rejected it
                {
                    const errorResponse = new FlowError()
                    errorResponse.statusCode =(response.statusCode)? response.statusCode.toString() : "Unknown"
                    errorResponse.error = (body["error"]["code"])? body["error"]["code"]:body["error"]
                    errorResponse.message = (body["message"])? body["message"]: "Unknown"
                    reject(errorResponse)
                }
                else //We assume the flow has at least accepted the trigger payload
                {
                    const success = new FlowSuccess()
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
                    if(response.headers["x-ms-ratelimit-burst-remaining-workflow-writes"]) success.remainingWorkflowWrites = Number.parseInt(response.headers["x-ms-ratelimit-burst-remaining-workflow-writes"] as string)
                    if(response.headers["x-ms-ratelimit-burst-remaining-workflow-reads"]) success.remainingWorkflowReads = Number.parseInt(response.headers["x-ms-ratelimit-burst-remaining-workflow-reads"] as string)
                    if(response.headers["x-ms-ratelimit-remaining-workflow-download-contentsize"]) success.remainingWorkflowDLSize = Number.parseInt(response.headers["x-ms-ratelimit-remaining-workflow-download-contentsize"] as string)
                    if(response.headers["x-ms-ratelimit-remaining-workflow-upload-contentsize"]) success.remainingWorkflowULSize = Number.parseInt(response.headers["x-ms-ratelimit-remaining-workflow-upload-contentsize"] as string)
                    success.remainingAPIRequests = Number.parseInt(response.headers["x-ms-ratelimit-time-remaining-directapirequests"] as string)
                    success.data = body
                    success.rawHead = response.headers;
                    resolve(success)
                }

            });
        })
    }
}