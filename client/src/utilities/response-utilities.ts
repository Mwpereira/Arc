import store from '../store';
import router from '../router/router';
import {AxiosResponse} from 'axios';
import Toasts from '../services/ui/toasts';
import Loading from '../services/ui/loading';

/**
 * Response Utilities for Client
 */
export const successProcessor = (response: AxiosResponse): boolean => {
    return response.status === 200;
};

export const successAuthProcessor = (response: AxiosResponse): boolean => {
    return response.status === 302 || response.status === 201;
};

export const errorProcessor = async (
    response: AxiosResponse,
): Promise<AxiosResponse> => {
    if (response === undefined) {
        await checkInvalidTokenError();
        Toasts.danger('Expired Token');
        return response;
    }
    switch (response.status) {
        case 502: {
            Toasts.danger('Server Offline');
            break;
        }
        case 409: {
            Toasts.danger(response.data.message);
            break;
        }
        case 404: {
            Toasts.danger(response.data.message);
            break;
        }
        case 403: {
            await checkInvalidTokenError();
            Toasts.danger('Expired Token');
            break;
        }
        case 401: {
            Toasts.danger(response.data.message);
            break;
        }
        case 400: {
            Toasts.danger(response.data.message);
            break;
        }
    }
    return response;
};

const checkInvalidTokenError = async (): Promise<void> => {
    await store.dispatch('logout');
};
