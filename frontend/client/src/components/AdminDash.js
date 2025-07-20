import React from "react";
import Navbar3 from "./Navbar3";
import { Container, Card } from "react-bootstrap";

function AdminDash() {
  return (
    <div style={styles.background}>
      <Navbar3 />
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card style={styles.card} className="text-center shadow-lg">
          <Card.Body>
            <h1 className="mb-3" style={styles.heading}>🎉 Welcome, Admin! 🎉</h1>
            <p className="lead">Manage alumni registrations, events, and more.</p>
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
    background: "linear-gradient(to right, #ff7e5f, #feb47b)", 
    minHeight: "100vh",
    
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "10px"
  },
  heading: {
    color: "#d9534f",
    fontWeight: "bold"
  }
};

export default AdminDash;
