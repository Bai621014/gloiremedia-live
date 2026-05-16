import { useState, useEffect, useRef } from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedVideo } from '@cloudinary/react'

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dvoya2e3o'
  }
})

function App() {
  const [videos, setVideos] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const savedVideos = localStorage.getItem('gloiremedia_videos')
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('gloiremedia_videos', JSON.stringify(videos))
  }, [videos])

  const handleUpload = () => {
    if (!window.cloudinary) {
      alert("Le widget Cloudinary ne charge pas. Vérifie index.html")
      return
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dvoya2e3o',
        uploadPreset: 'gloiremedia',
        sources: ['local', 'camera'],
        multiple: false,
        resourceType: 'video',
        clientAllowedFormats: ['mp4', 'mov', 'avi'],
        maxFileSize: 100000,
        theme: 'minimal',
        language: 'fr'
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          const newVideo = {
            id: Date.now(),
            publicId: result.info.public_id,
            url: result.info.secure_url
          }
          setVideos(prev => [newVideo,...prev])
        }
        if (error) {
          console.error('Upload error:', error)
          alert('Erreur upload : ' + error.message)
        }
      }
    )
    widget.open()
  }

  const downloadVideo = (url) => {
    const downloadUrl = url.replace('/upload/', '/upload/fl_attachment/')
    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = `gloiremedia-${Date.now()}.mp4`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleScroll = (e) => {
    const index = Math.round(e.target.scrollTop / e.target.clientHeight)
    setCurrentIndex(index)
  }

  return (
    <div className="app">
      <div className="header">
        <button onClick={handleUpload} className="btn-upload">+ Uploader</button>
        <button className="btn-call" disabled>Appel Vidéo</button>
        <button className="btn-call" disabled>Appel Audio</button>
        <button className="btn-live" disabled>Live</button>
      </div>

      {videos.length === 0? (
        <div className="empty-state">
          <h2>Aucune vidéo encore</h2>
          <p>Clique sur "Uploader" pour commencer</p>
        </div>
      ) : (
        <div className="video-feed" onScroll={handleScroll}>
          {videos.map((video, index) => (
            <div key={video.id} className="video-item">
              <AdvancedVideo
                cldVid={cld.video(video.publicId)}
                controls
                autoPlay={index === currentIndex}
                muted={index!== currentIndex}
                loop
                playsInline
                className="video-player"
              />
              <button
                onClick={() => downloadVideo(video.url)}
                className="btn-download"
              >
                Télécharger
              </button>
            </div>
          ))}
        </div>
      )}

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body, html, #root {
          height: 100%;
          background: #000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow: hidden;
        }
       .app {
          height: 100vh;
          background: #000;
          color: #fff;
          overflow: hidden;
        }
       .header {
          position: fixed;
          top: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 10;
        }
        button {
          padding: 12px 20px;
          border: none;
          border-radius: 25px;
          font-weight: bold;
          cursor: pointer;
          font-size: 14px;
        }
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
       .btn-upload,.btn-call {
          background: #0095f6;
          color: #fff;
        }
       .btn-live {
          background: #ff3040;
          color: #fff;
        }
       .btn-download {
          position: absolute;
          bottom: 80px;
          right: 20px;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          color: #fff;
          z-index: 5;
        }
       .video-feed {
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          -webkit-overflow-scrolling: touch;
        }
       .video-item {
          height: 100vh;
          scroll-snap-align: start;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
       .video-player {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
       .empty-state {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
        }
       .empty-state h2 {
          font-size: 24px;
          margin-bottom: 10px;
        }
       .empty-state p {
          color: #888;
        }
      `}</style>
    </div>
  )
}

export default App
