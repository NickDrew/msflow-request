import { expect } from "chai";
import nock from "../node_modules/nock/index";
import MSFlowRequest from "./msFlowRequest";
describe("Testing MSFlowRequest", () => {
    it("Should instantiate an object when passed required options to its constructor", (done) => {
        const testRequest = new MSFlowRequest({ triggerURL: "TestURL", triggerType: "TestType" });
        expect(testRequest).to.be.a("Object");
        done();
    });
    it("Should instantiate an object when passed required options and an auth token to its constructor", (done) => {
        const testRequest = new MSFlowRequest({ triggerURL: "TestURL", triggerType: "TestType", authToken: "TestToken" });
        expect(testRequest).to.be.a("Object");
        done();
    });
    it("Should instantiate an object when passed required options and trigger data to its constructor", (done) => {
        const testRequest = new MSFlowRequest({ triggerURL: "TestURL", triggerType: "TestType", triggerData: { test: "data" } });
        expect(testRequest).to.be.a("Object");
        done();
    });
    it("Should instantiate an object when passed all options to its constructor", (done) => {
        const testRequest = new MSFlowRequest({ triggerURL: "TestURL", triggerType: "TestType", authToken: "TestToken", triggerData: { test: "data" } });
        expect(testRequest).to.be.a("Object");
        done();
    });
    it("Should expose a public triggerFlow function", (done) => {
        const testRequest = new MSFlowRequest({ triggerURL: "TestURL", triggerType: "TestType", authToken: "TestToken", triggerData: { test: "data" } });
        expect(typeof testRequest.triggerFlow == "function").to.be.true;
        done();
    });
    it("Should get as expected", async () => {
        const testAddress = "http://www.test.com";
        const replyBody = "path matched";
        const replyCode = 200;
        const mockserv = nock(testAddress)
            .get("/")
            .reply(replyCode, replyBody);
        const testRequest = new MSFlowRequest({ triggerURL: testAddress, triggerType: "get", authToken: "TestToken", triggerData: { test: "data" } });
        const data = await testRequest.triggerFlow();
        expect(data.status).to.deep.equal(replyCode);
        expect(data.body).to.deep.equal(replyBody);
        expect(data.error).to.deep.equal(null);
    });
});
//# sourceMappingURL=msFlowRequest.spec.js.map