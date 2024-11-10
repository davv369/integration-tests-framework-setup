import IAuthenticator from '../IAuthenticator';

class DefaultAuthenticator implements IAuthenticator {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    authenticate(request?: any): Record<string, string> {
        return { ['Authorization']: `Bearer ${request.accessToken}` };
    }
}

export default DefaultAuthenticator;
