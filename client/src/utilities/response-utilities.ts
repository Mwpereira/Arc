import {AxiosResponse} from 'axios';
import BuefyService from '../services/buefy-service';
import store from '../store';

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
        BuefyService.dangerToast('Expired Token');
        return response;
    }
    switch (response.status) {
        case 502: {
            BuefyService.dangerToast('Server Offline');
            break;
        }
        case 409: {
            BuefyService.dangerToast(response.data.message);
            break;
        }
        case 404: {
            BuefyService.dangerToast(response.data.message);
            break;
        }
        case 403: {
            await checkInvalidTokenError();
            BuefyService.dangerToast('Expired Token');
            break;
        }
        case 401: {
            BuefyService.dangerToast(response.data.message);
            break;
        }
        case 400: {
            BuefyService.dangerToast(response.data.message);
            break;
        }
    }
    return response;
};

const checkInvalidTokenError = async (): Promise<void> => {
    await store.dispatch('logout');
};
