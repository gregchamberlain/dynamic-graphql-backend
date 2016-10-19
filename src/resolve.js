const resolveFunctions = {
  Query: {
    posts() {
      return posts;
    },
  },
  Mutation: {
    upvotePost(_, { postId }) {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },
  Author: {
    posts(author) {
      return filter(posts, { authorId: author.id });
    },
  },
  Post: {
    author(post) {
      return find(authors, { id: post.authorId });
    },
  },
};

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

export default resolveFunctions;
