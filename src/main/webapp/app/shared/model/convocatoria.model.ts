import dayjs from 'dayjs';

import { EstadoGeneral } from 'app/shared/model/enumerations/estado-general.model';
import { ITorneo } from 'app/shared/model/torneo.model';

export interface IConvocatoria {
  id?: string;
  titulo?: string;
  descripcion?: string;
  fechaPublicacion?: dayjs.Dayjs;
  fechaInicioInscripcion?: dayjs.Dayjs | null;
  fechaFinInscripcion?: dayjs.Dayjs | null;
  cupos?: number | null;
  estado?: keyof typeof EstadoGeneral;
  torneo?: ITorneo;
}

export const defaultValue: Readonly<IConvocatoria> = {};
