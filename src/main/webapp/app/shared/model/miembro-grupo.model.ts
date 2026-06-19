import dayjs from 'dayjs';

import { ICuenta } from 'app/shared/model/cuenta.model';
import { EstadoGeneral } from 'app/shared/model/enumerations/estado-general.model';
import { IGrupo } from 'app/shared/model/grupo.model';

export interface IMiembroGrupo {
  id?: string;
  fechaIngreso?: dayjs.Dayjs;
  estado?: keyof typeof EstadoGeneral;
  esAdministrador?: boolean;
  grupo?: IGrupo;
  usuario?: ICuenta;
}

export const defaultValue: Readonly<IMiembroGrupo> = {
  esAdministrador: false,
};
