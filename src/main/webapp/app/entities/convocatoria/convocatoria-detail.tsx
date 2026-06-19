import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './convocatoria.reducer';

export const ConvocatoriaDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const convocatoriaEntity = useAppSelector(state => state.convocatoria.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="convocatoriaDetailsHeading">Convocatoria</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{convocatoriaEntity.id}</dd>
          <dt>
            <span id="titulo">Titulo</span>
          </dt>
          <dd>{convocatoriaEntity.titulo}</dd>
          <dt>
            <span id="descripcion">Descripcion</span>
          </dt>
          <dd>{convocatoriaEntity.descripcion}</dd>
          <dt>
            <span id="fechaPublicacion">Fecha Publicacion</span>
          </dt>
          <dd>
            {convocatoriaEntity.fechaPublicacion ? (
              <TextFormat value={convocatoriaEntity.fechaPublicacion} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="fechaInicioInscripcion">Fecha Inicio Inscripcion</span>
          </dt>
          <dd>
            {convocatoriaEntity.fechaInicioInscripcion ? (
              <TextFormat value={convocatoriaEntity.fechaInicioInscripcion} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="fechaFinInscripcion">Fecha Fin Inscripcion</span>
          </dt>
          <dd>
            {convocatoriaEntity.fechaFinInscripcion ? (
              <TextFormat value={convocatoriaEntity.fechaFinInscripcion} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="cupos">Cupos</span>
          </dt>
          <dd>{convocatoriaEntity.cupos}</dd>
          <dt>
            <span id="estado">Estado</span>
          </dt>
          <dd>{convocatoriaEntity.estado}</dd>
          <dt>Torneo</dt>
          <dd>{convocatoriaEntity.torneo ? convocatoriaEntity.torneo.nombre : ''}</dd>
        </dl>
        <Button as={Link as any} to="/convocatoria" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Volver</span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/convocatoria/${convocatoriaEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ConvocatoriaDetail;
