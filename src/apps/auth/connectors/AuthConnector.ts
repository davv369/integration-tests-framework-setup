import { DEFAULT_HEADERS } from '../../../commons/headers';
import { ConnectorFactory } from '../../../connectors';
import { ResponseMapper } from '../../../connectors/functors';
import { HttpMethods, IConnector } from '../../../connectors/models';
import { IUrlManager, JsonUrlManager, UrlPaths } from '../../../utils/urls';
import { Path } from '../../../utils/urls/models';
import ILoginResponse, { loginResponseVerifier } from '../models/ILoginResponse';
import IUnauthorizedLoginResponse, {
    unauthorizedResponseVerifier,
} from '../models/IUnauthorizedLoginResponse';
import ILoginRequest from '../models/ILoginRequest';

class AuthConnector {
    private _loginConnector: IConnector<ILoginRequest, ILoginResponse>;
    private _unauthorizedLoginConnector: IConnector<
    unknown,
    IUnauthorizedLoginResponse
    >;
    private readonly _url: string;

    constructor(private _urlManager: IUrlManager = new JsonUrlManager()) {
        this._url = '/auth';
        this._loginConnector = ConnectorFactory.createConnector<
        ILoginRequest,
        ILoginResponse
        >(
            HttpMethods.POST,
            {
                url: this._urlManager.loadUrl(UrlPaths.BaseUrl).url,
                path: new Path(this._url),
            },
            DEFAULT_HEADERS,
            200,
            new ResponseMapper<ILoginResponse>((response) => {
                loginResponseVerifier(response);
                return response;
            }),
        );

        this._unauthorizedLoginConnector = ConnectorFactory.createConnector<
        unknown,
        IUnauthorizedLoginResponse
        >(
            HttpMethods.POST,
            {
                url: this._urlManager.loadUrl(UrlPaths.BaseUrl).url,
                path: new Path(this._url),
            },
            DEFAULT_HEADERS,
            200,
            new ResponseMapper<IUnauthorizedLoginResponse>((response) => {
                unauthorizedResponseVerifier(response);
                return response;
            }),
        );
    }

    async login(body: ILoginRequest) {
        return this._loginConnector.send({ body });
    }

    async unauthorizedLogin(body: unknown) {
        return this._unauthorizedLoginConnector.send({ body });
    }
}

export default AuthConnector;
