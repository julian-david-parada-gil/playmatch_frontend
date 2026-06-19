import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Inscripcion from './inscripcion';
import InscripcionDeleteDialog from './inscripcion-delete-dialog';
import InscripcionDetail from './inscripcion-detail';
import InscripcionUpdate from './inscripcion-update';

const InscripcionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Inscripcion />} />
    <Route path="new" element={<InscripcionUpdate />} />
    <Route path=":id">
      <Route index element={<InscripcionDetail />} />
      <Route path="edit" element={<InscripcionUpdate />} />
      <Route path="delete" element={<InscripcionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default InscripcionRoutes;
