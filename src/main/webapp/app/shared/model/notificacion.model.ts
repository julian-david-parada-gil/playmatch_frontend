import dayjs from 'dayjs';

import { ICuenta } from 'app/shared/model/cuenta.model';
import { EstadoGeneral } from 'app/shared/model/enumerations/estado-general.model';

export interface INotificacion {
  id?: string;
  titulo?: string;
  mensaje?: string;
  leida?: boolean;
  fechaEnvio?: dayjs.Dayjs;
  estado?: keyof typeof EstadoGeneral;
  destinatario?: ICuenta;
}

export const defaultValue: Readonly<INotificacion> = {
  leida: false,
};
