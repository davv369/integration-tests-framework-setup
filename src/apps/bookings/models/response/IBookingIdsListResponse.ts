import {createAssertEquals} from "typia";

export interface IBookingIdsList {
    bookingid: number;
}

export type IBookingIdListResponse = IBookingIdsList[];

export const bookingIdsListResponseVerifier = createAssertEquals<IBookingIdListResponse>();
