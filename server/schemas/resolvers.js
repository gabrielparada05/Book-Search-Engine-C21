const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (parent, { bookAuthor, title, bookId, image, link }, context) => {
      if (!context.user) {
        throw new Error('Authentication required');
      }

      const newBook = new Book({
        bookAuthor,
        title,
        bookId,
        image,
        link,
        userId: context.user.id,
      });

      try {

        const savedBook = await newBook.save();
        return savedBook;
      } catch (error) {
        throw new Error('Failed to save book');
      }
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const book = await Book.findOneAndDelete({
          id: bookId
          // user: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { books: book } }
        );

        return User
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  } }

  module.exports = resolvers;
