import React, { useState, useEffect } from 'react';

function AudioPlayer(props) {
  const { audioData, volume } = props;
  const [audioSrc, setAudioSrc] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioData) {
      const audioBlob = new Blob([audioData], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioSrc(audioUrl);
    }
  }, [audioData]);

  return (
    <div>
      <audio src={audioSrc} controls={true} autoPlay={isPlaying} volume={volume} />
      <button onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}

export default AudioPlayer;