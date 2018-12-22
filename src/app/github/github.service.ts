import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { searchUsers } from './github.queries';
import { PageInfo, SearchResult, User } from './github.model';

@Injectable()
export class GithubService {
  constructor(private apollo: Apollo) {}

  search(query: string, pageInfo: PageInfo): Observable<SearchResult<User>> {

    const {before, after, first, last} = this.parsePageInfo(pageInfo);

    return this.apollo.query({
      query: searchUsers,
      variables: {
        query,
        before,
        after,
        first,
        last
      }
    }).pipe(
      map((result: any) => {
        return {
          totalCount: result.data.search.totalCount,
          hasPreviousPage: result.data.search.pageInfo.hasPreviousPage,
          hasNextPage: result.data.search.pageInfo.hasNextPage,
          startCursor: result.data.search.pageInfo.startCursor,
          endCursor: result.data.search.pageInfo.endCursor,
          items: result.data.search.edges.map(edge => edge.node)
        };
      }),
      // Swalling errors for the sake of simplicity for this interview exercise
      catchError(err => {
        console.error(err);
        return of(null);
      })
    );
  }

  private parsePageInfo(pageInfo: PageInfo) {
    return {
      before: pageInfo.endCursor,
      after: pageInfo.startCursor,
      first: pageInfo.first,
      last: pageInfo.last
    };
  }
}
