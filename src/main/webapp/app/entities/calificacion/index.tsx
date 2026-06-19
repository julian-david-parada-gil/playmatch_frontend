import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Calificacion from './calificacion';
import CalificacionDeleteDialog from './calificacion-delete-dialog';
import CalificacionDetail from './calificacion-detail';
import CalificacionUpdate from './calificacion-update';

const CalificacionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Calificacion />} />
    <Route path="new" element={<CalificacionUpdate />} />
    <Route path=":id">
      <Route index element={<CalificacionDetail />} />
      <Route path="edit" element={<CalificacionUpdate />} />
      <Route path="delete" element={<CalificacionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CalificacionRoutes;
