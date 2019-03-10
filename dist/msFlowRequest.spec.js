"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const MSFlowRequest = require("./msFlowRequest");
const nock = require("nock");
const validGetResponseBody = { "Data1": "Data1" };
const validGetResponseHead = {
    "Content-Type": "application/json",
    "x-ms-workflow-run-id": "08586493682204313112626652749CU08",
    "x-ms-correlation-id": "d6a527c2-5998-49cb-92e6-d645223db7fe",
    "x-ms-client-tracking-id": "08586493682204313112626652749CU08",
    "x-ms-trigger-history-name": "08586493682204313112626652749CU08",
    "x-ms-execution-location": "uksouth",
    "x-ms-workflow-id": "2e84cb581bab4e8696663facdc3d3f18",
    "x-ms-workflow-version": "08586493776381596979",
    "x-ms-workflow-name": "ba717943-8d38-45ae-aed1-d91c4e7ce618",
    "x-ms-workflow-system-id": "/locations/uksouth/scaleunits/prod-02/workflows/2e84cb581bab4e8696663facdc3d3f18",
    "x-ms-tracking-id": "d6a527c2-5998-49cb-92e6-d645223db7fe",
    "x-ms-ratelimit-burst-remaining-workflow-reads": "1998",
    "x-ms-ratelimit-remaining-workflow-download-contentsize": "1073741776",
    "x-ms-ratelimit-time-remaining-directapirequests": "99999435",
    "x-ms-request-id": "uksouth:d6a527c2-5998-49cb-92e6-d645223db7fe",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Date": "Sun, 10 Mar 2019 17:24:25 GMT"
};
const validGetResponseReturn = {
    requestID: "uksouth:d6a527c2-5998-49cb-92e6-d645223db7fe",
    requestDateTime: "Sun, 10 Mar 2019 17:24:25 GMT",
    workflowRunID: "08586493682204313112626652749CU08",
    correlationID: "d6a527c2-5998-49cb-92e6-d645223db7fe",
    clientTrackingID: "08586493682204313112626652749CU08",
    triggerHistoryName: "08586493682204313112626652749CU08",
    executionLocation: "uksouth",
    workflowID: "2e84cb581bab4e8696663facdc3d3f18",
    workflowVersion: "08586493776381596979",
    workflowName: "ba717943-8d38-45ae-aed1-d91c4e7ce618",
    workflowSystemID: "/locations/uksouth/scaleunits/prod-02/workflows/2e84cb581bab4e8696663facdc3d3f18",
    trackingID: "d6a527c2-5998-49cb-92e6-d645223db7fe",
    remainingWorkflowWrites: 0,
    remainingWorkflowReads: 1998,
    remainingWorkflowDLSize: 1073741776,
    remainingWorkflowULSize: 0,
    remainingAPIRequests: 99999435,
    data: validGetResponseBody
};
describe("Testing MSFlowRequest", () => {
    it("Expect a get operation to return valid data", async () => {
        nock("http://localTest.com")
            .defaultReplyHeaders(validGetResponseHead)
            .get("/")
            .reply(200, validGetResponseBody);
        const requestOptions = new MSFlowRequest.FlowOptions("http://localTest.com", "get");
        const flowTrigger = new MSFlowRequest.FlowTrigger(requestOptions);
        const flowResponse = await flowTrigger.trigger();
        chai_1.expect(flowResponse.clientTrackingID).to.deep.equal(validGetResponseReturn.clientTrackingID);
        chai_1.expect(flowResponse.correlationID).to.deep.equal(validGetResponseReturn.correlationID);
        chai_1.expect(flowResponse.data).to.deep.equal(validGetResponseReturn.data);
        chai_1.expect(flowResponse.executionLocation).to.deep.equal(validGetResponseReturn.executionLocation);
        chai_1.expect(flowResponse.remainingAPIRequests).to.deep.equal(validGetResponseReturn.remainingAPIRequests);
        chai_1.expect(flowResponse.remainingWorkflowDLSize).to.deep.equal(validGetResponseReturn.remainingWorkflowDLSize);
        chai_1.expect(flowResponse.remainingWorkflowReads).to.deep.equal(validGetResponseReturn.remainingWorkflowReads);
        chai_1.expect(flowResponse.remainingWorkflowULSize).to.deep.equal(undefined);
        chai_1.expect(flowResponse.remainingWorkflowWrites).to.deep.equal(undefined);
        chai_1.expect(flowResponse.requestDateTime).to.deep.equal(validGetResponseReturn.requestDateTime);
        chai_1.expect(flowResponse.requestID).to.deep.equal(validGetResponseReturn.requestID);
        chai_1.expect(flowResponse.trackingID).to.deep.equal(validGetResponseReturn.trackingID);
        chai_1.expect(flowResponse.triggerHistoryName).to.deep.equal(validGetResponseReturn.triggerHistoryName);
        chai_1.expect(flowResponse.workflowID).to.deep.equal(validGetResponseReturn.workflowID);
        chai_1.expect(flowResponse.workflowName).to.deep.equal(validGetResponseReturn.workflowName);
        chai_1.expect(flowResponse.workflowRunID).to.deep.equal(validGetResponseReturn.workflowRunID);
        chai_1.expect(flowResponse.workflowSystemID).to.deep.equal(validGetResponseReturn.workflowSystemID);
        chai_1.expect(flowResponse.workflowVersion).to.deep.equal(validGetResponseReturn.workflowVersion);
    });
    it("Expect a post to send valid data");
    it("Expect a put to send valid data");
    it("Expect a patch to send valid data");
    it("Expect a delete to send valid command");
});
//# sourceMappingURL=msFlowRequest.spec.js.map