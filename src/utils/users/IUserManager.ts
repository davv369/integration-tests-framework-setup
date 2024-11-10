import ILoginRequest from "../../apps/auth/models/ILoginRequest";

interface IUserManager {
    loadUser(userId: string): ILoginRequest;
}

export default IUserManager;
