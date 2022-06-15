import template from './template.marko';
import payload from 'payload';

export default (req, res) => {
  res.marko(template, {});
};
