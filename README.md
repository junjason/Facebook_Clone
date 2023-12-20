## Overview
A clone of facebook built using ruby on rails for the backend, PostgreSQL for the database, and React for the frontend with Redux state management on the frontend.

👉
[Live Demo](https://facebook-i69a.onrender.com/)
👈
<br>

## Setup
To run, download the demo.

1. Open up terminal in the root directory
2. cd into the frontend and run 'npm install'
3. run 'npm start' from the frontend
4. cd back to root and run 'rails s'
5. demo should be available on localhost:3000/

## Features Implemented
1. User Auth
2. User Profile Page
3. Posting on each other's walls (CRUD)
4. Friending
5. NewsFeed
6. Search Bar for users
<br>

## Features to implement later
1. Comments on posts (CRUD)
2. Likes on comments and posts
3. Notifications
4. Pictures for posts
5. Messaging using WebSockets and Active Cable

## Tech Stack
- PostgreSQL
- Ruby on Rails
- React.js
- Redux
<br>

## Notable Highlights
![Splash](./frontend/img/splash.png)
![Sign-Up](./frontend/img/sign-up.png)
<br>Picture perfect splash page and sign-up<br>

![Search-Bar](./frontend/img/search-bar.gif)
<br>*Utilizing Search Bar*<br>
<br>*Home Page & User Profile*<br>

## Important Code Snippets
1. Learning to structure jbuilder correctly to manage a normalized redux state for performance and scalability
- ![Jbuilder](./frontend/img/user-jbuilder.png)

2. Friend Request routes/controller
- ![Friend-Request-Controller](./frontend/img/friend-request-routes.png)

3. Search Bar Reducer
- ![Search-Bar-Reducer](./frontend/img/searchbar-reducer.png)

<br><br>


