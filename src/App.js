import React, { useState } from "react";

function App() {
  const [medias] = useState([
    {
      type: "video",
      url: "https://res.cloudinary.com/dvoya2e3o/video/upload/v1778067776/Appuyez_..._360p_kigzk0.mp4",
      title: "RHAPATHON - JOUR 3"
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dvoya2e3o/image/upload/v1748067776/rhapathon-poster.jpg",
      title: "Affiche Officielle"
    },
    {
      type: "video",
      url: "https://res.cloudinary.com/dvoya2e3o/video/upload/v1778067776/sample_video_1.mp4",
      title: "Message Dimanche"
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dvoya2e3o/image/upload/v1748067776/sample_image_1.jpg",
      title: "Photos Culte"
    },
    {
      type: "video",
      url: "https://res.cloudinary.com/dvoya2e3o/video/upload/v1778067776/sample_video_2.mp4",
      title: "Louange Live"
    }
  ]);

  const [selected, setSelected] = useState(medias[0]);

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", padding: "20px", color: "#fff" }}>
      <h1 style={{ color: "#FFD700", fontSize: "32px", textAlign: "center", marginBottom: "20px" }}>
        🔴 GLOIREMEDIA LIVE
      </h1>

      {/* Lecteur principal */}
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {selected.type === "video"? (
          <video
            src={selected.url}
            controls
            autoPlay
            playsInline
            style={{ width: "100%", borderRadius: "8px", border: "2px solid #FFD700" }}
          />
        ) : (
          <img
            src={selected.url}
            alt={selected.title}
            style={{ width: "100%", borderRadius: "8px", border: "2px solid #FFD700" }}
          />
        )}
        <h2 style={{ color: "#fff", textAlign: "center", marginTop: "15px" }}>{selected.title}</h2>
      </div>

      {/* Liste des médias */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginTop: "30px" }}>
        {medias.map((media, index) => (
          <div
            key={index}
            onClick={() => setSelected(media)}
            style={{
              cursor: "pointer",
              border: selected.url === media.url? "2px solid #FFD700" : "1px solid #333",
              borderRadius: "6px",
              padding: "8px 12px",
              backgroundColor: "#111",
              minWidth: "120px",
              textAlign: "center"
            }}
          >
            <p style={{ fontSize: "14px", color: "#FFD700", margin: 0 }}>{media.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
