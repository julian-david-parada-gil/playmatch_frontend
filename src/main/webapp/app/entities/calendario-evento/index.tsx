import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CalendarioEvento from './calendario-evento';
import CalendarioEventoDeleteDialog from './calendario-evento-delete-dialog';
import CalendarioEventoDetail from './calendario-evento-detail';
import CalendarioEventoUpdate from './calendario-evento-update';
import PrivateRoute from 'app/shared/auth/private-route';
import { Authority } from 'app/shared/jhipster/constants';

const CalendarioEventoRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CalendarioEvento />} />
    <Route
      path="new"
      element={
        <PrivateRoute hasAnyAuthorities={[Authority.ADMIN]}>
          <CalendarioEventoUpdate />
        </PrivateRoute>
      }
    />
    <Route path=":id">
      <Route index element={<CalendarioEventoDetail />} />
      <Route
        path="edit"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN]}>
            <CalendarioEventoUpdate />
          </PrivateRoute>
        }
      />
      <Route
        path="delete"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN]}>
            <CalendarioEventoDeleteDialog />
          </PrivateRoute>
        }
      />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CalendarioEventoRoutes;
