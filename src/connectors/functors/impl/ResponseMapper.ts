import IResponseMapper from '../IResponseMapper';

class ResponseMapper<ResponseType> implements IResponseMapper<ResponseType> {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    constructor(private _mapper: (data: any) => ResponseType) {}
    /* eslint-disable @typescript-eslint/no-explicit-any */
    mapResponse(data: any): ResponseType {
        return this._mapper(data);
    }
}

export default ResponseMapper;
