# Final-Year-Project
![transparent-carLogo](https://user-images.githubusercontent.com/55873488/235304079-a23b2e8a-8cc7-4445-9d9b-62d33cbc8eb6.png)

# Car Recognition Mobile Application
## Introduction
The idea of this project is to design a mobile application that will provide the user the ability to identify a car.  The user will initially take a picture of the car within the mobile app. The app will then process the image to determine various dimensions of the car. Based on this information the app will identify the make and model of the car, using the Resnet50 neural network and then return this information along with various other details to the user. 

The reason that I want to work on this project is because I could not find a good application in market that provides a car recognition function. I think this type of application is quite useful because there are many types of cars in the world nowadays and not everyone knows about all the cars. This application will make it easier for consumers to know more about the car they want to buy. Besides that, I wanted to gain understanding of mobile application development as this is not one of the modules I am currently studying.

## Folders

-- CarRecognition: This folder contains the car dataset srubbing, setup model, training ResNet50 model and implement function of car recognition.

-- Mobile Application: This folder contains two folders inside which are 'App' and 'backend' folder. The App folder include the code of React Native Expo Frontend. The backend folder contains the code of car recognition function in python. This backend application is currently running on Google Cloud App Engine to handle the car recognition function. When the user uploads an image from React Native frontend, the backend will receive the image and run the model to implement the car recognition and return the result back to frontend.

## Setup Application
To use the mobile application, follow the steps below to run the application:
1.	Download Expo Go on your device (IOS or Android).
2.	If you are using Android device, open Expo Go and paste this url and you are good to go. (exp://exp.host/@jason20020/App?release-channel=beta-v2)
3.	If you are using Iphone device, scan the QR code below with your camera after you download the Expo Go.

![image](https://user-images.githubusercontent.com/55873488/235304386-4571cedf-8232-4432-b14c-fe5fff0d3d2c.png)

After you get into the application, you can click the logo button in the middle, it will give two options which are pick an image from media or take a picture to predict the car model. 

You also can signup an account and login to user account for more function.
## User & Admin Account
This two accounts will allow you to login as an user or admin.

### User Account
Email: 123@gmail.com

Pass: 123456

### Admin Account
Email: jason@gmail.com

Pass: 123456

## User Function
- Get the result of car prediction
- Add a car to favourite list
- View, add and delete comment of a car
- Rating car
- View and edit user profile
- Logout account

## Admin Function
- CRUD of Car, User and Comment
- Get the result of car prediction
- Block or unblock user
- Hide or unhide comment
- Logout account

## Dataset
The dataset that I use in this project is Stanford Car Dataset. The Stanford Car dataset is a widely recognized and comprehensive collection of annotated car images, perfect for training and validating machine learning models for car recognition tasks. Comprising 16,185 high-resolution images that span 196 distinct car classes, this dataset is ideal for training a ResNet50 model to be used in a car recognition mobile application.

![image](https://user-images.githubusercontent.com/55873488/235305030-9a80eb8e-60a9-4ba0-a596-e3ab007a1283.png)

Data source and banner image: http://ai.stanford.edu/~jkrause/cars/car_dataset.html contains all bounding boxes and labels for both training and tests.

3D Object Representations for Fine-Grained Categorization

Jonathan Krause, Michael Stark, Jia Deng, Li Fei-Fei

4th IEEE Workshop on 3D Representation and Recognition, at ICCV 2013 (3dRR-13). Sydney, Australia. Dec. 8, 2013.

## Technical Information

- Visual Studio 2022 (Tensorflow - Python)
- Visual Studio Code (React Native - JavaScript)
- React Native 0.70.8
- React 18.1.0
- Expo 47.0.12
- Jest 26.6.3
- FireBase
- Flask
- Tensorflow
- Google Cloud App Engine
