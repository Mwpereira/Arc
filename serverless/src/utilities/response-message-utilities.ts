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
    const response: Response = {
      statusCode: this.statusCode,
      body: JSON.stringify(this.data),
      headers: this.headers,
    };
    console.log(response);

    return response;
  }

  setCookie(result: Result, accessToken: string, refreshToken: boolean) {
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
    let result = new Result(statusCode, message, data);
    result = result.setCookie(result, accessToken, refreshToken);

    return result.response();
  }

  static error(statusCode: number, message: string) {
    const result = new Result(statusCode, message);

    return result.response();
  }
}
