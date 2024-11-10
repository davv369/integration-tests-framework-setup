import URLS from '../../../fixtures/urls.json';
import IUrlManager from '../IUrlManager';
import UrlPaths from '../UrlPaths';
import { IUrl, Path } from '../models';

class JsonUrlManager implements IUrlManager {
    loadUrl(pathType: UrlPaths): IUrl {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
        const url = URLS[pathType];
        return { url, path: new Path('') };
    }
}

export default JsonUrlManager;
