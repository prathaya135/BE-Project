import React from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import './VoiceRecorder.css'; 

export default function VoiceRecorder() {
    const recorderControls = useAudioRecorder();
    
    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        audio.classList.add('audio-container');
    };
    
    return (
      <div className="voice-recorder">
        <AudioRecorder 
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
        />
        <button onClick={recorderControls.stopRecording} className='btn-voice my-3'>Stop recording</button>
      </div>
    )
}
