import {createAssertEquals} from "typia";

interface IBookingDates {
    checkin: string;
    checkout: string;
}

export interface IBookingDetailsResponse {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: IBookingDates;
    additionalneeds?: string;
}

export const bookingDetailsResponseVerifier = createAssertEquals<IBookingDetailsResponse>();
