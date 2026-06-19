import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './categoria.reducer';

export const CategoriaDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const categoriaEntity = useAppSelector(state => state.categoria.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="categoriaDetailsHeading">Categoria</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{categoriaEntity.id}</dd>
          <dt>
            <span id="nombre">Nombre</span>
          </dt>
          <dd>{categoriaEntity.nombre}</dd>
          <dt>
            <span id="modalidad">Modalidad</span>
          </dt>
          <dd>{categoriaEntity.modalidad}</dd>
          <dt>
            <span id="descripcion">Descripcion</span>
          </dt>
          <dd>{categoriaEntity.descripcion}</dd>
          <dt>
            <span id="fechaCreacion">Fecha Creacion</span>
          </dt>
          <dd>
            {categoriaEntity.fechaCreacion ? (
              <TextFormat value={categoriaEntity.fechaCreacion} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="fechaActualizacion">Fecha Actualizacion</span>
          </dt>
          <dd>
            {categoriaEntity.fechaActualizacion ? (
              <TextFormat value={categoriaEntity.fechaActualizacion} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="estado">Estado</span>
          </dt>
          <dd>{categoriaEntity.estado}</dd>
        </dl>
        <Button as={Link as any} to="/categoria" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Volver</span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/categoria/${categoriaEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CategoriaDetail;
