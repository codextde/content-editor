import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {
    static locationUrl: string;

    constructor() {

    }

    getLocationUrl() {
        return new Promise((resolve, reject) => {
            let cE = document.querySelector('eassessment-content-editor');
            LoaderService.locationUrl = cE.getAttribute('location-url') || './';
            resolve();
        })
    }
}
