import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { ValidatedField, ValidatedForm, isNumber } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCuentas } from 'app/entities/cuenta/cuenta.reducer';
import { getEntities as getTorneos } from 'app/entities/torneo/torneo.reducer';
import { EstadoGeneral } from 'app/shared/model/enumerations/estado-general.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

import { createEntity, getEntity, reset, updateEntity } from './calificacion.reducer';

export const CalificacionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const torneos = useAppSelector(state => state.torneo.entities);
  const cuentas = useAppSelector(state => state.cuenta.entities);
  const calificacionEntity = useAppSelector(state => state.calificacion.entity);
  const loading = useAppSelector(state => state.calificacion.loading);
  const updating = useAppSelector(state => state.calificacion.updating);
  const updateSuccess = useAppSelector(state => state.calificacion.updateSuccess);
  const estadoGeneralValues = Object.keys(EstadoGeneral);

  const handleClose = () => {
    navigate(`/calificacion${location.search}`);
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
    if (values.puntaje !== undefined && typeof values.puntaje !== 'number') {
      values.puntaje = Number(values.puntaje);
    }
    values.fechaCalificacion = convertDateTimeToServer(values.fechaCalificacion);

    const entity = {
      ...calificacionEntity,
      ...values,
      torneo: torneos.find(it => it.id.toString() === values.torneo?.toString()),
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
          fechaCalificacion: displayDefaultDateTime(),
        }
      : {
          estado: 'ACTIVO',
          ...calificacionEntity,
          fechaCalificacion: convertDateTimeFromServer(calificacionEntity.fechaCalificacion),
          torneo: calificacionEntity?.torneo?.id,
          autor: calificacionEntity?.autor?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="playmatchApp.calificacion.home.createOrEditLabel" data-cy="CalificacionCreateUpdateHeading">
            Crear o editar Calificacion
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew && <ValidatedField name="id" required readOnly id="calificacion-id" label="ID" validate={{ required: true }} />}
              <ValidatedField
                label="Puntaje"
                id="calificacion-puntaje"
                name="puntaje"
                data-cy="puntaje"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  validate: v => isNumber(v) || 'Este campo debe ser un número.',
                }}
              />
              <ValidatedField
                label="Comentario"
                id="calificacion-comentario"
                name="comentario"
                data-cy="comentario"
                type="text"
                validate={{
                  maxLength: { value: 255, message: 'Este campo no puede superar más de 255 caracteres.' },
                }}
              />
              <ValidatedField
                label="Fecha Calificacion"
                id="calificacion-fechaCalificacion"
                name="fechaCalificacion"
                data-cy="fechaCalificacion"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                }}
              />
              <ValidatedField label="Estado" id="calificacion-estado" name="estado" data-cy="estado" type="select">
                {estadoGeneralValues.map(estadoGeneral => (
                  <option value={estadoGeneral} key={estadoGeneral}>
                    {estadoGeneral}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField id="calificacion-torneo" name="torneo" data-cy="torneo" label="Torneo" type="select" required>
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
              <ValidatedField id="calificacion-autor" name="autor" data-cy="autor" label="Autor" type="select" required>
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
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/calificacion" replace variant="info">
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

export default CalificacionUpdate;
