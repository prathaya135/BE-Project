import React, { useState, useEffect } from 'react';
import Avatar from './Avatar';

function VideoComponent({ transcript }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [mp4Url, setMp4Url] = useState('');

  useEffect(() => {
    if (transcript && transcript.length > 0) {
      const currentWord = transcript[currentWordIndex];
      const url = `http://localhost:3000/videos/${currentWord}.mp4`;
      setMp4Url(url);
    }
  }, [transcript, currentWordIndex]);

  useEffect(() => {
    setCurrentWordIndex(0);
  }, [transcript]);

  const handleVideoEnd = () => {
    if (currentWordIndex < transcript.length - 1) {
      setCurrentWordIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div>
      {mp4Url ? (
        <video
          autoPlay
          width="640"
          height="560"
          key={mp4Url}
          onEnded={handleVideoEnd}  
        >
          <source src={mp4Url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Avatar />
      )}
    </div>
  );
}

export default VideoComponent;
