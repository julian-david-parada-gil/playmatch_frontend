import calendarioEvento from 'app/entities/calendario-evento/calendario-evento.reducer';
import calificacion from 'app/entities/calificacion/calificacion.reducer';
import categoria from 'app/entities/categoria/categoria.reducer';
import convocatoria from 'app/entities/convocatoria/convocatoria.reducer';
import cuenta from 'app/entities/cuenta/cuenta.reducer';
import encuesta from 'app/entities/encuesta/encuesta.reducer';
import grupo from 'app/entities/grupo/grupo.reducer';
import inscripcion from 'app/entities/inscripcion/inscripcion.reducer';
import mensajeGrupo from 'app/entities/mensaje-grupo/mensaje-grupo.reducer';
import miembroGrupo from 'app/entities/miembro-grupo/miembro-grupo.reducer';
import noticia from 'app/entities/noticia/noticia.reducer';
import notificacion from 'app/entities/notificacion/notificacion.reducer';
import partido from 'app/entities/partido/partido.reducer';
import tablaPosicion from 'app/entities/tabla-posicion/tabla-posicion.reducer';
import tipoDocumento from 'app/entities/tipo-documento/tipo-documento.reducer';
import torneo from 'app/entities/torneo/torneo.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  cuenta,
  tipoDocumento,
  categoria,
  torneo,
  grupo,
  miembroGrupo,
  inscripcion,
  partido,
  tablaPosicion,
  mensajeGrupo,
  encuesta,
  calificacion,
  noticia,
  convocatoria,
  calendarioEvento,
  notificacion,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
