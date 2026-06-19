import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import MiembroGrupo from './miembro-grupo';
import MiembroGrupoDeleteDialog from './miembro-grupo-delete-dialog';
import MiembroGrupoDetail from './miembro-grupo-detail';
import MiembroGrupoUpdate from './miembro-grupo-update';

const MiembroGrupoRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<MiembroGrupo />} />
    <Route path="new" element={<MiembroGrupoUpdate />} />
    <Route path=":id">
      <Route index element={<MiembroGrupoDetail />} />
      <Route path="edit" element={<MiembroGrupoUpdate />} />
      <Route path="delete" element={<MiembroGrupoDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default MiembroGrupoRoutes;
