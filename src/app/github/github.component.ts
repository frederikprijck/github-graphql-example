import { Component } from '@angular/core';
import { Subject, Observable, BehaviorSubject, merge } from 'rxjs';
import { debounceTime, switchMap, withLatestFrom, map, distinctUntilChanged} from 'rxjs/operators';
import { GithubService } from './github.service';
import { User, PageInfo, SearchResult } from './github.model';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html'
})
export class GithubComponent {
  pageSize = 5;
  searchTerm$ = new Subject<string>();
  pageInfo$ = new BehaviorSubject<PageInfo>({ first: this.pageSize });

  filter$: Observable<{ term: string, pageInfo: PageInfo}>;
  result$: Observable<SearchResult<User>>;

  constructor(private githubService: GithubService) {
    this.initializeStream();
  }

  initializeStream() {
    this.filter$ = merge(
      this.searchTerm$.pipe(
        debounceTime(300),
        map(term => term.trim()),
        distinctUntilChanged(),
        map(term => ({term, pageInfo: { first: this.pageSize }}))
      ),
      this.pageInfo$.pipe(
        withLatestFrom(this.searchTerm$),
        map(([pageInfo, term]) => ({term, pageInfo}))
      )
    );

    this.result$ = this.filter$
      .pipe(
        switchMap(({term, pageInfo}) => this.githubService.search(term, pageInfo)),
      );
  }

  loadPreviousPage(event: any) {
    this.pageInfo$.next({
      last: this.pageSize,
      endCursor: event.startCursor
    });
  }

  loadNextPage(event: any) {
    this.pageInfo$.next({
      first: this.pageSize,
      startCursor: event.endCursor
    });
  }
}
