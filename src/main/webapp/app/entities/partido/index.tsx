import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Partido from './partido';
import PartidoDeleteDialog from './partido-delete-dialog';
import PartidoDetail from './partido-detail';
import PartidoUpdate from './partido-update';
import PrivateRoute from 'app/shared/auth/private-route';
import { Authority } from 'app/shared/jhipster/constants';

const PartidoRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Partido />} />
    <Route
      path="new"
      element={
        <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ORGANIZADOR]}>
          <PartidoUpdate />
        </PrivateRoute>
      }
    />
    <Route path=":id">
      <Route index element={<PartidoDetail />} />
      <Route
        path="edit"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ORGANIZADOR]}>
            <PartidoUpdate />
          </PrivateRoute>
        }
      />
      <Route
        path="delete"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ORGANIZADOR]}>
            <PartidoDeleteDialog />
          </PrivateRoute>
        }
      />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PartidoRoutes;
