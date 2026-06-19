import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Encuesta from './encuesta';
import EncuestaDeleteDialog from './encuesta-delete-dialog';
import EncuestaDetail from './encuesta-detail';
import EncuestaUpdate from './encuesta-update';

const EncuestaRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Encuesta />} />
    <Route path="new" element={<EncuestaUpdate />} />
    <Route path=":id">
      <Route index element={<EncuestaDetail />} />
      <Route path="edit" element={<EncuestaUpdate />} />
      <Route path="delete" element={<EncuestaDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default EncuestaRoutes;
