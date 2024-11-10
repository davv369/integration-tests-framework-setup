import IHTTPConnectorData from './IHTTPConnectorData';

interface IHTTPConnector {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    send(httpConnectorData: IHTTPConnectorData): Promise<any>;
}

export default IHTTPConnector;
