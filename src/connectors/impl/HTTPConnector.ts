import request from 'supertest';
import { HttpMethods, IHTTPConnector, IHTTPConnectorData } from '../models';

class HTTPConnector implements IHTTPConnector {
    private _headers: Record<string, string>;
    private readonly _responseCode: number;
    private readonly _method: HttpMethods;
    private readonly _methodName: string;


    constructor(
        method: HttpMethods,
        responseCode: number,
        headers?: Record<string, string>
    ) {
        this._headers = { ...headers };
        this._responseCode = responseCode;
        this._method = method;
        this._methodName = (Object.keys(HttpMethods).filter(key => isNaN(Number(key))))[method];
    }

    public async send(httpConnectorData: IHTTPConnectorData): Promise<unknown> {
        try {
            const response = await this._chooseHttpMethod(request(httpConnectorData.baseUrl), httpConnectorData.pathUrl)
                .set({ ...this._headers, ...httpConnectorData.headers })
                .send(httpConnectorData.body);

            if (response.status !== this._responseCode) {
                throw new Error(this._createErrorMessage(this._methodName, httpConnectorData.pathUrl, response.body, response.status));
            }

            return response;
        } catch (error) {
            if (error instanceof Error && 'status' in error) {
                const responseError = error as any;
                throw new Error(this._createErrorMessage(this._methodName, httpConnectorData.pathUrl, responseError.response?.body, responseError.status));
            }
            throw error;
        }
    }

    private _createErrorMessage(method: string, pathUrl: string, responseBody: any, actualStatusCode: number): string {
        return `Unexpected status code: ${actualStatusCode}. Expected: ${this._responseCode}.

Request URL: ${method} ${pathUrl}

Response body: ${JSON.stringify(responseBody, null, 2)}`;
    }

    private _chooseHttpMethod = (
        partRequest: request.SuperTest<request.Test>,
        path: string
    ): request.Test => {
        switch (this._method) {
            case HttpMethods.POST:
                return partRequest.post(path);
            case HttpMethods.PATCH:
                return partRequest.patch(path);
            case HttpMethods.PUT:
                return partRequest.put(path);
            case HttpMethods.GET:
                return partRequest.get(path);
            case HttpMethods.DELETE:
                return partRequest.delete(path);
        }
    };
}

export default HTTPConnector;