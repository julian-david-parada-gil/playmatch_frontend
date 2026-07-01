import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Inscripcion from './inscripcion';
import InscripcionDeleteDialog from './inscripcion-delete-dialog';
import InscripcionDetail from './inscripcion-detail';
import InscripcionUpdate from './inscripcion-update';
import PrivateRoute from 'app/shared/auth/private-route';
import { Authority } from 'app/shared/jhipster/constants';

const InscripcionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Inscripcion />} />
    <Route
      path="new"
      element={
        <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ORGANIZADOR, Authority.PARTICIPANTE]}>
          <InscripcionUpdate />
        </PrivateRoute>
      }
    />
    <Route path=":id">
      <Route index element={<InscripcionDetail />} />
      <Route
        path="edit"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ORGANIZADOR]}>
            <InscripcionUpdate />
          </PrivateRoute>
        }
      />
      <Route
        path="delete"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ORGANIZADOR]}>
            <InscripcionDeleteDialog />
          </PrivateRoute>
        }
      />
    </Route>
  </ErrorBoundaryRoutes>
);

export default InscripcionRoutes;
