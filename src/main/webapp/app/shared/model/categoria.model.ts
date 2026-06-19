import dayjs from 'dayjs';

import { EstadoGeneral } from 'app/shared/model/enumerations/estado-general.model';
import { ModalidadDeporte } from 'app/shared/model/enumerations/modalidad-deporte.model';

export interface ICategoria {
  id?: string;
  nombre?: string;
  modalidad?: keyof typeof ModalidadDeporte;
  descripcion?: string | null;
  fechaCreacion?: dayjs.Dayjs | null;
  fechaActualizacion?: dayjs.Dayjs | null;
  estado?: keyof typeof EstadoGeneral;
}

export const defaultValue: Readonly<ICategoria> = {};
