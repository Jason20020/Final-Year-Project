# Importing libraries
import tensorflow as tf
from tensorflow import keras
import pandas as pd
import numpy as np
import PIL
from keras.preprocessing.image import ImageDataGenerator
from keras.applications import ResNet50
from keras.models import Model
from keras.layers import Dense, GlobalAveragePooling2D
     

# Initialize
image_size = (224, 224)
batch_size = 50
transform = ImageDataGenerator(preprocessing_function= keras.applications.resnet.preprocess_input, validation_split=0.2)

# Setup train dataset and validation dataset
train_dataset = transform.flow_from_directory(
    "resources/train_brand_and_model",
    subset="training", seed = 42,target_size=image_size,batch_size=batch_size
)
val_dataset = transform.flow_from_directory(
    "resources/train_brand_and_model",
    subset="validation", seed = 42,target_size=image_size,batch_size=batch_size
)

inputs = keras.Input(shape=(224, 224, 3))

# Setup ResNet50 Model
resnet50_model = ResNet50(weights='imagenet', include_top=True, input_tensor=inputs)

layer = resnet50_model.layers[-2].output 
out = Dense(units = 157, activation = 'softmax', name = 'ouput')(layer)
new_resnet50_model = Model(inputs = inputs, outputs = out)

for layer in new_resnet50_model.layers[:-25]:
  layer.trainable = False

# Summary of ResNet50 model
new_resnet50_model.summary()

# Train model with dataset
new_resnet50_model.compile(optimizer=keras.optimizers.Adam(),
              loss="categorical_crossentropy",
              metrics=['accuracy'])

callback = tf.keras.callbacks.EarlyStopping(monitor='loss',mode = 'min')

new_resnet50_model.fit_generator(generator = train_dataset, epochs=50,  validation_data = val_dataset, callbacks=[callback])

# Save Model
new_resnet50_model.save('resources/models/resnet50_model') 
