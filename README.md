# Capstone Project Title (to do now)
### Wavez Search
This is a members only application for people who love to surf. Members can post their favorite surf spots ,leave ratings, and save sites to their account where they can leave themselves notes.

### 1. Working Prototype (to do later)

(Example) You can access a working prototype of the React app here: http://wavez-search-git-main-thechunkypumpkinhead.vercel.app and Node app here:   https://wavez-search.herokuapp.com/

### 2. User Stories (to do now)

This app is for two types of users: a visitor and a logged-in user

###### (Example) Landing Page (Importance - High) (Est: 1h)

- as a visitor
- I want to understand what I can do with this app (or sign up, or log in)
- so I can decide if I want to use it

###### (Example) Login Page (Importance - High) (Est: 3h)

- As a returning register user
- I want to enter my password and username to use this app,
- So I can have access to my account.

###### (Example) Sign Up (Importance - High) (Est: 3h)

- As a visitor
- I want to register to use this app
- So I can create a personal account.

###### List Of Sites Page (Importance - Medium) (Est: 2h)

*as a visitor
*I want to learn about all the available sites to visit per state
\*so I can decide if I want to visit

###### Star Ratings (Importance - Medium) (Est: 1h)

*as a visiting user
*I want to rate places I've visited
\*so I can help others decide on places to visit

###### Account Page (Importance - High) (Est: 4h)

*as a logged in user
*I want to see places I've saved to my account
*I want to add comments to places I've saved to my account
*so I can easily find the places I'm interested in

###### Upload New Site (Importance - High) (Est: 4h)

*as a logged in user
*I want to add places I've been
*I want to add images, content, and a location
*so I can share locations I've been with other users

###### Search Sites (Importance - High) (Est: 2h)

*as a logged in user
*I want to search places by location
\*so I can find locations I'm interested in going to

### 3. Functionality (to do now)

The app's functionality includes:

- Every User has the ability to create an account
- A registered user has the ability to log in to their account
  *A registered user has the ability to save surf sites to their account
  *A registered user has the ability to add ratings to surf sites
  *A registered user has the ability to add new surf sites
  *A registered user has the ability to add images and content when adding new surf sites

### 4. Technology (done)

Front-End: HTML5, CSS3, JavaScript ES6, React
Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, Postgres
Development Environment: Heroku, DBeaver

### 5. Wireframes (to do now)

Landing Page
![Landing Page](/github-images/screenshots/landing.png)

Sign Up Page
![Sign Up Page](/github-images/screenshots/sign-up.png)

Log In Page
![Log In Page](/github-images/screenshots/log-in.png)

Accounts Page
![Account Page](/github-images/screenshots/account.png)

Site List Page
![Site List Page](/github-images/screenshots/site-list.png)

### 6. Front-end Structure - React Components Map (to do later)

- (Example) **Index.js** (stateless)
  - **App.js** (stateful)
    - **LandingPage.js** (stateful) - gets the _"prop name"_ and the _"callback prop name"_ from the **App.js**
      - **Login.js** (stateful) -
      - SignUp.js\_\_ (stateful) -
    - **SiteList.js** (stateful) -
    - ** Account.js** (stateful) -
    - **Searchjs** (stateful) -
    - **Navbar.js** (stateful) -
    - **WavezForm.js** (stateful) -
    - **StarRating.js** (stateful) -

### 7. Back-end Structure - Business Objects (to do later)

Users (database table)
*id (auto-generated)
*email (email validation)
*password (at least 8 chars, at least one alpha and a special *character validation)

Locations (database table)
*id (auto-generated)
*user_id (foreign key - users table(id))
*image (image)
*title (note title)
*content (note text)
*keyword (keyword for maps)
\*is_public (boolean default 0)

Ratings (database table)
*id (auto-generated)
*user_id (foreign key to match users table (id))
*location_id (foreign key to match locations table (id))
*stars (integer between 1 & 5)

User_Locations (database table)
*id (auto-generated)
*user_id (foreign key to match users table (id))
\*location_id (foreign key to match locations table (id))

Comments (database table)
*id (auto-generated)
*user_location_id (foreign key to match locations table (id))
*title (note title)
*content (note text) \*author_id ((foreign key to match users table (id)))

### 8. API Documentation (to do later)

#### API Overview

```text
├── /auth
│ └── POST │ ├── /login ├── /users │ └── GET / │ ├── / │ ├── /:user_id │ └── POST / │ ├── / ├── /comments │ └── GET │ ├── / │ ├── /:location_id │ └── POST │ ├── /:location_id │ └── DELETE │ ├── /:location_id ├── /location │ └── GET │ ├── / │ ├── /keyword/:searchTerm │ └── POST │ ├── /
├── /ratings │ └── GET │ ├── / │ ├── /:location_id │ └── POST │ ├── / ├── /user_locations │ └── GET │ ├── / │ ├── /user │ ├── /:loc_id │ └── POST │ ├── /
```

### 9. Development Roadmap (to do later)

This is v1.0 of the app, but future enhancements are expected to include:

- (Example) add more functionality

### 10. How to run it (done)

Use command line to navigate into the project folder and run the following in terminal

##### Local React scripts

- To install the react project ===> npm install
- To run react (on port 3000) ===> npm start
- To run tests ===> npm run test

##### Local Node scripts

- To install the node project ===> npm install
- To migrate the database ===> npm run migrate -- 1
- To run Node server (on port 8000) ===> npm run dev
- To run tests ===> npm run test
