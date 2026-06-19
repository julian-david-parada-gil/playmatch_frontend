import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Noticia from './noticia';
import NoticiaDeleteDialog from './noticia-delete-dialog';
import NoticiaDetail from './noticia-detail';
import NoticiaUpdate from './noticia-update';

const NoticiaRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Noticia />} />
    <Route path="new" element={<NoticiaUpdate />} />
    <Route path=":id">
      <Route index element={<NoticiaDetail />} />
      <Route path="edit" element={<NoticiaUpdate />} />
      <Route path="delete" element={<NoticiaDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default NoticiaRoutes;
