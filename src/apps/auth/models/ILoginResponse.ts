import { createAssertEquals } from 'typia';

interface ILoginResponse {
    token: string
}

export const loginResponseVerifier = createAssertEquals<ILoginResponse>();

export default ILoginResponse;
