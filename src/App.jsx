import React, { useState, useEffect, useRef } from "react";

const CLOUD_NAME = "dvoya2e3d";
const UPLOAD_PRESET = "gloire";
const AGORA_APP_ID = "2545bd5748264eab8f3963df87c3d32d";

function App() {
  const [medias, setMedias] = useState([]);
  const [reactions, setReactions] = useState(
    JSON.parse(localStorage.getItem('gloiremedia_reactions')) || {}
  );
  const [inCall, setInCall] = useState(false);
  const [callType, setCallType] = useState(null);
  const videoRefs = useRef({});
  const agoraClient = useRef(null);
  const localTracks = useRef([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('gloiremedia_videos')) || [];
    setMedias(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('gloiremedia_videos', JSON.stringify(medias));
    localStorage.setItem('gloiremedia_reactions', JSON.stringify(reactions));
  }, [medias, reactions]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const video = entry.target;
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        });
      },
      { threshold: 0.7 }
    );
    Object.values(videoRefs.current).forEach(video => {
      if (video) observer.observe(video);
    });
    return () => observer.disconnect();
  }, [medias]);

  const openUploadWidget = () => {
    if (!window.cloudinary) {
      alert("Recharge la page");
      return;
    }
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET,
        sources: ['local', 'camera'],
        multiple: false,
        resourceType: 'video',
        clientAllowedFormats: ['mp4', 'mov'],
        maxFileSize: 100000
      },
      (error, result) => {
        if (!error && result?.event === "success") {
          const newVideo = {
            id: "video_" + Date.now(),
            type: "video",
            url: result.info.secure_url,
            title: result.info.original_filename || "Nouvelle vidéo",
            desc: "Gloire à Dieu 🙏"
          };
          setMedias(prev => [newVideo,...prev]);
        }
      }
    );
    widget.open();
  };

  const startCall = async (type, channelName = "gloiremedia_room") => {
    if (!window.AgoraRTC) {
      alert("Agora pas chargé, recharge la page");
      return;
    }
    agoraClient.current = window.AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    setCallType(type);
    setInCall(true);

    await agoraClient.current.join(AGORA_APP_ID, channelName, null, null);

    if (type === 'audio') {
      localTracks.current = [await window.AgoraRTC.createMicrophoneAudioTrack()];
    } else {
      localTracks.current = await window.AgoraRTC.createMicrophoneAndCameraTracks();
    }

    await agoraClient.current.publish(localTracks.current);
    if (type!== 'audio') {
      localTracks.current[1].play("local-video");
    }

    agoraClient.current.on("user-published", async (user, mediaType) => {
      await agoraClient.current.subscribe(user, mediaType);
      if (mediaType === "video") {
        const player = document.getElementById("remote-video");
        if (player) user.videoTrack.play(player);
      }
      if (mediaType === "audio") {
        user.audioTrack.play();
      }
    });

    agoraClient.current.on("user-left", () => {
      alert("L'autre personne a quitté l'appel");
      leaveCall();
    });
  };

  const leaveCall = async () => {
    localTracks.current.forEach(track => track.close());
    if (agoraClient.current) await agoraClient.current.leave();
    setInCall(false);
    setCallType(null);
  };

  const handleReact = (videoId, type) => {
    setReactions(prev => {
      const newReactions = {...prev };
      if (!newReactions[videoId]) newReactions[videoId] = {};
      newReactions[videoId][type] = (newReactions[videoId][type] || 0) + 1;
      return newReactions;
    });
    showMsg(type);
  };

  const handleShare = async (video) => {
    const shareData = {
      title: video.title,
      text: video.desc + " - Regarde ça sur GloireMedia 🙏",
      url: video.url
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(video.url);
        showMsg('copied');
      }
    } catch (err) {}
  };

  const downloadMedia = (url, filename) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.target = '_blank';
    a.click();
  };

  const showMsg = (type) => {
    const messages = {
      like: "Gloire à Dieu! ❤️",
      amen: "Amen! 🙏",
      heureux: "Que la joie te remplisse! 😄",
      feu: "L'Esprit Saint agit! 🔥",
      copied: "Lien copié! 📤"
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
        {medias.length === 0 &&!inCall && (
          <div className="empty-state">
            <h2>Aucune vidéo encore</h2>
            <p>Clique sur "Uploader" pour commencer</p>
          </div>
        )}

        {medias.map((media) => (
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
                <button className="action-btn" onClick={() => handleShare(media)}>
                  📤<span>Share</span>
                </button>
                <button className="action-btn" onClick={() => downloadMedia(media.url, media.title + '.mp4')}>
                  ⬇️<span>Save</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {!inCall && (
          <>
            <div className="global-actions">
              <button className="gbtn" onClick={() => startCall('video')}>📹 Appel Vidéo</button>
              <button className="gbtn" onClick={() => startCall('audio')}>📞 Appel Audio</button>
              <button className="gbtn live" onClick={() => startCall('live', 'live_gloiremedia')}>🔴 Live</button>
              <button className="gbtn" onClick={openUploadWidget}>+ Uploader</button>
            </div>

            <a
              href="https://chat.whatsapp.com/EN3APfiNoUWCF0nw75G58i"
              className="join-btn"
              target="_blank"
              rel="noreferrer"
            >
              🙏 Groupe de Prière
            </a>
          </>
        )}

        {inCall && (
          <div className="call-overlay">
            <div id="remote-video" className="remote-video">
              {callType === 'live' && <div className="live-badge">🔴 LIVE</div>}
            </div>
            <div id="local-video" className="local-video"></div>
            <button className="end-call" onClick={leaveCall}>❌ Quitter</button>
          </div>
        )}
      </div>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #000; color: white; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; overflow: hidden; }
       .feed { height: 100vh; overflow-y: scroll; scroll-snap-type: y mandatory; -webkit-overflow-scrolling: touch; }
       .video-section { height: 100vh; width: 100vw; scroll-snap-align: start; position: relative; display: flex; align-items: center; justify-content: center; background: #000; }
       .video-player { height: 100%; width: 100%; object-fit: cover; }
       .overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; padding-bottom: 120px; background: linear-gradient(transparent, rgba(0,0,0,0.8)); display: flex; justify-content: space-between; align-items: flex-end; }
       .info { flex: 1; padding-right: 20px; }
       .info h3 { font-size: 16px; font-weight: 600; margin-bottom: 6px; }
       .title { font-size: 18px; font-weight: bold; margin-bottom: 4px; }
       .desc { font-size: 14px; opacity: 0.9; }
       .actions { display: flex; flex-direction: column; gap: 18px; align-items: center; }
       .action-btn { background: rgba(255,255,255,0.15); border: none; width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-direction: column; color: white; cursor: pointer; backdrop-filter: blur(10px); }
       .action-btn:active { transform: scale(0.9); background: rgba(76,175,80,0.8); }
       .action-btn span { font-size: 11px; margin-top: 2px; font-weight: bold; }
       .global-actions { position: fixed; top: 20px; right: 20px; display: flex; flex-direction: column; gap: 10px; z-index: 100; }
       .gbtn { background: #2196F3; color: white; padding: 12px 18px; border: none; border-radius: 25px; font-weight: bold; cursor: pointer; }
       .gbtn.live { background: #f44336; }
       .join-btn { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: #25D366; color: white; padding: 14px 28px; border-radius: 30px; text-decoration: none; font-weight: bold; z-index: 100; }
       .empty-state { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px; }
       .call-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #000; z-index: 999; }
       .remote-video { width: 100%; height: 100%; background: #111; }
       .local-video { position: absolute; top: 20px; right: 20px; width: 120px; height: 160px; border-radius: 12px; overflow: hidden; background: #333; }
       .live-badge { position: absolute; top: 20px; left: 20px; background: #f44336; padding: 6px 12px; border-radius: 15px; font-weight: bold; }
       .end-call { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); background: #f44336; color: white; padding: 14px 30px; border: none; border-radius: 30px; font-size: 16px; font-weight: bold; }
       .happy-msg { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #4CAF50; color: white; padding: 15px 25px; border-radius: 25px; font-weight: bold; z-index: 9999; animation: popUp 0.3s ease; pointer-events: none; }
        @keyframes popUp { from {opacity: 0; transform: translate(-50%, -50%) scale(0.8);} to {opacity: 1; transform: translate(-50%, -50%) scale(1);} }
      `}</style>
    </>
  );
}

export default App;
