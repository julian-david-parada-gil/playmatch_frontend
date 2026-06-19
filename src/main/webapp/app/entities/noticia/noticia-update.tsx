import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCuentas } from 'app/entities/cuenta/cuenta.reducer';
import { EstadoGeneral } from 'app/shared/model/enumerations/estado-general.model';
import { TipoNoticia } from 'app/shared/model/enumerations/tipo-noticia.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

import { createEntity, getEntity, reset, updateEntity } from './noticia.reducer';

export const NoticiaUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const cuentas = useAppSelector(state => state.cuenta.entities);
  const noticiaEntity = useAppSelector(state => state.noticia.entity);
  const loading = useAppSelector(state => state.noticia.loading);
  const updating = useAppSelector(state => state.noticia.updating);
  const updateSuccess = useAppSelector(state => state.noticia.updateSuccess);
  const tipoNoticiaValues = Object.keys(TipoNoticia);
  const estadoGeneralValues = Object.keys(EstadoGeneral);

  const handleClose = () => {
    navigate(`/noticia${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCuentas({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.fechaPublicacion = convertDateTimeToServer(values.fechaPublicacion);

    const entity = {
      ...noticiaEntity,
      ...values,
      autor: cuentas.find(it => it.id.toString() === values.autor?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          fechaPublicacion: displayDefaultDateTime(),
        }
      : {
          tipo: 'NOTICIA',
          estado: 'ACTIVO',
          ...noticiaEntity,
          fechaPublicacion: convertDateTimeFromServer(noticiaEntity.fechaPublicacion),
          autor: noticiaEntity?.autor?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="playmatchApp.noticia.home.createOrEditLabel" data-cy="NoticiaCreateUpdateHeading">
            Crear o editar Noticia
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew && <ValidatedField name="id" required readOnly id="noticia-id" label="ID" validate={{ required: true }} />}
              <ValidatedField
                label="Titulo"
                id="noticia-titulo"
                name="titulo"
                data-cy="titulo"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  maxLength: { value: 150, message: 'Este campo no puede superar más de 150 caracteres.' },
                }}
              />
              <ValidatedField
                label="Contenido"
                id="noticia-contenido"
                name="contenido"
                data-cy="contenido"
                type="textarea"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                }}
              />
              <ValidatedField label="Tipo" id="noticia-tipo" name="tipo" data-cy="tipo" type="select">
                {tipoNoticiaValues.map(tipoNoticia => (
                  <option value={tipoNoticia} key={tipoNoticia}>
                    {tipoNoticia}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Fecha Publicacion"
                id="noticia-fechaPublicacion"
                name="fechaPublicacion"
                data-cy="fechaPublicacion"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                }}
              />
              <ValidatedField label="Estado" id="noticia-estado" name="estado" data-cy="estado" type="select">
                {estadoGeneralValues.map(estadoGeneral => (
                  <option value={estadoGeneral} key={estadoGeneral}>
                    {estadoGeneral}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField id="noticia-autor" name="autor" data-cy="autor" label="Autor" type="select" required>
                <option value="" key="0" />
                {cuentas
                  ? cuentas.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>Este campo es obligatorio.</FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/noticia" replace variant="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Volver</span>
              </Button>
              &nbsp;
              <Button variant="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Guardar
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default NoticiaUpdate;
