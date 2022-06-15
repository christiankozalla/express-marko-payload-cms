import { Router } from 'express';
import indexPage from './pages/index';
import postsPage from './pages/posts';

import errorPage from './pages/error';

export default Router()
  .get('/', indexPage)
  .get('/posts', postsPage)
  .get('/posts/:id', postsPage)
  .get('/error', errorPage);
