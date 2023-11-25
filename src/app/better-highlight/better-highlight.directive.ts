import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  
  @Input() defaultColor: string= 'transparent';
  @Input() highlightColor: string;

  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { 
  }
  
  ngOnInit(): void {
    this.backgroundColor= this.defaultColor;
    //this.renderer.setStyle(this.elRef.nativeElement,'background-color','yellow');
  }

  @HostListener('mouseenter') mouseover(eventData: Event){
    this.backgroundColor=this.highlightColor;
    //this.renderer.setStyle(this.elRef.nativeElement,'background-color','yellow');
  }
  @HostListener('mouseleave') mouseleave(eventData: Event){
    //this.renderer.setStyle(this.elRef.nativeElement,'background-color','transparent');
    this.backgroundColor=this.defaultColor;
  }
}
