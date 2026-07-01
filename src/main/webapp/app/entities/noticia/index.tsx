import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Noticia from './noticia';
import NoticiaDeleteDialog from './noticia-delete-dialog';
import NoticiaDetail from './noticia-detail';
import NoticiaUpdate from './noticia-update';
import PrivateRoute from 'app/shared/auth/private-route';
import { Authority } from 'app/shared/jhipster/constants';

const NoticiaRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Noticia />} />
    <Route
      path="new"
      element={
        <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, AuthorityORGANIZADOR, AuthorityADMINGRUPO]}>
          <NoticiaUpdate />
        </PrivateRoute>
      }
    />
    <Route path=":id">
      <Route index element={<NoticiaDetail />} />
      <Route
        path="edit"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, AuthorityORGANIZADOR, AuthorityADMINGRUPO]}>
            <NoticiaUpdate />
          </PrivateRoute>
        }
      />
      <Route
        path="delete"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, AuthorityORGANIZADOR, AuthorityADMINGRUPO]}>
            <NoticiaDeleteDialog />
          </PrivateRoute>
        }
      />
    </Route>
  </ErrorBoundaryRoutes>
);

export default NoticiaRoutes;
