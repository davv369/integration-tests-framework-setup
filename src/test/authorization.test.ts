import {JsonUserManager} from '../utils/users';
import AuthConnector from '../apps/auth/connectors/AuthConnector';
import ILoginRequest from '../apps/auth/models/ILoginRequest';
import ILoginResponse from '../apps/auth/models/ILoginResponse';
import translations from '../utils/translations.json';

describe('Authorization Functionalities', () => {
    let userManager: JsonUserManager;
    let loginConnector: AuthConnector;
    let loginRequest: ILoginRequest;
    let loginResults: ILoginResponse;

    beforeEach(() => {
        userManager = new JsonUserManager();
        loginConnector = new AuthConnector();
    });

    it('should successfully log in with valid credentials', async () => {
        const {username, password} = userManager.loadUser('adminUser');
        loginRequest = {username, password};

        loginResults = await loginConnector.login(loginRequest);
        expect(typeof loginResults.token).toBe('string');
    });

    it('should return an error message when logging in with invalid credentials', async () => {
        const { username, password } = userManager.loadUser(
            'invalidCredentialsAccount',
        );
        loginRequest = { username, password };
        const loginResults = await loginConnector.unauthorizedLogin(loginRequest);
        expect(loginResults).toHaveProperty('reason', translations.login.unauthorized);
    });
});