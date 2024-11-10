import interpole from 'string-interpolation-js';

class Path {
    constructor(private _path: string) {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructPath(pathArguments: any): string {
        return interpole(this._path, pathArguments ?? {}, {
            exactMatch: true,
            specElement: '_',
            pattern: '{{ _ }}',
        });
    }
}

export default Path;
