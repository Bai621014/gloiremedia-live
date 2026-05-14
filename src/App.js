import React, { useState } from "react";

const CLOUD_NAME = "dvoya2e3o";
const UPLOAD_PRESET = "gloiremedia"; // on le crée en 2 min

function App() {
  const [medias, setMedias] = useState([
    {
      type: "video",
      url: "https://res.cloudinary.com/dvoya2e3o/video/upload/v1778067776/Appuyez_..._360p_kigzk0.mp4",
      title: "RHAPATHON - JOUR 3"
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dvoya2e3o/image/upload/v1748067776/rhapathon-poster.jpg",
      title: "Affiche Officielle"
    }
  ]);

  const [selected, setSelected] = useState(medias[0]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const resourceType = file.type.startsWith("video")? "video" : "image";

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();

      const newMedia = {
        type: resourceType,
        url: data.secure_url,
        title: file.name.split(".")[0]
      };

      setMedias([newMedia,...medias]);
      setSelected(newMedia);
    } catch (err) {
      alert("Erreur upload : " + err.message);
    }
    setUploading(false);
  };

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", padding: "20px", color: "#fff" }}>
      <h1 style={{ color: "#FFD700", fontSize: "32px", textAlign: "center", marginBottom: "20px" }}>
        🔴 GLOIREMEDIA LIVE
      </h1>

      {/* Bouton Upload */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label style={{
          backgroundColor: "#FFD700",
          color: "#000",
          padding: "12px 24px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          display: "inline-block"
        }}>
          {uploading? "Upload en cours..." : "📤 Ajouter Photo/Vidéo"}
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleUpload}
            style={{ display: "none" }}
            disabled={uploading}
          />
        </label>
      </div>

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
