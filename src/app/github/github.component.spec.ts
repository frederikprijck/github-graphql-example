import { TestBed, async } from '@angular/core/testing';
import { GithubComponent } from './github.component';
import { GithubSearchResultsComponent } from './github-search-results.component';
import { GithubSearchComponent } from './github-search.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { GithubUserComponent } from './github-user.component';
import { NoResultsComponent } from '../shared/no-results/no-results.component';
import { GithubService } from './github.service';
import { take } from 'rxjs/operators';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

describe('GithubComponent', () => {
  let githubSearch$ = of('b');
  const githubServiceMock = {
    search: () => githubSearch$
  };

  let testScheduler: TestScheduler;


  beforeEach(async(() => {
    spyOn(githubServiceMock, 'search').and.callThrough();

    testScheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });

    TestBed.configureTestingModule({
      declarations: [
        GithubSearchResultsComponent,
        GithubSearchComponent,
        GithubUserComponent,
        GithubComponent,

        /* Shared */
        PaginationComponent,
        NoResultsComponent
      ],
      providers: [
        { provide: GithubService, useValue: githubServiceMock }
      ]
    }).compileComponents();
  }));

  describe('filter$', () => {
    it('should not emit when searchTerm$ emits before 300ms have passed', () => {
      testScheduler.run(helpers => {
        const fixture = TestBed.createComponent(GithubComponent);
        const component = fixture.debugElement.componentInstance;

        component.pageInfo$   =  helpers.cold('-----');
        component.searchTerm$ =  helpers.cold('-a 250ms a-');
        const expected        =               '-- 250ms - 299ms b-';

        component.initializeStream();

        helpers.expectObservable(component.filter$).toBe(expected, {
          b: {
            term: 'a',
            pageInfo: {
              first: component.pageSize
            }
          }
        });
      });
    });

    it('should emit when searchTerm$ emits after 300ms have passed', () => {
      testScheduler.run(helpers => {
        const fixture = TestBed.createComponent(GithubComponent);
        const component = fixture.debugElement.componentInstance;

        component.pageInfo$   =  helpers.cold('-----');
        component.searchTerm$ =  helpers.cold('-a 310ms        -c-');
        const expected        =               '-- 299ms b- 9ms -- 299ms d-';

        component.initializeStream();

        helpers.expectObservable(component.filter$).toBe(expected, {
          b: {
            term: 'a',
            pageInfo: {
              first: component.pageSize
            }
          },
          d: {
            term: 'c',
            pageInfo: {
              first: component.pageSize
            }
          }
        });
      });
    });

    it('should not emit when searchTerm$ emits the same, trimmed, value after 300ms have passed', () => {
      testScheduler.run(helpers => {
        const fixture = TestBed.createComponent(GithubComponent);
        const component = fixture.debugElement.componentInstance;

        component.pageInfo$   =  helpers.cold('-----');
        component.searchTerm$ =  helpers.cold('-a 310ms        -c-', { a: 'foo', c: 'foo  ' });
        const expected        =               '-- 299ms b- 9ms -- 299ms -';

        component.initializeStream();

        helpers.expectObservable(component.filter$).toBe(expected, {
          b: {
            term: 'foo',
            pageInfo: {
              first: component.pageSize
            }
          }
        });
      });
    });

    it('should use the last known searchTerm$ when pageInfo emits', () => {
      testScheduler.run(helpers => {
        const fixture = TestBed.createComponent(GithubComponent);
        const component = fixture.debugElement.componentInstance;

        component.pageInfo$   =  helpers.cold('-- 310ms -      -x-', { x: { first: 20 } });
        component.searchTerm$ =  helpers.cold('-a 310ms -      ---');
        const expected        =               '-- 299ms b 11ms -c-';

        component.initializeStream();

        helpers.expectObservable(component.filter$).toBe(expected, {
          b: {
            term: 'a',
            pageInfo: {
              first: component.pageSize
            }
          },
          c: {
            term: 'a',
            pageInfo: {
              first: 20
            }
          }
        });
      });
    });

  });

  describe('result$', () => {
    it('should setup the result stream based on pageInfo$ and searchTerm$', () => {
      testScheduler.run(helpers => {
        const fixture = TestBed.createComponent(GithubComponent);
        const component = fixture.debugElement.componentInstance;

        component.pageInfo$   =  helpers.cold('----');
        component.searchTerm$ =  helpers.cold('-a--');
        const expected        =               '-- 299ms b-';

        component.initializeStream();

        helpers.expectObservable(component.result$).toBe(expected);
      });
    });

    it('should not emit when searchTerm$ emits before github search has emitted', () => {
      testScheduler.run(helpers => {
        const fixture = TestBed.createComponent(GithubComponent);
        const component = fixture.debugElement.componentInstance;

        // todo: avoid ?
        githubSearch$ = helpers.cold('500ms b|');

        component.pageInfo$   = helpers.cold('-----');
        component.searchTerm$ = helpers.cold('-a 299ms - 20ms - c');
        const expected        =              '-- 299ms - 20ms - 299ms - 500ms b';

        component.initializeStream();

        helpers.expectObservable(component.result$).toBe(expected);
      });
    });
  });

  describe('pagination', () => {
    it(`calling loadNextPage should emit the pageInfo$ accordingly'`, async() => {
      const fixture = TestBed.createComponent(GithubComponent);
      const component = fixture.debugElement.componentInstance;
      const pageInfoBefore = await component.pageInfo$.pipe(take(1)).toPromise();

      component.loadNextPage({
        endCursor: 'foo'
      });

      const pageInfoAfter = await component.pageInfo$.pipe(take(1)).toPromise();

      expect(pageInfoBefore.startCursor).toBeFalsy();
      expect(pageInfoBefore.endCursor).toBeFalsy();
      expect(pageInfoBefore.first).toEqual(component.pageSize);
      expect(pageInfoAfter.startCursor).toEqual('foo');
      expect(pageInfoAfter.first).toEqual(component.pageSize);
    });

    it(`calling loadPreviousPage should emit the pageInfo$ accordingly'`, async () => {
      const fixture = TestBed.createComponent(GithubComponent);
      const component = fixture.debugElement.componentInstance;

      const pageInfoBefore = await component.pageInfo$.pipe(take(1)).toPromise();

      component.loadPreviousPage({
        startCursor: 'foo'
      });

      const pageInfoAfter = await component.pageInfo$.pipe(take(1)).toPromise();

      expect(pageInfoBefore.startCursor).toBeFalsy();
      expect(pageInfoBefore.endCursor).toBeFalsy();
      expect(pageInfoAfter.endCursor).toEqual('foo');
      expect(pageInfoBefore.first).toEqual(component.pageSize);
      expect(pageInfoAfter.last).toEqual(component.pageSize);
      expect(pageInfoAfter.first).toBeFalsy();
    });
  });
});
