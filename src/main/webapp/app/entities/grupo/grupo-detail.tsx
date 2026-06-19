import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { byteSize, openFile } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './grupo.reducer';

export const GrupoDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const grupoEntity = useAppSelector(state => state.grupo.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="grupoDetailsHeading">Grupo</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{grupoEntity.id}</dd>
          <dt>
            <span id="nombre">Nombre</span>
          </dt>
          <dd>{grupoEntity.nombre}</dd>
          <dt>
            <span id="descripcion">Descripcion</span>
          </dt>
          <dd>{grupoEntity.descripcion}</dd>
          <dt>
            <span id="escudo">Escudo</span>
          </dt>
          <dd>
            {grupoEntity.escudo ? (
              <div>
                {grupoEntity.escudoContentType ? (
                  <a onClick={openFile(grupoEntity.escudoContentType, grupoEntity.escudo)}>
                    <img src={`data:${grupoEntity.escudoContentType};base64,${grupoEntity.escudo}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {grupoEntity.escudoContentType}, {byteSize(grupoEntity.escudo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="limiteParticipantes">Limite Participantes</span>
          </dt>
          <dd>{grupoEntity.limiteParticipantes}</dd>
          <dt>
            <span id="estado">Estado</span>
          </dt>
          <dd>{grupoEntity.estado}</dd>
        </dl>
        <Button as={Link as any} to="/grupo" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Volver</span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/grupo/${grupoEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
        </Button>
      </Col>
    </Row>
  );
};

export default GrupoDetail;
