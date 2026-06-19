import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './tabla-posicion.reducer';

export const TablaPosicionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const tablaPosicionEntity = useAppSelector(state => state.tablaPosicion.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="tablaPosicionDetailsHeading">Tabla Posicion</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{tablaPosicionEntity.id}</dd>
          <dt>
            <span id="puntos">Puntos</span>
          </dt>
          <dd>{tablaPosicionEntity.puntos}</dd>
          <dt>
            <span id="partidosJugados">Partidos Jugados</span>
          </dt>
          <dd>{tablaPosicionEntity.partidosJugados}</dd>
          <dt>
            <span id="partidosGanados">Partidos Ganados</span>
          </dt>
          <dd>{tablaPosicionEntity.partidosGanados}</dd>
          <dt>
            <span id="partidosEmpatados">Partidos Empatados</span>
          </dt>
          <dd>{tablaPosicionEntity.partidosEmpatados}</dd>
          <dt>
            <span id="partidosPerdidos">Partidos Perdidos</span>
          </dt>
          <dd>{tablaPosicionEntity.partidosPerdidos}</dd>
          <dt>
            <span id="golesFavor">Goles Favor</span>
          </dt>
          <dd>{tablaPosicionEntity.golesFavor}</dd>
          <dt>
            <span id="golesContra">Goles Contra</span>
          </dt>
          <dd>{tablaPosicionEntity.golesContra}</dd>
          <dt>
            <span id="diferenciaGoles">Diferencia Goles</span>
          </dt>
          <dd>{tablaPosicionEntity.diferenciaGoles}</dd>
          <dt>Grupo</dt>
          <dd>{tablaPosicionEntity.grupo ? tablaPosicionEntity.grupo.nombre : ''}</dd>
          <dt>Torneo</dt>
          <dd>{tablaPosicionEntity.torneo ? tablaPosicionEntity.torneo.nombre : ''}</dd>
        </dl>
        <Button as={Link as any} to="/tabla-posicion" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Volver</span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/tabla-posicion/${tablaPosicionEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
        </Button>
      </Col>
    </Row>
  );
};

export default TablaPosicionDetail;
