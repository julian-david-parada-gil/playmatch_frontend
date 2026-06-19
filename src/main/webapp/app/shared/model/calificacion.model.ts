import dayjs from 'dayjs';

import { ICuenta } from 'app/shared/model/cuenta.model';
import { EstadoGeneral } from 'app/shared/model/enumerations/estado-general.model';
import { ITorneo } from 'app/shared/model/torneo.model';

export interface ICalificacion {
  id?: string;
  puntaje?: number;
  comentario?: string | null;
  fechaCalificacion?: dayjs.Dayjs;
  estado?: keyof typeof EstadoGeneral;
  torneo?: ITorneo;
  autor?: ICuenta;
}

export const defaultValue: Readonly<ICalificacion> = {};
