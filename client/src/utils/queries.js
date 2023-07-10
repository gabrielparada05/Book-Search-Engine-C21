import { gql } from '@apollo/client';

export const QUERY_GET_ME = gql`
  query me($userId: ID!) {
    user(id: $userId) {
      _id
      email
      password
      username
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }
`;
