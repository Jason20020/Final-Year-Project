# Import Libraries
from flask import Flask, Response, request, jsonify
from io import BytesIO
import base64
from flask_cors import CORS, cross_origin
import os
import sys
import tensorflow as tf
from tensorflow import keras
from keras import layers
import pandas as pd
import numpy as np
import PIL
from keras.models import load_model
from keras.preprocessing.image import ImageDataGenerator
from keras.utils import load_img
from keras.utils import img_to_array
from keras.utils import image_dataset_from_directory

app = Flask(__name__)
cors = CORS(app)

test_dataset = tf.keras.preprocessing.image_dataset_from_directory(
    'resources/test_brand_and_model',
    seed=42,
    image_size=(180,180),
    batch_size=50,
)

class_names = test_dataset.class_names

def predictCar(image_bytes):
    print("Starting Predict Car")
    image_size = (224, 224)
    model = load_model('resources/models/resnet50_model')
    print("ResNet50 Model Loaded!")

    image = PIL.Image.open(image_bytes)
    image = image.resize(image_size)
    image = img_to_array(image)
    image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))
    image = keras.applications.resnet50.preprocess_input(image)
    prediction = model.predict(image)
    print("Finished Prediction")
    score = tf.nn.softmax(prediction[0])
    print(class_names[np.argmax(score)])
    return class_names[np.argmax(score)]

@app.route("/image", methods=['GET', 'POST'])
def image():
    print("Method Get Call")
    if(request.method == "POST"):
        bytesOfImage = request.get_data()
        image_bytes = BytesIO(bytesOfImage)
        car = predictCar(image_bytes)
        return car
    return "Invalid request"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)), debug=True)
    