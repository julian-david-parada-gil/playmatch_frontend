import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Torneo from './torneo';
import TorneoDeleteDialog from './torneo-delete-dialog';
import TorneoDetail from './torneo-detail';
import TorneoUpdate from './torneo-update';

const TorneoRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Torneo />} />
    <Route path="new" element={<TorneoUpdate />} />
    <Route path=":id">
      <Route index element={<TorneoDetail />} />
      <Route path="edit" element={<TorneoUpdate />} />
      <Route path="delete" element={<TorneoDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TorneoRoutes;
