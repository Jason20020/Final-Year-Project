# import libraries
import scipy.io
import os
import shutil
import pandas as pd
import numpy as np

# load data
car_mat = scipy.io.loadmat('resources/cars_annos.mat')


temp = np.hstack(car_mat['annotations'])
temp_df = pd.DataFrame(temp)
temp_df['file_name'] = temp_df['relative_im_path']
temp_df['file_name'] = temp_df['file_name'].map(np.array2string)
temp_df['file_name'] = temp_df['file_name'].map(lambda x:x.lstrip("['car_ims/").rstrip("']"))
temp_df['class_number'] = temp_df['class'].astype(np.float)

# Generate car datasets
names= car_mat['class_names'].copy()
car_df = pd.DataFrame(names).T
car_df['class_number'] =car_df.index+1
car_df['car_name'] = car_df[0].map(lambda x:np.array2string(x).lstrip("['").rstrip("']"))
car_df = car_df.drop(columns = 0)
car_df['brand'] = car_df['car_name'].map(lambda x:x.split()[0])
car_df['model'] = car_df['car_name'].map(lambda x:x.split()[1])
car_df['both']= car_df['brand'] +  car_df['model']
car_df['both'] = car_df['both'].replace('RamC/V','RamCV')
car_df['both'] = car_df['both'].map(lambda x : x.lower())

print(car_df)

carBrand = car_df['both'].unique()

# Create folder for each car brand model
#for i in carBrand:
#   os.mkdir("resources/train_brand_and_model/{}".format(i))
#   os.mkdir("resources/test_brand_and_model/{}".format(i))

# merge two dataframe
merged_df = temp_df.merge(car_df, left_on='class_number', right_on = 'class_number')

print(merged_df)

# Spliting the datasets into train and test data
from sklearn.model_selection import train_test_split
train, test = train_test_split(merged_df, test_size = 0.2, random_state = 42)

print(train)

# Copy images to each categories of car training set.
for b in carBrand:
  t_df = train[train['both']==b]
  t_df.reset_index(drop = True)
  print(b)
  for i in list(t_df.index.values):
    shutil.copy('resources/car_ims/'+t_df['file_name'][i], 'resources/train_brand_and_model/'+b.lower()+'/'+t_df['file_name'][i])

# Copy images to each categories of car testing set.
for b in carBrand:#this loop is used to take a particular image from the car_ims folder, make a copy and put it in the 'test' folder of the particular car it belongs to.
  t_df = test[test['both']==b]
  t_df.reset_index(drop = True)
  print(b)
  for i in list(t_df.index.values):
    shutil.copy('resources/car_ims/'+t_df['file_name'][i], 'resources/test_brand_and_model/'+b.lower()+'/'+t_df['file_name'][i])
