import { ComponentFactoryResolver, ComponentRef, Directive, HostListener, Input, ViewContainerRef, NgZone } from '@angular/core';
import { TooltipComponent } from 'src/components/general/tooltip/tooltip.component';
import { Subscription, fromEvent } from 'rxjs';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    private tooltip: ComponentRef<TooltipComponent>;
    private visible: boolean;
    private eventSubscription: Subscription;
    private passageContent: HTMLElement;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(private viewContainerRef: ViewContainerRef,
                private resolver: ComponentFactoryResolver) {
    }

    

    // -------------------------------------------------------------------------
    // Inputs / Outputs
    // -------------------------------------------------------------------------

    @Input('tooltip')
    content: string|TooltipComponent;

    @Input()
    tooltipDisabled: boolean;

    @Input()
    tooltipAnimation: boolean = true;

    @Input()
    tooltipPlacement: 'top'|'bottom'|'left'|'right' = 'bottom';


    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    subscribeScroll() {
        if (!this.passageContent) {
            this.passageContent = document.querySelector('.passage-content');
        }
        if (!this.eventSubscription && this.passageContent) {
            this.eventSubscription = fromEvent(this.passageContent, 'scroll')
            .subscribe(() => {
                this.updatePosition();
            });
        }
    }

    updatePosition() {
        if (this.content instanceof TooltipComponent) {
            (this.content as TooltipComponent).show();
        }
    }

    @HostListener('focusin')
    @HostListener('mouseenter')
    show(): void {
        this.subscribeScroll();

        if (this.tooltipDisabled || this.visible) {
            return;
        }

        this.visible = true;
        if (typeof this.content === 'string') {
            const factory = this.resolver.resolveComponentFactory(TooltipComponent);
            if (!this.visible) {
                return;
            }

            this.tooltip = this.viewContainerRef.createComponent(factory);
            this.tooltip.instance.hostElement = this.viewContainerRef.element.nativeElement;
            this.tooltip.instance.content = this.content as string;
            this.tooltip.instance.placement = this.tooltipPlacement;
            this.tooltip.instance.animation = this.tooltipAnimation;
        } else {
            const tooltip = this.content as TooltipComponent;
            tooltip.hostElement = this.viewContainerRef.element.nativeElement;
            tooltip.placement = this.tooltipPlacement;
            tooltip.animation = this.tooltipAnimation;
            tooltip.show();
        }
    }

    @HostListener('focusout')
    @HostListener('mouseleave')
    hide(): void {
        if (this.eventSubscription) {
            this.eventSubscription.unsubscribe();
            this.eventSubscription = null;
        }

        if (!this.visible) {
            return;
        }

        this.visible = false;
        if (this.tooltip) {
            this.tooltip.destroy();
        }

        if (this.content instanceof TooltipComponent) {
            (this.content as TooltipComponent).hide();
        }
    }
}
