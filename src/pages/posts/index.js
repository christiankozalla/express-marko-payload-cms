import payload from 'payload';
import template from './template.marko';

export default async (req, res) => {
  try {
    const posts = await payload.find({
      collection: 'posts'
    });

    console.log(posts);

    return res.marko(template, { posts: posts.docs });
  } catch (err) {
    if (err instanceof Error) {
      res.errorMessage = err.message;
      return res.redirect(`/error?message=${err.message}`);
    }
  }
};
