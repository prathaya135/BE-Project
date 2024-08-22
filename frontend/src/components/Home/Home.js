import React, { useState } from 'react';
import VoiceRecorder from '../VoiceRecorder/VoiceRecorder';
import './home.css';
import images from './t.jpeg'
export default function Home() {
  const [text, setText] = useState('');

  const handleChange = (event) => {
      setText(event.target.value);
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Submitted Text:', text);
      setText(''); 
  };

  return (
    <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div className='recorder-container mx-3'>
        <div>
          <VoiceRecorder />
        </div>
        <div className='voice-recorder my-3'>
            <form onSubmit={handleSubmit}>
                <textarea
                    id='textarea'
                    value={text}
                    onChange={handleChange}
                    rows='5' 
                    cols='30'
                    style={{
                        width: '100%',
                        height:'350px',
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        resize: 'vertical',
                    }}
                    placeholder='Enter the text here'
                />
                <button type='submit' className='btn-home' style={{ marginTop: '10px' }}>
                    Submit
                </button>
            </form>
        </div>
      </div>
      <div className='image-container'>
        <img 
          src={images} 
          alt="Descriptive Alt Text" 
          className='image' 
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
        />
      </div>
    </div>
  );
}
