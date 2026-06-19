import dayjs from 'dayjs';

import { ICuenta } from 'app/shared/model/cuenta.model';
import { EstadoGeneral } from 'app/shared/model/enumerations/estado-general.model';
import { IGrupo } from 'app/shared/model/grupo.model';

export interface IMensajeGrupo {
  id?: string;
  contenido?: string;
  fechaPublicacion?: dayjs.Dayjs;
  estado?: keyof typeof EstadoGeneral;
  grupo?: IGrupo;
  autor?: ICuenta;
}

export const defaultValue: Readonly<IMensajeGrupo> = {};
