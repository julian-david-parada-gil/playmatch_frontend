import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './miembro-grupo.reducer';

export const MiembroGrupoDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const miembroGrupoEntity = useAppSelector(state => state.miembroGrupo.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="miembroGrupoDetailsHeading">Miembro Grupo</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{miembroGrupoEntity.id}</dd>
          <dt>
            <span id="fechaIngreso">Fecha Ingreso</span>
          </dt>
          <dd>
            {miembroGrupoEntity.fechaIngreso ? (
              <TextFormat value={miembroGrupoEntity.fechaIngreso} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="estado">Estado</span>
          </dt>
          <dd>{miembroGrupoEntity.estado}</dd>
          <dt>
            <span id="esAdministrador">Es Administrador</span>
          </dt>
          <dd>{miembroGrupoEntity.esAdministrador ? 'true' : 'false'}</dd>
          <dt>Grupo</dt>
          <dd>{miembroGrupoEntity.grupo ? miembroGrupoEntity.grupo.nombre : ''}</dd>
          <dt>Usuario</dt>
          <dd>{miembroGrupoEntity.usuario ? miembroGrupoEntity.usuario.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/miembro-grupo" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Volver</span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/miembro-grupo/${miembroGrupoEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
        </Button>
      </Col>
    </Row>
  );
};

export default MiembroGrupoDetail;
