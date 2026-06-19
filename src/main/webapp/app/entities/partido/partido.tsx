import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { JhiItemCount, JhiPagination, TextFormat, getPaginationState } from 'react-jhipster';
import { Link, useLocation, useNavigate } from 'react-router';

import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';

import { getEntities } from './partido.reducer';

export const Partido = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const partidoList = useAppSelector(state => state.partido.entities);
  const loading = useAppSelector(state => state.partido.loading);
  const totalItems = useAppSelector(state => state.partido.totalItems);

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
      <h2 id="partido-heading" data-cy="PartidoHeading">
        Partidos
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refrescar lista
          </Button>
          <Link to="/partido/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Crear nuevo Partido
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {partidoList?.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('fechaHora')}>
                  Fecha Hora <FontAwesomeIcon icon={getSortIconByFieldName('fechaHora')} />
                </th>
                <th className="hand" onClick={sort('lugar')}>
                  Lugar <FontAwesomeIcon icon={getSortIconByFieldName('lugar')} />
                </th>
                <th className="hand" onClick={sort('tiempoMinutos')}>
                  Tiempo Minutos <FontAwesomeIcon icon={getSortIconByFieldName('tiempoMinutos')} />
                </th>
                <th className="hand" onClick={sort('marcadorLocal')}>
                  Marcador Local <FontAwesomeIcon icon={getSortIconByFieldName('marcadorLocal')} />
                </th>
                <th className="hand" onClick={sort('marcadorVisitante')}>
                  Marcador Visitante <FontAwesomeIcon icon={getSortIconByFieldName('marcadorVisitante')} />
                </th>
                <th className="hand" onClick={sort('estado')}>
                  Estado <FontAwesomeIcon icon={getSortIconByFieldName('estado')} />
                </th>
                <th>
                  Equipolocal <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Equipovisitante <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Torneo <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {partidoList.map(partido => (
                <tr key={`entity-${partido.id}`} data-cy="entityTable">
                  <td>
                    <Button as={Link as any} to={`/partido/${partido.id}`} variant="link" size="sm">
                      {partido.id}
                    </Button>
                  </td>
                  <td>{partido.fechaHora ? <TextFormat type="date" value={partido.fechaHora} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{partido.lugar}</td>
                  <td>{partido.tiempoMinutos}</td>
                  <td>{partido.marcadorLocal}</td>
                  <td>{partido.marcadorVisitante}</td>
                  <td>{partido.estado}</td>
                  <td>{partido.equipolocal ? <Link to={`/grupo/${partido.equipolocal.id}`}>{partido.equipolocal.nombre}</Link> : ''}</td>
                  <td>
                    {partido.equipovisitante ? (
                      <Link to={`/grupo/${partido.equipovisitante.id}`}>{partido.equipovisitante.nombre}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{partido.torneo ? <Link to={`/torneo/${partido.torneo.id}`}>{partido.torneo.nombre}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button as={Link as any} to={`/partido/${partido.id}`} variant="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Vista</span>
                      </Button>
                      <Button
                        as={Link as any}
                        to={`/partido/${partido.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        variant="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
                      </Button>
                      <Button
                        onClick={() =>
                          (globalThis.location.href = `/partido/${partido.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
          !loading && <div className="alert alert-warning">Ningún Partidos encontrado</div>
        )}
      </div>
      {totalItems ? (
        <div className={partidoList && partidoList.length > 0 ? '' : 'd-none'}>
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

export default Partido;
