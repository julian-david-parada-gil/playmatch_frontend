import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { JhiItemCount, JhiPagination, TextFormat, byteSize, getPaginationState, openFile } from 'react-jhipster';
import { Link, useLocation, useNavigate } from 'react-router';

import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';

import { getEntities } from './torneo.reducer';

export const Torneo = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const torneoList = useAppSelector(state => state.torneo.entities);
  const loading = useAppSelector(state => state.torneo.loading);
  const totalItems = useAppSelector(state => state.torneo.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const { order } = paginationState;
    if (sortFieldName !== fieldName) {
      return faSort;
    }
    return order === ASC ? faSortUp : faSortDown;
  };

  return (
    <div>
      <h2 id="torneo-heading" data-cy="TorneoHeading">
        Torneos
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refrescar lista
          </Button>
          <Link to="/torneo/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Crear nuevo Torneo
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {torneoList?.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('nombre')}>
                  Nombre <FontAwesomeIcon icon={getSortIconByFieldName('nombre')} />
                </th>
                <th className="hand" onClick={sort('descripcion')}>
                  Descripcion <FontAwesomeIcon icon={getSortIconByFieldName('descripcion')} />
                </th>
                <th className="hand" onClick={sort('fechaInicio')}>
                  Fecha Inicio <FontAwesomeIcon icon={getSortIconByFieldName('fechaInicio')} />
                </th>
                <th className="hand" onClick={sort('fechaFin')}>
                  Fecha Fin <FontAwesomeIcon icon={getSortIconByFieldName('fechaFin')} />
                </th>
                <th className="hand" onClick={sort('horaInicio')}>
                  Hora Inicio <FontAwesomeIcon icon={getSortIconByFieldName('horaInicio')} />
                </th>
                <th className="hand" onClick={sort('ubicacion')}>
                  Ubicacion <FontAwesomeIcon icon={getSortIconByFieldName('ubicacion')} />
                </th>
                <th className="hand" onClick={sort('reglamento')}>
                  Reglamento <FontAwesomeIcon icon={getSortIconByFieldName('reglamento')} />
                </th>
                <th className="hand" onClick={sort('cupoMaximoEquipos')}>
                  Cupo Maximo Equipos <FontAwesomeIcon icon={getSortIconByFieldName('cupoMaximoEquipos')} />
                </th>
                <th className="hand" onClick={sort('cupoMaximoJugadores')}>
                  Cupo Maximo Jugadores <FontAwesomeIcon icon={getSortIconByFieldName('cupoMaximoJugadores')} />
                </th>
                <th className="hand" onClick={sort('estado')}>
                  Estado <FontAwesomeIcon icon={getSortIconByFieldName('estado')} />
                </th>
                <th>
                  Categoria <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {torneoList.map(torneo => (
                <tr key={`entity-${torneo.id}`} data-cy="entityTable">
                  <td>
                    <Button as={Link as any} to={`/torneo/${torneo.id}`} variant="link" size="sm">
                      {torneo.id}
                    </Button>
                  </td>
                  <td>{torneo.nombre}</td>
                  <td>{torneo.descripcion}</td>
                  <td>
                    {torneo.fechaInicio ? <TextFormat type="date" value={torneo.fechaInicio} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{torneo.fechaFin ? <TextFormat type="date" value={torneo.fechaFin} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{torneo.horaInicio ? <TextFormat type="date" value={torneo.horaInicio} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{torneo.ubicacion}</td>
                  <td>
                    {torneo.reglamento ? (
                      <div>
                        {torneo.reglamentoContentType ? (
                          <a onClick={openFile(torneo.reglamentoContentType, torneo.reglamento)}>Abrir &nbsp;</a>
                        ) : null}
                        <span>
                          {torneo.reglamentoContentType}, {byteSize(torneo.reglamento)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{torneo.cupoMaximoEquipos}</td>
                  <td>{torneo.cupoMaximoJugadores}</td>
                  <td>{torneo.estado}</td>
                  <td>{torneo.categoria ? <Link to={`/categoria/${torneo.categoria.id}`}>{torneo.categoria.nombre}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button as={Link as any} to={`/torneo/${torneo.id}`} variant="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Vista</span>
                      </Button>
                      <Button
                        as={Link as any}
                        to={`/torneo/${torneo.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        variant="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
                      </Button>
                      <Button
                        onClick={() =>
                          (globalThis.location.href = `/torneo/${torneo.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
                        }
                        variant="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Eliminar</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">Ningún Torneos encontrado</div>
        )}
      </div>
      {totalItems ? (
        <div className={torneoList && torneoList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Torneo;
