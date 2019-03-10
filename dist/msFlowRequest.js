"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
class FlowSuccess {
}
exports.FlowSuccess = FlowSuccess;
class FlowOptions {
    constructor(triggerURL, triggerType, data) {
        this.triggerURL = triggerURL;
        this.triggerType = triggerType;
        this.data = data;
    }
}
exports.FlowOptions = FlowOptions;
class FlowTrigger {
    constructor(options) {
        //toDo: Validate incoming data
        this._triggerURL = options.triggerURL;
        this._triggerType = options.triggerType;
        if (options.data)
            this._triggerData = options.data;
    }
    async trigger() {
        var options = {
            method: this._triggerType,
            body: this._triggerData,
            json: true,
            url: this._triggerURL
        };
        return new Promise((resolve, reject) => {
            request(options, function (error, response, body) {
                if (error) {
                    reject(`response:${error.code} message:${error.code}`);
                }
                else {
                    const success = new FlowSuccess();
                    // public remainingWorkflowWrites?: number
                    // public remainingWorkflowReads?: number
                    // public remainingWorkflowULSize?: number
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
                    success.requestID = response.headers["x-ms-request-id"];
                    if (response.headers["x-ms-ratelimit-burst-remaining-workflow-reads"])
                        success.remainingWorkflowReads = Number.parseInt(response.headers["x-ms-ratelimit-burst-remaining-workflow-reads"]);
                    if (response.headers["x-ms-ratelimit-remaining-workflow-download-contentsize"])
                        success.remainingWorkflowDLSize = Number.parseInt(response.headers["x-ms-ratelimit-remaining-workflow-download-contentsize"]);
                    success.requestID = response.headers["x-ms-request-id"];
                    success.remainingAPIRequests = Number.parseInt(response.headers["x-ms-ratelimit-time-remaining-directapirequests"]);
                    success.data = body;
                    console.log(success);
                    resolve(success);
                }
            });
        });
    }
}
exports.FlowTrigger = FlowTrigger;
//# sourceMappingURL=msFlowRequest.js.map