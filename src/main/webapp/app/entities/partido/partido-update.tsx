import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { ValidatedField, ValidatedForm, isNumber } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getGrupos } from 'app/entities/grupo/grupo.reducer';
import { getEntities as getTorneos } from 'app/entities/torneo/torneo.reducer';
import { EstadoPartido } from 'app/shared/model/enumerations/estado-partido.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

import { createEntity, getEntity, reset, updateEntity } from './partido.reducer';

export const PartidoUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const grupos = useAppSelector(state => state.grupo.entities);
  const torneos = useAppSelector(state => state.torneo.entities);
  const partidoEntity = useAppSelector(state => state.partido.entity);
  const loading = useAppSelector(state => state.partido.loading);
  const updating = useAppSelector(state => state.partido.updating);
  const updateSuccess = useAppSelector(state => state.partido.updateSuccess);
  const estadoPartidoValues = Object.keys(EstadoPartido);

  const handleClose = () => {
    navigate(`/partido${location.search}`);
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
    values.fechaHora = convertDateTimeToServer(values.fechaHora);
    if (values.tiempoMinutos !== undefined && typeof values.tiempoMinutos !== 'number') {
      values.tiempoMinutos = Number(values.tiempoMinutos);
    }
    if (values.marcadorLocal !== undefined && typeof values.marcadorLocal !== 'number') {
      values.marcadorLocal = Number(values.marcadorLocal);
    }
    if (values.marcadorVisitante !== undefined && typeof values.marcadorVisitante !== 'number') {
      values.marcadorVisitante = Number(values.marcadorVisitante);
    }

    const entity = {
      ...partidoEntity,
      ...values,
      equipolocal: grupos.find(it => it.id.toString() === values.equipolocal?.toString()),
      equipovisitante: grupos.find(it => it.id.toString() === values.equipovisitante?.toString()),
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
          fechaHora: displayDefaultDateTime(),
        }
      : {
          estado: 'PROGRAMADO',
          ...partidoEntity,
          fechaHora: convertDateTimeFromServer(partidoEntity.fechaHora),
          equipolocal: partidoEntity?.equipolocal?.id,
          equipovisitante: partidoEntity?.equipovisitante?.id,
          torneo: partidoEntity?.torneo?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="playmatchApp.partido.home.createOrEditLabel" data-cy="PartidoCreateUpdateHeading">
            Crear o editar Partido
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew && <ValidatedField name="id" required readOnly id="partido-id" label="ID" validate={{ required: true }} />}
              <ValidatedField
                label="Fecha Hora"
                id="partido-fechaHora"
                name="fechaHora"
                data-cy="fechaHora"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                }}
              />
              <ValidatedField
                label="Lugar"
                id="partido-lugar"
                name="lugar"
                data-cy="lugar"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  maxLength: { value: 150, message: 'Este campo no puede superar más de 150 caracteres.' },
                }}
              />
              <ValidatedField
                label="Tiempo Minutos"
                id="partido-tiempoMinutos"
                name="tiempoMinutos"
                data-cy="tiempoMinutos"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  validate: v => isNumber(v) || 'Este campo debe ser un número.',
                }}
              />
              <ValidatedField label="Marcador Local" id="partido-marcadorLocal" name="marcadorLocal" data-cy="marcadorLocal" type="text" />
              <ValidatedField
                label="Marcador Visitante"
                id="partido-marcadorVisitante"
                name="marcadorVisitante"
                data-cy="marcadorVisitante"
                type="text"
              />
              <ValidatedField label="Estado" id="partido-estado" name="estado" data-cy="estado" type="select">
                {estadoPartidoValues.map(estadoPartido => (
                  <option value={estadoPartido} key={estadoPartido}>
                    {estadoPartido}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField id="partido-equipolocal" name="equipolocal" data-cy="equipolocal" label="Equipolocal" type="select">
                <option value="" key="0" />
                {grupos
                  ? grupos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nombre}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="partido-equipovisitante"
                name="equipovisitante"
                data-cy="equipovisitante"
                label="Equipovisitante"
                type="select"
              >
                <option value="" key="0" />
                {grupos
                  ? grupos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nombre}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="partido-torneo" name="torneo" data-cy="torneo" label="Torneo" type="select" required>
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
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/partido" replace variant="info">
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

export default PartidoUpdate;
