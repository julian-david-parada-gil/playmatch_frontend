import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Convocatoria from './convocatoria';
import ConvocatoriaDeleteDialog from './convocatoria-delete-dialog';
import ConvocatoriaDetail from './convocatoria-detail';
import ConvocatoriaUpdate from './convocatoria-update';
import PrivateRoute from 'app/shared/auth/private-route';
import { Authority } from 'app/shared/jhipster/constants';

const ConvocatoriaRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Convocatoria />} />
    <Route
      path="new"
      element={
        <PrivateRoute hasAnyAuthorities={[Authority.ADMIN,]}>
          <ConvocatoriaUpdate />
        </PrivateRoute>
      }
    />
    <Route path=":id">
      <Route index element={<ConvocatoriaDetail />} />
      <Route
        path="edit"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN]}>
            <ConvocatoriaUpdate />
          </PrivateRoute>
        }
      />
      <Route
        path="delete"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN]}>
            <ConvocatoriaDeleteDialog />
          </PrivateRoute>
        }
      />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ConvocatoriaRoutes;
