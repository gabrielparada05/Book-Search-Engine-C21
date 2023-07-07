import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookAuthor: [String!]!, $title: String!, $bookId: String!, $image: String!, $link: String!) {
  saveBook(bookAuthor: $bookAuthor, title: $title, bookId: $bookId, image: $image, link: $link) {
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



export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook($bookId: String!) {
      username
    }
  }
`;

