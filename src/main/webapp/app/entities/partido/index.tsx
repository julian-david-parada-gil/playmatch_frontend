import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Partido from './partido';
import PartidoDeleteDialog from './partido-delete-dialog';
import PartidoDetail from './partido-detail';
import PartidoUpdate from './partido-update';

const PartidoRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Partido />} />
    <Route path="new" element={<PartidoUpdate />} />
    <Route path=":id">
      <Route index element={<PartidoDetail />} />
      <Route path="edit" element={<PartidoUpdate />} />
      <Route path="delete" element={<PartidoDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PartidoRoutes;
