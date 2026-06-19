import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCuentas } from 'app/entities/cuenta/cuenta.reducer';
import { getEntities as getTorneos } from 'app/entities/torneo/torneo.reducer';
import { EstadoSolicitud } from 'app/shared/model/enumerations/estado-solicitud.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

import { createEntity, getEntity, reset, updateEntity } from './inscripcion.reducer';

export const InscripcionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const torneos = useAppSelector(state => state.torneo.entities);
  const cuentas = useAppSelector(state => state.cuenta.entities);
  const inscripcionEntity = useAppSelector(state => state.inscripcion.entity);
  const loading = useAppSelector(state => state.inscripcion.loading);
  const updating = useAppSelector(state => state.inscripcion.updating);
  const updateSuccess = useAppSelector(state => state.inscripcion.updateSuccess);
  const estadoSolicitudValues = Object.keys(EstadoSolicitud);

  const handleClose = () => {
    navigate(`/inscripcion${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTorneos({}));
    dispatch(getCuentas({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.fechaInscripcion = convertDateTimeToServer(values.fechaInscripcion);

    const entity = {
      ...inscripcionEntity,
      ...values,
      torneo: torneos.find(it => it.id.toString() === values.torneo?.toString()),
      usuario: cuentas.find(it => it.id.toString() === values.usuario?.toString()),
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
          fechaInscripcion: displayDefaultDateTime(),
        }
      : {
          estado: 'PENDIENTE',
          ...inscripcionEntity,
          fechaInscripcion: convertDateTimeFromServer(inscripcionEntity.fechaInscripcion),
          torneo: inscripcionEntity?.torneo?.id,
          usuario: inscripcionEntity?.usuario?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="playmatchApp.inscripcion.home.createOrEditLabel" data-cy="InscripcionCreateUpdateHeading">
            Crear o editar Inscripcion
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew && <ValidatedField name="id" required readOnly id="inscripcion-id" label="ID" validate={{ required: true }} />}
              <ValidatedField
                label="Codigo"
                id="inscripcion-codigo"
                name="codigo"
                data-cy="codigo"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  maxLength: { value: 30, message: 'Este campo no puede superar más de 30 caracteres.' },
                }}
              />
              <ValidatedField
                label="Fecha Inscripcion"
                id="inscripcion-fechaInscripcion"
                name="fechaInscripcion"
                data-cy="fechaInscripcion"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                }}
              />
              <ValidatedField label="Estado" id="inscripcion-estado" name="estado" data-cy="estado" type="select">
                {estadoSolicitudValues.map(estadoSolicitud => (
                  <option value={estadoSolicitud} key={estadoSolicitud}>
                    {estadoSolicitud}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Observaciones"
                id="inscripcion-observaciones"
                name="observaciones"
                data-cy="observaciones"
                type="textarea"
              />
              <ValidatedField id="inscripcion-torneo" name="torneo" data-cy="torneo" label="Torneo" type="select" required>
                <option value="" key="0" />
                {torneos
                  ? torneos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nombre}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>Este campo es obligatorio.</FormText>
              <ValidatedField id="inscripcion-usuario" name="usuario" data-cy="usuario" label="Usuario" type="select" required>
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
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/inscripcion" replace variant="info">
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

export default InscripcionUpdate;
