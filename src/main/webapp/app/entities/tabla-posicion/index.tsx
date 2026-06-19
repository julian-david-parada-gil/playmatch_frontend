import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TablaPosicion from './tabla-posicion';
import TablaPosicionDeleteDialog from './tabla-posicion-delete-dialog';
import TablaPosicionDetail from './tabla-posicion-detail';
import TablaPosicionUpdate from './tabla-posicion-update';

const TablaPosicionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TablaPosicion />} />
    <Route path="new" element={<TablaPosicionUpdate />} />
    <Route path=":id">
      <Route index element={<TablaPosicionDetail />} />
      <Route path="edit" element={<TablaPosicionUpdate />} />
      <Route path="delete" element={<TablaPosicionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TablaPosicionRoutes;
