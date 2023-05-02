# Final-Year-Project
![transparent-carLogo](https://user-images.githubusercontent.com/55873488/235304079-a23b2e8a-8cc7-4445-9d9b-62d33cbc8eb6.png)

# Car Recognition Mobile Application
## Introduction
The idea of this project is to design a mobile application that will provide the user the ability to identify a car.  The user will initially take a picture of the car within the mobile app. The app will then process the image to determine various dimensions of the car. Based on this information the app will identify the make and model of the car, using the Resnet50 neural network and then return this information along with various other details to the user. 

The reason that I want to work on this project is because I could not find a good application in market that provides a car recognition function. I think this type of application is quite useful because there are many types of cars in the world nowadays and not everyone knows about all the cars. This application will make it easier for consumers to know more about the car they want to buy. Besides that, I wanted to gain understanding of mobile application development as this is not one of the modules I am currently studying.

## Folders

-- CarRecognition: This folder contains the car dataset srubbing, setup model, training ResNet50 model and implement function of car recognition.

-- Mobile Application: This folder contains two folders inside which are 'App' and 'backend' folder. The App folder include the code of React Native Expo Frontend. The backend folder contains the code of car recognition function in python. This backend application is currently running on Google Cloud App Engine to handle the car recognition function. When the user uploads an image from React Native frontend, the backend will receive the image and run the model to implement the car recognition and return the result back to frontend.

## Setup Developer Application
This document will outline the steps for running the car recognition project in python. The CarRecognition folder contains the codes of car dataset srubbing, setup ResNet50 model, training ResNet50 model and testing the function of car recognition. The process will include setting up the python libraries, and run a test for a car image recognition. This document will also outline the steps for running the React Native Expo application Car Recognition Mobile Application. The process will include setting up the React Native Expo on a Windows machine, and run the project on either an emulator or physical device.

### CAR RECOGNITION PROJECT IN PYTHON

#### STEP 1 - INSTALL THE REQUIREMENT 
This project in working on Python 3.10. The requirements that need to be install:

tensorflow==2.12.0
keras==2.12.0
pandas==1.3.5
numpy==1.23.2
Pillow==9.0.1
matplotlib==3.5.3

Save these as a requirements.txt and run this code in command line to install them. 'pip install -r requirement.txt'.

#### STEP 2 - RUN TEST FOR A CAR IMAGE RECOGNITION
The ResNet50 model had already trained and save in the file. To begin the testing, go to 'CarRecognition\CarRecognition\CarRecognition\resources\test_car' folder and there is a 'download.jpg' image. Change the image to the car that want to recognize and remember to set the name as 'download.jpg'. Open 'Final-Year-Project\CarRecognition\CarRecognition\CarRecognition\CarRecognition.py' file and run the project to get the prediction result of the car image. 

### CAR RECOGNITION MOBILE APPLICATION IN REACT NATIVE EXPO

#### NOTE THAT TO TEST THE APPLICATION ON IOS DEVICE SIMULATOR THESE STEPS WILL HAVE TO BE COMPLETED ON A MACOS MACHINE

#### PREREQUISITES
Please download and install Android Studio prior to beginning the following steps
The Android SDK version required for this project is 31+ and the Android version is 31+, so when installing Android Studio be sure to select those versions
If running on macOS please also install the XCODE and launch it to accept the license agreement
The minimum iOS version required for this application is 13+


#### STEP 1 - INSTALL NODE.JS
1. Download and install Node.js from the official website (https://nodejs.org/).

2. Verify that Node.js is installed by running 'node -v' in your command prompt or terminal. You should see the version number displayed.

#### STEP 2 - INSTALL EXPO CLI
Open your command prompt or terminal and run the following command:

'''npm install -g expo-cli'''

#### STEP 3 - INSTALL DEPENDENCIES
1. Open a command prompt or terminal window and navigate to the root of the project directory using 'cd' command.

2. Run the following command to install the project's dependencies:
'''npm install'''

This will install all the required packages and dependencies listed in the package.json file for the project.

#### STEP 4 - SETTING UP ANDROID SIMULATOR DEVICES
To test on an emulator, open Android Studio and use the AVD Manager to create a new Virtual Device

This can be done without a project open by selecting Configure > AVD Manager > Create Virtual Device

In older versions of Android Studio it may need to be done by launching Android Studio > Tools > Android > AVD Manager

#### On macOS, it may be Android Studio > (button with three dots on top righthand corner) > AVD Manager

Once the AVD manager is open and you have selected Create New Virtual Device:
1. Select the Pixel 4 Phone (recommended)

2. Select the disk image for Android 33, release name Tiramisu - You may need to download this image if it has not been previously used.

3. Click next, name and create the device.

#### STEP 5 - SETTING UP IOS TEST DEVICES
1. Open Xcode and go to "Preferences" > "Components" from the menu bar.

2. Set the simulator to an iPhone 12 or 13 running iOS 15.4 and click "Download".

#### STEP 6 - RUN THE APPLICATION
Run the following command to start the Expo development server:
'''expo start'''

It will show a QR Code image, a metro link and a list of instructions.

#### STEP 7 - RUN ON ANDROID DEVICE SIMULATOR
1. Press 'a' then it will open a dialog, select the Android Virtual Device that created.

2. Wait for the app to build and install on the simulator.

That's it! You should now be able to see the Car Recognition Mobile Application running on the Android simulator.

#### STEP 8 - RUN ON PHYSICAL ANDROID DEVICE
1. Download Expo Go application on your device.

2. Open Expo Go and paste the metro link. 

That's it! You should now be able to see the Car Recognition Mobile Application running on the Android device.

#### STEP 9 - RUN ON IOS DEVICE SIMULATOR
1. In the Expo DevTools, click on the "Run on iOS simulator" option to open the Run dialog box.

2. Select the simulator device you want to use and click "Run".

3. Wait for the app to build and install on the simulator.

That's it! You should now be able to see the Car Recognition Mobile Application running on the iOS simulator.

#### STEP - 10 RUN ON PHYSICAL IOS DEVICE
1. Download Expo Go application on your device.

2. Scan the QR code that given with your camera after you downloaded the Expo Go and open it.

That's it! You should now be able to see the Car Recognition Mobile Application running on the iOS device.

#### KNOWN ISSUES:
There is one known issue which could arise during this process:

If running on physical Android Device, it may return error after insert the metro link on the Expo Go application and also the Scan QRCode on the Expo Go is not working. 

So if really want to test on the physical Android device, can paste in this url on the Expo Go to open the Car Recognition Mobile Application. (exp://exp.host/@jason20020/App?release-channel=beta-v2)
This is the version that I published to the host. 

## Setup Mobile Application
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
