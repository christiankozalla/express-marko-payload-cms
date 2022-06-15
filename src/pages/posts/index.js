import payload from 'payload';
import template from './template.marko';

export default async (req, res) => {
  if (req.params.id) {
    try {
      const post = await payload.findByID({
        collection: 'posts', // required
        id: req.params.id, // required
        depth: 2,
        locale: 'de',
        fallbackLocale: false,
        overrideAccess: false,
        showHiddenFields: true
      });

      // if no post is found under params.id
      // an error is thrown by payload
      return res.marko(template, { post });
    } catch (err) {
      if (err instanceof Error) {
        res.errorMessage = err.message;
        return res.redirect(`/error`);
      }
    }
  }
  // no params.id
  res.marko(template, {});
};
