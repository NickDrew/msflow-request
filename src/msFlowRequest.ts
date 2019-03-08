
import request from "../node_modules/request/index"


interface MSFlowOptions{
    triggerURL: string;
    triggerType: string;
    authToken?: string;
    triggerData?: object;
}

interface MSFlowReturn{
    error: string;
    status: number;
    body: string;
}

export default class MSFlowRequest{
    private _triggerURL: string
    private _triggerType: string
    private _authToken: string
    private _triggerData: object

    public constructor(options: MSFlowOptions){
        this._triggerURL= options.triggerURL
        this._triggerType = options.triggerType
        this._authToken = options.authToken
        this._triggerData = options.triggerData
    }

    public async triggerFlow(): Promise<MSFlowReturn>
    {
        return new Promise<MSFlowReturn>((resolve)=>{
            request(this._triggerURL, function (error, response, body) {
                resolve({error:error,status:response.statusCode,body:body})
            });
        })
    }
}