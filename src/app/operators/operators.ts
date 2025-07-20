import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  delay,
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  exhaustMap,
  filter,
  from,
  map,
  merge,
  mergeAll,
  mergeMap,
  Observable,
  of,
  switchMap,
  toArray,
} from 'rxjs';

@Component({
  selector: 'app-operators',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './operators.html',
  styleUrl: './operators.scss',
})
export class Operators implements OnInit {
  resultMapFilter: number[] = [];
  searchInput = new FormControl('');
  query = new FormControl('');

  combinedResult: { id: number; nome: string }[] = [];
  mergeResult: { id: number; nome: string }[] = [];
  mergeResult2: { id: number; nome: string }[][] = [];
  resultSwitchMap = '';
  resultMergeMap = '';
  resultExhaustMap = '';
  resultWithoutSwitchMap = '';

  lastTerm: string = '';
  allTerms: string[] = [];
  withDistinct: string[] = [];
  keyChanged: { id: number; nome: string }[] = [];

  ngOnInit(): void {
    this.debounces();
    this.mapFilter();
    this.switch();
  }

  debounces() {
    this.searchInput.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        if (!value) return;
        this.lastTerm = value;
        this.allTerms.push(value);
      });

    this.searchInput.valueChanges
      .pipe(debounceTime(500), distinct())
      .subscribe((value) => {
        if (!value) return;
        this.withDistinct.push(value);
      });

    const usuarios = [
      { id: 1, nome: 'Ana' },
      { id: 1, nome: 'Ana' },
      { id: 2, nome: 'Carlos' },
      { id: 2, nome: 'Carlos' },
      { id: 3, nome: 'Ana' },
    ];

    from(usuarios)
      .pipe(distinctUntilKeyChanged('id'))
      .subscribe((usuario) => this.keyChanged.push(usuario));
  }

  mapFilter() {
    from([1, 2, 3, 4, 5, 6])
      .pipe(
        filter((n) => n % 2 === 0),
        map((n) => n * 2)
      )
      .subscribe((val) => this.resultMapFilter.push(val));
  }

  switch(): void {
    this.query.valueChanges
      .pipe(switchMap((term) => this.fakeApi1(term ?? '')))
      .subscribe((res) => (this.resultSwitchMap = res));

    this.query.valueChanges
      .pipe(mergeMap((term) => this.fakeApi1(term ?? '')))
      .subscribe((res) => (this.resultMergeMap = res));

    this.query.valueChanges
      .pipe(exhaustMap((term) => this.fakeApi1(term ?? '')))
      .subscribe((res) => (this.resultExhaustMap = res));

    this.query.valueChanges.subscribe(
      (res) => (this.resultWithoutSwitchMap = res ?? '')
    );

    const api3 = this.fakeApi3();
    const api4 = this.fakeApi4();

    combineLatest([api3, api4]).subscribe((result) => {
      console.log(result);
      this.combinedResult = result.flatMap((item) => item);
    });

    merge(api3, api4).subscribe((result) => {
      this.mergeResult = [...this.mergeResult, ...result];
    });

    from([api3, api4])
      .pipe(mergeAll(), toArray())
      .subscribe((result) => {
        this.mergeResult2 = result;
      });
  }

  fakeApi1(term: string) {
    return of(term).pipe(delay(1000));
  }

  fakeApi2(term: string) {
    return of(term).pipe(delay(5000));
  }

  fakeApi3(): Observable<{ id: number; nome: string }[]> {
    return of([
      { id: 1, nome: 'Ana' },
      { id: 3, nome: 'Carlos' },
    ]);
  }

  fakeApi4(): Observable<{ id: number; nome: string }[]> {
    return of([
      { id: 2, nome: 'Maria' },
      { id: 4, nome: 'João' },
    ]);
  }
}
