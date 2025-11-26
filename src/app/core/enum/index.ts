export enum StatusCode {
  Unknown = 0,
  OK = 200,
  Created = 201,
  BadRequest = 400,
  ValidationCode = 401,
  InternalServerError = 500,
  NotFound = 404,
  Conflict = 409,
  Forbidden = 403,
  NonStandard =402
}

export const INTERNET_CONNECTION_ERROR = {
  servererror: 'Internal Server Error',
  internetcheck: 'please check your Internet Connection',
  someerror: 'Some Error Occured'
}

export enum ActionTypes {
  LISTING_ACTION = 'LISTING_ACTION',
  BUTTON = 'BUTTON',
  ACTION = 'ACTION',
  FILTER = 'FILTER',
}