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

import { getEntities } from './encuesta.reducer';

export const Encuesta = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const encuestaList = useAppSelector(state => state.encuesta.entities);
  const loading = useAppSelector(state => state.encuesta.loading);
  const totalItems = useAppSelector(state => state.encuesta.totalItems);

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
      <h2 id="encuesta-heading" data-cy="EncuestaHeading">
        Encuestas
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refrescar lista
          </Button>
          <Link to="/encuesta/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Crear nuevo Encuesta
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {encuestaList?.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('titulo')}>
                  Titulo <FontAwesomeIcon icon={getSortIconByFieldName('titulo')} />
                </th>
                <th className="hand" onClick={sort('opcion1')}>
                  Opcion 1 <FontAwesomeIcon icon={getSortIconByFieldName('opcion1')} />
                </th>
                <th className="hand" onClick={sort('opcion2')}>
                  Opcion 2 <FontAwesomeIcon icon={getSortIconByFieldName('opcion2')} />
                </th>
                <th className="hand" onClick={sort('opcion3')}>
                  Opcion 3 <FontAwesomeIcon icon={getSortIconByFieldName('opcion3')} />
                </th>
                <th className="hand" onClick={sort('opcion4')}>
                  Opcion 4 <FontAwesomeIcon icon={getSortIconByFieldName('opcion4')} />
                </th>
                <th className="hand" onClick={sort('votosOpcion1')}>
                  Votos Opcion 1 <FontAwesomeIcon icon={getSortIconByFieldName('votosOpcion1')} />
                </th>
                <th className="hand" onClick={sort('votosOpcion2')}>
                  Votos Opcion 2 <FontAwesomeIcon icon={getSortIconByFieldName('votosOpcion2')} />
                </th>
                <th className="hand" onClick={sort('votosOpcion3')}>
                  Votos Opcion 3 <FontAwesomeIcon icon={getSortIconByFieldName('votosOpcion3')} />
                </th>
                <th className="hand" onClick={sort('votosOpcion4')}>
                  Votos Opcion 4 <FontAwesomeIcon icon={getSortIconByFieldName('votosOpcion4')} />
                </th>
                <th className="hand" onClick={sort('fechaInicio')}>
                  Fecha Inicio <FontAwesomeIcon icon={getSortIconByFieldName('fechaInicio')} />
                </th>
                <th className="hand" onClick={sort('fechaFin')}>
                  Fecha Fin <FontAwesomeIcon icon={getSortIconByFieldName('fechaFin')} />
                </th>
                <th className="hand" onClick={sort('estado')}>
                  Estado <FontAwesomeIcon icon={getSortIconByFieldName('estado')} />
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
              {encuestaList.map(encuesta => (
                <tr key={`entity-${encuesta.id}`} data-cy="entityTable">
                  <td>
                    <Button as={Link as any} to={`/encuesta/${encuesta.id}`} variant="link" size="sm">
                      {encuesta.id}
                    </Button>
                  </td>
                  <td>{encuesta.titulo}</td>
                  <td>{encuesta.opcion1}</td>
                  <td>{encuesta.opcion2}</td>
                  <td>{encuesta.opcion3}</td>
                  <td>{encuesta.opcion4}</td>
                  <td>{encuesta.votosOpcion1}</td>
                  <td>{encuesta.votosOpcion2}</td>
                  <td>{encuesta.votosOpcion3}</td>
                  <td>{encuesta.votosOpcion4}</td>
                  <td>{encuesta.fechaInicio ? <TextFormat type="date" value={encuesta.fechaInicio} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{encuesta.fechaFin ? <TextFormat type="date" value={encuesta.fechaFin} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{encuesta.estado}</td>
                  <td>{encuesta.grupo ? <Link to={`/grupo/${encuesta.grupo.id}`}>{encuesta.grupo.nombre}</Link> : ''}</td>
                  <td>{encuesta.torneo ? <Link to={`/torneo/${encuesta.torneo.id}`}>{encuesta.torneo.nombre}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button as={Link as any} to={`/encuesta/${encuesta.id}`} variant="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Vista</span>
                      </Button>
                      <Button
                        as={Link as any}
                        to={`/encuesta/${encuesta.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        variant="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
                      </Button>
                      <Button
                        onClick={() =>
                          (globalThis.location.href = `/encuesta/${encuesta.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
          !loading && <div className="alert alert-warning">Ningún Encuestas encontrado</div>
        )}
      </div>
      {totalItems ? (
        <div className={encuestaList && encuestaList.length > 0 ? '' : 'd-none'}>
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

export default Encuesta;
