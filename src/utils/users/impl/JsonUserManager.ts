import IUserManager from '../IUserManager';
import USERS from '../../../fixtures/users.json';
import ILoginRequest from "../../../apps/auth/models/ILoginRequest";

class JsonUserManager implements IUserManager {
    loadUser(userId: string): ILoginRequest {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
        const user = USERS[userId];
        return user as ILoginRequest;
    }
}

export default JsonUserManager;
