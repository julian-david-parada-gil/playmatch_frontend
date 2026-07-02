import './home.scss';

import React from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router';

import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <Row>
      {/* Columna izquierda: Logo */}
      <Col md="4" className="d-flex align-items-center justify-content-center">
        <img src="content/images/playmatch.png" alt="Logo PlayMatch" style={{ maxWidth: '100%', height: 'auto' }} />
      </Col>

      {/* Columna derecha: Título y texto */}
      <Col md="8">
        <h2>Bienvenido a PlayMatch</h2>

        <Alert variant="warning">
          <h4 className="alert-heading">Sobre PlayMatch</h4>
          <p>Somos una plataforma diseñada para la gestión integral de torneos deportivos en Colombia.</p>
          <hr />
          <p className="mb-0">
            <strong>Objetivo principal:</strong> Facilitamos la organización de partidos en disciplinas como fútbol en modalidades 8x8,
            11x11, microfutbol o fubol de salon 5x5, baloncesto 5x5, entre otras disciplinas.
          </p>
        </Alert>

        {account?.login ? (
          <div>
            <Alert variant="success">Está conectado como &quot;{account.login}&quot;.</Alert>
          </div>
        ) : (
          <div>
            <Alert variant="warning">
              Si desea
              <span>&nbsp;</span>
              <Link to="/login" className="alert-link">
                iniciar sesión
              </Link>
              , puede intentar con las cuentas predeterminadas:
              <br />- Administrador (usuario=&quot;admin&quot; y contraseña=&quot;admin&quot;)
              <br />- Usuario (usuario=&quot;user&quot; y contraseña=&quot;user&quot;).
              <br />- AdminGrupo (usuario=&quot;admingrupo&quot; y contraseña=&quot;admingrupo&quot;)
              <br />- Organizador (usuario=&quot;organizador&quot; y contraseña=&quot;organizador&quot;)
            </Alert>

            <Alert variant="warning">
              ¿Aún no tienes una cuenta?&nbsp;
              <Link to="/account/register" className="alert-link">
                Crea una cuenta
              </Link>
            </Alert>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default Home;
