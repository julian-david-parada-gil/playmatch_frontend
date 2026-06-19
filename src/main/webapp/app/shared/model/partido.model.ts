import dayjs from 'dayjs';

import { EstadoPartido } from 'app/shared/model/enumerations/estado-partido.model';
import { IGrupo } from 'app/shared/model/grupo.model';
import { ITorneo } from 'app/shared/model/torneo.model';

export interface IPartido {
  id?: string;
  fechaHora?: dayjs.Dayjs;
  lugar?: string;
  tiempoMinutos?: number;
  marcadorLocal?: number | null;
  marcadorVisitante?: number | null;
  estado?: keyof typeof EstadoPartido;
  equipolocal?: IGrupo | null;
  equipovisitante?: IGrupo | null;
  torneo?: ITorneo;
}

export const defaultValue: Readonly<IPartido> = {};
