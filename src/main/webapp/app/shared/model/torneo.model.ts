import dayjs from 'dayjs';

import { ICategoria } from 'app/shared/model/categoria.model';
import { EstadoTorneo } from 'app/shared/model/enumerations/estado-torneo.model';

export interface ITorneo {
  id?: string;
  nombre?: string;
  descripcion?: string | null;
  fechaInicio?: dayjs.Dayjs;
  fechaFin?: dayjs.Dayjs | null;
  horaInicio?: dayjs.Dayjs | null;
  ubicacion?: string;
  reglamentoContentType?: string | null;
  reglamento?: string | null;
  cupoMaximoEquipos?: number;
  cupoMaximoJugadores?: number | null;
  estado?: keyof typeof EstadoTorneo;
  categoria?: ICategoria;
}

export const defaultValue: Readonly<ITorneo> = {};
