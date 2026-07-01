import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import MensajeGrupo from './mensaje-grupo';
import MensajeGrupoDeleteDialog from './mensaje-grupo-delete-dialog';
import MensajeGrupoDetail from './mensaje-grupo-detail';
import MensajeGrupoUpdate from './mensaje-grupo-update';
import PrivateRoute from 'app/shared/auth/private-route';
import { Authority } from 'app/shared/jhipster/constants';

const MensajeGrupoRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<MensajeGrupo />} />
    <Route
      path="new"
      element={
        <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.PARTICIPANTE, Authority.ADMINGRUPO]}>
          <MensajeGrupoUpdate />
        </PrivateRoute>
      }
    />
    <Route path=":id">
      <Route index element={<MensajeGrupoDetail />} />
      <Route
        path="edit"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.PARTICIPANTE, Authority.ADMINGRUPO]}>
            <MensajeGrupoUpdate />
          </PrivateRoute>
        }
      />
      <Route
        path="delete"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.PARTICIPANTE, Authority.ADMINGRUPO]}>
            <MensajeGrupoDeleteDialog />
          </PrivateRoute>
        }
      />
    </Route>
  </ErrorBoundaryRoutes>
);

export default MensajeGrupoRoutes;
