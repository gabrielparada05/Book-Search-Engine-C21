const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: email
    password:String 
    savedBooks:[bookSchema]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: [User]
  
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: email!, password:String!): Auth
    saveBook([bookAuthor:String!], title:String!, bookId:String!, image:String!, link:String!): User
    removeBook(bookId:String!):User
  }
`;
module.exports = typeDefs;
