import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-interval-demo',
  templateUrl: './interval-demo.html',
  styleUrls: ['./interval-demo.scss'],
})
export class IntervalDemoComponent implements OnInit, OnDestroy {
  count = 0;
  started = true;
  private subscription!: Subscription;

  ngOnInit(): void {
    this.startCounting();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  startCounting() {
    if (this.subscription && !this.subscription.closed) return;

    const source$ = interval(1000);
    this.subscription = source$.subscribe((value) => {
      this.count = value;
    });
  }

  stopCounting() {
    this.subscription.unsubscribe();
  }
}
