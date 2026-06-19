import dayjs from 'dayjs';

import { ICuenta } from 'app/shared/model/cuenta.model';
import { EstadoGeneral } from 'app/shared/model/enumerations/estado-general.model';
import { TipoNoticia } from 'app/shared/model/enumerations/tipo-noticia.model';

export interface INoticia {
  id?: string;
  titulo?: string;
  contenido?: string;
  tipo?: keyof typeof TipoNoticia;
  fechaPublicacion?: dayjs.Dayjs;
  estado?: keyof typeof EstadoGeneral;
  autor?: ICuenta;
}

export const defaultValue: Readonly<INoticia> = {};
