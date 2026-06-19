import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCuentas } from 'app/entities/cuenta/cuenta.reducer';
import { EstadoGeneral } from 'app/shared/model/enumerations/estado-general.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

import { createEntity, getEntity, reset, updateEntity } from './notificacion.reducer';

export const NotificacionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const cuentas = useAppSelector(state => state.cuenta.entities);
  const notificacionEntity = useAppSelector(state => state.notificacion.entity);
  const loading = useAppSelector(state => state.notificacion.loading);
  const updating = useAppSelector(state => state.notificacion.updating);
  const updateSuccess = useAppSelector(state => state.notificacion.updateSuccess);
  const estadoGeneralValues = Object.keys(EstadoGeneral);

  const handleClose = () => {
    navigate(`/notificacion${location.search}`);
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
    values.fechaEnvio = convertDateTimeToServer(values.fechaEnvio);

    const entity = {
      ...notificacionEntity,
      ...values,
      destinatario: cuentas.find(it => it.id.toString() === values.destinatario?.toString()),
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
          fechaEnvio: displayDefaultDateTime(),
        }
      : {
          estado: 'ACTIVO',
          ...notificacionEntity,
          fechaEnvio: convertDateTimeFromServer(notificacionEntity.fechaEnvio),
          destinatario: notificacionEntity?.destinatario?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="playmatchApp.notificacion.home.createOrEditLabel" data-cy="NotificacionCreateUpdateHeading">
            Crear o editar Notificacion
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew && <ValidatedField name="id" required readOnly id="notificacion-id" label="ID" validate={{ required: true }} />}
              <ValidatedField
                label="Titulo"
                id="notificacion-titulo"
                name="titulo"
                data-cy="titulo"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  maxLength: { value: 120, message: 'Este campo no puede superar más de 120 caracteres.' },
                }}
              />
              <ValidatedField
                label="Mensaje"
                id="notificacion-mensaje"
                name="mensaje"
                data-cy="mensaje"
                type="textarea"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                }}
              />
              <ValidatedField label="Leida" id="notificacion-leida" name="leida" data-cy="leida" check type="checkbox" />
              <ValidatedField
                label="Fecha Envio"
                id="notificacion-fechaEnvio"
                name="fechaEnvio"
                data-cy="fechaEnvio"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                }}
              />
              <ValidatedField label="Estado" id="notificacion-estado" name="estado" data-cy="estado" type="select">
                {estadoGeneralValues.map(estadoGeneral => (
                  <option value={estadoGeneral} key={estadoGeneral}>
                    {estadoGeneral}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                id="notificacion-destinatario"
                name="destinatario"
                data-cy="destinatario"
                label="Destinatario"
                type="select"
                required
              >
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
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/notificacion" replace variant="info">
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

export default NotificacionUpdate;
