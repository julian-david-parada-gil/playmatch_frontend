import './footer.scss';

import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Footer = () => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <br />
        <p>© 2026 Playmatch. Todos los derechos reservados.</p>
        <br />
        <span className="text-muted"></span>
      </Col>
    </Row>
  </div>
);

export default Footer;
