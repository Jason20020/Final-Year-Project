# Import Libraries
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
import matplotlib.pyplot as plt

test_dataset = tf.keras.preprocessing.image_dataset_from_directory(
    'resources/test_brand_and_model',
    seed=42,
    image_size=(180,180),
    batch_size=50,
)

# Print all the car name
class_names = test_dataset.class_names

print(class_names)

# Predict Ferrari 458 with CNN Model
car = "resources/test_car/download.jpg"
image_size = (200, 200)
model = load_model('resources/models/cnn_model')

image = load_img(car, target_size=image_size)
image = img_to_array(image)
image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))
temp_img = plt.imread(car)
plt.imshow(temp_img)
plt.show()
prediction = model.predict(image)
score = tf.nn.softmax(prediction[0])
print("CNN Model")
print(
    "Prediction car brand: {}. Percents of Accruracy : {:.2f}%."
    .format(class_names[np.argmax(score)], 100 * np.max(score)))

# Predict Ferrari 458 with ResNet50 Model
car = "resources/test_car/download.jpg"
image_size = (224, 224)
model = load_model('resources/models/resnet50_model')

image = load_img(car, target_size=image_size)
image = img_to_array(image)
image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))
temp_img = plt.imread(car)
plt.imshow(temp_img)
plt.show()
image = keras.applications.resnet50.preprocess_input(image)
prediction = model.predict(image)
score = tf.nn.softmax(prediction[0])
print("ResNet50 Model")
print(
    "Prediction car brand: {}. Percents of Accruracy : {:.2f}%."
    .format(class_names[np.argmax(score)], 100 * np.max(score)))

# Predict Ferrari 458 with VGG16 Model
car = "resources/test_car/download.jpg"
image_size = (224, 224)
model = load_model('resources/models/vgg16_model')

image = load_img(car, target_size=image_size)
image = img_to_array(image)
image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))
temp_img = plt.imread(car)
plt.imshow(temp_img)
plt.show()
prediction = model.predict(image)
score = tf.nn.softmax(prediction[0])
print("VGG16 Model")
print(
    "Prediction car brand: {}. Percents of Accruracy : {:.2f}%."
    .format(class_names[np.argmax(score)], 100 * np.max(score)))
