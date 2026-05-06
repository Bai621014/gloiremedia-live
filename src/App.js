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
        🔴 RHAPATHON LIVE - JOUR 3
      </h1>
      
      <h2 style={{
        color: "#fff",
        fontSize: "20px",
        marginBottom: "20px",
        textAlign: "center"
      }}>
        PASTEUR CHRIS EN DIRECT
      </h2>
      
      <iframe
        src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fv%2F18etFh3JYF%2F&show_text=false&autoplay=true&allowfullscreen=true"
        width="100%"
        style={{ maxWidth: "900px", border: "none", borderRadius: "8px" }}
        height="500"
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
      
      <p style={{
        color: "#FFD700",
        marginTop: "20px",
        textAlign: "center",
        fontSize: "18px"
      }}>
        GLOIREMEDIA - ÉDITION MAI 2026
      </p>
    </div>
  );
}

export default App;
