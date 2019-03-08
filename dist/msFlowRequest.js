import request from "../node_modules/request/index";
export default class MSFlowRequest {
    constructor(options) {
        this._triggerURL = options.triggerURL;
        this._triggerType = options.triggerType;
        this._authToken = options.authToken;
        this._triggerData = options.triggerData;
    }
    async triggerFlow() {
        return new Promise((resolve) => {
            request(this._triggerURL, function (error, response, body) {
                resolve({ error: error, status: response.statusCode, body: body });
            });
        });
    }
}
//# sourceMappingURL=msFlowRequest.js.map