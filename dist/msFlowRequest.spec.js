import { expect } from "chai";
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
});
//# sourceMappingURL=msFlowRequest.spec.js.map