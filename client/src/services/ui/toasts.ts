import * as buefy from 'buefy';

/**
 * Toasts Messages
 */
export default class Toasts {
    public static success(message: string) {
        buefy.ToastProgrammatic.open({
            duration: 2500,
            message: message !== null ? message : 'Success',
            type: 'is-dark',
            position: 'is-bottom-right',
        });
    }

    public static danger(error: string) {
        buefy.ToastProgrammatic.open({
            duration: 2500,
            message: error !== null ? error : 'Error',
            type: 'is-danger',
            position: 'is-bottom-right',
        });
    }
}
