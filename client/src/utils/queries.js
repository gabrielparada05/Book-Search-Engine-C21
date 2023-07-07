import { gql } from '@apollo/client';

export const QUERY_GET_ME = gql`
  query me {
    _id
    email
    password
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
    username
  }
`;
