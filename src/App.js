import React from 'react';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: '16px',
        textAlign: 'center'
      }}>
        🔥 GloireMedia Live 🔥
      </h1>
      
      <p style={{
        fontSize: '1.25rem',
        color: '#D1D5DB',
        marginBottom: '32px',
        textAlign: 'center'
      }}>
        Pastor Chris Live 24/7
      </p>

      <div style={{
        width: '100%',
        maxWidth: '900px',
        aspectRatio: '16/9',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '2px solid #FFD700',
        boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
      }}>
        <iframe
          style={{ width: '100%', height: '100%' }}
          src="https://www.youtube.com/embed/qMdwV7p_4dk?autoplay=1&mute=1&loop=1&playlist=qMdwV7p_4dk"
          title="Pastor Chris Teaching"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen>
        </iframe>
      </div>

      <p style={{
        marginTop: '32px',
        fontSize: '14px',
        color: '#6B7280'
      }}>
        GloireMedia Live © 2026 - Pour la Gloire de Jésus-Christ
      </p>

    </div>
  );
}

export default App;
