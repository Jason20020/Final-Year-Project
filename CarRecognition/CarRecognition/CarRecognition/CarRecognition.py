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
import matplotlib
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt

test_dataset = tf.keras.preprocessing.image_dataset_from_directory(
    'resources/test_brand_and_model',
    seed=42,
    image_size=(180,180),
    batch_size=50,
)

# Print all the car name
class_names = test_dataset.class_names

#print(class_names)

transform_test = ImageDataGenerator(preprocessing_function= keras.applications.resnet.preprocess_input)
test_ds = transform_test.flow_from_directory(
    "resources/test_brand_and_model",
    seed = 42,target_size=(224,224),batch_size=50
)

# Predict Ferrari 458 with ResNet50 Model
car = "resources/test_car/download.jpg"
image_size = (224, 224)
model = load_model('resources/models/resnet50_model')

# Evaluate the model
# results = model.evaluate(test_ds)
image = load_img(car, target_size=image_size)
image = img_to_array(image)
image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))
image = keras.applications.resnet50.preprocess_input(image)
prediction = model.predict(image)
score = tf.nn.softmax(prediction[0])
print(class_names[np.argmax(score)])
print("Predict Finished")
#print("Loss: {:.5f}, Accuracy: {:.2f}%".format(results[0], results[1] * 100))

# Plot the accuracy
# fig, ax = plt.subplots()
# ax.bar("Test Set", results[1] * 100)
# ax.set_ylim(0, 100)
# ax.set_ylabel("Accuracy %")
# plt.show()
