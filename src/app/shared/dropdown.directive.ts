import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2, TemplateRef } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective{
    
    constructor(private elRef: ElementRef, private renderer: Renderer2){}
    @HostBinding('class.show') isShowed:boolean = false;

    @HostListener('click')  onClick(data: Event){
        let part = this.elRef.nativeElement.querySelector('.dropdown-menu');
        this.isShowed = !this.isShowed;
        if(this.isShowed){
            this.renderer.addClass(part,'show');
            this.renderer.setStyle(part,"marginTop","2.5rem");
        }else{
            this.renderer.removeClass(part,'show');
        }
        
        console.log('Click');
    }
}