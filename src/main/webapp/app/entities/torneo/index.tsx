import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Torneo from './torneo';
import TorneoDeleteDialog from './torneo-delete-dialog';
import TorneoDetail from './torneo-detail';
import TorneoUpdate from './torneo-update';
import PrivateRoute from 'app/shared/auth/private-route';
import { Authority } from 'app/shared/jhipster/constants';

const TorneoRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Torneo />} />
    <Route
      path="new"
      element={
        <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ORGANIZADOR]}>
          <TorneoUpdate />
        </PrivateRoute>
      }
    />
    <Route path=":id">
      <Route index element={<TorneoDetail />} />
      <Route
        path="edit"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ORGANIZADOR]}>
            <TorneoUpdate />
          </PrivateRoute>
        }
      />
      <Route
        path="delete"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ORGANIZADOR]}>
            <TorneoDeleteDialog />
          </PrivateRoute>
        }
      />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TorneoRoutes;
