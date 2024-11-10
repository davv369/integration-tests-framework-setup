import Path from './Path';

interface IUrl {
    url: string;
    path: Path;
    query?: Record<string, string>;
}

export default IUrl;
