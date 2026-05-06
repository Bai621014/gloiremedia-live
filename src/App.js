import React from "react";

function App() {
  return (
    <div style={{
      backgroundColor: "#000",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <h1 style={{
        color: "#FFD700",
        fontSize: "32px",
        marginBottom: "20px",
        textAlign: "center"
      }}>
        🔴 RHAPATHON - JOUR 3
      </h1>
      
      <h2 style={{
        color: "#fff",
        fontSize: "18px",
        marginBottom: "20px",
        textAlign: "center"
      }}>
        Rediffusion - Pasteur Chris
      </h2>
      
      <video 
        width="100%" 
        style={{ maxWidth: "900px", borderRadius: "8px" }}
        controls 
        autoPlay
        playsInline
        src="https://res.cloudinary.com/dvoya2e3o/video/upload/v1778067776/Appuyez_..._360p_kigzk0.mp4"
      >
        Votre navigateur ne supporte pas la vidéo.
      </video>
      
      <p style={{
        color: "#FFD700",
        marginTop: "20px",
        textAlign: "center",
        fontSize: "18px"
      }}>
        GLOIREMEDIA - Le live reprend à la prochaine session
      </p>
    </div>
  );
}

export default App;
