import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat, byteSize, openFile } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './torneo.reducer';

export const TorneoDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const torneoEntity = useAppSelector(state => state.torneo.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="torneoDetailsHeading">Torneo</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{torneoEntity.id}</dd>
          <dt>
            <span id="nombre">Nombre</span>
          </dt>
          <dd>{torneoEntity.nombre}</dd>
          <dt>
            <span id="descripcion">Descripcion</span>
          </dt>
          <dd>{torneoEntity.descripcion}</dd>
          <dt>
            <span id="fechaInicio">Fecha Inicio</span>
          </dt>
          <dd>
            {torneoEntity.fechaInicio ? <TextFormat value={torneoEntity.fechaInicio} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="fechaFin">Fecha Fin</span>
          </dt>
          <dd>{torneoEntity.fechaFin ? <TextFormat value={torneoEntity.fechaFin} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="horaInicio">Hora Inicio</span>
          </dt>
          <dd>{torneoEntity.horaInicio ? <TextFormat value={torneoEntity.horaInicio} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="ubicacion">Ubicacion</span>
          </dt>
          <dd>{torneoEntity.ubicacion}</dd>
          <dt>
            <span id="reglamento">Reglamento</span>
          </dt>
          <dd>
            {torneoEntity.reglamento ? (
              <div>
                {torneoEntity.reglamentoContentType ? (
                  <a onClick={openFile(torneoEntity.reglamentoContentType, torneoEntity.reglamento)}>Abrir&nbsp;</a>
                ) : null}
                <span>
                  {torneoEntity.reglamentoContentType}, {byteSize(torneoEntity.reglamento)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="cupoMaximoEquipos">Cupo Maximo Equipos</span>
          </dt>
          <dd>{torneoEntity.cupoMaximoEquipos}</dd>
          <dt>
            <span id="cupoMaximoJugadores">Cupo Maximo Jugadores</span>
          </dt>
          <dd>{torneoEntity.cupoMaximoJugadores}</dd>
          <dt>
            <span id="estado">Estado</span>
          </dt>
          <dd>{torneoEntity.estado}</dd>
          <dt>Categoria</dt>
          <dd>{torneoEntity.categoria ? torneoEntity.categoria.nombre : ''}</dd>
        </dl>
        <Button as={Link as any} to="/torneo" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Volver</span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/torneo/${torneoEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
        </Button>
      </Col>
    </Row>
  );
};

export default TorneoDetail;
