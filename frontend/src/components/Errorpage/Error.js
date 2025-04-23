import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.homeLink}>Go back to Home</Link>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  title: {
    fontSize: '6rem',
    margin: 0,
    color: '#ff4757',
  },
  message: {
    fontSize: '1.5rem',
    margin: '20px 0',
  },
  homeLink: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#1e90ff',
    textDecoration: 'none',
    borderRadius: '5px',
  },
};

export default ErrorPage;
