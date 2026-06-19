import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat, byteSize, openFile } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './calendario-evento.reducer';

export const CalendarioEventoDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const calendarioEventoEntity = useAppSelector(state => state.calendarioEvento.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="calendarioEventoDetailsHeading">Calendario Evento</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{calendarioEventoEntity.id}</dd>
          <dt>
            <span id="titulo">Titulo</span>
          </dt>
          <dd>{calendarioEventoEntity.titulo}</dd>
          <dt>
            <span id="descripcion">Descripcion</span>
          </dt>
          <dd>{calendarioEventoEntity.descripcion}</dd>
          <dt>
            <span id="calendario">Calendario</span>
          </dt>
          <dd>
            {calendarioEventoEntity.calendario ? (
              <div>
                {calendarioEventoEntity.calendarioContentType ? (
                  <a onClick={openFile(calendarioEventoEntity.calendarioContentType, calendarioEventoEntity.calendario)}>Abrir&nbsp;</a>
                ) : null}
                <span>
                  {calendarioEventoEntity.calendarioContentType}, {byteSize(calendarioEventoEntity.calendario)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="fechaEvento">Fecha Evento</span>
          </dt>
          <dd>
            {calendarioEventoEntity.fechaEvento ? (
              <TextFormat value={calendarioEventoEntity.fechaEvento} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="tipo">Tipo</span>
          </dt>
          <dd>{calendarioEventoEntity.tipo}</dd>
          <dt>
            <span id="estado">Estado</span>
          </dt>
          <dd>{calendarioEventoEntity.estado}</dd>
          <dt>Torneo</dt>
          <dd>{calendarioEventoEntity.torneo ? calendarioEventoEntity.torneo.nombre : ''}</dd>
        </dl>
        <Button as={Link as any} to="/calendario-evento" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Volver</span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/calendario-evento/${calendarioEventoEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CalendarioEventoDetail;
