import { IUrl } from '../../utils/urls/models';
import { IAuthenticator, IResponseMapper } from '../functors';
import { HttpMethods, IConnector } from '../models';
import Connector from './Connector';
import HTTPConnector from './HTTPConnector';

class ConnectorFactory {
    static createConnector<RequestType, ResponseType>(
        method: HttpMethods,
        url: IUrl,
        headers: Record<string, string>,
        statusCode: number,
        responseMapper?: IResponseMapper<ResponseType>,
        authenticator?: IAuthenticator,
    ): IConnector<RequestType, ResponseType> {
        return new Connector<RequestType, ResponseType>(
            new HTTPConnector(method, statusCode, headers),
            url,
            undefined,
            authenticator,
            undefined,
            undefined,
            responseMapper,
        );
    }
}

export default ConnectorFactory;
