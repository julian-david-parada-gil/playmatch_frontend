import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Notificacion from './notificacion';
import NotificacionDeleteDialog from './notificacion-delete-dialog';
import NotificacionDetail from './notificacion-detail';
import NotificacionUpdate from './notificacion-update';
import PrivateRoute from 'app/shared/auth/private-route';
import { Authority } from 'app/shared/jhipster/constants';

const NotificacionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Notificacion />} />
    <Route
      path="new"
      element={
        <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ORGANIZADOR, Authority.ADMINGRUPO]}>
          <NotificacionUpdate />
        </PrivateRoute>
      }
    />
    <Route path=":id">
      <Route index element={<NotificacionDetail />} />
      <Route
        path="edit"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ORGANIZADOR, Authority.ADMINGRUPO]}>
            <NotificacionUpdate />
          </PrivateRoute>
        }
      />
      <Route
        path="delete"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ORGANIZADOR, Authority.ADMINGRUPO]}>
            <NotificacionDeleteDialog />
          </PrivateRoute>
        }
      />
    </Route>
  </ErrorBoundaryRoutes>
);

export default NotificacionRoutes;
