
import React, { useState, useEffect } from 'react';
import VoiceRecorder from '../VoiceRecorder/VoiceRecorder';
import './home.css';
import Typewriter from 'typewriter-effect';
import Avatar from '../Avatar/Avatar';

export default function Home() {
  const [text, setText] = useState('');
  const [transcript, setTranscript] = useState('');
  
  const [userData,setUserData]=useState(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);

  const handleChange = (event) => {
      setText(event.target.value);
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Submitted Text:', text);
      setText(''); 
  };

  useEffect(() => {
    const getdata = async () => {
      try {
        const token=localStorage.getItem('token');
        const response = await fetch('http://localhost:3003/me',{
          method:'GET',
          headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json'
          }
        });

        if (!response) {
          throw new Error('Failed to fetch user data');
        }
        const data =await response.json();
        setUserData(data.data);
        setLoading(false);

      } catch (error) {
        console.log('Data not fetched');
        setLoading(false);
      }
    }
    getdata();
  }, []);

  useEffect(()=>{
    console.log('successfully updated');
  },[transcript])

  useEffect(()=>{
    console.log('successfully updated');
  },[userData]);
  
  return (
    <>
      <div className='my-3'>
        <i>
          <h2 style={{ textAlign: "center", color: "blue" }}>
            <Typewriter
              options={{
                strings: [`Hello ${userData?.name || 'Guest'} !!`],
                autoStart: true,
                cursor: '',
                loop: true,
              }}
            />
          </h2>
        </i>
      </div>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div className='recorder-container mx-3'>
          <div>
            <VoiceRecorder setTranscript={setTranscript} />
          </div>
          <div className='voice-recorder my-3'>
            <form onSubmit={handleSubmit}>
              <textarea
                id='textarea'
                value={transcript}  
                onChange={handleChange}
                rows='5' 
                cols='30'
                style={{
                  width: '100%',
                  height: '320px',
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
        <div className='image-container' style={{ textAlign: "center" }}>
          <Avatar />
        </div>
      </div>
    </>
  );
}

