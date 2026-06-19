import { IGrupo } from 'app/shared/model/grupo.model';
import { ITorneo } from 'app/shared/model/torneo.model';

export interface ITablaPosicion {
  id?: string;
  puntos?: number;
  partidosJugados?: number;
  partidosGanados?: number;
  partidosEmpatados?: number;
  partidosPerdidos?: number;
  golesFavor?: number;
  golesContra?: number;
  diferenciaGoles?: number;
  grupo?: IGrupo;
  torneo?: ITorneo;
}

export const defaultValue: Readonly<ITablaPosicion> = {};
