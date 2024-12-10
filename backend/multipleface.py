from flask import Flask, jsonify, Response
from flask_cors import CORS
import threading
import cv2
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPooling2D

app = Flask(__name__)
CORS(app)

# Initialize global variables
streaming_active = False
lock = threading.Lock()

# Load model once globally
model = None
face_dict = {0: "Akshaya", 1: "Charan", 2: "Charansai", 3: "Nida", 4: "Pranav", 5: "Risheel"}


def initialize_model():
    global model
    model = Sequential()
    model.add(Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(48, 48, 1)))
    model.add(Conv2D(64, kernel_size=(3, 3), activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))

    model.add(Conv2D(128, kernel_size=(3, 3), activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Conv2D(128, kernel_size=(3, 3), activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))

    model.add(Flatten())
    model.add(Dense(1024, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(6, activation='softmax'))

    model.load_weights('person_classifier.h5')


# Initialize the model before the app starts
initialize_model()


# Function to generate frames
def generate_frames():
    global streaming_active, model, face_dict

    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: Unable to access the camera.")
        streaming_active = False
        return

    try:
        while True:
            with lock:
                if not streaming_active:
                    cap.release()
                    break

            ret, frame = cap.read()
            if not ret:
                break

            gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            bounding_box = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
            num_faces = bounding_box.detectMultiScale(gray_frame, scaleFactor=1.3, minNeighbors=5)

            for (x, y, w, h) in num_faces:
                cv2.rectangle(frame, (x, y - 50), (x + w, y + h + 10), (255, 0, 0), 2)
                roi_gray_frame = gray_frame[y:y + h, x:x + w]
                cropped_img = np.expand_dims(np.expand_dims(cv2.resize(roi_gray_frame, (48, 48)), -1), 0)
                emotion_prediction = model.predict(cropped_img)
                maxindex = int(np.argmax(emotion_prediction))
                cv2.putText(frame, face_dict[maxindex], (x + 20, y - 60), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

            _, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    except Exception as e:
        print(f"Error during streaming: {e}")
    finally:
        cap.release()


# Flask routes
@app.route('/video_feed')
def video_feed():
    global streaming_active
    with lock:
        if not streaming_active:
            return "Stream not started.", 403
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/recognize', methods=['POST'])
def recognize():
    global streaming_active
    with lock:
        if not streaming_active:
            streaming_active = True
    return jsonify({"status": "Recognition started successfully."}), 200


@app.route('/stop_recognition', methods=['POST'])
def stop_recognition():
    global streaming_active
    with lock:
        streaming_active = False
    return jsonify({"status": "Recognition stopped."}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5010)
