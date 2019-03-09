"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const msFlowRequest_1 = require("./msFlowRequest");
const nock = require("nock");
describe("Testing MSFlowRequest", () => {
    it("Should instantiate an object when passed required options to its constructor", (done) => {
        const testRequest = new msFlowRequest_1.default({ triggerURL: "TestURL", triggerType: "TestType" });
        chai_1.expect(testRequest).to.be.a("Object");
        done();
    });
    it("Should instantiate an object when passed required options and an auth token to its constructor", (done) => {
        const testRequest = new msFlowRequest_1.default({ triggerURL: "TestURL", triggerType: "TestType", authToken: "TestToken" });
        chai_1.expect(testRequest).to.be.a("Object");
        done();
    });
    it("Should instantiate an object when passed required options and trigger data to its constructor", (done) => {
        const testRequest = new msFlowRequest_1.default({ triggerURL: "TestURL", triggerType: "TestType", triggerData: { test: "data" } });
        chai_1.expect(testRequest).to.be.a("Object");
        done();
    });
    it("Should instantiate an object when passed all options to its constructor", (done) => {
        const testRequest = new msFlowRequest_1.default({ triggerURL: "TestURL", triggerType: "TestType", authToken: "TestToken", triggerData: { test: "data" } });
        chai_1.expect(testRequest).to.be.a("Object");
        done();
    });
    it("Should expose a public triggerFlow function", (done) => {
        const testRequest = new msFlowRequest_1.default({ triggerURL: "TestURL", triggerType: "TestType", authToken: "TestToken", triggerData: { test: "data" } });
        chai_1.expect(typeof testRequest.triggerFlow == "function").to.be.true;
        done();
    });
    it("Should get as expected", async () => {
        const testAddress = "http://www.test.com";
        const replyBody = "path matched";
        const replyCode = 200;
        nock(testAddress)
            .get("/")
            .reply(replyCode, replyBody);
        const testRequest = new msFlowRequest_1.default({ triggerURL: testAddress, triggerType: "get", authToken: "TestToken", triggerData: { test: "data" } });
        const data = await testRequest.triggerFlow();
        chai_1.expect(data.status).to.deep.equal(replyCode);
        chai_1.expect(data.body).to.deep.equal(replyBody);
        chai_1.expect(data.error).to.deep.equal(null);
    });
});
//# sourceMappingURL=msFlowRequest.spec.js.map