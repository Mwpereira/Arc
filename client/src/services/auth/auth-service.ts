import axios, { AxiosResponse } from 'axios';
import * as Cookies from 'js-cookie';
import { errorProcessor } from '../../utilities/response-utilities';

axios.defaults.withCredentials = true;

/**
 * Auth Service Class
 */
export default class AuthService {

  public static async register(user: object): Promise<AxiosResponse> {
    return axios
      .post(`${this.url}/auth/register`, JSON.stringify({ user }))
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error) => {
        return errorProcessor(error.response);
      });
  }

  public static async login(user: object): Promise<AxiosResponse> {
    return axios
      .post(`${this.url}/auth/login`, JSON.stringify({ user }))
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error) => {
        return errorProcessor(error.response);
      });
  }

  public static async logout(): Promise<void> {
    if (process.env.VUE_APP_MODE === 'PRODUCTION'){
      Cookies.remove('accessToken');
    }
    else {
      Cookies.remove('accessToken');
    }
  }

  public static async refreshToken(): Promise<AxiosResponse> {
    return axios
      .get(`${this.url}/auth/refresh`)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  private static readonly url: any =
    process.env.VUE_APP_MODE === 'PRODUCTION'
      ? `https://${process.env.VUE_APP_API}`
      : `http://${process.env.VUE_APP_API_LOCAL}`;
}
