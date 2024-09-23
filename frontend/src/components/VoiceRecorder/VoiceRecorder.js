import React, { useState } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import './VoiceRecorder.css';

export default function VoiceRecorder() {
    const recorderControls = useAudioRecorder();
    const [audioUrl, setAudioUrl] = useState('');
    const [transcript,settranscript]=useState('');

    const submitAudio = async (blob) => {
        const form = new FormData();
        form.append('audio', blob, 'recording.mp3');

        try {
            const response = await fetch('http://localhost:5000/transcribe', {
                method: 'POST',
                body: form,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Audio submitted successfully:', data.transcription);
                settranscript(data.transcript);
            } else {
                console.error('Audio Submission failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting audio:', error);
        }
    };

    return (
        <div className="voice-recorder">
            <AudioRecorder
                onRecordingComplete={(blob) => {
                    // addAudioElement(blob);
                    submitAudio(blob);
                }}
                recorderControls={recorderControls}
            />
            <button onClick={recorderControls.stopRecording} className='btn-voice my-3'>Stop Recording</button>
            {audioUrl && (
                <div>
                    <audio src={audioUrl} controls className='audio-container' />
                </div>
            )}
        </div>
    );
}
