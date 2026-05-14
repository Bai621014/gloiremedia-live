import React, { useState } from "react";

const CLOUD_NAME = "dvoya2e3o";
const UPLOAD_PRESET = "gloiremedia";

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
  const [showUpload, setShowUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
    setShowUpload(true);
  };

  const handleUpload = async () => {
    if (!file ||!title.trim()) {
      alert("Mets un titre et choisis un fichier Boss");
      return;
    }

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
        title: title.trim()
      };

      setMedias([newMedia,...medias]);
      setSelected(newMedia);
      setShowUpload(false);
      setTitle("");
      setFile(null);
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
        {!showUpload? (
          <label style={{
            backgroundColor: "#FFD700",
            color: "#000",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            display: "inline-block"
          }}>
            📤 Ajouter Photo/Vidéo
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />
          </label>
        ) : (
          <div style={{ maxWidth: "400px", margin: "0 auto", backgroundColor: "#111", padding: "15px", borderRadius: "8px" }}>
            <input
              type="text"
              placeholder="Titre de la vidéo/photo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "6px",
                border: "1px solid #333",
                backgroundColor: "#000",
                color: "#fff"
              }}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleUpload}
                disabled={uploading}
                style={{
                  flex: 1,
                  backgroundColor: "#FFD700",
                  color: "#000",
                  padding: "10px",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                {uploading? "Upload..." : "Confirmer"}
              </button>
              <button
                onClick={() => {setShowUpload(false); setFile(null); setTitle("");}}
                style={{
                  flex: 1,
                  backgroundColor: "#333",
                  color: "#fff",
                  padding: "10px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        )}
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
