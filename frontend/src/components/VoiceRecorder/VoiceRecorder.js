

import React, { useState,useEffect } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import './VoiceRecorder.css';

export default function VoiceRecorder({ setTranscript }) {
    const recorderControls = useAudioRecorder();
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(()=>{
        console.log('successfully updated');
    },[selectedFile])
    const submitAudio = async (blob) => {
        const formData = new FormData();
        formData.append('audio', blob, 'recording.mp3');

        try {
            const response = await fetch('http://localhost:5000/transcribe', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const data = await response.json();
            console.log('Audio submitted successfully:', data.transcription);
            setTranscript(data.transcription);
        } catch (error) {
            console.error('Error submitting audio:', error);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'audio/mpeg') {
            setSelectedFile(file);
            console.log('MP3 file selected:', file.name);
        } else {
            alert('Please upload a valid MP3 file.');
        }
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            alert('Please select an MP3 file first.');
            return;
        }

        const formData = new FormData();
        formData.append('audio', selectedFile);

        try {
            const response = await fetch('http://localhost:5000/transcribe', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const data = await response.json();
            console.log('MP3 file uploaded successfully:', data.transcription);
            setTranscript(data.transcription);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    const stopAnimation=()=>{
        setTranscript([]);
    };
    return (
        <div className="voice-recorder">
            <AudioRecorder
                onRecordingComplete={submitAudio}
                recorderControls={recorderControls}
            />
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <button onClick={recorderControls.stopRecording} className='btn-voice my-3'>Stop Recording</button>
                <button onClick={stopAnimation} className='btn-voice my-3'>Stop Animation</button>
            </div>
            <div style={{borderBottom: '2px solid #000', width: '100%'}}></div>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <div className="my-3">
                    <input 
                        type="file" 
                        accept="audio/mpeg" 
                        onChange={handleFileChange} 
                        style={{ display: "none" }} 
                        id="audioUpload"
                    />
                    <label htmlFor="audioUpload" className="btn-home" style={{ marginTop: '10px' }}>
                        {selectedFile!==null?"Uploaded":"Upload Mp3"}
                    </label>
                </div>
                <div className='my-3'>
                    <button onClick={handleSubmit} className="btn-home" style={{ marginTop: '10px' }}>Submit Audio</button>
                </div>
            </div>
        </div>
    );
}

