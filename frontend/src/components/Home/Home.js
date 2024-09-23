import React, { useState,useEffect } from 'react';
import VoiceRecorder from '../VoiceRecorder/VoiceRecorder';
import './home.css';
import images from './r.png'
import Typewriter from 'typewriter-effect';
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
  useEffect(()=>{
    const getdata= async()=>{
      try {
        const response=await fetch('http://localhost:3000/me');
        console.log(response);
      } catch (error) {
        console.log('Data not fetch');
      }
    }
    getdata()
  },[])


  return (
    <>
    <div className='my-3'>
      <i><h2 style={{textAlign:"center",color:"blue"}}><Typewriter
        options={{
            strings: ['Hello Prathamesh !!'],
            autoStart: true,
            cursor:'',
            loop: true,
        }}
/></h2></i>
    </div>
    <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div className='recorder-container mx-3' >
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
                        height:'320px',
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
      <div className='image-container' style={{textAlign:"center"}}>
        <img 
          src={images} 
          alt="Descriptive Alt Text" 
          className='image' 
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
        />
      </div>
    </div>
    </>
  );
}
