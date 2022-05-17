# Brainstorming App | Capstone CS50W

</br>

# Overview

This project consists of a Django API in the Backend folder, with a React interface inside the Frontend folder. This brainstorming app is called Quick Ideas. It has functions such as registration and login. Teachers will be able to create quizzes. Registered people will be able to create Groups of Ideas, where they must put a title, theme and description, later they will be able to invite whoever they want to the group of ideas recently created. Finally, the participants will be directed to a private room, where they can share their ideas related to the group's theme.

I plan to continue developing the app to a much more mature point with more features. This is only a beta version that I have been able to develop with what I have learned so far thanks to the course and other things learned on the net.

</br>

# Distinctiveness and Complexity 

I consider that my application meets all the requirements stated in the description of the final project. It is a web platform, oriented to be a social game and to help people. It puts into practice the vast majority of concepts taught during the course and other external concepts, such as the use of channels or the implementation of a different login than the one that django brings by default to facilitate communication with react.

The backend was developed exclusively in the django framework, in which user authentication, the use of channels to facilitate communication between users in real time and route management were developed. Although react is used, the interface is contained within django and connected to django thanks to webpack.

On the other hand, the user interface was designed with React JS. The web application is mobile responsive. I included a bootstrap library to make my react/front-end components mobile responsive.

The difference between this web application and the previous projects is that this application uses a "self-developed" login, that is, I don't use the one that comes with django by default and I take care of configuring one that facilitates communication with react, it uses channels so that users participate in a chat in real time and thus do not have to make repeated requests to the api. And it is also a fully responsive application.

</br>

# Structure App

Next, I will explain how the application is made up.
Folders:

- **Capstone:**Here you will find some serializers in the serializers file (most were implemented in the models), the configuration of the canals and their respective routes to which to connect. and Obviously also the api and everything that this entails (routes, models, views and others)
- **finalproject:** Here I am in charge of customizing some things such as changing the asgi.py to be able to use the connection to websockets. In settings implement JWT to allow me a login for react. and the configuration required for the use of channels
- **Frontend:** Here you will find the interface developed in react. In src will be all the js files (components, paths, Authentications, etc.). In static you will find files the scss files, css, images and the compiled js file of react granted by webpack. and Finally configuration files such as webpack, node or url.py used to handle frontend paths.

</br>

# Folders Contents

## Front End:

- `./src/components/`:

  - `header` - Header and preHeader files used to handle the navigation bar
  - `home` - PreHome and Home files used to show the initial interface in case the user is not registered and the interface dedicated to the registered user.
  - `invitation` - Here you will find all the necessary files to manage the invite section
  - `Loading` - This is a component used to display loading screens
  - `private-room` - The section where the groups are derived once formed. room the room and other encrypted data is obtained, and later the room is shown with all the participating users
  - `reinvitations` - In this folder are the necessary files for the invitations section
  - `routes` - Here you will find the routesSession file where all the main routes of the program are configured
  - `session` - Both the login and register files necessary for user authentication are found
  - `App.js` - This file contains the subcomponents of the app.

- `./src/contexts/`:

  - `AuthContext.js` - Handles different API calls and handling of sensitive data necessary for user authentication and security
  - `ItemContext.js` - Custom calls to the api, to avoid mostly the use of excessive code

- `./src/service/`:

  - `ItemService.js` - Configurations needed for custom api calls
  - `ResponseService.js` - It will be used in the future to further reduce the amount of code in the api call

- `./src/utils`:

  - `axios` - in the future it is planned to use axios to mostly replace fetch calls

- `./src/`:

  - `index.js` - It contains the app.js and also add plugins such as those of react-bootstrap

</br>

## Back End:

### Models in the app

The application has 5 models that are migrated to MySql, these are the models:.

1. `User` - User model with all the functions brought in abstractUser plus some others necessary for the web application
2. `Coins` - It manages both the amount of coins of the user and the cost of inviting said user to play (to be implemented in later versions)
3. `GroupDetails` - Contains all the group data (title, description, users, etc,)
4. `Invitations` - handles all invite messages sent through channels
5. `Message` - Manage all the ideas sent in the rooms

### Views file:

'views.py' Contains the typical functions needed to call the api and at first some classes to be able to get the user data with JWT

### settings file:

Different types of configurations, such as the middlewares used for the session, the JWT configuration, the connection to MySql or the configuration of the channels

### urls.py file:

This file handles all the api routes

### routing file:

Routes available to connect through channels

### consumers file:

contains the classes that configure the connection and the way the channels work and the data they can receive

### models.py files:

The classes that form the subsequent tables in MySql once the data has been migrated

</br>

# Installation & how to run the application

When the backend and the frontend are connected, you only need port 8000 to be able to appreciate the application.

## Backend

```json
In the initial folder without moving apply:
pip install -r requirements.txt

and to start the server use:
python manage.py runserver
```

## Frontend

```json
go to the frontend folder (in windows cd frontend) and apply:
npm install
```

## For deploying

```json
go to the frontend folder (in windows cd frontend) and apply:
npm run dev
```

</br>

# Brian-Nahuel-Acosta
