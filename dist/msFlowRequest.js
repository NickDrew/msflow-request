"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MSFlowRequest {
    constructor(options) {
        //toDo: Validate incoming data
        this._triggerURL = options.triggerURL;
        this._triggerType = options.triggerType;
        if (options.data)
            this._triggerData = options.data;
    }
    async trigger() {
        // var options = {
        //     method: this._triggerType,
        //     body: this._triggerData,
        //     json: true,
        //     url: this._triggerURL
        // }
        // return new Promise<MSFlowReturn>((resolve,reject)=>{
        //     request(options, function (error, response, body) {
        //         if(error)
        //         {
        //             console.log(error)
        //             reject(`response:${error.code} message:${error.code}`)
        //         }
        //         else
        //         {
        //             resolve({error:error,status:response.statusCode,body:body})
        //         }
        //     });
        // })
    }
}
//# sourceMappingURL=msFlowRequest.js.map