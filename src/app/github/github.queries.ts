import gql from 'graphql-tag';

export const searchUsers = gql`
  query searchUsers($query: String!, $before: String, $after: String, $first: Int, $last: Int) {
    search(first: $first, last: $last, query: $query, type: USER, before: $before, after: $after) {
      totalCount: userCount,
      pageInfo {
        hasPreviousPage,
        hasNextPage,
        startCursor,
        endCursor
      }
      edges {
        node {
          ... on Node {
            type: __typename
          },
          ... on User {
            name,
            login,
            email,
            bio,
            location,
            avatarUrl,
            url,
            company,
            followers {
              totalCount
            },
            following {
              totalCount
            },
            starredRepositories {
              totalCount
            }
          },
          ... on Organization {
            name,
            login,
            email,
            bio: description,
            location,
            avatarUrl,
            url
          }
        },
      }
    }
  }
`;
