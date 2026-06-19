import { EstadoGeneral } from 'app/shared/model/enumerations/estado-general.model';

export interface IGrupo {
  id?: string;
  nombre?: string;
  descripcion?: string | null;
  escudoContentType?: string | null;
  escudo?: string | null;
  limiteParticipantes?: number;
  estado?: keyof typeof EstadoGeneral;
}

export const defaultValue: Readonly<IGrupo> = {};
