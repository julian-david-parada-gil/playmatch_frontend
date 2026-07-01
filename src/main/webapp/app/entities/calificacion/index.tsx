import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Calificacion from './calificacion';
import CalificacionDeleteDialog from './calificacion-delete-dialog';
import CalificacionDetail from './calificacion-detail';
import CalificacionUpdate from './calificacion-update';
import PrivateRoute from 'app/shared/auth/private-route';
import { Authority } from 'app/shared/jhipster/constants';

const CalificacionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Calificacion />} />
    <Route
      path="new"
      element={
        <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.USER]}>
          <CalificacionUpdate />
        </PrivateRoute>
      }
    />
    <Route path=":id">
      <Route index element={<CalificacionDetail />} />
      <Route
        path="edit"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN]}>
            <CalificacionUpdate />
          </PrivateRoute>
        }
      />
      <Route
        path="delete"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN]}>
            <CalificacionDeleteDialog />
          </PrivateRoute>
        }
      />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CalificacionRoutes;
