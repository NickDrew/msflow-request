"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
class FlowSuccess {
}
exports.FlowSuccess = FlowSuccess;
class FlowError {
}
exports.FlowError = FlowError;
class FlowTrigger {
    constructor(options) {
        //TODO: Validate incoming data
        this._triggerURL = options.triggerURL;
        this._triggerType = options.triggerType;
        if (options.data)
            this._triggerData = options.data;
        if (options.proxy)
            this._proxy = options.proxy;
        this._timeout = (options.timeout) ? options.timeout : 2000;
    }
    async trigger() {
        var options = {
            method: this._triggerType,
            body: this._triggerData,
            json: true,
            url: this._triggerURL,
            timeout: this._timeout,
            proxy: this._proxy
        };
        return new Promise((resolve, reject) => {
            //TODO: refactor some of the below into sub-functions
            request(options, function (error, response, body) {
                if (error) //We assume some sort of network error preventing the trigger payload reaching the flow
                 {
                    const errorResponse = new FlowError();
                    if (error.code) {
                        errorResponse.statusCode = error.code,
                            errorResponse.error = error.code,
                            errorResponse.message = `A network error of type ${error.code} has occured.`;
                    }
                    else {
                        errorResponse.statusCode = "Unknown",
                            errorResponse.error = "Unknown",
                            errorResponse.message = error.toString();
                    }
                    reject(errorResponse);
                }
                else if (body && body["error"]) //We assume the flow recieved the trigger payload, but rejected it
                 {
                    const errorResponse = new FlowError();
                    errorResponse.statusCode = (response.statusCode) ? response.statusCode.toString() : "Unknown";
                    errorResponse.error = body["error"];
                    errorResponse.message = (body["message"]) ? body["message"] : "Unknown";
                    reject(errorResponse);
                }
                else //We assume the flow has at least accepted the trigger payload
                 {
                    const success = new FlowSuccess();
                    success.requestID = response.headers["x-ms-request-id"];
                    success.requestDateTime = response.headers["date"];
                    success.workflowRunID = response.headers["x-ms-workflow-run-id"];
                    success.correlationID = response.headers["x-ms-correlation-id"];
                    success.clientTrackingID = response.headers["x-ms-client-tracking-id"];
                    success.triggerHistoryName = response.headers["x-ms-trigger-history-name"];
                    success.executionLocation = response.headers["x-ms-execution-location"];
                    success.workflowID = response.headers["x-ms-workflow-id"];
                    success.workflowVersion = response.headers["x-ms-workflow-version"];
                    success.workflowName = response.headers["x-ms-workflow-name"];
                    success.workflowSystemID = response.headers["x-ms-workflow-system-id"];
                    success.trackingID = response.headers["x-ms-tracking-id"];
                    if (response.headers["x-ms-ratelimit-burst-remaining-workflow-writes"])
                        success.remainingWorkflowWrites = Number.parseInt(response.headers["x-ms-ratelimit-burst-remaining-workflow-writes"]);
                    if (response.headers["x-ms-ratelimit-burst-remaining-workflow-reads"])
                        success.remainingWorkflowReads = Number.parseInt(response.headers["x-ms-ratelimit-burst-remaining-workflow-reads"]);
                    if (response.headers["x-ms-ratelimit-remaining-workflow-download-contentsize"])
                        success.remainingWorkflowDLSize = Number.parseInt(response.headers["x-ms-ratelimit-remaining-workflow-download-contentsize"]);
                    if (response.headers["x-ms-ratelimit-remaining-workflow-upload-contentsize"])
                        success.remainingWorkflowULSize = Number.parseInt(response.headers["x-ms-ratelimit-remaining-workflow-upload-contentsize"]);
                    success.remainingAPIRequests = Number.parseInt(response.headers["x-ms-ratelimit-time-remaining-directapirequests"]);
                    success.data = body;
                    success.rawHead = response.headers;
                    resolve(success);
                }
            });
        });
    }
}
exports.FlowTrigger = FlowTrigger;
//# sourceMappingURL=msFlowRequest.js.map