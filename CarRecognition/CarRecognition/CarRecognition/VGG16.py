# Importing Libraries
from tensorflow import keras
from keras.layers import Input, Lambda, Dense, Flatten, GlobalAveragePooling2D
from keras.models import Model
from keras.applications.vgg16 import VGG16
from keras.applications.vgg16 import preprocess_input
from keras.preprocessing import image
from keras.preprocessing.image import ImageDataGenerator
from keras.models import Sequential
import numpy as np
from glob import glob
import tensorflow as tf

# Initialize
image_size = [224, 224]
batch_size = 50

#Creating model and freezing all layers except the last two
vgg_model = VGG16(input_shape=image_size + [3], weights='imagenet', include_top=False)

for layer in vgg_model.layers[0:-2]:
  layer.trainable = False

#Setup model and print out model summary
folders = glob('resources/train_brand_and_model/*')
  
x = Flatten()(vgg_model.output)
prediction = Dense(len(folders), activation='softmax')(x)
model = Model(inputs=vgg_model.input, outputs=prediction)
model.summary()

model.compile(
  loss='categorical_crossentropy',
  optimizer='adam',
  metrics=['accuracy']
)

train_dataset = ImageDataGenerator(rescale = 1./255,shear_range = 0.2,zoom_range = 0.2,horizontal_flip = True)
test_dataset = ImageDataGenerator(rescale = 1./255)

train = train_dataset.flow_from_directory('resources/train_brand_and_model',
                                                 seed = 42,
                                                 target_size = image_size,
                                                 batch_size = batch_size,
                                                 class_mode = 'categorical')

test = test_dataset.flow_from_directory('resources/test_brand_and_model',
                                            seed = 42,
                                            target_size = image_size,
                                            batch_size = batch_size,
                                            class_mode = 'categorical')

# Train the model with dataset
model.fit_generator(
  train,
  validation_data=test,
  epochs=10,
  steps_per_epoch=len(train),
  validation_steps=len(test)
)

# Save Model
from keras.models import load_model

model.save('resources/models/vgg16_model')