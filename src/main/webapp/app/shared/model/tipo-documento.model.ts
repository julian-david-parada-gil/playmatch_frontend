import { EstadoGeneral } from 'app/shared/model/enumerations/estado-general.model';

export interface ITipoDocumento {
  id?: string;
  sigla?: string;
  nombreDocumento?: string;
  estado?: keyof typeof EstadoGeneral;
}

export const defaultValue: Readonly<ITipoDocumento> = {};
