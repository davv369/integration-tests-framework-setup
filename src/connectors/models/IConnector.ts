import IConnectorData from './IConnectorData';

interface IConnector<RequestType, ResponseType> {
    send(data: IConnectorData<RequestType>): Promise<ResponseType>;
}

export default IConnector;
