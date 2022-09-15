# Travel Buddy - Client

## Description

Travel Buddy as an app for plan travel perfectly. User can create their itineraries of their past or future trips and can share their experience so others can take advantage from them. User can aslo add general travel tips related to travel, hotel bookings, flights etc.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** As an anon I can sign up in the app so that I can start creating and managing my itineraries.
-  **Login:** As a user I can login to the app so that I can start creating and managing my itineraries.
-  **Logout:** As a user I can logout from the app so no one else can modify my information.
-  **Create itinerary:** As a user I can create itinerary.
-  **Update itinerary:** As a user I can update my itinerary.
-  **Delete itinerary:** As a user I can delete my itinerary from my itineraries.
-  **Public itinerary:** As a non registered user I can only see list of public create itineraries.
-  **Contributor to itinerary:** As a user i can contributor to my itinerary so that contributor should be registered and can see and edit that itinerary.
-  **Travel tips:** As a user i can add general common trave realated tips and can filter only mine.
-  **Check profile:** As a user I can check my profile, can update profile picture and can check my itineraries from there.


<br>


# Client / Frontend

## React Router Routes (React App)
| Path                      | Component                      | Permissions | Behavior                                                     |
| ------------------------- | --------------------           | ----------- | ------------------------------------------------------------ |
| `/`                       | Landing Page                   | public `<Route>`            | Index Page                                        |
| `/signup`                 | SignupPage                     | anon only  `<IsAnon>`    | Signup form, link to login, navigate to home page after signup |
| `/login`                  | LoginPage                      | anon only `<IsAnon>`     | Login form, link to signup, navigate to home page after login  |
| `/logout`                 | n/a                            | user only `<IsPrivate>`  | Navigate to landing page after logout, expire session             |
          
## Components
- Navbar
- Footer
- Login
- Sign up
- Profile
- Hero Section
- Feature Section
- Create new itinerary
- Update itinerary
- Itinerary Detail
- List Itinerary
- Travel tips
- 404 Page not found


## Backlog

- Add multiple contributor
- Contributor should receive a invitation link.
- Comment / review model
- thumbs / like model.
- Social authentication.

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()

- Backlog Service
  
<br>

User model

```javascript
{
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true, unique: true},
  imageUrl: { type: String },
  itineraries: [{ type: Schema.Types.ObjectId, ref: "Itinerary" }], 
}
```


Itinerary model

```javascript
{
  isPublic: { type: Boolean, default: false },
  title: { type: String, required: true },
  duration: { type: String, required: true },
  imageUrl: { type: String, default: 'https://images.unsplash.com/photo-1499591934245-40b55745b905?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2372&q=80'},
  countries: { type: [String], required: true },
  cities: { type: [String], required: true },
  flightDetails: { type: [Object] },
  hotelDetails: { type: [Object] },
  activities: { type: [Object], required: true },
  notes: { type: [String] },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  contributor: { type: Schema.Types.ObjectId, ref: "User" }
}
```


Travel Tip model

```javascript
{
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ["Transport", "Flight", "Hotel", "Other"],
    default: "Travel",
    required: true
   },
  user: { type: Schema.Types.ObjectId, ref: "User" }
}
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `           | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`                | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session    |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user                                          |

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/FbfHT8EH/travel-buddy) 

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/Sunairaa/travel-buddy-client)

[Server repository Link](https://github.com/Sunairaa/travel-buddy-server)

[Deployed App Link](https://travel-buddy-client.netlify.app/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1XsC16eyqehPcwO6THRFyBN-j5KP5g2K9aktBAi2ZV_g/edit#slide=id.g15526f35b1a_0_10)
