import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './encuesta.reducer';

export const EncuestaDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const encuestaEntity = useAppSelector(state => state.encuesta.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="encuestaDetailsHeading">Encuesta</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{encuestaEntity.id}</dd>
          <dt>
            <span id="titulo">Titulo</span>
          </dt>
          <dd>{encuestaEntity.titulo}</dd>
          <dt>
            <span id="opcion1">Opcion 1</span>
          </dt>
          <dd>{encuestaEntity.opcion1}</dd>
          <dt>
            <span id="opcion2">Opcion 2</span>
          </dt>
          <dd>{encuestaEntity.opcion2}</dd>
          <dt>
            <span id="opcion3">Opcion 3</span>
          </dt>
          <dd>{encuestaEntity.opcion3}</dd>
          <dt>
            <span id="opcion4">Opcion 4</span>
          </dt>
          <dd>{encuestaEntity.opcion4}</dd>
          <dt>
            <span id="votosOpcion1">Votos Opcion 1</span>
          </dt>
          <dd>{encuestaEntity.votosOpcion1}</dd>
          <dt>
            <span id="votosOpcion2">Votos Opcion 2</span>
          </dt>
          <dd>{encuestaEntity.votosOpcion2}</dd>
          <dt>
            <span id="votosOpcion3">Votos Opcion 3</span>
          </dt>
          <dd>{encuestaEntity.votosOpcion3}</dd>
          <dt>
            <span id="votosOpcion4">Votos Opcion 4</span>
          </dt>
          <dd>{encuestaEntity.votosOpcion4}</dd>
          <dt>
            <span id="fechaInicio">Fecha Inicio</span>
          </dt>
          <dd>
            {encuestaEntity.fechaInicio ? <TextFormat value={encuestaEntity.fechaInicio} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="fechaFin">Fecha Fin</span>
          </dt>
          <dd>{encuestaEntity.fechaFin ? <TextFormat value={encuestaEntity.fechaFin} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="estado">Estado</span>
          </dt>
          <dd>{encuestaEntity.estado}</dd>
          <dt>Grupo</dt>
          <dd>{encuestaEntity.grupo ? encuestaEntity.grupo.nombre : ''}</dd>
          <dt>Torneo</dt>
          <dd>{encuestaEntity.torneo ? encuestaEntity.torneo.nombre : ''}</dd>
        </dl>
        <Button as={Link as any} to="/encuesta" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Volver</span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/encuesta/${encuestaEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
        </Button>
      </Col>
    </Row>
  );
};

export default EncuestaDetail;
