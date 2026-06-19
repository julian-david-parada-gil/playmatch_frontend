import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { JhiItemCount, JhiPagination, getPaginationState } from 'react-jhipster';
import { Link, useLocation, useNavigate } from 'react-router';

import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';

import { getEntities } from './tabla-posicion.reducer';

export const TablaPosicion = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const tablaPosicionList = useAppSelector(state => state.tablaPosicion.entities);
  const loading = useAppSelector(state => state.tablaPosicion.loading);
  const totalItems = useAppSelector(state => state.tablaPosicion.totalItems);

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
      <h2 id="tabla-posicion-heading" data-cy="TablaPosicionHeading">
        Tabla Posicions
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refrescar lista
          </Button>
          <Link to="/tabla-posicion/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Crear nuevo Tabla Posicion
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {tablaPosicionList?.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('puntos')}>
                  Puntos <FontAwesomeIcon icon={getSortIconByFieldName('puntos')} />
                </th>
                <th className="hand" onClick={sort('partidosJugados')}>
                  Partidos Jugados <FontAwesomeIcon icon={getSortIconByFieldName('partidosJugados')} />
                </th>
                <th className="hand" onClick={sort('partidosGanados')}>
                  Partidos Ganados <FontAwesomeIcon icon={getSortIconByFieldName('partidosGanados')} />
                </th>
                <th className="hand" onClick={sort('partidosEmpatados')}>
                  Partidos Empatados <FontAwesomeIcon icon={getSortIconByFieldName('partidosEmpatados')} />
                </th>
                <th className="hand" onClick={sort('partidosPerdidos')}>
                  Partidos Perdidos <FontAwesomeIcon icon={getSortIconByFieldName('partidosPerdidos')} />
                </th>
                <th className="hand" onClick={sort('golesFavor')}>
                  Goles Favor <FontAwesomeIcon icon={getSortIconByFieldName('golesFavor')} />
                </th>
                <th className="hand" onClick={sort('golesContra')}>
                  Goles Contra <FontAwesomeIcon icon={getSortIconByFieldName('golesContra')} />
                </th>
                <th className="hand" onClick={sort('diferenciaGoles')}>
                  Diferencia Goles <FontAwesomeIcon icon={getSortIconByFieldName('diferenciaGoles')} />
                </th>
                <th>
                  Grupo <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Torneo <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tablaPosicionList.map(tablaPosicion => (
                <tr key={`entity-${tablaPosicion.id}`} data-cy="entityTable">
                  <td>
                    <Button as={Link as any} to={`/tabla-posicion/${tablaPosicion.id}`} variant="link" size="sm">
                      {tablaPosicion.id}
                    </Button>
                  </td>
                  <td>{tablaPosicion.puntos}</td>
                  <td>{tablaPosicion.partidosJugados}</td>
                  <td>{tablaPosicion.partidosGanados}</td>
                  <td>{tablaPosicion.partidosEmpatados}</td>
                  <td>{tablaPosicion.partidosPerdidos}</td>
                  <td>{tablaPosicion.golesFavor}</td>
                  <td>{tablaPosicion.golesContra}</td>
                  <td>{tablaPosicion.diferenciaGoles}</td>
                  <td>{tablaPosicion.grupo ? <Link to={`/grupo/${tablaPosicion.grupo.id}`}>{tablaPosicion.grupo.nombre}</Link> : ''}</td>
                  <td>
                    {tablaPosicion.torneo ? <Link to={`/torneo/${tablaPosicion.torneo.id}`}>{tablaPosicion.torneo.nombre}</Link> : ''}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        as={Link as any}
                        to={`/tabla-posicion/${tablaPosicion.id}`}
                        variant="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Vista</span>
                      </Button>
                      <Button
                        as={Link as any}
                        to={`/tabla-posicion/${tablaPosicion.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        variant="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
                      </Button>
                      <Button
                        onClick={() =>
                          (globalThis.location.href = `/tabla-posicion/${tablaPosicion.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
          !loading && <div className="alert alert-warning">Ningún Tabla Posicions encontrado</div>
        )}
      </div>
      {totalItems ? (
        <div className={tablaPosicionList && tablaPosicionList.length > 0 ? '' : 'd-none'}>
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

export default TablaPosicion;
