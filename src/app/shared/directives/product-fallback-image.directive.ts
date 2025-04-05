import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
} from '@angular/core';

@Directive({
  selector: 'img[appFallbackImage]',
  standalone: true,
})
export class ProductFallbackImageDirective {
  private _el = inject(ElementRef<HTMLElement>);
  @Input() appFallbackImage = 'Not Found';

  @HostListener('error')
  onImageError() {
    const encoded = encodeURIComponent(this.appFallbackImage);
    this._el.nativeElement.src = `https://placehold.co/700x800/e0e7ff/FFF?text=${encoded}&font=roboto`;
  }
}
