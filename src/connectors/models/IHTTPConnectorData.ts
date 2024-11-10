interface IHTTPConnectorData {
    body: Record<string, unknown>;
    baseUrl: string;
    pathUrl: string;
    headers?: Record<string, string>;
}

export default IHTTPConnectorData;
