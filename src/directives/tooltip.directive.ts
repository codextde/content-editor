import { ComponentFactoryResolver, ComponentRef, Directive, HostListener, Input, ViewContainerRef, ElementRef } from '@angular/core';
import { TooltipComponent } from 'src/components/general/tooltip/tooltip.component';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    private tooltip: ComponentRef<TooltipComponent>;
    private visible: boolean;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(private viewContainerRef: ViewContainerRef,
                private resolver: ComponentFactoryResolver,
                private elementRef: ElementRef) {
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

    @Input()
    tooltipClick: boolean = false;


    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (this.elementRef.nativeElement.contains(event.target)) {
            this.show();
        } else {
            this.hide();
        }
    }

    @HostListener('focusin')
    @HostListener('mouseenter')
    focusin(): void {
        if (!this.tooltipClick) {
            this.show();
        }
    }

    @HostListener('focusout')
    @HostListener('mouseleave')
    focusout(): void {
        if (!this.tooltipClick) {
            this.hide();
        }
    }

    hide() {
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


    show() {
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
}
