import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TipoDocumento from './tipo-documento';
import TipoDocumentoDeleteDialog from './tipo-documento-delete-dialog';
import TipoDocumentoDetail from './tipo-documento-detail';
import TipoDocumentoUpdate from './tipo-documento-update';
import PrivateRoute from 'app/shared/auth/private-route';
import { Authority } from 'app/shared/jhipster/constants';

const TipoDocumentoRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TipoDocumento />} />
    <Route
      path="new"
      element={
        <PrivateRoute hasAnyAuthorities={[Authority.ADMIN]}>
          <TipoDocumentoUpdate />
        </PrivateRoute>
      }
    />
    <Route path=":id">
      <Route index element={<TipoDocumentoDetail />} />
      <Route
        path="edit"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN]}>
            <TipoDocumentoUpdate />
          </PrivateRoute>
        }
      />
      <Route
        path="delete"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN]}>
            <TipoDocumentoDeleteDialog />
          </PrivateRoute>
        }
      />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TipoDocumentoRoutes;
