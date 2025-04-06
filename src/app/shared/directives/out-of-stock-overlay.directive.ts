import { Directive, effect, ElementRef, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRemainingAmount } from '../../store/stock/stock.selectors';

/**
 * OutOfStockOverlayDirective visually overlays an "Out of stock" label and blur effect
 * on any host element (planeed to be used with ProductCardComponent) if the product is out of stock.
 *
 * Usage:
 *   <div [appOutOfStockOverlay]="product.id"></div>
 *
 * Dynamically adds DOM elements to indicate out-of-stock status by checking
 * the remaining quantity in store via selector.
 */
@Directive({
  selector: '[appOutOfStockOverlay]',
  standalone: true,
})
export class OutOfStockOverlayDirective {
  private _store = inject(Store);
  private _el = inject(ElementRef<HTMLElement>);

  @Input() appOutOfStockOverlay!: string;

  constructor() {
    effect(() => {
      const remaining = this._store.selectSignal(
        selectRemainingAmount(this.appOutOfStockOverlay)
      );

      const hostEl = this._el.nativeElement;
      hostEl.classList.add('relative');

      // Create two elements. The first is a blurred overlay, the second is a label that shows "Out of stock"
      const elementsToCreate = [
        {
          type: 'div',
          id: `out-of-stock-overlay-${this.appOutOfStockOverlay}`,
          class:
            'absolute inset-0 bg-white/70 backdrop-blur-[7px] z-2 rounded-sm',
          inner: '',
        },
        {
          type: 'span',
          id: `out-of-stock-label-${this.appOutOfStockOverlay}`,
          class:
            'absolute top-2 right-2 bg-indigo-700 text-white text-xs font-semibold px-2 py-1 z-3 rounded shadow-md uppercase tracking-wide',
          inner: 'Out of stock',
        },
      ];

      for (const element of elementsToCreate) {
        const oldElement = hostEl.querySelector(`#${element.id}`);
        if (oldElement) oldElement.remove();

        if (remaining() <= 0) {
          const createdEl = document.createElement(element.type);
          createdEl.id = element.id;
          createdEl.className = element.class;
          createdEl.innerText = element.inner;

          hostEl.appendChild(createdEl);
        }
      }
    });
  }
}
