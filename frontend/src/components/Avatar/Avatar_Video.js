import React, { useState, useEffect } from 'react';

function VideoComponent({ transcript }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [mp4Url, setMp4Url] = useState('');

  useEffect(() => {
    if (transcript && transcript.length > 0) {
      const currentWord = transcript[currentWordIndex];
      const url = `http://localhost:3001/videos/${currentWord}.mp4`;
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
      <h4 style={{color: "rgba(255, 255, 255, 0.6)"}}>Avatar Performing the Sign Language:</h4>
      {mp4Url ? (
        <video
          autoPlay
          width="640"
          height="500"
          key={mp4Url}
          onEnded={handleVideoEnd}  
          style={{alignContent:"center"}}
        >
          <source src={mp4Url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <video
          autoPlay
          width="640"
          height="500"
          key={mp4Url}
          onEnded={handleVideoEnd}  
          style={{alignContent:"center"}}
        >
          <source src={"http://localhost:3001/videos/Hello.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}

export default VideoComponent;
