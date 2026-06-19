import dayjs from 'dayjs';

import { EstadoGeneral } from 'app/shared/model/enumerations/estado-general.model';
import { TipoEventoCalendario } from 'app/shared/model/enumerations/tipo-evento-calendario.model';
import { ITorneo } from 'app/shared/model/torneo.model';

export interface ICalendarioEvento {
  id?: string;
  titulo?: string;
  descripcion?: string | null;
  calendarioContentType?: string | null;
  calendario?: string | null;
  fechaEvento?: dayjs.Dayjs;
  tipo?: keyof typeof TipoEventoCalendario;
  estado?: keyof typeof EstadoGeneral;
  torneo?: ITorneo;
}

export const defaultValue: Readonly<ICalendarioEvento> = {};
