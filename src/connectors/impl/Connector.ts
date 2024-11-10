import { IUrl } from '../../utils/urls/models';
import { IAuthenticator, IResponseMapper, IValidator } from '../functors';
import {
    IAuthenticationCredentials,
    IConnector,
    IConnectorData,
    IHTTPConnector,
} from '../models';

class Connector<RequestType, ResponseType>
implements IConnector<RequestType, ResponseType>
{
    constructor(
        private _connector: IHTTPConnector,
        private _url: IUrl,
        private _credentials?: IAuthenticationCredentials,
        private _authenticator?: IAuthenticator,
        private _requestValidator?: IValidator,
        private _responseValidator?: IValidator,
        private _responseMapper?: IResponseMapper<ResponseType>,
    ) {}

    public async send(data: IConnectorData<RequestType>): Promise<ResponseType> {
        let headers =
      this._authenticator !== undefined
          ? this._authenticator.authenticate(data.body)
          : undefined;
        if (data.accessToken !== undefined) {
            headers = { ...headers, ['Authorization']: `Bearer ${data.accessToken}` };
        }

        let path = this._url.path?.constructPath(data.pathArguments);
        if (data.query) {
            const query = new URLSearchParams(data.query).toString();
            path += `?${query}`;
        }
        const response = await this._connector.send({
            body: data.body as Record<string, unknown>,
            baseUrl: this._url.url,
            pathUrl: path,
            headers,
        });
        return this._responseMapper
            ? this._responseMapper.mapResponse(response.body)
            : response.body;
    }
}

export default Connector;
