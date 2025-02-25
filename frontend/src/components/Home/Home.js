
import React, { useState, useEffect } from 'react';
import VoiceRecorder from '../VoiceRecorder/VoiceRecorder';
import './home.css';
import Avatar_Videos from '../Avatar/Avatar_Video';

export default function Home() {
  const [text, setText] = useState('');
  const [transcript, setTranscript] = useState([]);
  const [userData,setUserData]=useState(null);
  const handleChange = (event) => {
      setText(event.target.value);
  };

  const handleSubmit =async (event) => {
      event.preventDefault();
      console.log('Submitted Text:', text);
      // setTranscript(text)
      try {
        const response=await fetch('http://localhost:5000/textscribe',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
        },
          body:JSON.stringify({text}),
        })
        if (response.ok) {
          const data= await response.json();
          setTranscript(data.transcription)
        }
      } catch (error) {
        console.log('DATA NOT FETCHED')
      }
      setText(''); 
  };

  useEffect(() => {
    const getdata = async () => {
      try {
        const token=localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/me',{
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

      } catch (error) {
        console.log('Data not fetched');
      }
    }
    getdata();
  }, []);

  useEffect(()=>{
    console.log('successfully updated',transcript);
  },[transcript])

  useEffect(()=>{
    console.log('successfully updated');
  },[userData]);
  
  return (
    <>
      <div className='my-3'>
      </div>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div className='recorder-container mx-3'>
          <div>
            <VoiceRecorder setTranscript={setTranscript} />
          </div>
          <div className='voice-recorder my-3' style={{ color: 'green' }}>
            <p>
              {transcript.length !== 0 
                ? JSON.stringify(transcript).length > 50 
                  ? JSON.stringify(transcript).slice(0, 50) + "..." 
                  : JSON.stringify(transcript)
                : "No Text Transcribed"}
            </p>
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
                  height: 'auto',
                  maxHeight:'50px',
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
        <div className='image-container' style={{ textAlign: "center",backgroundColor:'#444444',maxHeight:'500px',overflowy:'auto' }}>
          {/* <Avatar /> */}
          <Avatar_Videos transcript={transcript}/>
        </div>
      </div>
    </>
  );
}

