import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CalendarioEvento from './calendario-evento';
import Calificacion from './calificacion';
import Categoria from './categoria';
import Convocatoria from './convocatoria';
import Cuenta from './cuenta';
import Encuesta from './encuesta';
import Grupo from './grupo';
import Inscripcion from './inscripcion';
import MensajeGrupo from './mensaje-grupo';
import MiembroGrupo from './miembro-grupo';
import Noticia from './noticia';
import Notificacion from './notificacion';
import Partido from './partido';
import TablaPosicion from './tabla-posicion';
import TipoDocumento from './tipo-documento';
import Torneo from './torneo';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="/cuenta/*" element={<Cuenta />} />
        <Route path="/tipo-documento/*" element={<TipoDocumento />} />
        <Route path="/categoria/*" element={<Categoria />} />
        <Route path="/torneo/*" element={<Torneo />} />
        <Route path="/grupo/*" element={<Grupo />} />
        <Route path="/miembro-grupo/*" element={<MiembroGrupo />} />
        <Route path="/inscripcion/*" element={<Inscripcion />} />
        <Route path="/partido/*" element={<Partido />} />
        <Route path="/tabla-posicion/*" element={<TablaPosicion />} />
        <Route path="/mensaje-grupo/*" element={<MensajeGrupo />} />
        <Route path="/encuesta/*" element={<Encuesta />} />
        <Route path="/calificacion/*" element={<Calificacion />} />
        <Route path="/noticia/*" element={<Noticia />} />
        <Route path="/convocatoria/*" element={<Convocatoria />} />
        <Route path="/calendario-evento/*" element={<CalendarioEvento />} />
        <Route path="/notificacion/*" element={<Notificacion />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
