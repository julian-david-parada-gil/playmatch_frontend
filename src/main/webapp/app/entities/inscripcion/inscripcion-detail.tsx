import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './inscripcion.reducer';

export const InscripcionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const inscripcionEntity = useAppSelector(state => state.inscripcion.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="inscripcionDetailsHeading">Inscripcion</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{inscripcionEntity.id}</dd>
          <dt>
            <span id="codigo">Codigo</span>
          </dt>
          <dd>{inscripcionEntity.codigo}</dd>
          <dt>
            <span id="fechaInscripcion">Fecha Inscripcion</span>
          </dt>
          <dd>
            {inscripcionEntity.fechaInscripcion ? (
              <TextFormat value={inscripcionEntity.fechaInscripcion} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="estado">Estado</span>
          </dt>
          <dd>{inscripcionEntity.estado}</dd>
          <dt>
            <span id="observaciones">Observaciones</span>
          </dt>
          <dd>{inscripcionEntity.observaciones}</dd>
          <dt>Torneo</dt>
          <dd>{inscripcionEntity.torneo ? inscripcionEntity.torneo.nombre : ''}</dd>
          <dt>Usuario</dt>
          <dd>{inscripcionEntity.usuario ? inscripcionEntity.usuario.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/inscripcion" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Volver</span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/inscripcion/${inscripcionEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
        </Button>
      </Col>
    </Row>
  );
};

export default InscripcionDetail;
