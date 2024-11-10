import { createAssertEquals } from 'typia';

interface IUnauthorizedLoginResponse {
    reason: string
}

export const unauthorizedResponseVerifier =
  createAssertEquals<IUnauthorizedLoginResponse>();

export default IUnauthorizedLoginResponse;
