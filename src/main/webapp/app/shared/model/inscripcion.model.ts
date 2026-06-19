import dayjs from 'dayjs';

import { ICuenta } from 'app/shared/model/cuenta.model';
import { EstadoSolicitud } from 'app/shared/model/enumerations/estado-solicitud.model';
import { ITorneo } from 'app/shared/model/torneo.model';

export interface IInscripcion {
  id?: string;
  codigo?: string;
  fechaInscripcion?: dayjs.Dayjs;
  estado?: keyof typeof EstadoSolicitud;
  observaciones?: string | null;
  torneo?: ITorneo;
  usuario?: ICuenta;
}

export const defaultValue: Readonly<IInscripcion> = {};
