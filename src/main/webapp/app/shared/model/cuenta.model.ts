import dayjs from 'dayjs';

import { EstadoGeneral } from 'app/shared/model/enumerations/estado-general.model';
import { ITipoDocumento } from 'app/shared/model/tipo-documento.model';
import { IUser } from 'app/shared/model/user.model';

export interface ICuenta {
  id?: string;
  fechaNacimiento?: dayjs.Dayjs | null;
  numeroDocumento?: string;
  correo?: string;
  telefono?: string;
  direccion?: string | null;
  fotoContentType?: string | null;
  foto?: string | null;
  estado?: keyof typeof EstadoGeneral;
  user?: IUser;
  tipoDocumento?: ITipoDocumento;
}

export const defaultValue: Readonly<ICuenta> = {};
