import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Grupo from './grupo';
import GrupoDeleteDialog from './grupo-delete-dialog';
import GrupoDetail from './grupo-detail';
import GrupoUpdate from './grupo-update';
import PrivateRoute from 'app/shared/auth/private-route';
import { Authority } from 'app/shared/jhipster/constants';

const GrupoRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Grupo />} />
    <Route
      path="new"
      element={
        <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ADMINGRUPO]}>
          <GrupoUpdate />
        </PrivateRoute>
      }
    />
    <Route path=":id">
      <Route index element={<GrupoDetail />} />
      <Route
        path="edit"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ADMINGRUPO]}>
            <GrupoUpdate />
          </PrivateRoute>
        }
      />
      <Route
        path="delete"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ADMINGRUPO]}>
            <GrupoDeleteDialog />
          </PrivateRoute>
        }
      />
    </Route>
  </ErrorBoundaryRoutes>
);

export default GrupoRoutes;
