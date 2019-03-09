
import * as request from "request"


export interface MSFlowOptions{
    triggerURL: string;
    triggerType: string;
    authToken?: string;
    triggerData?: object;
}

export interface MSFlowReturn{
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

        var options = {
            method: this._triggerType,
            body: this._triggerData,
            json: true,
            url: this._triggerURL
        }
        return new Promise<MSFlowReturn>((resolve)=>{
            request(options, function (error, response, body) {
                resolve({error:error,status:response.statusCode,body:body})
            });
        })
    }
}