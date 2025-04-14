import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
} from '@angular/core';

/**
 * ProductFallbackImageDirective provides a fallback mechanism for broken image URLs.
 * It replaces the image source with a placeholder image that includes the provided fallback text.
 *
 * Usage:
 *   <img [src]="product.img" [appFallbackImage]="product.name" />
 *
 * If the image fails to load, a placeholder will be shown instead with the provided product's name (or 'Not Found' by default) displayed.
 */
@Directive({
  selector: 'img[appFallbackImage]',
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
