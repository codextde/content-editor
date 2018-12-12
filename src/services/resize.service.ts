import { Injectable } from '@angular/core';

declare function elementResizeDetectorMaker(options?: elementResizeDetectorMaker.ErdmOptions): elementResizeDetectorMaker.Erd;

declare namespace elementResizeDetectorMaker {
    interface ErdmOptions {
        strategy?: 'scroll' | 'object';
    }

    interface Erd {
        listenTo(element: HTMLElement, callback: (elem: HTMLElement) => void);
        removeListener(element: HTMLElement, callback: (elem: HTMLElement) => void);
        removeAllListeners(element: HTMLElement);
        uninstall(element: HTMLElement);
    }
}

@Injectable()
export class ResizeService {
  private resizeDetector: any;

  constructor() {
    this.resizeDetector = elementResizeDetectorMaker({ strategy: 'scroll' });
  }

  addResizeEventListener(element: HTMLElement, handler: Function) {
    this.resizeDetector.listenTo(element, handler);
  }

  removeResizeEventListener(element: HTMLElement) {
    this.resizeDetector.uninstall(element);
  }
}