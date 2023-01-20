# Import Libraries
import tensorflow as tf
from tensorflow import keras
from keras import layers
import pandas as pd
import numpy as np
import PIL
from keras.models import load_model

from keras.preprocessing.image import ImageDataGenerator
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.preprocessing import image_dataset_from_directory
import matplotlib.pyplot as plt

test_ds = tf.keras.preprocessing.image_dataset_from_directory(
    'resources/test_brand_and_model',
    seed=42,
    image_size=(180,180),
    batch_size=50,
)
class_names = test_ds.class_names