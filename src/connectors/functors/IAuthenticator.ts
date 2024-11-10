interface IAuthenticator {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authenticate(request?: any): Record<string, string>;
}

export default IAuthenticator;
