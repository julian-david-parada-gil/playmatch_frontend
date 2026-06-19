import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './partido.reducer';

export const PartidoDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const partidoEntity = useAppSelector(state => state.partido.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="partidoDetailsHeading">Partido</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{partidoEntity.id}</dd>
          <dt>
            <span id="fechaHora">Fecha Hora</span>
          </dt>
          <dd>{partidoEntity.fechaHora ? <TextFormat value={partidoEntity.fechaHora} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="lugar">Lugar</span>
          </dt>
          <dd>{partidoEntity.lugar}</dd>
          <dt>
            <span id="tiempoMinutos">Tiempo Minutos</span>
          </dt>
          <dd>{partidoEntity.tiempoMinutos}</dd>
          <dt>
            <span id="marcadorLocal">Marcador Local</span>
          </dt>
          <dd>{partidoEntity.marcadorLocal}</dd>
          <dt>
            <span id="marcadorVisitante">Marcador Visitante</span>
          </dt>
          <dd>{partidoEntity.marcadorVisitante}</dd>
          <dt>
            <span id="estado">Estado</span>
          </dt>
          <dd>{partidoEntity.estado}</dd>
          <dt>Equipolocal</dt>
          <dd>{partidoEntity.equipolocal ? partidoEntity.equipolocal.nombre : ''}</dd>
          <dt>Equipovisitante</dt>
          <dd>{partidoEntity.equipovisitante ? partidoEntity.equipovisitante.nombre : ''}</dd>
          <dt>Torneo</dt>
          <dd>{partidoEntity.torneo ? partidoEntity.torneo.nombre : ''}</dd>
        </dl>
        <Button as={Link as any} to="/partido" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Volver</span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/partido/${partidoEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PartidoDetail;
