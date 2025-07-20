import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'interval',
    loadComponent: () =>
      import('./interval-demo/interval-demo').then(
        (m) => m.IntervalDemoComponent
      ),
  },
  {
    path: 'manual-observable',
    loadComponent: () =>
      import('./manual-observable/manual-observable').then(
        (m) => m.ManualObservableComponent
      ),
  },
  {
    path: 'operators',
    loadComponent: () =>
      import('./operators/operators').then((m) => m.Operators),
  },
  {
    path: '',
    redirectTo: 'interval',
    pathMatch: 'full',
  },
];
