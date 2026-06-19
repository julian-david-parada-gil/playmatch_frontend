import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './noticia.reducer';

export const NoticiaDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const noticiaEntity = useAppSelector(state => state.noticia.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="noticiaDetailsHeading">Noticia</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{noticiaEntity.id}</dd>
          <dt>
            <span id="titulo">Titulo</span>
          </dt>
          <dd>{noticiaEntity.titulo}</dd>
          <dt>
            <span id="contenido">Contenido</span>
          </dt>
          <dd>{noticiaEntity.contenido}</dd>
          <dt>
            <span id="tipo">Tipo</span>
          </dt>
          <dd>{noticiaEntity.tipo}</dd>
          <dt>
            <span id="fechaPublicacion">Fecha Publicacion</span>
          </dt>
          <dd>
            {noticiaEntity.fechaPublicacion ? (
              <TextFormat value={noticiaEntity.fechaPublicacion} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="estado">Estado</span>
          </dt>
          <dd>{noticiaEntity.estado}</dd>
          <dt>Autor</dt>
          <dd>{noticiaEntity.autor ? noticiaEntity.autor.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/noticia" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Volver</span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/noticia/${noticiaEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
        </Button>
      </Col>
    </Row>
  );
};

export default NoticiaDetail;
