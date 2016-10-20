const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const filter = (arr, obj) => arr.filter(el => {
  const keys = Object.keys(obj);
  for (let i=0;i<keys.length;i++) {
    const key = keys[i];
    if (el[key] !== obj[key]) {
      return false;
    }
  }
  return true;
});

const find = (arr, obj) => {
  for (let i=0;i<arr.length;i++) {
    const el = arr[i];
    let valid = true;
    Object.keys(obj).forEach(key => {
      if (el[key] !== obj[key]) {
        valid = false;
      }
    });
    if (valid) {
      return el;
    }
  }
  return null;
};

const posts = [
  { id: 1, title: 'title 1', authorId: 1, votes: 0 },
  { id: 2, title: 'title 2', authorId: 2, votes: 0 },
  { id: 3, title: 'title 3', authorId: 3, votes: 0 },
  { id: 4, title: 'title 4', authorId: 4, votes: 0 },
];

const authors = [
 { id: 1, firstName: 'John', lastName: 'Doe' },
 { id: 2, firstName: 'Jane', lastName: 'Doe' },
 { id: 3, firstName: 'John', lastName: 'Smith' },
 { id: 4, firstName: 'Jane', lastName: 'Smith' },
];

let postType, authorType;

postType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    votes: { type: GraphQLInt },
    author: {
      type: authorType,
      resolve: (post) => {
        return find(authors, { id: post.authorId });
      }
    }
  })
});

authorType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    posts: {
      type: new GraphQLList(postType),
      resolve: (author) => {
        return filter(posts, { authorId: author.id });
      }
    }
  })
});


const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    authors: {
      type: new GraphQLList(authorType),
      resolve: () => authors
    }
  }
});

const schema = new GraphQLSchema({query: queryType});
module.exports = schema;
