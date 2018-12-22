export interface PageInfo {
  startCursor?: string;
  endCursor?: string;
  first?: number;
  last?: number;
}

export interface User {
  type: string;
  name: string;
  login: string;
  email: string;
  bio: string;
  location: string;
  avatarUrl: string;
  url: string;
  company: string;
  followers: {
    totalCount: number
  };
  following: {
    totalCount: number
  };
  starredRepositories: {
    totalCount: number
  };
}

export interface SearchResult<T> {
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor?: string;
  endCursor?: string;
  items: Array<T>;
}
