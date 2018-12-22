import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { fragmentTypes as introspectionQueryResultData } from './github-fragment.types';

export const githubFragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});
