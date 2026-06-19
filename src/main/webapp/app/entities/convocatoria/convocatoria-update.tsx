import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getTorneos } from 'app/entities/torneo/torneo.reducer';
import { EstadoGeneral } from 'app/shared/model/enumerations/estado-general.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

import { createEntity, getEntity, reset, updateEntity } from './convocatoria.reducer';

export const ConvocatoriaUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const torneos = useAppSelector(state => state.torneo.entities);
  const convocatoriaEntity = useAppSelector(state => state.convocatoria.entity);
  const loading = useAppSelector(state => state.convocatoria.loading);
  const updating = useAppSelector(state => state.convocatoria.updating);
  const updateSuccess = useAppSelector(state => state.convocatoria.updateSuccess);
  const estadoGeneralValues = Object.keys(EstadoGeneral);

  const handleClose = () => {
    navigate(`/convocatoria${location.search}`);
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
    values.fechaPublicacion = convertDateTimeToServer(values.fechaPublicacion);
    if (values.cupos !== undefined && typeof values.cupos !== 'number') {
      values.cupos = Number(values.cupos);
    }

    const entity = {
      ...convocatoriaEntity,
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
          fechaPublicacion: displayDefaultDateTime(),
        }
      : {
          estado: 'ACTIVO',
          ...convocatoriaEntity,
          fechaPublicacion: convertDateTimeFromServer(convocatoriaEntity.fechaPublicacion),
          torneo: convocatoriaEntity?.torneo?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="playmatchApp.convocatoria.home.createOrEditLabel" data-cy="ConvocatoriaCreateUpdateHeading">
            Crear o editar Convocatoria
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew && <ValidatedField name="id" required readOnly id="convocatoria-id" label="ID" validate={{ required: true }} />}
              <ValidatedField
                label="Titulo"
                id="convocatoria-titulo"
                name="titulo"
                data-cy="titulo"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  maxLength: { value: 150, message: 'Este campo no puede superar más de 150 caracteres.' },
                }}
              />
              <ValidatedField
                label="Descripcion"
                id="convocatoria-descripcion"
                name="descripcion"
                data-cy="descripcion"
                type="textarea"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                }}
              />
              <ValidatedField
                label="Fecha Publicacion"
                id="convocatoria-fechaPublicacion"
                name="fechaPublicacion"
                data-cy="fechaPublicacion"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                }}
              />
              <ValidatedField
                label="Fecha Inicio Inscripcion"
                id="convocatoria-fechaInicioInscripcion"
                name="fechaInicioInscripcion"
                data-cy="fechaInicioInscripcion"
                type="date"
              />
              <ValidatedField
                label="Fecha Fin Inscripcion"
                id="convocatoria-fechaFinInscripcion"
                name="fechaFinInscripcion"
                data-cy="fechaFinInscripcion"
                type="date"
              />
              <ValidatedField label="Cupos" id="convocatoria-cupos" name="cupos" data-cy="cupos" type="text" />
              <ValidatedField label="Estado" id="convocatoria-estado" name="estado" data-cy="estado" type="select">
                {estadoGeneralValues.map(estadoGeneral => (
                  <option value={estadoGeneral} key={estadoGeneral}>
                    {estadoGeneral}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField id="convocatoria-torneo" name="torneo" data-cy="torneo" label="Torneo" type="select" required>
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
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/convocatoria" replace variant="info">
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

export default ConvocatoriaUpdate;
