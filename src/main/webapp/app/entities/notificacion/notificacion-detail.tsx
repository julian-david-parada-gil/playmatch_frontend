import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './notificacion.reducer';

export const NotificacionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const notificacionEntity = useAppSelector(state => state.notificacion.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="notificacionDetailsHeading">Notificacion</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{notificacionEntity.id}</dd>
          <dt>
            <span id="titulo">Titulo</span>
          </dt>
          <dd>{notificacionEntity.titulo}</dd>
          <dt>
            <span id="mensaje">Mensaje</span>
          </dt>
          <dd>{notificacionEntity.mensaje}</dd>
          <dt>
            <span id="leida">Leida</span>
          </dt>
          <dd>{notificacionEntity.leida ? 'true' : 'false'}</dd>
          <dt>
            <span id="fechaEnvio">Fecha Envio</span>
          </dt>
          <dd>
            {notificacionEntity.fechaEnvio ? (
              <TextFormat value={notificacionEntity.fechaEnvio} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="estado">Estado</span>
          </dt>
          <dd>{notificacionEntity.estado}</dd>
          <dt>Destinatario</dt>
          <dd>{notificacionEntity.destinatario ? notificacionEntity.destinatario.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/notificacion" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Volver</span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/notificacion/${notificacionEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
        </Button>
      </Col>
    </Row>
  );
};

export default NotificacionDetail;
