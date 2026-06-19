import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCuentas } from 'app/entities/cuenta/cuenta.reducer';
import { getEntities as getGrupos } from 'app/entities/grupo/grupo.reducer';
import { EstadoGeneral } from 'app/shared/model/enumerations/estado-general.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

import { createEntity, getEntity, reset, updateEntity } from './miembro-grupo.reducer';

export const MiembroGrupoUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const grupos = useAppSelector(state => state.grupo.entities);
  const cuentas = useAppSelector(state => state.cuenta.entities);
  const miembroGrupoEntity = useAppSelector(state => state.miembroGrupo.entity);
  const loading = useAppSelector(state => state.miembroGrupo.loading);
  const updating = useAppSelector(state => state.miembroGrupo.updating);
  const updateSuccess = useAppSelector(state => state.miembroGrupo.updateSuccess);
  const estadoGeneralValues = Object.keys(EstadoGeneral);

  const handleClose = () => {
    navigate(`/miembro-grupo${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getGrupos({}));
    dispatch(getCuentas({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.fechaIngreso = convertDateTimeToServer(values.fechaIngreso);

    const entity = {
      ...miembroGrupoEntity,
      ...values,
      grupo: grupos.find(it => it.id.toString() === values.grupo?.toString()),
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
          fechaIngreso: displayDefaultDateTime(),
        }
      : {
          estado: 'ACTIVO',
          ...miembroGrupoEntity,
          fechaIngreso: convertDateTimeFromServer(miembroGrupoEntity.fechaIngreso),
          grupo: miembroGrupoEntity?.grupo?.id,
          usuario: miembroGrupoEntity?.usuario?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="playmatchApp.miembroGrupo.home.createOrEditLabel" data-cy="MiembroGrupoCreateUpdateHeading">
            Crear o editar Miembro Grupo
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew && <ValidatedField name="id" required readOnly id="miembro-grupo-id" label="ID" validate={{ required: true }} />}
              <ValidatedField
                label="Fecha Ingreso"
                id="miembro-grupo-fechaIngreso"
                name="fechaIngreso"
                data-cy="fechaIngreso"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                }}
              />
              <ValidatedField label="Estado" id="miembro-grupo-estado" name="estado" data-cy="estado" type="select">
                {estadoGeneralValues.map(estadoGeneral => (
                  <option value={estadoGeneral} key={estadoGeneral}>
                    {estadoGeneral}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Es Administrador"
                id="miembro-grupo-esAdministrador"
                name="esAdministrador"
                data-cy="esAdministrador"
                check
                type="checkbox"
              />
              <ValidatedField id="miembro-grupo-grupo" name="grupo" data-cy="grupo" label="Grupo" type="select" required>
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
              <ValidatedField id="miembro-grupo-usuario" name="usuario" data-cy="usuario" label="Usuario" type="select" required>
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
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/miembro-grupo" replace variant="info">
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

export default MiembroGrupoUpdate;
