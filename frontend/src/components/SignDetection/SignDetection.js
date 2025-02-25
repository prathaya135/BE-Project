import React, { useEffect, useRef, useState } from 'react';
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import './SignLanguageDetection.css'

const hand_connection=[
  [4,3],[3,2],[2,1],[1,0],
  [0,5],[0,17],[5,9],[9,13],[13,17],
  [5,6],[6,7],[7,8],
  [9,10],[10,11],[11,12],
  [13,14],[14,15],[15,16],
  [17,18],[18,19],[19,20]
]

const categories = { 
  0: "0", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9",
  10: "a", 11: "b", 12: "c", 13: "d", 14: "e", 15: "f", 16: "g", 17: "h", 18: "i", 19: "j",
  20: "k", 21: "l", 22: "m", 23: "n", 24: "o", 25: "p", 26: "q", 27: "r", 28: "s", 29: "t",
  30: "u", 31: "v", 32: "w", 33: "x", 34: "y", 35: "z"
};

const HandDetection = () => {
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [handLandmarker, setHandLandmarker] = useState(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [predicted,setpredicted]=useState('');
  var count=0;

  // Initialize HandLandmarker
  const createHandLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
    );
    const landmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
        delegate: 'GPU',
      },
      runningMode: 'VIDEO', // Real-time mode
      numHands: 2, // Detect up to 2 hands
    });
    setHandLandmarker(landmarker);
    console.log('HandLandmarker is ready!');
  };

  const enableCam = async () => {
    if (!handLandmarker) {
      console.log('Wait for HandLandmarker to load before starting webcam!');
      return;
    }
    // setWebcamRunning(!webcamRunning);
    if (webcamRunning) {
      // If webcamRunning is true, we are disabling the webcam
      setWebcamRunning(false);
      // Stop the webcam stream when disabling
      const video = webcamRef.current;
      const stream = video.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop()); // Stop all tracks
      }
      video.srcObject = null; // Disable video feed
    } else {
      // If webcamRunning is false, we are enabling the webcam
      setWebcamRunning(true);
  
      const video = webcamRef.current;
      const constraints = { video: true };
  
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
  
        video.onloadeddata = () => {
          predictWebcam(); 
        };
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    }
  };

  // Perform hand landmark detection on webcam stream
  const predictWebcam = async () => {
    const video = webcamRef.current;
    const canvas = canvasRef.current;
    const canvasCtx = canvas?.getContext('2d');

    // Ensure the canvas size matches the video
    canvas.width = video?.videoWidth;
    canvas.height = video?.videoHeight;

    if (!canvas?.width || !canvas?.height) {
      console.warn('Invalid canvas size, waiting for video to load...');
      return;
    }

    const results = await handLandmarker.detectForVideo(video, performance.now());

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    if (results.landmarks && Array.isArray(results.landmarks)) {
      results.landmarks.forEach((landmarks) => {
        // Draw the landmarks (dots)

        hand_connection.forEach(([start, end]) => {
          const startX = landmarks[start].x * canvas.width;
          const startY = landmarks[start].y * canvas.height;
          const endX = landmarks[end].x * canvas.width;
          const endY = landmarks[end].y * canvas.height;
    
          canvasCtx.beginPath();
          canvasCtx.moveTo(startX, startY); 
          canvasCtx.lineTo(endX, endY); 
          canvasCtx.strokeStyle = '#FFFFFF'; 
          canvasCtx.lineWidth = 5; 
          canvasCtx.stroke();
        });
        landmarks.forEach(({ x, y }) => {
          canvasCtx.beginPath();
          canvasCtx.arc(x * canvas.width, y * canvas.height, 5, 0, 2 * Math.PI); 
          canvasCtx.fillStyle = '#FF0000'; 
          canvasCtx.fill();
        });
      });
      // console.log(results.landmarker)
      if(count===100){
        sendCanvasFrame();
        count=0;
      }
      count=count+1;
    } else {
      console.error("Landmarks data is not available or is not an array");
    }

    requestAnimationFrame(predictWebcam);
  };

  const sendCanvasFrame = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    // Convert canvas to Blob asynchronously
    const createBlob = () => {
      return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to create Blob from canvas"));
          }
        }, "image/png");
      });
    };
  
    try {
      while (true) {
        const blob = await createBlob(); // Wait for Blob creation
  
        const formData = new FormData();
        formData.append("frame", blob, "frame.png");
  
        // Send the frame to backend
        const response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          body: formData,
        });
  
        const data = await response.json();
        console.log("Response:", data);
  
        // Update predicted label
        const predictedClass = data.prediction;
        const predictedLabel = categories[predictedClass];
        setpredicted(predictedLabel);
        console.log("Predicted:", predictedLabel);
  
        // Introduce a slight delay (optional, adjust as needed)
        await new Promise((resolve) => setTimeout(resolve, 100)); 
      }
    } catch (error) {
      console.error("Error sending canvas frame:", error);
    }
  };
  
  

  useEffect(() => {
    createHandLandmarker();

    return () => {
      const video = webcamRef.current;
      if (video && video.srcObject) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        video.srcObject = null;
      }
    };
  }, []);

  useEffect(()=>{
    console.log("updated !!!");
  },[predicted])

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <button onClick={enableCam} className='btn_SignDetection'>
          {webcamRunning ? 'Disable Webcam' : 'Enable Webcam'}
        </button>
      </div>
      <div style={{fontWeight:'bolder',fontSize:'20px',marginBottom:'20px'}}>Here is What You Say : {predicted}</div>
      <div style={{ position: 'relative' }}>
        <video
          ref={webcamRef || null}
          style={{ width: '40%', height: '40%', backgroundColor:'#444444' }}
          autoPlay
          playsInline
        ></video>
        <canvas
          ref={canvasRef || null}
          style={{
            top: 0,
            left: 0,
            width: '40%',
            height: '40%',
            backgroundColor:'#444444'
          }}
        ></canvas>
      </div>
      <div style={{fontWeight:'bolder',fontSize:'20px',color:'red',marginTop:'20px'}}>Please close the Camera After Use</div>
    </div>
  );
};

export default HandDetection;
