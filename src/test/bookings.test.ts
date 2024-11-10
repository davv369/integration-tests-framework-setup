import {JsonUserManager} from '../utils/users';
import AuthConnector from '../apps/auth/connectors/AuthConnector';
import BookingConnector from '../apps/bookings/connectors/BookingConnector';
import ILoginRequest from '../apps/auth/models/ILoginRequest';
import ILoginResponse from '../apps/auth/models/ILoginResponse';
import {IBookingIdListResponse} from '../apps/bookings/models/response/IBookingIdsListResponse';
import {faker} from '@faker-js/faker';

describe('Booking Functionalities', () => {
    let userManager: JsonUserManager;
    let loginConnector: AuthConnector;
    let bookingConnector: BookingConnector;
    let loginRequest: ILoginRequest;
    let loginResults: ILoginResponse;
    let idsListResults: IBookingIdListResponse;

    beforeAll(async () => {
        userManager = new JsonUserManager();
        loginConnector = new AuthConnector();

        const {username, password} = userManager.loadUser('adminUser');
        loginRequest = {username, password};

        loginResults = await loginConnector.login(loginRequest);
        expect(typeof loginResults.token).toBe('string');
    });

    beforeEach(() => {
        bookingConnector = new BookingConnector();
    });

    it('should valid if random booking price is greater than 10', async () => {
        const randomNumber= faker.datatype.number({min:1, max:20});
        idsListResults = await bookingConnector.getBookingIds();
        const randomObjectResult = idsListResults[randomNumber].bookingid;

        const bookingDetailsResult = await bookingConnector.getBooking(randomObjectResult.toString());

        expect(bookingDetailsResult.totalprice).toBeGreaterThan(10);
    });
});