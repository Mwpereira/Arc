import { AccessToken } from '../interfaces/access-token';

const cookie = require('cookie');

export default class CookieUtilities {
  private readonly cookie: string;
  private readonly expires: Date;
  private readonly path = '/';
  private readonly sameSite = 'NONE';
  private readonly secure = true;
  private readonly httpOnly = false;

  constructor(payload: AccessToken) {
    this.cookie = payload.cookie;
    this.expires = payload.expires;
  }

  /**
   * Generates JWT Cookie
   *
   * @return JWT Cookie
   */
  generateCookie(): Buffer {
    return cookie.serialize('accessToken', this.cookie, {
      expires: this.expires,
      path: this.path,
      sameSite: process.env.SERVER_MODE === 'PRODUCTION' ? this.sameSite : null,
      secure: process.env.SERVER_MODE === 'PRODUCTION' ? this.secure : null,
      httpOnly: this.httpOnly,
    });
  }

  /**
   * Grabs JWT Cookie from Header
   *
   * @return JWT Cookie
   */
  static getCookie(header: any): string {
    if (header.Cookie) {
      return header.Cookie;
    } else {
      return header.cookie;
    }
  }
}
