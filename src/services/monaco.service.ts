import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

let loadedMonaco: boolean = false;
let loadPromise: Promise<void>;

@Injectable({
    providedIn: 'root',
})
export class MonacoService {
    constructor() {}

    loadMonaco(): Promise<void> {
        if (!loadedMonaco) {
            loadedMonaco = true;
            loadPromise = new Promise<void>((resolve: any) => {
                const baseUrl = Location.joinWithSlash(
                    window.location.pathname,
                    '/assets'
                );
                if (typeof (<any>window).monaco === 'object') {
                    resolve((<any>window).monaco);
                    return;
                }
                const onGotAmdLoader: any = () => {
                    // Load monaco
                    (<any>window).require.config({
                        paths: { vs: `${baseUrl}/monaco/vs` },
                    });
                    (<any>window).require(['vs/editor/editor.main'], () => {
                        resolve((<any>window).monaco);
                    });
                };

                // Load AMD loader if necessary
                if (!(<any>window).require) {
                    const loaderScript: HTMLScriptElement =
                        document.createElement('script');
                    loaderScript.type = 'text/javascript';
                    loaderScript.src = `${baseUrl}/monaco/vs/loader.js`;
                    loaderScript.addEventListener('load', onGotAmdLoader);
                    document.body.appendChild(loaderScript);
                } else {
                    onGotAmdLoader();
                }
            });
        }

        return loadPromise;
    }
}
