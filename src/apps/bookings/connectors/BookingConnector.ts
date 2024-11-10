import { DEFAULT_HEADERS } from '../../../commons/headers';
import { ConnectorFactory } from '../../../connectors';
import { ResponseMapper } from '../../../connectors/functors';
import { HttpMethods, IConnector } from '../../../connectors/models';
import { IUrlManager, JsonUrlManager, UrlPaths } from '../../../utils/urls';
import { Path } from '../../../utils/urls/models';
import {
    bookingDetailsResponseVerifier,
    IBookingDetailsResponse
} from "../models/response/IBookingDetailsResponse";
import {IBookingDetailsRequest} from "../models/request/IBookingDetailsRequest";
import {bookingIdsListResponseVerifier, IBookingIdListResponse} from "../models/response/IBookingIdsListResponse";

class BookingConnector {
    private _bookingIds: IConnector<void, IBookingIdListResponse>;
    private _bookingDetails: IConnector<IBookingDetailsRequest, IBookingDetailsResponse>
    constructor(private _urlManager: IUrlManager = new JsonUrlManager()) {
        this._bookingIds = ConnectorFactory.createConnector<
        void,
            IBookingIdListResponse
        >(
            HttpMethods.GET,
            {
                url: this._urlManager.loadUrl(UrlPaths.BaseUrl).url,
                path: new Path('/booking'),
            },
            DEFAULT_HEADERS,
            200,
            new ResponseMapper<IBookingIdListResponse>((response) => {
                bookingIdsListResponseVerifier(response);
                return response;
            }),
        );

        this._bookingDetails = ConnectorFactory.createConnector<
            IBookingDetailsRequest,
            IBookingDetailsResponse
        >(
            HttpMethods.GET,
            {
                url: this._urlManager.loadUrl(UrlPaths.BaseUrl).url,
                path: new Path('/booking/{{ id }}'),
            },
            DEFAULT_HEADERS,
            200,
            new ResponseMapper<IBookingDetailsResponse>((response) => {
                bookingDetailsResponseVerifier(response);
                return response;
            }),
        );
    }

    async getBookingIds(token: string){
        return this._bookingIds.send({})
    }

    async getBooking(id: string){
        return this._bookingDetails.send({pathArguments: {id}})
    }

    // Fetch user profile by ID
    // async getUserProfileById(accessToken: string, id: string) {
    //     return this._profileConnector.send({
    //         // Prepare the request with path arguments for dynamic URL segments
    //         pathArguments: { id }, // 'id' will be replaced in the URL path
    //         accessToken // Pass the access token for authorization
    //     });
    // }
    //
    // // Fetch data using query parameters
    // async getSomethingUsingQueryParams(accessToken: string, id: string) {
    //     return this._profileConnector.send({
    //         // Prepare the request with query parameters
    //         query: { id }, // Pass the ID as a query parameter
    //         accessToken // Pass the access token for authorization
    //     });
    // }
    //
    // async getMe(accessToken:string){
    //     return this._meConnector.send({accessToken: accessToken});
    // }

}

export default BookingConnector;
