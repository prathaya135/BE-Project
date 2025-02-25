from flask import Flask, request, jsonify
from flask_cors import CORS
import speech_recognition as sr
import os
import subprocess
from Text_Tokenization import main_func
import tensorflow as tf
import numpy as np
import cv2
from werkzeug.utils import secure_filename
# from tensorflow.keras.preprocessing import image


app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads_image'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
model = tf.keras.models.load_model('./Sign_Language_Detection/saved_model/my_model.h5')

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
        except sr.UnknownValueError:
            text = "Sorry, I could not understand the audio."
        except sr.RequestError:
            text = "Sorry, there was an issue with the request."
        text=main_func(text)
    return text

@app.route('/textscribe', methods=['POST'])
def textscribe():
    try:
        print("Received request at /textscribe")  # Debugging
        data = request.get_json()
        print("Request JSON:", data)  # Debugging
        
        if not data or 'text' not in data:
            return jsonify({'error': 'Invalid request, missing "text" field'}), 400

        text = main_func(data['text'])  # Ensure main_func is correct
        print("Processed Text:", text)  # Debugging

        return jsonify({'transcription': text})

    except Exception as e:
        print("Error in textscribe:", str(e))  # Log the error
        return jsonify({'error': str(e)}), 500



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
    print(transcription);
    return jsonify({'transcription': transcription})
    # return jsonify({'transcription': "Pratham"})


@app.route('/predict', methods=['POST'])
def predict():
    print("Request received")
    print("Content-Type:", request.content_type)
    print("Files:", request.files)
    if 'frame' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['frame']
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    file.save(file_path)
    img = cv2.imread(file_path)

    if img is None:
        os.remove(file_path)  
        return jsonify({'error': 'Image decoding failed'}), 400
    input_width, input_height = 200, 200
    img_resized = cv2.resize(img, (input_width, input_height)) / 255.0
    img_resized = np.expand_dims(img_resized, axis=0)

    print("Original image shape:", img.shape)
    print("Preprocessed image shape:", img_resized.shape)
    predictions = model.predict(img_resized)
    predicted_class = np.argmax(predictions)
    confidence = predictions[0][predicted_class]
    print("Prediction scores:", predictions)
    print("Predicted class:", predicted_class)
    print("Confidence:", confidence)
    os.remove(file_path)

    return jsonify({'prediction': int(predicted_class), 'confidence': float(confidence)})



if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(host="0.0.0.0", port=5000, debug=True)

