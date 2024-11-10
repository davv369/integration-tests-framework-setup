import UrlPaths from './UrlPaths';
import IUrl from './models/IUrl';

interface IUrlManager {
    loadUrl(pathType: UrlPaths): IUrl;
}

export default IUrlManager;
