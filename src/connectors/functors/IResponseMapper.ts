interface IResponseMapper<ResponseType> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapResponse(data: any): ResponseType;
}

export default IResponseMapper;
