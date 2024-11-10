import IApiKeyDetails from './IApiKeyDetails';

interface IAuthenticationCredentials {
    accessToken?: string;
    apiKey?: IApiKeyDetails;
    username?: string;
    password?: string;
}

export default IAuthenticationCredentials;
