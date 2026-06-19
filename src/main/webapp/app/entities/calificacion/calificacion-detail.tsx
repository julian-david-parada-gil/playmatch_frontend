import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './calificacion.reducer';

export const CalificacionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const calificacionEntity = useAppSelector(state => state.calificacion.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="calificacionDetailsHeading">Calificacion</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{calificacionEntity.id}</dd>
          <dt>
            <span id="puntaje">Puntaje</span>
          </dt>
          <dd>{calificacionEntity.puntaje}</dd>
          <dt>
            <span id="comentario">Comentario</span>
          </dt>
          <dd>{calificacionEntity.comentario}</dd>
          <dt>
            <span id="fechaCalificacion">Fecha Calificacion</span>
          </dt>
          <dd>
            {calificacionEntity.fechaCalificacion ? (
              <TextFormat value={calificacionEntity.fechaCalificacion} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="estado">Estado</span>
          </dt>
          <dd>{calificacionEntity.estado}</dd>
          <dt>Torneo</dt>
          <dd>{calificacionEntity.torneo ? calificacionEntity.torneo.nombre : ''}</dd>
          <dt>Autor</dt>
          <dd>{calificacionEntity.autor ? calificacionEntity.autor.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/calificacion" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Volver</span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/calificacion/${calificacionEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CalificacionDetail;
