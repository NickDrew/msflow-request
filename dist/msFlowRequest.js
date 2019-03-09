"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
class MSFlowRequest {
    constructor(options) {
        this._triggerURL = options.triggerURL;
        this._triggerType = options.triggerType;
        this._authToken = options.authToken;
        this._triggerData = options.triggerData;
    }
    async triggerFlow() {
        var options = {
            method: this._triggerType,
            body: this._triggerData,
            json: true,
            url: this._triggerURL
        };
        return new Promise((resolve) => {
            request(options, function (error, response, body) {
                resolve({ error: error, status: response.statusCode, body: body });
            });
        });
    }
}
exports.default = MSFlowRequest;
//# sourceMappingURL=msFlowRequest.js.map