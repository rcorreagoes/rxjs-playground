import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-manual-observable',
  templateUrl: './manual-observable.html',
})
export class ManualObservableComponent implements OnDestroy {
  values: number[] = [];
  private subscription: Subscription | null = null;

  start() {
    this.values = [];

    const customObservable = new Observable<number>((observer) => {
      let count = 0;

      const intervalId = setInterval(() => {
        observer.next(count++);
        if (count > 5) {
          observer.complete();
          clearInterval(intervalId);
        }
      }, 1000);

      return () => {
        clearInterval(intervalId);
        console.log('Observable cancelado!');
      };
    });

    this.subscription = customObservable.subscribe({
      next: (value) => this.values.push(value),
      complete: () => this.values.push(-1),
    });
  }

  stop() {
    this.subscription?.unsubscribe();
    this.subscription = null;
  }

  ngOnDestroy(): void {
    this.stop();
  }
}
