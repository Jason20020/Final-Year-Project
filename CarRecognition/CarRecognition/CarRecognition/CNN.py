# Import Libraries
import tensorflow as tf
from tensorflow import keras
from keras import layers 
import pandas as pd
import numpy as np
import PIL

# Initialize          
image_size = (200, 200)
batch_size = 40
num_classes = 157

# Pre-processing training dataset
train_dataset = tf.keras.preprocessing.image_dataset_from_directory(
    "resources/train_brand_and_model",
    validation_split=0.2,
    subset="training",
    seed=42,
    image_size=image_size,
    batch_size=batch_size,
)

# Pre-processing validation dataset 
val_dataset = tf.keras.preprocessing.image_dataset_from_directory(
    "resources/train_brand_and_model",
    validation_split=0.2,
    subset="validation",
    seed=42,
    image_size=image_size,
    batch_size=batch_size,
)

# Prefetch and augmentation steps
AUTOTUNE = tf.data.experimental.AUTOTUNE
train_ds = train_dataset.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)
val_ds = val_dataset.cache().prefetch(buffer_size=AUTOTUNE)

from keras.models import Sequential

data_augmentation = keras.Sequential(
  [
    tf.keras.layers.experimental.preprocessing.RandomFlip("horizontal", input_shape=(200, 200,3)),
    tf.keras.layers.experimental.preprocessing.RandomRotation(0.1),
    tf.keras.layers.experimental.preprocessing.RandomZoom(0.1),
  ]
)

callback = tf.keras.callbacks.EarlyStopping(monitor='loss', mode = "min")

# Setup Model
model = Sequential([
  data_augmentation,
  tf.keras.layers.experimental.preprocessing.Rescaling(1./255),
  layers.Conv2D(17, 3, padding='same', activation='relu',kernel_regularizer = keras.regularizers.l1_l2(l1=0.001, l2=0.001)),
  layers.MaxPooling2D(),
  layers.Dropout(0.1),
  layers.Conv2D(39, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Dropout(0.2),
  layers.Conv2D(87, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Conv2D(87, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Conv2D(87, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Dropout(0.3),
  layers.Flatten(),
  layers.Dense(500, activation='relu'),
  layers.Dense(num_classes)
])

model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

print(model.summary())

# Training the dataset with model
epochs = 100
with tf.device('/gpu:0'):
  history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=epochs,callbacks=[callback]
  )

# Save model
model.save('resources/models/cnn_model')  

# Get the accuracy of model
test_ds = tf.keras.preprocessing.image_dataset_from_directory(
    'resources/test_brand_and_model',
    seed=42,
    image_size=image_size,
    batch_size=batch_size,
)

print(model.evaluate(test_ds))
