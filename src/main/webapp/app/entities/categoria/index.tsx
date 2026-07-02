import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Categoria from './categoria';
import CategoriaDeleteDialog from './categoria-delete-dialog';
import CategoriaDetail from './categoria-detail';
import CategoriaUpdate from './categoria-update';
import PrivateRoute from 'app/shared/auth/private-route';
import { Authority } from 'app/shared/jhipster/constants';

const CategoriaRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Categoria />} />
    <Route
      path="new"
      element={
        <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ORGANIZADOR]}>
          <CategoriaUpdate />
        </PrivateRoute>
      }
    />
    <Route path=":id">
      <Route index element={<CategoriaDetail />} />
      <Route
        path="edit"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ORGANIZADOR]}>
            <CategoriaUpdate />
          </PrivateRoute>
        }
      />
      <Route
        path="delete"
        element={
          <PrivateRoute hasAnyAuthorities={[Authority.ADMIN, Authority.ORGANIZADOR]}>
            <CategoriaDeleteDialog />
          </PrivateRoute>
        }
      />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CategoriaRoutes;
