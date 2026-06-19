import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getGrupos } from 'app/entities/grupo/grupo.reducer';
import { getEntities as getTorneos } from 'app/entities/torneo/torneo.reducer';
import { EstadoEncuesta } from 'app/shared/model/enumerations/estado-encuesta.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

import { createEntity, getEntity, reset, updateEntity } from './encuesta.reducer';

export const EncuestaUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const grupos = useAppSelector(state => state.grupo.entities);
  const torneos = useAppSelector(state => state.torneo.entities);
  const encuestaEntity = useAppSelector(state => state.encuesta.entity);
  const loading = useAppSelector(state => state.encuesta.loading);
  const updating = useAppSelector(state => state.encuesta.updating);
  const updateSuccess = useAppSelector(state => state.encuesta.updateSuccess);
  const estadoEncuestaValues = Object.keys(EstadoEncuesta);

  const handleClose = () => {
    navigate(`/encuesta${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getGrupos({}));
    dispatch(getTorneos({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    if (values.votosOpcion1 !== undefined && typeof values.votosOpcion1 !== 'number') {
      values.votosOpcion1 = Number(values.votosOpcion1);
    }
    if (values.votosOpcion2 !== undefined && typeof values.votosOpcion2 !== 'number') {
      values.votosOpcion2 = Number(values.votosOpcion2);
    }
    if (values.votosOpcion3 !== undefined && typeof values.votosOpcion3 !== 'number') {
      values.votosOpcion3 = Number(values.votosOpcion3);
    }
    if (values.votosOpcion4 !== undefined && typeof values.votosOpcion4 !== 'number') {
      values.votosOpcion4 = Number(values.votosOpcion4);
    }
    values.fechaInicio = convertDateTimeToServer(values.fechaInicio);
    values.fechaFin = convertDateTimeToServer(values.fechaFin);

    const entity = {
      ...encuestaEntity,
      ...values,
      grupo: grupos.find(it => it.id.toString() === values.grupo?.toString()),
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
          fechaInicio: displayDefaultDateTime(),
          fechaFin: displayDefaultDateTime(),
        }
      : {
          estado: 'ACTIVA',
          ...encuestaEntity,
          fechaInicio: convertDateTimeFromServer(encuestaEntity.fechaInicio),
          fechaFin: convertDateTimeFromServer(encuestaEntity.fechaFin),
          grupo: encuestaEntity?.grupo?.id,
          torneo: encuestaEntity?.torneo?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="playmatchApp.encuesta.home.createOrEditLabel" data-cy="EncuestaCreateUpdateHeading">
            Crear o editar Encuesta
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew && <ValidatedField name="id" required readOnly id="encuesta-id" label="ID" validate={{ required: true }} />}
              <ValidatedField
                label="Titulo"
                id="encuesta-titulo"
                name="titulo"
                data-cy="titulo"
                type="textarea"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                }}
              />
              <ValidatedField
                label="Opcion 1"
                id="encuesta-opcion1"
                name="opcion1"
                data-cy="opcion1"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  maxLength: { value: 255, message: 'Este campo no puede superar más de 255 caracteres.' },
                }}
              />
              <ValidatedField
                label="Opcion 2"
                id="encuesta-opcion2"
                name="opcion2"
                data-cy="opcion2"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  maxLength: { value: 255, message: 'Este campo no puede superar más de 255 caracteres.' },
                }}
              />
              <ValidatedField
                label="Opcion 3"
                id="encuesta-opcion3"
                name="opcion3"
                data-cy="opcion3"
                type="text"
                validate={{
                  maxLength: { value: 255, message: 'Este campo no puede superar más de 255 caracteres.' },
                }}
              />
              <ValidatedField
                label="Opcion 4"
                id="encuesta-opcion4"
                name="opcion4"
                data-cy="opcion4"
                type="text"
                validate={{
                  maxLength: { value: 255, message: 'Este campo no puede superar más de 255 caracteres.' },
                }}
              />
              <ValidatedField label="Votos Opcion 1" id="encuesta-votosOpcion1" name="votosOpcion1" data-cy="votosOpcion1" type="text" />
              <ValidatedField label="Votos Opcion 2" id="encuesta-votosOpcion2" name="votosOpcion2" data-cy="votosOpcion2" type="text" />
              <ValidatedField label="Votos Opcion 3" id="encuesta-votosOpcion3" name="votosOpcion3" data-cy="votosOpcion3" type="text" />
              <ValidatedField label="Votos Opcion 4" id="encuesta-votosOpcion4" name="votosOpcion4" data-cy="votosOpcion4" type="text" />
              <ValidatedField
                label="Fecha Inicio"
                id="encuesta-fechaInicio"
                name="fechaInicio"
                data-cy="fechaInicio"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Fecha Fin"
                id="encuesta-fechaFin"
                name="fechaFin"
                data-cy="fechaFin"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField label="Estado" id="encuesta-estado" name="estado" data-cy="estado" type="select">
                {estadoEncuestaValues.map(estadoEncuesta => (
                  <option value={estadoEncuesta} key={estadoEncuesta}>
                    {estadoEncuesta}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField id="encuesta-grupo" name="grupo" data-cy="grupo" label="Grupo" type="select">
                <option value="" key="0" />
                {grupos
                  ? grupos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nombre}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="encuesta-torneo" name="torneo" data-cy="torneo" label="Torneo" type="select">
                <option value="" key="0" />
                {torneos
                  ? torneos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nombre}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/encuesta" replace variant="info">
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

export default EncuestaUpdate;
