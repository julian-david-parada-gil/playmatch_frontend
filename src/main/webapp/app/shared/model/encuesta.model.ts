import dayjs from 'dayjs';

import { EstadoEncuesta } from 'app/shared/model/enumerations/estado-encuesta.model';
import { IGrupo } from 'app/shared/model/grupo.model';
import { ITorneo } from 'app/shared/model/torneo.model';

export interface IEncuesta {
  id?: string;
  titulo?: string;
  opcion1?: string;
  opcion2?: string;
  opcion3?: string | null;
  opcion4?: string | null;
  votosOpcion1?: number | null;
  votosOpcion2?: number | null;
  votosOpcion3?: number | null;
  votosOpcion4?: number | null;
  fechaInicio?: dayjs.Dayjs | null;
  fechaFin?: dayjs.Dayjs | null;
  estado?: keyof typeof EstadoEncuesta;
  grupo?: IGrupo | null;
  torneo?: ITorneo | null;
}

export const defaultValue: Readonly<IEncuesta> = {};
