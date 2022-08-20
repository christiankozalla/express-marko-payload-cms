import { Router } from 'express';
import indexPage from './pages/index/index';
import postsPage from './pages/posts';
import postPage from './pages/post';

import errorPage from './pages/error';

export default Router()
  .get('/', indexPage)
  .get('/posts', postsPage)
  .get('/posts/:id', postPage)
  .get('/error', errorPage);
