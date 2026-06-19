import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { ValidatedBlobField, ValidatedField, ValidatedForm, isNumber } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCategorias } from 'app/entities/categoria/categoria.reducer';
import { EstadoTorneo } from 'app/shared/model/enumerations/estado-torneo.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

import { createEntity, getEntity, reset, updateEntity } from './torneo.reducer';

export const TorneoUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const categorias = useAppSelector(state => state.categoria.entities);
  const torneoEntity = useAppSelector(state => state.torneo.entity);
  const loading = useAppSelector(state => state.torneo.loading);
  const updating = useAppSelector(state => state.torneo.updating);
  const updateSuccess = useAppSelector(state => state.torneo.updateSuccess);
  const estadoTorneoValues = Object.keys(EstadoTorneo);

  const handleClose = () => {
    navigate(`/torneo${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCategorias({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.horaInicio = convertDateTimeToServer(values.horaInicio);
    if (values.cupoMaximoEquipos !== undefined && typeof values.cupoMaximoEquipos !== 'number') {
      values.cupoMaximoEquipos = Number(values.cupoMaximoEquipos);
    }
    if (values.cupoMaximoJugadores !== undefined && typeof values.cupoMaximoJugadores !== 'number') {
      values.cupoMaximoJugadores = Number(values.cupoMaximoJugadores);
    }

    const entity = {
      ...torneoEntity,
      ...values,
      categoria: categorias.find(it => it.id.toString() === values.categoria?.toString()),
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
          horaInicio: displayDefaultDateTime(),
        }
      : {
          estado: 'ACTIVO',
          ...torneoEntity,
          horaInicio: convertDateTimeFromServer(torneoEntity.horaInicio),
          categoria: torneoEntity?.categoria?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="playmatchApp.torneo.home.createOrEditLabel" data-cy="TorneoCreateUpdateHeading">
            Crear o editar Torneo
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew && <ValidatedField name="id" required readOnly id="torneo-id" label="ID" validate={{ required: true }} />}
              <ValidatedField
                label="Nombre"
                id="torneo-nombre"
                name="nombre"
                data-cy="nombre"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  maxLength: { value: 120, message: 'Este campo no puede superar más de 120 caracteres.' },
                }}
              />
              <ValidatedField label="Descripcion" id="torneo-descripcion" name="descripcion" data-cy="descripcion" type="textarea" />
              <ValidatedField
                label="Fecha Inicio"
                id="torneo-fechaInicio"
                name="fechaInicio"
                data-cy="fechaInicio"
                type="date"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                }}
              />
              <ValidatedField label="Fecha Fin" id="torneo-fechaFin" name="fechaFin" data-cy="fechaFin" type="date" />
              <ValidatedField
                label="Hora Inicio"
                id="torneo-horaInicio"
                name="horaInicio"
                data-cy="horaInicio"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Ubicacion"
                id="torneo-ubicacion"
                name="ubicacion"
                data-cy="ubicacion"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  maxLength: { value: 200, message: 'Este campo no puede superar más de 200 caracteres.' },
                }}
              />
              <ValidatedBlobField
                label="Reglamento"
                id="torneo-reglamento"
                name="reglamento"
                data-cy="reglamento"
                openActionLabel="Abrir"
              />
              <ValidatedField
                label="Cupo Maximo Equipos"
                id="torneo-cupoMaximoEquipos"
                name="cupoMaximoEquipos"
                data-cy="cupoMaximoEquipos"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  validate: v => isNumber(v) || 'Este campo debe ser un número.',
                }}
              />
              <ValidatedField
                label="Cupo Maximo Jugadores"
                id="torneo-cupoMaximoJugadores"
                name="cupoMaximoJugadores"
                data-cy="cupoMaximoJugadores"
                type="text"
              />
              <ValidatedField label="Estado" id="torneo-estado" name="estado" data-cy="estado" type="select">
                {estadoTorneoValues.map(estadoTorneo => (
                  <option value={estadoTorneo} key={estadoTorneo}>
                    {estadoTorneo}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField id="torneo-categoria" name="categoria" data-cy="categoria" label="Categoria" type="select" required>
                <option value="" key="0" />
                {categorias
                  ? categorias.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nombre}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>Este campo es obligatorio.</FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/torneo" replace variant="info">
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

export default TorneoUpdate;
