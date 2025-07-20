import React from "react";
import { Container, Card } from "react-bootstrap";
import StudNavbar from './StudNavbar';


function StudDashBoard() {
  return (
    <div style={styles.background}>
      <StudNavbar/>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card style={styles.card} className="text-center shadow-lg">
          <Card.Body>
            <h1 className="mb-3" style={styles.heading}>🎓 Welcome, Student! 🎓</h1>
            <p className="lead">Explore alumni events, resources, and networking opportunities.</p>
            <p>Use the navigation bar to access different sections.</p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

// Custom styles
const styles = {
  background: {
    background: "linear-gradient(to right, #4facfe, #00f2fe)", // Blue gradient
    minHeight: "100vh",
    
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "10px"
  },
  heading: {
    color: "#007bff",
    fontWeight: "bold"
  }
};

export default StudDashBoard;
