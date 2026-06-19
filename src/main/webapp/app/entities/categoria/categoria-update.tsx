import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { EstadoGeneral } from 'app/shared/model/enumerations/estado-general.model';
import { ModalidadDeporte } from 'app/shared/model/enumerations/modalidad-deporte.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

import { createEntity, getEntity, reset, updateEntity } from './categoria.reducer';

export const CategoriaUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const categoriaEntity = useAppSelector(state => state.categoria.entity);
  const loading = useAppSelector(state => state.categoria.loading);
  const updating = useAppSelector(state => state.categoria.updating);
  const updateSuccess = useAppSelector(state => state.categoria.updateSuccess);
  const modalidadDeporteValues = Object.keys(ModalidadDeporte);
  const estadoGeneralValues = Object.keys(EstadoGeneral);

  const handleClose = () => {
    navigate(`/categoria${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.fechaCreacion = convertDateTimeToServer(values.fechaCreacion);
    values.fechaActualizacion = convertDateTimeToServer(values.fechaActualizacion);

    const entity = {
      ...categoriaEntity,
      ...values,
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
          fechaCreacion: displayDefaultDateTime(),
          fechaActualizacion: displayDefaultDateTime(),
        }
      : {
          modalidad: 'TRESXTRES',
          estado: 'ACTIVO',
          ...categoriaEntity,
          fechaCreacion: convertDateTimeFromServer(categoriaEntity.fechaCreacion),
          fechaActualizacion: convertDateTimeFromServer(categoriaEntity.fechaActualizacion),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="playmatchApp.categoria.home.createOrEditLabel" data-cy="CategoriaCreateUpdateHeading">
            Crear o editar Categoria
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew && <ValidatedField name="id" required readOnly id="categoria-id" label="ID" validate={{ required: true }} />}
              <ValidatedField
                label="Nombre"
                id="categoria-nombre"
                name="nombre"
                data-cy="nombre"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  maxLength: { value: 100, message: 'Este campo no puede superar más de 100 caracteres.' },
                }}
              />
              <ValidatedField label="Modalidad" id="categoria-modalidad" name="modalidad" data-cy="modalidad" type="select">
                {modalidadDeporteValues.map(modalidadDeporte => (
                  <option value={modalidadDeporte} key={modalidadDeporte}>
                    {modalidadDeporte}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label="Descripcion" id="categoria-descripcion" name="descripcion" data-cy="descripcion" type="textarea" />
              <ValidatedField
                label="Fecha Creacion"
                id="categoria-fechaCreacion"
                name="fechaCreacion"
                data-cy="fechaCreacion"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label="Fecha Actualizacion"
                id="categoria-fechaActualizacion"
                name="fechaActualizacion"
                data-cy="fechaActualizacion"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField label="Estado" id="categoria-estado" name="estado" data-cy="estado" type="select">
                {estadoGeneralValues.map(estadoGeneral => (
                  <option value={estadoGeneral} key={estadoGeneral}>
                    {estadoGeneral}
                  </option>
                ))}
              </ValidatedField>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/categoria" replace variant="info">
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

export default CategoriaUpdate;
