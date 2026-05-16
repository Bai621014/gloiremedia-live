import React, { useState, useEffect, useRef } from "react";

const CLOUD_NAME = "dvoya2e3d";
const UPLOAD_PRESET = "gloire";

function App() {
  const [medias, setMedias] = useState([
    {
      id: "video_1",
      type: "video",
      url: "https://res.cloudinary.com/dvoya2e3d/video/upload/sample1.mp4",
      title: "RHAPATHON - JOUR 1",
      desc: "Que Dieu te bénisse aujourd'hui 🙏"
    },
    {
      id: "video_2",
      type: "video",
      url: "https://res.cloudinary.com/dvoya2e3d/video/upload/sample2.mp4",
      title: "Message d'espoir",
      desc: "Ne perds pas courage, Jésus agit 🔥"
    }
  ]);

  const [reactions, setReactions] = useState(
    JSON.parse(localStorage.getItem('gloiremedia_reactions')) || {}
  );

  const videoRefs = useRef({});

  // Sauvegarder les réactions dans localStorage
  useEffect(() => {
    localStorage.setItem('gloiremedia_reactions', JSON.stringify(reactions));
  }, [reactions]);

  // Autoplay + pause quand on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.7 }
    );

    Object.values(videoRefs.current).forEach(video => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [medias]);

  // Système de réactions 100% positives
  const handleReact = (videoId, type) => {
    setReactions(prev => {
      const newReactions = {...prev };
      if (!newReactions[videoId]) newReactions[videoId] = {};
      if (!newReactions[videoId][type]) newReactions[videoId][type] = 0;
      newReactions[videoId][type] += 1;
      return newReactions;
    });
    showHappyMessage(type);
  };

  const showHappyMessage = (type) => {
    const messages = {
      like: "Gloire à Dieu! ❤️",
      amen: "Amen! 🙏",
      heureux: "Que la joie te remplisse! 😄",
      feu: "L'Esprit Saint agit! 🔥"
    };

    const div = document.createElement('div');
    div.className = 'happy-msg';
    div.innerText = messages[type];
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 1500);
  };

  return (
    <>
      <div className="feed">
        {medias.filter(m => m.type === "video").map((media) => (
          <div className="video-section" key={media.id}>
            <video
              ref={el => videoRefs.current[media.id] = el}
              src={media.url}
              muted
              loop
              playsInline
              className="video-player"
            />
            <div className="overlay">
              <div className="info">
                <h3>@gloiremedia</h3>
                <p className="title">{media.title}</p>
                <p className="desc">{media.desc}</p>
              </div>
              <div className="actions">
                <button className="action-btn" onClick={() => handleReact(media.id, 'like')}>
                  ❤️<span>{reactions[media.id]?.like || 0}</span>
                </button>
                <button className="action-btn" onClick={() => handleReact(media.id, 'amen')}>
                  🙏<span>{reactions[media.id]?.amen || 0}</span>
                </button>
                <button className="action-btn" onClick={() => handleReact(media.id, 'heureux')}>
                  😄<span>{reactions[media.id]?.heureux || 0}</span>
                </button>
                <button className="action-btn" onClick={() => handleReact(media.id, 'feu')}>
                  🔥<span>{reactions[media.id]?.feu || 0}</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        <a
          href="METS_TON_LIEN_WHATSAPP_ICI"
          className="join-btn"
          target="_blank"
          rel="noreferrer"
        >
          🙏 Rejoindre le Groupe de Prière
        </a>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          background: #000;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow: hidden;
        }
       .feed {
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          -webkit-overflow-scrolling: touch;
        }
       .video-section {
          height: 100vh;
          width: 100vw;
          scroll-snap-align: start;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
        }
       .video-player {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
       .overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          padding-bottom: 120px;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
       .info {
          flex: 1;
          padding-right: 20px;
        }
       .info h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 6px;
        }
       .info.title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 4px;
        }
       .info.desc {
          font-size: 14px;
          opacity: 0.9;
        }
       .actions {
          display: flex;
          flex-direction: column;
          gap: 18px;
          align-items: center;
        }
       .action-btn {
          background: rgba(255,255,255,0.15);
          border: none;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          color: white;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: 0.2s;
        }
       .action-btn:active {
          transform: scale(0.9);
          background: rgba(76,175,80,0.8);
        }
       .action-btn span {
          font-size: 12px;
          margin-top: 2px;
          font-weight: bold;
        }
       .join-btn {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: #25D366;
          color: white;
          padding: 14px 28px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: bold;
          z-index: 100;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }
       .happy-msg {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #4CAF50;
          color: white;
          padding: 15px 25px;
          border-radius: 25px;
          font-weight: bold;
          z-index: 9999;
          animation: popUp 0.3s ease;
          pointer-events: none;
        }
        @keyframes popUp {
          from {opacity: 0; transform: translate(-50%, -50%) scale(0.8);}
          to {opacity: 1; transform: translate(-50%, -50%) scale(1);}
        }
      `}</style>
    </>
  );
}

export default App;
