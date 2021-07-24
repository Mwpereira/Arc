import * as buefy from 'buefy';
import {BLoadingComponent} from 'buefy/types/components';

/**
 * Buefy UI Service Class
 */
export default class BuefyService {
    public static loadingComponent: BLoadingComponent;

    public static startLoading() {
        this.loadingComponent = buefy.LoadingProgrammatic.open({
            container: null,
        });
    }

    public static stopLoading() {
        this.loadingComponent.close();
    }

    public static successToast(message: string) {
        buefy.ToastProgrammatic.open({
            duration: 2000,
            message: message !== null ? message : 'Success',
            type: 'is-dark',
            position: 'is-bottom-right',
        });
    }

    public static dangerToast(error: string) {
        buefy.ToastProgrammatic.open({
            duration: 2000,
            message: error !== null ? error : 'Error',
            type: 'is-danger',
            position: 'is-bottom-right',
        });
    }
}
