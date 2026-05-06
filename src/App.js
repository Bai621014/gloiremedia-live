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
        fontSize: "28px",
        marginBottom: "20px",
        textAlign: "center"
      }}>
        🔴 RHAPATHON LIVE - JOUR 3
      </h1>
      
      <iframe
        src="https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/share/v/18wdPUnqXf/&show_text=false&autoplay=true"
        width="100%"
        style={{ maxWidth: "800px", border: "none" }}
        height="450"
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
      
      <p style={{
        color: "#fff",
        marginTop: "20px",
        textAlign: "center"
      }}>
        GLOIREMEDIA - Édification en direct
      </p>
    </div>
  );
}

export default App;
