import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import MensajeGrupo from './mensaje-grupo';
import MensajeGrupoDeleteDialog from './mensaje-grupo-delete-dialog';
import MensajeGrupoDetail from './mensaje-grupo-detail';
import MensajeGrupoUpdate from './mensaje-grupo-update';

const MensajeGrupoRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<MensajeGrupo />} />
    <Route path="new" element={<MensajeGrupoUpdate />} />
    <Route path=":id">
      <Route index element={<MensajeGrupoDetail />} />
      <Route path="edit" element={<MensajeGrupoUpdate />} />
      <Route path="delete" element={<MensajeGrupoDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default MensajeGrupoRoutes;
