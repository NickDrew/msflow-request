import * as chai from "chai";
import index from "./index";
const expect = chai.expect;
describe("Index testing", () => {
    it("Expect index to export an object", (done) => {
        expect(index).is.a("object");
        done();
    });
});
//# sourceMappingURL=index.spec.js.map