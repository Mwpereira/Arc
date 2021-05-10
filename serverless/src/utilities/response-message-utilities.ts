import { Response } from '../interfaces/response';
import { AccessToken } from '../interfaces/access-token';
import CookieUtilities from './cookie-utilities';
import { responseHeader } from '../constants/header-constant';

export class Result {
  private readonly statusCode: number;
  private data: any = {};
  private headers: any = responseHeader;

  constructor(statusCode: number, message: string, data?: object) {
    this.statusCode = statusCode;
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        this.data[key] = value;
      });
    }
    this.data.message = message;
  }

  response(): Response {
    return  {
      statusCode: this.statusCode,
      body: JSON.stringify(this.data),
      headers: this.headers,
    };
  }

  setCookie(result: Result, accessToken: string, refreshToken: boolean): Result {
    let minute: number = 60;
    if (!refreshToken) {
      minute = 15;
    }

    const payload: AccessToken = {
      cookie: accessToken,
      expires: new Date(Date.now() + minute * 60 * 1000),
    };

    result.headers['Set-Cookie'] = new CookieUtilities(
      payload
    ).generateCookie();
    console.log(result.headers['Set-Cookie']);

    return result;
  }
}

export default class MessageUtil {
  static success(
    statusCode: number,
    message = 'Success',
    data?: object
  ): Response {
    const result = new Result(statusCode, message, data);

    return result.response();
  }

  static successAuth(
    statusCode: number,
    message: string,
    accessToken: string,
    refreshToken: boolean,
    data?: object
  ): Response {
    const result = new Result(statusCode, message, data);

    return result.setCookie(result, accessToken, refreshToken).response();
  }

  static error(statusCode: number, message: string): Response {
    return new Result(statusCode, message).response();
  }
}
