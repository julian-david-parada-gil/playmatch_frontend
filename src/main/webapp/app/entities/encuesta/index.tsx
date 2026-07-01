import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Encuesta from './encuesta';
import EncuestaDeleteDialog from './encuesta-delete-dialog';
import EncuestaDetail from './encuesta-detail';
import EncuestaUpdate from './encuesta-update';
import PrivateRoute from 'app/shared/auth/private-route';
import { Authority } from 'app/shared/jhipster/constants';

const EncuestaRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Encuesta />} />
    <Route
      path="new"
      element={
        <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, AuthorityORGANIZADOR, AuthorityADMINGRUPO]}>
          <EncuestaUpdate />
        </PrivateRoute>
      }
    />
    <Route path=":id">
      <Route index element={<EncuestaDetail />} />
      <Route
        path="edit"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, AuthorityORGANIZADOR, AuthorityADMINGRUPO]}>
            <EncuestaUpdate />
          </PrivateRoute>
        }
      />
      <Route
        path="delete"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, AuthorityORGANIZADOR, AuthorityADMINGRUPO]}>
            <EncuestaDeleteDialog />
          </PrivateRoute>
        }
      />
    </Route>
  </ErrorBoundaryRoutes>
);

export default EncuestaRoutes;
