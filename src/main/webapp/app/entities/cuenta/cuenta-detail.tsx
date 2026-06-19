import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat, byteSize, openFile } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './cuenta.reducer';

export const CuentaDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const cuentaEntity = useAppSelector(state => state.cuenta.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="cuentaDetailsHeading">Cuenta</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{cuentaEntity.id}</dd>
          <dt>
            <span id="fechaNacimiento">Fecha Nacimiento</span>
          </dt>
          <dd>
            {cuentaEntity.fechaNacimiento ? (
              <TextFormat value={cuentaEntity.fechaNacimiento} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="numeroDocumento">Numero Documento</span>
          </dt>
          <dd>{cuentaEntity.numeroDocumento}</dd>
          <dt>
            <span id="correo">Correo</span>
          </dt>
          <dd>{cuentaEntity.correo}</dd>
          <dt>
            <span id="telefono">Telefono</span>
          </dt>
          <dd>{cuentaEntity.telefono}</dd>
          <dt>
            <span id="direccion">Direccion</span>
          </dt>
          <dd>{cuentaEntity.direccion}</dd>
          <dt>
            <span id="foto">Foto</span>
          </dt>
          <dd>
            {cuentaEntity.foto ? (
              <div>
                {cuentaEntity.fotoContentType ? (
                  <a onClick={openFile(cuentaEntity.fotoContentType, cuentaEntity.foto)}>
                    <img src={`data:${cuentaEntity.fotoContentType};base64,${cuentaEntity.foto}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {cuentaEntity.fotoContentType}, {byteSize(cuentaEntity.foto)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="estado">Estado</span>
          </dt>
          <dd>{cuentaEntity.estado}</dd>
          <dt>User</dt>
          <dd>{cuentaEntity.user ? cuentaEntity.user.login : ''}</dd>
          <dt>Tipo Documento</dt>
          <dd>{cuentaEntity.tipoDocumento ? cuentaEntity.tipoDocumento.nombreDocumento : ''}</dd>
        </dl>
        <Button as={Link as any} to="/cuenta" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Volver</span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/cuenta/${cuentaEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CuentaDetail;
