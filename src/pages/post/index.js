import payload from 'payload';
import template from './template.marko';
import { serialize } from '../../lib/rich-text-serializer';

export default async (req, res) => {
  if (req.params.id) {
    try {
      const post = await payload.findByID({
        collection: 'posts', // required
        id: req.params.id // required
      });

      post.html = serialize(post.content);

      // if no post is found under params.id
      // an error is thrown by payload
      return res.marko(template, { post });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        return res.redirect(`/error?message=${err.message}`);
      }
    }
  }
  // no params.id
  res.redirect('/posts');
};
