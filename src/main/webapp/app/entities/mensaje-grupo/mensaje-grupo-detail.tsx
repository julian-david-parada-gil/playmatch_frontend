import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './mensaje-grupo.reducer';

export const MensajeGrupoDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const mensajeGrupoEntity = useAppSelector(state => state.mensajeGrupo.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="mensajeGrupoDetailsHeading">Mensaje Grupo</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{mensajeGrupoEntity.id}</dd>
          <dt>
            <span id="contenido">Contenido</span>
          </dt>
          <dd>{mensajeGrupoEntity.contenido}</dd>
          <dt>
            <span id="fechaPublicacion">Fecha Publicacion</span>
          </dt>
          <dd>
            {mensajeGrupoEntity.fechaPublicacion ? (
              <TextFormat value={mensajeGrupoEntity.fechaPublicacion} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="estado">Estado</span>
          </dt>
          <dd>{mensajeGrupoEntity.estado}</dd>
          <dt>Grupo</dt>
          <dd>{mensajeGrupoEntity.grupo ? mensajeGrupoEntity.grupo.nombre : ''}</dd>
          <dt>Autor</dt>
          <dd>{mensajeGrupoEntity.autor ? mensajeGrupoEntity.autor.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/mensaje-grupo" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Volver</span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/mensaje-grupo/${mensajeGrupoEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
        </Button>
      </Col>
    </Row>
  );
};

export default MensajeGrupoDetail;
