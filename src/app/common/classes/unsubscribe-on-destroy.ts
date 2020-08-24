import { OnDestroy, Directive } from '@angular/core';
import { Subject } from 'rxjs';

@Directive() // Fix for: 'Class is using Angular features but is not decorated. Please add an explicit Angular decorator.'
export abstract class UnsubscribeOnDestroy implements OnDestroy {
  protected destroyed$: Subject<void> = new Subject<void>();

  constructor() {
    const _ref$ = this.ngOnDestroy;
    this.ngOnDestroy = () => {
      _ref$();
      this.destroyed$.next();
      this.destroyed$.complete();
    };
  }

  public ngOnDestroy() {}
}
