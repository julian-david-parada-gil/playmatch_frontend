import React from 'react';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/cuenta">
        Cuenta
      </MenuItem>
      <MenuItem icon="asterisk" to="/tipo-documento">
        Tipo Documento
      </MenuItem>
      <MenuItem icon="asterisk" to="/categoria">
        Categoria
      </MenuItem>
      <MenuItem icon="asterisk" to="/torneo">
        Torneo
      </MenuItem>
      <MenuItem icon="asterisk" to="/grupo">
        Grupo
      </MenuItem>
      <MenuItem icon="asterisk" to="/miembro-grupo">
        Miembro Grupo
      </MenuItem>
      <MenuItem icon="asterisk" to="/inscripcion">
        Inscripcion
      </MenuItem>
      <MenuItem icon="asterisk" to="/partido">
        Partido
      </MenuItem>
      <MenuItem icon="asterisk" to="/tabla-posicion">
        Tabla Posicion
      </MenuItem>
      <MenuItem icon="asterisk" to="/mensaje-grupo">
        Mensaje Grupo
      </MenuItem>
      <MenuItem icon="asterisk" to="/encuesta">
        Encuesta
      </MenuItem>
      <MenuItem icon="asterisk" to="/calificacion">
        Calificacion
      </MenuItem>
      <MenuItem icon="asterisk" to="/noticia">
        Noticia
      </MenuItem>
      <MenuItem icon="asterisk" to="/convocatoria">
        Convocatoria
      </MenuItem>
      <MenuItem icon="asterisk" to="/calendario-evento">
        Calendario Evento
      </MenuItem>
      <MenuItem icon="asterisk" to="/notificacion">
        Notificacion
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
