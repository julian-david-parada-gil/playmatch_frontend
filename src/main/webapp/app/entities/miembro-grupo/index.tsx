import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import MiembroGrupo from './miembro-grupo';
import MiembroGrupoDeleteDialog from './miembro-grupo-delete-dialog';
import MiembroGrupoDetail from './miembro-grupo-detail';
import MiembroGrupoUpdate from './miembro-grupo-update';
import PrivateRoute from 'app/shared/auth/private-route';
import { Authority } from 'app/shared/jhipster/constants';

const MiembroGrupoRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<MiembroGrupo />} />
    <Route
      path="new"
      element={
        <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ADMINGRUPO]}>
          <MiembroGrupoUpdate />
        </PrivateRoute>
      }
    />
    <Route path=":id">
      <Route index element={<MiembroGrupoDetail />} />
      <Route
        path="edit"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ADMINGRUPO]}>
            <MiembroGrupoUpdate />
          </PrivateRoute>
        }
      />
      <Route
        path="delete"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ADMINGRUPO]}>
            <MiembroGrupoDeleteDialog />
          </PrivateRoute>
        }
      />
    </Route>
  </ErrorBoundaryRoutes>
);

export default MiembroGrupoRoutes;
