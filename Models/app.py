from flask import Flask, request, jsonify
from flask_cors import CORS
import speech_recognition as sr
import os
import subprocess
from Text_Tokenization import main_func


app = Flask(__name__)
CORS(app)

def convert_mp3_to_wav(mp3_file_path, wav_file_path):
    command = [
        'ffmpeg',
        '-i', mp3_file_path,
        '-acodec', 'pcm_s16le',
        '-ar', '44100',
        wav_file_path
    ]   
    result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if result.returncode != 0:
        raise Exception(result.stderr.decode())

def transcribe(audio_file):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_file) as source:
        audio_data = recognizer.record(source)
        try:
            text = recognizer.recognize_google(audio_data)
            print(text)
            text=main_func(text)
            print(text)
        except sr.UnknownValueError:
            text = "Sorry, I could not understand the audio."
        except sr.RequestError:
            text = "Sorry, there was an issue with the request."
    return text

@app.route('/transcribe', methods=['POST'])
def upload_audio():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']

    if audio_file.filename == '':
        return jsonify({'error': 'No audio file selected'}), 400

    audio_file_path = os.path.join('uploads', audio_file.filename)
    audio_file.save(audio_file_path)

    # Convert MP3 to WAV
    wav_file_path = os.path.join('uploads', 'converted.wav')
    try:
        print(f"Converting {audio_file_path} to WAV...")
        convert_mp3_to_wav(audio_file_path, wav_file_path)
        print("Conversion successful!")
    except Exception as e:
        print(f"Error converting audio: {str(e)}")
        return jsonify({'error': 'Error converting audio: ' + str(e)}), 500

    transcription = transcribe(wav_file_path)

    os.remove(audio_file_path)
    os.remove(wav_file_path)

    return jsonify({'transcription': transcription})

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(port=5000, debug=True)
