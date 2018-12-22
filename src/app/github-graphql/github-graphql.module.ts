import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpHeaders } from '@angular/common/http';
import { githubFragmentMatcher } from './github-fragment.matcher';

const uri = 'https://api.github.com/graphql';

export function createApollo(httpLink: HttpLink) {
  const http = httpLink.create({ uri });
  const auth = setContext(() => {
    const token = '';
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };
  });
  return {
    link: auth.concat(http),
    cache: new InMemoryCache({fragmentMatcher: githubFragmentMatcher}),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GithubGraphQLModule {}
