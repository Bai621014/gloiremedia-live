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
        marginBottom: "15px",
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
        PASTEUR CHRIS - ÉDITION MAI 2026
      </h2>
      
      <video 
        width="100%" 
        style={{ maxWidth: "900px", borderRadius: "8px", border: "2px solid #FFD700" }}
        controls 
        autoPlay
        playsInline
        poster="https://res.cloudinary.com/dvoya2e3o/image/upload/v1748067776/rhapathon-poster.jpg"
        src="https://res.cloudinary.com/dvoya2e3o/video/upload/v1778067776/Appuyez_..._360p_kigzk0.mp4"
      >
        Votre navigateur ne supporte pas la vidéo.
      </video>
      
      <p style={{
        color: "#FFD700",
        marginTop: "20px",
        textAlign: "center",
        fontSize: "16px"
      }}>
        GLOIREMEDIA - Rediffusion du message du jour
      </p>
      <p style={{
        color: "#aaa",
        marginTop: "10px",
        textAlign: "center",
        fontSize: "14px"
      }}>
        Le live reprendra à la prochaine session
      </p>
    </div>
  );
}

export default App;
