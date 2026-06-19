import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Notificacion from './notificacion';
import NotificacionDeleteDialog from './notificacion-delete-dialog';
import NotificacionDetail from './notificacion-detail';
import NotificacionUpdate from './notificacion-update';

const NotificacionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Notificacion />} />
    <Route path="new" element={<NotificacionUpdate />} />
    <Route path=":id">
      <Route index element={<NotificacionDetail />} />
      <Route path="edit" element={<NotificacionUpdate />} />
      <Route path="delete" element={<NotificacionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default NotificacionRoutes;
