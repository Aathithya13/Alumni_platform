import React from 'react';

import Navbar from './Navbar';

import { Container, Card} from "react-bootstrap";


const AluDashBoard = () => {
    

    return (
        <>
        <Navbar/>
        <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="text-center shadow-lg p-4">
        <Card.Body>
          <h1 className="mb-3">Welcome!</h1>
          <p className="lead">We're glad to have you back at the Alumni Association.</p>
        </Card.Body>
      </Card>
    </Container>
        </>
    );
};

export default AluDashBoard;
