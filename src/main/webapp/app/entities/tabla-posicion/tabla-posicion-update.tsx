import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { ValidatedField, ValidatedForm, isNumber } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getGrupos } from 'app/entities/grupo/grupo.reducer';
import { getEntities as getTorneos } from 'app/entities/torneo/torneo.reducer';

import { createEntity, getEntity, reset, updateEntity } from './tabla-posicion.reducer';

export const TablaPosicionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const grupos = useAppSelector(state => state.grupo.entities);
  const torneos = useAppSelector(state => state.torneo.entities);
  const tablaPosicionEntity = useAppSelector(state => state.tablaPosicion.entity);
  const loading = useAppSelector(state => state.tablaPosicion.loading);
  const updating = useAppSelector(state => state.tablaPosicion.updating);
  const updateSuccess = useAppSelector(state => state.tablaPosicion.updateSuccess);

  const handleClose = () => {
    navigate(`/tabla-posicion${location.search}`);
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
    if (values.puntos !== undefined && typeof values.puntos !== 'number') {
      values.puntos = Number(values.puntos);
    }
    if (values.partidosJugados !== undefined && typeof values.partidosJugados !== 'number') {
      values.partidosJugados = Number(values.partidosJugados);
    }
    if (values.partidosGanados !== undefined && typeof values.partidosGanados !== 'number') {
      values.partidosGanados = Number(values.partidosGanados);
    }
    if (values.partidosEmpatados !== undefined && typeof values.partidosEmpatados !== 'number') {
      values.partidosEmpatados = Number(values.partidosEmpatados);
    }
    if (values.partidosPerdidos !== undefined && typeof values.partidosPerdidos !== 'number') {
      values.partidosPerdidos = Number(values.partidosPerdidos);
    }
    if (values.golesFavor !== undefined && typeof values.golesFavor !== 'number') {
      values.golesFavor = Number(values.golesFavor);
    }
    if (values.golesContra !== undefined && typeof values.golesContra !== 'number') {
      values.golesContra = Number(values.golesContra);
    }
    if (values.diferenciaGoles !== undefined && typeof values.diferenciaGoles !== 'number') {
      values.diferenciaGoles = Number(values.diferenciaGoles);
    }

    const entity = {
      ...tablaPosicionEntity,
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
      ? {}
      : {
          ...tablaPosicionEntity,
          grupo: tablaPosicionEntity?.grupo?.id,
          torneo: tablaPosicionEntity?.torneo?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="playmatchApp.tablaPosicion.home.createOrEditLabel" data-cy="TablaPosicionCreateUpdateHeading">
            Crear o editar Tabla Posicion
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew && <ValidatedField name="id" required readOnly id="tabla-posicion-id" label="ID" validate={{ required: true }} />}
              <ValidatedField
                label="Puntos"
                id="tabla-posicion-puntos"
                name="puntos"
                data-cy="puntos"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  validate: v => isNumber(v) || 'Este campo debe ser un número.',
                }}
              />
              <ValidatedField
                label="Partidos Jugados"
                id="tabla-posicion-partidosJugados"
                name="partidosJugados"
                data-cy="partidosJugados"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  validate: v => isNumber(v) || 'Este campo debe ser un número.',
                }}
              />
              <ValidatedField
                label="Partidos Ganados"
                id="tabla-posicion-partidosGanados"
                name="partidosGanados"
                data-cy="partidosGanados"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  validate: v => isNumber(v) || 'Este campo debe ser un número.',
                }}
              />
              <ValidatedField
                label="Partidos Empatados"
                id="tabla-posicion-partidosEmpatados"
                name="partidosEmpatados"
                data-cy="partidosEmpatados"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  validate: v => isNumber(v) || 'Este campo debe ser un número.',
                }}
              />
              <ValidatedField
                label="Partidos Perdidos"
                id="tabla-posicion-partidosPerdidos"
                name="partidosPerdidos"
                data-cy="partidosPerdidos"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  validate: v => isNumber(v) || 'Este campo debe ser un número.',
                }}
              />
              <ValidatedField
                label="Goles Favor"
                id="tabla-posicion-golesFavor"
                name="golesFavor"
                data-cy="golesFavor"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  validate: v => isNumber(v) || 'Este campo debe ser un número.',
                }}
              />
              <ValidatedField
                label="Goles Contra"
                id="tabla-posicion-golesContra"
                name="golesContra"
                data-cy="golesContra"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  validate: v => isNumber(v) || 'Este campo debe ser un número.',
                }}
              />
              <ValidatedField
                label="Diferencia Goles"
                id="tabla-posicion-diferenciaGoles"
                name="diferenciaGoles"
                data-cy="diferenciaGoles"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  validate: v => isNumber(v) || 'Este campo debe ser un número.',
                }}
              />
              <ValidatedField id="tabla-posicion-grupo" name="grupo" data-cy="grupo" label="Grupo" type="select" required>
                <option value="" key="0" />
                {grupos
                  ? grupos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nombre}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>Este campo es obligatorio.</FormText>
              <ValidatedField id="tabla-posicion-torneo" name="torneo" data-cy="torneo" label="Torneo" type="select" required>
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
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/tabla-posicion" replace variant="info">
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

export default TablaPosicionUpdate;
