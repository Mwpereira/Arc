import * as buefy from 'buefy';
import {BLoadingComponent} from 'buefy/types/components';

/**
 * Loading Screen
 */
export default class Loading {
    public static loadingComponent: BLoadingComponent;

    public static start() {
        this.loadingComponent = buefy.LoadingProgrammatic.open({
            container: null,
        });
    }

    public static stop() {
        this.loadingComponent.close();
    }
}
