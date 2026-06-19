import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Convocatoria from './convocatoria';
import ConvocatoriaDeleteDialog from './convocatoria-delete-dialog';
import ConvocatoriaDetail from './convocatoria-detail';
import ConvocatoriaUpdate from './convocatoria-update';

const ConvocatoriaRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Convocatoria />} />
    <Route path="new" element={<ConvocatoriaUpdate />} />
    <Route path=":id">
      <Route index element={<ConvocatoriaDetail />} />
      <Route path="edit" element={<ConvocatoriaUpdate />} />
      <Route path="delete" element={<ConvocatoriaDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ConvocatoriaRoutes;
