import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gloire-dark text-white flex flex-col items-center justify-center p-4">
      
      <h1 className="text-4xl md:text-6xl font-bold text-gloire-gold mb-4 text-center">
        🔥 GloireMedia Live 🔥
      </h1>
      
      <p className="text-xl text-gray-300 mb-8 text-center">
        Pastor Chris Live 24/7
      </p>

      <div className="w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-2xl shadow-gloire-gold/20 border-2 border-gloire-gold">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=1&loop=1&playlist=5qap5aO4i9A"
          title="Pastor Chris Teaching"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen>
        </iframe>
      </div>

      <p className="mt-8 text-sm text-gray-500">
        GloireMedia Live © 2026 - Pour la Gloire de Jésus-Christ
      </p>

    </div>
  );
}

export default App;
