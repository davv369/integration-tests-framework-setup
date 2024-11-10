interface IConnectorData<RequestType> {
    body?: RequestType;
    query?: Record<string, string>;
    pathArguments?: Record<string, string>;
    accessToken?: string;
}

export default IConnectorData;
