import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { ValidatedBlobField, ValidatedField, ValidatedForm } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getTorneos } from 'app/entities/torneo/torneo.reducer';
import { EstadoGeneral } from 'app/shared/model/enumerations/estado-general.model';
import { TipoEventoCalendario } from 'app/shared/model/enumerations/tipo-evento-calendario.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

import { createEntity, getEntity, reset, updateEntity } from './calendario-evento.reducer';

export const CalendarioEventoUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const torneos = useAppSelector(state => state.torneo.entities);
  const calendarioEventoEntity = useAppSelector(state => state.calendarioEvento.entity);
  const loading = useAppSelector(state => state.calendarioEvento.loading);
  const updating = useAppSelector(state => state.calendarioEvento.updating);
  const updateSuccess = useAppSelector(state => state.calendarioEvento.updateSuccess);
  const tipoEventoCalendarioValues = Object.keys(TipoEventoCalendario);
  const estadoGeneralValues = Object.keys(EstadoGeneral);

  const handleClose = () => {
    navigate(`/calendario-evento${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTorneos({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.fechaEvento = convertDateTimeToServer(values.fechaEvento);

    const entity = {
      ...calendarioEventoEntity,
      ...values,
      torneo: torneos.find(it => it.id.toString() === values.torneo?.toString()),
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
          fechaEvento: displayDefaultDateTime(),
        }
      : {
          tipo: 'INSCRIPCION',
          estado: 'ACTIVO',
          ...calendarioEventoEntity,
          fechaEvento: convertDateTimeFromServer(calendarioEventoEntity.fechaEvento),
          torneo: calendarioEventoEntity?.torneo?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="playmatchApp.calendarioEvento.home.createOrEditLabel" data-cy="CalendarioEventoCreateUpdateHeading">
            Crear o editar Calendario Evento
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew && <ValidatedField name="id" required readOnly id="calendario-evento-id" label="ID" validate={{ required: true }} />}
              <ValidatedField
                label="Titulo"
                id="calendario-evento-titulo"
                name="titulo"
                data-cy="titulo"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  maxLength: { value: 120, message: 'Este campo no puede superar más de 120 caracteres.' },
                }}
              />
              <ValidatedField
                label="Descripcion"
                id="calendario-evento-descripcion"
                name="descripcion"
                data-cy="descripcion"
                type="textarea"
              />
              <ValidatedBlobField
                label="Calendario"
                id="calendario-evento-calendario"
                name="calendario"
                data-cy="calendario"
                openActionLabel="Abrir"
              />
              <ValidatedField
                label="Fecha Evento"
                id="calendario-evento-fechaEvento"
                name="fechaEvento"
                data-cy="fechaEvento"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                }}
              />
              <ValidatedField label="Tipo" id="calendario-evento-tipo" name="tipo" data-cy="tipo" type="select">
                {tipoEventoCalendarioValues.map(tipoEventoCalendario => (
                  <option value={tipoEventoCalendario} key={tipoEventoCalendario}>
                    {tipoEventoCalendario}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label="Estado" id="calendario-evento-estado" name="estado" data-cy="estado" type="select">
                {estadoGeneralValues.map(estadoGeneral => (
                  <option value={estadoGeneral} key={estadoGeneral}>
                    {estadoGeneral}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField id="calendario-evento-torneo" name="torneo" data-cy="torneo" label="Torneo" type="select" required>
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
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/calendario-evento" replace variant="info">
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

export default CalendarioEventoUpdate;
