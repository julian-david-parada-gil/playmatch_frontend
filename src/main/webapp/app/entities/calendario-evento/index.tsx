import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CalendarioEvento from './calendario-evento';
import CalendarioEventoDeleteDialog from './calendario-evento-delete-dialog';
import CalendarioEventoDetail from './calendario-evento-detail';
import CalendarioEventoUpdate from './calendario-evento-update';

const CalendarioEventoRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CalendarioEvento />} />
    <Route path="new" element={<CalendarioEventoUpdate />} />
    <Route path=":id">
      <Route index element={<CalendarioEventoDetail />} />
      <Route path="edit" element={<CalendarioEventoUpdate />} />
      <Route path="delete" element={<CalendarioEventoDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CalendarioEventoRoutes;
